#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { LESSONS } from "../src/features/lessons/lessonRegistry.js";
import { COURSE_TOTAL_LESSONS, TUWI_34_CURRICULUM_MAP } from "../src/features/curriculum/curriculumMap.js";

let failed = false;

const expectedTotal = 34;
const validStatuses = new Set(["ready", "partial", "draft", "empty", "reused", "merged"]);
const seenIds = new Set();
const seenSlugs = new Set();

check(LESSONS.length === expectedTotal, `Expected ${expectedTotal} lessons in registry, found ${LESSONS.length}.`);
check(TUWI_34_CURRICULUM_MAP.length === expectedTotal, `Expected ${expectedTotal} curriculum entries, found ${TUWI_34_CURRICULUM_MAP.length}.`);
check(COURSE_TOTAL_LESSONS === expectedTotal, `COURSE_TOTAL_LESSONS must be ${expectedTotal}.`);

for (const lesson of LESSONS) {
  const { id, title, slug, topicEnglish, topicVietnamese, status } = lesson;
  check(Number.isInteger(id), "Lesson has invalid id.");
  check(id >= 1 && id <= expectedTotal, `Lesson id ${id} is outside 1-${expectedTotal}.`);
  check(!seenIds.has(id), `Duplicate lesson id ${id}.`);
  seenIds.add(id);

  check(Boolean(title), `Lesson ${id} is missing title.`);
  check(Boolean(topicEnglish), `Lesson ${id} is missing topicEnglish.`);
  check(Boolean(topicVietnamese), `Lesson ${id} is missing topicVietnamese.`);
  check(Boolean(slug), `Lesson ${id} is missing slug.`);
  if(slug){
    check(!seenSlugs.has(slug), `Duplicate slug "${slug}" at lesson ${id}.`);
    seenSlugs.add(slug);
  }

  const statusString = typeof status === "object" ? status.content : status;
  check(validStatuses.has(statusString), `Lesson ${id} has invalid status "${statusString}".`);
  check(Array.isArray(lesson.sectionFlow) && lesson.sectionFlow.length > 0, `Lesson ${id} has invalid sectionFlow.`);
  check(Array.isArray(lesson.objectives), `Lesson ${id} has invalid objectives.`);
  check(Array.isArray(lesson.vocabulary), `Lesson ${id} has invalid vocabulary.`);
  check(Array.isArray(lesson.minitest), `Lesson ${id} has invalid minitest.`);
  check(Array.isArray(lesson.homework), `Lesson ${id} has invalid homework.`);
}

for (let id = 1; id <= expectedTotal; id += 1) {
  check(seenIds.has(id), `Missing lesson id ${id}.`);
}

const expectedTitles = new Map([
  [2, "Buổi 2: Nguyên âm đơn 1"],
  [3, "Buổi 3: Nguyên âm đơn 2"],
  [4, "BUỔI 4: Long Vowels - Nguyên âm dài"],
  [5, "Fricatives – Âm gió / âm ma sát"],
  [6, "BUỔI 6: Consonants 1 – Phụ âm bật, âm mũi, âm cuối"],
  [7, "BUỔI 7: Consonants 2 – Phụ âm gió & Âm khó"],
  [8, "IPA Review + Word Stress – Tổng ôn IPA và trọng âm"],
]);

for (const [id, title] of expectedTitles) {
  const lesson = lessonById(id);
  check(lesson?.module === "ipa-bootcamp", `Lesson ${id} must be in IPA Bootcamp.`);
  check(lesson?.title === title, `Lesson ${id} title mismatch.`);
  check(lesson?.metadata?.localContentAuthoritative === true, `Lesson ${id} must use local authoritative IPA data.`);
}

const lesson01 = lessonById(1);
check(lesson01?.title === "Buổi 1: Bảng chữ cái A–Z", "Lesson 1 must use the Vietnamese Alphabet A–Z title.");
check(lesson01?.track === "alphabet-foundation", "Lesson 1 must use the dedicated Alphabet Foundation renderer.");
check(lesson01?.metadata?.localContentAuthoritative === true, "Lesson 1 local Alphabet content must override stale Supabase content.");
check(lesson01?.sectionFlow?.length === 17, "Lesson 1 Alphabet sidebar must have exactly 17 sections.");
check(lesson01?.sectionFlow?.every((section) => section.startsWith("alphabet_")), "Lesson 1 must use dedicated alphabet sections.");
check(
  arrayEquals(lesson01?.sectionFlow?.slice(-2), ["alphabet_homework", "alphabet_summary"]),
  "Lesson 1 must end with homework and summary sections."
);
check(
  ["alphabet_case_match", "alphabet_icon_match", "alphabet_spell_words", "alphabet_build_word", "alphabet_teacher_challenge", "alphabet_starfall"]
    .every((section) => !lesson01?.sectionFlow?.includes(section)),
  "Lesson 1 flow must not contain the six removed games."
);
check(lesson01?.alphabetFoundation?.letters?.length === 26, "Lesson 1 must have 26 alphabet letter cards.");
check(
  lesson01?.alphabetFoundation?.letters?.every((item) => item.pronunciation && item.reading && item.meaning && item.group),
  "Lesson 1 letter cards must include pronunciation, reading text, meaning, and group."
);
check(
  arrayEquals(
    ["A-G", "H-N", "O-U", "V-Z"].map((group) => lesson01?.alphabetFoundation?.letters?.filter((item) => item.group === group).length),
    [7, 7, 7, 5]
  ),
  "Lesson 1 grouped letter cards must preserve the 7/7/7/5 group sizes."
);
check(lesson01?.alphabetFoundation?.groupAG?.length === 7, "Lesson 1 A-G group must have 7 interactive letter items.");
check(
  arrayEquals(lesson01?.alphabetFoundation?.groupAG?.map((item) => item.uppercase), ["A", "B", "C", "D", "E", "F", "G"]),
  "Lesson 1 A-G group must preserve the exact A through G sequence."
);
check(
  lesson01?.alphabetFoundation?.groupAG?.every((item) => item.uppercase && item.lowercase && item.word && item.icon && item.chant),
  "Lesson 1 A-G interactive items must include uppercase, lowercase, word, icon, and chant."
);
const alphabetLetterGroups = lesson01?.alphabetFoundation?.letterGroups || {};
const expectedAlphabetLetterGroups = [
  ["alphabet_group_ag", "Nhóm chữ A–G", "Hoàn thành nhóm chữ A–G!", 7, "A", "G"],
  ["alphabet_group_hn", "Nhóm chữ H–N", "Hoàn thành nhóm chữ H–N!", 7, "H", "N"],
  ["alphabet_group_ou", "Nhóm chữ O–U", "Hoàn thành nhóm chữ O–U!", 7, "O", "U"],
  ["alphabet_group_vz", "Nhóm chữ V–Z", "Hoàn thành nhóm chữ V–Z!", 5, "V", "Z"],
];
for (const [key, groupTitle, completedMessage, length, first, last] of expectedAlphabetLetterGroups) {
  const group = alphabetLetterGroups[key];
  check(group?.groupTitle === groupTitle, `Lesson 1 ${groupTitle} must include its groupTitle.`);
  check(group?.completedMessage === completedMessage, `Lesson 1 ${groupTitle} must include its completed message.`);
  check(group?.letters?.length === length, `Lesson 1 ${groupTitle} must have ${length} interactive letter items.`);
  check(group?.letters?.[0]?.uppercase === first && group?.letters?.[length - 1]?.uppercase === last, `Lesson 1 ${groupTitle} letter range mismatch.`);
  check(
    group?.letters?.every((item) => item.uppercase && item.lowercase && item.word && item.icon && item.chant),
    `Lesson 1 ${groupTitle} items must include uppercase, lowercase, word, icon, and chant.`
  );
}
check(lesson01?.alphabetFoundation?.vowels?.length === 5, "Lesson 1 must have 5 vowel cards.");
check(lesson01?.alphabetFoundation?.listenChoose?.length === 26, "Lesson 1 listen-and-choose game must cover A-Z.");
check(lesson01?.alphabetFoundation?.practiceWords?.length === 26, "Lesson 1 single-question word games must have 26 practice words.");
check(lesson01?.alphabetFoundation?.homework?.skills?.length === 4, "Lesson 1 homework must cover four skills.");
check(
  arrayEquals(lesson01?.alphabetFoundation?.homework?.skills?.map((skill) => skill.title), ["Nghe", "Nói", "Đọc", "Viết"]),
  "Lesson 1 homework skill titles must be Nghe, Nói, Đọc, Viết."
);
check(
  arrayEquals(lesson01?.alphabetFoundation?.summary?.vowels, ["A", "E", "I", "O", "U"]),
  "Lesson 1 summary must show the five vowels A E I O U."
);
check(arrayEquals(Object.values(lesson01?.sectionLabels || {}), [
  "Video bài hát bảng chữ cái",
  "Nhóm chữ A–G",
  "Nhóm chữ H–N",
  "Nhóm chữ O–U",
  "Nhóm chữ V–Z",
  "Thẻ học chữ cái",
  "Nguyên âm A E I O U",
  "Nghe và chọn chữ",
  "Nhìn hình đoán chữ",
  "Điền chữ còn thiếu",
  "Đọc nhanh chữ cái",
  "Đánh vần tên của em",
  "Tách chữ trong từ",
  "Nhìn biểu tượng đọc từ",
  "Video thư giãn cuối buổi",
  "Bài tập về nhà",
  "Tổng kết buổi học",
]), "Lesson 1 sidebar labels must match the requested Vietnamese labels.");

const mainSource = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");
const pronunciationMediaSource = readFileSync(
  new URL("../src/data/pronunciationMedia.js", import.meta.url),
  "utf8"
);
const alphabetRenderer = mainSource.slice(
  mainSource.indexOf("function renderAlphabetSection"),
  mainSource.indexOf("function renderSpellingSection")
);
const alphabetGroupRenderer = mainSource.slice(
  mainSource.indexOf("function renderAlphabetLetterGroup"),
  mainSource.indexOf("function _alphabetReadEach")
);
const alphabetAgFlowRenderer = mainSource.slice(
  mainSource.indexOf("function _alphabetAgStart"),
  mainSource.indexOf("function _alphabetReadEach")
);
const forbiddenAlphabetUi = [
  "Letter Cards",
  "Vowel Letters",
  "Listen & Choose",
  "Uppercase / Lowercase",
  "Letter + Icon",
  "Missing Letter",
  "Spell My Name",
  "Spell Simple Words",
  "Starfall Game",
  "Chill Time",
  "Play letter",
  "Play word",
  "Repeat",
  "Open Alphabet Game",
  "Upload alphabet",
  "Introduction",
  "Grammar",
  "Translation",
];
check(
  forbiddenAlphabetUi.every((label) => !alphabetRenderer.includes(label)),
  "Lesson 1 renderer must not contain forbidden English UI labels."
);
check([
  "Nghe lại",
  "Kiểm tra",
  "Câu tiếp theo",
  "Em đã đọc",
  "Hiện đáp án",
  "Chơi lại",
  "Chọn lại nhé",
  "Tạo chữ cái",
  "Từ tiếp theo",
].every((label) => alphabetRenderer.includes(label)), "Lesson 1 renderer must contain the requested Vietnamese controls.");
const alphabetFlashcardRenderer = mainSource.slice(
  mainSource.indexOf("function renderAlphabetFlashcardSection"),
  mainSource.indexOf("function shuffleAlphabetItems")
);
check([
  "Chọn nhóm chữ, bấm vào thẻ để xem từ vựng.",
  "A-G",
  "H-N",
  "O-U",
  "V-Z",
  "Xem lại chữ",
  "_alphabetSelectCardGroup",
  "_alphabetOpenFlashcard",
  "_alphabetFlashcardSpeak",
].every((label) => alphabetFlashcardRenderer.includes(label)), "Lesson 1 flashcards must contain grouped flip-card controls.");
check(
  ["Nghe chữ cái", "Nghe từ vựng", "Đọc theo", ">Nghe lại</button>"].every((label) => !alphabetFlashcardRenderer.includes(label)),
  "Lesson 1 flashcards must not contain the removed long-form speech buttons."
);
check(
  alphabetFlashcardRenderer.includes("alphabetFlashcardState.openLetters.clear()")
    && alphabetFlashcardRenderer.includes("speakEnglish(TXT_REG[wordSpeechId], { isWord: true })"),
  "Lesson 1 flashcards must reset open cards on group change and use shared English speech."
);
check([
  "Bắt đầu học",
  "Hiện chữ thường",
  "Hiện biểu tượng",
  "Từ tiếp theo",
  "Học lại",
  "Giỏi lắm!",
].every((label) => alphabetGroupRenderer.includes(label)), "Lesson 1 Alphabet group activity must contain all requested Vietnamese controls.");
check(
  alphabetAgFlowRenderer.includes('class="alphabet-ag-speaker"')
    && alphabetAgFlowRenderer.includes('aria-label="Nghe lại"')
    && alphabetAgFlowRenderer.includes('title="Nghe lại"')
    && !alphabetAgFlowRenderer.includes('>Nghe lại</button>'),
  "Lesson 1 Alphabet group speaker must use an accessible icon without visible replay text."
);
check(
  alphabetAgFlowRenderer.includes('onclick="_alphabetAgSpeakLetter(this)"')
    && alphabetAgFlowRenderer.includes('aria-label="Nghe chữ ${escAttr(item.uppercase)}"')
    && alphabetAgFlowRenderer.includes("_alphabetAgSpeakWord"),
  "Lesson 1 Alphabet group uppercase, lowercase, icon, and word controls must be directly clickable for pronunciation."
);
check(
  alphabetAgFlowRenderer.includes("speakEnglish(text")
    && alphabetAgFlowRenderer.includes('rate: 0.86')
    && alphabetAgFlowRenderer.includes('lang: "en-US"'),
  "Lesson 1 Alphabet group speech must use the shared English speech helper."
);
check(
  !alphabetAgFlowRenderer.includes('alphabetAgSpeak("Good job!"'),
  "Lesson 1 Alphabet group completion must not speak the English praise phrase."
);
check(
  alphabetRenderer.includes("function renderAlphabetSingleGameShell")
    && alphabetRenderer.includes("function playEnglishAudio")
    && alphabetRenderer.includes("stopCurrentSpeech()"),
  "Lesson 1 games must use the shared single-question shell and cancel old audio before playback."
);
check([
  "\"idle\"",
  "\"uppercase\"",
  "\"lowercase\"",
  "\"icon\"",
  "\"completedLetter\"",
  "\"completedGroup\"",
].every((state) => alphabetGroupRenderer.includes(state)), "Lesson 1 Alphabet group activity must preserve its learning states.");

const lesson02 = lessonById(2);
check(lesson02?.slug === "nguyen-am-don-1", "Lesson 2 must route to Monophthongs 1.");
check(
  pronunciationMediaSource.includes('["i-long", "/iː/"]')
    && pronunciationMediaSource.includes("mouth-position.png")
    && pronunciationMediaSource.includes("guide-video.mp4")
    && !pronunciationMediaSource.includes("/words/"),
  "Lesson 2 pronunciation media must configure mouth and guide files without per-word images."
);
const lesson02SingleSounds = new Map(
  (lesson02?.vowelLesson?.wordGroups || []).map((group) => [group.symbol, group])
);
[
  ["/iː/", "i-long", "long_i", "Âm dài /iː/", 5],
  ["/ɪ/", "i-short", "short_i", "Âm ngắn /ɪ/", 5],
  ["/e/", "e", "e", "Âm /e/", 5],
  ["/æ/", "ae", "ae", "Âm /æ/", 5],
  ["/ə/", "schwa", "schwa", "Âm /ə/", 4],
  ["/ʌ/", "uh", "uh", "Âm /ʌ/", 5],
].forEach(([symbol, sectionKey, practiceKey, title, wordCount]) => {
  const group = lesson02SingleSounds.get(symbol);
  check(group?.sectionKey === sectionKey, `Lesson 2 ${symbol} must configure its pronunciation media key.`);
  check(group?.practiceKey === practiceKey, `Lesson 2 ${symbol} must configure a stable practice key.`);
  check(group?.title === title, `Lesson 2 ${symbol} must expose the single-sound section title.`);
  check(group?.words?.length === wordCount, `Lesson 2 ${symbol} must include exactly ${wordCount} practice words.`);
});
check(
  mainSource.includes("function renderVowel2SingleSoundLesson")
    && mainSource.includes("function renderSoundWordPracticeCard")
    && mainSource.includes("Từ ${wordIndex + 1}/${group.words.length}")
    && mainSource.includes("Xem video hướng dẫn"),
  "Lesson 2 individual vowels must render through the shared single-sound practice template."
);
check(
  mainSource.includes('<span>${escAttr(word.icon)}</span>')
    && mainSource.includes("regTxt(word.word)"),
  "Lesson 2 individual vowels must keep word icons and sound/word audio controls."
);
check(
  mainSource.includes("function renderPronunciationMouthImage")
    && mainSource.includes("function renderPronunciationGuideVideo")
    && mainSource.includes("_vowel2SpeakSound")
    && !mainSource.includes("vowel2LongIState"),
  "Lesson 2 single-sound renderer must use shared media fallback helpers and no /i:/ special state."
);
check(lesson02?.track === "single-vowels-1", "Lesson 2 must use the dedicated single-vowels renderer.");
check(lesson02?.sectionFlow?.length === 15, "Lesson 2 sidebar must have exactly 15 grouped sections.");
check(lesson02?.sectionFlow?.every((section) => section.startsWith("vowel2_")), "Lesson 2 must use dedicated vowel2 sections.");
check(lesson02?.vowelLesson?.sounds?.length === 6, "Lesson 2 must include 6 monophthongs.");
check(lesson02?.vowelLesson?.wordGroups?.length === 6, "Lesson 2 must include 6 vocabulary groups.");
check(lesson02?.vowelLesson?.minimalPairs?.length === 6, "Lesson 2 must include 6 minimal pairs.");
const lesson02Comparisons = lesson02?.vowelLesson?.comparisons || {};
[
  ["vowel2_compare_i", "/ɪ/", "/iː/", ["ship/sheep", "sit/seat", "fit/feet", "bit/beat", "live/leave"]],
  ["vowel2_compare_e_ae", "/e/", "/æ/", ["bed/bad", "pen/pan", "men/man", "ten/tan", "pet/pat"]],
  ["vowel2_compare_schwa_caret", "/ə/", "/ʌ/", ["about/cup", "sofa/sun", "banana/bus", "teacher/mother", "away/up"]],
].forEach(([section, leftSound, rightSound, expectedPairs]) => {
  const comparison = lesson02Comparisons[section];
  check(comparison?.leftSound === leftSound, `Lesson 2 ${section} must configure leftSound ${leftSound}.`);
  check(comparison?.rightSound === rightSound, `Lesson 2 ${section} must configure rightSound ${rightSound}.`);
  check(comparison?.pairs?.length === 5, `Lesson 2 ${section} must include exactly 5 comparison pairs.`);
  check(
    arrayEquals(comparison?.pairs?.map((pair) => `${pair.left.word}/${pair.right.word}`), expectedPairs),
    `Lesson 2 ${section} must preserve the requested comparison pair order.`
  );
  check(
    comparison?.pairs?.every((pair) => [pair.left, pair.right].every((item) => (
      item?.word && item?.ipa && item?.meaning && item?.highlight && item?.sound && item?.icon
    ))),
    `Lesson 2 ${section} comparison pairs must include all word fields.`
  );
  check(
    comparison?.pairs?.every((pair) => pair.left.sound === leftSound && pair.right.sound === rightSound),
    `Lesson 2 ${section} pair sounds must match the slide sounds.`
  );
});
check(lesson02?.vowelLesson?.sentences?.length === 8, "Lesson 2 must include 8 reading sentences.");
check(lesson02?.vowelLesson?.listenGame?.length === 10, "Lesson 2 listening game must include 10 rounds.");
check(lesson02?.minitest?.length === 10, "Lesson 2 must include the complete 10-question mini test.");
check(
  mainSource.includes("function renderVowel2Section") && mainSource.includes("function renderVowel2MouthSvg"),
  "Lesson 2 must include its grouped renderer and SVG mouth diagrams."
);

const lesson06 = lessonById(6);
check(lesson06?.sectionFlow?.length === 16, "Lesson 6 sidebar must have the 16 requested sections.");
check(lesson06?.consonants?.sounds?.length === 9, "Lesson 6 must have 9 consonant sound cards.");
check(
  lesson06?.consonants?.sounds?.every((sound) => ["lips", "tongue", "teeth", "air", "voice"].every((key) => Boolean(sound[key]))),
  "Lesson 6 sound cards must include lips, tongue, teeth, air, and voice guidance."
);
check(lesson06?.consonants?.sounds?.find((sound) => sound.symbol === "/ŋ/")?.fixTip?.includes("Không thêm /g/"), "Lesson 6 /ŋ/ card must warn learners not to add /g/.");

const lesson03 = lessonById(3);
const lesson03RequiredPairs = ["hot - horse", "cot - caught", "full - fool", "pull - pool", "good - food", "bed - bird", "cup - car"];
check(lesson03?.track === "single-vowels-2", "Lesson 3 must use the Monophthongs 2 track.");
check(lesson03?.sectionFlow?.length === 15, "Lesson 3 Monophthongs 2 sidebar must have exactly 15 sections.");
check(lesson03?.sectionLabels && lesson03.sectionFlow.every((section) => Boolean(lesson03.sectionLabels[section])), "Lesson 3 must label all 15 sidebar sections.");
check(lesson03?.ipa?.sounds?.length === 6, "Lesson 3 Monophthongs 2 must have 6 sound cards.");
check(lesson03?.ipa?.sounds?.every((sound) => ["lips", "tongue", "teeth", "air", "voice"].every((key) => Boolean(sound.mouth?.[key]))), "Lesson 3 sound cards must include mouth guidance.");
check(JSON.stringify(lesson03?.vowelLesson?.sounds) === JSON.stringify(["/ɑː/", "/ɒ/", "/ɔː/", "/ʊ/", "/uː/", "/ɜː/"]), "Lesson 3 must teach /ɑː/ /ɒ/ /ɔː/ /ʊ/ /uː/ /ɜː/.");
check(lesson03?.vowelLesson?.wordGroups?.length === 6, "Lesson 3 must have 6 vowel word groups.");
check(lesson03?.vowelLesson?.wordGroups?.find((group) => group.symbol === "/ɜː/")?.words?.every((word) => word.word !== "teacher"), "Lesson 3 must not use teacher as a main /ɜː/ example.");
check(lesson03?.vowelLesson?.listenGame?.length === 7, "Lesson 3 listening game must include the 7 required minimal-pair rounds.");
check(lesson03?.vowelLesson?.recordingWords?.length >= 10, "Lesson 3 recording practice must include at least 10 words.");
check(lesson03?.minitest?.length === 10, "Lesson 3 must include the complete 10-question mini test.");
check(lesson03RequiredPairs.every((pair) => lesson03?.vowelLesson?.homeworkRich?.requiredPairs?.includes(pair)), "Lesson 3 homework must include all 7 required confusing pairs.");
check(lesson03?.homework?.length >= 5, "Lesson 3 homework must cover listening, speaking, reading, and writing tasks.");

const lesson08 = lessonById(8);
check(lesson08?.sectionFlow?.length === 18, "Lesson 8 IPA review sidebar must have exactly 18 sections.");
check(lesson08?.sectionFlow?.every((section) => section.startsWith("review8_")), "Lesson 8 must use its dedicated review section flow.");
check(lesson08?.shortVowels?.length === 6, "Lesson 8 must review 6 short vowels.");
check(lesson08?.longVowels?.length === 5, "Lesson 8 must review 5 long vowels.");
check(lesson08?.diphthongs?.length === 8, "Lesson 8 must review 8 diphthongs.");
check(new Set([
  ...(lesson08?.shortVowels || []).map((item) => item.symbol),
  ...(lesson08?.longVowels || []).map((item) => item.symbol),
  ...(lesson08?.diphthongs || []).map((item) => item.symbol),
  lesson08?.schwa?.symbol,
  ...(lesson08?.consonants?.stops || []),
  ...(lesson08?.consonants?.nasals || []),
  ...(lesson08?.consonants?.fricatives || []),
].filter(Boolean)).size === 44, "Lesson 8 must include the complete 44-sound IPA map.");
check(lesson08?.wordStress?.examples?.length === 6, "Lesson 8 must include 6 word-stress examples.");
check(Object.values(lesson08?.practiceWords || {}).flatMap((group) => group.words || []).length >= 50, "Lesson 8 must include at least 50 practice words.");
check(lesson08?.practiceSentences?.length === 20, "Lesson 8 must include 20 practice sentences.");
check(lesson08?.finalRecording?.words?.length === 10, "Lesson 8 final recording must include 10 words.");
check(lesson08?.finalRecording?.sentences?.length === 5, "Lesson 8 final recording must include 5 sentences.");
check(lesson08?.minitest?.length >= 13, "Lesson 8 final mini test must include all supplied quiz questions.");
check(lesson08?.mindmap?.branches?.length >= 8, "Lesson 8 must include the complete module mindmap.");
check(lesson08?.homeworkRich?.tasks?.length >= 4, "Lesson 8 must include post-module homework and self-assessment.");

const lesson07 = lessonById(7);
check(lesson07?.slug === "consonants-2-am-gio-va-am-kho-voi-nguoi-viet", "Lesson 7 must route to Consonants 2.");
check(lesson07?.sectionFlow?.length === 18, "Lesson 7 must preserve the 18 requested Consonants 2 sections.");
check(lesson07?.ipa?.sounds?.length === 15, "Lesson 7 must expose all 15 difficult consonant sounds.");
check(lesson07?.ipa?.comparisons?.length === 7, "Lesson 7 must expose all 7 requested consonant comparisons.");

check(lesson01?.slug === "alphabet-and-nouns", "Lesson 1 must route to the Alphabet A–Z lesson.");
check(lessonById(9)?.slug === "singular-plural-nouns", "Lesson 9 must be old Lesson 2 Singular & Plural Nouns.");
check(lessonById(9)?.title.includes("SINGULAR & PLURAL NOUNS"), "Lesson 9 title must be Singular & Plural Nouns.");
check(lessonById(10)?.slug === "countable-uncountable-nouns", "Lesson 10 must be old Lesson 3 Countable/Uncountable Nouns.");
check(lessonById(11)?.slug === "personal-pronoun", "Lesson 11 must be old Lesson 4 Personal Pronouns.");
check(lessonById(15)?.slug === "capital-letter-rules", "Lesson 15 must be old Lesson 8 Capital Letter Rules.");
check(lessonById(34)?.metadata?.oldLessonId === 27, "Old Lesson 27 must be shifted to Lesson 34.");

const ids = LESSONS.map((lesson) => lesson.id);
check(new Set(ids).size === expectedTotal, "Duplicate lesson ids detected.");
check(!ids.some((id) => id > expectedTotal), `Found lesson id greater than ${expectedTotal}.`);

if (failed) {
  console.error("Validation FAILED.");
  process.exit(1);
}

console.log("Validation PASSED. 34 lessons, Alphabet Foundation, and IPA Bootcamp mapping are correct.");

function lessonById(id){
  return LESSONS.find((lesson) => lesson.id === id);
}

function check(ok, message){
  if(ok) return;
  console.error(`ERROR: ${message}`);
  failed = true;
}

function arrayEquals(a, b){
  return a.length === b.length && a.every((item, index) => item === b[index]);
}
