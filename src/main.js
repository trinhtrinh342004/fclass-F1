import { LESSONS as LOCAL_LESSONS, LESSON_ARCHITECTURE_WARNINGS, canonicalLessonSections } from "./features/lessons/lessonRegistry.js";
import { hideAuthView, isAuthRoute, renderAuthRoute } from "./features/auth/studentAuthRoutes.js";
import { resolveLessonRoute } from "./features/lessons/lessonRoutes.js";
import { getLessons, LESSON_SOURCE } from "./features/lessons/lessonRepository.js";
import { subscribeToLessons, unsubscribe as unsubscribeLessonRealtime } from "./features/lessons/lessonRealtime.js";
import {
  getMyProgress,
  markLessonCompleted,
  markLessonOpened,
  remoteProgressToLocalShape,
} from "./features/progress/progressRepository.js";
import { getCurrentProfile, getCurrentUser, signOut } from "./lib/supabase/auth.js";
import { subscribeToMyProgress, unsubscribe as unsubscribeProgressRealtime } from "./features/progress/progressRealtime.js";
import { requireApprovedStudent } from "./features/auth/authGuard.js";
import { requireApprovedClassMembership } from "./features/student/studentRepository.js";

/* ============================================================
  GATEWAY A1 — APP LOGIC & MINIGAMES (revamped)
  ============================================================ */

const STATE = {
  view: "home",
  lessonId: null,
  sectionIdx: 0,
  sections: [],
};

const STORAGE_KEY = "gateway_a1_progress_v2";

function loadProgress(){
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {done:[], hw:{}, sectionsDone:{}}; }
  catch{ return {done:[], hw:{}, sectionsDone:{}}; }
}
function saveProgress(p){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }catch{} }
let progress = loadProgress();
let LESSONS = [...LOCAL_LESSONS];
let lessonDataSource = LESSON_SOURCE.fallback;
let lessonDataWarning = "";
let lessonRealtimeChannel = null;
let progressRealtimeChannel = null;
let SORTED_LESSONS = sortLessons(LESSONS);
let TOTAL_LESSONS = SORTED_LESSONS.length;
let FIRST_LESSON_ID = SORTED_LESSONS[0]?.id || 1;
let dataLayerReady = false;

// ============== TEXT REGISTRY (safe HTML attribute embedding) ==============
const TXT_REG = {};
let _txtId = 0;
function regTxt(s){ const id = "_t"+(_txtId++); TXT_REG[id] = s; return id; }
function recordById(idx, id){ recordSpeak(idx, TXT_REG[id]); }
function escAttr(s){
  return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// ============== INIT ==============
window.addEventListener("DOMContentLoaded", () => {
  bootApp().catch(handleFatalAuthCheckError);
});

async function bootApp(){
  showHomeLoading("Đang kiểm tra tài khoản...");
  await refreshAuthNavbar();
  if(await renderAuthRoute()){
    updateProgressBar();
    await refreshAuthNavbar();
    return;
  }
  const lessonRoute = resolveLessonRoute();
  const access = await requireLearningAccess();
  if(!access.ok){
    await redirectForLearningAccess(access);
    updateProgressBar();
    await refreshAuthNavbar();
    return;
  }
  await initializeDataLayer();
  if(lessonRoute.matched){
    logLessonArchitectureWarnings();
    if(lessonRoute.lesson) openLesson(lessonRoute.lesson.id, false);
    else {
      window.history.replaceState({}, "", "/");
      goHome(false);
    }
    updateProgressBar();
    return;
  }
  logLessonArchitectureWarnings();
  activateHomeView();
  renderHome();
  updateProgressBar();
  await refreshAuthNavbar();
}

window.addEventListener("popstate", () => {
  handlePopstate().catch(handleFatalAuthCheckError);
});

async function handlePopstate(){
  if(await renderAuthRoute()){
    await refreshAuthNavbar();
    return;
  }
  const lessonRoute = resolveLessonRoute();
  const access = await requireLearningAccess();
  if(!access.ok){
    await redirectForLearningAccess(access, false);
    await refreshAuthNavbar();
    return;
  }
  await initializeDataLayer();
  if(lessonRoute.matched){
    hideAuthView();
    if(lessonRoute.lesson) openLesson(lessonRoute.lesson.id, false);
    else {
      window.history.replaceState({}, "", "/");
      goHome(false);
    }
    return;
  }
  hideAuthView();
  goHome(false);
  await refreshAuthNavbar();
}

function logLessonArchitectureWarnings(){
  if(!LESSON_ARCHITECTURE_WARNINGS?.length) return;
  console.warn("[FClass] Lesson Architecture V1 warnings", LESSON_ARCHITECTURE_WARNINGS);
}

async function initializeDataLayer(){
  if(dataLayerReady) return;
  const result = await getLessons();
  setActiveLessons(result.lessons, result.source, result.warning);
  await hydrateRemoteProgress();
  subscribeLessonsRealtime();
  await subscribeProgressRealtime();
  dataLayerReady = true;
}

function setActiveLessons(lessons, source = LESSON_SOURCE.fallback, warning = ""){
  LESSONS = sortLessons(lessons?.length ? lessons : LOCAL_LESSONS);
  lessonDataSource = source;
  lessonDataWarning = warning || "";
  SORTED_LESSONS = sortLessons(LESSONS);
  TOTAL_LESSONS = SORTED_LESSONS.length;
  FIRST_LESSON_ID = SORTED_LESSONS[0]?.id || 1;
  window.LESSONS = LESSONS;
}

function sortLessons(lessons){
  return [...lessons].sort((a,b)=>a.id-b.id);
}

async function hydrateRemoteProgress(){
  const { data, error } = await getMyProgress();
  if(error || !data?.length) return;
  progress = {
    ...progress,
    ...remoteProgressToLocalShape(data),
  };
}

function subscribeLessonsRealtime(){
  if(lessonRealtimeChannel) unsubscribeLessonRealtime(lessonRealtimeChannel);
  lessonRealtimeChannel = subscribeToLessons(async () => {
    const result = await getLessons();
    setActiveLessons(result.lessons, result.source, result.warning);
    if(STATE.view === "home") renderHome();
    if(STATE.view === "lesson" && STATE.lessonId){
      const lesson = LESSONS.find((item) => item.id === STATE.lessonId);
      if(lesson){
        STATE.sections = [...(lesson.sectionFlow || canonicalLessonSections)];
        renderSidebar(lesson);
      }
    }
  });
}

async function subscribeProgressRealtime(){
  const { user } = await getCurrentUser();
  if(!user) return;
  if(progressRealtimeChannel) unsubscribeProgressRealtime(progressRealtimeChannel);
  progressRealtimeChannel = subscribeToMyProgress(user.id, async () => {
    await hydrateRemoteProgress();
    updateProgressBar();
    if(STATE.view === "home") renderHome();
  });
}

function showHomeLoading(message){
  const grid = document.getElementById("lessonCards");
  if(grid) grid.innerHTML = `<div class="empty-state">${escAttr(message)}</div>`;
}

function activateHomeView(){
  document.getElementById("authCheckView")?.classList.remove("active");
  hideAuthView();
  document.getElementById("homeView")?.classList.add("active");
  document.getElementById("lessonView")?.classList.remove("active");
  STATE.view = "home";
}

async function requireLearningAccess(){
  const student = await requireApprovedStudent();
  if(!student.ok) return student;
  return { ok: true, user: student.user, profile: student.profile };
}

async function redirectForLearningAccess(access, replace = true){
  if(isRecoverableAuthCheckFailure(access)){
    showHomeAuthError(access.message || "Không thể kiểm tra tài khoản. Vui lòng tải lại trang hoặc đăng nhập lại.");
    return;
  }

  let target = "/login";
  if(access.reason === "pending") target = "/pending-approval";
  if(access.reason === "rejected" || access.reason === "blocked") target = "/rejected";
  if(access.reason === "class-membership" || access.reason === "missing-profile" || access.reason === "profile-error") target = "/student";
  if(access.profile?.role === "admin" && access.profile?.status === "approved") target = "/admin";

  if(window.location.pathname !== target){
    const method = replace ? "replaceState" : "pushState";
    window.history[method]({}, "", target);
  }
  await renderAuthRoute();
}

function isRecoverableAuthCheckFailure(access){
  return ["auth-error", "auth-timeout", "profile-error", "profile-timeout"].includes(access?.reason);
}

function showHomeAuthError(message){
  const grid = document.getElementById("lessonCards");
  if(!grid) return;
  activateHomeView();
  grid.innerHTML = `
    <div class="empty-state auth-recovery-state">
      <strong>Không thể kiểm tra tài khoản</strong>
      <span>${escAttr(message)}</span>
      <div class="student-actions">
        <button class="btn-primary" data-auth-reload>Tải lại</button>
        <button class="btn-ghost" data-auth-logout>Đăng xuất</button>
      </div>
    </div>
  `;
  grid.querySelector("[data-auth-reload]")?.addEventListener("click", () => window.location.reload());
  grid.querySelector("[data-auth-logout]")?.addEventListener("click", async () => {
    await signOut();
    dataLayerReady = false;
    window.history.pushState({}, "", "/login");
    await renderAuthRoute();
    await refreshAuthNavbar();
  });
}

function handleFatalAuthCheckError(error){
  console.error("[FClass auth] Unhandled auth/profile check failure", error);
  showHomeAuthError("Không thể kiểm tra tài khoản. Vui lòng tải lại trang hoặc đăng nhập lại.");
}

async function refreshAuthNavbar(){
  const nav = document.querySelector(".topnav");
  if(!nav) return;

  const { user } = await getCurrentUser();
  let profile = null;
  if(user){
    const profileResult = await getCurrentProfile(user.id);
    profile = profileResult.profile;
    if(profileResult.error) console.warn("[FClass auth] Navbar profile check failed", profileResult.error);
  }

  if(!user || !profile){
    nav.innerHTML = `
      <button class="nav-btn" data-nav-login>Đăng nhập</button>
      <button class="nav-btn" data-nav-register>Đăng ký</button>
    `;
  }else if(profile.role === "admin" && profile.status === "approved"){
    nav.innerHTML = `
      ${renderNavUser(profile, user)}
      <button class="nav-btn" data-nav-admin>Admin</button>
      <button class="nav-btn" data-nav-logout>Đăng xuất</button>
    `;
  }else if(profile.role === "student" && profile.status === "approved"){
    nav.innerHTML = `
      ${renderNavUser(profile, user)}
      <button class="nav-btn" data-nav-home>Trang chủ</button>
      <button class="nav-btn" data-nav-progress>Tiến độ</button>
      <button class="nav-btn" data-nav-reset>Reset</button>
      <button class="nav-btn" data-nav-logout>Đăng xuất</button>
    `;
  }else{
    nav.innerHTML = `
      ${renderNavUser(profile, user)}
      <button class="nav-btn" data-nav-status>Trạng thái</button>
      <button class="nav-btn" data-nav-logout>Đăng xuất</button>
    `;
  }

  nav.querySelector("[data-nav-home]")?.addEventListener("click", () => goHome());
  nav.querySelector("[data-nav-login]")?.addEventListener("click", async () => {
    window.history.pushState({}, "", "/login");
    await renderAuthRoute();
    await refreshAuthNavbar();
  });
  nav.querySelector("[data-nav-register]")?.addEventListener("click", async () => {
    window.history.pushState({}, "", "/student-register");
    await renderAuthRoute();
    await refreshAuthNavbar();
  });
  nav.querySelector("[data-nav-admin]")?.addEventListener("click", async () => {
    window.history.pushState({}, "", "/admin");
    await renderAuthRoute();
    await refreshAuthNavbar();
  });
  nav.querySelector("[data-nav-status]")?.addEventListener("click", async () => {
    const target = profile?.status === "rejected" || profile?.status === "blocked" ? "/rejected" : "/pending-approval";
    window.history.pushState({}, "", target);
    await renderAuthRoute();
    await refreshAuthNavbar();
  });
  nav.querySelector("[data-nav-progress]")?.addEventListener("click", showProgress);
  nav.querySelector("[data-nav-reset]")?.addEventListener("click", resetProgress);
  nav.querySelector("[data-nav-logout]")?.addEventListener("click", async () => {
    await signOut();
    dataLayerReady = false;
    window.history.pushState({}, "", "/login");
    await renderAuthRoute();
    await refreshAuthNavbar();
  });
}

function renderNavUser(profile, user){
  const displayName = profile?.full_name || user?.email || "Tài khoản";
  return `<span class="nav-user" title="${escAttr(displayName)}">${escAttr(displayName)}</span>`;
}

// ============== HOME ==============
function renderHome(){
  const grid = document.getElementById("lessonCards");
  const totalWords = LESSONS.reduce((s,l)=>s+(l.vocabulary?.length||0),0);
  document.getElementById("statLessons").textContent = TOTAL_LESSONS;
  document.getElementById("statWords").textContent = totalWords + "+";
  document.getElementById("statDone").textContent = completedLessonCount();

  const next = getNextLessonId();
  document.getElementById("continueLabel").textContent =
    next === 1 ? "Bắt đầu Buổi 1" : `Tiếp tục Buổi ${next}`;

  const fallbackWarning = lessonDataSource === LESSON_SOURCE.fallback && lessonDataWarning
    ? `<div class="empty-state">${escAttr(lessonDataWarning)}</div>`
    : "";

  grid.innerHTML = fallbackWarning + LESSONS.map((l) => {
    const done = progress.done.includes(l.id);
    return `
      <button class="lcard ${done?'done':''}" onclick="openLesson(${l.id})">
        <div class="lcard-head">
          <div class="lcard-num">${String(l.id).padStart(2,"0")}</div>
          <span class="lcard-unit">${l.unit==="Starter"?"STARTER":l.unit.toUpperCase()}</span>
        </div>
        <h3 class="lcard-title">${l.title}</h3>
        <p class="lcard-sub">${l.subtitle||""}</p>
        <div class="lcard-status">
          ${renderLessonStatusBadges(l)}
        </div>
        <div class="lcard-foot">
          <span>${l.vocabulary?.length||0} từ · ${l.minitest?.length||0} câu test</span>
          <span class="lcard-arrow">→</span>
        </div>
      </button>
    `;
  }).join("");
}

function renderLessonStatusBadges(l){
  const status = l.metadata?.status || l.status || {};
  const content = status.content || "partial";
  const code = status.code || "legacy";
  const importStatus = status.import || "manual";
  return `
    <span class="lcard-badge lcard-badge-content">${escAttr(content)}</span>
    <span class="lcard-badge">${escAttr(code)}</span>
    <span class="lcard-badge">${escAttr(importStatus)}</span>
  `;
}

function getNextLessonId(){
  const next = SORTED_LESSONS.find(lesson => !progress.done.includes(lesson.id));
  return next?.id || FIRST_LESSON_ID;
}

function completedLessonCount(){
  return SORTED_LESSONS.filter(lesson => progress.done.includes(lesson.id)).length;
}

function getAdjacentLessonId(id, offset){
  const idx = SORTED_LESSONS.findIndex(lesson => lesson.id === id);
  return idx >= 0 ? SORTED_LESSONS[idx + offset]?.id : null;
}

async function goHome(updateUrl = true){
  const access = await requireLearningAccess();
  if(!access.ok){
    await redirectForLearningAccess(access);
    return;
  }
  await initializeDataLayer();
  closeVideoModal();
  document.getElementById("authCheckView")?.classList.remove("active");
  hideAuthView();
  if(updateUrl && window.location.pathname !== "/") window.history.pushState({}, "", "/");
  STATE.view="home";
  document.getElementById("homeView").classList.add("active");
  document.getElementById("lessonView").classList.remove("active");
  renderHome();
  window.scrollTo({top:0,behavior:"smooth"});
}

function showProgress(){
  const total = TOTAL_LESSONS, done = completedLessonCount();
  const pct = Math.round(done/total*100);
  toast(`📊 Tiến độ: ${done}/${total} buổi (${pct}%)`, "success");
}

function resetProgress(){
  if(!confirm("Bạn chắc chắn muốn xóa tiến độ học?")) return;
  progress = {done:[], hw:{}, sectionsDone:{}};
  saveProgress(progress);
  renderHome();
  updateProgressBar();
  toast("✓ Đã reset tiến độ", "success");
}

function updateProgressBar(){
  const pct = (completedLessonCount()/TOTAL_LESSONS)*100;
  document.getElementById("progressFill").style.width = pct + "%";
}

// ============== LESSON OPEN ==============
async function openLesson(id, updateUrl = true){
  document.getElementById("authCheckView")?.classList.remove("active");
  hideAuthView();
  const canOpen = await requireLessonAccess();
  if(!canOpen.ok){
    toast(canOpen.message, "warning");
    if(canOpen.reason === "unauthenticated"){
      window.history.pushState({}, "", "/login");
    }else if(canOpen.reason === "pending"){
      window.history.pushState({}, "", "/pending-approval");
    }else if(canOpen.reason === "rejected" || canOpen.reason === "blocked"){
      window.history.pushState({}, "", "/rejected");
    }else if(canOpen.profile?.role === "admin"){
      window.history.pushState({}, "", "/admin");
    }else{
      window.history.pushState({}, "", "/student");
    }
    await renderAuthRoute();
    return;
  }
  const lesson = LESSONS.find(l => l.id===id);
  if(!lesson){
    toast("Buổi học này chưa có trong lộ trình Tuwi 27 buổi.", "warning");
    goHome();
    return;
  }
  if(updateUrl && window.location.pathname !== `/lesson/${id}`) window.history.pushState({}, "", `/lesson/${id}`);
  STATE.lessonId = id;
  STATE.view = "lesson";
  STATE.sectionIdx = 0;

  STATE.sections = [...(lesson.sectionFlow || canonicalLessonSections)];

  document.getElementById("homeView").classList.remove("active");
  document.getElementById("lessonView").classList.add("active");

  renderSidebar(lesson);
  renderSection();
  markLessonOpened(lesson.id).catch(() => {});
  window.scrollTo({top:0});
}

async function requireLessonAccess(){
  const student = await requireApprovedStudent();
  if(!student.ok){
    return {
      ok: false,
      reason: student.reason,
      user: student.user,
      profile: student.profile,
      message: student.message || "Vui lòng đăng nhập tài khoản học viên đã được duyệt.",
    };
  }
  const membership = await requireApprovedClassMembership();
  if(!membership.ok){
    return {
      ok: false,
      reason: "class-membership",
      message: membership.error?.message || "Bạn cần được admin duyệt vào lớp trước khi mở bài học.",
    };
  }
  return { ok: true };
}

const SECTION_LABELS = {
  intro:"Giới thiệu", review:"Ôn bài cũ",
  video:"🎬 Giới thiệu Video",
  vocab:"Từ vựng (Flashcard)",
  listen_choose:"🎮 Listen & Choose",
  sent_order:"🔤 Sentence Order",
  vocab_match:"🧩 Ghép từ",
  listen_pick:"🎧 Nghe chọn từ",
  pointShout:"🎯 Point & Shout",
  thisOrThat:"✋ This or That",
  mysteryBag:"🎒 Mystery Bag",
  quizBomb:"💣 Quiz Bomb",
  grammar:"Ngữ pháp",
  story:"📖 Nghe ngữ cảnh",
  listen_quiz:"Nghe trả lời",
  role_play:"🎭 Role Play Card",
  dictation:"✍️ Dictation",
  translate:"Luyện dịch",
  sprint:"⚡ Sprint phản xạ",
  speaking:"Luyện nói (AI)",
  writing:"📝 Điền từ",
  minitest:"Minitest",
  listen_test:"🎧 Minitest Luyện nghe",
  mindmap:"Mindmap",
  homework:"Bài tập về nhà"
};

SECTION_LABELS.dialogue_video = "Video hội thoại";
SECTION_LABELS.dialogue_video_quiz = "Nghe chọn thoại";
SECTION_LABELS.dialogue_video_order = "Điền hội thoại";

function renderSidebar(lesson){
  document.getElementById("sideUnit").textContent = lesson.unit==="Starter"?"STARTER":lesson.unit;
  document.getElementById("sideNum").textContent = `Buổi ${lesson.id}`;
  document.getElementById("sideTitle").textContent = lesson.title;

  const ul = document.getElementById("sideSteps");
  const sectionsDone = progress.sectionsDone[lesson.id] || [];
  ul.innerHTML = STATE.sections.map((s,i)=>`
    <li class="${i===STATE.sectionIdx?'active':''} ${sectionsDone.includes(s)?'complete':''}"
        onclick="jumpTo(${i})">${SECTION_LABELS[s]||s}</li>
  `).join("");

  document.getElementById("sidePrev").disabled = !getAdjacentLessonId(lesson.id, -1);
  document.getElementById("sideNext").disabled = !getAdjacentLessonId(lesson.id, 1);
}

function prevLesson(){
  const prev = getAdjacentLessonId(STATE.lessonId, -1);
  if(prev) openLesson(prev);
}
function nextLesson(){
  const next = getAdjacentLessonId(STATE.lessonId, 1);
  if(next) openLesson(next);
}

function jumpTo(i){
  STATE.sectionIdx = i;
  renderSection();
}

function prevSection(){
  if(STATE.sectionIdx>0){ STATE.sectionIdx--; renderSection(); }
}
function nextSection(){
  const lesson = LESSONS.find(l=>l.id===STATE.lessonId);
  const cur = STATE.sections[STATE.sectionIdx];
  if(!progress.sectionsDone[lesson.id]) progress.sectionsDone[lesson.id]=[];
  if(!progress.sectionsDone[lesson.id].includes(cur)){
    progress.sectionsDone[lesson.id].push(cur);
    saveProgress(progress);
  }

  if(STATE.sectionIdx < STATE.sections.length-1){
    STATE.sectionIdx++;
    renderSection();
    window.scrollTo({top:document.getElementById("lessonView").offsetTop-60,behavior:"smooth"});
  } else {
    if(!progress.done.includes(lesson.id)){
      progress.done.push(lesson.id);
      saveProgress(progress);
    }
    markLessonCompleted(lesson.id).catch(() => {});
    updateProgressBar();
    toast(`🎉 Hoàn thành Buổi ${lesson.id}!`, "success");
    setTimeout(() => {
      const next = getAdjacentLessonId(lesson.id, 1);
      if(next) openLesson(next);
      else goHome();
    }, 1400);
  }
}

// ============== RENDER SECTION ==============
function renderSection(){
  closeVideoModal();
  stopCurrentSpeech();
  stopYouTubeVideos();
  const lesson = LESSONS.find(l=>l.id===STATE.lessonId);
  const stage = document.getElementById("lessonStage");
  const section = STATE.sections[STATE.sectionIdx];

  let html="";
  switch(section){
    case "intro":       html = renderIntro(lesson); break;
    case "review":      html = renderReview(lesson); break;
    case "video":       html = renderVideo(lesson); break;
    case "vocab":       html = renderVocab(lesson); break;
    case "vocab_match": html = renderVocabMatch(lesson); break;
    case "listen_pick": html = renderListenPick(lesson); break;
    case "pointShout":  html = renderPointShout(lesson); break;
    case "thisOrThat":  html = renderThisOrThat(lesson); break;
    case "mysteryBag":  html = renderMysteryBag(lesson); break;
    case "quizBomb":    html = renderQuizBomb(lesson); break;
    case "grammar":        html = renderGrammar(lesson); break;
    case "listen_choose":  html = renderListenChoose(lesson); break;
    case "sent_order":     html = renderSentOrder(lesson); break;
    case "role_play":      html = renderRolePlay(lesson); break;
    case "translate":      html = renderTranslate(lesson); break;
    case "dialogue_video": html = renderDialogueVideo(lesson); break;
    case "dialogue_video_quiz": html = renderDialogueVideoQuiz(lesson); break;
    case "dialogue_video_order": html = renderDialogueVideoOrder(lesson); break;
    case "story":          html = renderStory(lesson); break;
    case "listen_quiz": html = renderListenQuiz(lesson); break;
    case "dictation":   html = renderDictation(lesson); break;
    case "sprint":      html = renderSprint(lesson); break;
    case "speaking":    html = renderSpeaking(lesson); break;
    case "writing":     html = renderWriting(lesson); break;
    case "minitest":    html = renderMinitest(lesson); break;
    case "listen_test": html = renderListenTest(lesson); break;
    case "mindmap":     html = renderMindmap(lesson); break;
    case "homework":    html = renderHomework(lesson); break;
    default:            html = renderMissingSection(section); break;
  }
  stage.innerHTML = html;
  scheduleYouTubeFallbacks(stage);

  if(section==="review") initReviewBuoi7(lesson);
  if(section==="vocab_match") initMatchGame(lesson);
  if(section==="listen_pick") initListenPick(lesson);
  if(section==="thisOrThat") initThisOrThat(lesson);
  if(section==="sprint") initSprint(lesson);
  if(section==="listen_choose") initLC(lesson);
  if(section==="sent_order") initSO(lesson);
  if(section==="role_play") initRolePlay(lesson);
  if(section==="translate") initTranslate(lesson);
  if(section==="listen_quiz") initListenQuiz(lesson);
  if(section==="minitest") initMinitest(lesson);
  if(section==="listen_test") initListenTest(lesson);

  renderSidebar(lesson);
  renderDots();
  document.getElementById("ctlPrev").disabled = STATE.sectionIdx===0;
  document.getElementById("ctlNext").textContent =
    STATE.sectionIdx===STATE.sections.length-1 ? "Hoàn thành ✓" : "Tiếp →";
}

function renderMissingSection(section){
  return `
    <div class="stage-h"><span class="stage-tag">Lesson Architecture</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">${escAttr(SECTION_LABELS[section] || section)}</h2>
    <div class="mg-block warm"><p>Cần bổ sung nội dung theo template Buổi 9</p></div>
  `;
}

function renderDots(){
  const dots = document.getElementById("ctlDots");
  dots.innerHTML = STATE.sections.map((_,i)=>`
    <button class="ctl-dot ${i===STATE.sectionIdx?'active':''} ${i<STATE.sectionIdx?'done':''}"
            onclick="jumpTo(${i})" aria-label="Section ${i+1}"></button>
  `).join("");
}

// ============== HIGHLIGHT helper ==============
function highlightText(text){
  // wrap **text** with <span class="hl">
  return String(text).replace(/\*\*([^*]+)\*\*/g, '<span class="hl">$1</span>');
}

// ============== SECTIONS ==============
function renderIntro(l){
  const objectives = (l.objectives||[]).map((o,i)=>`
    <li><span class="obj-num">${i+1}</span><span>${highlightText(o)}</span></li>
  `).join("");
  const intro = l.intro || {};
  const introHtml = intro.focusText || intro.examples?.length ? `
    <div class="mg-block warm" style="margin-top:18px">
      <div class="mg-head"><h4>${escAttr(intro.focusTitle || "Nội dung trọng tâm")}</h4></div>
      ${intro.focusText ? `<p style="margin:0 0 12px;color:var(--ink);line-height:1.65">${highlightText(escAttr(intro.focusText))}</p>` : ""}
      ${intro.examples?.length ? `
        <div class="grammar-examples">
          ${intro.examples.map(ex=>`
            <div class="grammar-ex">
              <div>
                <div class="gex-en">${escAttr(ex.en || ex)}</div>
                ${ex.vi ? `<div class="gex-vi">${escAttr(ex.vi)}</div>` : ""}
              </div>
              <button class="gex-speak" onclick="speakById('${regTxt(ex.en || ex)}')">🔊</button>
            </div>
          `).join("")}
        </div>
      ` : ""}
    </div>
  ` : "";
  return `
    <div class="stage-h">
      <span class="stage-tag">${l.unit==="Starter"?"Starter":l.unit}</span>
      <span class="stage-num">Buổi ${l.id}/${TOTAL_LESSONS}</span>
    </div>
    <h2 class="stage-title">${l.title}</h2>
    <p class="stage-sub">${l.subtitle||""}</p>
    <div class="objectives">
      <h4>Mục tiêu bài học</h4>
      <ul class="obj-list">${objectives}</ul>
    </div>
    ${introHtml}
    <p style="color:var(--ink-mute);font-style:italic;text-align:center">Bấm <b>Tiếp →</b> để bắt đầu hành trình.</p>
  `;
}

function renderReview(l){
  if(!l.review) return "";
  if(l.review.reviewGames) return renderReviewBuoi7(l);
  function renderQ(q,i){
    if(typeof q === 'string') return `<div class="review-q"><b>Q${i+1}</b><span>${q}</span></div>`;
    let html = `<div class="review-q"><b>Q${i+1}</b><span>${q.q}</span></div>`;
    if(q.dialogue?.length){
      html += `<div class="review-dialogue">${q.dialogue.map(d=>`
        <div class="rdlg-line ${d.speaker==='B'?'rdlg-b':''}">
          <div class="rdlg-avatar">${d.speaker}</div>
          <div class="rdlg-bubble">${escAttr(d.text)}
            <button class="rdlg-speak" onclick="speakById('${regTxt(d.text)}')">🔊</button>
          </div>
        </div>`).join("")}</div>`;
    }
    return html;
  }
  return `
    <div class="stage-h"><span class="stage-tag">Review</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">${l.review.title||"Ôn bài cũ"}</h2>
    <div class="review-block">
      <h4>📚 Hãy nhớ lại buổi học trước</h4>
      ${(l.review.questions||[]).map((q,i)=>renderQ(q,i)).join("")}
      <div id="review-done-area" style="text-align:center;margin:30px 0 10px">
        <button class="review-done-btn" onclick="finishReview()">
          <span class="btn-icon">✨</span> Xong rồi, xem tổng kết!
        </button>
      </div>
      <div id="review-summary" class="review-summary" style="display:none">
        ${l.review.summary ? `<div>${l.review.summary}</div>` : ""}
      </div>
      ${l.review.vocabGame ? `
        <div class="mg-block warm" style="margin-top:18px">
          <div class="mg-head"><h4>${escAttr(l.review.vocabGame.title)}</h4><span class="mg-badge">1 GAME</span></div>
          ${(l.review.vocabGame.items||[]).map((item,i)=>`
            <div class="game-question">
              <b>${i+1}.</b> ${escAttr(item.prompt)}
              <button class="rp-reveal-btn" onclick="this.nextElementSibling.style.display='inline-block'">Xem mẫu</button>
              <span class="game-answer" style="display:none">→ ${escAttr(item.answer)}</span>
            </div>
          `).join("")}
        </div>
      ` : ""}
      ${l.review.structures?.length ? `
        <div class="mg-block accent" style="margin-top:18px">
          <div class="mg-head"><h4>Kiến trúc câu cần nhớ</h4></div>
          <div class="game-words">${l.review.structures.map(s=>`<span class="game-word">${escAttr(s)}</span>`).join("")}</div>
        </div>
      ` : ""}
    </div>
    <p style="color:var(--ink-mute);font-style:italic;margin-top:14px">💡 Suy nghĩ kỹ trước khi qua phần mới.</p>
  `;
}

function renderReviewBuoi7(l){
  const rg = l.review.reviewGames;
  return `
    <div class="stage-h"><span class="stage-tag">Review</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">${escAttr(rg.title || l.review.title || "Ôn bài cũ")}</h2>
    <p class="stage-sub">${escAttr(rg.intro || "Ôn lại kiến thức buổi trước trước khi vào bài mới.")}</p>
    <div class="review-block">
      <div class="mg-head">
        <h4>🎧 Game 1: Nghe chọn từ</h4>
        <span class="mg-badge">Review Edition</span>
      </div>
      <div id="reviewGameStage"></div>
    </div>
  `;
}

function initReviewBuoi7(l){
  const rg = l.review?.reviewGames;
  if(!rg) return;
  window._b7Review = {
    vocabulary: rg.vocabulary || [],
    quizBomb: rg.quizBomb || { questions: [] },
    listenIdx: 0,
    listenScore: 0,
    listenDone: false
  };
  _renderReviewListenQuestion(0);
}

function _renderReviewListenQuestion(idx){
  const data = window._b7Review;
  const stage = document.getElementById("reviewGameStage");
  if(!data || !stage) return;
  const questions = data.vocabulary || [];
  if(idx >= questions.length){
    data.listenDone = true;
    stage.innerHTML = `
      <div class="oat-final">
        <div class="oat-final-score">🎧 ${data.listenScore} / ${questions.length}</div>
        <div class="oat-final-msg">Hoàn thành Nghe chọn từ. Sẵn sàng qua Quiz Bomb!</div>
        <button class="qb-start-btn" onclick="startReviewQuizBomb()">Tiếp tục chơi Quiz Bomb →</button>
      </div>
    `;
    return;
  }
  data.listenIdx = idx;
  const q = questions[idx];
  const dots = questions.map((_,i)=>`
    <span class="oat-dot ${i===idx?'active':''} ${i<idx?'done-right':''}"></span>
  `).join("");
  const audioId = regTxt(q.en);
  const letters = ["A","B","C","D"];
  stage.innerHTML = `
    <div class="oat-nav">
      <span class="oat-counter">Câu ${idx+1} / ${questions.length}</span>
      <div class="oat-dots">${dots}</div>
    </div>
    <div class="lc-card" id="b7-review-listen-card">
      <div class="lc-card-head">
        <span class="lc-num">Nghe từ tiếng Anh</span>
        <button class="lc-play-btn" onclick="speakById('${audioId}',0.9)">🔊 Nghe</button>
        <button class="lc-play-btn lc-play-slow" onclick="speakById('${audioId}',0.6)">🐢 Chậm</button>
      </div>
      <div class="lc-audio-label lc-audio-hidden">Bấm loa để nghe, sau đó chọn nghĩa tiếng Việt đúng.</div>
      <div class="lq-question" style="font-size:42px;text-align:center;margin:18px 0 6px">${q.img||"🎧"}</div>
      ${q.ipa ? `<div class="fc-ipa" style="text-align:center;margin-bottom:16px">${escAttr(q.ipa)}</div>` : ""}
      <div class="lc-opts">
        ${(q.options||[]).map((opt,i)=>`
          <button class="lc-opt" data-oi="${i}" data-correct="${i===q.answer?1:0}" onclick="pickReviewListenAnswer(this,${i},${q.answer},${idx},'${audioId}')">
            <span class="lc-letter">${letters[i]}</span>
            <span class="lc-opt-text">${escAttr(opt)}</span>
          </button>
        `).join("")}
      </div>
      <div class="oat-feedback" id="b7ReviewListenFeedback"></div>
    </div>
  `;
}

window.pickReviewListenAnswer = function(btn, picked, correct, idx, audioId){
  const data = window._b7Review;
  const card = document.getElementById("b7-review-listen-card");
  const fb = document.getElementById("b7ReviewListenFeedback");
  if(!data || !card || card.dataset.done) return;
  card.dataset.done = "1";
  const isRight = picked === correct;
  card.querySelectorAll(".lc-opt").forEach((opt,i)=>{
    opt.disabled = true;
    if(i === correct) opt.classList.add("lc-right");
    if(opt === btn && !isRight) opt.classList.add("lc-wrong");
  });
  if(isRight){
    data.listenScore++;
    playCorrect();
  } else {
    playWrong();
  }
  const correctEn = data.vocabulary[idx]?.en || "";
  const correctText = data.vocabulary[idx]?.options?.[correct] || "";
  const nextLabel = idx+1 < data.vocabulary.length ? "Câu tiếp theo →" : "Xem kết quả →";
  fb.innerHTML = `
    <div style="width:100%">
      ${isRight
        ? `<span class="oat-feedback-right">✅ Đúng! Đáp án tiếng Anh: <b>${escAttr(correctEn)}</b> (${escAttr(correctText)})</span>`
        : `<span class="oat-feedback-wrong">❌ Sai! Đáp án tiếng Anh: <b>${escAttr(correctEn)}</b> (${escAttr(correctText)})</span>`
      }
      <button class="oat-next-btn" onclick="_nextReviewListen(${idx+1})">${nextLabel}</button>
    </div>
  `;
  if(audioId) setTimeout(()=>speakById(audioId,0.9), 250);
};

window._nextReviewListen = function(idx){
  _renderReviewListenQuestion(idx);
};

window.startReviewQuizBomb = function(){
  const data = window._b7Review;
  const stage = document.getElementById("reviewGameStage");
  if(!data || !stage) return;
  stage.innerHTML = `
    <div class="mg-head">
      <h4>💣 Game 2: ${escAttr(data.quizBomb.title || "Quiz Bomb Review")}</h4>
      <span class="mg-badge">${(data.quizBomb.questions||[]).length} câu</span>
    </div>
    <p class="mg-intro">${escAttr(data.quizBomb.instruction || "Trả lời trước khi hết giờ.")}</p>
    <div class="mg-block warm" id="reviewQbContainer">
      <div class="qb-start-screen">
        <div class="qb-bomb-icon">💣</div>
        <p>Trả lời <b>${(data.quizBomb.questions||[]).length} câu hỏi</b> trước khi bom nổ!<br>Mỗi câu có <b>5 giây</b>.</p>
        <button class="qb-start-btn" onclick="initReviewQuizBomb()">🚀 Bắt đầu!</button>
      </div>
    </div>
  `;
};

window.initReviewQuizBomb = function(){
  const data = window._b7Review;
  if(!data?.quizBomb?.questions?.length) return;
  window._qbData = {
    questions: data.quizBomb.questions,
    idx: 0,
    score: 0,
    timer: null,
    answered: false,
    containerId: "reviewQbContainer",
    restartFn: "initReviewQuizBomb"
  };
  _renderQBQuestion();
};

window.finishReview = function() {
  const area = document.getElementById('review-done-area');
  const summary = document.getElementById('review-summary');
  if(area) area.style.display = 'none';
  if(summary) {
    summary.style.display = 'block';
    summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Confetti effect
  if(typeof confetti === 'function'){
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0f172a', '#fbbf24', '#ffffff', '#22c55e']
    });
  }
};

// --- VIDEO SECTION ---
function extractYouTubeId(url){
  if (!url) return null;
  const cleanUrl = String(url).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = cleanUrl.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  return null;
}

function resolveYouTubeVideo(video={}){
  const embedUrl = video.embedUrl || video.url || "";
  const originalUrl = video.watchUrl || video.sourceUrl || video.fallbackSearchUrl || video.fallbackUrl || embedUrl || "https://www.youtube.com/";
  
  // Extract ID from any available URLs in the object
  const ytId = extractYouTubeId(video.embedUrl) || extractYouTubeId(video.url) || extractYouTubeId(video.watchUrl) || extractYouTubeId(video.sourceUrl) || "";
  
  if (ytId) {
    const iframeSrc = `https://www.youtube.com/embed/${escAttr(ytId)}?rel=0&modestbranding=1`;
    // Clean original watch URL or construct standard watch URL if original is search
    const videoUrl = (originalUrl.includes("results") || originalUrl.includes("listType")) ? `https://www.youtube.com/watch?v=${ytId}` : originalUrl;
    return { iframeSrc, videoUrl, hasVideo: true, ytId };
  } else {
    // No valid video ID (e.g. search list or invalid URL)
    return { iframeSrc: "", videoUrl: originalUrl, hasVideo: false, ytId: "" };
  }
}

window.showYouTubeFallback = function(el, force = false){
  if(!el) return;
  // If the video is playing or has loaded successfully, do not show the fallback overlay (unless forced)
  if(!force && (el.dataset.playing === "1" || el.dataset.loaded === "1")) {
    return;
  }
  const wrap = el?.closest?.(".yt-player-wrap, .yt-embed, .lt-embed-wrap");
  const fallback = wrap?.querySelector?.(".yt-fallback-bar");
  if(fallback) fallback.classList.add("show");
};

window.hideYouTubeFallback = function(el){
  if(el) el.dataset.loaded = "1";
  const wrap = el?.closest?.(".yt-player-wrap, .yt-embed, .lt-embed-wrap");
  const fallback = wrap?.querySelector?.(".yt-fallback-bar");
  if(fallback) fallback.classList.remove("show");
};

function scheduleYouTubeFallbacks(root=document){
  root.querySelectorAll(".yt-player-wrap iframe, .yt-embed iframe, .lt-embed-wrap iframe").forEach(iframe=>{
    if(iframe.dataset.fallbackScheduled) return;
    iframe.dataset.fallbackScheduled = "1";
    setTimeout(()=>{
      // Check if video successfully loaded/playing before showing the fallback
      if(iframe.dataset.playing === "1" || iframe.dataset.loaded === "1") {
        return;
      }
      showYouTubeFallback(iframe);
    }, 8000);
  });
}

function renderVideo(l){
  if(!l.video) return "";
  const v = l.video;
  const videos = Array.isArray(v.videos) && v.videos.length ? v.videos : [v];
  // store data globally so onclick doesn't need to embed JSON in HTML
  window._currentVideoData = { videos, questions: v.questions||[] };
  const videoCards = videos.map((item,i)=>{
    const scenes = item.scenes || [];
    const scenesHtml = scenes.map(s=>`<li>${s.label}</li>`).join("");
    const sceneSummary = item.sceneSummary || v.sceneSummary || "mục nội dung chính";
    const title = item.title || v.title;
    const description = item.description || v.description || "";
    const duration = item.duration || v.duration || "5 phút";
    const badge = videos.length > 1 ? `VIDEO ${i+1}` : "VIDEO";
    return `
      <div class="video-intro-card">
        <div class="video-intro-header">
          <span class="video-intro-icon">🎬</span>
          <span class="video-intro-badge">${badge}</span>
        </div>
        <h3 class="video-intro-title">"${escAttr(title).toUpperCase()}"</h3>
        <div class="video-intro-body">
          <p>📌 <b>NỘI DUNG VIDEO:</b></p>
          <p>${description}</p>
          ${scenes.length ? `
          <p>Trong video này, có <b>${scenes.length}</b> ${sceneSummary}:</p>
          <ol class="vid-scene-list">${scenesHtml}</ol>` : ""}
          <p>Hãy chú ý các <b>CẤU TRÚC CÂU</b> và <b>TỪ VỰNG</b> được sử dụng!</p>
          <p class="vid-duration">⏱️ Thời gian xem video: <b>${duration}</b></p>
        </div>
        <button class="yt-open-btn" onclick="openVideoModal(${i})">
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="white"/></svg>
          Xem video YouTube
        </button>
      </div>
    `;
  }).join("");
  return `
    <div class="stage-h"><span class="stage-tag">Video</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎬 Giới Thiệu Video</h2>
    ${videoCards}
    <p style="color:var(--ink-mute);font-style:italic;text-align:center;margin-top:14px">💡 Nhấn nút để xem video và trả lời câu hỏi.</p>
  `;
}

window.openVideoModal = function(videoIndex=0){
  stopCurrentSpeech();
  const data = window._currentVideoData || {};
  const selected = data.videos?.[videoIndex] || data;
  const { iframeSrc, videoUrl, hasVideo } = resolveYouTubeVideo(selected);
  const qs = selected.questions || data.questions || [];
  window._VIDEO_QUESTIONS = qs;

  let modal = document.getElementById('videoModal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'videoModal';
    document.body.appendChild(modal);
  }
  modal.className = 'video-modal-overlay';

  const qsHtml = qs.map((q,i)=>{
    const questionText = q.question || q.q || "";
    const normalizedOptions = (q.options || []).map((opt,j)=>{
      const fallbackId = String.fromCharCode(65+j);
      return {
        id: opt?.id || fallbackId,
        text: opt?.text ?? opt
      };
    });
    const correctId = q.correctAnswer || normalizedOptions[q.correct ?? q.answer]?.id || "";
    return `
      <div class="vq-item" id="vq-${i}" data-correct="${escAttr(correctId)}">
        <div class="vq-num">Q${q.id || i+1}</div>
        <div class="vq-content">
          <div class="vq-text">${escAttr(questionText)}</div>
          ${normalizedOptions.length ? `<div class="vq-options">${normalizedOptions.map(opt=>`
            <button class="vq-option" data-option-id="${escAttr(opt.id)}" onclick="selectVideoAnswer(this,${i})">
              <span>${escAttr(opt.id)}</span>
              <b>${escAttr(opt.text)}</b>
            </button>
          `).join("")}</div>` : ""}
          <div class="vq-answer-row">
            <button class="vq-check-btn" onclick="checkVideoAnswer(${i})">Kiểm tra</button>
            <span class="vq-result" id="vqr-${i}"></span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  modal.innerHTML = `
    <div class="video-modal-inner">
      <button class="video-modal-close" onclick="closeVideoModal()">✕</button>
      <div class="video-modal-left" style="display:flex; flex-direction:column; justify-content:center; align-items:stretch; background:#000;">
        <div id="ytPlayerWrap" class="yt-player-wrap" style="flex:1; position:relative; width:100%;">
          ${hasVideo ? `<iframe
            id="ytPlayer"
            src="${escAttr(iframeSrc)}"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"
            loading="lazy"
            onload="hideYouTubeFallback(this)"
            onerror="showYouTubeFallback(this)"></iframe>` : ""}
          <div class="yt-fallback-bar${hasVideo ? "" : " show"}">
            <span class="yt-fallback-text">Không thể nhúng video này. Bấm mở YouTube để xem.</span>
            <a class="yt-fallback-link" href="${escAttr(videoUrl)}" target="_blank" rel="noopener">Mở YouTube</a>
          </div>
        </div>
        <div class="yt-modal-bottom-link-bar" style="background:#111; text-align:center; padding:6px; border-top:1px solid #222; font-size:12px; color:#aaa; flex-shrink:0;">
          Không thể nhúng video này. Bấm mở YouTube để xem. <a href="${escAttr(videoUrl)}" target="_blank" rel="noopener" style="color:#ff3b30; font-weight:bold; text-decoration:underline; margin-left:4px;">Mở YouTube</a>
        </div>
      </div>
      <div class="video-modal-right">
        <h3 class="vq-title">❓ Câu hỏi trong khi xem video</h3>
        <p class="vq-subtitle">Hãy trả lời các câu hỏi sau trong khi xem video:</p>
        <div id="videoQuestionsList">${qsHtml}</div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  const ytId = extractYouTubeId(selected.embedUrl || selected.url || "");
  if (hasVideo && ytId) {
    _loadYouTubeAPI(ytId);
  }
  scheduleYouTubeFallbacks(modal);
};

function _loadYouTubeAPI(ytId){
  window._pendingYtId = ytId;
  if(window.YT && window.YT.Player){ _initYTPlayer(ytId); return; }
  if(!document.getElementById('yt-iframe-api')){
    const s = document.createElement('script');
    s.id = 'yt-iframe-api';
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  }
  window.onYouTubeIframeAPIReady = function(){ _initYTPlayer(window._pendingYtId); };
}

function _initYTPlayer(ytId){
  if(window._ytPlayer){ try{ window._ytPlayer.destroy(); }catch(e){} window._ytPlayer=null; }
  window._ytPlayer = new YT.Player('ytPlayer',{
    videoId: ytId,
    playerVars:{ rel:0, modestbranding:1, enablejsapi:1 },
    events:{
      onReady: function(e){
        const iframe = document.getElementById('ytPlayer');
        if(iframe) {
          iframe.dataset.loaded = "1";
          hideYouTubeFallback(iframe);
        }
      },
      onStateChange: function(e){
        const iframe = document.getElementById('ytPlayer');
        if(iframe) {
          if(e.data === YT.PlayerState.PLAYING) {
            iframe.dataset.playing = "1";
            iframe.dataset.loaded = "1";
            hideYouTubeFallback(iframe);
            _startVidTimer();
          } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.BUFFERING || e.data === YT.PlayerState.CUED) {
            iframe.dataset.loaded = "1";
            hideYouTubeFallback(iframe);
            _stopVidTimer();
          } else {
            _stopVidTimer();
          }
        } else {
          if(e.data === YT.PlayerState.PLAYING) _startVidTimer();
          else _stopVidTimer();
        }
      },
      onError: function(e){
        const iframe = document.getElementById('ytPlayer');
        if(iframe) {
          showYouTubeFallback(iframe, true);
        }
      }
    }
  });
}

function _startVidTimer(){
  _stopVidTimer();
  window._ytTimer = setInterval(()=>{
    if(!window._ytPlayer || typeof window._ytPlayer.getCurrentTime!=='function') return;
    _updateActiveVQ(window._ytPlayer.getCurrentTime());
  }, 500);
}

function _stopVidTimer(){
  if(window._ytTimer){ clearInterval(window._ytTimer); window._ytTimer=null; }
}

function _updateActiveVQ(t){
  const qs = window._VIDEO_QUESTIONS||[];
  let active = -1;
  for(let i=0;i<qs.length;i++){
    if(qs[i].timestamp!=null && t >= qs[i].timestamp) active = i;
  }
  qs.forEach((_,i)=>{
    const el = document.getElementById(`vq-${i}`);
    if(el) el.classList.toggle('vq-active', i===active);
  });
}

window.selectVideoAnswer = function(btn, qIndex){
  const item = document.getElementById(`vq-${qIndex}`);
  if(!item || item.dataset.done) return;
  item.dataset.selected = btn.dataset.optionId || "";
  item.querySelectorAll(".vq-option").forEach(opt=>opt.classList.remove("selected"));
  btn.classList.add("selected");
  const result = document.getElementById(`vqr-${qIndex}`);
  if(result) result.textContent = "";
};

window.checkVideoAnswer = function(qIndex){
  const item = document.getElementById(`vq-${qIndex}`);
  if(!item || item.dataset.done) return;
  const selected = item.dataset.selected;
  const result = document.getElementById(`vqr-${qIndex}`);
  if(!selected){
    if(result) result.textContent = "Hãy chọn 1 đáp án trước.";
    return;
  }
  item.dataset.done = "1";
  const correct = item.dataset.correct;
  const isRight = selected === correct;
  item.querySelectorAll(".vq-option").forEach(opt=>{
    const id = opt.dataset.optionId;
    opt.disabled = true;
    if(id === correct) opt.classList.add("right");
    if(id === selected && !isRight) opt.classList.add("wrong");
  });
  const checkBtn = item.querySelector(".vq-check-btn");
  if(checkBtn) checkBtn.disabled = true;
  if(result){
    result.textContent = isRight ? "Đúng!" : `Sai. Đáp án đúng: ${correct}`;
    result.className = `vq-result ${isRight ? "right" : "wrong"}`;
  }
  if(isRight) playCorrect(); else playWrong();
};

window.closeVideoModal = function(){
  stopCurrentSpeech();
  _stopVidTimer();
  const iframe = document.getElementById('ytPlayer');
  if (iframe) {
    try {
      iframe.src = 'about:blank';
    } catch(e) {}
  }
  if(window._ytPlayer){
    try {
      window._ytPlayer.stopVideo();
    } catch(e) {}
    try {
      window._ytPlayer.destroy();
    } catch(e) {}
    window._ytPlayer = null;
  }
  const wrap = document.getElementById('ytPlayerWrap');
  if (wrap) {
    wrap.innerHTML = '';
  }
  const m = document.getElementById('videoModal');
  if(m) m.style.display = 'none';
  document.body.style.overflow = '';
};

// --- VOCAB FLASHCARDS ---
function renderVocab(l){
  if(l.videoVocabulary?.length || l.extraFlashcards?.length){
    const primary = l.videoVocabulary?.length ? l.videoVocabulary : l.vocabulary;
    const secondary = l.extraFlashcards || [];
    const cardHtml = (v) => `
      <div class="flashcard" onclick="this.classList.toggle('flipped')">
        <button class="fc-speak" onclick="event.stopPropagation();speakById('${regTxt(v.en)}',0.9)">🔊</button>
        <button class="fc-speak fc-speak-slow" onclick="event.stopPropagation();speakById('${regTxt(v.en)}',0.6)" title="Phát âm chậm">🐢</button>
        <div class="flashcard-inner">
          <div class="flashcard-face flashcard-front">
            <div class="fc-emoji">${v.img||"📝"}</div>
            <div class="fc-word">${v.en}</div>
            ${v.ipa?`<div class="fc-ipa">${v.ipa}</div>`:""}
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="fc-emoji">${v.img||"📝"}</div>
            <div class="fc-vi">${v.vi}</div>
            ${v.note?`<div class="fc-ipa fc-ipa--back">${v.note}</div>`:""}
            ${v.exampleQuestion?`<div class="fc-ipa fc-ipa--back"><b>Q:</b> ${escAttr(v.exampleQuestion)}${v.exampleAnswer?`<br><b>A:</b> ${escAttr(v.exampleAnswer)}`:""}</div>`:""}
          </div>
        </div>
      </div>
    `;
    return `
      <div class="stage-h"><span class="stage-tag">Vocabulary</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
      <h2 class="stage-title">Từ vựng trong video</h2>
      <p class="vocab-intro">Ưu tiên học các từ xuất hiện trong video trước, sau đó ôn thêm mẫu câu và hội thoại.</p>
      <div class="vocab-group">
        <div class="vocab-group-header">Trong video</div>
        <div class="vocab-grid">${primary.map(cardHtml).join("")}</div>
      </div>
      ${secondary.length ? `<div class="vocab-group"><div class="vocab-group-header">Cấu trúc + video hội thoại</div><div class="vocab-grid">${secondary.map(cardHtml).join("")}</div></div>` : ""}
    `;
  }
  const hasGroups = l.vocabulary.some(v=>v.group) && l.vocabGroups;

  const cardHtml = (v) => `
    <div class="flashcard" onclick="this.classList.toggle('flipped')">
      <button class="fc-speak" onclick="event.stopPropagation();speakById('${regTxt(v.en)}',0.9)">🔊</button>
      <button class="fc-speak fc-speak-slow" onclick="event.stopPropagation();speakById('${regTxt(v.en)}',0.6)" title="Phát âm chậm">🐢</button>
      <div class="flashcard-inner">
        <div class="flashcard-face flashcard-front">
          <div class="fc-emoji">${v.img||"📝"}</div>
          <div class="fc-word">${v.en}</div>
          ${v.ipa?`<div class="fc-ipa">${v.ipa}</div>`:""}
        </div>
        <div class="flashcard-face flashcard-back">
          <div class="fc-emoji">${v.img||"📝"}</div>
          <div class="fc-vi">${v.vi}</div>
          ${v.ipa?`<div class="fc-ipa fc-ipa--back">${v.ipa}</div>`:""}
          ${v.note?`<div class="fc-ipa fc-ipa--back">${escAttr(v.note)}</div>`:""}
          ${v.exampleQuestion?`<div class="fc-ipa fc-ipa--back"><b>Q:</b> ${escAttr(v.exampleQuestion)}${v.exampleAnswer?`<br><b>A:</b> ${escAttr(v.exampleAnswer)}`:""}</div>`:""}
        </div>
      </div>
    </div>
  `;

  let gridHtml;
  if(hasGroups){
    const groups = {};
    l.vocabulary.forEach(v=>{ (groups[v.group]||(groups[v.group]=[])).push(v); });
    const keys = Object.keys(groups);
    gridHtml = `
      <div class="match-group-tabs vocab-tabs">
        ${keys.map((gk,i)=>`
          <button class="match-gtab ${i===0?'active':''}" onclick="switchVocabGroup('${gk}')">${l.vocabGroups[gk]||gk}</button>
        `).join("")}
      </div>
      ${keys.map((gk,i)=>`
      <div class="vocab-group vocab-tab-panel ${i===0?'active':''}" data-vocab-group="${gk}">
        <div class="vocab-group-header">${l.vocabGroups[gk]||gk}</div>
        <div class="vocab-grid">${groups[gk].map(cardHtml).join("")}</div>
      </div>
    `).join("")}`;
  } else {
    gridHtml = `<div class="vocab-grid">${l.vocabulary.map(cardHtml).join("")}</div>`;
  }

  return `
    <div class="stage-h"><span class="stage-tag">Vocabulary</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">Từ vựng cốt lõi</h2>
    <p class="vocab-intro">📌 <b>Click thẻ để lật</b> xem nghĩa · <b>Click 🔊</b> để nghe phát âm · IPA hiện trên thẻ để luyện phát âm chuẩn.</p>
    ${gridHtml}
  `;
}

window.switchVocabGroup = function(group){
  document.querySelectorAll(".vocab-tabs .match-gtab").forEach(btn=>{
    btn.classList.toggle("active", btn.getAttribute("onclick")?.includes(`'${group}'`));
  });
  document.querySelectorAll(".vocab-tab-panel").forEach(panel=>{
    panel.classList.toggle("active", panel.dataset.vocabGroup === group);
  });
};

// --- VOCAB MATCH GAME (với Rounds & Chunking) ---
function renderVocabMatch(l){
  const hasGroups = l.vocabulary.some(v=>v.group) && l.vocabGroups;
  const tabsHtml = hasGroups ? `
    <div class="match-group-tabs">
      ${Object.keys(l.vocabGroups).map((gk,i)=>`
        <button class="match-gtab ${!l.matchAll && i===0?'active':''}" onclick="switchMatchGroup('${gk}')">${l.vocabGroups[gk]}</button>
      `).join("")}
      <button class="match-gtab ${l.matchAll?'active':''}" onclick="switchMatchGroup('all')">🔀 Tất cả</button>
    </div>
  ` : "";
  return `
    <div class="stage-h"><span class="stage-tag">Minigame · Ghép từ</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🧩 Ghép từ với nghĩa</h2>
    <p class="stage-sub">Chọn 1 từ tiếng Anh, sau đó chọn nghĩa tiếng Việt tương ứng. Sai sẽ rung — đúng sẽ phát âm.</p>
    ${tabsHtml}
    <div class="mg-block accent">
      <div class="mg-head">
        <h4>🎯 Tìm cặp đúng <span id="matchRoundInfo" style="font-size:0.85em;color:#666;"></span></h4>
        <span class="mg-score" id="matchScore">0/0</span>
      </div>
      <div class="match-grid" id="matchGrid"></div>
      <div id="matchNextRound" style="text-align:center;margin-top:20px;"></div>
    </div>
  `;
}

function initMatchGame(l){
  const firstGroup = l.matchAll ? null : (l.vocabulary.find(v=>v.group)?.group || null);
  STATE._matchLesson = l;
  STATE._matchGroup = firstGroup;
  _runMatchGame(l, firstGroup);
}

function _runMatchGame(l, group){
  const pool = group && group!=="all" ? l.vocabulary.filter(v=>v.group===group) : l.vocabulary;

  // Bước 1: Shuffle toàn bộ pool 1 lần duy nhất
  const shuffledPool = shuffle([...pool]);

  // Bước 2: Chia thành chunks, mỗi lượt tối đa 10 cặp và không lặp trước khi hết pool.
  const chunkSize = 10;
  const chunks = [];
  for(let i = 0; i < shuffledPool.length; i += chunkSize){
    chunks.push(shuffledPool.slice(i, i + chunkSize));
  }

  // Lưu vào STATE
  STATE.matchChunks = chunks;
  STATE.matchCurrentRound = 0;
  STATE.matchTotalRounds = chunks.length;

  // Render round đầu tiên
  _renderMatchRound();
}

function _renderMatchRound(){
  const currentChunk = STATE.matchChunks[STATE.matchCurrentRound];
  STATE.matchTotal = currentChunk.length;
  STATE.matchScore = 0;
  STATE.matchSelected = null;
  STATE.matchPairs = currentChunk;

  // Cập nhật UI
  document.getElementById("matchScore").textContent = `0/${currentChunk.length}`;
  document.getElementById("matchRoundInfo").textContent =
    STATE.matchTotalRounds > 1 ? `(Vòng ${STATE.matchCurrentRound + 1}/${STATE.matchTotalRounds})` : "";

  // Shuffle riêng cho EN và VI
  const enList = shuffle(currentChunk.map((v,i)=>({...v, side:"en", id:i})));
  const viList = shuffle(currentChunk.map((v,i)=>({...v, side:"vi", id:i})));

  const grid = document.getElementById("matchGrid");
  grid.innerHTML = `
    <div class="match-col">
      <h5>English</h5>
      ${enList.map(v=>`<button class="match-item" data-side="en" data-id="${v.id}" onclick="pickMatch(this)">
        ${v.img||""} ${v.en}${v.ipa?`<span class="match-ipa">${v.ipa}</span>`:""}
      </button>`).join("")}
    </div>
    <div class="match-col">
      <h5>Tiếng Việt</h5>
      ${viList.map(v=>`<button class="match-item" data-side="vi" data-id="${v.id}" onclick="pickMatch(this)">${v.vi}</button>`).join("")}
    </div>
  `;

  // Xóa nút Next Round
  document.getElementById("matchNextRound").innerHTML = "";
}

window.switchMatchGroup = function(group){
  document.querySelectorAll(".match-gtab").forEach(b=>b.classList.remove("active"));
  const btn = [...document.querySelectorAll(".match-gtab")].find(b=>b.getAttribute("onclick")?.includes(`'${group}'`));
  if(btn) btn.classList.add("active");
  _runMatchGame(STATE._matchLesson, group==="all"?null:group);
};

window.nextMatchRound = function(){
  STATE.matchCurrentRound++;
  _renderMatchRound();
};

window.restartMatchGame = function(){
  _runMatchGame(STATE._matchLesson, STATE._matchGroup);
};

function pickMatch(el){
  if(el.classList.contains("matched")) return;
  if(STATE.matchSelected === el){ el.classList.remove("selected"); STATE.matchSelected=null; return; }
  if(!STATE.matchSelected){
    document.querySelectorAll(".match-item.selected").forEach(e=>e.classList.remove("selected"));
    el.classList.add("selected");
    STATE.matchSelected = el;
    return;
  }
  const a = STATE.matchSelected, b = el;
  if(a.dataset.side===b.dataset.side){
    a.classList.remove("selected"); b.classList.add("selected");
    STATE.matchSelected = b;
    return;
  }
  if(a.dataset.id===b.dataset.id){
    a.classList.add("matched"); b.classList.add("matched");
    a.classList.remove("selected");
    STATE.matchScore++;
    document.getElementById("matchScore").textContent = `${STATE.matchScore}/${STATE.matchTotal}`;

    // Kiểm tra hoàn thành round hiện tại
    if(STATE.matchScore === STATE.matchTotal){
      const isLastRound = STATE.matchCurrentRound === STATE.matchTotalRounds - 1;

      if(isLastRound){
        // Hoàn thành tất cả rounds
        toast("🎉 Hoàn thành xuất sắc! Bạn đã ôn tập hết 100% từ vựng!", "success");
        document.getElementById("matchNextRound").innerHTML = `
          <button class="btn-primary" onclick="restartMatchGame()" style="padding:12px 24px;font-size:16px;border-radius:8px;border:none;background:#4CAF50;color:white;cursor:pointer;">
            🔄 Chơi lại từ đầu
          </button>
        `;
      } else {
        // Còn rounds tiếp theo
        toast("✅ Hoàn thành vòng này! Tiếp tục vòng tiếp theo.", "success");
        document.getElementById("matchNextRound").innerHTML = `
          <button class="btn-primary" onclick="nextMatchRound()" style="padding:12px 24px;font-size:16px;border-radius:8px;border:none;background:#2196F3;color:white;cursor:pointer;">
            ➡️ Vòng tiếp theo (${STATE.matchCurrentRound + 2}/${STATE.matchTotalRounds})
          </button>
        `;
      }
    }

    speak(STATE.matchPairs[parseInt(a.dataset.id)].en);
  } else {
    a.classList.add("wrong"); b.classList.add("wrong");
    setTimeout(()=>{ a.classList.remove("wrong","selected"); b.classList.remove("wrong"); }, 500);
  }
  STATE.matchSelected = null;
}

// --- LISTEN PICK (nghe → chọn từ) ---
function renderListenPick(l){
  if(l.listenPick?.questions?.length){
    const n = l.listenPick.questions.length;
    const dots = Array.from({length:n},(_,i)=>`<span class="oat-dot" id="lp-custom-dot-${i}"></span>`).join("");
    return `
      <div class="stage-h"><span class="stage-tag">Minigame · Nghe chọn từ</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
      <h2 class="stage-title">🎧 Nghe → Chọn đáp án</h2>
      <p class="stage-sub">${escAttr(l.listenPick.instruction || "Nghe audio rồi chọn đáp án đúng theo bảng bài học.")}</p>
      <div class="oat-nav">
        <span class="oat-counter" id="lpCustomCounter">1 / ${n}</span>
        <div class="oat-dots">${dots}</div>
      </div>
      <div id="lpCustomFrame"></div>
    `;
  }
  const hasGroups = l.vocabulary.some(v=>v.group) && l.vocabGroups;
  const tabsHtml = hasGroups ? `
    <div class="match-group-tabs">
      ${Object.keys(l.vocabGroups).map((gk,i)=>`
        <button class="match-gtab ${!l.listenPickAll && i===0?'active':''}" onclick="switchListenGroup('${gk}')">${l.vocabGroups[gk]}</button>
      `).join("")}
      <button class="match-gtab ${l.listenPickAll?'active':''}" onclick="switchListenGroup('all')">🔀 Tất cả</button>
    </div>
  ` : "";
  return `
    <div class="stage-h"><span class="stage-tag">Minigame · Nghe chọn từ</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎧 Nghe → Chọn đáp án</h2>
    <p class="stage-sub">2 mini-game khác nhau để luyện <b>phản xạ nghe</b> đa chiều với từ vựng vừa học.</p>
    ${tabsHtml}
    <div class="mg-block warm-orange" id="lpBlockA">
      <div class="mg-head">
        <h4>🎯 Game 1: Xem nghĩa → Chọn từ tiếng Anh</h4>
        <span class="mg-score" id="lpScoreA">0/0</span>
      </div>
      <p class="mg-intro">Nhìn nghĩa tiếng Việt, click 🔊 để nghe lại, sau đó chọn từ tiếng Anh đúng.</p>
      <div id="lpStageA"></div>
    </div>
    <div class="mg-block accent" id="lpBlockB">
      <div class="mg-head">
        <h4>🔊 Game 2: Nghe từ → Chọn nghĩa tiếng Việt</h4>
        <span class="mg-score" id="lpScoreB">0/0</span>
      </div>
      <p class="mg-intro">Click 🔊 để nghe từ tiếng Anh, sau đó chọn nghĩa tiếng Việt đúng. Bấm 🐢 để nghe chậm.</p>
      <div id="lpStageB"></div>
    </div>
  `;
}

function initListenPick(l){
  if(l.listenPick?.questions?.length){
    window._lpCustom = { questions: l.listenPick.questions, score: 0 };
    _showLPCustom(0);
    return;
  }
  STATE._lpLesson = l;
  const firstGroup = l.listenPickAll ? null : (l.vocabulary.find(v=>v.group)?.group || null);
  _runListenPick(l, firstGroup);
}

function _showLPCustom(idx){
  const data = window._lpCustom;
  const frame = document.getElementById("lpCustomFrame");
  if(!data || !frame) return;
  const questions = data.questions;
  const n = questions.length;
  if(idx >= n){
    frame.innerHTML = `<div class="oat-final"><div class="oat-final-score">🏆 ${data.score} / ${n}</div><div class="oat-final-msg">${data.score===n?"Xuất sắc!":"Hoàn thành rồi, luyện lại để phản xạ nhanh hơn."}</div><button class="qb-start-btn" onclick="_showLPCustom(0); window._lpCustom.score=0;">🔄 Chơi lại</button></div>`;
    return;
  }
  const q = questions[idx];
  const audioId = regTxt(q.audio || q.en || "");
  const letters = ["A","B","C","D"];
  document.getElementById("lpCustomCounter").textContent = `${idx+1} / ${n}`;
  document.querySelectorAll(".oat-dot").forEach((d,i)=>{ d.className = "oat-dot"+(i===idx?" active":""); });
  frame.innerHTML = `
    <div class="lc-card" id="lp-custom-card">
      <div class="lc-card-head">
        <span class="lc-num">CÂU ${idx+1} / ${n}</span>
        <button class="lc-play-btn" onclick="speakById('${audioId}',0.9)">🔊 Nghe</button>
        <button class="lc-play-btn lc-play-slow" onclick="speakById('${audioId}',0.6)">🐢 Chậm</button>
      </div>
      <div class="lc-audio-label lc-audio-hidden">Bấm nghe, sau đó chọn nghĩa/câu đúng.</div>
      <div class="lc-opts">
        ${(q.options||[]).map((opt,i)=>`
          <button class="lc-opt" data-correct="${i===q.answer?1:0}" onclick="_pickLPCustom(this,${idx},${i})">
            <span class="lc-letter">${letters[i]||i+1}</span>
            <span class="lc-opt-text">${escAttr(opt)}</span>
          </button>
        `).join("")}
      </div>
      <div class="oat-feedback" id="lpCustomFeedback"></div>
    </div>
  `;
  setTimeout(()=>speakById(audioId,0.9), 250);
}

window._pickLPCustom = function(btn, idx, picked){
  const data = window._lpCustom;
  const card = document.getElementById("lp-custom-card");
  if(!data || !card || card.dataset.done) return;
  card.dataset.done = "1";
  const q = data.questions[idx];
  const isRight = picked === q.answer;
  card.querySelectorAll(".lc-opt").forEach((opt,i)=>{
    opt.disabled = true;
    if(i===q.answer) opt.classList.add("lc-right");
    if(opt===btn && !isRight) opt.classList.add("lc-wrong");
  });
  if(isRight){ data.score++; playCorrect(); } else playWrong();
  const dot = document.getElementById(`lp-custom-dot-${idx}`);
  if(dot) dot.className = "oat-dot "+(isRight?"done-right":"done-wrong");
  const fb = document.getElementById("lpCustomFeedback");
  const ans = q.options[q.answer];
  fb.innerHTML = `
    <div style="width:100%">
      ${isRight ? `<span class="oat-feedback-right">✅ Đúng! <em>${escAttr(ans)}</em></span>` : `<span class="oat-feedback-wrong">❌ Sai! Đáp án: <b>${escAttr(ans)}</b></span>`}
      <button class="oat-next-btn" onclick="_showLPCustom(${idx+1})">${idx+1 < data.questions.length ? "Câu tiếp theo →" : "Xem kết quả →"}</button>
    </div>
  `;
};

function _runListenPick(l, group){
  const pool = group && group!=="all" ? l.vocabulary.filter(v=>v.group===group) : l.vocabulary;
  const sample = shuffle([...pool]);
  STATE.lpA = { sample, score:0, currentIndex:0 };
  STATE.lpB = { sample, score:0, currentIndex:0 };
  STATE._lpGroup = group; // Lưu group hiện tại
  document.getElementById("lpScoreA").textContent = `0/${sample.length}`;
  document.getElementById("lpScoreB").textContent = `0/${sample.length}`;

  // Render câu hỏi đầu tiên cho cả 2 game
  _renderLPQuestion('A', pool);
  _renderLPQuestion('B', pool);
}

function makeListenOptions(answer, pool, key, count = 4){
  const correctText = answer?.[key] || "";
  const seen = new Set([normalizeOptionText(correctText)]);
  const distractors = shuffle(pool)
    .map(item => item?.[key] || "")
    .filter(text => {
      const normalized = normalizeOptionText(text);
      if(!normalized || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .slice(0, Math.max(0, count - 1));

  return shuffle([
    { text: correctText, correct: true },
    ...distractors.map(text => ({ text, correct: false }))
  ]);
}

function _renderLPQuestion(group, pool){
  const st = group === 'A' ? STATE.lpA : STATE.lpB;
  const stageId = group === 'A' ? 'lpStageA' : 'lpStageB';
  const stage = document.getElementById(stageId);

  if(st.currentIndex >= st.sample.length){
    // Hoàn thành tất cả câu hỏi
    stage.innerHTML = `
      <div class="listen-complete">
        <h3>🎉 Hoàn thành!</h3>
        <p>Điểm số: ${st.score}/${st.sample.length}</p>
      </div>
    `;
    return;
  }

  const v = st.sample[st.currentIndex];
  const i = st.currentIndex;

  if(group === 'A'){
    const opts = makeListenOptions(v, pool, "en", 4);
    stage.innerHTML = `
      <div class="listen-q" id="lpQ${group}${i}">
        <div class="listen-q-head">
          <span class="listen-q-num">Q${i+1}/${st.sample.length}</span>
          <span class="listen-q-text">${v.img||""} <b>${escAttr(v.vi)}</b>${v.ipa?` <span class="lp-ipa">${escAttr(v.ipa)}</span>`:""}</span>
          <button class="listen-play" onclick="speak('${escAttrJs(v.vi)}', 0.9, null, 'vi-VN')">🔊 Nghe</button>
        </div>
        <div class="listen-opts" id="lpOpts${group}${i}">
          ${opts.map(o=>`<button class="listen-opt" data-correct="${o.correct?1:0}" data-text="${escAttr(o.text)}" onclick="checkLP(this,'${group}',${i}, '${regTxt(v.en)}', '${escAttrJs(v.en)}')">${escAttr(o.text)}</button>`).join("")}
        </div>
        <div id="lpFeedback${group}${i}" class="listen-feedback" style="display:none;margin-top:12px;"></div>
        <div id="lpNext${group}${i}" style="display:none;margin-top:16px;text-align:center;">
          <button class="btn-primary" onclick="nextLPQuestion('${group}')" style="padding:10px 20px;font-size:15px;border-radius:6px;border:none;background:#2196F3;color:white;cursor:pointer;">
            Tiếp tục →
          </button>
        </div>
      </div>
    `;
  } else {
    const opts = makeListenOptions(v, pool, "vi", 4);
    stage.innerHTML = `
      <div class="listen-q" id="lpQ${group}${i}">
        <div class="listen-q-head">
          <span class="listen-q-num">Q${i+1}/${st.sample.length}</span>
          <button class="listen-play" onclick="speakById('${regTxt(v.en)}', 0.85)">🔊 Nghe từ</button>
          <button class="listen-play" onclick="speakById('${regTxt(v.en)}', 0.6)" style="background:var(--yellow);color:var(--navy);border-color:var(--yellow-2)">🐢 Chậm</button>
          ${v.ipa?`<span class="lp-ipa">${escAttr(v.ipa)}</span>`:""}
        </div>
        <div class="listen-opts" id="lpOpts${group}${i}">
          ${opts.map(o=>`<button class="listen-opt" data-correct="${o.correct?1:0}" data-text="${escAttr(o.text)}" onclick="checkLP(this,'${group}',${i}, '${regTxt(v.en)}', '${escAttrJs(v.vi)}')">${escAttr(o.text)}</button>`).join("")}
        </div>
        <div id="lpFeedback${group}${i}" class="listen-feedback" style="display:none;margin-top:12px;"></div>
        <div id="lpNext${group}${i}" style="display:none;margin-top:16px;text-align:center;">
          <button class="btn-primary" onclick="nextLPQuestion('${group}')" style="padding:10px 20px;font-size:15px;border-radius:6px;border:none;background:#2196F3;color:white;cursor:pointer;">
            Tiếp tục →
          </button>
        </div>
      </div>
    `;
  }
}

window.switchListenGroup = function(group){
  document.querySelectorAll(".match-group-tabs .match-gtab").forEach(b=>b.classList.remove("active"));
  const btn = [...document.querySelectorAll(".match-group-tabs .match-gtab")].find(b=>b.getAttribute("onclick")?.includes(`'${group}'`));
  if(btn) btn.classList.add("active");
  _runListenPick(STATE._lpLesson, group==="all"?null:group);
};

function escAttrJs(s){
  return String(s).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"');
}

function normalizeOptionText(text){
  return String(text || "").trim().toLowerCase();
}

function createListenPickState(sample, pool, mode){
  return {
    questions: sample.map((v,i)=>{
      const key = mode === "A" ? "en" : "vi";
      return {
        word: v,
        num: i + 1,
        options: makeUniqueOptions(v, pool, key, 4)
      };
    }),
    idx: 0,
    score: 0,
    answered: false,
    selectedOption: null
  };
}

function checkLP(btn, group, qid, audioId, correctAnswer){
  const optsContainer = document.getElementById(`lpOpts${group}${qid}`);
  if(optsContainer.dataset.answered) return; // Đã trả lời rồi

  optsContainer.dataset.answered = "1";
  const isCorrect = btn.dataset.correct === "1";

  // Disable tất cả các nút
  const allBtns = optsContainer.querySelectorAll(".listen-opt");
  allBtns.forEach(b => {
    b.style.pointerEvents = "none";
    // Highlight đáp án đúng
    if(b.dataset.correct === "1"){
      b.classList.add("right");
    }
  });

  // Đánh dấu nút được chọn
  if(isCorrect){
    btn.classList.add("right");
  } else {
    btn.classList.add("wrong");
  }

  // Cập nhật điểm
  const st = group === "A" ? STATE.lpA : STATE.lpB;
  if(isCorrect){
    st.score++;
  }

  // Cập nhật score display
  document.getElementById(group === "A" ? "lpScoreA" : "lpScoreB").textContent =
    `${st.score}/${st.sample.length}`;

  // Hiển thị feedback
  const feedbackEl = document.getElementById(`lpFeedback${group}${qid}`);
  if(isCorrect){
    feedbackEl.innerHTML = `<span style="color:#4CAF50;font-weight:600;">✅ Đúng!</span>`;
  } else {
    feedbackEl.innerHTML = `<span style="color:#f44336;font-weight:600;">❌ Sai! Đáp án đúng: <b>${correctAnswer}</b></span>`;
  }
  feedbackEl.style.display = "block";

  // Hiển thị nút Tiếp tục
  const nextBtn = document.getElementById(`lpNext${group}${qid}`);
  nextBtn.style.display = "block";

  // Phát âm từ đúng
  if(audioId) speakById(audioId, 0.9);
}

window.nextLPQuestion = function(group){
  const st = group === 'A' ? STATE.lpA : STATE.lpB;
  st.currentIndex++;

  // Lấy pool từ STATE._lpLesson
  const l = STATE._lpLesson;
  const currentGroup = STATE._lpGroup;
  const pool = currentGroup && currentGroup !== "all"
    ? l.vocabulary.filter(v => v.group === currentGroup)
    : l.vocabulary;

  _renderLPQuestion(group, pool);
};

// --- MEMORY ---

// --- CLASSROOM GAMES ---
function renderPointShout(l){
  if(!l.pointShout) return "";
  const g = l.pointShout;
  const wordIds = g.round1.words.map(w=>regTxt(w));
  const q2 = g.round2.questions.map((q,i)=>{
    const qid = regTxt(q.q);
    const aid = regTxt(q.answer);
    return `
      <div class="ps-q2-item" id="psq${i}">
        <div class="ps-q2-row">
          <button class="ps-speak-btn" onclick="speakById('${qid}',0.9)">🔊</button>
          <span class="ps-q2-text"><b>Q${i+1}:</b> ${q.q} <span class="ps-point-badge">${q.point}</span></span>
        </div>
        <button class="ps-reveal-btn" onclick="document.getElementById('psAns${i}').style.display='block';speakById('${aid}',0.9)">👁 Xem đáp án</button>
        <div class="ps-answer" id="psAns${i}" style="display:none">→ ${q.answer}</div>
      </div>
    `;
  }).join("");
  return `
    <div class="stage-h"><span class="stage-tag">Game</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎯 ${g.title}</h2>
    <p class="stage-sub">${g.instruction}</p>
    <div class="mg-block warm">
      <div class="ps-round-header">
        <h3>🎮 ${g.round1.title}</h3>
        <button class="ps-auto-btn" onclick="_psAutoPlay([${wordIds.map(id=>`'${id}'`).join(",")}],0)">▶ Tự động phát</button>
      </div>
      <div class="game-words">
        ${g.round1.words.map((w,i)=>`<button class="game-word ps-word-btn" onclick="speakById('${wordIds[i]}',0.9);this.classList.add('ps-active');setTimeout(()=>this.classList.remove('ps-active'),600)">${w}</button>`).join("")}
      </div>
      <h3 style="margin-top:2rem">🎮 ${g.round2.title}</h3>
      ${q2}
      <div class="game-scoring">⭐ ${g.scoring}</div>
    </div>
  `;
}

function _psAutoPlay(ids, idx){
  if(idx >= ids.length) return;
  speakById(ids[idx], 0.9);
  setTimeout(()=>_psAutoPlay(ids, idx+1), 2200);
}

function renderThisOrThat(l){
  if(!l.thisOrThat) return "";
  const g = l.thisOrThat;
  return `
    <div class="stage-h"><span class="stage-tag">Game</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">✋ ${g.title}</h2>
    <p class="stage-sub">${g.instruction}</p>
    <div class="mg-block warm">
      <div class="game-rule">${g.rule}</div>
      <div class="tot-score-bar"><span>Điểm: <b id="totScore">0</b>/${g.questions.length}</span></div>
      <div id="totGameArea"></div>
      <div id="totBonusArea" style="display:none">
        <h3 style="margin-top:2rem">🎁 ${g.bonus.title}</h3>
        ${g.bonus.questions.map((q,i)=>`
          <div class="game-question">
            <b>${i+1}.</b> ${q.q}
            <div class="tot-bonus-row">
              <input class="tot-bonus-input" id="totBonusInp${i}" placeholder="Điền vào...">
              <button class="tot-check-btn" onclick="_checkTOTBonus(${i},'${q.answer.split(' / ')[0]}','${q.answer}')">✓ Kiểm tra</button>
            </div>
            <div class="tot-bonus-result" id="totBonusRes${i}"></div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function initThisOrThat(l){
  if(!l.thisOrThat) return;
  window._totData = { questions: l.thisOrThat.questions, idx: 0, score: 0 };
  _renderTOTQuestion();
}

function _renderTOTQuestion(){
  const d = window._totData;
  const area = document.getElementById("totGameArea");
  if(!area) return;
  if(d.idx >= d.questions.length){
    document.getElementById("totBonusArea").style.display = "block";
    area.innerHTML = `<div class="tot-complete">🎉 Hoàn thành vòng chính! Điểm: ${d.score}/${d.questions.length}</div>`;
    return;
  }
  const q = d.questions[d.idx];
  const sid = regTxt(q.sentence);
  area.innerHTML = `
    <div class="tot-question-card">
      <div class="tot-q-num">Câu ${d.idx+1}/${d.questions.length}</div>
      <div class="tot-sentence">
        <button class="ps-speak-btn" onclick="speakById('${sid}',0.9)">🔊</button>
        "${q.sentence}"
      </div>
      <div class="tot-choices">
        <button class="tot-btn tot-left" onclick="_pickTOT('left')">✋ GẦN<br><small>This / These</small></button>
        <button class="tot-btn tot-right" onclick="_pickTOT('right')">✋ XA<br><small>That / Those</small></button>
      </div>
      <div class="tot-feedback" id="totFeedback"></div>
    </div>
  `;
  speakById(sid, 0.9);
}

function _pickTOT(side){
  const d = window._totData;
  if(d.idx >= d.questions.length) return;
  const q = d.questions[d.idx];
  const correct = side === q.answer;
  const fb = document.getElementById("totFeedback");
  if(fb){
    fb.innerHTML = correct
      ? `<span class="tot-ok">✅ Đúng! ${q.answer==='left'?'This/These = GẦN':'That/Those = XA'}</span>`
      : `<span class="tot-wrong">❌ Sai! Đáp án đúng: ${q.answer==='left'?'✋ TAY TRÁI (This/These)':'✋ TAY PHẢI (That/Those)'}</span>`;
  }
  if(correct){ d.score++; document.getElementById("totScore").textContent = d.score; }
  d.idx++;
  setTimeout(_renderTOTQuestion, 1400);
}

function _checkTOTBonus(i, primary, allAnswers){
  const inp = document.getElementById(`totBonusInp${i}`);
  const res = document.getElementById(`totBonusRes${i}`);
  if(!inp || !res) return;
  const val = inp.value.trim().toLowerCase();
  const accepted = allAnswers.split(" / ").map(a=>a.trim().toLowerCase());
  const ok = accepted.includes(val);
  res.innerHTML = ok
    ? `<span class="tot-ok">✅ Đúng! (${allAnswers})</span>`
    : `<span class="tot-wrong">❌ Sai. Đáp án: <b>${allAnswers}</b></span>`;
  if(ok) speak(primary, 0.9);
}

const MB_ITEM_MAP = {
  "bút":"pen","sách":"book","chìa khóa":"key","kính":"glasses","điện thoại":"phone","ví tiền":"wallet",
  "gôm":"eraser","thước":"ruler","kéo":"scissors","bấm":"stapler","túi":"bag","đèn":"lamp",
  "cục tẩy":"eraser","đồng hồ":"watch","ô":"umbrella","lược":"comb","tai nghe":"headphones",
  "sạc":"charger","bút chì":"pencil","khăn giấy":"tissue","gương":"mirror","máy tính":"calculator",
  "bàn chải":"toothbrush","vở":"notebook","bút lông":"marker","kẹp giấy":"stapler","quạt":"fan",
  "remote":"remote control"
};

function renderMysteryBag(l){
  if(!l.mysteryBag) return "";
  const g = l.mysteryBag;
  const itemCards = g.items.map((item,i)=>{
    const enWord = MB_ITEM_MAP[item] || item;
    const eid = regTxt(enWord);
    return `
      <div class="mb-item-card" id="mbItem${i}" onclick="_flipMBItem(${i},'${eid}')">
        <div class="mb-item-front">🎒<br><small>Click để lật</small></div>
        <div class="mb-item-back" style="display:none">
          <div class="mb-item-vi">${item}</div>
          <div class="mb-item-en">${enWord}</div>
          <button class="ps-speak-btn" onclick="event.stopPropagation();speakById('${eid}',0.9)">🔊</button>
        </div>
      </div>
    `;
  }).join("");
  const adjChips = g.adjectives.map(adj=>{
    const aid = regTxt(adj);
    return `<button class="mb-adj-chip" onclick="speakById('${aid}',0.9)">${adj} 🔊</button>`;
  }).join("");
  const dialogueLines = g.dialogue.map(d=>{
    const tid = regTxt(d.text);
    return `
      <div class="game-question mb-dlg-line">
        <button class="ps-speak-btn" onclick="speakById('${tid}',0.9)">🔊</button>
        <span><b>${d.speaker}:</b> <em>${d.text}</em></span>
      </div>
    `;
  }).join("");
  return `
    <div class="stage-h"><span class="stage-tag">Game</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎒 ${g.title}</h2>
    <p class="stage-sub">${g.instruction}</p>
    <div class="mg-block warm">
      <h3>📦 Click thẻ để lật & nghe phát âm:</h3>
      <div class="mb-items-grid">${itemCards}</div>
      <h3 style="margin-top:2rem">✨ Click tính từ để nghe:</h3>
      <div class="mb-adj-row">${adjChips}</div>
      <h3 style="margin-top:2rem">💬 Ví dụ hội thoại (click 🔊 để nghe):</h3>
      ${dialogueLines}
      <div class="game-scoring">⭐ ${g.scoring}</div>
    </div>
  `;
}

function _flipMBItem(i, eid){
  const card = document.getElementById(`mbItem${i}`);
  if(!card) return;
  const front = card.querySelector(".mb-item-front");
  const back = card.querySelector(".mb-item-back");
  if(back.style.display === "none"){
    front.style.display = "none";
    back.style.display = "flex";
    speakById(eid, 0.9);
    card.classList.add("mb-flipped");
  } else {
    front.style.display = "flex";
    back.style.display = "none";
    card.classList.remove("mb-flipped");
  }
}

function renderQuizBomb(l){
  if(!l.quizBomb) return "";
  const g = l.quizBomb;
  return `
    <div class="stage-h"><span class="stage-tag">Game</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">💣 ${g.title}</h2>
    <p class="stage-sub">${g.instruction}</p>
    <div class="mg-block warm" id="qbContainer">
      <div class="qb-start-screen">
        <div class="qb-bomb-icon">💣</div>
        <p>Trả lời <b>${g.questions.length} câu hỏi</b> trước khi bom nổ!<br>Mỗi câu có <b>5 giây</b>.</p>
        <button class="qb-start-btn" onclick="initQuizBomb(LESSONS.find(l=>l.id===STATE.lessonId))">🚀 Bắt đầu!</button>
      </div>
    </div>
  `;
}

function initQuizBomb(l){
  if(!l?.quizBomb) return;
  window._qbData = { questions: l.quizBomb.questions, idx: 0, score: 0, timer: null, answered: false, containerId: "qbContainer", restartFn: "initQuizBomb" };
  _renderQBQuestion();
}

function _renderQBQuestion(){
  const d = window._qbData;
  const container = document.getElementById(d.containerId || "qbContainer");
  if(!container) return;
  if(d.idx >= d.questions.length){
    const pct = Math.round(d.score/d.questions.length*100);
    const medal = pct===100?"🏆":pct>=70?"🥈":"🥉";
    container.innerHTML = `
      <div class="qb-score-screen">
        <div style="font-size:4rem">${medal}</div>
        <h3>Kết quả: ${d.score}/${d.questions.length}</h3>
        <div class="qb-score-bar-wrap"><div class="qb-score-bar-fill" style="width:${pct}%"></div></div>
        <p>${pct===100?"Hoàn hảo! 🎉":pct>=70?"Rất tốt! 👍":"Cố gắng thêm nhé! 💪"}</p>
        <button class="qb-start-btn" onclick="${d.restartFn || "initQuizBomb"}(LESSONS.find(l=>l.id===STATE.lessonId))">🔄 Chơi lại</button>
      </div>
    `;
    return;
  }
  const q = d.questions[d.idx];
  d.answered = false;
  container.innerHTML = `
    <div class="qb-progress">${d.idx+1}/${d.questions.length} · Điểm: ${d.score}</div>
    <div class="qb-timer-wrap"><div class="qb-timer-bar" id="qbTimerBar"></div></div>
    <div class="quiz-bomb-q">
      <div class="qb-num">💣 Câu ${d.idx+1}</div>
      <div class="qb-question">${q.q}</div>
      <div class="qb-options">
        ${q.options.map((opt,j)=>`
          <button class="qb-opt-btn" id="qbOpt${j}" onclick="_pickQB(${j})">${String.fromCharCode(65+j)}. ${opt}</button>
        `).join("")}
      </div>
    </div>
  `;
  speak(q.q, 0.9);
  if(d.timer) clearInterval(d.timer);
  let timeLeft = 5;
  const bar = document.getElementById("qbTimerBar");
  if(bar){ bar.style.width="100%"; bar.style.transition="width 5s linear"; requestAnimationFrame(()=>{ bar.style.width="0%"; }); }
  d.timer = setInterval(()=>{
    timeLeft--;
    if(timeLeft <= 0){
      clearInterval(d.timer);
      if(!d.answered) _pickQB(-1);
    }
  }, 1000);
}

function _pickQB(chosen){
  const d = window._qbData;
  if(d.answered) return;
  d.answered = true;
  clearInterval(d.timer);
  const q = d.questions[d.idx];
  const correct = q.answer;
  for(let j=0; j<q.options.length; j++){
    const btn = document.getElementById(`qbOpt${j}`);
    if(!btn) continue;
    btn.disabled = true;
    if(j===correct) btn.classList.add("qb-opt-correct");
    else if(j===chosen) btn.classList.add("qb-opt-wrong");
  }
  if(chosen === correct){
    d.score++;
    speak(q.options[correct], 0.9);
  } else {
    speak(q.options[correct], 0.9);
  }
  d.idx++;
  setTimeout(_renderQBQuestion, 1600);
}

// --- GRAMMAR ---
function renderGrammarRichTable(table){
  if(!table?.headers?.length || !table?.rows?.length) return "";
  return `<table class="grammar-table grammar-rich-table">
    <thead><tr>${table.headers.map(h=>`<th>${escAttr(h)}</th>`).join("")}</tr></thead>
    <tbody>${table.rows.map(row=>`
      <tr>${row.map(cell=>`<td>${highlightText(escAttr(cell))}</td>`).join("")}</tr>
    `).join("")}</tbody>
  </table>`;
}

function renderGrammarRichExamples(examples=[]){
  if(!examples.length) return "";
  return `
    <div class="grammar-examples grammar-rich-examples">
      ${examples.map(ex=>{
        const en = typeof ex === "string" ? ex : (ex.en || ex.text || "");
        const vi = typeof ex === "string" ? "" : (ex.vi || ex.note || "");
        return `
          <div class="grammar-ex">
            <div>
              <div class="gex-en">${highlightText(escAttr(en))}</div>
              ${vi ? `<div class="gex-vi">${escAttr(vi)}</div>` : ""}
            </div>
            <button class="gex-speak" onclick="speakById('${regTxt(en)}')">🔊</button>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderGrammarRichMistakes(mistakes=[]){
  if(!mistakes.length) return "";
  return `
    <div class="grammar-rich-mistakes">
      ${mistakes.map(item=>`
        <div class="grammar-rich-mistake">
          <div><b>Sai:</b> ${highlightText(escAttr(item.wrong || ""))}</div>
          <div><b>Đúng:</b> ${highlightText(escAttr(item.right || ""))}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderGrammarRichBullets(items=[]){
  if(!items.length) return "";
  return `<ul class="grammar-rich-list">${items.map(item=>`<li>${highlightText(escAttr(item))}</li>`).join("")}</ul>`;
}

function renderGrammarRichSection(section, nested=false){
  const titleTag = nested ? "h5" : "h4";
  return `
    <div class="${nested ? "grammar-rich-subsection" : "mg-block accent grammar-rich-section"}">
      <${titleTag}>${escAttr(section.title || "")}</${titleTag}>
      ${section.intro ? `<p class="grammar-rich-intro">${highlightText(escAttr(section.intro))}</p>` : ""}
      ${section.formula ? `<div class="grammar-formula"><div class="box">${highlightText(escAttr(section.formula))}</div></div>` : ""}
      ${(section.paragraphs || []).map(p=>`<p class="grammar-rich-intro">${highlightText(escAttr(p))}</p>`).join("")}
      ${(section.tables || []).map(renderGrammarRichTable).join("")}
      ${renderGrammarRichExamples(section.examples || [])}
      ${renderGrammarRichMistakes(section.mistakes || [])}
      ${renderGrammarRichBullets(section.items || [])}
      ${(section.subsections || []).map(sub=>renderGrammarRichSection(sub, true)).join("")}
    </div>
  `;
}

function renderGrammarRichSections(sections=[]){
  return sections.length ? `<div class="grammar-rich-wrap">${sections.map(section=>renderGrammarRichSection(section)).join("")}</div>` : "";
}

function renderGrammar(l){
  if(!l.grammar) return "";
  const g = l.grammar;

  // ── Structured format (structures + commonQA) ──────────────────────
  if(g.structures?.length){
    const structColors = ["#1a2a5e","#0f5132","#7c2d12","#1e3a5f"];
    const structCards = g.structures.map((s,i)=>`
      <div class="gs-card" style="--gs-color:${structColors[i%structColors.length]}">
        <div class="gs-header">
          <span class="gs-num">CẤU TRÚC ${s.num}</span>
          <span class="gs-pattern">${s.pattern}</span>
        </div>
        <div class="gs-meta">
          <span class="gs-vi">(${s.vi})</span>
          <span class="gs-style">— ${s.style}</span>
        </div>
        <div class="gs-example">
          <span class="gs-ex-icon">✏️</span>
          <span>Ví dụ: <b>"${s.example}"</b></span>
          <button class="gs-speak" onclick="speakById('${regTxt(s.example)}')">🔊</button>
        </div>
        <div class="gs-ex-vi">${s.exampleVi}</div>
        <div class="gs-context">
          <span class="gs-ctx-icon">📍</span>
          <span>Dùng khi: ${s.context}</span>
        </div>
        ${s.commonMistake || s.mistake ? `
        <div class="gs-context gs-mistake">
          <span class="gs-ctx-icon">⚠️</span>
          <span>Lỗi thường gặp: ${escAttr(s.commonMistake || s.mistake)}</span>
        </div>` : ""}
      </div>
    `).join("");

    const qaHtml = g.commonQA?.length ? `
      <div class="gs-qa-box">
        <div class="gs-qa-title">✅ CÁC CÂU HỎI &amp; CÂU TRẢ LỜI THƯỜNG DÙNG:</div>
        <ul class="gs-qa-list">
          ${g.commonQA.map(qa=>`
            <li>
              <span class="gs-qa-q">"${qa.q}"</span>
              <span class="gs-qa-arrow">→</span>
              <span class="gs-qa-a">${qa.a}</span>
              <button class="gs-speak" onclick="speakById('${regTxt(qa.q)}')">🔊</button>
            </li>
          `).join("")}
        </ul>
      </div>
    ` : "";
    const richHtml = renderGrammarRichSections(g.sections || []);

    return `
      <div class="stage-h"><span class="stage-tag">Grammar</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
      <h2 class="stage-title">${g.title}</h2>
      <div class="gs-intro-box">
        <span class="gs-intro-icon">📋</span>
        <span>${escAttr(g.badge || "4 CẤU TRÚC CÂU THƯỜNG DÙNG")}</span>
      </div>
      ${g.intro ? `<p class="gs-intro-text">"${g.intro}"</p>` : ""}
      <div class="gs-cards">${structCards}</div>
      ${richHtml}
      ${qaHtml}
    `;
  }

  // ── Standard format (fallback for other lessons) ───────────────────
  let table = "";
  if(g.table){
    table = `<table class="grammar-table">
      <thead><tr>${g.table.headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead>
      <tbody>${g.table.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>`;
  }
  let theory = highlightText(g.theory||"");
  return `
    <div class="stage-h"><span class="stage-tag">Grammar</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">${g.title}</h2>
    ${g.formula ? `<div class="grammar-formula"><div class="box">${g.formula}</div></div>` : ""}
    <div class="grammar-block">
      <h4>📖 Lý thuyết</h4>
      <div class="grammar-theory">${theory}</div>
      ${table}
      <h4 style="margin-top:18px;font-size:18px">💬 Ví dụ</h4>
      <div class="grammar-examples">
        ${(g.examples||[]).map(ex=>`
          <div class="grammar-ex">
            <div>
              <div class="gex-en">${ex.en}</div>
              <div class="gex-vi">${ex.vi}</div>
            </div>
            <button class="gex-speak" onclick="speakById('${regTxt(ex.en)}')">🔊</button>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// --- FILL IN THE BLANKS GAME (Điền từ vào đoạn hội thoại) ---
function renderSentOrder(l){
  if(!l.sentenceOrder) return "";
  const n = l.sentenceOrder.questions.length;
  const dots = Array.from({length:n},(_,i)=>`<span class="oat-dot" id="fib-dot-${i}"></span>`).join("");
  return `
    <div class="stage-h"><span class="stage-tag">Game · Fill in the Blanks</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">💬 Điền từ vào đoạn hội thoại</h2>
    <div class="fib-header-box">
      <span class="fib-header-icon">💬</span>
      <div>
        <div class="fib-header-title">GAME 2: "FILL IN THE BLANKS" — ĐIỀN TỪ VÀO CHỖ TRỐNG</div>
        <div class="fib-rule">🎯 <b>LUẬT CHƠI:</b> Click vào chỗ trống [ ___ ] và chọn từ đúng từ các đáp án.</div>
      </div>
    </div>
    <div class="oat-nav">
      <span class="oat-counter" id="fibCounter">1 / ${n}</span>
      <div class="oat-dots">${dots}</div>
    </div>
    <div id="fibFrame"></div>
  `;
}

function initSO(l){
  // Convert sentenceOrder data to fill-in-blanks format
  const questions = l.sentenceOrder.questions.map(q => {
    // Tạo conversation từ câu trả lời
    const answer = q.answer;
    const words = q.words;

    // Chọn 2-3 từ quan trọng để làm blank
    const blanks = [];
    const answerWords = answer.split(' ');

    // Tìm các từ trong answer có trong words list
    answerWords.forEach((word, idx) => {
      const cleanWord = word.replace(/[?.!,]/g, '').toLowerCase();
      if(words.includes(cleanWord) && blanks.length < 3) {
        blanks.push({
          index: idx,
          word: word,
          options: shuffle([word, ...shuffle(words.filter(w => w !== cleanWord)).slice(0, 2)])
        });
      }
    });

    return {
      conversation: answer,
      blanks: blanks
    };
  });

  window._fibData = { questions, currentIndex: 0, score: 0 };
  _showFIBQ(0);
}

function _showFIBQ(idx){
  const { questions } = window._fibData;
  const q = questions[idx];
  const n = questions.length;

  // Build conversation với blanks
  const words = q.conversation.split(' ');
  let conversationHtml = '';

  words.forEach((word, i) => {
    const blank = q.blanks.find(b => b.index === i);
    if(blank) {
      conversationHtml += `<span class="fib-blank" id="fib-blank-${i}" data-answer="${escAttr(blank.word)}" data-idx="${i}" onclick="showFIBOptions(${i}, ${idx})">[ ___ ]</span> `;
    } else {
      conversationHtml += `<span class="fib-word">${word}</span> `;
    }
  });

  document.getElementById("fibFrame").innerHTML = `
    <div class="fib-card" id="fib-card-cur">
      <div class="fib-conversation">
        <div class="fib-bubble">
          <div class="fib-speaker">💭 Conversation</div>
          <div class="fib-text" id="fib-text-cur">${conversationHtml}</div>
        </div>
      </div>

      <div class="fib-options-container" id="fib-options-container" style="display:none;">
        <div class="fib-options-title">Chọn từ đúng:</div>
        <div class="fib-options" id="fib-options"></div>
      </div>

      <div class="fib-actions">
        <button class="fib-check-btn" id="fib-check-btn" onclick="fibCheckAnswer(${idx})" disabled>✔ Kiểm tra</button>
        <button class="fib-reset-btn" onclick="fibReset()">↺ Làm lại</button>
        <span class="fib-result" id="fib-result"></span>
      </div>

      <div class="oat-feedback" id="fibFeedback"></div>
    </div>
  `;

  document.getElementById("fibCounter").textContent = `${idx+1} / ${n}`;
  document.querySelectorAll(".oat-dot").forEach((d,i)=>{ d.className = "oat-dot" + (i===idx?" active":""); });

  // Store blanks data
  window._currentBlanks = q.blanks;
  window._filledBlanks = {};
}

window.showFIBOptions = function(blankIdx, qIdx){
  const card = document.getElementById("fib-card-cur");
  if(card.dataset.done) return;

  const blank = window._currentBlanks.find(b => b.index === blankIdx);
  if(!blank) return;

  const container = document.getElementById("fib-options-container");
  const optionsDiv = document.getElementById("fib-options");

  container.style.display = "block";
  optionsDiv.innerHTML = blank.options.map(opt => `
    <button class="fib-option-btn" onclick="selectFIBOption(${blankIdx}, '${escAttr(opt)}')">${opt}</button>
  `).join("");

  // Highlight current blank
  document.querySelectorAll(".fib-blank").forEach(b => b.classList.remove("fib-blank-active"));
  document.getElementById(`fib-blank-${blankIdx}`).classList.add("fib-blank-active");
};

window.selectFIBOption = function(blankIdx, word){
  const blankEl = document.getElementById(`fib-blank-${blankIdx}`);
  blankEl.innerHTML = `<span class="fib-filled">${word}</span>`;
  blankEl.classList.remove("fib-blank-active");
  blankEl.classList.add("fib-blank-filled");

  window._filledBlanks[blankIdx] = word;

  // Hide options
  document.getElementById("fib-options-container").style.display = "none";

  // Check if all blanks filled
  const allFilled = window._currentBlanks.every(b => window._filledBlanks[b.index]);
  document.getElementById("fib-check-btn").disabled = !allFilled;
};

window.fibCheckAnswer = function(idx){
  const card = document.getElementById("fib-card-cur");
  if(card.dataset.done) return;

  card.dataset.done = '1';

  let allCorrect = true;
  window._currentBlanks.forEach(blank => {
    const blankEl = document.getElementById(`fib-blank-${blank.index}`);
    const filled = window._filledBlanks[blank.index];
    const correct = filled.replace(/[?.!,]/g, '').toLowerCase() === blank.word.replace(/[?.!,]/g, '').toLowerCase();

    if(correct) {
      blankEl.classList.add("fib-blank-correct");
    } else {
      blankEl.classList.add("fib-blank-wrong");
      allCorrect = false;
    }
  });

  const result = document.getElementById("fib-result");
  if(allCorrect){
    result.textContent='✅ Chính xác!';
    result.className='fib-result fib-correct';
    window._fibData.score++;

    // Speak the full sentence
    const fullText = window._fibData.questions[idx].conversation;
    speak(fullText, 0.9);
  } else {
    result.textContent='❌ Có lỗi, hãy xem lại!';
    result.className='fib-result fib-wrong';
  }

  document.getElementById("fib-check-btn").disabled = true;

  const dot = document.getElementById(`fib-dot-${idx}`);
  if(dot) dot.className = "oat-dot " + (allCorrect?"done-right":"done-wrong");

  const n = window._fibData.questions.length;
  const fb = document.getElementById("fibFeedback");
  if(idx+1 < n){
    fb.innerHTML = `<button class="oat-next-btn" onclick="_nextFIBQ(${idx+1})">Câu tiếp theo →</button>`;
  } else {
    const sc = window._fibData.score;
    fb.innerHTML = `<div class="oat-final"><div class="oat-final-score">🏆 ${sc} / ${n}</div><div class="oat-final-msg">${sc===n?"Xuất sắc! 🎉":sc>=n/2?"Tốt lắm! 👍":"Cố gắng hơn nhé! 💪"}</div></div>`;
  }
};

window.fibReset = function(){
  const card = document.getElementById("fib-card-cur");
  if(card.dataset.done) return;

  window._filledBlanks = {};

  window._currentBlanks.forEach(blank => {
    const blankEl = document.getElementById(`fib-blank-${blank.index}`);
    blankEl.innerHTML = '[ ___ ]';
    blankEl.classList.remove("fib-blank-filled", "fib-blank-active");
  });

  document.getElementById("fib-options-container").style.display = "none";
  document.getElementById("fib-check-btn").disabled = true;
  document.getElementById("fib-result").textContent = '';
};

window._nextFIBQ = function(idx){
  window._fibData.currentIndex = idx;
  _showFIBQ(idx);
};

window._nextSOQ = function(idx){ _showSOQ(idx); };

// --- LISTEN & CHOOSE GAME (one-at-a-time) ---
function renderListenChoose(l){
  if(!l.listenChoose) return "";
  const n = l.listenChoose.questions.length;
  const dots = Array.from({length:n},(_,i)=>`<span class="oat-dot" id="lc-dot-${i}"></span>`).join("");
  return `
    <div class="stage-h"><span class="stage-tag">Game · Listen &amp; Choose</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎮 Listen &amp; Choose</h2>
    <div class="lc-header-box">
      <span class="lc-header-icon">🎧</span>
      <div>
        <div class="lc-header-title">GAME 1: "LISTEN &amp; CHOOSE" — NGHE VÀ CHỌN CÂU ĐÚNG</div>
        <div class="lc-rule">🎯 <b>LUẬT CHƠI:</b> Nghe câu tiếng Anh, chọn nghĩa tiếng Việt đúng nhất.</div>
      </div>
    </div>
    <div class="oat-nav">
      <span class="oat-counter" id="lcCounter">1 / ${n}</span>
      <div class="oat-dots">${dots}</div>
    </div>
    <div id="lcFrame"></div>
  `;
}

function initLC(l){
  window._lcData = { questions: l.listenChoose.questions, score: 0 };
  _showLCQ(0);
}

function _showLCQ(idx){
  const { questions } = window._lcData;
  const q = questions[idx];
  const n = questions.length;
  const letters = ["A","B","C","D"];
  const optsHtml = q.options.map((opt,oi)=>`
    <button class="lc-opt" data-oi="${oi}" data-correct="${oi===q.answer?1:0}"
            onclick="checkLC(this,${oi},${q.answer},'${regTxt(q.audio)}',${idx})">
      <span class="lc-letter">${letters[oi]}</span>
      <span class="lc-opt-text">${opt}</span>
    </button>
  `).join("");
  document.getElementById("lcFrame").innerHTML = `
    <div class="lc-card" id="lc-card-cur">
      <div class="lc-card-head">
        <span class="lc-num">CÂU ${idx+1} / ${n}</span>
        <button class="lc-play-btn" onclick="speakById('${regTxt(q.audio)}')">🔊 Nghe câu</button>
        <button class="lc-play-btn lc-play-slow" onclick="speakById('${regTxt(q.audio)}',0.6)">🐢 Chậm</button>
      </div>
      <div class="lc-audio-label">"${q.audio}"</div>
      <div class="lc-opts">${optsHtml}</div>
      <div class="oat-feedback" id="lcFeedback"></div>
    </div>
  `;
  document.getElementById("lcCounter").textContent = `${idx+1} / ${n}`;
  document.querySelectorAll(".oat-dot").forEach((d,i)=>{ d.className = "oat-dot" + (i===idx?" active":""); });
  speakById(regTxt(q.audio));
}

window.checkLC = function(btn, oi, correct, audioId, idx){
  const card = document.getElementById("lc-card-cur");
  if(card.dataset.done) return;
  card.dataset.done = "1";
  const isRight = oi === correct;
  card.querySelectorAll(".lc-opt").forEach(b=>{
    b.disabled = true;
    if(parseInt(b.dataset.correct)) b.classList.add("lc-right");
    if(b===btn && !isRight) b.classList.add("lc-wrong");
  });
  if(isRight){ window._lcData.score++; if(audioId) speakById(audioId, 0.9); }
  const dot = document.getElementById(`lc-dot-${idx}`);
  if(dot) dot.className = "oat-dot " + (isRight?"done-right":"done-wrong");
  const fb = document.getElementById("lcFeedback");
  const n = window._lcData.questions.length;
  if(isRight){
    fb.innerHTML = `<span class="oat-feedback-right">✅ Đúng!</span>`;
  } else {
    const ansLetter = ["A","B","C","D"][correct];
    fb.innerHTML = `<span class="oat-feedback-wrong">❌ Sai! Đáp án đúng: <b>${ansLetter}</b></span>`;
  }
  if(idx+1 < n){
    fb.innerHTML += `<button class="oat-next-btn" onclick="_nextLCQ(${idx+1})">Câu tiếp theo →</button>`;
  } else {
    const sc = window._lcData.score;
    fb.innerHTML += `<div class="oat-final"><div class="oat-final-score">🏆 ${sc} / ${n}</div><div class="oat-final-msg">${sc===n?"Xuất sắc! 🎉":sc>=n/2?"Tốt lắm! 👍":"Cố gắng hơn nhé! 💪"}</div></div>`;
  }
};

window._nextLCQ = function(idx){
  _showLCQ(idx);
};

// --- ROLE PLAY CARD GAME (speech practice) ---
function renderRolePlay(l){
  if(!l.rolePlay) return "";
  const n = l.rolePlay.pairs.length;
  const pages = Math.ceil(n/2);
  return `
    <div class="stage-h"><span class="stage-tag">Game · Role Play Card</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎭 Role Play Card</h2>
    <div class="rp-header-box">
      <span class="rp-header-icon">🎭</span>
      <div>
        <div class="rp-header-title">GAME 3: "ROLE PLAY CARD" — ${escAttr(l.rolePlay.title||"GHÉ CỬA HÀNG & ĐẶT ĐỒ ĂN")}</div>
        <div class="rp-rule">🎯 Nhấn 🎤 <b>nói câu trả lời</b> hoặc 👁 xem đáp án. AI chấm độ chính xác.</div>
      </div>
    </div>
    <div class="rp-page-nav" id="rpPageNav"></div>
    <div id="rpPageFrame"></div>
  `;
}

function initRolePlay(l){
  window._rpPairs = l.rolePlay.pairs;
  _showRPPage(0);
}

function _showRPPage(page){
  const pairs = window._rpPairs;
  const n = pairs.length;
  const pages = Math.ceil(n/2);
  const start = page*2, end = Math.min(start+2, n);
  const nav = document.getElementById("rpPageNav");
  const frame = document.getElementById("rpPageFrame");
  nav.innerHTML = `<span class="rp-page-counter">Trang ${page+1} / ${pages}</span>`;
  const cardsHtml = pairs.slice(start,end).map((p,ci)=>{
    const i = start+ci;
    return `
    <div class="rp-card" id="rp-card-${i}">
      <div class="rp-card-q">
        <span class="rp-q-num">${i+1}</span>
        <span class="rp-q-text">${escAttr(p.q)}</span>
        <button class="rp-speak-btn" onclick="speakById('${regTxt(p.q)}')">🔊</button>
      </div>
      <div class="rp-card-a">
        <div class="rp-hidden-row">
          <span class="rp-hidden-label">💬 Câu trả lời của bạn:</span>
          <button class="rp-mic-btn" id="rp-mic-${i}" onclick="rpRecord(${i},'${regTxt(p.a)}')">🎤 Nói</button>
        </div>
        <div class="rp-result-row" id="rp-result-${i}"></div>
        <div class="rp-model-row" id="rp-model-${i}" style="display:none">
          <span class="rp-model-label">✅ Câu mẫu:</span>
          <span class="rp-model-text">${escAttr(p.a)}</span>
          <button class="rp-speak-btn" onclick="speakById('${regTxt(p.a)}')">🔊</button>
        </div>
        <button class="rp-reveal-btn" id="rp-reveal-${i}" onclick="rpReveal(${i},'${regTxt(p.a)}')">👁 Xem đáp án</button>
      </div>
    </div>`;
  }).join("");
  const prevBtn = page>0 ? `<button class="rp-nav-btn rp-nav-prev" onclick="_showRPPage(${page-1})">← Quay lại</button>` : "";
  const nextBtn = page+1<pages ? `<button class="rp-nav-btn rp-nav-next" onclick="_showRPPage(${page+1})">Tiếp theo →</button>` : `<div class="rp-done-msg">🎉 Hoàn thành Role Play!</div>`;
  frame.innerHTML = `<div class="rp-cards-list">${cardsHtml}</div><div class="rp-page-btns">${prevBtn}${nextBtn}</div>`;
}
window._showRPPage = _showRPPage;

window.rpRecord = function(idx, answerId){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){ toast("Trình duyệt không hỗ trợ. Hãy dùng Chrome/Edge.","error"); return; }
  const correct = TXT_REG[answerId];
  const btn = document.getElementById(`rp-mic-${idx}`);
  const resultEl = document.getElementById(`rp-result-${idx}`);
  const modelEl  = document.getElementById(`rp-model-${idx}`);
  const revealBtn = document.getElementById(`rp-reveal-${idx}`);
  if(!recognition) recognition = setupRecognition();
  if(recordingFor !== null){ recognition.stop(); return; }
  btn.classList.add("recording");
  btn.textContent = "⏹ Dừng";
  recordingFor = `rp-${idx}`;
  resultEl.innerHTML = `<span style="color:var(--ink-mute);font-size:13px">🎤 Đang nghe...</span>`;
  recognition.onresult = (e)=>{
    const said = (e.results[0][0].transcript||"").trim();
    const norm = s=>s.toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
    const pct = Math.round(similarity(norm(said), norm(correct))*100);
    const isOk = pct >= 65;
    resultEl.innerHTML = `
      <div class="rp-said">Bạn nói: <i>"${escAttr(said)}"</i></div>
      <div class="rp-pct ${isOk?'rp-pct-ok':'rp-pct-bad'}">${isOk?'✅':'❌'} ${pct}% khớp</div>
    `;
    modelEl.style.display = "flex";
    revealBtn.style.display = "none";
    btn.classList.remove("recording"); btn.textContent = "🎤 Nói lại"; recordingFor = null;
    if(isOk) speakById(answerId, 0.9);
  };
  recognition.onerror = (e)=>{
    resultEl.innerHTML = `<span style="color:#dc2626">Lỗi: ${e.error||"không rõ"}</span>`;
    btn.classList.remove("recording"); btn.textContent = "🎤 Nói"; recordingFor = null;
  };
  recognition.onend = ()=>{ btn.classList.remove("recording"); btn.textContent="🎤 Nói"; recordingFor=null; };
  try{ recognition.start(); } catch(e){ btn.classList.remove("recording"); btn.textContent="🎤 Nói"; recordingFor=null; }
};

window.rpReveal = function(idx, answerId){
  document.getElementById(`rp-model-${idx}`).style.display = "flex";
  document.getElementById(`rp-reveal-${idx}`).style.display = "none";
  speakById(answerId, 0.9);
};

// --- STORY (NEW context-based listening) ---
function renderStory(l){
  if(!l.listening) return "";
  const ls = l.listening;

  // Build a context story — use transcript as base, highlight key vocab
  const transcript = ls.transcript || ls.audio || "—";
  const keywords = (l.vocabulary||[]).slice(0, 6);

  // Highlight vocab keywords in transcript
  let highlightedStory = transcript;
  keywords.forEach(v => {
    const re = new RegExp("\\b(" + v.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")\\b", "gi");
    highlightedStory = highlightedStory.replace(re, `<span class="hl-soft" onclick="speakById('${regTxt(v.en)}')" title="${escAttr(v.vi)}">$1</span>`);
  });

  return `
    <div class="stage-h"><span class="stage-tag">Listening · Story</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎧 Nghe ngữ cảnh</h2>
    <p class="stage-sub">Một đoạn hội thoại/câu chuyện ngắn dùng <b>từ vựng vừa học</b>. <b>Click vào từ vàng</b> để nghe phát âm + xem nghĩa.</p>

    <div class="context-story">
      <h4>${ls.title || "Nghe đoạn hội thoại"}</h4>
      <div class="story-text">${highlightedStory}</div>
      <div class="story-controls">
        <button class="primary" onclick="speakById('${regTxt(transcript)}', 0.8)">▶ Nghe (chậm)</button>
        <button onclick="speakById('${regTxt(transcript)}', 1)">▶ Nghe (thường)</button>
        <button onclick="document.getElementById('storyTrans').classList.toggle('show')">📜 Hiện/ẩn dịch</button>
      </div>
      <div class="story-translation" id="storyTrans">${ls.translation || "<i>Bản dịch chưa có — nghe bằng ngữ cảnh nhé!</i>"}</div>
    </div>

    <div class="mg-block warm">
      <div class="mg-head">
        <h4>🔑 Từ khóa trong đoạn</h4>
        <span class="mg-badge">CLICK 🔊</span>
      </div>
      <p class="mg-intro">Bấm vào từ khóa để nghe + đọc lại theo. Đây là những từ <b>then chốt</b> để hiểu đoạn nghe.</p>
      <div class="story-keywords">
        ${keywords.map(v=>`
          <button class="story-kw" onclick="speakById('${regTxt(v.en)}', 0.9)">${v.img||""} ${v.en} <small>${v.vi}</small></button>
        `).join("")}
      </div>
    </div>
  `;
}

// --- LISTEN QUIZ (comprehension after story) ---
function renderListenQuiz(l){
  const ls = l.listening;
  if(!ls?.questions?.length) return "";
  const n = ls.questions.length;
  const dots = Array.from({length:n},(_,i)=>`<span class="oat-dot" id="lq-dot-${i}"></span>`).join("");
  return `
    <div class="stage-h"><span class="stage-tag">Listening · Quiz</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎯 Nghe và trả lời</h2>
    <div class="lc-header-box">
      <span class="lc-header-icon">🎧</span>
      <div>
        <div class="lc-header-title">NGHE VÀ CHỌN ĐÁP ÁN ĐÚNG</div>
        <div class="lc-rule">🎯 <b>LUẬT CHƠI:</b> Bấm 🔊 nghe câu → chọn đáp án đúng.</div>
      </div>
    </div>
    <div class="oat-nav">
      <span class="oat-counter" id="lqCounter">1 / ${n}</span>
      <div class="oat-dots">${dots}</div>
    </div>
    <div id="lqFrame"></div>
  `;
}

function initListenQuiz(l){
  window._lqData = { questions: l.listening.questions, score: 0 };
  _showLQQ(0);
}

function _showLQQ(idx){
  const { questions } = window._lqData;
  const q = questions[idx];
  const n = questions.length;
  const letters = ["A","B","C","D"];
  const audioId = q.audio ? regTxt(q.audio) : null;
  const optsHtml = q.options.map((opt,oi)=>`
    <button class="lc-opt" data-oi="${oi}" data-correct="${oi===q.answer?1:0}"
            onclick="_checkLQQ(this,${oi},${q.answer},'${audioId||""}',${idx})">
      <span class="lc-letter">${letters[oi]||oi}</span>
      <span class="lc-opt-text">${escAttr(opt)}</span>
    </button>
  `).join("");
  document.getElementById("lqFrame").innerHTML = `
    <div class="lc-card" id="lq-card-cur">
      <div class="lc-card-head">
        <span class="lc-num">CÂU ${idx+1} / ${n}</span>
        ${audioId?`<button class="lc-play-btn" onclick="speakById('${audioId}')">🔊 Nghe câu</button><button class="lc-play-btn lc-play-slow" onclick="speakById('${audioId}',0.6)">🐢 Chậm</button>`:""}
      </div>
      ${q.audio?`<div class="lc-audio-label lc-audio-hidden">Bấm nghe, chọn đáp án. Câu audio được ẩn để không lộ đáp án.</div>`:""}
      ${q.q?`<div class="lq-question">${q.q}</div>`:""}
      <div class="lc-opts">${optsHtml}</div>
      <div class="oat-feedback" id="lqFeedback"></div>
    </div>
  `;
  document.getElementById("lqCounter").textContent = `${idx+1} / ${n}`;
  document.querySelectorAll(".oat-dot").forEach((d,i)=>{ d.className = "oat-dot"+(i===idx?" active":""); });
  if(audioId) setTimeout(()=>speakById(audioId), 500);
}

window._checkLQQ = function(btn, oi, correct, audioId, idx){
  const card = document.getElementById("lq-card-cur");
  if(card.dataset.done) return;
  card.dataset.done = "1";
  const isRight = oi === correct;
  const q = window._lqData.questions[idx];
  card.querySelectorAll(".lc-opt").forEach(b=>{
    b.disabled = true;
    if(parseInt(b.dataset.correct)) b.classList.add("lc-right");
    if(b===btn && !isRight) b.classList.add("lc-wrong");
  });
  if(isRight){ window._lqData.score++; playCorrect(); if(audioId) setTimeout(()=>speakById(audioId,0.9),200); }
  else { playWrong(); if(audioId) setTimeout(()=>speakById(audioId,0.9),300); }
  const dot = document.getElementById(`lq-dot-${idx}`);
  if(dot) dot.className = "oat-dot "+(isRight?"done-right":"done-wrong");
  const fb = document.getElementById("lqFeedback");
  const n = window._lqData.questions.length;
  const ansText = q.options[correct];
  if(isRight){
    fb.innerHTML = `<span class="oat-feedback-right">✅ Đúng! <em>"${ansText}"</em></span>`;
  } else {
    fb.innerHTML = `<span class="oat-feedback-wrong">❌ Sai! Đáp án: <b>${["A","B","C","D"][correct]}. "${ansText}"</b></span>`;
  }
  if(idx+1 < n){
    fb.innerHTML += `<button class="oat-next-btn" onclick="_showLQQ(${idx+1})">Câu tiếp theo →</button>`;
  } else {
    const sc = window._lqData.score;
    fb.innerHTML += `<div class="oat-final"><div class="oat-final-score">🏆 ${sc} / ${n}</div><div class="oat-final-msg">${sc===n?"Xuất sắc! 🎉":sc>=n/2?"Tốt lắm! 👍":"Cố gắng hơn nhé! 💪"}</div></div>`;
  }
};

function checkListen(btn, picked, correct){ /* legacy stub */ }

// --- DICTATION (nghe → gõ lại, paginated) ---
function _dictBatchHtml(sample){
  return sample.map((v,i)=>`
    <div class="dict-q">
      <span class="dict-num">${String(i+1).padStart(2,"0")}</span>
      <button class="dict-play" onclick="speakById('${regTxt(v.en)}',0.9)">🔊</button>
      <button class="dict-play" onclick="speakById('${regTxt(v.en)}',0.55)" style="background:var(--yellow);color:var(--navy)" title="Chậm">🐢</button>
      <input class="dict-input" data-i="${i}" data-ans="${escAttr(v.en.toLowerCase())}" data-en="${escAttr(v.en)}" placeholder="Gõ từ bạn nghe..." onblur="checkDict(this)" autocomplete="off">
      <span class="dict-hint">→ ${v.vi}</span>
    </div>
  `).join("");
}

function renderDictation(l){
  const allWords = shuffle([...l.vocabulary]);
  STATE.dictAllWords = allWords;
  STATE.dictBatch = 0;
  const batchSize = 6;
  const totalBatches = Math.ceil(allWords.length / batchSize);
  const sample = allWords.slice(0, batchSize);
  return `
    <div class="stage-h"><span class="stage-tag">Minigame · Dictation</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">✍️ Nghe và gõ lại</h2>
    <p class="stage-sub">Nghe từ tiếng Anh và gõ chính xác từ đó. Luyện <b>kỹ năng nghe-viết</b> đồng thời.</p>
    <div class="mg-block cool">
      <div class="mg-head">
        <h4>🎧 Bấm 🔊 → gõ từ bạn nghe được</h4>
        <span class="mg-badge" id="dictBadge">Vòng 1 / ${totalBatches} · ${sample.length} từ</span>
      </div>
      <div class="dict-block" id="dictBlock">
        ${_dictBatchHtml(sample)}
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
        <button class="write-check" onclick="checkAllDict()">✔ Kiểm tra</button>
        ${totalBatches > 1 ? `<button id="dictNextBtn" class="so-reset-btn" style="display:none" onclick="loadNextDictBatch()">Vòng tiếp theo →</button>` : ""}
      </div>
    </div>
  `;
}

function checkDict(inp){
  if(inp.dataset.done) return;
  const ans = (inp.value||"").trim().toLowerCase();
  if(!ans) return;
  inp.dataset.done = "1";
  inp.classList.remove("right","wrong");
  const isRight = ans === inp.dataset.ans;
  if(isRight){
    inp.classList.add("right");
    playCorrect();
  } else {
    inp.classList.add("wrong");
    inp.value = inp.value + " → " + inp.dataset.ans;
    playWrong();
    setTimeout(()=>speak(inp.dataset.en || inp.dataset.ans, 0.9), 250);
  }
  inp.disabled = true;
}

function checkAllDict(){
  let ok = 0, total = 0;
  document.querySelectorAll(".dict-input").forEach(inp=>{
    if(!inp.dataset.done) checkDict(inp);
    total++;
    if(inp.classList.contains("right")) ok++;
  });
  toast(`✍️ ${ok}/${total} từ đúng`, ok===total?"success":"");
  const batchSize = 6;
  const nextStart = (STATE.dictBatch+1) * batchSize;
  if(STATE.dictAllWords && nextStart < STATE.dictAllWords.length){
    const btn = document.getElementById("dictNextBtn");
    if(btn) btn.style.display = "";
  }
}

function loadNextDictBatch(){
  const batchSize = 6;
  STATE.dictBatch++;
  const start = STATE.dictBatch * batchSize;
  const sample = STATE.dictAllWords.slice(start, start+batchSize);
  if(!sample.length) return;
  const total = Math.ceil(STATE.dictAllWords.length / batchSize);
  document.getElementById("dictBadge").textContent = `Vòng ${STATE.dictBatch+1} / ${total} · ${sample.length} từ`;
  document.getElementById("dictBlock").innerHTML = _dictBatchHtml(sample);
  const btn = document.getElementById("dictNextBtn");
  if(btn) btn.style.display = "none";
}

// --- SPRINT (lightning round) ---
// --- LUYỆN DỊCH GAME (one-at-a-time) ---
function renderTranslate(l){
  if(!l.translation) return "";
  const n = l.translation.sentences.length;
  const dots = Array.from({length:n},(_,i)=>`<span class="oat-dot" id="tr-dot-${i}"></span>`).join("");
  return `
    <div class="stage-h"><span class="stage-tag">Game · Luyện dịch</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🌏 Luyện Dịch</h2>
    <div class="tr-header-box">
      <span class="tr-header-icon">🌏</span>
      <div>
        <div class="tr-header-title">${escAttr(l.translation.title||"LUYỆN DỊCH: VIỆT → ANH")}</div>
        <div class="tr-rule">🎯 <b>LUẬT CHƠI:</b> ${escAttr(l.translation.instruction || "Đọc câu, gõ hoặc nói bản dịch / câu trả lời mẫu.")}</div>
      </div>
    </div>
    <div class="oat-nav">
      <span class="oat-counter" id="trCounter">1 / ${n}</span>
      <div class="oat-dots">${dots}</div>
    </div>
    <div id="trFrame"></div>
  `;
}

function initTranslate(l){
  window._trData = { sentences: l.translation.sentences, score: 0 };
  _showTrQ(0);
}

function getTranslationPrompt(s){
  if(s.prompt) return s.prompt;
  return s.direction === "en-vi" ? (s.en || "") : (s.vi || "");
}

function getTranslationAnswer(s){
  if(s.answerText) return s.answerText;
  return s.direction === "en-vi" ? (s.vi || "") : (s.en || "");
}

function getTranslationLabel(s){
  if(s.label) return s.label;
  return s.direction === "en-vi" ? "🇬🇧 Dịch sang tiếng Việt:" : "🇻🇳 Dịch sang tiếng Anh:";
}

function cleanTranslationSpeechText(text){
  if(!text) return "";
  let cleaned = String(text)
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\bDịch\s+(?:Anh|Việt)\s*(?:→|->|sang)\s*(?:Việt|Anh)\s*:?\s*/gi, "")
    .replace(/\b(?:Gõ bản dịch tiếng Việt tại đây|Gõ bản dịch tiếng Anh tại đây)\.{0,3}/gi, "")
    .replace(/\b(?:Câu mẫu|Đáp án|Explanation|Giải thích)\s*:?\s*/gi, "");
  cleaned = normalizeSpeechText(cleaned);
  return cleaned.replace(/\s+/g, " ").trim();
}

function hasVietnameseText(text){
  return /[ạảãâầấậẩẫăằắặẳẵẹẻẽêềếệểễịỉĩọỏõôồốộổỗơờớợởỡụủũưừứựửữỵỷỹđ]/i.test(String(text || ""));
}

function getTranslationSpeechText(item){
  if(!item) return "";
  let text = "";
  if(item.direction === "en-vi"){
    text = item.prompt || item.english || item.question || item.en || "";
  } else if(item.direction === "vi-en"){
    text = item.englishPrompt || item.targetEnglish || item.answerEnglish || item.targetSentence || item.sampleAnswer || item.en || "";
  } else {
    text = item.prompt || item.english || item.question || item.en || item.targetEnglish || item.answerText || "";
  }
  text = cleanTranslationSpeechText(text);
  return hasVietnameseText(text) ? "" : text;
}

function shouldUseDay31TranslationTts(){
  const lesson = LESSONS.find((l) => l.id === Number(STATE.lessonId));
  return Boolean(lesson?.metadata?.sourceLessonIds?.includes(31));
}

function _showTrQ(idx){
  const { sentences } = window._trData;
  const s = sentences[idx];
  const n = sentences.length;
  const prompt = getTranslationPrompt(s);
  const answerPlaceholder = s.direction === "en-vi" ? "Gõ bản dịch tiếng Việt tại đây..." : "Gõ bản dịch tiếng Anh tại đây...";
  const speechText = shouldUseDay31TranslationTts() ? getTranslationSpeechText(s) : "";
  const speechButton = speechText
    ? `<button class="tr-speak-btn" onclick="trSpeakPrompt(${idx})" title="Nghe câu tiếng Anh" aria-label="Nghe câu tiếng Anh">🔊</button>`
    : "";
  document.getElementById("trFrame").innerHTML = `
    <div class="tr-card" id="tr-card-cur">
      <div class="tr-vi-label">${getTranslationLabel(s)}</div>
      <div class="tr-prompt-row">
        <div class="tr-vi-text">${escAttr(prompt)}</div>
        ${speechButton}
      </div>
      <div class="tr-input-row">
        <input class="tr-input" id="trInput" type="text" placeholder="${escAttr(answerPlaceholder)}"
               onkeydown="if(event.key==='Enter') trCheckCur(${idx})"/>
        <button class="tr-mic-btn" id="tr-mic-cur" onclick="trRecord(${idx})" title="Nói">🎤</button>
      </div>
      <div class="tr-actions">
        <button class="so-check-btn" onclick="trCheckCur(${idx})">✔ Kiểm tra</button>
        <button class="so-reset-btn" onclick="document.getElementById('trInput').value=''">↺ Xóa</button>
      </div>
      <div class="oat-feedback" id="trFeedback"></div>
    </div>
  `;
  document.getElementById("trCounter").textContent = `${idx+1} / ${n}`;
  document.querySelectorAll(".oat-dot").forEach((d,i)=>{ d.className="oat-dot"+(i===idx?" active":""); });
  setTimeout(()=>document.getElementById("trInput")?.focus(), 100);
}

window.trSpeakPrompt = function(idx){
  const item = window._trData?.sentences?.[idx];
  const text = getTranslationSpeechText(item);
  if(!text) return;
  speak(text, 0.9, null, "en-US");
};

window.trCheckCur = function(idx){
  const correct = getTranslationAnswer(window._trData?.sentences?.[idx] || {});
  const card = document.getElementById("tr-card-cur");
  if(!card || card.dataset.done || !correct) return;
  const inp = document.getElementById("trInput");
  const typed = (inp?.value||"").trim();
  if(!typed){ inp?.focus(); return; }
  card.dataset.done = "1";
  inp.disabled = true;
  document.getElementById("tr-mic-cur").disabled = true;
  const norm = s => s.toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
  const sc = similarity(norm(typed), norm(correct));
  const pct = Math.round(sc*100);
  const isRight = pct >= 70;
  if(isRight) playCorrect(); else playWrong();
  const dot = document.getElementById(`tr-dot-${idx}`);
  if(dot) dot.className="oat-dot "+(isRight?"done-right":"done-wrong");
  if(isRight) window._trData.score++;
  const n = window._trData.sentences.length;
  const fb = document.getElementById("trFeedback");
  const feedbackClass = isRight ? "oat-feedback-right" : "oat-feedback-wrong";
  const emoji = isRight ? "✅" : "❌";
  const canSpeakAnswer = !shouldUseDay31TranslationTts() || !hasVietnameseText(correct);
  fb.innerHTML = `
    <div style="width:100%">
      <div><span class="${feedbackClass}">${emoji} ${pct}% khớp</span></div>
      <div class="tr-model-answer">💡 Câu mẫu: <b>${escAttr(correct)}</b>
        ${canSpeakAnswer ? `<button class="rp-speak-btn" onclick="speakById('${regTxt(correct)}')">🔊</button>` : ""}
      </div>
      ${idx+1 < n
        ? `<button class="oat-next-btn" onclick="_nextTrQ(${idx+1})">Câu tiếp theo →</button>`
        : `<div class="oat-final"><div class="oat-final-score">🏆 ${window._trData.score} / ${n}</div><div class="oat-final-msg">${window._trData.score===n?"Xuất sắc! 🎉":window._trData.score>=n/2?"Tốt lắm! 👍":"Cố gắng hơn nhé! 💪"}</div></div>`
      }
    </div>
  `;
  if(canSpeakAnswer){
    speakById(regTxt(correct), 0.9);
  }
};

window._nextTrQ = function(idx){ _showTrQ(idx); };

window.trRecord = function(idx){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){ toast("Trình duyệt không hỗ trợ. Hãy dùng Chrome/Edge.","error"); return; }
  const correct = getTranslationAnswer(window._trData?.sentences?.[idx] || {});
  if(!correct) return;
  const btn = document.getElementById("tr-mic-cur");
  if(!recognition) recognition = setupRecognition();
  if(recordingFor !== null){ recognition.stop(); return; }
  btn.classList.add("recording");
  recordingFor = "tr";
  recognition.onresult = (e)=>{
    const said = (e.results[0][0].transcript||"").trim();
    const inp = document.getElementById("trInput");
    if(inp) inp.value = said;
    btn.classList.remove("recording"); recordingFor = null;
    trCheckCur(idx);
  };
  recognition.onerror = ()=>{ btn.classList.remove("recording"); recordingFor = null; };
  recognition.onend  = ()=>{ btn.classList.remove("recording"); recordingFor = null; };
  try{ recognition.start(); } catch(e){ btn.classList.remove("recording"); recordingFor=null; }
};

function renderDialogueVideo(l){
  const v = l.dialogueVideo;
  if(!v) return "";
  const { iframeSrc, videoUrl, hasVideo } = resolveYouTubeVideo(v);
  const formatDialogueText = (text) => highlightText(escAttr(text || ""));
  return `
    <div class="stage-h"><span class="stage-tag">Video</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">${escAttr(v.title || "Video hội thoại")}</h2>
    <p class="stage-sub">${escAttr(v.description || "Xem video hội thoại rồi làm 2 mini game sau video.")}</p>
    <div class="lt-video-card">
      <div class="lt-video-head"><span class="lt-video-label">${escAttr(v.label || "Dialogue video")}</span><a class="mt-video-link" href="${escAttr(videoUrl)}" target="_blank" rel="noopener noreferrer">Mở YouTube</a></div>
      <div class="yt-embed">
        ${hasVideo ? `<iframe src="${escAttr(iframeSrc)}" title="${escAttr(v.title||"Dialogue video")}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" loading="lazy" onload="hideYouTubeFallback(this)" onerror="showYouTubeFallback(this)"></iframe>` : ""}
         <div class="yt-fallback-bar${hasVideo ? "" : " show"}">
          <span class="yt-fallback-text">Không thể nhúng video này. Bấm mở YouTube để xem.</span>
          <a class="yt-fallback-link" href="${escAttr(videoUrl)}" target="_blank" rel="noopener">Mở YouTube</a>
        </div>
      </div>
    </div>
    ${v.transcript?.length ? `<div class="dialogue-video-script">${v.transcript.map((line,i)=>`<div class="dialogue-line ${i%2?'b':''}"><div class="dlg-avatar">${line.speaker||String.fromCharCode(65+i%2)}</div><div class="dlg-body"><div class="dlg-en">${formatDialogueText(line.en)}</div>${line.vi?`<div class="dlg-vi">${escAttr(line.vi)}</div>`:""}</div><button class="dlg-speak" onclick="speakById('${regTxt(line.audioText || line.en)}')">🔊</button></div>`).join("")}</div>` : ""}
    ${v.keywords?.length ? `
      <div class="mg-block accent" style="margin-top:18px">
        <div class="mg-head"><h4>Từ khóa trong hội thoại</h4></div>
        <div class="grammar-examples">
          ${v.keywords.map(item=>`
            <div class="grammar-ex">
              <div>
                <div class="gex-en">${escAttr(item.en)}</div>
                <div class="gex-vi">${escAttr(item.vi || "")}${item.example ? ` · ${escAttr(item.example)}` : ""}</div>
              </div>
              <button class="gex-speak" onclick="speakById('${regTxt(item.example || item.en)}')">🔊</button>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}
    ${v.comprehension?.length ? `
      <div class="mg-block warm" style="margin-top:18px">
        <div class="mg-head"><h4>Kiểm tra hiểu hội thoại</h4><span class="mg-badge">${v.comprehension.length} câu</span></div>
        <div class="dialogue-comp-list">
          ${v.comprehension.map((q,i)=>`
            <div class="vq-item dialogue-comp-item" id="dc-${i}" data-correct="${q.answer}">
              <div class="vq-num">Q${i+1}</div>
              <div class="vq-content">
                <div class="vq-text">${escAttr(q.q)}</div>
                <div class="vq-options">
                  ${(q.options||[]).map((opt,j)=>`
                    <button class="vq-option" onclick="selectDialogueCompAnswer(this,${i},${j})">
                      <span>${String.fromCharCode(65+j)}</span>
                      <b>${escAttr(opt)}</b>
                    </button>
                  `).join("")}
                </div>
                <div class="vq-answer-row">
                  <button class="vq-check-btn" onclick="checkDialogueCompAnswer(${i})">Kiểm tra</button>
                  <span class="vq-result" id="dcr-${i}"></span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}
  `;
}

window.selectDialogueCompAnswer = function(btn, qIndex, picked){
  const item = document.getElementById(`dc-${qIndex}`);
  if(!item || item.dataset.done) return;
  item.dataset.selected = String(picked);
  item.querySelectorAll(".vq-option").forEach(opt=>opt.classList.remove("selected"));
  btn.classList.add("selected");
  const result = document.getElementById(`dcr-${qIndex}`);
  if(result) result.textContent = "";
};

window.checkDialogueCompAnswer = function(qIndex){
  const item = document.getElementById(`dc-${qIndex}`);
  if(!item || item.dataset.done) return;
  const selected = item.dataset.selected;
  const result = document.getElementById(`dcr-${qIndex}`);
  if(selected == null){
    if(result) result.textContent = "Hãy chọn 1 đáp án trước.";
    return;
  }
  item.dataset.done = "1";
  const correct = parseInt(item.dataset.correct || "0", 10);
  const picked = parseInt(selected, 10);
  item.querySelectorAll(".vq-option").forEach((opt,i)=>{
    opt.disabled = true;
    if(i === correct) opt.classList.add("right");
    if(i === picked && i !== correct) opt.classList.add("wrong");
  });
  const btn = item.querySelector(".vq-check-btn");
  if(btn) btn.disabled = true;
  if(result){
    result.textContent = picked === correct ? "Đúng!" : `Sai. Đáp án đúng: ${String.fromCharCode(65+correct)}`;
    result.className = `vq-result ${picked === correct ? "right" : "wrong"}`;
  }
  if(picked === correct) playCorrect(); else playWrong();
};

function renderDialogueVideoQuiz(l){
  const rounds = l.dialogueVideo?.listenPickLine || [];
  if(!rounds.length) return "";
  window._linePickData = { rounds, idx: 0, score: 0 };
  setTimeout(()=>showLinePickRound(0), 0);
  return `
    <div class="stage-h"><span class="stage-tag">Mini game</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎮 Game 11: Nghe & Chọn thoại</h2>
    <p class="stage-sub">Nghe Alex nói, sau đó chọn câu Mia nên trả lời tiếp theo.</p>
    <div class="linepick-shell">
      <div class="linepick-top">
        <div class="linepick-progress"><span id="linePickCounter">1/${rounds.length}</span><div class="linepick-bar"><div id="linePickBar"></div></div></div>
        <div class="linepick-score" id="linePickScore">0/${rounds.length}</div>
      </div>
      <div id="linePickFrame"></div>
    </div>
  `;
}

function speakLineGame(text, rate=0.85, cb){
  speak(text, rate, cb);
}

window.showLinePickRound = function(idx){
  const data = window._linePickData;
  const frame = document.getElementById("linePickFrame");
  if(!data || !frame) return;
  const rounds = data.rounds;
  if(idx >= rounds.length){
    frame.innerHTML = `
      <div class="linepick-result">
        <div class="linepick-result-score">🏆 ${data.score}/${rounds.length}</div>
        <div class="linepick-result-msg">${data.score===rounds.length ? "Tuyệt vời! Phản xạ hội thoại rất tốt." : "Hoàn thành rồi! Chơi lại để luyện phản xạ nhanh hơn nhé."}</div>
        <button class="qb-start-btn" onclick="restartLinePick()">🔄 Chơi lại</button>
      </div>
    `;
    document.getElementById("linePickCounter").textContent = `${rounds.length}/${rounds.length}`;
    document.getElementById("linePickBar").style.width = "100%";
    document.getElementById("linePickScore").textContent = `${data.score}/${rounds.length}`;
    return;
  }
  data.idx = idx;
  const round = rounds[idx];
  const letters = ["A","B","C","D"];
  const normalizedOptions = (round.options||[]).map(opt => typeof opt === "string" ? { text: opt, img: "" } : {
    text: opt?.text || "",
    img: opt?.img || opt?.image || opt?.emoji || ""
  });
  const correctHint = round.hintImg || round.hintImage || normalizedOptions[round.answer]?.img || "";
  const hintIsImage = /^(https?:\/\/|\/|\.\/|\.\.\/|data:image\/)/.test(correctHint);
  document.getElementById("linePickCounter").textContent = `${idx+1}/${rounds.length}`;
  document.getElementById("linePickBar").style.width = `${idx/rounds.length*100}%`;
  document.getElementById("linePickScore").textContent = `${data.score}/${rounds.length}`;
  frame.innerHTML = `
    <div class="linepick-grid" id="linePickCard">
      <div class="linepick-chat">
        <div class="linepick-avatar-row"><span class="linepick-avatar alex">🧑</span><b>Alex</b></div>
        <div class="linepick-bubble">
          <button class="linepick-replay" onclick="speakById('${regTxt(round.audioText || round.prompt)}',0.85)">🔊 Nghe lại</button>
          <div>${escAttr(round.prompt)}</div>
          ${correctHint ? `
            <div class="linepick-answer-hint" aria-label="Gợi ý hình ảnh cho đáp án đúng">
              <span class="linepick-hint-label">Gợi ý đáp án</span>
              ${hintIsImage
                ? `<img src="${escAttr(correctHint)}" alt="Gợi ý đáp án đúng" loading="lazy">`
                : `<span class="linepick-hint-emoji">${escAttr(correctHint)}</span>`
              }
            </div>
          ` : ""}
        </div>
        <div class="linepick-avatar-row mia"><span class="linepick-avatar mia">👩</span><b>Mia sẽ nói gì tiếp theo?</b></div>
      </div>
      <div class="linepick-options">
        ${normalizedOptions.map((opt,i)=>`
          <button class="linepick-option" data-correct="${i===round.answer?1:0}" onclick="pickLineOption(this,${i})">
            <span class="linepick-letter">${letters[i]}</span>
            ${opt.img ? `<span class="linepick-option-img">${escAttr(opt.img)}</span>` : ""}
            <span>${escAttr(opt.text)}</span>
          </button>
        `).join("")}
      </div>
    </div>
    <div class="linepick-actions" id="linePickActions"></div>
  `;
  setTimeout(()=>speakLineGame(round.audioText || round.prompt), 250);
};

window.pickLineOption = function(btn, picked){
  const data = window._linePickData;
  if(!data) return;
  const card = document.getElementById("linePickCard");
  if(!card || card.dataset.done) return;
  card.dataset.done = "1";
  const round = data.rounds[data.idx];
  const correct = round.answer;
  const isRight = picked === correct;
  card.querySelectorAll(".linepick-option").forEach((opt,i)=>{
    opt.disabled = true;
    if(i===correct) opt.classList.add("right");
    if(opt===btn && !isRight) opt.classList.add("wrong");
  });
  if(isRight){ data.score++; playCorrect(); }
  else playWrong();
  document.getElementById("linePickScore").textContent = `${data.score}/${data.rounds.length}`;
  document.getElementById("linePickBar").style.width = `${(data.idx+1)/data.rounds.length*100}%`;
  const actions = document.getElementById("linePickActions");
  if(actions){
    const label = data.idx+1 < data.rounds.length ? "Tiếp theo →" : "Xem kết quả →";
    actions.innerHTML = `<button class="oat-next-btn" id="linePickNextBtn" disabled onclick="showLinePickRound(${data.idx+1})">${label}</button>`;
  }
  const enableNext = () => {
    const btn = document.getElementById("linePickNextBtn");
    if(btn) btn.disabled = false;
  };
  const correctOption = round.options?.[correct];
  const correctText = typeof correctOption === "string" ? correctOption : (correctOption?.text || "");
  setTimeout(()=>speakLineGame(correctText, 0.85, enableNext), isRight ? 250 : 900);
  setTimeout(enableNext, 2500);
};

window.restartLinePick = function(){
  if(!window._linePickData) return;
  window._linePickData.idx = 0;
  window._linePickData.score = 0;
  showLinePickRound(0);
};

function renderDialogueVideoOrder(l){
  const dialogues = l.dialogueVideo?.fillConversation || [];
  if(!dialogues.length) return "";
  const totalBlanks = dialogues.reduce((sum,item)=>sum + (item.lines||[]).reduce((lineSum,line)=>{
    const matches = String(line.text||"").match(/\[\[[^\]]+\]\]/g);
    return lineSum + (matches ? matches.length : 0);
  }, 0), 0);
  window._fillConvData = { dialogues, idx: 0, mode: "type", score: 0, scored: new Set(), activeBlank: 0, totalBlanks };
  setTimeout(()=>showFillConversation(0), 0);
  return `
    <div class="stage-h"><span class="stage-tag">Mini game</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎮 Game 12: Điền từ vào hội thoại</h2>
    <p class="stage-sub">Điền đúng các chỗ trống trong hội thoại. Chọn chế độ gõ hoặc chọn từ trong word bank.</p>
    <div class="fillconv-shell">
      <div class="fillconv-top">
        <div class="fillconv-progress" id="fillConvCounter">Hội thoại 1/3</div>
        <button class="fillconv-mode" id="fillConvModeBtn" onclick="toggleFillConvMode()">⌨️ Chế độ GÕ</button>
      </div>
      <div id="fillConvFrame"></div>
    </div>
  `;
}

function normalizeFillAnswer(text){
  return String(text||"").trim().toLowerCase().replace(/[’‘`]/g,"'");
}

function renderFillLine(line, mode, nextBlankIndex){
  let last = 0;
  let html = "";
  const re = /\[\[([^\]]+)\]\]/g;
  let match;
  while((match = re.exec(line.text))){
    html += escAttr(line.text.slice(last, match.index));
    const answer = match[1];
    const idx = nextBlankIndex();
    html += `<span class="fill-blank-wrap">
      <input class="fill-blank" data-answer="${escAttr(answer)}" data-blank="${idx}" ${mode==="pick" ? "readonly" : ""} placeholder="..." onfocus="setFillActive(${idx})" onkeydown="handleFillKey(event,this)">
      <span class="fill-answer"></span>
    </span>`;
    last = re.lastIndex;
  }
  html += escAttr(line.text.slice(last));
  return html;
}

window.showFillConversation = function(idx){
  const data = window._fillConvData;
  const frame = document.getElementById("fillConvFrame");
  if(!data || !frame) return;
  const total = data.dialogues.length;
  if(idx >= total){
    frame.innerHTML = `
      <div class="linepick-result">
        <div class="linepick-result-score">🏆 ${data.score}/${data.totalBlanks || data.score}</div>
        <div class="linepick-result-msg">${data.score===(data.totalBlanks || data.score) ? "Xuất sắc! Điền hội thoại rất chắc." : "Hoàn thành rồi! Chơi lại để luyện thêm spelling và phản xạ."}</div>
        <button class="qb-start-btn" onclick="restartFillConv()">🔄 Chơi lại</button>
      </div>
    `;
    document.getElementById("fillConvCounter").textContent = `Hoàn thành ${total}/${total}`;
    return;
  }
  data.idx = idx;
  data.activeBlank = 0;
  const item = data.dialogues[idx];
  let blankCounter = 0;
  document.getElementById("fillConvCounter").textContent = `Hội thoại ${idx+1}/${total}`;
  document.getElementById("fillConvModeBtn").textContent = data.mode === "type" ? "⌨️ Chế độ GÕ" : "🖱️ Chế độ CHỌN";
  frame.innerHTML = `
    <div class="fillconv-card" id="fillConvCard">
      <div class="fillconv-lines">
        ${item.lines.map(line=>{
          const spk = line.speaker || "";
          const isRight = spk === "Mia" || spk === "Daughter" || spk === "B";
          const displaySpeaker = spk === "Mia" ? "Mia" : (spk === "Daughter" ? "Daughter" : (spk === "Mom" ? "Mom" : (spk === "Alex" ? "Alex" : spk)));
          const emoji = isRight ? "👩" : "🧑";
          return `
            <div class="fill-line ${isRight ? 'mia' : 'alex'}">
              <div class="fill-speaker">${emoji} ${displaySpeaker}</div>
              <div class="fill-bubble">${renderFillLine(line, data.mode, ()=>blankCounter++)}</div>
            </div>
          `;
        }).join("")}
      </div>
      ${data.mode === "pick" ? `<div class="fill-bank">${item.wordBank.map(w=>`<button class="fill-chip" onclick="pickFillWord(this,'${escAttrJs(w)}')">${escAttr(w)}</button>`).join("")}</div>` : ""}
      <div class="fill-actions">
        <button class="so-check-btn" id="fillCheckBtn" onclick="checkFillConversation()" disabled>✅ Kiểm tra</button>
        <button class="oat-next-btn" id="fillNextBtn" onclick="showFillConversation(${idx+1})" style="display:none">➡ Tiếp theo</button>
      </div>
    </div>
  `;
  const first = frame.querySelector(".fill-blank");
  if(first) setTimeout(()=>first.focus(), 80);
  updateFillReady();
};

window.setFillActive = function(idx){
  const data = window._fillConvData;
  if(data) data.activeBlank = idx;
  document.querySelectorAll(".fill-blank").forEach(inp=>inp.classList.toggle("active", parseInt(inp.dataset.blank)===idx));
};

window.handleFillKey = function(event, input){
  if(event.key === "Enter" || event.key === "Tab"){
    const blanks = [...document.querySelectorAll(".fill-blank")];
    const idx = blanks.indexOf(input);
    const next = blanks[idx+1];
    if(next){ event.preventDefault(); next.focus(); }
  }
  setTimeout(updateFillReady, 0);
};

window.pickFillWord = function(chip, word){
  const blanks = [...document.querySelectorAll(".fill-blank")];
  let target = blanks.find(inp=>parseInt(inp.dataset.blank)===window._fillConvData?.activeBlank && !inp.value.trim())
    || blanks.find(inp=>!inp.value.trim())
    || blanks[0];
  if(!target || target.disabled) return;
  target.value = word;
  chip.classList.add("used");
  const next = blanks.find(inp=>!inp.value.trim());
  if(next){
    next.focus();
    setFillActive(parseInt(next.dataset.blank));
  }
  updateFillReady();
};

window.updateFillReady = function(){
  const btn = document.getElementById("fillCheckBtn");
  if(!btn) return;
  const blanks = [...document.querySelectorAll(".fill-blank")];
  btn.disabled = !blanks.length || blanks.some(inp=>!inp.value.trim());
};

window.checkFillConversation = function(){
  const data = window._fillConvData;
  const card = document.getElementById("fillConvCard");
  if(!data || !card || card.dataset.done) return;
  const blanks = [...document.querySelectorAll(".fill-blank")];
  if(blanks.some(inp=>!inp.value.trim())) return;
  card.dataset.done = "1";
  let correctCount = 0;
  blanks.forEach(inp=>{
    inp.disabled = true;
    const ok = normalizeFillAnswer(inp.value) === normalizeFillAnswer(inp.dataset.answer);
    if(ok){ inp.classList.add("right"); correctCount++; }
    else {
      inp.classList.add("wrong");
      const ans = inp.parentElement.querySelector(".fill-answer");
      if(ans) ans.textContent = inp.dataset.answer;
    }
  });
  if(!data.scored.has(data.idx)){
    data.score += correctCount;
    data.scored.add(data.idx);
  }
  if(correctCount === blanks.length) playCorrect(); else playWrong();
  document.getElementById("fillCheckBtn").style.display = "none";
  document.getElementById("fillNextBtn").style.display = "inline-flex";
};

window.toggleFillConvMode = function(){
  const data = window._fillConvData;
  if(!data) return;
  data.mode = data.mode === "type" ? "pick" : "type";
  showFillConversation(data.idx);
};

window.restartFillConv = function(){
  const data = window._fillConvData;
  if(!data) return;
  data.idx = 0;
  data.score = 0;
  data.scored = new Set();
  showFillConversation(0);
};

// --- LISTENING TEST (video-based minitest) ---
function renderListenTest(l){
  if(!l.listeningTest) return "";
  const lt = l.listeningTest;
  const n = lt.videos.length;
  const dots = Array.from({length:n},(_,i)=>`<span class="oat-dot" id="lt-dot-${i}"></span>`).join("");
  return `
    <div class="stage-h"><span class="stage-tag">Minitest · Luyện nghe</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎧 Minitest Luyện nghe</h2>
    <div class="lt-header-box">
      <span class="lt-header-icon">🎧</span>
      <div>
        <div class="lt-header-title">${escAttr(lt.title||"MINITEST: LUYỆN NGHE VỚI VIDEO")}</div>
        <div class="lt-rule">🎯 Xem video, sau đó trả lời câu hỏi bên dưới. Mỗi video có ${lt.videos[0]?.questions?.length||5} câu hỏi.</div>
      </div>
    </div>
    <div class="oat-nav">
      <span class="oat-counter" id="ltCounter">Video 1 / ${n}</span>
      <div class="oat-dots">${dots}</div>
    </div>
    <div id="ltFrame"></div>
  `;
}

function initListenTest(l){
  window._ltData = { videos: l.listeningTest.videos, score:0, total:0 };
  _showLTVideo(0);
}

function _showLTVideo(vi){
  const { videos } = window._ltData;
  const v = videos[vi];
  const n = videos.length;
  const { iframeSrc, videoUrl, hasVideo, ytId } = resolveYouTubeVideo(v);
  const letters = ["A","B","C","D"];
  // store questions for answer lookup
  window._ltVidQs = window._ltVidQs||{};
  window._ltVidQs[vi] = v.questions;

  const qHtml = v.questions.map((q,qi)=>{
    const optsHtml = q.options.map((opt,oi)=>`
      <button class="lc-opt" data-oi="${oi}" data-correct="${oi===q.answer?1:0}" data-text="${escAttr(opt)}"
              onclick="ltAnswer(this,${oi},${q.answer},${vi},${qi})">
        <span class="lc-letter">${letters[oi]}</span>
        <span class="lc-opt-text">${escAttr(opt)}</span>
      </button>
    `).join("");
    return `
      <div class="lt-q" id="lt-q-${vi}-${qi}">
        <div class="lt-q-num">Câu ${qi+1}</div>
        <div class="lt-q-text">${escAttr(q.q)}</div>
        <div class="lc-opts">${optsHtml}</div>
        <div class="lt-q-explain" id="lt-exp-${vi}-${qi}"></div>
      </div>`;
  }).join("");

  document.getElementById("ltCounter").textContent = `Video ${vi+1} / ${n}`;
  document.querySelectorAll(".oat-dot").forEach((d,i)=>{ d.className="oat-dot"+(i===vi?" active":""); });

  document.getElementById("ltFrame").innerHTML = `
    <div class="lt-video-card">
      <div class="lt-video-head">
        <span class="lt-video-label">${escAttr(v.label||"Test "+(vi+1))}</span>
        <a class="lt-yt-link" href="${escAttr(videoUrl)}" target="_blank" rel="noopener">🔗 Mở YouTube</a>
      </div>
      <div class="lt-embed-wrap">
        ${hasVideo ? `<iframe class="lt-iframe"
          src="${escAttr(iframeSrc)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen referrerpolicy="strict-origin-when-cross-origin" loading="lazy"
          onload="hideYouTubeFallback(this)"
          onerror="showYouTubeFallback(this)"></iframe>` : ""}
        <div class="yt-fallback-bar yt-fallback-bar--lt${hasVideo ? "" : " show"}">
          <span class="yt-fallback-text">Không thể nhúng video này. Bấm mở YouTube để xem.</span>
          <a class="yt-fallback-link" href="${escAttr(videoUrl)}" target="_blank" rel="noopener">Mở YouTube</a>
        </div>
      </div>
      <div class="lt-questions-wrap">
        <div class="lt-q-header">📝 Trả lời câu hỏi sau khi xem video:</div>
        ${qHtml}
      </div>
      <div class="lt-nav-btns" id="lt-nav-${vi}" style="display:none">
        ${vi+1<n
          ? `<button class="oat-next-btn" onclick="_nextLTVideo(${vi+1})">Video tiếp theo →</button>`
          : `<div class="oat-final"><div class="oat-final-score">🏆 ${window._ltData.score} / ${window._ltData.total}</div><div class="oat-final-msg" id="ltFinalMsg"></div></div>`
        }
      </div>
    </div>
  `;
  window._ltVidState = window._ltVidState||{};
  window._ltVidState[vi] = { answered:0, total: v.questions.length };
}

window.ltAnswer = function(btn, oi, correct, vi, qi){
  const qEl = document.getElementById(`lt-q-${vi}-${qi}`);
  if(qEl.dataset.done) return;
  qEl.dataset.done="1";
  const isRight = oi===correct;
  const letters = ["A","B","C","D"];
  const correctText = qEl.querySelectorAll(".lc-opt")[correct]?.dataset.text||"";
  qEl.querySelectorAll(".lc-opt").forEach(b=>{
    b.disabled=true;
    if(parseInt(b.dataset.correct)) b.classList.add("lc-right");
    if(b===btn && !isRight) b.classList.add("lc-wrong");
  });
  // show explanation
  const expEl = document.getElementById(`lt-exp-${vi}-${qi}`);
  if(expEl){
    if(isRight){
      expEl.innerHTML = `<span class="lt-exp-right">✅ Chính xác! Đáp án: <b>${letters[correct]}. ${escAttr(correctText)}</b></span>`;
    } else {
      const pickedText = btn.dataset.text||"";
      expEl.innerHTML = `<span class="lt-exp-wrong">❌ Sai! Bạn chọn: <b>${letters[oi]}. ${escAttr(pickedText)}</b> — Đáp án đúng: <b>${letters[correct]}. ${escAttr(correctText)}</b></span>`;
    }
  }
  if(isRight) window._ltData.score++;
  window._ltData.total++;
  const vs = window._ltVidState[vi];
  vs.answered++;
  if(vs.answered===vs.total){
    const navEl = document.getElementById(`lt-nav-${vi}`);
    if(navEl){ navEl.style.display="block";
      const dot = document.getElementById(`lt-dot-${vi}`);
      if(dot) dot.className="oat-dot done-right";
      if(vi+1 >= window._ltData.videos.length){
        const sc=window._ltData.score, tot=window._ltData.total;
        const el=document.getElementById("ltFinalMsg");
        if(el) el.textContent = sc===tot?"Xuất sắc! 🎉":sc>=tot*0.7?"Tốt lắm! 👍":"Cố gắng hơn nhé! 💪";
      }
    }
  }
};

window._nextLTVideo = function(vi){ _showLTVideo(vi); };

function renderSprint(l){
  return `
    <div class="stage-h"><span class="stage-tag">Minigame · Sprint</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">⚡ Sprint phản xạ</h2>
    <p class="stage-sub">Mỗi câu <b>10 giây</b>. Nghe → chọn đáp án nhanh nhất. Luyện phản xạ theo tốc độ thật.</p>
    <div class="sprint-stage" id="sprintStage"></div>
    <div class="sprint-result" id="sprintResult" style="display:none">
      <b id="sprintScore">0/0</b>
      <div id="sprintMsg" style="margin-top:6px;color:var(--ink-mute)">—</div>
    </div>
  `;
}

function initSprint(l){
  const sample = shuffle([...l.vocabulary]).slice(0, Math.min(8, l.vocabulary.length));
  STATE.sprint = { sample, idx:0, score:0, total:sample.length, timerId:null, secs:10 };
  showSprintQ();
}

function showSprintQ(){
  const s = STATE.sprint;
  const stage = document.getElementById("sprintStage");
  if(!stage) return;
  if(s.idx >= s.total){
    // finished
    stage.innerHTML = `<div class="sprint-prompt">🏁 Hoàn thành!</div>
      <div style="font-size:64px;font-family:var(--font-display);font-weight:700">${s.score}/${s.total}</div>`;
    document.getElementById("sprintResult").style.display="block";
    document.getElementById("sprintScore").textContent = `${s.score}/${s.total}`;
    const pct = s.score/s.total;
    document.getElementById("sprintMsg").textContent =
      pct===1 ? "⚡ Phản xạ tuyệt vời!" :
      pct>=0.7 ? "👍 Khá nhanh nhạy!" :
      "📚 Hãy ôn từ vựng kỹ hơn nhé.";
    return;
  }

  const v = s.sample[s.idx];
  const lesson = LESSONS.find(x=>x.id===STATE.lessonId);
  const opts = makeOptions(v, lesson.vocabulary, "vi", 4);

  stage.innerHTML = `
    <div class="sprint-timer" id="sprintTimer">⏱ 10s · Câu ${s.idx+1}/${s.total}</div>
    <div class="sprint-prompt">Nghe và chọn nghĩa đúng</div>
    <button class="sprint-play" onclick="speakById('${regTxt(v.en)}', 0.9)">🔊</button>
    <div class="sprint-opts">
      ${opts.map(o=>`<button class="sprint-opt" data-correct="${o.correct?1:0}" onclick="answerSprint(this, ${o.correct?1:0})">${o.text}</button>`).join("")}
    </div>
  `;

  // auto play
  setTimeout(()=>speak(v.en, 0.9), 200);

  // timer
  s.secs = 10;
  if(s.timerId) clearInterval(s.timerId);
  s.timerId = setInterval(()=>{
    s.secs--;
    const t = document.getElementById("sprintTimer");
    if(t) t.textContent = `⏱ ${s.secs}s · Câu ${s.idx+1}/${s.total}`;
    if(s.secs<=0){
      clearInterval(s.timerId);
      // mark wrong
      document.querySelectorAll(".sprint-opt").forEach(b=>{
        if(b.dataset.correct==="1") b.classList.add("right");
        b.style.pointerEvents="none";
      });
      setTimeout(()=>{ s.idx++; showSprintQ(); }, 1000);
    }
  }, 1000);
}

function answerSprint(btn, isCorrect){
  const s = STATE.sprint;
  if(s.timerId) clearInterval(s.timerId);
  document.querySelectorAll(".sprint-opt").forEach(b=>{
    b.style.pointerEvents = "none";
    if(b.dataset.correct==="1") b.classList.add("right");
  });
  if(!isCorrect) btn.classList.add("wrong");
  else s.score++;
  setTimeout(()=>{ s.idx++; showSprintQ(); }, 800);
}

// --- SPEAKING ---
function renderSpeakingExtras(sp){
  const challenges = (sp.challenges || []).map(challenge=>`
    <div class="speaking-extra-card">
      <h5>${escAttr(challenge.title)}</h5>
      <ol class="hw2-items">${(challenge.questions || []).map(q=>`<li>${escAttr(q)}</li>`).join("")}</ol>
      ${challenge.sample ? `
        <div class="speaking-panel sample" style="display:block">
          <div class="panel-label">Gợi ý bài nói</div>
          <div class="dlg-en">${escAttr(challenge.sample)}</div>
        </div>
      ` : ""}
    </div>
  `).join("");
  const rubric = sp.feedbackRubric?.length ? `
    <div class="speaking-extra-card">
      <h5>AI Feedback Rubric</h5>
      <table class="grammar-table">
        <thead><tr><th>Tiêu chí</th><th>Cần kiểm tra</th></tr></thead>
        <tbody>
          ${sp.feedbackRubric.map(row=>`<tr><td>${escAttr(row.criteria)}</td><td>${escAttr(row.check)}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  ` : "";
  if(!challenges && !rubric) return "";
  return `
    <div class="speaking-extra">
      ${challenges ? `<h4>Speaking Challenge</h4><div class="speaking-extra-grid">${challenges}</div>` : ""}
      ${rubric}
    </div>
  `;
}

function renderSpeaking(l){
  if(!l.speaking) return "";
  const sp = l.speaking;
  const formula = l.grammar?.formula || l.speaking.formula || "";
  const turns = normalizeSpeakingTurns(sp);
  const extrasHtml = renderSpeakingExtras(sp);
  return `
    <div class="stage-h"><span class="stage-tag">Speaking</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🎤 Luyện nói (AI chấm phát âm)</h2>
    <p class="stage-sub">Click 🔊 nghe — click 🎤 thu âm để AI chấm phát âm. <b>Cần Chrome/Edge</b> + cho phép microphone.</p>
    <div class="speak-block">
      <h4>💬 Đối thoại</h4>
      <div class="speaking-chat">
        ${turns.map((turn,i)=>{
          const aiText = turn.ai.audioUrl || turn.ai.textEn;
          const sampleText = turn.user.sampleAudioUrl || turn.user.sampleEn;
          return `
          <div class="chat-turn">
            <div class="chat-row ai">
              <div class="chat-avatar">AI</div>
              <div class="chat-bubble ai-bubble">
                <div class="chat-name">Teacher${turn.group ? ` · ${escAttr(turn.group)}` : ""}</div>
                <div class="dlg-en">${escAttr(aiText)}</div>
                <button class="dlg-speak chat-action solo" onclick="speakById('${regTxt(aiText)}', 0.95)" title="Nghe câu hỏi">🔊</button>
              </div>
            </div>
            <div class="chat-row user">
              <div class="chat-bubble user-bubble">
                <div class="chat-name">Student</div>
                <div class="chat-toggle-row">
                  <button class="sample-toggle" onclick="toggleSpeakingPanel(${i}, 'formula')">Hiện công thức</button>
                  <button class="sample-toggle" onclick="toggleSpeakingPanel(${i}, 'sample')">Hiện câu mẫu</button>
                </div>
                <div class="speaking-panel formula" id="speakFormula-${i}" style="display:none">
                  <div class="panel-label">Công thức</div>
                  <div>${escAttr(turn.user.formula)}</div>
                </div>
                <div class="speaking-panel sample" id="speakSample-${i}" style="display:none">
                  ${turn.user.shortAnswer ? `
                    <div class="panel-label">Trả lời ngắn</div>
                    <div class="dlg-en">${escAttr(turn.user.shortAnswer)}</div>
                  ` : ""}
                  <div class="panel-label">Câu mẫu</div>
                  <div class="dlg-en">${escAttr(sampleText)}</div>
                  <div class="dlg-vi">${escAttr(turn.user.sampleVn)}</div>
                </div>
                <div class="speaking-criteria">AI sửa lỗi: ${(turn.user.criteria || ["grammar","vocabulary","pronunciation/speaking"]).map(x=>`<span>${escAttr(x)}</span>`).join("")}</div>
                <div class="chat-actions">
                  <button class="dlg-speak" onclick="speakById('${regTxt(sampleText)}', 0.95)" title="Nghe câu mẫu">🔊</button>
                  <button class="dlg-mic" id="mic-${i}" onclick="recordById(${i}, '${regTxt(sampleText)}')" title="Thu âm">🎤</button>
                </div>
                <div class="dlg-result" id="speakRes-${i}" style="display:none"></div>
              </div>
              <div class="chat-avatar user-avatar">You</div>
            </div>
          </div>
        `;}).join("")}
      </div>
      <button class="ctl-btn" onclick="playFullDialogue(${l.id})" style="background:var(--purple);color:#fff;border-color:var(--purple)">▶ Nghe toàn bộ hội thoại</button>
    </div>
    ${extrasHtml}
  `;
}

function normalizeSpeakingTurns(sp){
  if(Array.isArray(sp.turns)) return sp.turns;
  const questions = sp.questions || [];
  const dialogue = sp.dialogue || [];
  const turns = [];
  for(let i=0;i<dialogue.length;i+=2){
    const ai = dialogue[i] || {};
    const user = dialogue[i+1] || {};
    const q = questions[Math.floor(i/2)] || {};
    turns.push({
      id: turns.length + 1,
      ai: {
        textEn: ai.en || q.q || "",
        textVn: ai.vi || "",
        audioUrl: ai.audioUrl || ai.en || q.q || ""
      },
      user: {
        formula: q.formula || "",
        sampleEn: user.en || q.sampleAnswer || "",
        sampleVn: user.vi || "",
        sampleAudioUrl: user.audioUrl || user.en || q.sampleAnswer || ""
      }
    });
  }
  return turns;
}

function playFullDialogue(lid){
  const l = LESSONS.find(x=>x.id===lid);
  const turns = normalizeSpeakingTurns(l.speaking);
  if(turns.length){
    const lines = turns.flatMap(turn => [
      turn.ai.audioUrl || turn.ai.textEn,
      turn.user.sampleAudioUrl || turn.user.sampleEn
    ].filter(Boolean));
    const pause = l.speechProfile?.pauseMs ?? 650;
    let lineIdx = 0;
    function nextLine(){
      if(lineIdx>=lines.length) return;
      speak(lines[lineIdx], 0.95, ()=>{ lineIdx++; setTimeout(nextLine, pause); });
    }
    nextLine();
    return;
  }
  let i=0;
  function next(){
    if(i>=l.speaking.dialogue.length) return;
    const d = l.speaking.dialogue[i];
    speak(d.en, 0.95, ()=>{ i++; setTimeout(next, 500); });
  }
  next();
}

window.toggleSpeakingSample = function(i){ toggleSpeakingPanel(i, "sample"); };
window.toggleSpeakingPanel = function(i, type){
  const el = document.getElementById(type === "formula" ? `speakFormula-${i}` : `speakSample-${i}`);
  if(!el) return;
  el.style.display = el.style.display === "none" ? "block" : "none";
};

// --- WRITING ---
function renderWriting(l){
  const sample = shuffle([...l.vocabulary]).slice(0, Math.min(5, l.vocabulary.length));
  return `
    <div class="stage-h"><span class="stage-tag">Writing</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">📝 Điền từ vào chỗ trống</h2>
    <p class="stage-sub">Nhìn nghĩa tiếng Việt + gợi ý chữ cái đầu, gõ từ tiếng Anh tương ứng.</p>
    <div class="mg-block warm">
      ${sample.map((v,i)=>{
        const hint = v.en[0] + "_".repeat(Math.max(0, v.en.length-1));
        return `
        <div class="write-q">
          <div class="write-q-text">
            ${v.img||""} <input class="write-blank" id="wq-${i}" data-ans="${escAttr(v.en.toLowerCase())}" placeholder="${hint}" autocomplete="off">
          </div>
          <div class="write-vi">→ ${v.vi}</div>
        </div>
        `;
      }).join("")}
      <button class="write-check" onclick="checkWriting(${sample.length})">Kiểm tra</button>
    </div>
  `;
}

function checkWriting(n){
  let ok=0;
  for(let i=0;i<n;i++){
    const inp = document.getElementById(`wq-${i}`);
    const ans = (inp.value||"").trim().toLowerCase();
    inp.classList.remove("right","wrong");
    if(ans===inp.dataset.ans){ inp.classList.add("right"); ok++; }
    else inp.classList.add("wrong");
  }
  toast(`✍️ Đúng ${ok}/${n} câu`, ok===n?"success":"");
}

// --- MINITEST ---
function renderMinitest(l){
  const tests = l.minitest||[];
  const videos = l.minitest_videos||[];
  return `
    <div class="stage-h"><span class="stage-tag">Minitest</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">📋 Minitest tổng hợp</h2>
    <p class="stage-sub">Bài kiểm tra tổng hợp <b>4 kỹ năng</b>. Hãy làm hết để xem điểm số.</p>
    ${videos.length ? `
    <div class="mt-videos">
      <h4>🎧 Luyện nghe với video</h4>
      <p class="mt-videos-sub">Hãy xem các video dưới đây và trả lời câu hỏi trắc nghiệm!</p>
      <div class="mt-video-links">
        ${videos.map(v=>`<a class="mt-video-link" href="${escAttr(v.url)}" target="_blank" rel="noopener noreferrer">🔗 ${escAttr(v.label)}</a>`).join("")}
      </div>
    </div>
    ` : ""}
    <div class="minitest-block mt-step-mode">
      <div class="minitest-head">
        <h4>${tests.length} câu hỏi</h4>
        <div class="mt-step-meta">
          <span class="mt-step-count" id="mtStepCount">1/${tests.length}</span>
          <span class="mt-progress" id="mtProgress">0/${tests.length}</span>
        </div>
      </div>
      ${tests.map((q,i)=>{
        const isWrite = q.type==="writing" && !q.options;
        const qType = q.type || (isWrite ? "writing" : "quiz");
        return `
        <div class="mt-q ${i===0?'active':''}" data-idx="${i}">
          <div class="mt-q-head">
            <span class="mt-q-num">Q${i+1}</span>
            <span class="mt-q-type ${escAttr(qType)}">${escAttr(qType.toUpperCase())}</span>
            ${q.audio?`<button class="listen-play" onclick="speakById('${regTxt(q.audio)}', 0.9)">🔊 Nghe</button>`:""}
          </div>
          <div class="mt-q-text">${escAttr(q.q)}</div>
          ${isWrite ? `
            <div class="mt-write-row">
              <input class="mt-input" id="mtInput${i}" data-i="${i}" data-ans="${escAttr((q.answer||"").toLowerCase())}" placeholder="Gõ đáp án..." onkeydown="if(event.key==='Enter') checkMtWrite(this)">
              <button class="mt-next-btn" type="button" onclick="checkMtWrite(document.getElementById('mtInput${i}'))">Kiểm tra</button>
            </div>
          ` : `
            <div class="mt-opts">
              ${(q.options||[]).map((o,j)=>`
                <button class="mt-opt" data-letter="${String.fromCharCode(65+j)}" onclick="checkMt(this,${j},${q.answer},${i})">${escAttr(o)}</button>
              `).join("")}
            </div>
          `}
        </div>
      `;}).join("")}
      <div class="mt-step-nav" id="mtStepNav">
        <button class="mt-next-btn" type="button" onclick="nextMtQuestion()">Câu tiếp theo →</button>
      </div>
      <div class="mt-result" id="mtResult">
        <div class="mt-score"><span id="mtScoreNum">0</span>/${tests.length}</div>
        <div class="mt-msg" id="mtMsg">—</div>
      </div>
    </div>
  `;
}

function checkMt(btn, picked, correct, qid){
  const parent = btn.parentElement;
  if(parent.dataset.done) return;
  parent.dataset.done = "1";
  const isRight = picked === correct;
  parent.querySelectorAll(".mt-opt").forEach((b,i)=>{
    if(i===correct) b.classList.add("right");
    else if(b===btn) b.classList.add("wrong");
    b.style.pointerEvents = "none";
  });
  if(isRight){
    playCorrect();
  } else {
    playWrong();
    const ansBtn = parent.querySelectorAll(".mt-opt")[correct];
    if(ansBtn) setTimeout(()=>speak(ansBtn.textContent.trim(), 0.9), 350);
  }
  const lesson = LESSONS.find(l=>l.id===STATE.lessonId);
  const explanation = lesson?.minitest?.[qid]?.explanation;
  if(explanation){
    const note = document.createElement("div");
    note.className = "mt-explanation";
    note.textContent = explanation;
    parent.parentElement.appendChild(note);
  }
  STATE.minitestAnswers = STATE.minitestAnswers||{};
  STATE.minitestAnswers[qid] = isRight;
  updateMtProgress();
  revealMtNext(qid);
}

function checkMtWrite(inp){
  if(inp.dataset.done) return;
  if(!inp.value.trim()) return;
  inp.dataset.done = "1";
  const ok = (inp.value||"").trim().toLowerCase() === inp.dataset.ans;
  inp.classList.add(ok?"right":"wrong");
  inp.disabled = true;
  if(ok){
    playCorrect();
  } else {
    playWrong();
    const hint = document.createElement("span");
    hint.style.cssText = "margin-left:8px;color:var(--red);font-weight:600;font-size:0.9em";
    hint.textContent = "→ " + inp.dataset.ans;
    inp.parentElement.appendChild(hint);
    setTimeout(()=>speak(inp.dataset.ans, 0.9), 350);
  }
  STATE.minitestAnswers = STATE.minitestAnswers||{};
  const qid = parseInt(inp.dataset.i);
  STATE.minitestAnswers[qid] = ok;
  updateMtProgress();
  revealMtNext(qid);
}

function initMinitest(lesson){
  STATE.minitestAnswers = {};
  STATE.minitestCurrent = 0;
  showMinitestQuestion(0);
}

function showMinitestQuestion(idx){
  const questions = [...document.querySelectorAll(".mt-step-mode .mt-q")];
  if(!questions.length) return;
  const clamped = Math.max(0, Math.min(idx, questions.length - 1));
  STATE.minitestCurrent = clamped;
  questions.forEach((q,i)=>q.classList.toggle("active", i===clamped));
  const counter = document.getElementById("mtStepCount");
  if(counter) counter.textContent = `${clamped + 1}/${questions.length}`;
  const nav = document.getElementById("mtStepNav");
  if(nav) nav.classList.remove("show");
}

function revealMtNext(qid){
  if(qid !== STATE.minitestCurrent) return;
  const lesson = LESSONS.find(l=>l.id===STATE.lessonId);
  const total = lesson?.minitest?.length || 0;
  if(qid >= total - 1) return;
  const nav = document.getElementById("mtStepNav");
  if(nav) nav.classList.add("show");
}

window.nextMtQuestion = function(){
  const current = STATE.minitestCurrent || 0;
  const ans = STATE.minitestAnswers || {};
  if(!Object.prototype.hasOwnProperty.call(ans, current)){
    toast("Hãy trả lời câu hiện tại trước nhé.", "");
    return;
  }
  showMinitestQuestion(current + 1);
};

function updateMtProgress(){
  const lesson = LESSONS.find(l=>l.id===STATE.lessonId);
  const total = lesson.minitest.length;
  const ans = STATE.minitestAnswers||{};
  const answered = Object.keys(ans).length;
  const correct = Object.values(ans).filter(Boolean).length;
  document.getElementById("mtProgress").textContent = `${answered}/${total}`;
  if(answered===total){
    const nav = document.getElementById("mtStepNav");
    if(nav) nav.classList.remove("show");
    document.getElementById("mtScoreNum").textContent = correct;
    const pct = correct/total;
    let msg;
    if(pct===1) msg="🎉 Xuất sắc! Bạn đã nắm vững bài này.";
    else if(pct>=0.8) msg="👍 Rất tốt! Hãy ôn lại các câu sai.";
    else if(pct>=0.6) msg="✓ Khá ổn! Cần luyện thêm chút nữa.";
    else msg="📚 Hãy ôn lại lý thuyết và làm lại nhé.";
    document.getElementById("mtMsg").textContent = msg;
    document.getElementById("mtResult").classList.add("show");
  }
}

// --- MINDMAP ---
function renderMindmap(l){
  if(!l.mindmap) return "";
  const m = l.mindmap;
  if(m.type==="structured"){
    const branchColors = ["#1a2a5e","#16a34a","#ea580c"];
    const branchesHtml = m.branches.map((b,i)=>`
      <div class="mm2-branch" style="--bc:${branchColors[i%branchColors.length]}">
        <div class="mm2-branch-head">${b.icon||""} ${escAttr(b.label)}</div>
        <div class="mm2-branch-sub">${b.sub||""}</div>
        <div class="mm2-items">
          ${(b.items||[]).map(it=>typeof it==="string"
            ? `<div class="mm2-item">• ${escAttr(it)}</div>`
            : `<div class="mm2-item mm2-item-bold">• ${escAttr(it.text)}</div>`
          ).join("")}
        </div>
        ${b.box ? `<div class="mm2-box"><div class="mm2-box-title">${escAttr(b.box.title)}</div>${b.box.items.map(x=>`<div class="mm2-box-item">"${escAttr(x)}"</div>`).join("")}</div>` : ""}
        ${b.tips ? `<div class="mm2-tips"><div class="mm2-tips-title">💡 ${escAttr(b.tips.title)}</div>${b.tips.items.map(x=>`<div class="mm2-tips-item">• ${escAttr(x)}</div>`).join("")}</div>` : ""}
      </div>
    `).join("");
    return `
      <div class="stage-h"><span class="stage-tag">Mindmap</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
      <h2 class="stage-title">🗺️ Mindmap tổng kết</h2>
      <div class="mm2-wrap">
        <div class="mm2-center">🍕 ${escAttr(m.center)}</div>
        <div class="mm2-branches">${branchesHtml}</div>
      </div>
    `;
  }
  // --- original SVG renderer (unchanged for other lessons) ---
  const colors = ["#dc2626","#16a34a","#eab308","#1a2a5e","#7c3aed","#ea580c"];
  const cx=350, cy=240, R=170;
  const n = m.branches.length;
  const positions = m.branches.map((_,i)=>{
    const a = (i/n)*Math.PI*2 - Math.PI/2;
    return { x: cx + R*Math.cos(a), y: cy + R*Math.sin(a) };
  });
  return `
    <div class="stage-h"><span class="stage-tag">Mindmap</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">🗺️ Mindmap tổng kết</h2>
    <p class="stage-sub">Sơ đồ tư duy giúp bạn <b>hệ thống lại</b> kiến thức cả buổi.</p>
    <div class="mindmap-wrap">
      <svg class="mm-svg" viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
        ${positions.map((p,i)=>`
          <line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}"
                stroke="${colors[i%colors.length]}" stroke-width="2.5" stroke-dasharray="6,4" />
        `).join("")}
        ${positions.map((p,i)=>`
          <g>
            <circle cx="${p.x}" cy="${p.y}" r="52" fill="${colors[i%colors.length]}" stroke="#fff" stroke-width="3"/>
            <text x="${p.x}" y="${p.y+5}" text-anchor="middle" fill="#fff"
                  font-family="Quicksand" font-size="14" font-weight="700">${m.branches[i].label}</text>
          </g>
        `).join("")}
        <circle cx="${cx}" cy="${cy}" r="68" fill="#1a2a5e" stroke="#fde047" stroke-width="4"/>
        <text x="${cx}" y="${cy-4}" text-anchor="middle" fill="#fde047"
              font-family="Quicksand" font-size="13" font-weight="700">Buổi ${l.id}</text>
        <text x="${cx}" y="${cy+16}" text-anchor="middle" fill="#fff"
              font-family="Quicksand" font-size="12" font-weight="700">${(m.center||"").toUpperCase()}</text>
      </svg>
      <div class="mm-list">
        ${m.branches.map((b,i)=>`
          <div class="mm-branch" style="--branch-color:${colors[i%colors.length]}">
            <h5>${b.label}</h5>
            <ul>${b.items.map(x=>`<li>${x}</li>`).join("")}</ul>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// --- HOMEWORK ---
function linkify(text){
  return text
    .replace(/\n/g,"<br>")
    .replace(/(https?:\/\/[^\s<]+)/g,'<a class="hw-link" href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

function renderHomework(l){
  const lid = l.id;
  const hwState = progress.hw[lid] || [];
  const summaryHtml = l.summary?.length ? `
    <div class="hw2-task">
      <div class="hw2-task-head">
        <span class="hw2-task-icon">✅</span>
        <span class="hw2-task-title">Tổng kết</span>
      </div>
      <div class="hw2-task-body">
        <ol class="hw2-items">${l.summary.map(x=>`<li>${escAttr(x)}</li>`).join("")}</ol>
        ${l.keySentences?.length ? `<div class="hw2-note"><b>Câu mẫu cần nhớ:</b><br>${l.keySentences.map(x=>escAttr(x)).join("<br>")}</div>` : ""}
        ${l.nextPrep ? `<p class="hw2-note"><b>Chuẩn bị cho buổi sau:</b> ${escAttr(l.nextPrep)}</p>` : ""}
      </div>
    </div>
  ` : "";

  // Rich homework format (lesson 5+)
  if(l.homeworkRich){
    const hw = l.homeworkRich;
    const tasksHtml = hw.tasks.map((t,i)=>`
      <div class="hw2-task">
        <div class="hw2-task-head">
          <span class="hw2-task-icon">${t.icon}</span>
          <span class="hw2-task-title">${escAttr(t.title)}</span>
          ${t.badge ? `<span class="hw2-badge">${escAttr(t.badge)}</span>` : ""}
        </div>
        <div class="hw2-task-body">
          <p class="hw2-desc">${escAttr(t.desc)}</p>
          ${t.note ? `<p class="hw2-note">${escAttr(t.note)}</p>` : ""}
          ${t.items ? `<ol class="hw2-items">${t.items.map(x=>`<li>${escAttr(x)}</li>`).join("")}</ol>` : ""}
          ${t.showSample && t.sample ? `<div class="hw2-note hw2-sample"><b>Gợi ý:</b><br>${linkify(escAttr(t.sample))}</div>` : ""}
          ${t.showRubric && t.rubric ? `<div class="hw2-note hw2-rubric"><b>Tiêu chí:</b> ${escAttr(t.rubric)}</div>` : ""}
          ${t.links ? t.links.map(lk=>`
            <a class="hw2-link" href="${escAttr(lk.url)}" target="_blank" rel="noopener">
              🎬 ${escAttr(lk.label)} <span class="hw2-link-url">${escAttr(lk.url)}</span>
            </a>`).join("") : ""}
        </div>
        <label class="hw2-check">
          <input type="checkbox" id="hw2-cb-${i}" onchange="toggleHw(${lid},${i},this)" ${hwState.includes(i)?"checked":""}>
          <span>Đã hoàn thành</span>
        </label>
      </div>
    `).join("");
    return `
      <div class="stage-h"><span class="stage-tag">Homework</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
      <h2 class="stage-title">📓 Bài tập về nhà</h2>
      <div class="hw2-block">
        <div class="hw2-header">
          <div class="hw2-header-title">🏠 ${escAttr(hw.title)}</div>
          <div class="hw2-meta">
            <span>📤 <b>Nộp bài:</b> ${escAttr(hw.submit)}</span>
            <span>⏰ <b>Hạn nộp:</b> ${escAttr(hw.deadline)}</span>
          </div>
        </div>
        ${tasksHtml}
        ${summaryHtml}
        <button class="hw-finish" onclick="nextSection()">✓ Hoàn thành buổi học này</button>
      </div>
    `;
  }

  // Original simple format
  return `
    <div class="stage-h"><span class="stage-tag">Homework</span><span class="stage-num">${STATE.sectionIdx+1}/${STATE.sections.length}</span></div>
    <h2 class="stage-title">📓 Bài tập về nhà</h2>
    <p class="stage-sub">Hoàn thành các bài tập này trước buổi học tiếp theo để củng cố.</p>
    <div class="hw-block">
      <h4>✅ Checklist</h4>
      <p class="hw-sub">Click vào mỗi ô để đánh dấu hoàn thành</p>
      <ul class="hw-list">
        ${(l.homework||[]).map((h,i)=>`
          <li class="${hwState.includes(i)?'done':''}" onclick="toggleHw(${lid}, ${i}, this)">
            <span class="hw-text">${linkify(h)}</span>
          </li>
        `).join("")}
      </ul>
      ${summaryHtml}
      <button class="hw-finish" onclick="nextSection()">✓ Hoàn thành buổi học này</button>
    </div>
  `;
}

function toggleHw(lid, i, el){
  if(!progress.hw[lid]) progress.hw[lid]=[];
  const arr = progress.hw[lid];
  const idx = arr.indexOf(i);
  if(idx>=0) arr.splice(idx,1); else arr.push(i);
  saveProgress(progress);
  upsertHomeworkProgress(lid);
  el.classList.toggle("done");
}

function upsertHomeworkProgress(lid){
  markLessonOpened(lid).catch(() => {});
}

// ============== TTS / Speech ==============
let voicesCache = [];
let voiceReadyResolvers = [];
function loadVoices(){
  voicesCache = speechSynthesis.getVoices();
  if(voicesCache.length && voiceReadyResolvers.length){
    const resolvers = voiceReadyResolvers.splice(0);
    resolvers.forEach(resolve => resolve());
  }
}
if("speechSynthesis" in window){
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

function waitForSpeechVoices(timeout = 300){
  if(!("speechSynthesis" in window)) return Promise.resolve();
  const voices = speechSynthesis.getVoices();
  if(voices.length || voicesCache.length) return Promise.resolve();
  return new Promise(resolve => {
    let done = false;
    const finish = () => {
      if(done) return;
      done = true;
      resolve();
    };
    voiceReadyResolvers.push(finish);
    setTimeout(finish, timeout);
  });
}

let activeUtterance = null;
let activeAudioFile = null;
let activeSpeechButton = null;
let lastSpeakTime = 0;
let lastSpeakText = "";

function stopCurrentSpeech() {
  if ("speechSynthesis" in window) {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }
  }
  if (activeAudioFile) {
    try {
      activeAudioFile.pause();
      activeAudioFile.currentTime = 0;
    } catch(e) {}
    activeAudioFile = null;
  }
  if (activeSpeechButton) {
    activeSpeechButton.classList.remove('playing', 'loading');
    activeSpeechButton = null;
  }
}

function stopYouTubeVideos() {
  document.querySelectorAll("iframe").forEach(iframe => {
    try {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    } catch(e) {}
    try {
      const src = iframe.src;
      iframe.src = src;
    } catch(e) {}
  });
}

function getBestEnglishVoice() {
  if (!("speechSynthesis" in window)) return null;
  let voices = speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    voices = voicesCache;
  } else {
    voicesCache = voices;
  }
  
  if (!voices || voices.length === 0) return null;
  
  // Filter for English voices (en-US or en-GB)
  const enUSGBVoices = voices.filter(v => {
    const l = (v.lang || "").toLowerCase();
    return l.startsWith("en-us") || l.startsWith("en-gb");
  });
  
  const anyEnVoices = voices.filter(v => (v.lang || "").toLowerCase().startsWith("en"));
  
  // Priority patterns in order
  const priorityPatterns = [
    /Google US English/i,
    /Microsoft Jenny/i,
    /Microsoft Aria/i,
    /Samantha/i,
    /Daniel/i,
    /Karen/i,
    /Serena/i,
    /Google UK English/i
  ];
  
  // 1. Try to find priority voices in en-US/en-GB
  for (const pattern of priorityPatterns) {
    const found = enUSGBVoices.find(v => pattern.test(v.name));
    if (found) return found;
  }
  
  // 2. Try to find priority voices in any English voice
  for (const pattern of priorityPatterns) {
    const found = anyEnVoices.find(v => pattern.test(v.name));
    if (found) return found;
  }
  
  // 3. Try to find online natural / natural / neural voices
  const naturalPattern = /online natural|natural|neural|premium/i;
  let found = enUSGBVoices.find(v => naturalPattern.test(v.name)) || anyEnVoices.find(v => naturalPattern.test(v.name));
  if (found) return found;
  
  // 4. Try other common quality voices
  const standardPattern = /aria|jenny|ava|emma|michelle|monica|natasha/i;
  found = enUSGBVoices.find(v => standardPattern.test(v.name)) || anyEnVoices.find(v => standardPattern.test(v.name));
  if (found) return found;
  
  // 5. Fallback to first en-US/en-GB voice
  if (enUSGBVoices.length > 0) return enUSGBVoices[0];
  
  // 6. Fallback to any English voice
  if (anyEnVoices.length > 0) return anyEnVoices[0];
  
  return null;
}

function normalizeSpeechText(text) {
  if (!text) return "";
  
  let cleaned = String(text);
  
  // Remove HTML tags
  cleaned = cleaned.replace(/<\/?[^>]+(>|$)/g, "");
  
  // Remove markdown bold/italic tags and brackets
  cleaned = cleaned.replace(/\*\*|_/g, "");
  cleaned = cleaned.replace(/\[\[|\]\]/g, "");
  
  // Remove IPA symbols or transcripts like /.../
  cleaned = cleaned.replace(/\/[^\s\/]+(?:\s+[^\s\/]+)*\//g, "");
  
  // Remove emojis
  cleaned = cleaned.replace(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{1F1E6}-\u{1F1FF}]/gu, "");
  
  // Remove parenthetical comments/hints/translations (e.g. "(trong)", "(play)")
  cleaned = cleaned.replace(/\s*\([^)]*\)/g, "");
  
  // Remove question numbering labels (e.g. "Question 1:", "Q1:", "A.", "1.")
  cleaned = cleaned.replace(/^(?:Question\s+\d+|Q\d+|[A-D]\b|\d+)\.?\s*[:-]?\s*/i, "");
  
  // Replace arrows and dashes with spaces
  cleaned = cleaned.replace(/[→⇒─—–]|=>|->/g, " ");
  
  // Handle slashes like "living room / dining room" -> "living room or dining room"
  cleaned = cleaned.replace(/\s+\/\s+/g, " or ");
  
  // Clean up extra spaces
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  
  return cleaned;
}

function getFilledSentence(text) {
  if (!text || !text.includes("___")) return text;
  
  const lesson = LESSONS.find(l => l.id === STATE.lessonId);
  if (!lesson) return text;
  
  // Helper to recursively find a matching question object in the lesson structure
  function findQuestionInObject(obj) {
    if (!obj || typeof obj !== 'object') return null;
    
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const found = findQuestionInObject(item);
        if (found) return found;
      }
    } else {
      if ((obj.audio === text || obj.q === text) && obj.answer !== undefined) {
        return obj;
      }
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const found = findQuestionInObject(obj[key]);
          if (found) return found;
        }
      }
    }
    return null;
  }
  
  const matchedQ = findQuestionInObject(lesson);
  if (matchedQ) {
    let replacement = "";
    if (matchedQ.options && typeof matchedQ.answer === 'number') {
      replacement = matchedQ.options[matchedQ.answer];
    } else if (typeof matchedQ.answer === 'string') {
      replacement = matchedQ.answer;
    }
    if (replacement) {
      return text.replace(/___+/, replacement);
    }
  }
  
  return text;
}

function isAudioUrl(str) {
  if (typeof str !== 'string') return false;
  const s = str.trim();
  return /\.(mp3|wav|ogg|aac|m4a)(\?.*)?$/i.test(s) || /^(https?:\/\/)/i.test(s);
}

function getFallbackTextFromUrl(url) {
  const filename = url.substring(url.lastIndexOf('/') + 1);
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  return nameWithoutExt.replace(/[_-]/g, " ");
}

function speakEnglish(text, options = {}) {
  // Prevent rapid double-clicks on the same audio
  const now = Date.now();
  if (text === lastSpeakText && now - lastSpeakTime < 500) {
    return;
  }
  lastSpeakTime = now;
  lastSpeakText = text;

  stopCurrentSpeech();
  stopYouTubeVideos();
  
  if (!text) {
    if (options.onend) options.onend();
    return;
  }
  
  // Detect triggering button from the event to update UI state
  let targetBtn = null;
  if (typeof window !== 'undefined' && window.event) {
    const currentTarget = window.event.currentTarget || window.event.target;
    if (currentTarget) {
      targetBtn = currentTarget.closest('button') || currentTarget;
    }
  }
  
  if (targetBtn) {
    activeSpeechButton = targetBtn;
    activeSpeechButton.classList.add('loading');
  }
  
  if (isAudioUrl(text)) {
    const audio = new Audio(text);
    activeAudioFile = audio;
    
    audio.onplay = () => {
      if (targetBtn) {
        targetBtn.classList.remove('loading');
        targetBtn.classList.add('playing');
      }
      if (options.onstart) options.onstart();
    };
    
    audio.onended = () => {
      if (targetBtn) {
        targetBtn.classList.remove('playing', 'loading');
        if (activeSpeechButton === targetBtn) activeSpeechButton = null;
      }
      if (activeAudioFile === audio) activeAudioFile = null;
      if (options.onend) options.onend();
    };
    
    audio.onerror = () => {
      if (activeAudioFile === audio) activeAudioFile = null;
      const fallbackText = options.fallbackText || getFallbackTextFromUrl(text);
      playTTS(fallbackText, options, targetBtn);
    };
    
    audio.play().catch(() => {
      if (activeAudioFile === audio) activeAudioFile = null;
      const fallbackText = options.fallbackText || getFallbackTextFromUrl(text);
      playTTS(fallbackText, options, targetBtn);
    });
  } else {
    playTTS(text, options, targetBtn);
  }
}

function playTTS(text, options = {}, targetBtn = null) {
  if (!("speechSynthesis" in window)) {
    toast("Trình duyệt không hỗ trợ phát âm", "error");
    if (targetBtn) targetBtn.classList.remove('loading');
    if (options.onerror) options.onerror();
    return;
  }
  
  let speechText = getFilledSentence(text);
  speechText = normalizeSpeechText(speechText);
  
  if (!speechText) {
    if (targetBtn) targetBtn.classList.remove('loading');
    if (options.onend) options.onend();
    return;
  }

  if (!options.voicesWaited && !speechSynthesis.getVoices().length && !voicesCache.length) {
    waitForSpeechVoices().then(() => playTTS(text, { ...options, voicesWaited: true }, targetBtn));
    return;
  }
  
  const u = new SpeechSynthesisUtterance(speechText);
  const lang = options.lang || "en-US";
  u.lang = lang;
  
  let defaultRate = 0.88;
  if (options.isWord) {
    defaultRate = 0.82;
  }
  u.rate = options.rate !== undefined ? options.rate : defaultRate;
  u.pitch = options.pitch !== undefined ? options.pitch : 1.0;
  u.volume = options.volume !== undefined ? options.volume : 1.0;
  
  const voice = getBestEnglishVoice();
  if (voice) {
    u.voice = voice;
  }
  
  u.onstart = () => {
    if (targetBtn) {
      targetBtn.classList.remove('loading');
      targetBtn.classList.add('playing');
    }
    if (options.onstart) options.onstart();
  };
  
  const cleanup = () => {
    if (targetBtn) {
      targetBtn.classList.remove('playing', 'loading');
      if (activeSpeechButton === targetBtn) activeSpeechButton = null;
    }
  };
  
  u.onend = () => {
    cleanup();
    if (options.onend) options.onend();
  };
  
  u.onerror = (err) => {
    cleanup();
    if (options.onerror) options.onerror(err);
  };
  
  activeUtterance = u;
  speechSynthesis.speak(u);
}

function speak(text, rate=0.9, onend, lang="en-US") {
  if (lang.startsWith("vi")) {
    stopCurrentSpeech();
    if (!text) {
      if (onend) onend();
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    const v = voicesCache.find(v => v.lang?.startsWith("vi"));
    if (v) u.voice = v;
    u.onend = onend;
    activeUtterance = u;
    speechSynthesis.speak(u);
  } else {
    let speakRate;
    const isWord = !text.trim().includes(" ") || text.length < 15;
    if (rate <= 0.7) {
      speakRate = rate;
    } else {
      speakRate = isWord ? 0.82 : 0.88;
    }
    speakEnglish(text, {
      rate: speakRate,
      lang: lang,
      onend: onend,
      isWord: isWord
    });
  }
}

function speakById(id, rate) {
  speak(TXT_REG[id], rate);
}

function playCorrect(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    [[880,0],[1100,0.15]].forEach(([freq,delay])=>{
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = freq; o.type = "sine";
      const t = ctx.currentTime + delay;
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.22,t+0.02);
      g.gain.exponentialRampToValueAtTime(0.001,t+0.28);
      o.start(t); o.stop(t+0.28);
    });
  } catch(e){}
}

function playWrong(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 200; o.type = "sawtooth";
    g.gain.setValueAtTime(0.18, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.45);
    o.start(); o.stop(ctx.currentTime+0.45);
  } catch(e){}
}

// ============== Speech Recognition ==============
let recognition = null;
let recordingFor = null;

function setupRecognition(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR) return null;
  const r = new SR();
  r.lang = "en-US";
  r.continuous = false;
  r.interimResults = false;
  r.maxAlternatives = 3;
  return r;
}

function recordSpeak(idx, target){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){
    toast("Trình duyệt không hỗ trợ. Hãy dùng Chrome/Edge.","error");
    return;
  }
  if(!recognition) recognition = setupRecognition();

  const btn = document.getElementById(`mic-${idx}`);
  const res = document.getElementById(`speakRes-${idx}`);
  if(recordingFor!==null){ recognition.stop(); return; }
  btn.classList.add("recording");
  recordingFor = idx;
  res.style.display="block";
  res.textContent = "🎤 Đang nghe... hãy nói: " + target;
  res.className = "dlg-result";

  recognition.onresult = (e)=>{
    const said = (e.results[0][0].transcript||"").trim();
    const score = similarity(normalizeText(said), normalizeText(target));
    const pct = Math.round(score*100);
    res.textContent = `Bạn nói: "${said}" — Độ chính xác: ${pct}%`;
    res.className = "dlg-result " + (pct>=70?"ok":"bad");
    btn.classList.remove("recording");
    recordingFor = null;
  };
  recognition.onerror = (e)=>{
    res.textContent = "Lỗi: " + (e.error||"không rõ");
    res.className = "dlg-result bad";
    btn.classList.remove("recording");
    recordingFor = null;
  };
  recognition.onend = ()=>{
    btn.classList.remove("recording");
    recordingFor = null;
  };
  try{ recognition.start(); }
  catch(err){ btn.classList.remove("recording"); recordingFor=null; }
}

function normalizeText(s){
  return (s||"").toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
}
function similarity(a,b){
  if(!a || !b) return 0;
  if(a===b) return 1;
  const wa = a.split(" "), wb = b.split(" ");
  let hit = 0;
  wa.forEach(w=>{ if(wb.includes(w)) hit++; });
  const wordScore = hit / Math.max(wa.length, wb.length);
  const dist = lev(a,b), maxLen = Math.max(a.length,b.length);
  const charScore = 1 - dist/maxLen;
  return wordScore*0.6 + charScore*0.4;
}
function lev(a,b){
  const m=a.length,n=b.length;
  if(!m) return n; if(!n) return m;
  const dp = Array.from({length:m+1},()=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++)
    for(let j=1;j<=n;j++)
      dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

// ============== UTILS ==============
function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function toast(msg, kind){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "toast show" + (kind?(" "+kind):"");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>{ t.className="toast"; }, 2400);
}

// Expose to window for onclick handlers (ES module scope fix)
Object.assign(window, {
  goHome, showProgress, resetProgress,
  refreshAuthNavbar,
  openLesson, getNextLessonId,
  prevSection, nextSection, prevLesson, nextLesson, jumpTo,
  finishReview, pickMatch,
  checkLP, checkListen, checkAllDict, checkWriting, checkMt, checkMtWrite,
  answerSprint, toggleHw,
  speak, speakById, recordById, playFullDialogue, playCorrect, playWrong,
  getBestEnglishVoice, speakEnglish, normalizeSpeechText, stopCurrentSpeech,
  // Game interactive functions
  initQuizBomb, _pickQB,
  initThisOrThat, _pickTOT, _checkTOTBonus,
  _psAutoPlay, _flipMBItem,
  initListenQuiz, _showLQQ, _checkLQQ, _showLPCustom,
  loadNextDictBatch,
  LESSONS, STATE,
});
