export function renderLessonCard(lesson){
  return `
    <button class="lcard" onclick="openLesson(${lesson.id})">
      <div class="lcard-head">
        <div class="lcard-num">${String(lesson.id).padStart(2, "0")}</div>
        <span class="lcard-unit">${lesson.unit}</span>
      </div>
      <h3 class="lcard-title">${lesson.title}</h3>
      <p class="lcard-sub">${lesson.subtitle || ""}</p>
    </button>
  `;
}
