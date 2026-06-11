export const PRONUNCIATION_MEDIA = {
  lessonNumber: 2,
  sounds: [
    ["i-long", "/iː/"],
    ["i-short", "/ɪ/"],
    ["e", "/e/"],
    ["ae", "/æ/"],
    ["schwa", "/ə/"],
    ["uh", "/ʌ/"],
  ].map(([sectionKey, sound]) => ({
    sectionKey,
    sound,
    mouthImage: `/pronunciation/lesson-2/${sectionKey}/mouth-position.png`,
    guideVideo: `/pronunciation/lesson-2/${sectionKey}/guide-video.mp4`,
  })),
};

export function getPronunciationMedia(lessonNumber, sectionKey) {
  if (PRONUNCIATION_MEDIA.lessonNumber !== lessonNumber) return null;
  const media = PRONUNCIATION_MEDIA.sounds.find((item) => item.sectionKey === sectionKey);
  return media ? { lessonNumber, ...media } : null;
}
