# CHECKLIST HOÀN THIỆN NỘI DUNG 8 BUỔI DRAFT

Bảng theo dõi tiến độ biên soạn và tích hợp nội dung chi tiết cho 8 buổi học chưa có dữ liệu cũ.

| Buổi | Topic | Trạng thái hiện tại | Đã có template | Cần MD nội dung | Cần video | Cần bài tập | Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Buổi 1** | Alphabet and Nouns | `DRAFT` (Skeleton) | ✅ Có sẵn khung | 🟥 Cần soạn mới | 🟥 Cần video bảng chữ cái | ✅ Có bài tập mẫu | Chưa có dữ liệu cũ hỗ trợ. |
| **Buổi 2** | Singular & Plural Nouns | `DRAFT` (Skeleton) | ✅ Có sẵn khung | 🟥 Cần soạn mới | 🟥 Cần video danh từ số ít/nhiều | ✅ Có bài tập mẫu | Cần biên soạn nội dung ngữ pháp riêng. |
| **Buổi 4** | Personal pronoun | `DRAFT` (Skeleton) | ✅ Có sẵn khung | 🟥 Cần soạn mới | 🟥 Cần video đại từ nhân xưng | ✅ Có bài tập mẫu | Tách riêng mảng đại từ nhân xưng. |
| **Buổi 8** | Capital letter rules | `DRAFT` (Skeleton) | ✅ Có sẵn khung | 🟥 Cần soạn mới | 🟥 Cần video viết hoa | ✅ Có bài tập mẫu | Chưa có nội dung cũ phù hợp. |
| **Buổi 11** | Preposition of Time | `DRAFT` (Skeleton) | ✅ Có sẵn khung | 🟥 Cần soạn mới | 🟥 Cần video giới từ thời gian | ✅ Có bài tập mẫu | Soạn mới hoàn toàn. |
| **Buổi 23** | Numbers and Time in English | `DRAFT` (Skeleton) | ✅ Có sẵn khung | 🟥 Cần soạn mới | 🟥 Cần video ngày tháng giờ | ✅ Có bài tập mẫu | Soạn mới hoàn toàn. |
| **Buổi 25** | Past Continuous Tense | `DRAFT` (Skeleton) | ✅ Có sẵn khung | 🟥 Cần soạn mới | 🟥 Cần video quá khứ tiếp diễn | ✅ Có bài tập mẫu | Chưa có buổi cũ tương ứng. |
| **Buổi 26** | Tag questions | `DRAFT` (Skeleton) | ✅ Có sẵn khung | 🟥 Cần soạn mới | 🟥 Cần video câu hỏi đuôi | ✅ Có bài tập mẫu | Chưa có buổi cũ tương ứng. |

## Các bước tiếp theo để hoàn thiện:
1. **Soạn thảo Markdown**: Biên soạn 8 file `.md` riêng lẻ theo định dạng hướng dẫn tại [HOW_TO_FILL_EMPTY_LESSON_MD.md](file:///d:/github_desktop/fclass-F1/docs/HOW_TO_FILL_EMPTY_LESSON_MD.md).
2. **Chọn Video**: Thu thập link video giảng dạy chất lượng trên YouTube (giới thiệu từ vựng/ngữ pháp và video hội thoại giao tiếp).
3. **Chạy Script Import**: Chạy script `node scripts/import-lesson-md.js docs/lesson-[ID]-[slug].md --day [ID] --write` để chuyển đổi tự động sang code.
