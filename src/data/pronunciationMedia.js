const lesson2Media = [
  ["i-long", "/iː/"],
  ["i-short", "/ɪ/"],
  ["e", "/e/"],
  ["ae", "/æ/"],
  ["schwa", "/ə/"],
  ["uh", "/ʌ/"],
].map(([sectionKey, sound]) => ({
  lessonNumber: 2,
  sectionKey,
  sound,
  mouthImage: `/pronunciation/lesson-2/${sectionKey}/mouth-position.png`,
  guideVideo: `/pronunciation/lesson-2/${sectionKey}/guide-video.mp4`,
}));

export const PRONUNCIATION_MEDIA = lesson2Media;

export function getPronunciationMedia(lessonNumber, sectionKey) {
  return PRONUNCIATION_MEDIA.find(
    (media) => media.lessonNumber === lessonNumber && media.sectionKey === sectionKey
  ) || null;
}
