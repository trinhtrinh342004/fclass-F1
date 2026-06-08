const SECTION_FLOW = [
  "intro",
  "vocab",
  "grammar",
  "translate",
  "speaking",
  "minitest",
  "mindmap",
  "homework"
];

const SKIP_SECTIONS = [
  "review",
  "video",
  "vocab_match",
  "listen_pick",
  "listen_quiz",
  "dialogue_video",
  "dialogue_video_quiz",
  "dialogue_video_order",
  "story",
  "dictation",
  "writing",
  "sprint",
  "listen_choose",
  "sent_order",
  "role_play"
];

const criteria = ["question form", "preposition", "linking words", "fluency"];

export const LESSON_31_IMPORTED_TEMPLATE = {
  id: 31,
  unit: "Review",
  title: "Hướng dẫn đặt câu hỏi & từ nối - giới từ",
  titleVi: "Hướng dẫn đặt câu hỏi & từ nối - giới từ",
  titleEn: "Question Forms, Linking Words & Prepositions",
  subtitle: "Question Forms, Linking Words & Prepositions",
  cefrLevel: "A1",
  mainTopic: "Question forms, linking words and prepositions",
  grammarFocus: "am/is/are questions, do/does questions, Wh-questions, linking words and A1 prepositions",
  importStatus: "markdown",
  lessonArchitecture: "lessonArchitectureV1",
  vocabularyMode: "review_only",
  sectionFlow: SECTION_FLOW,
  skipSections: SKIP_SECTIONS,
  objectives: [
    "Tự đặt câu hỏi cơ bản bằng **be**, **do/does** và **Wh-questions**.",
    "Dùng các từ nối cơ bản như **and, but, or, because, so, then, after that** để nói câu dài hơn.",
    "Dùng giới từ cơ bản **in, on, at, to, from, with, for, near, next to, between, under, behind, in front of** trong câu A1.",
    "Ôn lại từ vựng cũ về **daily routine, shopping, food, places, time, everyday activities** để thực hành đặt câu hỏi.",
    "Luyện dịch và luyện nói theo mẫu câu ngắn, dễ hiểu cho người mất gốc."
  ],
  intro: {
    focusTitle: "Nội dung trọng tâm",
    focusText: "Buổi này không học thêm nhiều từ mới. Mục tiêu chính là dùng lại từ vựng đã học để **biết hỏi, biết nối câu và biết nói rõ hơn**.",
    examples: [
      { en: "I go shopping on Sunday.", vi: "Tôi đi mua sắm vào Chủ nhật." },
      { en: "Do you go shopping on Sunday?", vi: "Bạn có đi mua sắm vào Chủ nhật không?" },
      { en: "When do you go shopping?", vi: "Bạn đi mua sắm khi nào?" },
      { en: "I go shopping on Sunday because I need food.", vi: "Tôi đi mua sắm vào Chủ nhật vì tôi cần đồ ăn." },
      { en: "I go to the supermarket with my mother.", vi: "Tôi đi siêu thị với mẹ tôi." }
    ]
  },
  vocabGroups: {
    dailyRoutine: "Daily routine / Every day",
    shopping: "Shopping / Mua sắm",
    places: "Places / Địa điểm",
    foodItems: "Food / Drink / Everyday items",
    timeWords: "Time words / Từ chỉ thời gian"
  },
  vocabulary: [
    { group: "dailyRoutine", en: "wake up", vi: "thức dậy", img: "⏰", exampleQuestion: "What time do you wake up?", exampleAnswer: "I wake up at six." },
    { group: "dailyRoutine", en: "get up", vi: "ngủ dậy", img: "🌅", exampleQuestion: "Do you get up early?", exampleAnswer: "Yes, I do." },
    { group: "dailyRoutine", en: "brush my teeth", vi: "đánh răng", img: "🪥", exampleQuestion: "When do you brush your teeth?", exampleAnswer: "I brush my teeth in the morning." },
    { group: "dailyRoutine", en: "wash my face", vi: "rửa mặt", img: "💧", exampleQuestion: "Do you wash your face every morning?", exampleAnswer: "Yes, I do." },
    { group: "dailyRoutine", en: "have breakfast", vi: "ăn sáng", img: "🍞", exampleQuestion: "What do you have for breakfast?", exampleAnswer: "I have bread and milk." },
    { group: "dailyRoutine", en: "go to school", vi: "đi học", img: "🏫", exampleQuestion: "How do you go to school?", exampleAnswer: "I go to school by bike." },
    { group: "dailyRoutine", en: "study English", vi: "học tiếng Anh", img: "📘", exampleQuestion: "When do you study English?", exampleAnswer: "I study English in the evening." },
    { group: "dailyRoutine", en: "have lunch", vi: "ăn trưa", img: "🍱", exampleQuestion: "Where do you have lunch?", exampleAnswer: "I have lunch at school." },
    { group: "dailyRoutine", en: "do homework", vi: "làm bài tập về nhà", img: "✏️", exampleQuestion: "Do you do homework at night?", exampleAnswer: "Yes, I do." },
    { group: "dailyRoutine", en: "go to bed", vi: "đi ngủ", img: "🛏️", exampleQuestion: "What time do you go to bed?", exampleAnswer: "I go to bed at ten." },

    { group: "shopping", en: "supermarket", vi: "siêu thị", img: "🛒", exampleQuestion: "Where is the supermarket?", exampleAnswer: "It is near my house." },
    { group: "shopping", en: "shop", vi: "cửa hàng", img: "🏪", exampleQuestion: "Do you often go to the shop?", exampleAnswer: "Yes, I do." },
    { group: "shopping", en: "market", vi: "chợ", img: "🥬", exampleQuestion: "When do you go to the market?", exampleAnswer: "I go to the market on Sunday." },
    { group: "shopping", en: "buy", vi: "mua", img: "🛍️", exampleQuestion: "What do you buy?", exampleAnswer: "I buy some apples." },
    { group: "shopping", en: "sell", vi: "bán", img: "🏷️", exampleQuestion: "What does this shop sell?", exampleAnswer: "It sells clothes." },
    { group: "shopping", en: "price", vi: "giá", img: "💵", exampleQuestion: "What is the price?", exampleAnswer: "It is 50,000 dong." },
    { group: "shopping", en: "cheap", vi: "rẻ", img: "✅", exampleQuestion: "Is it cheap?", exampleAnswer: "Yes, it is." },
    { group: "shopping", en: "expensive", vi: "đắt", img: "💸", exampleQuestion: "Is this bag expensive?", exampleAnswer: "No, it isn't." },
    { group: "shopping", en: "clothes", vi: "quần áo", img: "👕", exampleQuestion: "Where do you buy clothes?", exampleAnswer: "I buy clothes at the shop." },
    { group: "shopping", en: "food", vi: "đồ ăn", img: "🍎", exampleQuestion: "Do you buy food every day?", exampleAnswer: "No, I don't." },

    { group: "places", en: "home", vi: "nhà", img: "🏠", exampleQuestion: "Are you at home now?", exampleAnswer: "Yes, I am." },
    { group: "places", en: "school", vi: "trường học", img: "🏫", exampleQuestion: "Where is your school?", exampleAnswer: "It is in my town." },
    { group: "places", en: "park", vi: "công viên", img: "🌳", exampleQuestion: "Do you go to the park?", exampleAnswer: "Yes, I do." },
    { group: "places", en: "cinema", vi: "rạp chiếu phim", img: "🎬", exampleQuestion: "Where is the cinema?", exampleAnswer: "It is next to the supermarket." },
    { group: "places", en: "restaurant", vi: "nhà hàng", img: "🍽️", exampleQuestion: "Do you eat at a restaurant?", exampleAnswer: "Sometimes." },
    { group: "places", en: "café", vi: "quán cà phê", img: "☕", exampleQuestion: "Where do you meet your friends?", exampleAnswer: "I meet them at a café." },
    { group: "places", en: "library", vi: "thư viện", img: "📚", exampleQuestion: "Is the library near here?", exampleAnswer: "Yes, it is." },
    { group: "places", en: "bus stop", vi: "trạm xe buýt", img: "🚌", exampleQuestion: "Where is the bus stop?", exampleAnswer: "It is in front of the school." },
    { group: "places", en: "bank", vi: "ngân hàng", img: "🏦", exampleQuestion: "Is the bank behind the shop?", exampleAnswer: "No, it isn't." },
    { group: "places", en: "hospital", vi: "bệnh viện", img: "🏥", exampleQuestion: "Where is the hospital?", exampleAnswer: "It is near the park." },

    { group: "foodItems", en: "rice", vi: "cơm/gạo", img: "🍚", exampleQuestion: "Do you eat rice every day?", exampleAnswer: "Yes, I do." },
    { group: "foodItems", en: "noodles", vi: "mì", img: "🍜", exampleQuestion: "Do you like noodles?", exampleAnswer: "Yes, I do." },
    { group: "foodItems", en: "bread", vi: "bánh mì", img: "🥖", exampleQuestion: "What do you have for breakfast?", exampleAnswer: "I have bread." },
    { group: "foodItems", en: "milk", vi: "sữa", img: "🥛", exampleQuestion: "Do you drink milk?", exampleAnswer: "Yes, I do." },
    { group: "foodItems", en: "water", vi: "nước", img: "💧", exampleQuestion: "How much water do you drink?", exampleAnswer: "I drink two bottles." },
    { group: "foodItems", en: "coffee", vi: "cà phê", img: "☕", exampleQuestion: "Do you drink coffee?", exampleAnswer: "No, I don't." },
    { group: "foodItems", en: "apple", vi: "táo", img: "🍎", exampleQuestion: "How many apples do you buy?", exampleAnswer: "I buy three apples." },
    { group: "foodItems", en: "bag", vi: "túi/cặp", img: "🎒", exampleQuestion: "Where is your bag?", exampleAnswer: "It is under the table." },
    { group: "foodItems", en: "phone", vi: "điện thoại", img: "📱", exampleQuestion: "Is your phone on the table?", exampleAnswer: "Yes, it is." },
    { group: "foodItems", en: "book", vi: "sách", img: "📖", exampleQuestion: "Where is your book?", exampleAnswer: "It is in my bag." },

    { group: "timeWords", en: "every day", vi: "mỗi ngày", img: "📅", exampleQuestion: "Do you study every day?", exampleAnswer: "Yes, I do." },
    { group: "timeWords", en: "in the morning", vi: "vào buổi sáng", img: "🌄", exampleQuestion: "What do you do in the morning?", exampleAnswer: "I have breakfast." },
    { group: "timeWords", en: "in the afternoon", vi: "vào buổi chiều", img: "☀️", exampleQuestion: "Do you study in the afternoon?", exampleAnswer: "Yes, I do." },
    { group: "timeWords", en: "in the evening", vi: "vào buổi tối", img: "🌆", exampleQuestion: "What do you do in the evening?", exampleAnswer: "I do homework." },
    { group: "timeWords", en: "at night", vi: "vào ban đêm", img: "🌙", exampleQuestion: "Do you watch TV at night?", exampleAnswer: "Sometimes." },
    { group: "timeWords", en: "on Monday", vi: "vào thứ Hai", img: "📆", exampleQuestion: "Do you go to school on Monday?", exampleAnswer: "Yes, I do." },
    { group: "timeWords", en: "on the weekend", vi: "vào cuối tuần", img: "🗓️", exampleQuestion: "What do you do on the weekend?", exampleAnswer: "I go shopping." },
    { group: "timeWords", en: "today", vi: "hôm nay", img: "📍", exampleQuestion: "Are you busy today?", exampleAnswer: "Yes, I am." },
    { group: "timeWords", en: "tomorrow", vi: "ngày mai", img: "➡️", exampleQuestion: "What do you do tomorrow?", exampleAnswer: "I go to school." },
    { group: "timeWords", en: "now", vi: "bây giờ", img: "⏱️", exampleQuestion: "Are you studying now?", exampleAnswer: "Yes, I am." }
  ],
  grammar: {
    title: "Hướng dẫn đặt câu hỏi & từ nối - giới từ",
    intro: "Trọng tâm của buổi 31 là đặt câu hỏi đúng trợ động từ, nối câu đơn thành câu dài hơn và dùng giới từ A1 thật chắc.",
    badge: "TRỌNG TÂM NGỮ PHÁP BUỔI 31",
    formula: "Am/Is/Are + S...? | Do/Does + S + V...? | Wh-word + do/does + S + V...? | S + V + linking word + S + V | in/on/at/to/from/with/for/by...",
    structures: [
      {
        num: 1,
        pattern: "Am / Is / Are + S + ...?",
        vi: "Câu hỏi Yes/No với BE",
        style: "Dùng khi hỏi về tên, tuổi, nghề nghiệp, tính chất, vị trí, trạng thái.",
        example: "Are you busy?",
        exampleVi: "Bạn có bận không?",
        context: "Câu có am/is/are thì đảo BE lên trước chủ ngữ.",
        commonMistake: "Sai: You are busy? | Đúng: Are you busy?"
      },
      {
        num: 2,
        pattern: "Do / Does + S + V nguyên mẫu + ...?",
        vi: "Câu hỏi Yes/No với động từ thường",
        style: "Dùng với go, buy, like, eat, drink, study, work, play, watch, read, live.",
        example: "Does she study English?",
        exampleVi: "Cô ấy có học tiếng Anh không?",
        context: "I/you/we/they dùng do; he/she/it dùng does; sau does động từ không thêm s/es.",
        commonMistake: "Sai: Does she goes to school? | Đúng: Does she go to school?"
      },
      {
        num: 3,
        pattern: "Wh-word + be/do/does + S + ...?",
        vi: "What, Where, When, Who, Why, How, How much, How many, What time",
        style: "Dùng để hỏi thông tin cụ thể: cái gì, ở đâu, khi nào, ai, tại sao, như thế nào, bao nhiêu.",
        example: "What time do you get up?",
        exampleVi: "Bạn thức dậy lúc mấy giờ?",
        context: "Chọn Wh-word theo loại thông tin cần hỏi, sau đó dùng đúng BE hoặc DO/DOES.",
        commonMistake: "Sai: Where you buy food? | Đúng: Where do you buy food?"
      },
      {
        num: 4,
        pattern: "and / but / or / because / so / then / after that",
        vi: "Từ nối cơ bản",
        style: "Nối câu đơn để nói dài hơn nhưng vẫn rõ ý.",
        example: "I go to the supermarket because I need food.",
        exampleVi: "Tôi đi siêu thị vì tôi cần đồ ăn.",
        context: "and nối cùng chiều; but nối trái ngược; because nêu lý do; so nêu kết quả; then/after that kể trình tự.",
        commonMistake: "Không dùng because và so cùng một ý trong câu A1 đơn giản."
      },
      {
        num: 5,
        pattern: "in / on / at / to / from / with / for / by / near / next to / between / under / behind / in front of",
        vi: "Giới từ thời gian, nơi chốn, vị trí, hướng đi",
        style: "Dùng để nói thời gian, vị trí, nơi đến, người đi cùng, mục đích và phương tiện.",
        example: "I go to school by bike because my school is near my house.",
        exampleVi: "Tôi đi học bằng xe đạp vì trường gần nhà tôi.",
        context: "at six, in the evening, on Sunday; in my bag, on the table, at home; to school, from Vietnam, with my mother, for dinner, by bus.",
        commonMistake: "Sai: I wake up in six. | Đúng: I wake up at six."
      }
    ],
    sections: [
      {
        title: "A. Cách đặt câu hỏi với BE: am / is / are",
        intro: "Dùng khi hỏi về tên, tuổi, nghề nghiệp, tính chất, vị trí hoặc trạng thái.",
        formula: "Am / Is / Are + S + ...?",
        tables: [
          {
            headers: ["Câu khẳng định", "Câu hỏi", "Trả lời ngắn"],
            rows: [
              ["I am busy.", "Are you busy?", "Yes, I am. / No, I'm not."],
              ["She is at home.", "Is she at home?", "Yes, she is. / No, she isn't."],
              ["They are students.", "Are they students?", "Yes, they are. / No, they aren't."],
              ["The book is on the table.", "Is the book on the table?", "Yes, it is. / No, it isn't."],
              ["The shops are open.", "Are the shops open?", "Yes, they are. / No, they aren't."]
            ]
          }
        ],
        examples: [
          { en: "Are you a student?", vi: "Bạn có phải là học sinh không?" },
          { en: "Is he your brother?", vi: "Anh ấy có phải anh trai bạn không?" },
          { en: "Is the supermarket near your house?", vi: "Siêu thị có gần nhà bạn không?" },
          { en: "Are your books in your bag?", vi: "Sách của bạn có ở trong cặp không?" },
          { en: "Are you free on Sunday?", vi: "Bạn có rảnh vào Chủ nhật không?" }
        ],
        mistakes: [
          { wrong: "You are busy?", right: "Are you busy?" },
          { wrong: "Is you at home?", right: "Are you at home?" },
          { wrong: "Are she a teacher?", right: "Is she a teacher?" }
        ]
      },
      {
        title: "B. Cách đặt câu hỏi với DO / DOES",
        intro: "Dùng do/does khi câu có động từ thường như go, buy, like, eat, drink, study, work, play, watch, read, live.",
        formula: "Do / Does + S + V nguyên mẫu + ...?",
        tables: [
          {
            headers: ["Chủ ngữ", "Trợ động từ", "Ví dụ"],
            rows: [
              ["I / you / we / they", "do", "Do you study English?"],
              ["he / she / it", "does", "Does she study English?"]
            ]
          },
          {
            headers: ["Câu hỏi", "Nghĩa", "Trả lời ngắn"],
            rows: [
              ["Do you wake up early?", "Bạn có thức dậy sớm không?", "Yes, I do."],
              ["Do you go shopping on Sunday?", "Bạn có đi mua sắm vào Chủ nhật không?", "No, I don't."],
              ["Do they eat rice every day?", "Họ có ăn cơm mỗi ngày không?", "Yes, they do."],
              ["Does your mother go to the market?", "Mẹ bạn có đi chợ không?", "Yes, she does."],
              ["Does he drink coffee?", "Anh ấy có uống cà phê không?", "No, he doesn't."],
              ["Does this shop sell clothes?", "Cửa hàng này có bán quần áo không?", "Yes, it does."]
            ]
          }
        ],
        mistakes: [
          { wrong: "Does she goes to school?", right: "Does she go to school?" },
          { wrong: "Do he like coffee?", right: "Does he like coffee?" },
          { wrong: "You like noodles?", right: "Do you like noodles?" },
          { wrong: "Does they go shopping?", right: "Do they go shopping?" }
        ]
      },
      {
        title: "C. Wh-questions: What / Where / When / Who / Why / How",
        formula: "Wh-word + am/is/are + S...? | Wh-word + do/does + S + V nguyên mẫu...?",
        tables: [
          {
            headers: ["Wh-word", "Dùng để hỏi", "Ví dụ"],
            rows: [
              ["What", "cái gì / nghề gì / tên gì", "What is your name?"],
              ["Where", "ở đâu", "Where is the supermarket?"],
              ["When", "khi nào", "When is your English class?"],
              ["Who", "ai", "Who is your teacher?"],
              ["Why", "tại sao", "Why are you busy?"],
              ["How", "như thế nào", "How are you?"]
            ]
          },
          {
            headers: ["Câu hỏi", "Nghĩa"],
            rows: [
              ["What do you do every morning?", "Bạn làm gì mỗi sáng?"],
              ["Where do you buy food?", "Bạn mua đồ ăn ở đâu?"],
              ["When do you do homework?", "Bạn làm bài tập khi nào?"],
              ["Who do you go shopping with?", "Bạn đi mua sắm với ai?"],
              ["Why do you study English?", "Tại sao bạn học tiếng Anh?"],
              ["How do you go to school?", "Bạn đi học bằng cách nào?"],
              ["What does she eat for breakfast?", "Cô ấy ăn gì vào bữa sáng?"],
              ["Where does he live?", "Anh ấy sống ở đâu?"],
              ["When does the shop open?", "Cửa hàng mở cửa khi nào?"]
            ]
          },
          {
            headers: ["Mẫu hỏi", "Cách dùng", "Ví dụ"],
            rows: [
              ["What time...?", "hỏi giờ", "What time do you get up?"],
              ["How much...?", "hỏi giá / lượng không đếm được", "How much is this bag?"],
              ["How many...?", "hỏi số lượng đếm được", "How many apples do you buy?"],
              ["How often...?", "hỏi tần suất", "How often do you go shopping?"],
              ["What kind of...?", "hỏi loại gì", "What kind of food do you like?"],
              ["Which...?", "hỏi cái nào", "Which bag do you want?"]
            ]
          },
          {
            headers: ["Câu hỏi", "Khung trả lời", "Ví dụ trả lời"],
            rows: [
              ["What time do you get up?", "I get up at + giờ.", "I get up at six."],
              ["Where do you buy food?", "I buy food at + nơi.", "I buy food at the supermarket."],
              ["When do you study English?", "I study English + thời gian.", "I study English in the evening."],
              ["Who do you go with?", "I go with + người.", "I go with my mother."],
              ["Why do you study English?", "Because I want to + V.", "Because I want to speak English."],
              ["How do you go to school?", "I go to school by + phương tiện.", "I go to school by bike."]
            ]
          }
        ],
        examples: [
          { en: "Where are you now?", vi: "Bây giờ bạn đang ở đâu?" },
          { en: "What is your favorite food?", vi: "Món ăn yêu thích của bạn là gì?" },
          { en: "Who is at home?", vi: "Ai đang ở nhà?" },
          { en: "Why is she tired?", vi: "Tại sao cô ấy mệt?" },
          { en: "How old are you?", vi: "Bạn bao nhiêu tuổi?" }
        ]
      },
      {
        title: "D. Từ nối cơ bản",
        intro: "Từ nối giúp học viên nói dài hơn, tự nhiên hơn. Không cần câu phức tạp, chỉ cần nối câu đơn thật chắc.",
        subsections: [
          {
            title: "AND = và",
            examples: ["I eat rice and drink water.", "I go to school and study English.", "My bag is black and blue.", "I buy apples and milk."]
          },
          {
            title: "BUT = nhưng",
            examples: ["I like coffee, but I don't drink it every day.", "The bag is beautiful, but it is expensive.", "I want to go shopping, but I am busy.", "She can speak English, but she is shy."]
          },
          {
            title: "OR = hoặc",
            examples: ["Do you want tea or coffee?", "You can buy apples or bananas.", "Do you study in the morning or in the evening?", "Is the shop near the school or near the market?"]
          },
          {
            title: "BECAUSE = bởi vì",
            examples: ["I study English because I want to speak better.", "I go to the supermarket because I need food.", "She is tired because she works a lot.", "I don't buy this bag because it is expensive."]
          },
          {
            title: "SO = vì vậy / nên",
            examples: ["I am hungry, so I eat noodles.", "It is late, so I go home.", "The bag is cheap, so I buy it.", "I am busy, so I don't go shopping."]
          },
          {
            title: "THEN / AFTER THAT = sau đó",
            examples: ["I wake up, then I brush my teeth.", "I have breakfast, then I go to school.", "I get up at six. After that, I wash my face.", "I go shopping on Sunday. After that, I go home."]
          }
        ],
        examples: [
          {
            en: "Every morning, I wake up at six and brush my teeth. Then I have breakfast. I go to school by bike because my school is near my house. In the evening, I do homework, but I don't watch TV. After that, I go to bed at ten.",
            vi: "Bài mẫu nói ngắn dùng từ nối."
          }
        ]
      },
      {
        title: "E. Giới từ cơ bản cho A1",
        subsections: [
          {
            title: "Giới từ thời gian: in / on / at",
            tables: [
              {
                headers: ["Giới từ", "Dùng với", "Ví dụ"],
                rows: [
                  ["in", "buổi, tháng, năm", "in the morning, in May, in 2026"],
                  ["on", "ngày, thứ", "on Monday, on Sunday, on the weekend"],
                  ["at", "giờ, thời điểm cụ thể", "at six, at night, at noon"]
                ]
              }
            ],
            examples: ["I wake up at six.", "I study English in the evening.", "I go shopping on Sunday.", "I have lunch at noon.", "I play football on the weekend."],
            mistakes: [
              { wrong: "I wake up in six.", right: "I wake up at six." },
              { wrong: "I go shopping in Sunday.", right: "I go shopping on Sunday." },
              { wrong: "I study English at the evening.", right: "I study English in the evening." }
            ]
          },
          {
            title: "Giới từ nơi chốn: in / on / at",
            tables: [
              {
                headers: ["Giới từ", "Dùng với", "Ví dụ"],
                rows: [
                  ["in", "bên trong không gian", "in my bag, in the room, in the city"],
                  ["on", "ở trên bề mặt", "on the table, on the wall"],
                  ["at", "tại một điểm/địa điểm", "at home, at school, at the supermarket"]
                ]
              }
            ],
            examples: ["My book is in my bag.", "The phone is on the table.", "I am at home.", "She studies at school.", "They live in Ho Chi Minh City."]
          },
          {
            title: "Giới từ vị trí",
            tables: [
              {
                headers: ["Giới từ", "Nghĩa", "Ví dụ"],
                rows: [
                  ["near", "gần", "The supermarket is near my house."],
                  ["next to", "bên cạnh", "The café is next to the bank."],
                  ["between", "ở giữa 2 vật/nơi", "The shop is between the bank and the café."],
                  ["under", "ở dưới", "My bag is under the table."],
                  ["behind", "phía sau", "The park is behind the school."],
                  ["in front of", "phía trước", "The bus stop is in front of the school."]
                ]
              }
            ],
            examples: ["Where is your bag? It is under the table.", "Where is the bank? It is next to the supermarket.", "Is the park behind the school? Yes, it is.", "Is your house near the market? No, it isn't."]
          },
          {
            title: "Giới từ hướng đi / người đi cùng / mục đích",
            tables: [
              {
                headers: ["Giới từ", "Nghĩa", "Ví dụ"],
                rows: [
                  ["to", "đến", "I go to school."],
                  ["from", "từ", "I come from Vietnam."],
                  ["with", "với", "I go shopping with my mother."],
                  ["for", "cho / để / cho bữa", "I have bread for breakfast."],
                  ["by", "bằng phương tiện", "I go to school by bike."]
                ]
              }
            ],
            examples: ["I go to the supermarket.", "I come from Vietnam.", "I go shopping with my sister.", "I buy food for dinner.", "I go to school by bus."]
          }
        ]
      },
      {
        title: "F. Ghép 3 phần: câu hỏi + từ nối + giới từ",
        examples: [
          { en: "Where do you go on Sunday? I go to the supermarket on Sunday because I need food.", vi: "Hỏi Where + giới từ on + because." },
          { en: "What time do you get up? I get up at six, then I brush my teeth and have breakfast.", vi: "Hỏi What time + at + then/and." },
          { en: "Where is your school? My school is near my house, so I go to school by bike.", vi: "Hỏi Where + near + so + by." },
          { en: "Do you like this bag? I like this bag because it is cheap and beautiful.", vi: "Hỏi Do + because + and." }
        ]
      }
    ],
    commonQA: [
      { q: "What time do you wake up?", a: "I wake up at six." },
      { q: "Do you have breakfast at home?", a: "Yes, I do." },
      { q: "Where do you buy food?", a: "I buy food at the supermarket." },
      { q: "Who do you go shopping with?", a: "I go shopping with my mother." },
      { q: "Why do you study English?", a: "Because I want to speak better." },
      { q: "How do you go to school?", a: "I go to school by bike." },
      { q: "How much is this bag?", a: "It is 50,000 dong." },
      { q: "How many apples do you buy?", a: "I buy three apples." },
      { q: "Where is your phone?", a: "It is on the table." }
    ]
  },
  translation: {
    title: "Luyện dịch: Anh ↔ Việt + đặt câu hỏi + nối câu",
    instruction: "Làm lần lượt Anh → Việt, Việt → Anh, đổi câu thành câu hỏi và nối câu. Bấm kiểm tra để xem đáp án gợi ý trong MD.",
    sentences: [
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "What time do you wake up every day?", vi: "Bạn thức dậy lúc mấy giờ mỗi ngày?" },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "I wake up at six and brush my teeth.", vi: "Tôi thức dậy lúc sáu giờ và đánh răng." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "Do you have breakfast at home?", vi: "Bạn có ăn sáng ở nhà không?" },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "She goes to school by bus.", vi: "Cô ấy đi học bằng xe buýt." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "Where do you buy food?", vi: "Bạn mua đồ ăn ở đâu?" },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "I buy food at the supermarket.", vi: "Tôi mua đồ ăn ở siêu thị." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "The supermarket is near my house.", vi: "Siêu thị ở gần nhà tôi." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "Is your phone on the table?", vi: "Điện thoại của bạn ở trên bàn phải không?" },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "My book is in my bag.", vi: "Sách của tôi ở trong cặp." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "I go shopping on Sunday with my mother.", vi: "Tôi đi mua sắm vào Chủ nhật với mẹ tôi." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "I don't buy this bag because it is expensive.", vi: "Tôi không mua cái túi này vì nó đắt." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "The bag is cheap, so I buy it.", vi: "Cái túi rẻ, nên tôi mua nó." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "Do you drink coffee in the morning?", vi: "Bạn có uống cà phê vào buổi sáng không?" },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "I study English in the evening.", vi: "Tôi học tiếng Anh vào buổi tối." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "What do you do after school?", vi: "Bạn làm gì sau giờ học?" },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "I do homework, then I watch TV.", vi: "Tôi làm bài tập về nhà, sau đó tôi xem TV." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "Where is the bus stop?", vi: "Trạm xe buýt ở đâu?" },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "The bus stop is in front of the school.", vi: "Trạm xe buýt ở trước trường học." },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "Does your sister like noodles?", vi: "Em gái/chị gái của bạn có thích mì không?" },
      { direction: "en-vi", label: "Dịch Anh → Việt:", en: "She likes noodles, but she doesn't like coffee.", vi: "Cô ấy thích mì, nhưng cô ấy không thích cà phê." },

      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Bạn thức dậy lúc mấy giờ?", en: "What time do you wake up?" },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi thức dậy lúc 6 giờ.", en: "I wake up at six." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Bạn có ăn sáng ở nhà không?", en: "Do you have breakfast at home?" },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi ăn sáng ở nhà và đi học lúc 7 giờ.", en: "I have breakfast at home and go to school at seven." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Bạn đi học bằng gì?", en: "How do you go to school?" },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi đi học bằng xe đạp.", en: "I go to school by bike." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Bạn mua đồ ăn ở đâu?", en: "Where do you buy food?" },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi mua đồ ăn ở chợ.", en: "I buy food at the market." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Siêu thị ở gần nhà tôi.", en: "The supermarket is near my house." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Cái túi ở trên bàn.", en: "The bag is on the table." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Sách của tôi ở trong cặp.", en: "My book is in my bag." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi đi mua sắm vào Chủ nhật với mẹ tôi.", en: "I go shopping on Sunday with my mother." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi thích cái áo này nhưng nó đắt.", en: "I like this shirt, but it is expensive." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi không uống cà phê vì tôi không thích cà phê.", en: "I don't drink coffee because I don't like coffee." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Cô ấy học tiếng Anh vào buổi tối.", en: "She studies English in the evening." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Anh ấy có làm bài tập về nhà vào ban đêm không?", en: "Does he do homework at night?" },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Cửa hàng này có bán quần áo không?", en: "Does this shop sell clothes?" },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Ngân hàng ở bên cạnh quán cà phê.", en: "The bank is next to the café." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Công viên ở sau trường học.", en: "The park is behind the school." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi đói, nên tôi ăn mì.", en: "I am hungry, so I eat noodles." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Bạn học tiếng Anh khi nào?", en: "When do you study English?" },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Bạn đi mua sắm với ai?", en: "Who do you go shopping with?" },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tại sao bạn học tiếng Anh?", en: "Why do you study English?" },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi học tiếng Anh vì tôi muốn nói tốt hơn.", en: "I study English because I want to speak better." },
      { direction: "vi-en", label: "Dịch Việt → Anh:", vi: "Tôi thức dậy, sau đó tôi rửa mặt.", en: "I wake up, then I wash my face." },

      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "You wake up at six.", answerText: "Do you wake up at six?" },
      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "She goes to school by bus.", answerText: "Does she go to school by bus?" },
      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "They buy food at the supermarket.", answerText: "Do they buy food at the supermarket?" },
      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "He drinks milk in the morning.", answerText: "Does he drink milk in the morning?" },
      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "The book is on the table.", answerText: "Is the book on the table?" },
      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "The café is next to the bank.", answerText: "Is the café next to the bank?" },
      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "You study English in the evening.", answerText: "Do you study English in the evening?" },
      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "My mother goes to the market on Sunday.", answerText: "Does your mother go to the market on Sunday?" },
      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "This bag is expensive.", answerText: "Is this bag expensive?" },
      { direction: "custom", label: "Đổi thành câu hỏi:", prompt: "He likes noodles.", answerText: "Does he like noodles?" },

      { direction: "custom", label: "Nối câu:", prompt: "I wake up at six. I brush my teeth.", answerText: "I wake up at six and brush my teeth." },
      { direction: "custom", label: "Nối câu:", prompt: "I like this bag. It is expensive.", answerText: "I like this bag, but it is expensive." },
      { direction: "custom", label: "Nối câu:", prompt: "I go to the supermarket. I need food.", answerText: "I go to the supermarket because I need food." },
      { direction: "custom", label: "Nối câu:", prompt: "I am hungry. I eat noodles.", answerText: "I am hungry, so I eat noodles." },
      { direction: "custom", label: "Nối câu:", prompt: "I have breakfast. I go to school.", answerText: "I have breakfast, then I go to school." },
      { direction: "custom", label: "Nối câu:", prompt: "She likes tea. She doesn't like coffee.", answerText: "She likes tea, but she doesn't like coffee." },
      { direction: "custom", label: "Nối câu:", prompt: "The shop is near my house. I walk there.", answerText: "The shop is near my house, so I walk there." },
      { direction: "custom", label: "Nối câu:", prompt: "I study English. I want to speak better.", answerText: "I study English because I want to speak better." },
      { direction: "custom", label: "Nối câu:", prompt: "He is busy. He doesn't go shopping.", answerText: "He is busy, so he doesn't go shopping." },
      { direction: "custom", label: "Nối câu:", prompt: "I do homework. I go to bed.", answerText: "I do homework. After that, I go to bed." }
    ]
  },
  speaking: {
    title: "Luyện nói AI - Questions, short answers and better answers",
    formula: "Trả lời câu ngắn trước, sau đó nói câu dài hơn bằng từ nối và giới từ.",
    turns: [
      { group: "Daily routine questions", ai: { textEn: "What time do you wake up?", textVn: "Bạn thức dậy lúc mấy giờ?" }, user: { formula: "Short answer → better answer", shortAnswer: "I wake up at six.", sampleEn: "I wake up at six, then I brush my teeth.", sampleVn: "Tôi thức dậy lúc sáu giờ, sau đó tôi đánh răng.", criteria } },
      { group: "Daily routine questions", ai: { textEn: "Do you have breakfast at home?", textVn: "Bạn có ăn sáng ở nhà không?" }, user: { formula: "Yes/No answer → add place/person", shortAnswer: "Yes, I do.", sampleEn: "Yes, I have breakfast at home with my family.", sampleVn: "Có, tôi ăn sáng ở nhà với gia đình.", criteria } },
      { group: "Daily routine questions", ai: { textEn: "How do you go to school?", textVn: "Bạn đi học bằng gì?" }, user: { formula: "By + vehicle → full sentence with because", shortAnswer: "By bike.", sampleEn: "I go to school by bike because my school is near my house.", sampleVn: "Tôi đi học bằng xe đạp vì trường gần nhà tôi.", criteria } },
      { group: "Daily routine questions", ai: { textEn: "When do you study English?", textVn: "Bạn học tiếng Anh khi nào?" }, user: { formula: "Time phrase → full sentence", shortAnswer: "In the evening.", sampleEn: "I study English in the evening after dinner.", sampleVn: "Tôi học tiếng Anh vào buổi tối sau bữa tối.", criteria } },
      { group: "Daily routine questions", ai: { textEn: "What do you do at night?", textVn: "Bạn làm gì vào ban đêm?" }, user: { formula: "Action → action + then", shortAnswer: "I do homework.", sampleEn: "I do homework at night, then I go to bed.", sampleVn: "Tôi làm bài tập vào ban đêm, sau đó tôi đi ngủ.", criteria } },
      { group: "Shopping questions", ai: { textEn: "Do you go shopping on the weekend?", textVn: "Bạn có đi mua sắm vào cuối tuần không?" }, user: { formula: "Yes/No answer → add time/person", shortAnswer: "Yes, I do.", sampleEn: "Yes, I go shopping on Sunday with my mother.", sampleVn: "Có, tôi đi mua sắm vào Chủ nhật với mẹ tôi.", criteria } },
      { group: "Shopping questions", ai: { textEn: "Where do you buy food?", textVn: "Bạn mua đồ ăn ở đâu?" }, user: { formula: "Place → full sentence with because", shortAnswer: "At the market.", sampleEn: "I buy food at the market because it is cheap.", sampleVn: "Tôi mua đồ ăn ở chợ vì nó rẻ.", criteria } },
      { group: "Shopping questions", ai: { textEn: "What do you buy at the supermarket?", textVn: "Bạn mua gì ở siêu thị?" }, user: { formula: "Item → list with and", shortAnswer: "I buy milk.", sampleEn: "I buy milk, bread and apples at the supermarket.", sampleVn: "Tôi mua sữa, bánh mì và táo ở siêu thị.", criteria } },
      { group: "Shopping questions", ai: { textEn: "Do you like this bag?", textVn: "Bạn có thích cái túi này không?" }, user: { formula: "Yes/No answer → because", shortAnswer: "Yes, I do.", sampleEn: "Yes, I like this bag because it is beautiful.", sampleVn: "Có, tôi thích cái túi này vì nó đẹp.", criteria } },
      { group: "Shopping questions", ai: { textEn: "Is it expensive?", textVn: "Nó có đắt không?" }, user: { formula: "No + full correction", shortAnswer: "No, it isn't.", sampleEn: "No, it isn't expensive. It is cheap.", sampleVn: "Không, nó không đắt. Nó rẻ.", criteria } },
      { group: "Places and prepositions", ai: { textEn: "Where is your book?", textVn: "Sách của bạn ở đâu?" }, user: { formula: "It is + preposition + place.", shortAnswer: "It is in my bag.", sampleEn: "It is in my bag.", sampleVn: "Nó ở trong cặp của tôi.", criteria } },
      { group: "Places and prepositions", ai: { textEn: "Where is your phone?", textVn: "Điện thoại của bạn ở đâu?" }, user: { formula: "It is + preposition + place.", shortAnswer: "It is on the table.", sampleEn: "It is on the table.", sampleVn: "Nó ở trên bàn.", criteria } },
      { group: "Places and prepositions", ai: { textEn: "Where is the supermarket?", textVn: "Siêu thị ở đâu?" }, user: { formula: "It is + preposition + place.", shortAnswer: "It is near my house.", sampleEn: "It is near my house.", sampleVn: "Nó ở gần nhà tôi.", criteria } },
      { group: "Places and prepositions", ai: { textEn: "Where is the bus stop?", textVn: "Trạm xe buýt ở đâu?" }, user: { formula: "It is + preposition + place.", shortAnswer: "It is in front of the school.", sampleEn: "It is in front of the school.", sampleVn: "Nó ở trước trường học.", criteria } },
      { group: "Places and prepositions", ai: { textEn: "Where is the café?", textVn: "Quán cà phê ở đâu?" }, user: { formula: "It is + preposition + place.", shortAnswer: "It is next to the bank.", sampleEn: "It is next to the bank.", sampleVn: "Nó ở bên cạnh ngân hàng.", criteria } },
      { group: "Places and prepositions", ai: { textEn: "Where is the park?", textVn: "Công viên ở đâu?" }, user: { formula: "It is + preposition + place.", shortAnswer: "It is behind the school.", sampleEn: "It is behind the school.", sampleVn: "Nó ở sau trường học.", criteria } },
      { group: "Places and prepositions", ai: { textEn: "Where is your bag?", textVn: "Cặp của bạn ở đâu?" }, user: { formula: "It is + preposition + place.", shortAnswer: "It is under the table.", sampleEn: "It is under the table.", sampleVn: "Nó ở dưới bàn.", criteria } }
    ],
    challenges: [
      {
        title: "Topic 1: My morning",
        questions: ["What time do you wake up?", "What do you do after that?", "What do you have for breakfast?", "How do you go to school?", "Where is your school?", "Why do you study English?"],
        sample: "I wake up at six. After that, I brush my teeth and wash my face. I have bread and milk for breakfast. I go to school by bike because my school is near my house. I study English because I want to speak better."
      },
      {
        title: "Topic 2: Shopping",
        questions: ["Do you go shopping on the weekend?", "Who do you go with?", "Where do you go shopping?", "What do you buy?", "Is it cheap or expensive?", "Why do you buy it?"],
        sample: "I go shopping on Sunday with my mother. We go to the supermarket near my house. I buy milk, bread and apples. The food is cheap, so I buy a lot. I like shopping because it is fun."
      },
      {
        title: "Topic 3: My room / My things",
        questions: ["Where is your bag?", "Where is your phone?", "Where are your books?", "Is your room big or small?", "What do you do in your room?", "Do you study English in your room?"],
        sample: "My bag is under the table. My phone is on the desk. My books are in my bag. My room is small, but it is clean. I do homework in my room. I study English in the evening."
      }
    ],
    feedbackRubric: [
      { criteria: "Question form", check: "Có dùng đúng be / do / does không?" },
      { criteria: "Preposition", check: "Có dùng đúng in / on / at / to / with / by không?" },
      { criteria: "Linking words", check: "Có dùng and / but / because / so / then không?" },
      { criteria: "Fluency", check: "Nói được câu ngắn, rõ, không cần quá nhanh." }
    ]
  },
  minitest: [
    { q: "What time ___ you wake up?", options: ["are", "do", "does", "is"], answer: 1, explanation: "Với chủ ngữ “you” và động từ thường “wake up”, dùng “do”." },
    { q: "___ she go to school by bus?", options: ["Do", "Does", "Is", "Are"], answer: 1, explanation: "“She” đi với “does”. Động từ chính giữ nguyên “go”." },
    { q: "Where ___ the supermarket?", options: ["do", "does", "is", "are"], answer: 2, explanation: "Hỏi vị trí với danh từ số ít “the supermarket”, dùng “is”." },
    { q: "I study English ___ the evening.", options: ["at", "on", "in", "to"], answer: 2, explanation: "Dùng “in the evening”." },
    { q: "I go shopping ___ Sunday.", options: ["in", "on", "at", "by"], answer: 1, explanation: "Dùng “on” với ngày/thứ." },
    { q: "My phone is ___ the table.", options: ["on", "at", "to", "from"], answer: 0, explanation: "“On the table” = ở trên bàn." },
    { q: "I go to school ___ bike.", options: ["to", "with", "by", "for"], answer: 2, explanation: "Dùng “by” với phương tiện: by bike, by bus." },
    { q: "I like this bag, ___ it is expensive.", options: ["and", "but", "so", "then"], answer: 1, explanation: "Hai ý trái ngược dùng “but”." },
    { q: "I am hungry, ___ I eat noodles.", options: ["because", "but", "so", "or"], answer: 2, explanation: "“Đói nên ăn mì” → kết quả dùng “so”." },
    { q: "I study English ___ I want to speak better.", options: ["because", "so", "but", "or"], answer: 0, explanation: "Nói lý do dùng “because”." },
    { q: "___ do you buy food? — At the market.", options: ["What", "Where", "When", "Who"], answer: 1, explanation: "“At the market” là địa điểm, dùng “Where”." },
    { q: "___ do you go shopping with? — My mother.", options: ["Who", "What", "Where", "How"], answer: 0, explanation: "Hỏi người đi cùng dùng “Who”." },
    { q: "How many apples do you ___?", options: ["buys", "buying", "buy", "bought"], answer: 2, explanation: "Sau “do” dùng động từ nguyên mẫu." },
    { q: "Does he ___ coffee?", options: ["drinks", "drink", "drinking", "is drink"], answer: 1, explanation: "Sau “does” dùng động từ nguyên mẫu." },
    { q: "The bus stop is ___ front of the school.", options: ["in", "on", "at", "to"], answer: 0, explanation: "Cụm đúng là “in front of”." },
    { q: "The café is next ___ the bank.", options: ["at", "to", "in", "on"], answer: 1, explanation: "Cụm đúng là “next to”." },
    { q: "I wake up at six. ___, I brush my teeth.", options: ["But", "Because", "After that", "Or"], answer: 2, explanation: "Kể hành động tiếp theo dùng “After that”." },
    { q: "Do you want tea ___ coffee?", options: ["but", "or", "because", "so"], answer: 1, explanation: "Đưa lựa chọn dùng “or”." },
    { q: "Are you ___ home now?", options: ["in", "on", "at", "to"], answer: 2, explanation: "Cụm đúng là “at home”." },
    { q: "My books are ___ my bag.", options: ["in", "on", "at", "by"], answer: 0, explanation: "Sách ở bên trong cặp → “in my bag”." }
  ],
  mindmap: {
    type: "structured",
    center: "QUESTION FORMS + LINKING WORDS + PREPOSITIONS",
    branches: [
      {
        icon: "❓",
        label: "Ask questions",
        sub: "BE, DO/DOES, Wh-questions",
        items: [
          "BE: Are you busy? / Is she at home? / Are they students? / Is the book on the table?",
          "DO/DOES: Do you study English? / Do they go shopping? / Does she like noodles? / Does he drink coffee?",
          "Wh: What do you do? / Where do you buy food? / When do you study English? / Who do you go with? / Why do you learn English? / How do you go to school?"
        ]
      },
      {
        icon: "🔗",
        label: "Linking words",
        sub: "Nối câu đơn",
        items: ["and = và", "but = nhưng", "or = hoặc", "because = bởi vì", "so = nên / vì vậy", "then = sau đó", "after that = sau đó"]
      },
      {
        icon: "📍",
        label: "Prepositions",
        sub: "Time, place, position, movement",
        items: [
          "Time: at six, at night, in the morning, in the evening, on Monday, on Sunday",
          "Place: in my bag, on the table, at home, at school",
          "Position: near my house, next to the bank, between the bank and the café, under the table, behind the school, in front of the school",
          "Movement / other: go to school, come from Vietnam, go with my mother, buy food for dinner, go by bike"
        ]
      },
      {
        icon: "🎤",
        label: "Speaking frame",
        sub: "Question → Short answer → Better answer",
        items: [
          "Question: What time do you wake up?",
          "Short answer: I wake up at six.",
          "Better answer: I wake up at six, then I brush my teeth and have breakfast."
        ]
      }
    ]
  },
  homeworkRich: {
    title: "Bài tập về nhà - Buổi 31",
    submit: "Nộp bài qua nhóm lớp",
    deadline: "Trước buổi học tiếp theo",
    tasks: [
      {
        icon: "✏️",
        title: "Homework 1: Viết 10 câu hỏi",
        badge: "Bắt buộc",
        desc: "Viết 10 câu hỏi bằng tiếng Anh.",
        items: [
          "3 câu hỏi với be",
          "3 câu hỏi với do/does",
          "4 câu hỏi với Wh-questions",
          "Gợi ý chủ đề: daily routine, shopping, food, school, places near your house"
        ]
      },
      {
        icon: "🌏",
        title: "Homework 2: Dịch 15 câu",
        badge: "Bắt buộc",
        desc: "Dịch sang tiếng Anh.",
        items: [
          "Bạn thức dậy lúc mấy giờ?",
          "Tôi học tiếng Anh vào buổi tối.",
          "Bạn có đi mua sắm vào Chủ nhật không?",
          "Tôi đi siêu thị với mẹ tôi.",
          "Siêu thị ở gần nhà tôi.",
          "Điện thoại của tôi ở trên bàn.",
          "Sách của tôi ở trong cặp.",
          "Tôi thích cái túi này nhưng nó đắt.",
          "Tôi mua đồ ăn vì tôi đói.",
          "Tôi đói, nên tôi ăn mì.",
          "Cô ấy có uống cà phê không?",
          "Anh ấy đi học bằng xe buýt.",
          "Trạm xe buýt ở trước trường học.",
          "Quán cà phê ở bên cạnh ngân hàng.",
          "Tôi thức dậy, sau đó tôi đánh răng."
        ]
      },
      {
        icon: "🎙️",
        title: "Homework 3: Speaking recording",
        badge: "Bắt buộc",
        desc: "Ghi âm 1 đoạn nói 45-60 giây theo 1 trong 2 chủ đề.",
        items: [
          "Bắt buộc dùng ít nhất 2 câu hỏi tự đặt rồi tự trả lời.",
          "Bắt buộc dùng ít nhất 3 giới từ.",
          "Bắt buộc dùng ít nhất 3 từ nối.",
          "Topic A: My daily routine",
          "Topic B: Shopping"
        ],
        sample: "Topic A: What time do I wake up? I wake up at six. I brush my teeth and have breakfast. Then I go to school by bike because my school is near my house. In the evening, I do homework and study English.\n\nTopic B: Do I go shopping on Sunday? Yes, I do. I go to the supermarket with my mother. The supermarket is near my house. I buy milk, bread and apples because I need food. The food is cheap, so I buy a lot.",
        showSample: true
      },
      {
        icon: "✅",
        title: "Homework 4: Tự sửa lỗi",
        badge: "Tự kiểm tra",
        desc: "Sau khi làm bài, học viên tự kiểm tra 5 lỗi sau.",
        items: [
          "Câu hỏi có đảo be lên đầu chưa?",
          "Câu hỏi động từ thường có dùng do/does chưa?",
          "Sau does, động từ đã về nguyên mẫu chưa?",
          "Dùng đúng in / on / at chưa?",
          "Có dùng ít nhất 3 từ nối để câu dài hơn chưa?"
        ]
      }
    ]
  },
  homework: [
    "Viết 10 câu hỏi bằng tiếng Anh: 3 câu với be, 3 câu với do/does, 4 câu Wh-questions.",
    "Dịch 15 câu trong Homework 2 sang tiếng Anh.",
    "Ghi âm 45-60 giây theo Topic A hoặc Topic B, dùng ít nhất 2 câu hỏi, 3 giới từ và 3 từ nối.",
    "Tự kiểm tra 5 lỗi: đảo be, dùng do/does, động từ sau does, in/on/at, ít nhất 3 từ nối."
  ],
  technicalNotes: [
    "Buổi 31 dùng lessonArchitectureV1 với sectionFlow riêng gồm 8 mục theo MD.",
    "Không thêm video/audio/dialogue game/listening game cho Buổi 31.",
    "Flashcard là review_only, chỉ ôn từ vựng cũ từ các buổi trước."
  ]
};
