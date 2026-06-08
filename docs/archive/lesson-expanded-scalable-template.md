# Template mở rộng tiết kiệm token cho Buổi 10-30

Mục tiêu: các buổi còn lại dùng cùng nhịp Buổi 7 nhưng soạn content ngắn, dễ copy vào `lessons-data.js`.

## Cách dùng trong `lessons-data.js`

```js
const LESSON_N_TEMPLATE = {
  objectives: [
    "...",
    "...",
    "...",
    "..."
  ],
  review: { ... },
  video: { ... },
  vocabGroups: { introVideo: "...", dialogueVideo: "..." },
  vocabulary: [ ... ],
  grammar: { ... },
  listening: { ... },
  translation: { ... },
  dialogueVideo: { ... },
  speaking: { ... },
  minitest: [ ... ],
  mindmap: { ... },
  homeworkRich: { ... },
  homework: [ "...", "..." ]
};

applyExpandedLessonTemplate(N, LESSON_N_TEMPLATE);
```

Không cần khai báo lại `sectionFlow` hoặc `skipSections`. Helper `applyExpandedLessonTemplate` tự áp dụng 16 mục giống Buổi 7.

## Chuẩn số lượng cho mỗi buổi

| Mục | Số lượng nên soạn |
| --- | --- |
| objectives | 4 |
| review questions | 3-4 |
| video | 1 video, 1-3 scenes, 5 questions |
| vocabulary | 24-28 từ |
| grammar structures | 4 |
| commonQA | 4 cặp |
| listening.questions | 15 |
| translation.sentences | 20 |
| dialogueVideo.transcript | 6-8 dòng |
| dialogueVideo.listenChoose | 4 câu |
| dialogueVideo.listenPickLine | 4-6 câu |
| dialogueVideo.fillConversation | 3 hội thoại, mỗi hội thoại 4 chỗ trống |
| speaking.turns | 5 |
| minitest | 10 |
| mindmap.branches | 5 |
| homeworkRich.tasks | 2 |

## Khung content ngắn nhất nên gửi cho Codex

```md
# Buổi N: [Title VI]
- Unit:
- Subtitle:
- Topic:
- Grammar focus:
- Video chính:
- Video hội thoại:

## Objectives
1.
2.
3.
4.

## Review
Q/A x4:

## Vocab
24-28 rows: EN | VI | emoji

## Grammar
4 structures:
1. pattern | vi | style | example | exampleVi | context
2.
3.
4.

Common Q&A x4:

## Listening
15 câu: q | options | answerIndex

## Translation
20 câu: VI | EN

## Dialogue video
Transcript 6-8 dòng A/B:
Listen choose x4:
Listen pick line x4:
Fill conversation x3:

## Speaking AI
5 turns: teacher EN/VI | formula | sample EN/VI

## Minitest
10 câu: 5 grammar, 2 vocab, 3 translation/writing

## Mindmap
Center:
5 branches: icon | label | sub | items

## Homework
Task 1:
Task 2:
```

## Defaults cố định

- Section flow luôn là: intro, review, video, vocab, vocab_match, listen_pick, grammar, listen_quiz, translate, dialogue_video, dialogue_video_quiz, dialogue_video_order, speaking, minitest, mindmap, homework.
- Bỏ mặc định các section: writing, story, dictation.
- YouTube: dùng URL đầy đủ; app sẽ nhúng iframe trước, chỉ hiện fallback khi video lỗi hoặc thiếu ID.
- Nếu một buổi chưa có MD đầy đủ, ưu tiên giữ đúng số lượng mục trước; câu chữ có thể thay sau mà không đổi cấu trúc.
