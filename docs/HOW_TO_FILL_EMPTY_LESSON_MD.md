# HƯỚNG DẪN NHẬP NỘI DUNG CHI TIẾT CHO 8 BUỔI DRAFT (MARKDOWN)

Tài liệu này hướng dẫn cách chuẩn bị file nội dung Markdown (`.md`) cho 8 buổi học đang ở trạng thái `draft` trong hệ thống 27 buổi mới. Khi có file `.md` đúng chuẩn, giáo viên hoặc lập trình viên có thể dùng script import để đưa vào database tự động mà không cần can thiệp code tay phức tạp.

## 1. Danh sách 8 buổi đang cần bổ sung nội dung

Chuẩn bị đúng tên file Markdown tương ứng:

1. **Buổi 1**: `docs/lesson-01-alphabet-and-nouns.md` (Alphabet and Nouns — Bảng chữ cái và Danh từ)
2. **Buổi 2**: `docs/lesson-02-singular-plural-nouns.md` (TOPIC2: Singular & Plural Nouns — Danh từ số ít - Danh từ số nhiều)
3. **Buổi 4**: `docs/lesson-04-personal-pronouns.md` (Personal pronoun — Đại từ nhân xưng)
4. **Buổi 8**: `docs/lesson-08-capital-letter-rules.md` (Capital letter rules — Nguyên tắc viết hoa)
5. **Buổi 11**: `docs/lesson-11-prepositions-of-time.md` (Preposition of Time — Giới từ thời gian)
6. **Buổi 23**: `docs/lesson-23-numbers-and-time.md` (Numbers and Time in English — Số thứ tự, số đếm, ngày, tháng)
7. **Buổi 25**: `docs/lesson-25-past-continuous.md` (Past Continuous Tense — Quá khứ tiếp diễn)
8. **Buổi 26**: `docs/lesson-26-tag-questions.md` (Tag questions — Câu hỏi đuôi)

---

## 2. Định dạng cấu trúc một file Markdown chuẩn (Buổi 8/9 Template)

Cấu trúc file `.md` cần bao gồm phần Meta đầu trang và các tiêu đề cấp 2 (`##`) tương ứng với 16 mục học tập của FClass.

### Mẫu File Markdown Trống chuẩn:

```markdown
# Buổi N: [Tiêu đề tiếng Việt]

## Meta
- ID: N
- Unit: Tuwi X
- Title VI: [Tiêu đề tiếng Việt]
- Title EN: [Tiêu đề tiếng Anh]
- Topic: [Chủ đề tiếng Anh]
- Grammar focus: [Trọng tâm ngữ pháp]

## Mục tiêu bài học
1. Mục tiêu 1
2. Mục tiêu 2
3. Mục tiêu 3

## Ôn bài cũ
- Title: Ôn tập Buổi N-1
- Intro: Ôn lại từ vựng và ngữ pháp trước khi vào bài mới.

### Game 1: Nghe chọn từ
| EN | VI | Emoji |
| --- | --- | --- |
| word_en | nghĩa_vi | 📝 |

### Game 2: Quiz Bomb
| Question | A | B | C | D | Answer | Explanation |
| --- | --- | --- | --- | --- | --- | --- |
| Câu hỏi ôn tập? | Lựa chọn A | Lựa chọn B | Lựa chọn C | Lựa chọn D | B | Giải thích tại sao chọn B |

## Video giới thiệu
- Title: Tiêu đề video bài học
- Channel: YouTube
- Duration: 3 phút
- URL: https://www.youtube.com/watch?v=XXXXXX (Link video đầy đủ)
- Description: Mô tả ngắn về nội dung video.

### Cảnh chính trong video
- Scene 1: Mô tả cảnh 1
- Scene 2: Mô tả cảnh 2

### Câu hỏi xem video
| Question | A | B | C | D | Answer | Explanation |
| --- | --- | --- | --- | --- | --- | --- |
| Câu hỏi video 1? | Lựa chọn A | Lựa chọn B | Lựa chọn C | Lựa chọn D | A | Giải thích |

## Từ vựng
| EN | VI | Emoji | IPA | Example | Group |
| --- | --- | --- | --- | --- | --- |
| apple | quả táo | 🍎 | /ˈæp.əl/ | I eat an apple. | mainVocabulary |
| thank you | cảm ơn | 🙏 | /ˈθæŋk.juː/ | Thank you very much. | lessonPhrases |

## Ngữ pháp
- Title: Trọng tâm ngữ pháp
- Intro: Giải thích ngữ pháp bằng tiếng Việt đơn giản, trực quan.

### Cấu trúc câu
| Pattern | Meaning | Explanation | Example | Example VI | Context | Mistake |
| --- | --- | --- | --- | --- | --- | --- |
| S + to be + adj | Chủ ngữ đi với to be và tính từ | Dùng để miêu tả trạng thái | She is happy. | Cô ấy hạnh phúc. | Mô tả cảm xúc | She is happily. |

### Câu hỏi phổ biến (Common Q&A)
- Hỏi: Question English? -> Trả lời: Answer English.

## Nghe trả lời
| Question | A | B | C | D | Answer | Audio |
| --- | --- | --- | --- | --- | --- | --- |
| Audio question? | Opt A | Opt B | Opt C | Opt D | C | Audio text |

## Luyện dịch
| VI | EN | Direction |
| --- | --- | --- |
| Tôi là học viên. | I am a student. | vi-en |
| She is beautiful. | Cô ấy đẹp. | en-vi |

## Video hội thoại
- Title: Video hội thoại thực tế
- URL: https://www.youtube.com/watch?v=YYYYYY
- Description: Xem hội thoại mẫu để học ngữ cảnh.

### Transcript
A: Hi, how are you? | Chào bạn khỏe không?
B: I am fine, thank you. | Tôi khỏe, cảm ơn bạn.

### Câu hỏi hiểu bài
| Question | A | B | C | D | Answer | Explanation |
| --- | --- | --- | --- | --- | --- | --- |
| Question dialogue? | Opt A | Opt B | Opt C | Opt D | A | Giải thích |

### Nghe chọn thoại
| Question | A | B | C | D | Answer |
| --- | --- | --- | --- | --- | --- |
| Nghe chọn thoại? | Câu thoại A | Câu thoại B | Câu thoại C | Câu thoại D | B |

### Điền hội thoại
- Word Bank: hi, fine, thank you
- Dialogue:
A: [[hi]], how are you?
B: I am [[fine]], [[thank you]].

## Luyện nói AI
| Question | Formula | Sample | Sample VI |
| --- | --- | --- | --- |
| What is your name? | My name is + Name | My name is Tuwi. | Tên tôi là Tuwi. |

## Minitest
| Question | A | B | C | D | Answer | Explanation |
| --- | --- | --- | --- | --- | --- | --- |
| Question test? | Opt A | Opt B | Opt C | Opt D | D | Giải thích |

## Mindmap
- Center: Tên chủ đề chính
- Branches (Dạng bảng hoặc danh sách): Nhánh 1 (icon) | Nhánh 2 (icon)...

## Bài tập về nhà
- Title: Bài tập về nhà
- Submit: Nộp bài qua nhóm lớp Zalo
- Deadline: Trước buổi học tiếp theo

### Tasks
| Icon | Title | Badge | Description | Items | Sample | Rubric |
| --- | --- | --- | --- | --- | --- | --- |
| ✍️ | Bài tập viết | Bắt buộc | Viết 5 câu giới thiệu bản thân. | - Viết đủ 5 câu<br>- Đúng ngữ pháp to be | My name is Alex. I am 20 years old. | Đúng ngữ pháp, đủ số câu. |
| 🎙️ | Bài tập nói | Bắt buộc | Quay video giới thiệu bản thân. | - Nói rõ âm đuôi<br>- Thời lượng 30s | Hello everyone, my name is Alex... | Phát âm rõ ràng, trôi chảy. |
```

---

## 3. Cách chạy lệnh Import

Sau khi dán nội dung `.md` hoàn thiện vào file, chạy lệnh terminal sau từ thư mục gốc của dự án để tự động chuyển dịch vào registry của ứng dụng:

```bash
# Cú pháp:
# node scripts/import-lesson-md.js docs/lesson-[ID]-[slug].md --day [ID] --write

# Ví dụ cho Buổi 1:
node scripts/import-lesson-md.js docs/lesson-01-alphabet-and-nouns.md --day 1 --write
```

Script sẽ tự động:
1. Đọc và phân tích cú pháp file Markdown của bạn.
2. Kiểm tra chất lượng và cảnh báo kiến trúc.
3. Xuất và dán đè dữ liệu JS vào block override tương ứng trong `src/features/lessons/legacyLessonsData.js`.
4. Không cần chỉnh sửa code chính của dự án. Sau khi build lại, ứng dụng sẽ ngay lập tức cập nhật giao diện mới.
