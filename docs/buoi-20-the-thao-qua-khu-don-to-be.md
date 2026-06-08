# BUỔI 20: THỂ THAO & QUÁ KHỨ ĐƠN CỦA TO BE

Code: Ready for web import  
Content: Ready  
Architecture: Buổi 9 canonical flow  
Topic: Sports / past sports events  
Grammar focus: Past simple of `to be` - `was / were`

> Ghi chú Dev tổng quát: File MD này là source nội dung cho web import. Các cột `Answer` / `Đáp án` là data đáp án, UI không hiển thị trước khi học viên chọn hoặc bấm kiểm tra. Giữ đúng thứ tự 15 mục bên dưới khi import vào lesson flow Buổi 9.

---

## 1. Ôn bài cũ

Ghi chú Dev: Import thành section `review`. Bắt buộc có 2 game. Game 1 map vào `review.reviewGames.vocabulary` đủ 20 item. Game 2 map vào `review.reviewGames.quizBomb.questions` đủ 20 câu. Không render cột `Answer` trước khi học viên chọn.

Chủ đề ôn: Buổi 19 - Clothes, Present Simple vs Present Continuous.

### Game 1: Nghe chọn từ - 20 câu

| # | Audio | A | B | C | D | Answer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | usually | thường thường | bây giờ | tuần trước | rất mệt | A |
| 2 | often | đang mặc | thường xuyên | sân vận động | cuộc đua | B |
| 3 | sometimes | luôn luôn | tối qua | đôi khi | đội thắng | C |
| 4 | never | hôm nay | đang chạy | áo khoác | không bao giờ | D |
| 5 | every day | mỗi ngày | ngay bây giờ | trận đấu | tỉ số | A |
| 6 | on weekends | cầu thủ | vào cuối tuần | hôm qua | bóng bàn | B |
| 7 | now | đội | tuần trước | bây giờ | cầu lông | C |
| 8 | right now | áo thun | bóng rổ | thường thường | ngay bây giờ | D |
| 9 | at the moment | lúc này | đã mệt | cuộc đua | buổi tập | A |
| 10 | Look! | hôm qua | Nhìn kìa! | người thắng | đội | B |
| 11 | Listen! | sân vận động | quần vợt | Nghe này! | bơi lội | C |
| 12 | today | áo khoác | tuần trước | đội bóng | hôm nay | D |
| 13 | this week | tuần này | tối qua | trận đấu | cuộc đua | A |
| 14 | go shopping | đang mua áo | đi mua sắm | đang đá bóng | đã thắng | B |
| 15 | buy clothes | mệt | vui | mua quần áo | huấn luyện viên | C |
| 16 | wear a uniform | bơi lội | chạy bộ | ở sân vận động | mặc đồng phục | D |
| 17 | try on a jacket | thử áo khoác | thắng trận | đi cổ vũ | chơi bóng rổ | A |
| 18 | fashion | cầu thủ | thời trang | đội | cuộc đua | B |
| 19 | changing room | áo phông | giày thể thao | phòng thay đồ | sân vận động | C |
| 20 | size | tỉ số | thường xuyên | hôm qua | cỡ/kích cỡ | D |

### Game 2: Quiz Bomb - 20 câu

| # | Question | A | B | C | D | Answer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | I ___ jeans every weekend. | wear | am wearing | was | were | A |
| 2 | Look! She ___ a new jacket. | wears | is wearing | wore | were | B |
| 3 | He usually ___ a uniform at school. | wear | wearing | wears | is wear | C |
| 4 | They ___ shopping right now. | go | goes | went | are going | D |
| 5 | `usually` dùng với thì nào trong Buổi 19? | Present Simple | Present Continuous | Past Simple | Future | A |
| 6 | `now` là dấu hiệu của: | Present Simple | Present Continuous | Past Simple | Comparative | B |
| 7 | Câu nào đúng? | She wear jeans. | She wearing jeans. | She wears jeans. | She is wear jeans. | C |
| 8 | Câu nào đúng? | I am wear a jacket. | I wears a jacket. | I wearing a jacket. | I am wearing a jacket. | D |
| 9 | `on weekends` nghĩa là gì? | vào cuối tuần | hôm qua | ngay bây giờ | tuần trước | A |
| 10 | `at the moment` nghĩa là gì? | mỗi ngày | lúc này | thường xuyên | không bao giờ | B |
| 11 | My brother ___ football every Sunday. | play | playing | plays | is play | C |
| 12 | Listen! They ___ in the sports hall. | run | runs | ran | are running | D |
| 13 | `try on` nghĩa là gì? | thử mặc | mua | bán | thay đổi | A |
| 14 | `changing room` nghĩa là gì? | sân vận động | phòng thay đồ | cửa hàng | đội | B |
| 15 | Chọn câu Present Simple. | I am playing now. | Look! He is running. | She often plays tennis. | They are shopping. | C |
| 16 | Chọn câu Present Continuous. | I usually wear jeans. | He plays football. | We go shopping on Sundays. | They are trying on shoes. | D |
| 17 | `never` nghĩa là gì? | không bao giờ | đôi khi | thường xuyên | luôn luôn | A |
| 18 | `this week` nghĩa là gì? | hôm qua | tuần này | tối qua | hai ngày trước | B |
| 19 | `fashion` nghĩa là gì? | tỉ số | đội | thời trang | cuộc đua | C |
| 20 | Câu nào sai? | She often wears black shoes. | They are playing now. | I usually go shopping. | He are wearing a jacket. | D |

---

## 2. Giới thiệu Video

Ghi chú Dev: Import thành section `video`. Nếu iframe lỗi, UI hiển thị `watchUrl` và `fallbackSearchUrl`. Các câu hỏi A/B/C/D lưu answer index trong data, không hiện đáp án trước khi chọn.

### Video chính: Sports in English - Vocabulary for beginners and children

- embedUrl: `https://www.youtube.com/embed/tZdNh5p0WBw`
- watchUrl: `https://www.youtube.com/watch?v=tZdNh5p0WBw`
- fallbackSearchUrl: `https://www.youtube.com/results?search_query=Sports+in+English+Vocabulary+for+beginners+and+children`
- Channel/source: Baby Nenes / YouTube
- Duration: about 5 minutes

### Video hỗ trợ ngữ pháp: Past Simple Tense be - was / were

- embedUrl: `https://www.youtube.com/embed/O3FdGPehN-E`
- watchUrl: `https://www.youtube.com/watch?v=O3FdGPehN-E`
- fallbackSearchUrl: `https://www.youtube.com/results?search_query=Past+Simple+Tense+be+was+were+ESL+beginner`
- Channel/source: Oomongzu / YouTube
- Duration: about 4 minutes

### Cảnh chính cần bắt

| Scene | Nội dung | Từ khóa |
| --- | --- | --- |
| 1 | Nhận diện tên môn thể thao qua hình ảnh | football, basketball, tennis, swimming |
| 2 | Nghe và lặp lại từ thể thao | volleyball, badminton, running, cycling |
| 3 | Ôn `was / were` để nói sự kiện đã xảy ra | was, were, yesterday, last night |
| 4 | Kết nối topic: kể lại một trận đấu đã xem | match, stadium, team, score |

### Câu hỏi xem video

| # | Question | A | B | C | D | Answer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Which sport uses a ball and a goal? | football | swimming | cycling | badminton | A |
| 2 | Which word means `bóng rổ`? | tennis | basketball | race | score | B |
| 3 | Which sentence talks about the past? | I am tired now. | I play football. | I was tired yesterday. | I usually run. | C |
| 4 | Which subject goes with `were`? | he | she | it | they | D |
| 5 | `The match was exciting` means: | Trận đấu rất thú vị. | Trận đấu đang diễn ra. | Trận đấu thường diễn ra. | Trận đấu ở tương lai. | A |

---

## 3. Từ vựng Flashcard

Ghi chú Dev: Import thành section `vocab`. Chia đúng 2 tab bằng `group`: `sports` và `pastEventWords`. Mỗi flashcard có `en`, `vi`, `ipa`, `img`, `example`. UI có audio TTS từng từ/cụm.

### Tab 1: Sports - Môn thể thao

| # | EN | IPA | VI | Emoji | Example |
| --- | --- | --- | --- | --- | --- |
| 1 | football | /ˈfʊtbɔːl/ | bóng đá | ⚽ | The football match was exciting. |
| 2 | basketball | /ˈbɑːskɪtbɔːl/ | bóng rổ | 🏀 | They were at a basketball game. |
| 3 | tennis | /ˈtenɪs/ | quần vợt | 🎾 | She was good at tennis. |
| 4 | volleyball | /ˈvɑːlibɔːl/ | bóng chuyền | 🏐 | We were on the volleyball team. |
| 5 | badminton | /ˈbædmɪntən/ | cầu lông | 🏸 | I was at badminton practice. |
| 6 | swimming | /ˈswɪmɪŋ/ | bơi lội | 🏊 | Swimming was fun last week. |
| 7 | running | /ˈrʌnɪŋ/ | chạy bộ | 🏃 | The running race was fast. |
| 8 | cycling | /ˈsaɪklɪŋ/ | đạp xe | 🚴 | Cycling was difficult yesterday. |
| 9 | table tennis | /ˈteɪbəl ˌtenɪs/ | bóng bàn | 🏓 | Table tennis was easy. |
| 10 | baseball | /ˈbeɪsbɔːl/ | bóng chày | ⚾ | The baseball game was long. |
| 11 | athletics | /æθˈletɪks/ | điền kinh | 🏅 | Athletics was at school. |
| 12 | race | /reɪs/ | cuộc đua | 🏁 | The race was exciting. |
| 13 | match | /mætʃ/ | trận đấu | 🏟️ | The match was last night. |
| 14 | team | /tiːm/ | đội | 👥 | Our team was happy. |
| 15 | player | /ˈpleɪər/ | cầu thủ/người chơi | 🧍 | The players were tired. |

### Tab 2: Past event words - Từ dùng kể sự kiện quá khứ

| # | EN | IPA | VI | Emoji | Example |
| --- | --- | --- | --- | --- | --- |
| 1 | yesterday | /ˈjestərdeɪ/ | hôm qua | 📆 | I was tired yesterday. |
| 2 | last night | /læst naɪt/ | tối qua | 🌙 | The match was last night. |
| 3 | last week | /læst wiːk/ | tuần trước | 🗓️ | We were at practice last week. |
| 4 | last weekend | /læst ˌwiːkˈend/ | cuối tuần trước | 🏖️ | I was at a match last weekend. |
| 5 | two days ago | /tuː deɪz əˈɡoʊ/ | hai ngày trước | ⏮️ | They were here two days ago. |
| 6 | at school | /ət skuːl/ | ở trường | 🏫 | The game was at school. |
| 7 | at the stadium | /ət ðə ˈsteɪdiəm/ | ở sân vận động | 🏟️ | We were at the stadium. |
| 8 | practice | /ˈpræktɪs/ | buổi tập | 🏋️ | Practice was hard. |
| 9 | coach | /koʊtʃ/ | huấn luyện viên | 📋 | The coach was strict. |
| 10 | score | /skɔːr/ | tỉ số | 🔢 | The score was 2-1. |
| 11 | winner | /ˈwɪnər/ | người/đội thắng | 🏆 | Our team was the winner. |
| 12 | tired | /ˈtaɪərd/ | mệt | 😫 | The players were tired. |
| 13 | excited | /ɪkˈsaɪtɪd/ | hào hứng | 🤩 | We were excited. |
| 14 | nervous | /ˈnɜːrvəs/ | lo lắng | 😬 | I was nervous before the race. |
| 15 | happy | /ˈhæpi/ | vui | 😊 | They were happy after the game. |

---

## 4. Ghép từ Matching Game

Ghi chú Dev: Import thành section `vocab_match`. Random từ toàn bộ flashcard. Mỗi lượt lấy 10 cặp, nhưng data nguồn đủ 30 cặp. Không lặp cho đến khi đi hết pool.

| # | EN | VI |
| --- | --- | --- |
| 1 | football | bóng đá |
| 2 | basketball | bóng rổ |
| 3 | tennis | quần vợt |
| 4 | volleyball | bóng chuyền |
| 5 | badminton | cầu lông |
| 6 | swimming | bơi lội |
| 7 | running | chạy bộ |
| 8 | cycling | đạp xe |
| 9 | table tennis | bóng bàn |
| 10 | baseball | bóng chày |
| 11 | athletics | điền kinh |
| 12 | race | cuộc đua |
| 13 | match | trận đấu |
| 14 | team | đội |
| 15 | player | cầu thủ/người chơi |
| 16 | yesterday | hôm qua |
| 17 | last night | tối qua |
| 18 | last week | tuần trước |
| 19 | last weekend | cuối tuần trước |
| 20 | two days ago | hai ngày trước |
| 21 | at school | ở trường |
| 22 | at the stadium | ở sân vận động |
| 23 | practice | buổi tập |
| 24 | coach | huấn luyện viên |
| 25 | score | tỉ số |
| 26 | winner | người/đội thắng |
| 27 | tired | mệt |
| 28 | excited | hào hứng |
| 29 | nervous | lo lắng |
| 30 | happy | vui |

---

## 5. Nghe chọn từ

Ghi chú Dev: Import thành section `listen_pick`. Phát audio từ cột `Audio`; học viên chọn A/B/C/D. Đủ 20 câu. Không hiện cột `Answer` trên UI trước khi chọn.

| # | Audio | A | B | C | D | Answer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | football | bóng đá | bóng rổ | bơi lội | chạy bộ | A |
| 2 | basketball | bóng chày | bóng rổ | bóng bàn | quần vợt | B |
| 3 | tennis | đạp xe | điền kinh | quần vợt | cầu lông | C |
| 4 | volleyball | cuộc đua | trận đấu | bóng chày | bóng chuyền | D |
| 5 | badminton | cầu lông | chạy bộ | bóng rổ | bơi lội | A |
| 6 | swimming | điền kinh | bơi lội | bóng đá | bóng bàn | B |
| 7 | running | bóng chuyền | cầu thủ | chạy bộ | đội | C |
| 8 | cycling | trận đấu | cầu lông | tỉ số | đạp xe | D |
| 9 | table tennis | bóng bàn | bóng đá | cuộc đua | đội | A |
| 10 | baseball | sân vận động | bóng chày | người thắng | buổi tập | B |
| 11 | athletics | hôm qua | cuối tuần trước | điền kinh | mệt | C |
| 12 | race | đội | tối qua | buổi tập | cuộc đua | D |
| 13 | match | trận đấu | huấn luyện viên | tỉ số | vui | A |
| 14 | team | cầu thủ | đội | sân vận động | cuộc đua | B |
| 15 | player | đội thắng | buổi tập | cầu thủ/người chơi | tuần trước | C |
| 16 | yesterday | tối qua | tuần trước | hai ngày trước | hôm qua | D |
| 17 | last night | tối qua | hôm qua | tuần này | cuối tuần trước | A |
| 18 | last week | cuối tuần trước | tuần trước | tối qua | hai ngày trước | B |
| 19 | at the stadium | ở trường | ở nhà | ở sân vận động | ở cửa hàng | C |
| 20 | score | đội | trận đấu | cuộc đua | tỉ số | D |

---

## 6. Ngữ pháp

Ghi chú Dev: Import thành section `grammar`. Có 5 cấu trúc. Render bảng công thức, ví dụ song ngữ, và lỗi thường gặp. Không biến phần lỗi thành quiz trừ khi UI có chế độ practice riêng.

### Bảng công thức chính

| # | Cấu trúc | Công thức | Nghĩa | Ví dụ EN | Ví dụ VI |
| --- | --- | --- | --- | --- | --- |
| 1 | Khẳng định | I/He/She/It + was + adj/place. You/We/They + were + adj/place. | Ai đó đã như thế nào/ở đâu trong quá khứ | I was tired yesterday. They were at the stadium. | Tôi mệt hôm qua. Họ ở sân vận động. |
| 2 | Phủ định | S + was not/wasn't hoặc were not/weren't + ... | Không như vậy/không ở đó trong quá khứ | He wasn't at practice. We weren't sad. | Anh ấy không ở buổi tập. Chúng tôi không buồn. |
| 3 | Yes/No question | Was/Were + S + ...? | Hỏi có phải đã như vậy/ở đó không | Was the match exciting? Were you at the stadium? | Trận đấu có thú vị không? Bạn có ở sân vận động không? |
| 4 | Trả lời ngắn | Yes, S + was/were. No, S + wasn't/weren't. | Trả lời ngắn cho câu hỏi was/were | Yes, it was. No, they weren't. | Có. / Không. |
| 5 | Dấu hiệu quá khứ | yesterday / last night / last week / two days ago + was/were | Nhận diện thời quá khứ | The score was 2-1 last night. | Tỉ số tối qua là 2-1. |

### Ví dụ thay thế nhanh

| Pattern | Replace | New sentence |
| --- | --- | --- |
| I was tired yesterday. | tired -> excited | I was excited yesterday. |
| They were at the stadium. | stadium -> school | They were at school. |
| Was the match exciting? | match -> race | Was the race exciting? |
| We weren't sad. | sad -> nervous | We weren't nervous. |

### Lỗi thường gặp

| Sai | Đúng | Giải thích |
| --- | --- | --- |
| I were tired yesterday. | I was tired yesterday. | `I` đi với `was` trong quá khứ. |
| They was at the match. | They were at the match. | `they/we/you` đi với `were`. |
| Was they happy? | Were they happy? | Câu hỏi vẫn chia theo chủ ngữ. |
| He wasn't were tired. | He wasn't tired. | Không dùng `wasn't` và `were` cùng nhau. |
| The match is exciting last night. | The match was exciting last night. | `last night` là dấu hiệu quá khứ. |

---

## 7. Nghe trả lời

Ghi chú Dev: Import thành section `listen_quiz` hoặc `listening.questions`. Đủ 20 câu. Cột `Audio` là TTS prompt. Cột `Answer` chỉ dùng chấm điểm sau khi chọn.

| # | Audio | Question | A | B | C | D | Answer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | I was tired yesterday. | Chọn từ còn thiếu: I ___ tired yesterday. | am | is | was | were | C |
| 2 | They were at the stadium last night. | Chọn từ còn thiếu: They ___ at the stadium last night. | was | were | are | is | B |
| 3 | The match was exciting. | Chọn từ còn thiếu: The match ___ exciting. | was | were | are | am | A |
| 4 | The players were tired. | Chọn từ còn thiếu: The players ___ tired. | was | were | is | am | B |
| 5 | Was he happy? Yes, he was. | Câu trả lời đúng là gì? | Yes, he was. | Yes, he were. | Yes, he is. | Yes, he did. | A |
| 6 | Were they excited? No, they weren't. | Câu trả lời đúng là gì? | No, they wasn't. | No, they aren't. | No, they weren't. | No, they don't. | C |
| 7 | I wasn't at practice yesterday. | Chọn dạng phủ định đúng. | wasn't | weren't | am not | don't | A |
| 8 | We weren't sad after the match. | Chọn dạng phủ định đúng. | wasn't | weren't | aren't | didn't | B |
| 9 | Was the race fast? | Câu hỏi dùng từ nào? | Were | Are | Was | Did | C |
| 10 | Were you at school yesterday? | Câu hỏi dùng từ nào? | Was | Are | Did | Were | D |
| 11 | The score was two one. | `score` nghĩa là gì? | tỉ số | đội | cầu thủ | cuộc đua | A |
| 12 | Our team was the winner. | `winner` nghĩa là gì? | người thua | người/đội thắng | huấn luyện viên | sân vận động | B |
| 13 | The coach was strict. | `coach` nghĩa là gì? | đội | trận đấu | huấn luyện viên | tỉ số | C |
| 14 | Practice was hard last week. | `practice` nghĩa là gì? | cuộc đua | tỉ số | sân vận động | buổi tập | D |
| 15 | I was nervous before the race. | Người nói cảm thấy thế nào? | lo lắng | vui | buồn | mệt | A |
| 16 | They were happy after the game. | Người nói cảm thấy thế nào? | mệt | vui | lo lắng | tức giận | B |
| 17 | Last weekend, we were at a football match. | Họ đã ở đâu? | at home | at a shop | at a football match | at a cinema | C |
| 18 | The stadium was full. | Sân vận động thế nào? | empty | small | closed | full | D |
| 19 | Was badminton easy? No, it wasn't. | Trả lời phủ định đúng là gì? | No, it wasn't. | No, it weren't. | No, it isn't. | No, it doesn't. | A |
| 20 | Were the players tired? Yes, they were. | Trả lời khẳng định đúng là gì? | Yes, they was. | Yes, they were. | Yes, they are. | Yes, they did. | B |

---

## 8. Luyện dịch Việt ↔ Anh

Ghi chú Dev: Import thành section `translate`. Đủ 20 câu, có `direction`. UI chỉ hiện đáp án sau khi học viên bấm kiểm tra.

| # | Direction | Prompt | Answer |
| --- | --- | --- | --- |
| 1 | vi-en | Tôi mệt hôm qua. | I was tired yesterday. |
| 2 | vi-en | Họ ở sân vận động tối qua. | They were at the stadium last night. |
| 3 | vi-en | Trận đấu rất thú vị. | The match was exciting. |
| 4 | vi-en | Các cầu thủ rất mệt. | The players were tired. |
| 5 | en-vi | She was nervous before the race. | Cô ấy lo lắng trước cuộc đua. |
| 6 | vi-en | Chúng tôi vui sau trận đấu. | We were happy after the game. |
| 7 | vi-en | Anh ấy không ở buổi tập hôm qua. | He wasn't at practice yesterday. |
| 8 | vi-en | Họ không buồn sau trận đấu. | They weren't sad after the match. |
| 9 | vi-en | Trận đấu có chán không? | Was the match boring? |
| 10 | en-vi | Were you at the stadium? | Bạn có ở sân vận động không? |
| 11 | vi-en | Có, tôi có ở đó. | Yes, I was. |
| 12 | vi-en | Không, họ không ở đó. | No, they weren't. |
| 13 | vi-en | Tỉ số là 2-1. | The score was 2-1. |
| 14 | vi-en | Đội chúng tôi là đội thắng. | Our team was the winner. |
| 15 | en-vi | The coach was strict. | Huấn luyện viên nghiêm khắc. |
| 16 | vi-en | Buổi tập rất khó. | Practice was hard. |
| 17 | vi-en | Tôi ở một trận bóng đá cuối tuần trước. | I was at a football match last weekend. |
| 18 | vi-en | Bóng rổ rất vui. | Basketball was fun. |
| 19 | vi-en | Các cầu thủ có mệt không? | Were the players tired? |
| 20 | en-vi | No, the match wasn't boring. | Không, trận đấu không chán. |

---

## 9. Video hội thoại

Ghi chú Dev: Import thành section `dialogue_video`. Video hội thoại có thể dùng video nội bộ/teacher-recorded hoặc TTS theo transcript bên dưới. Transcript song ngữ là source học chính, đủ dùng kể cả khi video lỗi. Nếu thay bằng YouTube, bắt buộc điền đủ `embedUrl`, `watchUrl`, `fallbackSearchUrl`.

- title: `At the Football Match Last Night`
- mediaType: `teacher_recorded_or_tts`
- embedUrl: ``
- watchUrl: ``
- fallbackSearchUrl: `https://www.youtube.com/results?search_query=ESL+dialogue+football+match+was+were+beginner`
- description: Hội thoại A1 về một trận bóng đá tối qua, luyện `was/were`, cảm xúc, địa điểm, tỉ số.

### Transcript song ngữ

| # | Speaker | EN | VI | Keyword |
| --- | --- | --- | --- | --- |
| 1 | Tom | Were you at the football match last night? | Bạn có ở trận bóng đá tối qua không? | were, match, last night |
| 2 | Linh | Yes, I was. It was amazing! | Có. Trận đấu rất tuyệt! | was, amazing |
| 3 | Tom | Was the stadium full? | Sân vận động có đông kín không? | was, stadium |
| 4 | Linh | Yes, it was. There were many fans. | Có. Có rất nhiều cổ động viên. | were, fans |
| 5 | Tom | Were the players tired? | Các cầu thủ có mệt không? | were, players, tired |
| 6 | Linh | Yes, they were, but they were happy. | Có, họ mệt nhưng họ vui. | were, happy |
| 7 | Tom | What was the score? | Tỉ số là bao nhiêu? | was, score |
| 8 | Linh | The score was 2-1. Our team was the winner. | Tỉ số là 2-1. Đội chúng tôi thắng. | score, winner |
| 9 | Tom | Was the coach happy too? | Huấn luyện viên cũng vui phải không? | was, coach |
| 10 | Linh | Yes, he was. It was a great night. | Có. Đó là một buổi tối tuyệt vời. | was, great night |

### Keywords

| Keyword | VI | Example |
| --- | --- | --- |
| football match | trận bóng đá | The football match was exciting. |
| last night | tối qua | I was at home last night. |
| stadium | sân vận động | The stadium was full. |
| fans | cổ động viên | There were many fans. |
| players | cầu thủ | The players were tired. |
| score | tỉ số | The score was 2-1. |
| winner | người/đội thắng | Our team was the winner. |
| coach | huấn luyện viên | The coach was happy. |

### Câu hỏi hiểu bài

| # | Question | A | B | C | D | Answer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Where was Linh last night? | at a football match | at a tennis match | at school | at home | A |
| 2 | Was the stadium full? | No, it wasn't. | Yes, it was. | Yes, they were. | No, they weren't. | B |
| 3 | Were the players tired? | No, they weren't. | They were angry. | Yes, they were. | They were absent. | C |
| 4 | What was the score? | 1-0 | 2-0 | 3-2 | 2-1 | D |
| 5 | Who was the winner? | Linh's team | Tom's team | The coach | The fans | A |

---

## 10. Nghe chọn thoại

Ghi chú Dev: Import thành `dialogueVideo.listenPickLine`. Đủ 10 câu. Phát `Audio`; học viên chọn câu/ý đúng. Answer 0-3 trong data, không hiện trước.

| # | Audio | A | B | C | D | Answer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Were you at the football match last night? | Bạn có ở trận bóng đá tối qua không? | Bạn có chơi bóng rổ không? | Bạn đang ở sân vận động không? | Bạn có mệt không? | A |
| 2 | Yes, I was. It was amazing! | Không, tôi không ở đó. | Có. Trận đấu rất tuyệt! | Tôi đang đá bóng. | Họ rất mệt. | B |
| 3 | Was the stadium full? | Sân vận động có mở cửa không? | Cầu thủ có mệt không? | Sân vận động có đông kín không? | Tỉ số là bao nhiêu? | C |
| 4 | There were many fans. | Có nhiều cầu thủ. | Có nhiều trận đấu. | Có nhiều huấn luyện viên. | Có nhiều cổ động viên. | D |
| 5 | Were the players tired? | Các cầu thủ có mệt không? | Các cầu thủ có vui không? | Huấn luyện viên có nghiêm không? | Tỉ số có cao không? | A |
| 6 | Yes, they were, but they were happy. | Họ không ở đó. | Có, họ mệt nhưng họ vui. | Trận đấu rất chán. | Tôi ở sân vận động. | B |
| 7 | What was the score? | Ai là người thắng? | Trận đấu ở đâu? | Tỉ số là bao nhiêu? | Bạn có ở đó không? | C |
| 8 | The score was 2-1. | Tỉ số là 1-0. | Tỉ số là 2-0. | Tỉ số là 3-2. | Tỉ số là 2-1. | D |
| 9 | Our team was the winner. | Đội chúng tôi thắng. | Đội chúng tôi thua. | Đội chúng tôi mệt. | Đội chúng tôi đến muộn. | A |
| 10 | It was a great night. | Đó là một buổi sáng tốt. | Đó là một buổi tối tuyệt vời. | Đó là một buổi tập khó. | Đó là một cuộc đua nhanh. | B |

---

## 11. Điền hội thoại

Ghi chú Dev: Import thành `dialogueVideo.fillConversation`. UI có word bank, nút kiểm tra, và chỉ hiện đáp án/giải thích sau khi bấm. Data đáp án nằm trong token `[[...]]`.

### Word bank

`Were`, `was`, `were`, `score`, `wasn't`, `stadium`, `winner`, `tired`

### Cloze dialogue

| Speaker | Line |
| --- | --- |
| Tom | [[Were]] you at the basketball match yesterday? |
| Linh | Yes, I was. It [[was]] exciting. |
| Tom | Was the [[stadium]] full? |
| Linh | Yes, it was. There were many fans. |
| Tom | Were the players [[tired]]? |
| Linh | Yes, they [[were]] very tired. |
| Tom | What was the [[score]]? |
| Linh | It was 3-2. Our team [[wasn't]] sad because we were the [[winner]]. |

### Đáp án và giải thích

| Blank | Answer | Explanation |
| --- | --- | --- |
| 1 | Were | Câu hỏi với `you` dùng `Were`. |
| 2 | was | Chủ ngữ `It` dùng `was`. |
| 3 | stadium | Danh từ địa điểm phù hợp với `full`. |
| 4 | tired | Tính từ cảm xúc/trạng thái của players. |
| 5 | were | Chủ ngữ `they` dùng `were`. |
| 6 | score | Hỏi tỉ số: `What was the score?` |
| 7 | wasn't | Không buồn vì đội thắng. |
| 8 | winner | `the winner` = đội/người thắng. |

---

## 12. Luyện nói AI

Ghi chú Dev: Import thành section `speaking`. Đúng 5 prompt. UI dạng chat. Mỗi prompt có 2 toggle riêng: `Công thức` và `Mẫu gợi ý`, mặc định ẩn.

| # | AI Prompt | Công thức | Mẫu gợi ý |
| --- | --- | --- | --- |
| 1 | Tell me three sports from today's lesson. | I know + sport 1, sport 2, and sport 3. | I know football, basketball, and tennis. |
| 2 | Where were you last weekend? | I was at + place + last weekend. | I was at a football match last weekend. |
| 3 | Was the match exciting? | Yes, it was. / No, it wasn't. It was + adjective. | Yes, it was. It was very exciting. |
| 4 | Were the players tired after the game? | Yes, they were. / No, they weren't. They were + adjective. | Yes, they were, but they were happy. |
| 5 | Speak for 30 seconds about a sports event in the past. | Time + place + sport + was/were + feeling/result. | Last night, I was at the stadium. The football match was exciting. The players were tired. The score was 2-1. My team was the winner. |

---

## 13. Minitest

Ghi chú Dev: Import thành section `minitest`. Đủ 20 câu. UI hiển thị từng câu hoặc theo batch, chỉ hiện kết quả/đáp án sau khi học viên chọn. Tính điểm X/20.

| # | Question | A | B | C | D | Answer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | I ___ tired yesterday. | am | is | was | were | C |
| 2 | They ___ at the stadium last night. | was | were | are | is | B |
| 3 | The match ___ exciting. | was | were | are | am | A |
| 4 | The players ___ tired. | was | were | is | am | B |
| 5 | Was he happy? | Yes, he was. | Yes, he were. | Yes, he is. | Yes, he did. | A |
| 6 | Were they excited? | Yes, they was. | Yes, they are. | Yes, they were. | Yes, they did. | C |
| 7 | He ___ at practice yesterday. | weren't | isn't | don't | wasn't | D |
| 8 | We ___ sad after the match. | weren't | wasn't | didn't | aren't | A |
| 9 | ___ the race fast? | Were | Was | Are | Did | B |
| 10 | ___ you at the stadium? | Was | Is | Did | Were | D |
| 11 | `football` nghĩa là gì? | bóng đá | bóng rổ | bơi lội | chạy bộ | A |
| 12 | `race` nghĩa là gì? | trận đấu | cuộc đua | đội | tỉ số | B |
| 13 | `score` nghĩa là gì? | đội | huấn luyện viên | tỉ số | sân vận động | C |
| 14 | `winner` nghĩa là gì? | người thua | cổ động viên | cầu thủ | người/đội thắng | D |
| 15 | `yesterday` là dấu hiệu của: | quá khứ | hiện tại tiếp diễn | thói quen | tương lai | A |
| 16 | Chọn câu đúng. | They was tired. | They were tired. | They is tired. | They am tired. | B |
| 17 | Chọn câu đúng. | Was the match exciting? | Were the match exciting? | Did the match was exciting? | Is the match exciting yesterday? | A |
| 18 | Dịch: `Tỉ số là 2-1.` | The team was 2-1. | The match were 2-1. | The score was 2-1. | The score were 2-1. | C |
| 19 | Dịch: `Họ không ở sân vận động.` | They wasn't at the stadium. | They aren't at the stadium yesterday. | They don't at the stadium. | They weren't at the stadium. | D |
| 20 | Câu nào sai? | I was happy. | We were excited. | He were tired. | The coach was strict. | C |

---

## 14. Mindmap

Ghi chú Dev: Import thành section `mindmap`. Render dạng structured mindmap, không dùng ảnh tĩnh.

Center: `BUỔI 20 - SPORTS & WAS/WERE`

| Branch | Icon | Sub | Items |
| --- | --- | --- | --- |
| Sports | ⚽ | Môn thể thao | football; basketball; tennis; volleyball; badminton; swimming; running; cycling |
| Places & people | 🏟️ | Nơi chốn và người trong thể thao | stadium; match; team; player; coach; fans; winner |
| Was | 1️⃣ | I/He/She/It | I was tired; He was at practice; The match was exciting |
| Were | 👥 | You/We/They | They were happy; We were at the stadium; Were you there? |
| Negative & questions | ❓ | wasn't / weren't / Was / Were | He wasn't sad; They weren't tired; Was it fun?; Were they excited? |
| Time signals | 📆 | Dấu hiệu quá khứ | yesterday; last night; last week; last weekend; two days ago |

---

## 15. Bài tập về nhà

Ghi chú Dev: Import thành section `homework`. Có bài viết, bài nói/ghi âm/video, và tiêu chí chấm. UI có thể render checklist và rubric.

### Bài tập 1: Viết

Viết 8-10 câu kể về một sự kiện thể thao trong quá khứ.

Yêu cầu:
- Dùng ít nhất 8 từ vựng của Buổi 20.
- Dùng ít nhất 3 câu với `was`.
- Dùng ít nhất 3 câu với `were`.
- Có ít nhất 1 câu phủ định với `wasn't` hoặc `weren't`.
- Có ít nhất 1 câu hỏi với `Was/Were`.

Mẫu:

> Last weekend, I was at a football match. The stadium was full. The players were tired, but they were happy. The score was 2-1. Our team was the winner.

### Bài tập 2: Nói / ghi âm / video

Ghi âm hoặc quay video 45-60 giây kể về một trận đấu/cuộc đua/buổi tập trong quá khứ.

Yêu cầu:
- Nói rõ thời gian: `yesterday`, `last night`, `last weekend`, hoặc `two days ago`.
- Nói rõ môn thể thao và địa điểm.
- Dùng tối thiểu 5 từ mới.
- Dùng tối thiểu 4 câu với `was/were`.
- Có 1 câu hỏi và 1 câu trả lời ngắn.

### Tiêu chí chấm

| Tiêu chí | Điểm |
| --- | --- |
| Đúng topic thể thao và sự kiện quá khứ | 2 |
| Dùng đúng `was/were`, `wasn't/weren't`, `Was/Were...?` | 3 |
| Dùng đủ từ vựng Buổi 20 | 2 |
| Phát âm rõ, tốc độ vừa phải | 2 |
| Bài đủ độ dài và nộp đúng định dạng | 1 |

