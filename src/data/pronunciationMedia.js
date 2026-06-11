export const PRONUNCIATION_MEDIA = [
  {
    lessonNumber: 2,
    sounds: [
      ["i-long", "/iː/"],
      ["i-short", "/ɪ/"],
      ["e", "/e/"],
      ["ae", "/æ/"],
      ["schwa", "/ə/"],
      ["uh", "/ʌ/"],
    ],
  },
  {
    lessonNumber: 3,
    sounds: [
      ["aa-long", "/ɑː/"],
      ["o-short", "/ɒ/"],
      ["aw-long", "/ɔː/"],
      ["u-short", "/ʊ/"],
      ["oo-long", "/uː/"],
      ["er-long", "/ɜː/"],
    ],
  },
].map((lesson) => ({
  ...lesson,
  sounds: lesson.sounds.map(([sectionKey, sound]) => ({
    sectionKey,
    sound,
    mouthImage: `/pronunciation/lesson-${lesson.lessonNumber}/${sectionKey}/mouth-position.png`,
    guideVideo: `/pronunciation/lesson-${lesson.lessonNumber}/${sectionKey}/guide-video.mp4`,
  })),
}));

export function getPronunciationMedia(lessonNumber, sectionKey) {
  const lesson = PRONUNCIATION_MEDIA.find((item) => item.lessonNumber === lessonNumber);
  if (!lesson) return null;
  const media = lesson.sounds.find((item) => item.sectionKey === sectionKey);
  return media ? { lessonNumber, ...media } : null;
}
