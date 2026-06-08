import {
  canonicalLessonSections,
  ensureLessonRange,
  lessonArchitectureV1,
  normalizeLessonToBuoi9Architecture,
  validateLessonArchitecture
} from "./lessonArchitecture.js";
import { LESSON_31_IMPORTED_TEMPLATE } from "./legacyLesson31Data.js";

// ===============================================
// DỮ LIỆU 31 BUỔI HỌC - GATEWAY TO THE WORLD A1
// Enhanced: highlights, formulas, context listenings
// ===============================================

export const LESSONS = [
  {
    "id": 2,
    "unit": "Unit 1",
    "title": "Quoc tich & Dong tu to be",
    "subtitle": "All about me - Part 1",
    "objectives": [
      "Hoc tu vung ve quoc gia va quoc tich",
      "Su dung dong tu to be o dang khang dinh va phu dinh",
      "Gioi thieu ban than va mo ta nguoi khac"
    ],
    "speaking": {
      "title": "Luyen noi mo ta ban than va nguoi khac",
      "instruction": "Trả lời từng tin nhắn của AI. Có thể bật/tắt Công thức và Mẫu gợi ý ở bước cập nhật component.",
      "turns": [
        {
          "id": 1,
          "ai": {
            "textEn": "Describe yourself. Are you young or old?",
            "textVn": "Hãy mô tả bạn. Bạn trẻ hay lớn tuổi?",
            "audioUrl": "Describe yourself. Are you young or old?"
          },
          "user": {
            "formula": "I am ___. / I am ___ and ___.",
            "sampleEn": "I am young and friendly.",
            "sampleVn": "Tôi trẻ và thân thiện.",
            "sampleAudioUrl": "I am young and friendly."
          }
        },
        {
          "id": 2,
          "ai": {
            "textEn": "Describe your height.",
            "textVn": "Hãy mô tả chiều cao của bạn.",
            "audioUrl": "Describe your height."
          },
          "user": {
            "formula": "I am ___.",
            "sampleEn": "I am tall.",
            "sampleVn": "Tôi cao.",
            "sampleAudioUrl": "I am tall."
          }
        },
        {
          "id": 3,
          "ai": {
            "textEn": "Describe a colleague.",
            "textVn": "Hãy mô tả một đồng nghiệp.",
            "audioUrl": "Describe a colleague."
          },
          "user": {
            "formula": "He/She is ___ and ___.",
            "sampleEn": "She is average height and smart.",
            "sampleVn": "Cô ấy cao trung bình và thông minh.",
            "sampleAudioUrl": "She is average height and smart."
          }
        },
        {
          "id": 4,
          "ai": {
            "textEn": "Describe someone's hair.",
            "textVn": "Hãy mô tả mái tóc của ai đó.",
            "audioUrl": "Describe someone's hair."
          },
          "user": {
            "formula": "He/She has ___ hair.",
            "sampleEn": "She has blonde hair.",
            "sampleVn": "Cô ấy có tóc vàng hoe.",
            "sampleAudioUrl": "She has blonde hair."
          }
        },
        {
          "id": 5,
          "ai": {
            "textEn": "Describe a bald person.",
            "textVn": "Hãy mô tả một người hói đầu.",
            "audioUrl": "Describe a bald person."
          },
          "user": {
            "formula": "He/She is ___.",
            "sampleEn": "He is bald.",
            "sampleVn": "Anh ấy hói đầu.",
            "sampleAudioUrl": "He is bald."
          }
        },
        {
          "id": 6,
          "ai": {
            "textEn": "Describe someone overweight.",
            "textVn": "Hãy mô tả một người thừa cân.",
            "audioUrl": "Describe someone overweight."
          },
          "user": {
            "formula": "He/She is ___ but ___.",
            "sampleEn": "He is overweight but friendly.",
            "sampleVn": "Anh ấy thừa cân nhưng thân thiện.",
            "sampleAudioUrl": "He is overweight but friendly."
          }
        },
        {
          "id": 7,
          "ai": {
            "textEn": "Describe a handsome person.",
            "textVn": "Hãy mô tả một người đẹp trai.",
            "audioUrl": "Describe a handsome person."
          },
          "user": {
            "formula": "He is ___ and ___.",
            "sampleEn": "He is handsome and hard-working.",
            "sampleVn": "Anh ấy đẹp trai và chăm chỉ làm việc.",
            "sampleAudioUrl": "He is handsome and hard-working."
          }
        },
        {
          "id": 8,
          "ai": {
            "textEn": "Describe a beautiful person.",
            "textVn": "Hãy mô tả một người xinh đẹp.",
            "audioUrl": "Describe a beautiful person."
          },
          "user": {
            "formula": "She is ___ and ___.",
            "sampleEn": "She is beautiful and shy.",
            "sampleVn": "Cô ấy xinh đẹp và nhút nhát.",
            "sampleAudioUrl": "She is beautiful and shy."
          }
        },
        {
          "id": 9,
          "ai": {
            "textEn": "Describe someone funny and smart.",
            "textVn": "Hãy mô tả một người hài hước và thông minh.",
            "audioUrl": "Describe someone funny and smart."
          },
          "user": {
            "formula": "He/She is ___ and ___.",
            "sampleEn": "He is funny and smart.",
            "sampleVn": "Anh ấy hài hước và thông minh.",
            "sampleAudioUrl": "He is funny and smart."
          }
        },
        {
          "id": 10,
          "ai": {
            "textEn": "Describe someone lazy and boring.",
            "textVn": "Hãy mô tả một người lười biếng và nhàm chán.",
            "audioUrl": "Describe someone lazy and boring."
          },
          "user": {
            "formula": "He/She is ___ and ___.",
            "sampleEn": "She is lazy and boring.",
            "sampleVn": "Cô ấy lười biếng và nhàm chán.",
            "sampleAudioUrl": "She is lazy and boring."
          }
        }
      ]
    },
    "minitest": [
      {
        "type": "vocab",
        "q": "'Người Anh' trong tiếng Anh là?",
        "options": [
          "English",
          "British",
          "American",
          "French"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "She ___ from Japan.",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "We ___ Vietnamese.",
        "options": [
          "am",
          "is",
          "are",
          "isn't"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "They ___ American. (phủ định)",
        "options": [
          "aren't",
          "isn't",
          "am not",
          "not are"
        ],
        "answer": 0
      },
      {
        "type": "writing",
        "q": "Dịch: 'Tôi là người Việt'",
        "answer": "I am Vietnamese"
      }
    ],
    "mindmap": {
      "center": "All about me - Part 1",
      "branches": [
        {
          "label": "Countries",
          "items": [
            "Vietnam, the UK",
            "the USA, Japan",
            "China, France"
          ]
        },
        {
          "label": "Nationalities",
          "items": [
            "Vietnamese, British",
            "American, Japanese",
            "Chinese, French"
          ]
        },
        {
          "label": "to be (+)",
          "items": [
            "I am",
            "He/She/It is",
            "You/We/They are"
          ]
        },
        {
          "label": "to be (-)",
          "items": [
            "I'm not",
            "isn't (is not)",
            "aren't (are not)"
          ]
        }
      ]
    },
    "homework": [
      "Học 12 từ vựng quốc gia/quốc tịch",
      "Viết 5 câu giới thiệu bản thân và bạn bè dùng to be",
      "Workbook trang 10-12"
    ]
  },
  {
    "id": 3,
    "unit": "Unit 1",
    "title": "Gia đình & Câu hỏi với to be",
    "subtitle": "All about me - Part 2",
    "objectives": [
      "Học từ vựng về thành viên trong **gia đình**",
      "Đặt và trả lời câu hỏi với **to be**",
      "Hỏi về **quốc tịch** và nguồn gốc của người khác"
    ],
    "review": {
      "title": "Ôn lại to be",
      "questions": [
        {
          "q": "I ___ a student.",
          "answer": "am"
        },
        {
          "q": "She ___ Japanese.",
          "answer": "is"
        },
        {
          "q": "They ___ from China.",
          "answer": "are"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "father / dad",
        "vi": "bố",
        "img": "👨"
      },
      {
        "en": "mother / mum",
        "vi": "mẹ",
        "img": "👩"
      },
      {
        "en": "brother",
        "vi": "anh/em trai",
        "img": "👦"
      },
      {
        "en": "sister",
        "vi": "chị/em gái",
        "img": "👧"
      },
      {
        "en": "son",
        "vi": "con trai",
        "img": "👶"
      },
      {
        "en": "daughter",
        "vi": "con gái",
        "img": "👶"
      },
      {
        "en": "grandfather",
        "vi": "ông",
        "img": "👴"
      },
      {
        "en": "grandmother",
        "vi": "bà",
        "img": "👵"
      },
      {
        "en": "uncle",
        "vi": "chú/bác",
        "img": "👨"
      },
      {
        "en": "aunt",
        "vi": "cô/dì",
        "img": "👩"
      },
      {
        "en": "cousin",
        "vi": "anh/chị/em họ",
        "img": "🧑"
      },
      {
        "en": "parents",
        "vi": "bố mẹ",
        "img": "👨‍👩"
      }
    ],
    "grammar": {
      "title": "Câu hỏi với TO BE",
      "theory": "Đặt câu hỏi: ĐẢO to be lên trước chủ ngữ. Trả lời ngắn: Yes, S + to be / No, S + to be + not.",
      "examples": [
        {
          "en": "Are you Vietnamese? - Yes, I am. / No, I'm not.",
          "vi": "Bạn là người Việt phải không?"
        },
        {
          "en": "Is he your brother? - Yes, he is. / No, he isn't.",
          "vi": "Anh ấy là anh trai bạn phải không?"
        },
        {
          "en": "Where are you from? - I'm from Vietnam.",
          "vi": "Bạn đến từ đâu?"
        },
        {
          "en": "Who is she? - She is my sister.",
          "vi": "Cô ấy là ai?"
        }
      ],
      "formula": "S + am/is/are + (Adj/N)"
    },
    "listening": {
      "title": "Gia đình của tôi - My family",
      "transcript": "This is my family. I have got a father, a mother, and a sister. My father is a doctor. My mother is a teacher. My sister is a student. I love them all!",
      "translation": "Đây là gia đình tôi. Tôi có một bố, một mẹ, và một chị/em gái. Bố tôi là bác sĩ. Mẹ tôi là giáo viên. Chị/em tôi là học sinh. Tôi yêu tất cả!",
      "audio": "This is my family. I have got a father, a mother, and a sister. My father is a doctor. My mother is a teacher. My sister is a student. I love them all!",
      "questions": [
        {
          "q": "How many people are mentioned?",
          "audio": "I have got a father, a mother, and a sister.",
          "options": [
            "3",
            "4",
            "5",
            "6"
          ],
          "answer": 1
        },
        {
          "q": "What is the father's job?",
          "audio": "My father is a doctor.",
          "options": [
            "teacher",
            "doctor",
            "student",
            "engineer"
          ],
          "answer": 1
        },
        {
          "q": "Is the sister a teacher?",
          "audio": "My sister is a student.",
          "options": [
            "Yes, she is.",
            "No, she isn't.",
            "Yes, she has.",
            "No, she hasn't."
          ],
          "answer": 1
        }
      ]
    },
    "speaking": {
      "title": "Hỏi về gia đình",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Is this your father?",
          "vi": "Đây là bố bạn phải không?"
        },
        {
          "speaker": "B",
          "en": "Yes, he is. His name is Tom.",
          "vi": "Đúng rồi. Tên ông ấy là Tom."
        },
        {
          "speaker": "A",
          "en": "Are these your sisters?",
          "vi": "Đây là các chị em gái của bạn?"
        },
        {
          "speaker": "B",
          "en": "No, they aren't. They are my cousins.",
          "vi": "Không, đó là các chị em họ."
        }
      ]
    },
    "minitest": [
      {
        "type": "vocab",
        "q": "'Bà ngoại' là?",
        "options": [
          "grandfather",
          "grandmother",
          "aunt",
          "mother"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "___ you a student?",
        "options": [
          "Am",
          "Is",
          "Are",
          "Be"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "Trả lời: 'Is she your sister?' (đúng)",
        "options": [
          "Yes, she is.",
          "Yes, she's.",
          "Yes, is.",
          "Yes, her is."
        ],
        "answer": 0
      },
      {
        "type": "listening",
        "q": "Nghe: 'mother' nghĩa là?",
        "options": [
          "bố",
          "mẹ",
          "anh trai",
          "em gái"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "Đặt câu hỏi: 'They are American.'",
        "answer": "Are they American?"
      }
    ],
    "mindmap": {
      "center": "Family & Questions",
      "branches": [
        {
          "label": "Family Members",
          "items": [
            "father, mother",
            "brother, sister",
            "grandparents, cousin"
          ]
        },
        {
          "label": "Yes/No Questions",
          "items": [
            "Are you...?",
            "Is he/she/it...?",
            "Are they...?"
          ]
        },
        {
          "label": "Wh- Questions",
          "items": [
            "Where...?",
            "Who...?",
            "What...?"
          ]
        },
        {
          "label": "Short Answers",
          "items": [
            "Yes, I am.",
            "No, she isn't.",
            "Yes, they are."
          ]
        }
      ]
    },
    "homework": [
      "Vẽ sơ đồ gia đình và viết câu giới thiệu mỗi người",
      "Đặt 5 câu hỏi Yes/No với to be",
      "Workbook trang 13-15"
    ]
  },
  {
    "id": 4,
    "unit": "Unit 1",
    "title": "Have got & Possessive Adjectives",
    "subtitle": "All about me - Part 3",
    "objectives": [
      "Sử dụng '**have got**/**has got**' để nói về sở hữu",
      "Sử dụng tính từ sở hữu (my, your, his, her...)",
      "Mô tả **gia đình** mình"
    ],
    "review": {
      "title": "Ôn bài cũ",
      "questions": [
        {
          "q": "Father trong tiếng Việt là?",
          "answer": "bố"
        },
        {
          "q": "Đặt câu hỏi: She is happy.",
          "answer": "Is she happy?"
        },
        {
          "q": "Bà nội/ngoại là?",
          "answer": "grandmother"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "my",
        "vi": "của tôi",
        "img": "👤"
      },
      {
        "en": "your",
        "vi": "của bạn",
        "img": "👥"
      },
      {
        "en": "his",
        "vi": "của anh ấy",
        "img": "👨"
      },
      {
        "en": "her",
        "vi": "của cô ấy",
        "img": "👩"
      },
      {
        "en": "its",
        "vi": "của nó",
        "img": "🐾"
      },
      {
        "en": "our",
        "vi": "của chúng tôi",
        "img": "👨‍👩‍👧"
      },
      {
        "en": "their",
        "vi": "của họ",
        "img": "👫"
      },
      {
        "en": "big",
        "vi": "lớn",
        "img": "🐘"
      },
      {
        "en": "small",
        "vi": "nhỏ",
        "img": "🐭"
      },
      {
        "en": "young",
        "vi": "trẻ",
        "img": "👶"
      },
      {
        "en": "old",
        "vi": "già/cũ",
        "img": "👴"
      }
    ],
    "grammar": {
      "title": "HAVE GOT (sở hữu)",
      "theory": "I/You/We/They + have got (= 've got). He/She/It + has got (= 's got). Phủ định: haven't got / hasn't got. Câu hỏi: Have/Has + S + got...?",
      "examples": [
        {
          "en": "I have got a brother. = I've got a brother.",
          "vi": "Tôi có một anh trai."
        },
        {
          "en": "She has got blue eyes. = She's got blue eyes.",
          "vi": "Cô ấy có mắt xanh."
        },
        {
          "en": "They haven't got a car.",
          "vi": "Họ không có xe hơi."
        },
        {
          "en": "Have you got a sister? - Yes, I have. / No, I haven't.",
          "vi": "Bạn có chị/em gái không?"
        }
      ],
      "formula": "S + have/has got + O"
    },
    "listening": {
      "title": "Nghe gia đình Briggs",
      "transcript": "The Briggs family has got four members. Mr Briggs has got two children. Tom has got a sister. Her name is Emma. Emma has got long hair.",
      "questions": [
        {
          "q": "Gia đình Briggs có mấy người?",
          "options": [
            "3",
            "4",
            "5"
          ],
          "answer": 1
        },
        {
          "q": "Tom có ai?",
          "options": [
            "a brother",
            "a sister",
            "a cousin"
          ],
          "answer": 1
        },
        {
          "q": "Emma có gì?",
          "options": [
            "short hair",
            "long hair",
            "blue eyes"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Mô tả gia đình",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Have you got any brothers or sisters?",
          "vi": "Bạn có anh chị em không?"
        },
        {
          "speaker": "B",
          "en": "Yes, I've got one brother. His name is Nam.",
          "vi": "Có, tôi có một anh trai. Tên là Nam."
        },
        {
          "speaker": "A",
          "en": "How old is your brother?",
          "vi": "Anh bạn bao nhiêu tuổi?"
        },
        {
          "speaker": "B",
          "en": "He's 18 years old.",
          "vi": "Anh ấy 18 tuổi."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "She ___ a new bag.",
        "options": [
          "have got",
          "has got",
          "is got",
          "got"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "We ___ two cats.",
        "options": [
          "has got",
          "have got",
          "is",
          "got"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "This is Tom. ___ sister is Anna.",
        "options": [
          "He",
          "His",
          "Her",
          "Him"
        ],
        "answer": 1
      },
      {
        "type": "vocab",
        "q": "'Của chúng tôi' là?",
        "options": [
          "my",
          "your",
          "our",
          "their"
        ],
        "answer": 2
      },
      {
        "type": "writing",
        "q": "Phủ định: 'They have got a dog.'",
        "answer": "They haven't got a dog"
      }
    ],
    "mindmap": {
      "center": "Have got & Possessives",
      "branches": [
        {
          "label": "have got",
          "items": [
            "I/You/We/They have got",
            "He/She/It has got",
            "haven't / hasn't got"
          ]
        },
        {
          "label": "Possessive Adj.",
          "items": [
            "my, your, his",
            "her, its, our, their"
          ]
        },
        {
          "label": "Questions",
          "items": [
            "Have you got...?",
            "Has she got...?"
          ]
        },
        {
          "label": "Usage",
          "items": [
            "Family",
            "Possessions",
            "Description"
          ]
        }
      ]
    },
    "homework": [
      "Viết đoạn văn ngắn (5-7 câu) về gia đình mình dùng have got",
      "Workbook trang 16-17",
      "Chuẩn bị tự giới thiệu trước lớp 1 phút"
    ]
  },
  {
    "id": 5,
    "skipSections": ["speaking", "writing"],
    "unit": "Unit 2",
    "title": "Mua sắm & Order đồ ăn",
    "subtitle": "Shopping & Ordering food",
    "objectives": [
      "Học cách order đồ ăn trong nhà hàng và siêu thị",
      "Sử dụng 4 cấu trúc câu order đồ ăn thông dụng",
      "Học từ vựng về đồ ăn và các hành động khi mua sắm"
    ],
    "review": {
      "title": "Ôn tập - Giới thiệu bản thân",
      "questions": [
        {
          "q": "Các bạn đã học cách giới thiệu bản thân ở buổi trước. Bây giờ hãy thực hành theo cặp!",
          "dialogue": [
            { "speaker": "A", "text": "Hi! My name is Linh. What's your name?" },
            { "speaker": "B", "text": "Hello! I'm Nam. Nice to meet you, Linh!" },
            { "speaker": "A", "text": "Nice to meet you too! Where are you from?" },
            { "speaker": "B", "text": "I'm from Hanoi. And you?" },
            { "speaker": "A", "text": "I'm from Ho Chi Minh City. How old are you?" },
            { "speaker": "B", "text": "I'm 16 years old. I'm a student." }
          ]
        }
      ],
      "summary": "🎉 <b>TỔNG KẾT BREAKROOM 1</b> 🎉<br>Các bạn đã làm rất tốt! Bây giờ chúng ta sẽ học cách <b>ORDER ĐỒ ĂN</b> trong nhà hàng và siêu thị bằng tiếng Anh!"
    },
    "video": {
      "title": "How to Order Food at a Restaurant in English",
      "url": "https://www.youtube.com/watch?v=uUMPULuwdLI",
      "description": "Hôm nay chúng ta sẽ cùng xem video về cách order đồ ăn trong nhà hàng.",
      "duration": "5 phút",
      "scenes": [
        { "label": "🍕 Order Pizza", "time": 0 },
        { "label": "🍔 Order Hamburger", "time": 55 },
        { "label": "🥪 Order Sub Sandwich", "time": 115 },
        { "label": "🍩 Order Donuts", "time": 175 },
        { "label": "🍵 Order Peppermint Tea", "time": 235 }
      ],
      "questions": [
        {
          "q": "Người nói đã order pizza loại gì? (What kind of pizza?)",
          "answer": "Small pepperoni pizza",
          "timestamp": 25
        },
        {
          "q": "Người nói đã dùng câu gì để order pizza?",
          "answer": "\"I would like to order...\" / \"I'd like to order...\"",
          "timestamp": 45
        },
        {
          "q": "Người nói đã order hamburger ở đâu?",
          "answer": "Fast food restaurant",
          "timestamp": 80
        },
        {
          "q": "Người nói đã dùng cấu trúc câu gì để order sub sandwich?",
          "answer": "\"Could I have...\"",
          "timestamp": 140
        },
        {
          "q": "Người nói đã order mấy cái donuts?",
          "answer": "Six donuts (half dozen)",
          "timestamp": 200
        },
        {
          "q": "Người nói đã dùng câu gì để order tea?",
          "answer": "\"Could I get...\"",
          "timestamp": 255
        }
      ]
    },
    "vocabGroups": {
      "food": "🍕 TỪ VỰNG VỀ ĐỒ ĂN & IPA",
      "action": "🏪 TỪ VỰNG VỀ HÀNH ĐỘNG & CỬA HÀNG"
    },
    "vocabulary": [
      { "en": "pizza",          "vi": "bánh pizza",         "img": "🍕", "ipa": "/ˈpiːtsə/",          "group": "food" },
      { "en": "pepperoni",      "vi": "xúc xích ý",         "img": "🥩", "ipa": "/ˌpepəˈroʊni/",      "group": "food" },
      { "en": "hamburger",      "vi": "bánh hamburger",     "img": "🍔", "ipa": "/ˈhæmbɜːrɡər/",      "group": "food" },
      { "en": "fries",          "vi": "khoai tây chiên",    "img": "🍟", "ipa": "/fraɪz/",             "group": "food" },
      { "en": "sub sandwich",   "vi": "bánh mì kẹp thịt",  "img": "🥪", "ipa": "/ˈsʌb ˈsænwɪdʒ/",   "group": "food" },
      { "en": "donut",          "vi": "bánh rán vòng",      "img": "🍩", "ipa": "/ˈdoʊnʌt/",          "group": "food" },
      { "en": "peppermint tea", "vi": "trà bạc hà",         "img": "🍵", "ipa": "/ˈpepərmɪnt tiː/",   "group": "food" },
      { "en": "root beer",      "vi": "bia gừng",           "img": "🍺", "ipa": "/ruːt bɪr/",          "group": "food" },
      { "en": "combo",          "vi": "phần ăn kèm",        "img": "🍱", "ipa": "/ˈkɑːmboʊ/",         "group": "food" },
      { "en": "whole wheat bread", "vi": "bánh mì nguyên cám", "img": "🍞", "ipa": "/hoʊl wiːt bred/", "group": "food" },
      { "en": "order",          "vi": "gọi món, đặt hàng", "img": "📝", "ipa": "/ˈɔːrdər/",           "group": "action" },
      { "en": "pickup",         "vi": "mang đi (đặt trước)","img": "🛍️","ipa": "/ˈpɪkʌp/",            "group": "action" },
      { "en": "for here",       "vi": "ăn tại đây",         "img": "🍽️", "ipa": "/fɔːr hɪr/",         "group": "action" },
      { "en": "to go",          "vi": "mang đi",            "img": "🥡", "ipa": "/tə ɡoʊ/",           "group": "action" },
      { "en": "restaurant",     "vi": "nhà hàng",           "img": "🏪", "ipa": "/ˈrɛstərɑːnt/",      "group": "action" },
      { "en": "fast food",      "vi": "đồ ăn nhanh",        "img": "🌭", "ipa": "/fæst fuːd/",         "group": "action" },
      { "en": "total",          "vi": "tổng cộng",          "img": "💰", "ipa": "/ˈtoʊtl/",            "group": "action" },
      { "en": "cash",           "vi": "tiền mặt",           "img": "💵", "ipa": "/kæʃ/",               "group": "action" },
      { "en": "receipt",        "vi": "hóa đơn",            "img": "🧾", "ipa": "/rɪˈsiːt/",           "group": "action" },
      { "en": "change",         "vi": "tiền thừa",          "img": "🪙", "ipa": "/tʃeɪndʒ/",           "group": "action" }
    ],
    "grammar": {
      "title": "4 Cấu Trúc Câu Order Đồ Ăn Thông Dụng",
      "intro": "Trong video, người nói đã sử dụng 4 cấu trúc câu khác nhau để order đồ ăn. Hãy học thuộc và thực hành ngay!",
      "structures": [
        {
          "num": 1,
          "pattern": "I would like to order / I'd like to order",
          "vi": "Tôi muốn gọi món...",
          "style": "Lịch sự, trang trọng",
          "example": "I would like to order a small pepperoni pizza.",
          "exampleVi": "Tôi muốn gọi một pizza pepperoni nhỏ.",
          "context": "Order pizza tại tiệm pizza"
        },
        {
          "num": 2,
          "pattern": "I will have / I'll have",
          "vi": "Tôi sẽ gọi...",
          "style": "Thân thiện, phổ biến",
          "example": "I'll have the team burger.",
          "exampleVi": "Tôi sẽ gọi bánh hamburger team.",
          "context": "Order tại quán ăn nhanh (fast food)"
        },
        {
          "num": 3,
          "pattern": "Could I have",
          "vi": "Tôi có thể gọi... không?",
          "style": "Lịch sự, hỏi ý kiến",
          "example": "Could I have a cold cut combo?",
          "exampleVi": "Tôi có thể gọi một combo thịt nguội không?",
          "context": "Order sub sandwich, có thể yêu cầu thay đổi"
        },
        {
          "num": 4,
          "pattern": "Could I get",
          "vi": "Tôi có thể lấy... không?",
          "style": "Thân thiện, nhanh gọn",
          "example": "Could I get six donuts?",
          "exampleVi": "Tôi có thể lấy 6 cái bánh rán vòng không?",
          "context": "Order đồ mang đi, đồ ngọt"
        }
      ],
      "commonQA": [
        { "q": "Is it for here or to go?",    "a": "\"For here\" / \"To go\"" },
        { "q": "What's your phone number?",   "a": "\"It's 905-386-0042\"" },
        { "q": "Your total comes to $9.05",   "a": "\"Here you go\"" },
        { "q": "Do you want a receipt?",      "a": "\"No, thank you\"" }
      ]
    },
    "sentenceOrder": {
      "questions": [
        {
          "words": ["order", "would", "a", "pizza", "I", "to", "like", "pepperoni", "small"],
          "answer": "I would like to order a small pepperoni pizza"
        },
        {
          "words": ["have", "the", "I'll", "burger", "team"],
          "answer": "I'll have the team burger"
        },
        {
          "words": ["have", "a", "cold", "combo", "I", "cut", "Could"],
          "answer": "Could I have a cold cut combo"
        },
        {
          "words": ["donuts", "six", "I", "Could", "get", "?"],
          "answer": "Could I get six donuts?"
        },
        {
          "words": ["for", "here", "it", "is", "or", "to", "go", "?"],
          "answer": "Is it for here or to go?"
        }
      ]
    },
    "listenChoose": {
      "questions": [
        {
          "audio": "I would like to order a small pepperoni pizza.",
          "options": [
            "Tôi muốn gọi một pizza pepperoni nhỏ.",
            "Tôi muốn gọi một pizza hải sản lớn.",
            "Tôi muốn gọi một pizza pepperoni lớn.",
            "Tôi muốn gọi một bánh mì pepperoni."
          ],
          "answer": 0
        },
        {
          "audio": "I'll have the team burger.",
          "options": [
            "Tôi sẽ gọi bánh mì kẹp thịt.",
            "Tôi sẽ gọi bánh hamburger team.",
            "Tôi sẽ gọi khoai tây chiên.",
            "Tôi sẽ gọi pizza."
          ],
          "answer": 1
        },
        {
          "audio": "Could I have a cold cut combo?",
          "options": [
            "Tôi có thể gọi một phần ăn kèm không?",
            "Tôi có thể gọi một suất ăn nhanh không?",
            "Tôi có thể gọi một combo thịt nguội không?",
            "Tôi có thể gọi một pizza không?"
          ],
          "answer": 2
        },
        {
          "audio": "Could I get six donuts?",
          "options": [
            "Tôi có thể lấy 6 cái bánh mì không?",
            "Tôi có thể lấy 6 cái bánh rán vòng không?",
            "Tôi có thể lấy 6 cái pizza không?",
            "Tôi có thể lấy 6 cái hamburger không?"
          ],
          "answer": 1
        },
        {
          "audio": "Is it for here or to go?",
          "options": [
            "Ăn tại đây hay mang đi?",
            "Dùng thẻ hay tiền mặt?",
            "Lớn hay nhỏ?",
            "Nóng hay lạnh?"
          ],
          "answer": 0
        }
      ]
    },
    "translation": {
      "title": "LUYỆN DỊCH: VIỆT → ANH (10 CÂU)",
      "instruction": "Dịch câu tiếng Việt sang tiếng Anh. Nhấn 🎤 để nói hoặc gõ đáp án.",
      "sentences": [
        { "vi": "Tôi muốn gọi một pizza pepperoni nhỏ.",           "en": "I would like to order a small pepperoni pizza." },
        { "vi": "Tôi sẽ gọi hamburger team.",                       "en": "I'll have the team burger." },
        { "vi": "Tôi có thể gọi một combo thịt nguội không?",       "en": "Could I have a cold cut combo?" },
        { "vi": "Tôi có thể lấy 6 cái bánh rán vòng không?",        "en": "Could I get six donuts?" },
        { "vi": "Ăn tại đây hay mang đi?",                          "en": "Is it for here or to go?" },
        { "vi": "Tổng cộng của bạn là 9.05 đô la.",                 "en": "Your total comes to $9.05." },
        { "vi": "Bạn có muốn lấy hóa đơn không?",                   "en": "Do you want a receipt?" },
        { "vi": "Tôi muốn thanh toán bằng tiền mặt.",               "en": "I want to pay by cash." },
        { "vi": "Đơn hàng của bạn sẽ sẵn sàng trong 15-20 phút.",   "en": "Your order will be ready in 15-20 minutes." },
        { "vi": "Tôi muốn một phần khoai tây chiên.",                "en": "I would like some fries." }
      ]
    },
    "rolePlay": {
      "title": "GAME 3: ROLE PLAY CARD — GHÉ CỬA HÀNG & ĐẶT ĐỒ ĂN",
      "instruction": "🎯 Ghép câu hỏi (Cột A) với câu trả lời đúng (Cột B).",
      "pairs": [
        { "q": "What would you like to order?",      "a": "I'd like a pepperoni pizza." },
        { "q": "Is it for here or to go?",            "a": "To go, please." },
        { "q": "What's your phone number?",           "a": "It's 905-386-0042." },
        { "q": "Do you want a receipt?",              "a": "No, thank you." },
        { "q": "Is this for pickup or delivery?",     "a": "Yes, it's for pickup." },
        { "q": "Your total comes to $9.05.",          "a": "It comes to $9.05." },
        { "q": "How would you like to pay?",          "a": "Cash, please." }
      ]
    },
    "listening": {
      "title": "Ordering food at a restaurant",
      "transcript": "Hello, welcome to our pizza shop. What would you like to order? I would like to order a small pepperoni pizza. Is it for here or to go? To go, please. What's your phone number? It's 905-386-0042. Your total comes to $9.05. How would you like to pay? Cash, please. Your order will be ready in 15-20 minutes. Thank you!",
      "translation": "Xin chào, chào mừng đến với cửa hàng pizza của chúng tôi. Bạn muốn gọi món gì? Tôi muốn gọi một pizza pepperoni nhỏ. Ăn tại đây hay mang đi? Mang đi. Số điện thoại của bạn là gì? Là 905-386-0042. Tổng cộng của bạn là 9.05 đô la. Bạn muốn thanh toán bằng cách nào? Tiền mặt. Đơn hàng của bạn sẽ sẵn sàng trong 15-20 phút. Cảm ơn!",
      "audio": "Hello, welcome to our pizza shop. What would you like to order? I would like to order a small pepperoni pizza. Is it for here or to go? To go, please. What's your phone number? It's 905-386-0042. Your total comes to nine dollars and five cents. How would you like to pay? Cash, please. Your order will be ready in 15 to 20 minutes. Thank you!",
      "questions": [
        {
          "q": "What kind of pizza did they order?",
          "audio": "I would like to order a small pepperoni pizza.",
          "options": [
            "Small pepperoni pizza",
            "Large cheese pizza",
            "Seafood pizza",
            "Mushroom pizza"
          ],
          "answer": 0
        },
        {
          "q": "How many donuts did they get?",
          "audio": "Could I get six donuts?",
          "options": [
            "Two donuts",
            "Four donuts",
            "Six donuts",
            "Ten donuts"
          ],
          "answer": 2
        },
        {
          "q": "Is it for here or to go?",
          "audio": "To go, please.",
          "options": [
            "For here",
            "To go",
            "Delivery",
            "Pickup"
          ],
          "answer": 1
        }
      ]
    },
    "speaking": {
      "title": "Đóng vai - Role Play",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Hello, welcome. What would you like to order?",
          "vi": "Xin chào. Bạn muốn gọi món gì?"
        },
        {
          "speaker": "B",
          "en": "I would like to order a small pepperoni pizza.",
          "vi": "Tôi muốn gọi một pizza pepperoni nhỏ."
        },
        {
          "speaker": "A",
          "en": "Is it for here or to go?",
          "vi": "Ăn tại đây hay mang đi?"
        },
        {
          "speaker": "B",
          "en": "To go, please.",
          "vi": "Mang đi."
        },
        {
          "speaker": "A",
          "en": "Your total comes to $9.05.",
          "vi": "Tổng cộng của bạn là 9.05 đô la."
        },
        {
          "speaker": "B",
          "en": "Cash, please.",
          "vi": "Tôi trả tiền mặt."
        }
      ]
    },
    "listeningTest": {
      "title": "MINITEST: LUYỆN NGHE VỚI VIDEO \"LISTENING TEST FOR KIDS\"",
      "videos": [
        {
          "label": "Test 1",
          "url": "https://www.youtube.com/watch?v=JSD-nq8iA1g",
          "questions": [
            { "q": "What is the girl doing?", "options": ["Reading a book", "Writing a letter", "Sleeping"], "answer": 0 },
            { "q": "Where is the cat?", "options": ["On the chair", "Under the table", "On the sofa"], "answer": 2 },
            { "q": "What color is the car?", "options": ["Red", "Blue", "Black"], "answer": 1 },
            { "q": "How many apples are there?", "options": ["Three", "Four", "Five"], "answer": 1 },
            { "q": "What is the boy wearing?", "options": ["A red shirt", "A blue shirt", "A green shirt"], "answer": 1 }
          ]
        },
        {
          "label": "Test 2",
          "url": "https://www.youtube.com/watch?v=RW9iXVpK4SA",
          "questions": [
            { "q": "What is the weather like?", "options": ["Sunny", "Rainy", "Cloudy"], "answer": 1 },
            { "q": "Where is the school?", "options": ["Next to the park", "Opposite the bank", "Behind the hospital"], "answer": 1 },
            { "q": "What does the girl want to drink?", "options": ["Water", "Juice", "Milk"], "answer": 2 },
            { "q": "How old is the boy?", "options": ["Seven", "Eight", "Nine"], "answer": 1 },
            { "q": "What is the woman doing?", "options": ["Cooking", "Cleaning", "Shopping"], "answer": 2 }
          ]
        },
        {
          "label": "Test 3",
          "url": "https://www.youtube.com/watch?v=9ngxGjtAaGI",
          "questions": [
            { "q": "What animal is in the picture?", "options": ["A dog", "A cat", "A bird"], "answer": 0 },
            { "q": "What is the boy eating?", "options": ["A sandwich", "An apple", "A banana"], "answer": 2 },
            { "q": "Where is the family?", "options": ["At the park", "At home", "At school"], "answer": 0 },
            { "q": "What color is the ball?", "options": ["Red", "Yellow", "Blue"], "answer": 0 },
            { "q": "How many children are there?", "options": ["Two", "Three", "Four"], "answer": 1 }
          ]
        }
      ]
    },
    "mindmap": {
      "type": "structured",
      "center": "CÁCH ORDER ĐỒ ĂN TRONG NHÀ HÀNG",
      "branches": [
        {
          "icon": "🎭",
          "label": "CẤU TRÚC CÂU",
          "sub": "(4 CÁCH)",
          "items": [
            "I would like to order + a small pepperoni pizza",
            "I'll have + the team burger",
            "Could I have + a cold cut combo",
            "Could I get + six donuts"
          ]
        },
        {
          "icon": "🍕",
          "label": "TỪ VỰNG",
          "sub": "(FOOD)",
          "items": [
            "Pizza", "Hamburger", "Sub sandwich",
            "Donut", "Peppermint tea", "Root beer"
          ]
        },
        {
          "icon": "🗺️",
          "label": "TÌNH HUỐNG",
          "sub": "(4 PLACES)",
          "items": [
            "Pizza Shop", "Fast Food", "Sub Shop",
            "Donut Shop", "Coffee Shop"
          ],
          "box": {
            "title": "🍕 CÂU HỎI & TRẢ LỜI:",
            "items": [
              "Is it for here or to go?",
              "What's your phone number?",
              "Your total comes to...",
              "Cash or credit?",
              "Do you want a receipt?",
              "Here you go.",
              "Thank you very much."
            ]
          },
          "tips": {
            "title": "MẸO GIAO TIẾP:",
            "items": [
              "Dùng \"would like\" khi muốn lịch sự",
              "Dùng \"could\" khi muốn hỏi xin phép",
              "Dùng \"I'll have\" khi order nhanh",
              "Trả lời \"To go\" khi mang đi",
              "Trả lời \"For here\" khi ăn tại chỗ"
            ]
          }
        }
      ]
    },
    "homeworkRich": {
      "title": "BÀI TẬP VỀ NHÀ - BUỔI 5: MUA SẮM & ORDER ĐỒ ĂN",
      "submit": "Group ZL (chụp ảnh + ghi âm)",
      "deadline": "Trước buổi học tiếp theo",
      "tasks": [
        {
          "icon": "🎙️",
          "title": "BÀI TẬP 1: GHI ÂM",
          "badge": "Bắt buộc",
          "desc": "Ghi âm 1 đoạn hội thoại ngắn (30 giây) giữa khách hàng và nhân viên trong nhà hàng.",
          "note": "Chủ đề tự chọn: pizza, hamburger, sub, donuts"
        },
        {
          "icon": "✏️",
          "title": "BÀI TẬP 2: VIẾT CÂU",
          "badge": "",
          "desc": "Viết 5 câu order đồ ăn (sử dụng 5 cấu trúc khác nhau):",
          "items": [
            "I would like to order...",
            "I'll have...",
            "Could I have...",
            "Could I get...",
            "I want..."
          ]
        },
        {
          "icon": "🎧",
          "title": "BÀI TẬP 3: LUYỆN NGHE",
          "badge": "Bắt buộc",
          "desc": "Xem và làm bài tập tại các link sau:",
          "links": [
            { "label": "Test 1", "url": "https://www.youtube.com/watch?v=JSD-nq8iA1g" },
            { "label": "Test 2", "url": "https://www.youtube.com/watch?v=RW9iXVpK4SA" },
            { "label": "Test 3", "url": "https://www.youtube.com/watch?v=9ngxGjtAaGI" }
          ],
          "note": "Chụp màn hình kết quả và gửi lên ZL"
        }
      ]
    },
    "homework": [
      "Ghi âm 1 đoạn hội thoại ngắn giữa khách hàng và nhân viên",
      "Viết 5 câu order đồ ăn sử dụng 5 cấu trúc khác nhau",
      "🎧 Luyện nghe: Xem video & làm bài tập (chụp màn hình kết quả gửi ZL):\nhttps://www.youtube.com/watch?v=JSD-nq8iA1g\nhttps://www.youtube.com/watch?v=RW9iXVpK4SA\nhttps://www.youtube.com/watch?v=9ngxGjtAaGI"
    ]
  },
  {
    "id": 6,
    "skipSections": ["writing"],
    "unit": "Unit 2",
    "title": "Đồ vật hằng ngày & this/that/these/those",
    "subtitle": "Everyday Objects & Demonstratives",
    "objectives": [
      "Nhận biết và gọi tên đồ vật trong nhà, phòng học",
      "Dùng this / that / these / those đúng tình huống",
      "Hỏi – đáp tự nhiên về đồ vật xung quanh"
    ],
    "review": {
      "title": "Ôn tập - Order đồ ăn",
      "questions": [
        {
          "q": "Buổi trước các bạn đã học 4 cấu trúc order đồ ăn. Hôm nay chúng ta sẽ ôn lại bằng cách đóng vai!",
          "dialogue": [
            { "speaker": "A", "text": "Hello! What would you like to order?" },
            { "speaker": "B", "text": "I'd like to order a pizza. Is it for here or to go?" },
            { "speaker": "A", "text": "For here please!" },
            { "speaker": "B", "text": "Your total comes to $12. How would you like to pay?" },
            { "speaker": "A", "text": "Cash please. Here you go!" },
            { "speaker": "B", "text": "Thank you. Have a great day!" }
          ]
        }
      ],
      "summary": "🎉 <b>TỔNG KẾT BREAKROOM 1</b> 🎉<br>Các bạn đã làm rất tốt! Bây giờ chúng ta sẽ học cách nói về <b>ĐỒ VẬT XUNG QUANH</b> bằng this / that / these / those!"
    },
    "video": {
      "title": "This / That / These / Those - Mark Kulek ESL",
      "url": "https://www.youtube.com/watch?v=uVOSKECM-Vs",
      "description": "Hôm nay chúng ta sẽ cùng xem video về cách dùng this / that / these / those trong câu hỏi và câu trả lời với đồ vật hằng ngày. Video có hội thoại tự nhiên, lặp lại nhiều lần giúp bạn học tốt hơn.",
      "duration": "4 phút",
      "additionalVideo": {
        "title": "This, That, These, Those - Grammar Practice",
        "url": "https://www.youtube.com/watch?v=zYBzrgjknP0",
        "duration": "5 phút"
      },
      "scenes": [
        { "label": "📍 This is (gần - số ít)", "time": 0 },
        { "label": "📏 That is (xa - số ít)", "time": 60 },
        { "label": "📍 These are (gần - nhiều)", "time": 120 },
        { "label": "📏 Those are (xa - nhiều)", "time": 180 }
      ],
      "questions": [
        {
          "q": "Khi nào dùng 'this'?",
          "answer": "Khi nói về vật ở gần, số ít",
          "timestamp": 30
        },
        {
          "q": "Khi nào dùng 'those'?",
          "answer": "Khi nói về vật ở xa, số nhiều",
          "timestamp": 200
        },
        {
          "q": "'These' dùng với danh từ số ít hay số nhiều?",
          "answer": "Số nhiều",
          "timestamp": 140
        }
      ]
    },
    "vocabGroups": {
      "school": "📚 ĐỒ DÙNG HỌC TẬP & VĂN PHÒNG",
      "personal": "👜 ĐỒ DÙNG CÁ NHÂN & GIA ĐÌNH",
      "furniture": "🏠 ĐỒ NỘI THẤT & ĐỒ ĐIỆN"
    },
    "vocabulary": [
      { "en": "book", "vi": "cuốn sách", "img": "📖", "ipa": "/bʊk/", "group": "school" },
      { "en": "pen", "vi": "bút mực", "img": "🖊️", "ipa": "/pen/", "group": "school" },
      { "en": "pencil", "vi": "bút chì", "img": "✏️", "ipa": "/ˈpensəl/", "group": "school" },
      { "en": "ruler", "vi": "cây thước", "img": "📏", "ipa": "/ˈruːlər/", "group": "school" },
      { "en": "eraser", "vi": "cục tẩy", "img": "🧹", "ipa": "/ɪˈreɪsər/", "group": "school" },
      { "en": "notebook", "vi": "vở, sổ tay", "img": "📓", "ipa": "/ˈnoʊtbʊk/", "group": "school" },
      { "en": "scissors", "vi": "cái kéo", "img": "✂️", "ipa": "/ˈsɪzərz/", "group": "school" },
      { "en": "stapler", "vi": "cái ghim / dập ghim", "img": "📎", "ipa": "/ˈsteɪplər/", "group": "school" },
      { "en": "tape", "vi": "băng keo", "img": "📼", "ipa": "/teɪp/", "group": "school" },
      { "en": "folder", "vi": "bìa hồ sơ", "img": "📁", "ipa": "/ˈfoʊldər/", "group": "school" },
      { "en": "highlighter", "vi": "bút dạ quang", "img": "🖍️", "ipa": "/ˈhaɪlaɪtər/", "group": "school" },
      { "en": "whiteboard", "vi": "bảng trắng", "img": "⬜", "ipa": "/ˈwaɪtbɔːrd/", "group": "school" },
      { "en": "marker", "vi": "bút lông bảng", "img": "🖊️", "ipa": "/ˈmɑːrkər/", "group": "school" },
      { "en": "calculator", "vi": "máy tính cầm tay", "img": "🧮", "ipa": "/ˈkælkjuleɪtər/", "group": "school" },
      { "en": "bag", "vi": "cái túi", "img": "👜", "ipa": "/bæɡ/", "group": "personal" },
      { "en": "wallet", "vi": "ví tiền", "img": "👛", "ipa": "/ˈwɑːlɪt/", "group": "personal" },
      { "en": "glasses", "vi": "kính mắt", "img": "👓", "ipa": "/ˈɡlæsɪz/", "group": "personal" },
      { "en": "umbrella", "vi": "cái dù / ô", "img": "☂️", "ipa": "/ʌmˈbrelə/", "group": "personal" },
      { "en": "key", "vi": "chìa khóa", "img": "🔑", "ipa": "/kiː/", "group": "personal" },
      { "en": "phone", "vi": "điện thoại", "img": "📱", "ipa": "/foʊn/", "group": "personal" },
      { "en": "headphones", "vi": "tai nghe", "img": "🎧", "ipa": "/ˈhedfoʊnz/", "group": "personal" },
      { "en": "charger", "vi": "sạc điện thoại", "img": "🔌", "ipa": "/ˈtʃɑːrdʒər/", "group": "personal" },
      { "en": "watch", "vi": "đồng hồ đeo tay", "img": "⌚", "ipa": "/wɑːtʃ/", "group": "personal" },
      { "en": "mirror", "vi": "gương", "img": "🪞", "ipa": "/ˈmɪrər/", "group": "personal" },
      { "en": "towel", "vi": "khăn tắm / lau", "img": "🧻", "ipa": "/ˈtaʊəl/", "group": "personal" },
      { "en": "toothbrush", "vi": "bàn chải đánh răng", "img": "🪥", "ipa": "/ˈtuːθbrʌʃ/", "group": "personal" },
      { "en": "comb", "vi": "cái lược", "img": "💇", "ipa": "/koʊm/", "group": "personal" },
      { "en": "tissue", "vi": "khăn giấy", "img": "🧻", "ipa": "/ˈtɪʃuː/", "group": "personal" },
      { "en": "chair", "vi": "cái ghế", "img": "🪑", "ipa": "/tʃer/", "group": "furniture" },
      { "en": "table", "vi": "cái bàn", "img": "🪑", "ipa": "/ˈteɪbəl/", "group": "furniture" },
      { "en": "desk", "vi": "bàn làm việc / học", "img": "🪑", "ipa": "/desk/", "group": "furniture" },
      { "en": "lamp", "vi": "đèn bàn", "img": "💡", "ipa": "/læmp/", "group": "furniture" },
      { "en": "sofa", "vi": "ghế sofa", "img": "🛋️", "ipa": "/ˈsoʊfə/", "group": "furniture" },
      { "en": "shelf", "vi": "kệ sách / giá đỡ", "img": "📚", "ipa": "/ʃelf/", "group": "furniture" },
      { "en": "door", "vi": "cánh cửa", "img": "🚪", "ipa": "/dɔːr/", "group": "furniture" },
      { "en": "window", "vi": "cửa sổ", "img": "🪟", "ipa": "/ˈwɪndoʊ/", "group": "furniture" },
      { "en": "fan", "vi": "cái quạt", "img": "🌀", "ipa": "/fæn/", "group": "furniture" },
      { "en": "air conditioner", "vi": "máy lạnh / điều hòa", "img": "❄️", "ipa": "/er kənˈdɪʃənər/", "group": "furniture" },
      { "en": "television", "vi": "tivi", "img": "📺", "ipa": "/ˈtelɪvɪʒən/", "group": "furniture" },
      { "en": "remote control", "vi": "điều khiển từ xa", "img": "📱", "ipa": "/rɪˈmoʊt kənˈtroʊl/", "group": "furniture" },
      { "en": "clock", "vi": "đồng hồ treo tường", "img": "🕐", "ipa": "/klɑːk/", "group": "furniture" },
      { "en": "curtain", "vi": "rèm cửa", "img": "🪟", "ipa": "/ˈkɜːrtən/", "group": "furniture" }
    ],
    "grammar": {
      "title": "4 Cấu Trúc Câu - This / That / These / Those",
      "intro": "Trong video, chúng ta đã học 4 cấu trúc câu để nói về đồ vật xung quanh. Hãy học thuộc và thực hành ngay!",
      "structures": [
        {
          "num": 1,
          "pattern": "THIS IS + danh từ số ít",
          "vi": "Đây là... (vật gần - 1 cái)",
          "style": "Dùng khi vật ở gần bạn, số ít",
          "example": "This is a pen.",
          "exampleVi": "Đây là một cây bút.",
          "context": "Chỉ vào 1 vật ở gần"
        },
        {
          "num": 2,
          "pattern": "THAT IS + danh từ số ít",
          "vi": "Đó là... (vật xa - 1 cái)",
          "style": "Dùng khi vật ở xa bạn, số ít",
          "example": "That is a chair.",
          "exampleVi": "Đó là một cái ghế.",
          "context": "Chỉ vào 1 vật ở xa"
        },
        {
          "num": 3,
          "pattern": "THESE ARE + danh từ số nhiều",
          "vi": "Đây là những... (vật gần - nhiều cái)",
          "style": "Dùng khi vật ở gần bạn, số nhiều",
          "example": "These are pens.",
          "exampleVi": "Đây là những cây bút.",
          "context": "Chỉ vào nhiều vật ở gần"
        },
        {
          "num": 4,
          "pattern": "THOSE ARE + danh từ số nhiều",
          "vi": "Đó là những... (vật xa - nhiều cái)",
          "style": "Dùng khi vật ở xa bạn, số nhiều",
          "example": "Those are chairs.",
          "exampleVi": "Đó là những cái ghế.",
          "context": "Chỉ vào nhiều vật ở xa"
        }
      ],
      "commonQA": [
        { "q": "What is this?", "a": "It's a pen." },
        { "q": "What are these?", "a": "They're pens." },
        { "q": "What is that?", "a": "It's a chair." },
        { "q": "What are those?", "a": "They're chairs." },
        { "q": "Is this a pen?", "a": "Yes, it is. / No, it isn't." }
      ],
      "formula": "GẦN → THIS (1) / THESE (nhiều) | XA → THAT (1) / THOSE (nhiều) | Số ít → IS | Số nhiều → ARE"
    },
    "listening": {
      "title": "Nghe và xác định vật nào",
      "transcript": "Look! This is my new phone. And that is my old watch. These are my headphones - I love music! Those are my books over there.",
      "translation": "Nhìn kìa! Đây là điện thoại mới của tôi. Và đó là đồng hồ cũ của tôi. Đây là tai nghe của tôi - tôi yêu âm nhạc! Đó là những cuốn sách của tôi ở đằng kia.",
      "audio": "Look! This is my new phone. And that is my old watch. These are my headphones - I love music! Those are my books over there.",
      "questions": [
        {
          "q": "'This is my new ___'",
          "audio": "This is my new phone.",
          "options": [
            "watch",
            "phone",
            "tablet"
          ],
          "answer": 1
        },
        {
          "q": "'That is my old ___'",
          "audio": "That is my old watch.",
          "options": [
            "phone",
            "key",
            "watch"
          ],
          "answer": 2
        },
        {
          "q": "'These are my ___'",
          "audio": "These are my headphones.",
          "options": [
            "books",
            "headphones",
            "keys"
          ],
          "answer": 1
        },
        {
          "q": "'Those are my ___ over there'",
          "audio": "Those are my books over there.",
          "options": ["headphones", "watch", "books"],
          "answer": 2
        },
        {
          "q": "Câu nào dùng 'those'?",
          "audio": "Those are my books over there.",
          "options": ["This is my phone.", "These are my headphones.", "Those are my books."],
          "answer": 2
        },
        {
          "q": "'These are my headphones - I love ___!'",
          "audio": "These are my headphones - I love music!",
          "options": ["books", "music", "keys"],
          "answer": 1
        }
      ]
    },
    "pointShout": {
      "title": "GAME 1: POINT & SHOUT! - Phản xạ nghe từ vựng",
      "instruction": "Giáo viên hô tên đồ vật → Học viên chỉ ngay vào đồ vật đó trong lớp. Ai chỉ đúng và hét to nhất → THẮNG!",
      "round1": {
        "title": "VÒNG 1 - TỪ VỰNG",
        "words": ["Book", "Chair", "Phone", "Bag", "Table", "Pen", "Glasses", "Key", "Lamp", "Clock",
          "Pencil", "Eraser", "Notebook", "Ruler", "Scissors", "Marker", "Calculator", "Folder", "Highlighter", "Whiteboard",
          "Wallet", "Umbrella", "Headphones", "Charger", "Watch", "Mirror", "Towel", "Toothbrush", "Comb", "Tissue"]
      },
      "round2": {
        "title": "VÒNG 2 - PHỨC HƠN (Tốc độ nhanh hơn)",
        "questions": [
          { "q": "What is this?", "point": "bút", "answer": "It's a pen!" },
          { "q": "What are those?", "point": "sách", "answer": "They're books!" },
          { "q": "What is that?", "point": "đồng hồ", "answer": "It's a clock!" },
          { "q": "What are these?", "point": "kéo", "answer": "They're scissors!" },
          { "q": "What is this?", "point": "điện thoại", "answer": "It's a phone!" },
          { "q": "What are these?", "point": "chìa khóa", "answer": "They're keys!" },
          { "q": "What is that?", "point": "bàn", "answer": "It's a table!" },
          { "q": "What are those?", "point": "ghế", "answer": "They're chairs!" },
          { "q": "What is this?", "point": "ví tiền", "answer": "It's a wallet!" },
          { "q": "What are these?", "point": "kính", "answer": "They're glasses!" },
          { "q": "What is that?", "point": "đèn bàn", "answer": "It's a lamp!" },
          { "q": "What are those?", "point": "tai nghe", "answer": "They're headphones!" }
        ]
      },
      "scoring": "Đúng + nhanh = 2 điểm | Đúng + chậm = 1 điểm"
    },
    "thisOrThat": {
      "title": "GAME 2: THIS OR THAT? - Phản xạ nghe cấu trúc câu",
      "instruction": "Giáo viên đọc câu → Học viên giơ tay TRÁI (GẦN) hoặc tay PHẢI (XA). Nhanh nhất & đúng nhất chiến thắng!",
      "rule": "✋ TAY TRÁI = GẦN (This / These) | ✋ TAY PHẢI = XA (That / Those)",
      "questions": [
        { "sentence": "This is my pen.", "answer": "left" },
        { "sentence": "That is a big table.", "answer": "right" },
        { "sentence": "These are her books.", "answer": "left" },
        { "sentence": "Those are my glasses.", "answer": "right" },
        { "sentence": "This is a wallet.", "answer": "left" },
        { "sentence": "Those are nice chairs.", "answer": "right" },
        { "sentence": "These are my keys.", "answer": "left" },
        { "sentence": "That is a small notebook.", "answer": "right" },
        { "sentence": "This is a yellow highlighter.", "answer": "left" },
        { "sentence": "Those are old curtains.", "answer": "right" },
        { "sentence": "That is your umbrella.", "answer": "right" },
        { "sentence": "These are my headphones.", "answer": "left" },
        { "sentence": "This is a black phone.", "answer": "left" },
        { "sentence": "Those are heavy bags.", "answer": "right" },
        { "sentence": "That is a white lamp.", "answer": "right" },
        { "sentence": "These are red markers.", "answer": "left" },
        { "sentence": "This is my charger.", "answer": "left" },
        { "sentence": "Those are old televisions.", "answer": "right" },
        { "sentence": "That is a new clock.", "answer": "right" },
        { "sentence": "These are sharp scissors.", "answer": "left" },
        { "sentence": "This is a soft towel.", "answer": "left" },
        { "sentence": "Those are clean windows.", "answer": "right" },
        { "sentence": "That is a small mirror.", "answer": "right" },
        { "sentence": "These are blue folders.", "answer": "left" },
        { "sentence": "This is my toothbrush.", "answer": "left" },
        { "sentence": "Those are noisy fans.", "answer": "right" },
        { "sentence": "That is an empty wallet.", "answer": "right" },
        { "sentence": "These are useful calculators.", "answer": "left" },
        { "sentence": "This is a long ruler.", "answer": "left" },
        { "sentence": "Those are tall shelves.", "answer": "right" }
      ],
      "bonus": {
        "title": "VÒNG THƯỞNG - ĐIỀN VÀO CHỖ TRỐNG",
        "questions": [
          { "q": "___ is a pen.", "answer": "This" },
          { "q": "___ are her books.", "answer": "Those / These" },
          { "q": "___ is a big chair.", "answer": "That" },
          { "q": "___ are my glasses.", "answer": "These / Those" },
          { "q": "___ is my charger.", "answer": "This" },
          { "q": "___ are the remote controls.", "answer": "Those / These" },
          { "q": "___ is a new lamp.", "answer": "This / That" },
          { "q": "___ are old chairs over there.", "answer": "Those" },
          { "q": "___ is my umbrella here.", "answer": "This" },
          { "q": "___ are sharp scissors.", "answer": "These / Those" },
          { "q": "___ is a blue marker.", "answer": "This / That" },
          { "q": "___ are red highlighters in my bag.", "answer": "These" },
          { "q": "___ is your phone on the table?", "answer": "Is that" },
          { "q": "___ are clean towels.", "answer": "These / Those" },
          { "q": "___ is an empty folder.", "answer": "This / That" },
          { "q": "___ are tall windows.", "answer": "These / Those" },
          { "q": "___ is my black wallet.", "answer": "This / That" },
          { "q": "___ are noisy fans across the room.", "answer": "Those" }
        ]
      }
    },
    "mysteryBag": {
      "title": "GAME 3: MYSTERY BAG - Đoán đồ vật bí ẩn",
      "instruction": "Học viên thò tay vào túi (không nhìn) → sờ 1 đồ vật. Dùng tiếng Anh mô tả đồ vật đó. Các bạn còn lại đoán.",
      "items": ["bút", "sách", "chìa khóa", "kính", "điện thoại", "ví tiền",
        "cục tẩy", "đồng hồ", "ô", "lược", "tai nghe", "sạc",
        "bút chì", "khăn giấy", "gương", "máy tính", "bàn chải", "vở"],
      "adjectives": ["hard", "soft", "small", "big", "smooth", "rough",
        "light", "heavy", "long", "short", "round", "square",
        "warm", "cold", "sharp", "flat", "thick", "thin"],
      "dialogue": [
        { "speaker": "A", "text": "It's small and hard." },
        { "speaker": "B", "text": "Is it a key?" },
        { "speaker": "A", "text": "No, it isn't." },
        { "speaker": "C", "text": "Is it an eraser?" },
        { "speaker": "A", "text": "Yes, it is! This is an eraser!" }
      ],
      "scoring": "Đoán đúng = 2 điểm | Mô tả hay nhất = 1 điểm thưởng"
    },
    "quizBomb": {
      "title": "GAME 4: QUIZ BOMB - Ai chậm là thua!",
      "instruction": "Giáo viên hỏi → Học viên trả lời trong 5 giây. Không trả lời được = bị loại. Người cuối cùng còn lại = THẮNG!",
      "questions": [
        {
          "q": "___ is a book. (1 cuốn sách – GẦN)",
          "options": ["That", "This", "These", "Those"],
          "answer": 1
        },
        {
          "q": "___ are my keys. (nhiều chìa khóa – XA)",
          "options": ["This", "That", "These", "Those"],
          "answer": 3
        },
        {
          "q": "What ___ this?",
          "options": ["are", "is", "am", "were"],
          "answer": 1
        },
        {
          "q": "What are those? → '___ are glasses.'",
          "options": ["It", "This", "They", "That"],
          "answer": 2
        },
        {
          "q": "Is this a pen? → '___, it is.'",
          "options": ["No", "Yes", "Not", "Isn't"],
          "answer": 1
        },
        {
          "q": "___ are her books. (nhiều sách – GẦN)",
          "options": ["Those", "This", "That", "These"],
          "answer": 3
        },
        {
          "q": "___ is a fan. (1 cái quạt – XA)",
          "options": ["This", "Those", "That", "These"],
          "answer": 2
        },
        {
          "q": "What are ___? → 'They're headphones.' (gần)",
          "options": ["those", "that", "this", "these"],
          "answer": 3
        },
        {
          "q": "___ is my umbrella. (1 cái ô – GẦN)",
          "options": ["That", "These", "This", "Those"],
          "answer": 2
        },
        {
          "q": "___ are old chairs. (nhiều ghế – XA)",
          "options": ["These", "This", "That", "Those"],
          "answer": 3
        },
        {
          "q": "What ___ those?",
          "options": ["is", "am", "are", "be"],
          "answer": 2
        },
        {
          "q": "Is that her wallet? → '___, it isn't.'",
          "options": ["Yes", "Not", "No", "Don't"],
          "answer": 2
        },
        {
          "q": "What is this? → '___ a marker.'",
          "options": ["They're", "It's", "Those", "These"],
          "answer": 1
        },
        {
          "q": "___ are my new headphones. (GẦN)",
          "options": ["This", "That", "Those", "These"],
          "answer": 3
        },
        {
          "q": "___ is a soft towel. (1 cái khăn – GẦN)",
          "options": ["These", "Those", "That", "This"],
          "answer": 3
        },
        {
          "q": "___ are sharp scissors over there. (XA)",
          "options": ["These", "Those", "This", "That"],
          "answer": 1
        },
        {
          "q": "Are these your keys? → 'Yes, ___ are.'",
          "options": ["it", "this", "they", "those"],
          "answer": 2
        },
        {
          "q": "___ is a calculator on my desk. (GẦN)",
          "options": ["That", "These", "This", "Those"],
          "answer": 2
        },
        {
          "q": "What are these? → '___ pencils.'",
          "options": ["It's", "That's", "They're", "This is"],
          "answer": 2
        },
        {
          "q": "___ is a clock on the wall. (XA)",
          "options": ["This", "These", "Those", "That"],
          "answer": 3
        },
        {
          "q": "___ are clean windows. (nhiều cửa sổ – XA)",
          "options": ["This", "These", "That", "Those"],
          "answer": 3
        },
        {
          "q": "Is this a stapler? → '___, it is.'",
          "options": ["No", "Not", "Yes", "It"],
          "answer": 2
        },
        {
          "q": "What is that? → '___ a folder.'",
          "options": ["They're", "It's", "These", "Those"],
          "answer": 1
        },
        {
          "q": "___ are my friend's books. (GẦN)",
          "options": ["That", "This", "Those", "These"],
          "answer": 3
        }
      ]
    },
    "speaking": {
      "title": "BREAKROOM 2: Describe My Stuff - Luyện nói về đồ vật",
      "instruction": "Hãy nhìn xung quanh bạn và mô tả 5 đồ vật bằng tiếng Anh!",
      "dialogue": [
        {
          "speaker": "Teacher",
          "en": "What is on your desk right now?",
          "vi": "Có gì trên bàn của bạn bây giờ?"
        },
        {
          "speaker": "Student",
          "en": "This is my notebook. It's blue and small.",
          "vi": "Đây là vở của tôi. Nó màu xanh và nhỏ."
        },
        {
          "speaker": "Teacher",
          "en": "What can you see across the room?",
          "vi": "Bạn có thể nhìn thấy gì ở phía bên kia phòng?"
        },
        {
          "speaker": "Student",
          "en": "That is a whiteboard. It's white and big.",
          "vi": "Đó là bảng trắng. Nó màu trắng và to."
        },
        {
          "speaker": "Teacher",
          "en": "Is this your bag?",
          "vi": "Đây có phải túi của bạn không?"
        },
        {
          "speaker": "Student",
          "en": "Yes, it is! That is my bag. It's black.",
          "vi": "Vâng, đúng vậy! Đó là túi của tôi. Nó màu đen."
        },
        {
          "speaker": "Teacher",
          "en": "How many pens do you have? Are they yours?",
          "vi": "Bạn có bao nhiêu cây bút? Chúng có phải của bạn không?"
        },
        {
          "speaker": "Student",
          "en": "I have two pens. These are my pens. They're blue and red.",
          "vi": "Tôi có hai cây bút. Đây là những cây bút của tôi. Chúng màu xanh và đỏ."
        }
      ],
      "questions": [
        {
          "q": "What is on your desk right now?",
          "sampleAnswer": "This is my ___ / These are my ___. They are ___"
        },
        {
          "q": "What can you see across the room?",
          "sampleAnswer": "That is a ___ / Those are ___. They are ___"
        },
        {
          "q": "Is this your bag?",
          "sampleAnswer": "Yes, it is. That is my bag. It's ___."
        },
        {
          "q": "How many pens do you have? Are they yours?",
          "sampleAnswer": "I have ___ pens. These are my pens. They're ___."
        }
      ]
    },
    "translation": {
      "title": "LUYỆN DỊCH: VIỆT → ANH (10 CÂU)",
      "instruction": "Dịch câu tiếng Việt sang tiếng Anh. Nhấn 🎤 để nói hoặc gõ đáp án.",
      "sentences": [
        { "vi": "Đây là một cuốn sách.", "en": "This is a book." },
        { "vi": "Đó là cái bàn to.", "en": "That is a big table." },
        { "vi": "Đây là những cây bút của tôi.", "en": "These are my pens." },
        { "vi": "Đó là những chiếc ghế màu trắng.", "en": "Those are white chairs." },
        { "vi": "Đây là điện thoại của tôi. Nó màu đen.", "en": "This is my phone. It's black." },
        { "vi": "Cái này là gì? – Đó là một cục tẩy.", "en": "What is this? – It's an eraser." },
        { "vi": "Đó là những cái gì? – Đó là những chìa khóa.", "en": "What are those? – They're keys." },
        { "vi": "Đây có phải là túi của bạn không? – Có, đúng vậy.", "en": "Is this your bag? – Yes, it is." },
        { "vi": "Đó có phải là kính mắt của cô ấy không? – Không phải.", "en": "Is that her glasses? – No, it isn't." },
        { "vi": "Đây là những quyển vở của chúng tôi.", "en": "These are our notebooks." },
        { "vi": "Đây là một cái ô.", "en": "This is an umbrella." },
        { "vi": "Đó là một chiếc đồng hồ cũ.", "en": "That is an old clock." },
        { "vi": "Đây là những cái bút chì của tôi.", "en": "These are my pencils." },
        { "vi": "Đó là những chiếc ghế sofa màu xanh.", "en": "Those are blue sofas." },
        { "vi": "Đây có phải là thước kẻ của bạn không? – Có, đúng vậy.", "en": "Is this your ruler? – Yes, it is." },
        { "vi": "Đó có phải là máy tính bảng của anh ấy không? – Không phải.", "en": "Is that his tablet? – No, it isn't." },
        { "vi": "Cái kia là gì? – Đó là một cái đèn.", "en": "What is that? – It's a lamp." },
        { "vi": "Đây là những cái gì? – Đây là những cái lược.", "en": "What are these? – They're combs." },
        { "vi": "Đây là ví của tôi. Nó màu nâu.", "en": "This is my wallet. It's brown." },
        { "vi": "Đó là những chiếc túi của họ.", "en": "Those are their bags." }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "___ is a book. (1 cuốn sách – GẦN)",
        "options": [
          "That",
          "This",
          "These",
          "Those"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "___ are my keys. (nhiều chìa khóa – XA)",
        "options": [
          "This",
          "That",
          "These",
          "Those"
        ],
        "answer": 3
      },
      {
        "type": "grammar",
        "q": "What ___ this?",
        "options": [
          "are",
          "is",
          "am",
          "were"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "What are those? → '___ are glasses.'",
        "options": [
          "It",
          "This",
          "They",
          "That"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "Is this a pen? → '___, it is.'",
        "options": [
          "No",
          "Yes",
          "Not",
          "Isn't"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "___ are her books. (nhiều sách – GẦN)",
        "options": [
          "Those",
          "This",
          "That",
          "These"
        ],
        "answer": 3
      },
      {
        "type": "grammar",
        "q": "___ is a fan. (1 cái quạt – XA)",
        "options": [
          "This",
          "Those",
          "That",
          "These"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "What are ___? → 'They're headphones.' (gần)",
        "options": [
          "those",
          "that",
          "this",
          "these"
        ],
        "answer": 3
      },
      {
        "type": "vocab",
        "q": "'Umbrella' nghĩa là?",
        "options": [
          "chìa khóa",
          "ô/dù",
          "ví",
          "kính"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Đây là cặp sách của tôi.'",
        "answer": "This is my bag"
      },
      { "type": "grammar", "q": "___ is a ruler. (1 cái thước – GẦN)", "options": ["That","Those","These","This"], "answer": 3 },
      { "type": "grammar", "q": "___ are my books. (nhiều sách – GẦN)", "options": ["That","This","Those","These"], "answer": 3 },
      { "type": "grammar", "q": "___ is an umbrella. (1 cái ô – XA)", "options": ["This","These","That","Those"], "answer": 2 },
      { "type": "grammar", "q": "What ___ those?", "options": ["am","is","were","are"], "answer": 3 },
      { "type": "grammar", "q": "Is that a lamp? → '___, it isn't.'", "options": ["Yes","Not","No","Isn't"], "answer": 2 },
      { "type": "grammar", "q": "What are ___? → 'They're combs.' (xa)", "options": ["these","this","that","those"], "answer": 3 },
      { "type": "vocab", "q": "'Pencil' nghĩa là?", "options": ["thước kẻ","tẩy","bút chì","bút"], "answer": 2 },
      { "type": "vocab", "q": "'Stapler' nghĩa là?", "options": ["kéo","cặp sách","dập ghim","thước"], "answer": 2 },
      { "type": "vocab", "q": "'Curtain' nghĩa là?", "options": ["cửa sổ","rèm cửa","quạt","đèn"], "answer": 1 }
    ],
    "mindmap": {
      "type": "structured",
      "center": "THIS / THAT / THESE / THOSE",
      "branches": [
        {
          "icon": "📍",
          "label": "GẦN (NEAR)",
          "sub": "Vật ở gần bạn",
          "items": [
            "THIS (số ít) → This is a pen.",
            "THESE (số nhiều) → These are pens."
          ]
        },
        {
          "icon": "📏",
          "label": "XA (FAR)",
          "sub": "Vật ở xa bạn",
          "items": [
            "THAT (số ít) → That is a table.",
            "THOSE (số nhiều) → Those are books."
          ]
        },
        {
          "icon": "❓",
          "label": "HỎI ĐÁP",
          "sub": "Questions & Answers",
          "items": [
            "What is this? → It's a pen.",
            "What are these? → They're pens.",
            "Is this a pen? → Yes, it is. / No, it isn't."
          ],
          "box": {
            "title": "💡 MẸO NHỚ NHANH:",
            "items": [
              "GẦN → THIS (1) / THESE (nhiều)",
              "XA → THAT (1) / THOSE (nhiều)",
              "Số ít → IS",
              "Số nhiều → ARE"
            ]
          },
          "tips": {
            "title": "⚠️ LƯU Ý:",
            "items": [
              "\"This is\" → \"This's\" ✗ (KHÔNG rút gọn)",
              "\"That is\" → \"That's\" ✓ (CÓ THỂ rút gọn)",
              "\"It is\" → \"It's\" ✓ (CÓ THỂ rút gọn)"
            ]
          }
        }
      ]
    },
    "homeworkRich": {
      "title": "BÀI TẬP VỀ NHÀ - BUỔI 6: ĐỒ VẬT HẰNG NGÀY",
      "submit": "Group ZL (video + chụp ảnh bài viết)",
      "deadline": "Trước buổi học tiếp theo",
      "tasks": [
        {
          "icon": "🎥",
          "title": "BÀI TẬP 1: MY ROOM TOUR",
          "badge": "Bắt buộc",
          "desc": "Quay video 1-2 phút giới thiệu phòng của bạn bằng tiếng Anh.",
          "items": [
            "Chỉ vào 8-10 đồ vật và mô tả bằng this/that/these/those",
            "Nói tên, màu sắc và kích thước của mỗi đồ vật",
            "VD: 'This is my desk. It's brown and big.'"
          ],
          "note": "Nói tự nhiên, không cần hoàn hảo!"
        },
        {
          "icon": "✏️",
          "title": "BÀI TẬP 2: VIẾT 10 CÂU",
          "badge": "",
          "desc": "Viết 10 câu mô tả đồ vật trong nhà / phòng của bạn.",
          "items": [
            "Dùng đủ 4 loại: this / that / these / those",
            "Mỗi loại ít nhất 2 câu",
            "VD: 'This is my phone. It's black and small.'"
          ]
        },
        {
          "icon": "🎧",
          "title": "BÀI TẬP 3: XEM VIDEO ÔN TẬP",
          "badge": "Bắt buộc",
          "desc": "Xem video và lặp lại theo (shadowing):",
          "links": [
            { "label": "Video 1: This/That/These/Those", "url": "https://www.youtube.com/watch?v=uVOSKECM-Vs" },
            { "label": "Video 2: Grammar Practice", "url": "https://www.youtube.com/watch?v=zYBzrgjknP0" }
          ],
          "note": "Xem 2-3 lần và lặp lại theo để luyện phát âm"
        }
      ]
    },
    "homework": [
      "🎥 Quay video 1-2 phút giới thiệu phòng của bạn (chỉ vào 8-10 đồ vật và mô tả bằng this/that/these/those)",
      "✏️ Viết 10 câu mô tả đồ vật trong nhà/phòng (dùng đủ 4 loại: this/that/these/those, mỗi loại ít nhất 2 câu)",
      "🎧 Xem video ôn tập:\nhttps://www.youtube.com/watch?v=uVOSKECM-Vs\nhttps://www.youtube.com/watch?v=zYBzrgjknP0\n→ Xem 2-3 lần và lặp lại theo (shadowing)"
    ]
  },
  {
    "id": 7,
    "sectionFlow": [
      "intro",
      "review",
      "video",
      "vocab",
      "vocab_match",
      "listen_pick",
      "grammar",
      "listen_quiz",
      "translate",
      "dialogue_video",
      "dialogue_video_quiz",
      "dialogue_video_order",
      "speaking",
      "minitest",
      "mindmap",
      "homework"
    ],
    "skipSections": [
      "writing",
      "story",
      "dictation"
    ],
    "unit": "Unit 2",
    "title": "Mô tả khuôn mặt & Ôn tập tổng hợp",
    "subtitle": "Describing People & Comprehensive Review",
    "speechProfile": {
      "natural": true,
      "rate": 0.86,
      "pitch": 1.02,
      "pauseMs": 750,
      "voiceHints": [
        "Natural",
        "Neural",
        "Jenny",
        "Aria",
        "Ava",
        "Emma",
        "Google US English"
      ]
    },
    "objectives": [
      "Mô tả khuôn mặt và ngoại hình bằng tiếng Anh tự nhiên",
      "Dùng động từ have / has đúng ngữ cảnh",
      "Hỏi – đáp về ngoại hình người khác",
      "Ôn tổng hợp ngữ pháp từ Buổi 1–6"
    ],
    "review": {
      "title": "Ôn tập - Đồ vật hằng ngày",
      "questions": [
        {
          "q": "Ôn lại This / That / These / Those qua 4 đồ vật gần - xa, số ít - số nhiều.",
          "dialogue": [
            {
              "speaker": "A",
              "text": "This is my phone. It's black and small."
            },
            {
              "speaker": "B",
              "text": "That is a table. It's big and brown."
            },
            {
              "speaker": "A",
              "text": "These are my pens. They're blue."
            },
            {
              "speaker": "B",
              "text": "Those are books. They're heavy."
            }
          ]
        }
      ],
      "vocabGame": {
        "title": "Minigame: This / That / These / Those",
        "items": [
          {
            "object": "📱 điện thoại",
            "distance": "Gần",
            "quantity": "1",
            "prompt": "📱 điện thoại - gần - 1 đồ vật",
            "answer": "This"
          },
          {
            "object": "📚 sách",
            "distance": "Xa",
            "quantity": "Nhiều",
            "prompt": "📚 sách - xa - nhiều đồ vật",
            "answer": "Those"
          },
          {
            "object": "🖊️ bút",
            "distance": "Gần",
            "quantity": "Nhiều",
            "prompt": "🖊️ bút - gần - nhiều đồ vật",
            "answer": "These"
          },
          {
            "object": "🪑 ghế",
            "distance": "Xa",
            "quantity": "1",
            "prompt": "🪑 ghế - xa - 1 đồ vật",
            "answer": "That"
          }
        ]
      },
      "structures": [
        "This is + singular noun (near)",
        "That is + singular noun (far)",
        "These are + plural noun (near)",
        "Those are + plural noun (far)"
      ],
      "summary": "Bây giờ chúng ta sẽ học cách <b>MÔ TẢ KHUÔN MẶT</b> bằng have/has!",
      "reviewGames": {
        "title": "Ôn tập Buổi 6 - Đồ vật hằng ngày & This/That/These/Those",
        "intro": "Làm 2 thử thách để ôn từ vựng Buổi 6 và cấu trúc This / That / These / Those trước khi vào bài mới.",
        "vocabulary": [
          {
            "en": "phone",
            "vi": "điện thoại",
            "img": "📱",
            "ipa": "/foʊn/",
            "options": [
              "điện thoại",
              "máy tính",
              "bàn phím",
              "loa"
            ],
            "answer": 0
          },
          {
            "en": "table",
            "vi": "bàn",
            "img": "🪑",
            "ipa": "/ˈteɪbəl/",
            "options": [
              "ghế",
              "bàn",
              "giường",
              "tủ"
            ],
            "answer": 1
          },
          {
            "en": "book",
            "vi": "sách",
            "img": "📖",
            "ipa": "/bʊk/",
            "options": [
              "bút",
              "vở",
              "sách",
              "thước"
            ],
            "answer": 2
          },
          {
            "en": "pen",
            "vi": "bút",
            "img": "🖊️",
            "ipa": "/pen/",
            "options": [
              "bút",
              "kéo",
              "tẩy",
              "thước"
            ],
            "answer": 0
          },
          {
            "en": "chair",
            "vi": "ghế",
            "img": "🪑",
            "ipa": "/tʃer/",
            "options": [
              "bàn",
              "ghế",
              "cửa",
              "cửa sổ"
            ],
            "answer": 1
          },
          {
            "en": "bag",
            "vi": "túi xách",
            "img": "👜",
            "ipa": "/bæɡ/",
            "options": [
              "ví",
              "mũ",
              "túi xách",
              "áo khoác"
            ],
            "answer": 2
          },
          {
            "en": "key",
            "vi": "chìa khóa",
            "img": "🔑",
            "ipa": "/kiː/",
            "options": [
              "chìa khóa",
              "đồng hồ",
              "nhẫn",
              "vòng tay"
            ],
            "answer": 0
          },
          {
            "en": "wallet",
            "vi": "ví tiền",
            "img": "👛",
            "ipa": "/ˈwɑːlɪt/",
            "options": [
              "kính mắt",
              "ví tiền",
              "khăn",
              "nón"
            ],
            "answer": 1
          },
          {
            "en": "glasses",
            "vi": "kính mắt",
            "img": "👓",
            "ipa": "/ˈɡlæsɪz/",
            "options": [
              "kính mắt",
              "gương",
              "đèn",
              "màn hình"
            ],
            "answer": 0
          },
          {
            "en": "watch",
            "vi": "đồng hồ đeo tay",
            "img": "⌚",
            "ipa": "/wɑːtʃ/",
            "options": [
              "điện thoại",
              "đồng hồ đeo tay",
              "vòng tay",
              "nhẫn"
            ],
            "answer": 1
          },
          {
            "en": "This",
            "vi": "cái này (gần)",
            "img": "👉",
            "ipa": "/ðɪs/",
            "options": [
              "những cái đó (xa)",
              "cái đó (xa)",
              "cái này (gần)",
              "những cái này (gần)"
            ],
            "answer": 2
          },
          {
            "en": "That",
            "vi": "cái đó (xa)",
            "img": "👉",
            "ipa": "/ðæt/",
            "options": [
              "cái đó (xa)",
              "cái này (gần)",
              "những cái đó",
              "những cái này"
            ],
            "answer": 0
          },
          {
            "en": "These",
            "vi": "những cái này (gần)",
            "img": "👉",
            "ipa": "/ðiːz/",
            "options": [
              "cái này",
              "cái đó",
              "những cái đó",
              "những cái này (gần)"
            ],
            "answer": 3
          },
          {
            "en": "Those",
            "vi": "những cái đó (xa)",
            "img": "👉",
            "ipa": "/ðoʊz/",
            "options": [
              "những cái đó (xa)",
              "cái này",
              "những cái này",
              "cái đó"
            ],
            "answer": 0
          },
          {
            "en": "laptop",
            "vi": "laptop",
            "img": "💻",
            "ipa": "/ˈlæptɑːp/",
            "options": [
              "máy tính bảng",
              "điện thoại",
              "laptop",
              "máy in"
            ],
            "answer": 2
          },
          {
            "en": "umbrella",
            "vi": "ô dù",
            "img": "☂️",
            "ipa": "/ʌmˈbrelə/",
            "options": [
              "mũ",
              "ô dù",
              "áo mưa",
              "khăn quàng"
            ],
            "answer": 1
          },
          {
            "en": "notebook",
            "vi": "tập/vở",
            "img": "📓",
            "ipa": "/ˈnoʊtbʊk/",
            "options": [
              "sách",
              "từ điển",
              "tập/vở",
              "tạp chí"
            ],
            "answer": 2
          },
          {
            "en": "pencil",
            "vi": "bút chì",
            "img": "✏️",
            "ipa": "/ˈpensəl/",
            "options": [
              "bút mực",
              "bút chì",
              "bút dạ",
              "tẩy"
            ],
            "answer": 1
          },
          {
            "en": "small",
            "vi": "nhỏ",
            "img": "▫️",
            "ipa": "/smɔːl/",
            "options": [
              "lớn",
              "nặng",
              "nhỏ",
              "dài"
            ],
            "answer": 2
          },
          {
            "en": "heavy",
            "vi": "nặng",
            "img": "🏋️",
            "ipa": "/ˈhevi/",
            "options": [
              "nhẹ",
              "nặng",
              "mỏng",
              "dày"
            ],
            "answer": 1
          }
        ],
        "quizBomb": {
          "title": "Quiz Bomb Review - This / That / These / Those",
          "instruction": "Trả lời 20 câu ôn tập Buổi 6 trong 5 giây mỗi câu.",
          "questions": [
            {
              "q": "___ is my book. (gần, 1 cuốn)",
              "options": [
                "That",
                "These",
                "This",
                "Those"
              ],
              "answer": 2
            },
            {
              "q": "___ are my keys. (gần, nhiều chiếc)",
              "options": [
                "This",
                "These",
                "That",
                "Those"
              ],
              "answer": 1
            },
            {
              "q": "___ is a chair. (xa, 1 cái)",
              "options": [
                "These",
                "This",
                "Those",
                "That"
              ],
              "answer": 3
            },
            {
              "q": "___ are pens. (xa, nhiều chiếc)",
              "options": [
                "Those",
                "That",
                "This",
                "These"
              ],
              "answer": 0
            },
            {
              "q": "What is \"small\" in Vietnamese?",
              "options": [
                "lớn",
                "dài",
                "nhỏ",
                "nặng"
              ],
              "answer": 2
            },
            {
              "q": "___ is a laptop. (xa, 1 cái)",
              "options": [
                "This",
                "These",
                "That",
                "Those"
              ],
              "answer": 2
            },
            {
              "q": "What is \"bag\" in Vietnamese?",
              "options": [
                "ví tiền",
                "mũ",
                "túi xách",
                "đồng hồ"
              ],
              "answer": 2
            },
            {
              "q": "___ are books. (gần, nhiều cuốn)",
              "options": [
                "That",
                "Those",
                "This",
                "These"
              ],
              "answer": 3
            },
            {
              "q": "What is \"heavy\" in Vietnamese?",
              "options": [
                "nhẹ",
                "nặng",
                "dài",
                "ngắn"
              ],
              "answer": 1
            },
            {
              "q": "___ is my phone. (gần, 1 cái)",
              "options": [
                "Those",
                "These",
                "This",
                "That"
              ],
              "answer": 2
            },
            {
              "q": "What is \"wallet\" in Vietnamese?",
              "options": [
                "chìa khóa",
                "ví tiền",
                "kính mắt",
                "đồng hồ"
              ],
              "answer": 1
            },
            {
              "q": "___ are my glasses. (gần, nhiều)",
              "options": [
                "That",
                "This",
                "These",
                "Those"
              ],
              "answer": 2
            },
            {
              "q": "\"It's black and small.\" — Dịch nghĩa?",
              "options": [
                "Nó to và trắng",
                "Nó đen và nhỏ",
                "Nó dài và nâu",
                "Nó nặng và xanh"
              ],
              "answer": 1
            },
            {
              "q": "___ is a table. (xa, 1 cái)",
              "options": [
                "These",
                "This",
                "That",
                "Those"
              ],
              "answer": 2
            },
            {
              "q": "What is \"watch\" in Vietnamese?",
              "options": [
                "điện thoại",
                "nhẫn",
                "đồng hồ đeo tay",
                "vòng tay"
              ],
              "answer": 2
            },
            {
              "q": "___ are notebooks. (xa, nhiều)",
              "options": [
                "Those",
                "These",
                "This",
                "That"
              ],
              "answer": 0
            },
            {
              "q": "What is \"umbrella\" in Vietnamese?",
              "options": [
                "áo mưa",
                "mũ",
                "khăn quàng",
                "ô dù"
              ],
              "answer": 3
            },
            {
              "q": "___ is my key. (gần, 1 chiếc)",
              "options": [
                "Those",
                "These",
                "That",
                "This"
              ],
              "answer": 3
            },
            {
              "q": "\"These are my pens.\" — \"These\" nghĩa là?",
              "options": [
                "Cái đó (xa)",
                "Những cái này (gần)",
                "Cái này (gần)",
                "Những cái đó (xa)"
              ],
              "answer": 1
            },
            {
              "q": "What is \"pencil\" in Vietnamese?",
              "options": [
                "bút mực",
                "bút dạ",
                "bút chì",
                "tẩy"
              ],
              "answer": 2
            }
          ]
        }
      }
    },
    "video": {
      "title": "Describing People | Updated | Appearance & Personality | Beginner English A1",
      "url": "https://www.youtube.com/watch?v=uMkJ4qcx5iw",
      "description": "Video Woodward English dạy cách mô tả ngoại hình (appearance) và tính cách (personality) ở cấp độ A1: have/has, câu hỏi \"What does she look like?\", từ vựng về tóc, mắt, hình dáng khuôn mặt và đặc điểm khác.",
      "duration": "8 phút",
      "sceneSummary": "nội dung chính về appearance và personality",
      "scenes": [
        {
          "label": "Have/has, What does ... look like?, adjective order, hair/eyes/face vocabulary",
          "time": 0
        }
      ],
      "questions": [
        {
          "id": 1,
          "question": "Điền vào chỗ trống: Cô ấy có mái tóc màu đỏ.\nShe ___ red hair.",
          "options": [
            { "id": "A", "text": "have" },
            { "id": "B", "text": "has" },
            { "id": "C", "text": "is" },
            { "id": "D", "text": "are" }
          ],
          "correctAnswer": "B"
        },
        {
          "id": 2,
          "question": "Điền vào chỗ trống: Anh ấy bị hói đầu.\nHe ___ bald.",
          "options": [
            { "id": "A", "text": "has" },
            { "id": "B", "text": "have" },
            { "id": "C", "text": "is" },
            { "id": "D", "text": "are" }
          ],
          "correctAnswer": "C"
        },
        {
          "id": 3,
          "question": "Điền vào chỗ trống: Anh ấy có ria mép.\nHe ___ a moustache.",
          "options": [
            { "id": "A", "text": "is" },
            { "id": "B", "text": "are" },
            { "id": "C", "text": "have" },
            { "id": "D", "text": "has" }
          ],
          "correctAnswer": "D"
        },
        {
          "id": 4,
          "question": "Chọn cụm từ đúng theo thứ tự để điền vào chỗ trống: Cô ấy có mái tóc dài màu nâu.\nShe has ___.",
          "options": [
            { "id": "A", "text": "brown long hair" },
            { "id": "B", "text": "long brown hair" },
            { "id": "C", "text": "hair long brown" },
            { "id": "D", "text": "brown hair long" }
          ],
          "correctAnswer": "B"
        },
        {
          "id": 5,
          "question": "Điền vào chỗ trống: Cô ấy rất thân thiện.\nShe ___ friendly.",
          "options": [
            { "id": "A", "text": "has" },
            { "id": "B", "text": "have" },
            { "id": "C", "text": "is" },
            { "id": "D", "text": "are" }
          ],
          "correctAnswer": "C"
        }
      ]
    },
    "vocabGroups": {
      "introVideo": "Video giới thiệu: khuôn mặt & ngoại hình (16 từ)",
      "dialogueVideo": "Video hội thoại: hỏi đáp ngoại hình (12 từ)"
    },
    "listenPickAll": true,
    "vocabulary": [
      {
        "en": "young",
        "vi": "trẻ tuổi",
        "img": "🙂",
        "ipa": "/jʌŋ/",
        "group": "introVideo"
      },
      {
        "en": "old",
        "vi": "già, lớn tuổi",
        "img": "🙂",
        "ipa": "/oʊld/",
        "group": "introVideo"
      },
      {
        "en": "overweight",
        "vi": "thừa cân",
        "img": "🙂",
        "ipa": "/ˌoʊvərˈweɪt/",
        "group": "introVideo"
      },
      {
        "en": "beautiful",
        "vi": "xinh đẹp",
        "img": "🙂",
        "ipa": "/ˈbjuːtɪfl/",
        "group": "introVideo"
      },
      {
        "en": "handsome",
        "vi": "đẹp trai",
        "img": "🙂",
        "ipa": "/ˈhænsəm/",
        "group": "introVideo"
      },
      {
        "en": "tall",
        "vi": "cao",
        "img": "🙂",
        "ipa": "/tɔːl/",
        "group": "introVideo"
      },
      {
        "en": "average height",
        "vi": "chiều cao trung bình",
        "img": "📏",
        "ipa": "/ˈævərɪdʒ haɪt/",
        "group": "introVideo"
      },
      {
        "en": "blonde",
        "vi": "vàng hoe (chỉ màu tóc)",
        "img": "💇",
        "ipa": "/blɑːnd/",
        "group": "introVideo"
      },
      {
        "en": "bald",
        "vi": "hói đầu",
        "img": "💇",
        "ipa": "/bɔːld/",
        "group": "introVideo"
      },
      {
        "en": "funny",
        "vi": "hài hước, vui tính",
        "img": "🙂",
        "ipa": "/ˈfʌni/",
        "group": "introVideo"
      },
      {
        "en": "smart",
        "vi": "thông minh",
        "img": "🙂",
        "ipa": "/smɑːrt/",
        "group": "introVideo"
      },
      {
        "en": "shy",
        "vi": "nhút nhát, bẽn lẽn",
        "img": "🙂",
        "ipa": "/ʃaɪ/",
        "group": "introVideo"
      },
      {
        "en": "friendly",
        "vi": "thân thiện",
        "img": "🙂",
        "ipa": "/ˈfrendli/",
        "group": "introVideo"
      },
      {
        "en": "lazy",
        "vi": "lười biếng",
        "img": "🙂",
        "ipa": "/ˈleɪzi/",
        "group": "introVideo"
      },
      {
        "en": "boring",
        "vi": "nhàm chán",
        "img": "🙂",
        "ipa": "/ˈbɔːrɪŋ/",
        "group": "introVideo"
      },
      {
        "en": "hard-working",
        "vi": "chăm chỉ làm việc",
        "img": "💼",
        "ipa": "/ˌhɑːrd ˈwɜːrkɪŋ/",
        "group": "introVideo"
      },
      {
        "en": "medium length",
        "vi": "chiều dài trung bình",
        "img": "💇",
        "ipa": "/ˈmiːdiəm lɛŋkθ/",
        "group": "dialogueVideo"
      },
      {
        "en": "wavy",
        "vi": "gợn sóng, hơi xoăn",
        "img": "💇",
        "ipa": "/ˈweɪvi/",
        "group": "dialogueVideo"
      },
      {
        "en": "curly",
        "vi": "xoăn (thành lọn)",
        "img": "💇",
        "ipa": "/ˈkɜːrli/",
        "group": "dialogueVideo"
      },
      {
        "en": "spiky",
        "vi": "lởm chởm, dựng đứng",
        "img": "💇",
        "ipa": "/ˈspaɪki/",
        "group": "dialogueVideo"
      },
      {
        "en": "thin",
        "vi": "gầy, ốm",
        "img": "🙂",
        "ipa": "/θɪn/",
        "group": "dialogueVideo"
      },
      {
        "en": "fat",
        "vi": "béo, mập",
        "img": "🙂",
        "ipa": "/fæt/",
        "group": "dialogueVideo"
      },
      {
        "en": "short",
        "vi": "thấp, lùn",
        "img": "🙂",
        "ipa": "/ʃɔːrt/",
        "group": "dialogueVideo"
      },
      {
        "en": "average height",
        "vi": "chiều cao trung bình",
        "img": "📏",
        "ipa": "/ˈævərɪdʒ haɪt/",
        "group": "dialogueVideo"
      },
      {
        "en": "freckles",
        "vi": "tàn nhang",
        "img": "😊",
        "ipa": "/ˈfreklz/",
        "group": "dialogueVideo"
      },
      {
        "en": "beard",
        "vi": "râu (cằm, quai nón)",
        "img": "🧔",
        "ipa": "/bɪrd/",
        "group": "dialogueVideo"
      },
      {
        "en": "mustache",
        "vi": "ria mép",
        "img": "🧔",
        "ipa": "/ˈmʌstæʃ/",
        "group": "dialogueVideo"
      },
      {
        "en": "mole",
        "vi": "nốt ruồi",
        "img": "😊",
        "ipa": "/moʊl/",
        "group": "dialogueVideo"
      }
    ],
    "grammar": {
      "title": "4 Cấu Trúc Câu - Mô Tả Khuôn Mặt",
      "intro": "Trong video, chúng ta đã học 4 cấu trúc câu để mô tả khuôn mặt và ngoại hình. Hãy học thuộc và thực hành ngay!",
      "structures": [
        {
          "num": 1,
          "pattern": "S + HAVE / HAS + đặc điểm",
          "vi": "Sở hữu đặc điểm",
          "style": "Dùng để nói ai đó có đặc điểm gì",
          "example": "She has long black hair.",
          "exampleVi": "Cô ấy có tóc đen dài.",
          "context": "I/You/We/They → HAVE | He/She/It → HAS"
        },
        {
          "num": 2,
          "pattern": "What does S look like?",
          "vi": "Hỏi về ngoại hình",
          "style": "Câu hỏi để hỏi ai đó trông như thế nào",
          "example": "What does she look like? - She has long hair and big eyes.",
          "exampleVi": "Cô ấy trông như thế nào? - Cô ấy có tóc dài và mắt to.",
          "context": "Dùng 'does' với He/She/It, 'do' với I/You/We/They"
        },
        {
          "num": 3,
          "pattern": "S + BE + tính từ mô tả",
          "vi": "Mô tả tổng thể",
          "style": "Dùng để đánh giá chung về ngoại hình",
          "example": "She is beautiful. He is handsome.",
          "exampleVi": "Cô ấy đẹp. Anh ấy đẹp trai.",
          "context": "Dùng am/is/are tùy chủ ngữ"
        },
        {
          "num": 4,
          "pattern": "S + HAVE/HAS + kích thước + hình dạng + màu sắc + danh từ",
          "vi": "Mô tả đầy đủ",
          "style": "Thứ tự tính từ: Size → Shape → Color → Noun",
          "example": "She has long, straight, black hair.",
          "exampleVi": "Cô ấy có tóc đen, thẳng, dài.",
          "context": "Chú ý thứ tự tính từ khi mô tả"
        }
      ],
      "commonQA": [
        {
          "q": "What do you look like?",
          "a": "I have short hair and big eyes."
        },
        {
          "q": "What does she look like?",
          "a": "She has long black hair."
        },
        {
          "q": "Does he have a beard?",
          "a": "Yes, he does. / No, he doesn't."
        },
        {
          "q": "Is she beautiful?",
          "a": "Yes, she is."
        }
      ],
      "formula": "HAVE vs HAS: I·You·We·They → HAVE | He·She·It → HAS | Thứ tự: Size → Shape → Color → Noun"
    },
    "listening": {
      "title": "Nghe trả lời - Have / Has / Do / Does",
      "transcript": "Listen and choose the correct word.",
      "translation": "Nghe từng câu và chọn đáp án đúng cho chỗ trống.",
      "audio": "Listen and choose the correct word.",
      "questions": [
        {
          "q": "She is ___.",
          "audio": "She is young.",
          "options": [
            "young",
            "old",
            "tall",
            "shy"
          ],
          "answer": 0
        },
        {
          "q": "He is ___.",
          "audio": "He is old.",
          "options": [
            "young",
            "old",
            "funny",
            "smart"
          ],
          "answer": 1
        },
        {
          "q": "He is ___.",
          "audio": "He is tall.",
          "options": [
            "short",
            "tall",
            "lazy",
            "boring"
          ],
          "answer": 1
        },
        {
          "q": "She is ___.",
          "audio": "She is beautiful.",
          "options": [
            "beautiful",
            "handsome",
            "boring",
            "lazy"
          ],
          "answer": 0
        },
        {
          "q": "He is ___.",
          "audio": "He is handsome.",
          "options": [
            "beautiful",
            "handsome",
            "shy",
            "smart"
          ],
          "answer": 1
        },
        {
          "q": "She is ___.",
          "audio": "She is friendly.",
          "options": [
            "friendly",
            "lazy",
            "boring",
            "shy"
          ],
          "answer": 0
        },
        {
          "q": "He is ___.",
          "audio": "He is funny.",
          "options": [
            "funny",
            "smart",
            "old",
            "tall"
          ],
          "answer": 0
        },
        {
          "q": "She is ___.",
          "audio": "She is shy.",
          "options": [
            "shy",
            "friendly",
            "tall",
            "old"
          ],
          "answer": 0
        },
        {
          "q": "He is ___.",
          "audio": "He is smart.",
          "options": [
            "smart",
            "funny",
            "lazy",
            "young"
          ],
          "answer": 0
        },
        {
          "q": "She is ___.",
          "audio": "She is lazy.",
          "options": [
            "lazy",
            "friendly",
            "hard-working",
            "beautiful"
          ],
          "answer": 0
        },
        {
          "q": "He is ___.",
          "audio": "He is hard-working.",
          "options": [
            "hard-working",
            "boring",
            "shy",
            "old"
          ],
          "answer": 0
        },
        {
          "q": "He is ___.",
          "audio": "He is overweight.",
          "options": [
            "overweight",
            "tall",
            "young",
            "smart"
          ],
          "answer": 0
        },
        {
          "q": "She has ___ hair.",
          "audio": "She has blonde hair.",
          "options": [
            "blonde",
            "bald",
            "short",
            "tall"
          ],
          "answer": 0
        },
        {
          "q": "He is ___.",
          "audio": "He is bald.",
          "options": [
            "bald",
            "blonde",
            "shy",
            "friendly"
          ],
          "answer": 0
        },
        {
          "q": "He is ___.",
          "audio": "He is average height.",
          "options": [
            "average height",
            "tall",
            "short",
            "old"
          ],
          "answer": 0
        }
      ]
    },
    "speaking": {
      "title": "Luyện nói (AI)",
      "instruction": "Luyện 5 cặp hội thoại mô tả ngoại hình và tính cách. Nghe câu hỏi, xem công thức, đọc câu mẫu rồi thu âm để AI chấm phát âm.",
      "turns": [
        {
          "id": 1,
          "ai": {
            "textEn": "I need to pick up your brother at the train station. What does he look like?",
            "textVn": "Tôi cần đón anh trai bạn ở ga tàu. Anh ấy trông như thế nào?",
            "audioUrl": "I need to pick up your brother at the train station. What does he look like?"
          },
          "user": {
            "formula": "He is ___ [height] and ___ [body build]. He has ___ [size/color] hair.",
            "sampleEn": "He is tall and thin. He has short black hair.",
            "sampleVn": "Anh ấy cao và gầy. Anh ấy có mái tóc đen ngắn.",
            "sampleAudioUrl": "He is tall and thin. He has short black hair."
          }
        },
        {
          "id": 2,
          "ai": {
            "textEn": "Can you describe your new boss? Does he have any specific facial features?",
            "textVn": "Bạn có thể mô tả sếp mới của bạn không? Ông ấy có đặc điểm khuôn mặt nào đặc biệt không?",
            "audioUrl": "Can you describe your new boss? Does he have any specific facial features?"
          },
          "user": {
            "formula": "Yes, he has a ___ [facial hair] and a ___ [facial feature] on his cheek.",
            "sampleEn": "Yes, he has a beard and a mole on his cheek.",
            "sampleVn": "Vâng, ông ấy có râu quai nón và một nốt ruồi trên má.",
            "sampleAudioUrl": "Yes, he has a beard and a mole on his cheek."
          }
        },
        {
          "id": 3,
          "ai": {
            "textEn": "What does your grandmother look like?",
            "textVn": "Bà của bạn trông như thế nào?",
            "audioUrl": "What does your grandmother look like?"
          },
          "user": {
            "formula": "She is ___ [age adjective]. She has ___ [shape], ___ [color] hair and wears ___ [accessory].",
            "sampleEn": "She is old. She has curly, white hair and wears glasses.",
            "sampleVn": "Bà ấy lớn tuổi. Bà ấy có mái tóc trắng, xoăn và đeo kính.",
            "sampleAudioUrl": "She is old. She has curly, white hair and wears glasses."
          }
        },
        {
          "id": 4,
          "ai": {
            "textEn": "Appearance is important, but personality matters too. What is your best friend like?",
            "textVn": "Ngoại hình rất quan trọng, nhưng tính cách cũng vậy. Bạn thân của bạn là người như thế nào?",
            "audioUrl": "Appearance is important, but personality matters too. What is your best friend like?"
          },
          "user": {
            "formula": "She is very ___ [personality adjective] and ___ [personality adjective].",
            "sampleEn": "She is very friendly and funny.",
            "sampleVn": "Cô ấy rất thân thiện và hài hước.",
            "sampleAudioUrl": "She is very friendly and funny."
          }
        },
        {
          "id": 5,
          "ai": {
            "textEn": "Let's practice a full introduction. Describe your height, your hair, and one personality trait.",
            "textVn": "Hãy luyện tập giới thiệu đầy đủ. Hãy mô tả chiều cao, mái tóc và một nét tính cách của bạn.",
            "audioUrl": "Let's practice a full introduction. Describe your height, your hair, and one personality trait."
          },
          "user": {
            "formula": "I am ___ [height] and ___ [personality trait]. I have ___ [length], ___ [color] hair.",
            "sampleEn": "I am average height and hard-working. I have medium length, brown hair.",
            "sampleVn": "Tôi có chiều cao trung bình và chăm chỉ. Tôi có mái tóc nâu, dài trung bình.",
            "sampleAudioUrl": "I am average height and hard-working. I have medium length, brown hair."
          }
        }
      ]
    },
    "translation": {
      "title": "LUYỆN DỊCH: VIỆT → ANH (20 CÂU)",
      "instruction": "Dịch câu tiếng Việt sang tiếng Anh. Nhấn 🎤 để nói hoặc gõ đáp án, chỉ xem mẫu sau khi kiểm tra.",
      "sentences": [
        {
          "vi": "Cô ấy xinh đẹp.",
          "en": "She is beautiful."
        },
        {
          "vi": "Anh ấy đẹp trai.",
          "en": "He is handsome."
        },
        {
          "vi": "Ông ấy lớn tuổi và bị hói.",
          "en": "He is old and bald."
        },
        {
          "vi": "Cô ấy có chiều cao trung bình và gầy.",
          "en": "She is average height and thin."
        },
        {
          "vi": "Anh ấy hơi béo. (Sử dụng từ vựng video 1)",
          "en": "He is a little fat."
        },
        {
          "vi": "Anh ấy thừa cân. (Sử dụng từ vựng video 2)",
          "en": "He is overweight."
        },
        {
          "vi": "Cô ấy thân thiện và chăm chỉ.",
          "en": "She is friendly and hard-working."
        },
        {
          "vi": "Anh ấy nhút nhát.",
          "en": "He is shy."
        },
        {
          "vi": "Anh ấy có râu quai nón.",
          "en": "He has a beard."
        },
        {
          "vi": "Ông ấy có ria mép.",
          "en": "He has a mustache."
        },
        {
          "vi": "Cô ấy có tàn nhang.",
          "en": "She has freckles."
        },
        {
          "vi": "Anh ấy có một nốt ruồi.",
          "en": "He has a mole."
        },
        {
          "vi": "Cô ấy có mái tóc dài màu nâu.",
          "en": "She has long brown hair."
        },
        {
          "vi": "Anh ấy có mái tóc ngắn màu đen.",
          "en": "He has short black hair."
        },
        {
          "vi": "Bà ấy có mái tóc ngắn màu xám.",
          "en": "She has short grey hair."
        },
        {
          "vi": "Cô ấy có mái tóc gợn sóng màu vàng hoe, dài trung bình. (Kết hợp Size + Shape + Color từ Video 1)",
          "en": "She has medium length wavy blonde hair."
        },
        {
          "vi": "Cô ấy trông như thế nào?",
          "en": "What does she look like?"
        },
        {
          "vi": "Anh ấy trông như thế nào?",
          "en": "What does he look like?"
        },
        {
          "vi": "Họ trông như thế nào?",
          "en": "What do they look like?"
        },
        {
          "vi": "Bạn trông như thế nào?",
          "en": "What do you look like?"
        }
      ]
    },
    "dialogueVideo": {
      "title": "Video hội thoại: Describing People | Appearance",
      "label": "Describing People | Appearance",
      "url": "https://www.youtube.com/watch?v=CU3Wqb3eadc",
      "description": "Hội thoại thực tế giữa 2 người về mô tả ngoại hình người quen: What does she look like?, She has..., Does he wear...?",
      "transcript": [
        {
          "speaker": "Host",
          "en": "There will be some very important guests at the company party on Saturday. Please try to introduce yourself to them.",
          "vi": ""
        },
        {
          "speaker": "Host",
          "en": "Ms. Overby has **medium length**, **wavy**, **blonde hair**, and **freckles**. She is **short** and **thin**.",
          "vi": ""
        },
        {
          "speaker": "Host",
          "en": "Mr. Jonasson **shaved his head** and has a **beard**. He has **green eyes**. He is a little **fat**.",
          "vi": ""
        },
        {
          "speaker": "Host",
          "en": "Mr. Kim has **short gray hair** and **wears glasses**. He is **average height** and **thin**. He always **shaves**.",
          "vi": ""
        },
        {
          "speaker": "Host",
          "en": "Mrs. Anderson has **curly**, **white hair** and likes to wear **large earrings**. She is **tall** and **thin**.",
          "vi": ""
        },
        {
          "speaker": "Host",
          "en": "Mr. Vertigan has **short black hair** and a **mustache**. He has a **mole** on his **cheek**. He is quite **short** and **fat**.",
          "vi": ""
        },
        {
          "speaker": "Host",
          "en": "Ms. Walker is our boss. She has **dyed green**, **spiky hair**, and a **small tattoo** on her **left wrist**.",
          "vi": ""
        }
      ],
      "listenChoose": [
        {
          "q": "What does the friend look like?",
          "options": [
            "She has short hair.",
            "She has long black hair and big eyes.",
            "She has curly hair.",
            "She has brown hair."
          ],
          "answer": 1
        },
        {
          "q": "Does the friend have dimples?",
          "options": [
            "Yes, she does.",
            "No, she doesn't.",
            "We don't know.",
            "Maybe."
          ],
          "answer": 0
        },
        {
          "q": "What does the brother look like?",
          "options": [
            "He has long brown hair and bright eyes.",
            "He has black hair and big eyes.",
            "He has short brown hair and dark eyes.",
            "He has wavy hair and round face."
          ],
          "answer": 2
        },
        {
          "q": "Does the brother wear glasses?",
          "options": [
            "Yes, he does.",
            "No, he doesn't.",
            "We don't know.",
            "Sometimes."
          ],
          "answer": 0
        }
      ],
      "sentenceOrder": [
        {
          "prompt": "Sắp xếp lại 4 câu thành đoạn hội thoại hoàn chỉnh",
          "words": [
            "She has long black hair and big eyes.",
            "What does your friend look like?",
            "Yes, she does! She has a beautiful smile.",
            "Does she have dimples?"
          ],
          "answer": "What does your friend look like? / She has long black hair and big eyes. / Does she have dimples? / Yes, she does! She has a beautiful smile."
        }
      ],
      "listenPickLine": [
        {
          "prompt": "Ms. Overby?",
          "options": [
            "She has medium-length, wavy, blonde hair and freckles. She is short and thin.",
            "She has short gray hair and wears glasses.",
            "She has curly white hair and large earrings."
          ],
          "answer": 0
        },
        {
          "prompt": "Mr. Jonasson?",
          "options": [
            "He shaved his head and has a beard. He has green eyes. He is a little fat.",
            "He has short black hair and a mustache.",
            "He has dyed green, spiky hair."
          ],
          "answer": 0
        },
        {
          "prompt": "Mr. Kim?",
          "options": [
            "He has short gray hair and wears glasses. He is average height and thin. He always shaves.",
            "He has wavy blonde hair and freckles.",
            "He is tall with curly white hair."
          ],
          "answer": 0
        },
        {
          "prompt": "Mrs. Anderson?",
          "options": [
            "She has curly white hair and large earrings. She is tall and thin.",
            "She has a mole on her cheek and a mustache.",
            "She has spiky green hair and a tattoo."
          ],
          "answer": 0
        },
        {
          "prompt": "Mr. Vertigan?",
          "options": [
            "He has short black hair and a mustache. He has a mole on his cheek. He is quite short and fat.",
            "He has short gray hair and wears glasses.",
            "He has a beard and green eyes."
          ],
          "answer": 0
        },
        {
          "prompt": "Ms. Walker?",
          "options": [
            "She has dyed green, spiky hair and a small tattoo on her left wrist.",
            "She has medium-length blonde hair and freckles.",
            "She has curly white hair and large earrings."
          ],
          "answer": 0
        }
      ],
      "fillConversation": [
        {
          "title": "Cơ bản: Ms. Overby",
          "wordBank": [
            "medium length",
            "wavy",
            "blonde",
            "freckles"
          ],
          "lines": [
            {
              "speaker": "Host",
              "text": "Ms. Overby has [[medium length]] hair."
            },
            {
              "speaker": "Host",
              "text": "It is [[wavy]] and [[blonde]]."
            },
            {
              "speaker": "Host",
              "text": "She has [[freckles]]."
            },
            {
              "speaker": "Host",
              "text": "She is short and thin."
            }
          ]
        },
        {
          "title": "Trung bình: Mr. Jonasson",
          "wordBank": [
            "shaved",
            "beard",
            "green",
            "fat"
          ],
          "lines": [
            {
              "speaker": "Host",
              "text": "Mr. Jonasson [[shaved]] his head."
            },
            {
              "speaker": "Host",
              "text": "He has a [[beard]]."
            },
            {
              "speaker": "Host",
              "text": "He has [[green]] eyes."
            },
            {
              "speaker": "Host",
              "text": "He is a little [[fat]]."
            }
          ]
        },
        {
          "title": "Nâng cao: Ms. Walker",
          "wordBank": [
            "dyed green",
            "spiky",
            "small tattoo",
            "left wrist"
          ],
          "lines": [
            {
              "speaker": "Host",
              "text": "Ms. Walker has [[dyed green]] hair."
            },
            {
              "speaker": "Host",
              "text": "It is [[spiky]]."
            },
            {
              "speaker": "Host",
              "text": "She has a [[small tattoo]]."
            },
            {
              "speaker": "Host",
              "text": "It is on her [[left wrist]]."
            }
          ]
        }
      ]
    },
    "mindmap": {
      "type": "structured",
      "center": "MÔ TẢ KHUÔN MẶT",
      "branches": [
        {
          "icon": "🧒",
          "label": "TUỔI TÁC",
          "sub": "Age",
          "items": [
            "young",
            "old"
          ]
        },
        {
          "icon": "📏",
          "label": "CHIỀU CAO & THỂ TRẠNG",
          "sub": "Height & build",
          "items": [
            "tall / short",
            "average height",
            "overweight"
          ]
        },
        {
          "icon": "💇",
          "label": "TÓC",
          "sub": "Hair",
          "items": [
            "blonde",
            "bald"
          ]
        },
        {
          "icon": "🙂",
          "label": "ĐÁNH GIÁ NGOẠI HÌNH",
          "sub": "Appearance",
          "items": [
            "beautiful",
            "handsome"
          ]
        },
        {
          "icon": "🤝",
          "label": "TÍNH CÁCH",
          "sub": "Personality",
          "items": [
            "funny / smart / shy",
            "friendly",
            "lazy / boring",
            "hard-working"
          ],
          "box": {
            "title": "BE + TÍNH TỪ",
            "items": [
              "I am...",
              "He/She is...",
              "They are..."
            ]
          }
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "She ___ long hair.",
        "options": [
          "have",
          "has",
          "is",
          "are"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "Chọn thứ tự tính từ đúng:",
        "options": [
          "black long hair",
          "long black hair",
          "hair long black",
          "long hair black"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "What ___ she look like?",
        "options": [
          "is",
          "do",
          "does",
          "are"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "Does he have a beard? → '___, he does.'",
        "options": [
          "No",
          "Not",
          "Yes",
          "Isn't"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "They ___ round faces and bright eyes.",
        "options": [
          "has",
          "is",
          "are",
          "have"
        ],
        "answer": 3
      },
      {
        "type": "vocab",
        "q": "hard-working nghĩa là?",
        "options": [
          "lười biếng",
          "nhàm chán",
          "chăm chỉ làm việc",
          "nhút nhát"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "My mother ___ high cheekbones and dimples.",
        "options": [
          "have",
          "are",
          "has",
          "is"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "Câu đúng:",
        "options": [
          "She have blue eyes.",
          "He has a oval face.",
          "She has an oval face.",
          "They has long hair."
        ],
        "answer": 2
      },
      {
        "type": "review",
        "q": "[Mega Review - Gia đình] He is my brother. He ___ 25 years old.",
        "options": [
          "is",
          "have",
          "has",
          "are"
        ],
        "answer": 0
      },
      {
        "type": "review",
        "q": "[Mega Review - Order đồ ăn] I'd like to ___ a pizza.",
        "options": [
          "want",
          "order",
          "do",
          "make"
        ],
        "answer": 1
      }
    ],
    "homeworkRich": {
      "title": "BÀI TẬP VỀ NHÀ - BUỔI 7: MÔ TẢ KHUÔN MẶT",
      "submit": "Nhóm lớp hoặc gửi trực tiếp cho giáo viên",
      "deadline": "Trước buổi học tiếp theo",
      "tasks": [
        {
          "icon": "📸",
          "title": "BÀI TẬP 1: FACE PROFILE - Hồ sơ khuôn mặt",
          "badge": "Bắt buộc",
          "desc": "Chụp ảnh selfie hoặc ảnh một người bạn / người thân. Viết 6-8 câu mô tả khuôn mặt người trong ảnh bằng tiếng Anh.",
          "items": [
            "Bắt buộc dùng have / has đúng chủ ngữ",
            "Mô tả ít nhất 3 loại đặc điểm: tóc, mắt, hình dạng mặt, đặc điểm khác",
            "Đúng thứ tự tính từ: kích thước → hình dạng → màu sắc → danh từ",
            "Ví dụ: This is my mother. She has long, wavy, black hair. She has big, bright eyes. She has an oval face and dimples. She is very beautiful."
          ]
        },
        {
          "icon": "✏️",
          "title": "BÀI TẬP 2: MEGA REVIEW - Tự giới thiệu đầy đủ",
          "badge": "Bắt buộc",
          "desc": "Viết 1 đoạn văn ngắn 8-10 câu kết hợp kiến thức 7 buổi học.",
          "items": [
            "Chào hỏi & tên tuổi (Buổi 1)",
            "Gia đình (Buổi 3)",
            "Món ăn yêu thích (Buổi 4-5)",
            "Mô tả đồ vật (Buổi 6)",
            "Mô tả ngoại hình / khuôn mặt bản thân (Buổi 7)",
            "Mẫu gợi ý: Hi! My name is Linh. I am 25 years old. I have a round face and short black hair. I have big, dark eyes. I have 4 family members. My favorite food is pizza. This is my phone - it is small and black. Nice to meet you!"
          ],
          "note": "Khuyến khích quay video đọc đoạn văn và gửi để luyện phát âm."
        }
      ]
    },
    "homework": [
      "📸 Chụp ảnh selfie hoặc ảnh bạn bè / người thân. Viết 6-8 câu mô tả khuôn mặt (bắt buộc dùng have/has, ít nhất 3 loại đặc điểm)",
      "✏️ Viết 1 đoạn văn ngắn (8-10 câu) kết hợp kiến thức 7 buổi: Chào hỏi & tên tuổi, Gia đình, Món ăn yêu thích, Mô tả đồ vật, Mô tả khuôn mặt bản thân"
    ],
    "matchAll": true
  },
  {
    "id": 8,
    "unit": "Unit 3",
    "title": "Hoạt động hằng ngày & Hiện tại đơn",
    "subtitle": "Time out - Part 1",
    "objectives": [
      "Học từ vựng **hoạt động** hằng ngày",
      "Sử dụng thì hiện tại đơn (**khẳng định**)",
      "Nói về thói quen của bản thân"
    ],
    "review": {
      "title": "Mini-test đầu giờ",
      "questions": [
        {
          "q": "Đại từ sở hữu của 'they'?",
          "answer": "their"
        },
        {
          "q": "'Hair' nghĩa là?",
          "answer": "tóc"
        },
        {
          "q": "Đặt câu hỏi với 'How old'?",
          "answer": "How old are you?"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "wake up",
        "vi": "thức dậy",
        "img": "⏰"
      },
      {
        "en": "get up",
        "vi": "ngủ dậy",
        "img": "🛏️"
      },
      {
        "en": "have breakfast",
        "vi": "ăn sáng",
        "img": "🍳"
      },
      {
        "en": "go to school",
        "vi": "đi học",
        "img": "🏫"
      },
      {
        "en": "have lunch",
        "vi": "ăn trưa",
        "img": "🍱"
      },
      {
        "en": "do homework",
        "vi": "làm bài tập",
        "img": "📝"
      },
      {
        "en": "have dinner",
        "vi": "ăn tối",
        "img": "🍝"
      },
      {
        "en": "watch TV",
        "vi": "xem TV",
        "img": "📺"
      },
      {
        "en": "go to bed",
        "vi": "đi ngủ",
        "img": "😴"
      },
      {
        "en": "play sports",
        "vi": "chơi thể thao",
        "img": "⚽"
      },
      {
        "en": "read books",
        "vi": "đọc sách",
        "img": "📖"
      },
      {
        "en": "listen to music",
        "vi": "nghe nhạc",
        "img": "🎶"
      }
    ],
    "grammar": {
      "title": "Present Simple - Affirmative",
      "theory": "Dùng cho thói quen, sự thật. I/You/We/They + V (nguyên thể). He/She/It + V-s/es. Quy tắc thêm s/es: thường +s; sau o,s,x,ch,sh +es; phụ âm+y → -ies.",
      "examples": [
        {
          "en": "I get up at 6 a.m. every day.",
          "vi": "Tôi dậy lúc 6 giờ sáng mỗi ngày."
        },
        {
          "en": "She goes to school by bus.",
          "vi": "Cô ấy đi học bằng xe buýt."
        },
        {
          "en": "He watches TV in the evening.",
          "vi": "Anh ấy xem TV vào buổi tối."
        },
        {
          "en": "They study English at school.",
          "vi": "Họ học tiếng Anh ở trường."
        }
      ]
    },
    "listening": {
      "title": "Một ngày của Mai",
      "transcript": "Hi, I'm Mai. I get up at 6. I have breakfast at 6:30. I go to school at 7. I have lunch at 12. After school, I do my homework and watch TV.",
      "questions": [
        {
          "q": "Mai dậy lúc mấy giờ?",
          "options": [
            "5",
            "6",
            "7"
          ],
          "answer": 1
        },
        {
          "q": "Mai đi học lúc?",
          "options": [
            "6:30",
            "7:00",
            "7:30"
          ],
          "answer": 1
        },
        {
          "q": "Sau khi học, Mai làm gì?",
          "options": [
            "chơi thể thao",
            "ngủ",
            "làm bài và xem TV"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Nói về thói quen hằng ngày",
      "dialogue": [
        {
          "speaker": "A",
          "en": "What time do you get up?",
          "vi": "Bạn dậy lúc mấy giờ?"
        },
        {
          "speaker": "B",
          "en": "I get up at 6:30.",
          "vi": "Tôi dậy lúc 6:30."
        },
        {
          "speaker": "A",
          "en": "What do you do after school?",
          "vi": "Sau giờ học bạn làm gì?"
        },
        {
          "speaker": "B",
          "en": "I usually do my homework and play sports.",
          "vi": "Tôi thường làm bài và chơi thể thao."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "She ___ to school every day.",
        "options": [
          "go",
          "goes",
          "going",
          "is go"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "We ___ English on Mondays.",
        "options": [
          "studies",
          "study",
          "studys",
          "is study"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "He ___ TV in the evening.",
        "options": [
          "watch",
          "watchs",
          "watches",
          "is watch"
        ],
        "answer": 2
      },
      {
        "type": "vocab",
        "q": "'Đi ngủ' là?",
        "options": [
          "wake up",
          "go to bed",
          "get up",
          "have dinner"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "Chia: 'study' với 'he'",
        "answer": "studies"
      }
    ],
    "mindmap": {
      "center": "Daily Routines",
      "branches": [
        {
          "label": "Morning",
          "items": [
            "wake up, get up",
            "have breakfast",
            "go to school"
          ]
        },
        {
          "label": "Afternoon",
          "items": [
            "have lunch",
            "do homework"
          ]
        },
        {
          "label": "Evening",
          "items": [
            "have dinner",
            "watch TV",
            "go to bed"
          ]
        },
        {
          "label": "Present Simple +",
          "items": [
            "I/You/We/They + V",
            "He/She/It + V-s/es"
          ]
        }
      ]
    },
    "homework": [
      "Viết 8 câu về một ngày bình thường của em",
      "Workbook trang 28-30"
    ]
  },
  {
    "id": 9,
    "unit": "Unit 3",
    "title": "Thời gian rảnh & Phủ định/Câu hỏi",
    "subtitle": "Time out - Part 2",
    "objectives": [
      "Học từ vựng **hoạt động** giải trí",
      "Sử dụng **phủ định** và câu hỏi với hiện tại đơn",
      "Hỏi và trả lời về **sở thích**"
    ],
    "review": {
      "title": "Ôn Present Simple +",
      "questions": [
        {
          "q": "He ___ (play) football.",
          "answer": "plays"
        },
        {
          "q": "They ___ (study) English.",
          "answer": "study"
        },
        {
          "q": "She ___ (watch) TV.",
          "answer": "watches"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "play football",
        "vi": "chơi bóng đá",
        "img": "⚽"
      },
      {
        "en": "play basketball",
        "vi": "chơi bóng rổ",
        "img": "🏀"
      },
      {
        "en": "play video games",
        "vi": "chơi điện tử",
        "img": "🎮"
      },
      {
        "en": "go shopping",
        "vi": "đi mua sắm",
        "img": "🛍️"
      },
      {
        "en": "go swimming",
        "vi": "đi bơi",
        "img": "🏊"
      },
      {
        "en": "go cycling",
        "vi": "đạp xe",
        "img": "🚴"
      },
      {
        "en": "ride a bike",
        "vi": "đi xe đạp",
        "img": "🚲"
      },
      {
        "en": "hang out with friends",
        "vi": "đi chơi với bạn",
        "img": "👫"
      },
      {
        "en": "take photos",
        "vi": "chụp ảnh",
        "img": "📷"
      },
      {
        "en": "draw pictures",
        "vi": "vẽ tranh",
        "img": "🎨"
      }
    ],
    "grammar": {
      "title": "Present Simple - Negative & Questions",
      "theory": "Phủ định: I/You/We/They + don't + V; He/She/It + doesn't + V. Câu hỏi: Do/Does + S + V? Trả lời ngắn: Yes, S + do/does. No, S + don't/doesn't.",
      "examples": [
        {
          "en": "I don't like football.",
          "vi": "Tôi không thích bóng đá."
        },
        {
          "en": "She doesn't play video games.",
          "vi": "Cô ấy không chơi điện tử."
        },
        {
          "en": "Do you go swimming? - Yes, I do.",
          "vi": "Bạn có đi bơi không?"
        },
        {
          "en": "Does he like music? - No, he doesn't.",
          "vi": "Anh ấy có thích nhạc không?"
        }
      ]
    },
    "listening": {
      "title": "Sở thích của Tom",
      "transcript": "I'm Tom. I love sports. I play football and basketball. I don't like video games. On weekends, I go cycling with my friends.",
      "questions": [
        {
          "q": "Tom thích gì?",
          "options": [
            "video games",
            "sports",
            "shopping"
          ],
          "answer": 1
        },
        {
          "q": "Tom KHÔNG thích?",
          "options": [
            "football",
            "basketball",
            "video games"
          ],
          "answer": 2
        },
        {
          "q": "Cuối tuần Tom làm gì?",
          "options": [
            "xem TV",
            "đạp xe với bạn",
            "đi mua sắm"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi sở thích",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Do you play sports?",
          "vi": "Bạn có chơi thể thao không?"
        },
        {
          "speaker": "B",
          "en": "Yes, I do. I play basketball.",
          "vi": "Có, tôi chơi bóng rổ."
        },
        {
          "speaker": "A",
          "en": "Does your sister play too?",
          "vi": "Chị bạn cũng chơi không?"
        },
        {
          "speaker": "B",
          "en": "No, she doesn't. She likes drawing.",
          "vi": "Không. Chị ấy thích vẽ."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I ___ like coffee.",
        "options": [
          "don't",
          "doesn't",
          "not",
          "isn't"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "She ___ play tennis.",
        "options": [
          "don't",
          "doesn't",
          "not play",
          "isn't"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "___ they live here?",
        "options": [
          "Do",
          "Does",
          "Are",
          "Is"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "___ he speak English?",
        "options": [
          "Do",
          "Does",
          "Is",
          "Has"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "Phủ định: 'He plays soccer.'",
        "answer": "He doesn't play soccer"
      }
    ],
    "mindmap": {
      "center": "Present Simple",
      "branches": [
        {
          "label": "(+)",
          "items": [
            "I/You/We/They + V",
            "He/She/It + V-s"
          ]
        },
        {
          "label": "(-)",
          "items": [
            "don't + V",
            "doesn't + V"
          ]
        },
        {
          "label": "(?)",
          "items": [
            "Do + S + V?",
            "Does + S + V?"
          ]
        },
        {
          "label": "Free time",
          "items": [
            "play football",
            "go swimming",
            "watch TV"
          ]
        }
      ]
    },
    "homework": [
      "Viết 5 câu khẳng định, 5 phủ định về sở thích",
      "Workbook trang 31-33"
    ]
  },
  {
    "id": 10,
    "unit": "Unit 3",
    "title": "Trạng từ tần suất & Địa điểm trong thị trấn",
    "subtitle": "Time out - Part 3",
    "objectives": [
      "Học từ vựng địa điểm trong thị trấn",
      "Sử dụng trạng từ chỉ tần suất",
      "Wh-questions với **present simple**"
    ],
    "review": {
      "title": "Ôn nhanh",
      "questions": [
        {
          "q": "'Đi mua sắm' là?",
          "answer": "go shopping"
        },
        {
          "q": "Phủ định 'I play tennis.'",
          "answer": "I don't play tennis"
        },
        {
          "q": "Câu hỏi: 'She likes music.'",
          "answer": "Does she like music?"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "park",
        "vi": "công viên",
        "img": "🌳"
      },
      {
        "en": "supermarket",
        "vi": "siêu thị",
        "img": "🛒"
      },
      {
        "en": "library",
        "vi": "thư viện",
        "img": "📚"
      },
      {
        "en": "cinema",
        "vi": "rạp chiếu phim",
        "img": "🎬"
      },
      {
        "en": "restaurant",
        "vi": "nhà hàng",
        "img": "🍽️"
      },
      {
        "en": "café",
        "vi": "quán cà phê",
        "img": "☕"
      },
      {
        "en": "hospital",
        "vi": "bệnh viện",
        "img": "🏥"
      },
      {
        "en": "school",
        "vi": "trường học",
        "img": "🏫"
      },
      {
        "en": "bank",
        "vi": "ngân hàng",
        "img": "🏦"
      },
      {
        "en": "post office",
        "vi": "bưu điện",
        "img": "📮"
      }
    ],
    "grammar": {
      "title": "Adverbs of Frequency",
      "theory": "Tần suất: always (luôn), usually (thường), often (hay), sometimes (đôi khi), rarely (hiếm khi), never (không bao giờ). Đặt TRƯỚC động từ thường, SAU động từ to be.",
      "examples": [
        {
          "en": "I always have breakfast at 7.",
          "vi": "Tôi luôn ăn sáng lúc 7 giờ."
        },
        {
          "en": "She is usually late.",
          "vi": "Cô ấy thường đi muộn."
        },
        {
          "en": "We sometimes go to the cinema.",
          "vi": "Chúng tôi đôi khi đi xem phim."
        },
        {
          "en": "He never plays football.",
          "vi": "Anh ấy không bao giờ chơi bóng đá."
        }
      ],
      "formula": "S + (adv) + V  /  S + to be + (adv)"
    },
    "listening": {
      "title": "Cuối tuần của Anna",
      "transcript": "On Saturdays, I usually go to the park with my family. We sometimes have lunch at a restaurant. On Sundays, I always go to the library.",
      "questions": [
        {
          "q": "Thứ Bảy Anna đi đâu?",
          "options": [
            "library",
            "park",
            "cinema"
          ],
          "answer": 1
        },
        {
          "q": "Đôi khi cô ấy ăn ở đâu?",
          "options": [
            "home",
            "café",
            "restaurant"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi về tần suất",
      "dialogue": [
        {
          "speaker": "A",
          "en": "How often do you go to the cinema?",
          "vi": "Bạn đi xem phim có thường không?"
        },
        {
          "speaker": "B",
          "en": "I sometimes go on weekends.",
          "vi": "Tôi thỉnh thoảng đi vào cuối tuần."
        },
        {
          "speaker": "A",
          "en": "Where do you usually have lunch?",
          "vi": "Bạn thường ăn trưa ở đâu?"
        },
        {
          "speaker": "B",
          "en": "I usually have lunch at school.",
          "vi": "Tôi thường ăn trưa ở trường."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "Vị trí đúng của 'always': She ___ is ___ happy ___.",
        "options": [
          "1",
          "2",
          "3"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "I ___ go to bed at 10. (often)",
        "options": [
          "I often go",
          "I go often",
          "Often I go",
          "I go to often"
        ],
        "answer": 0
      },
      {
        "type": "vocab",
        "q": "Mua sách ở đâu?",
        "options": [
          "library",
          "hospital",
          "park",
          "bank"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "___ does she live? - In Hanoi.",
        "options": [
          "What",
          "Where",
          "Who",
          "When"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Tôi không bao giờ ăn pizza.'",
        "answer": "I never eat pizza"
      }
    ],
    "mindmap": {
      "center": "Frequency & Places",
      "branches": [
        {
          "label": "Frequency 100%→0%",
          "items": [
            "always, usually",
            "often, sometimes",
            "rarely, never"
          ]
        },
        {
          "label": "Position",
          "items": [
            "before V",
            "after to be"
          ]
        },
        {
          "label": "Places in town",
          "items": [
            "park, library",
            "cinema, restaurant",
            "hospital, bank"
          ]
        },
        {
          "label": "Wh-questions",
          "items": [
            "Where, When",
            "What, Who, How"
          ]
        }
      ]
    },
    "homework": [
      "Viết 7 câu dùng adverbs of frequency",
      "Vẽ bản đồ thị trấn của em với các địa điểm",
      "Workbook trang 34-35"
    ]
  },
  {
    "id": 11,
    "unit": "Unit 4",
    "title": "Các phòng & there is/are",
    "subtitle": "At home - Part 1",
    "objectives": [
      "Học từ vựng các **phòng** trong nhà",
      "Sử dụng cấu trúc there is/there are",
      "Mô tả ngôi nhà của mình"
    ],
    "review": {
      "title": "Ôn Unit 3",
      "questions": [
        {
          "q": "'Đôi khi' là?",
          "answer": "sometimes"
        },
        {
          "q": "Vị trí 'always' với 'is'?",
          "answer": "after 'is'"
        },
        {
          "q": "Hỏi địa điểm dùng từ nào?",
          "answer": "Where"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "living room",
        "vi": "phòng khách",
        "img": "🛋️"
      },
      {
        "en": "bedroom",
        "vi": "phòng ngủ",
        "img": "🛏️"
      },
      {
        "en": "kitchen",
        "vi": "nhà bếp",
        "img": "🍳"
      },
      {
        "en": "bathroom",
        "vi": "phòng tắm",
        "img": "🛁"
      },
      {
        "en": "dining room",
        "vi": "phòng ăn",
        "img": "🍽️"
      },
      {
        "en": "garage",
        "vi": "ga-ra",
        "img": "🚗"
      },
      {
        "en": "garden",
        "vi": "vườn",
        "img": "🌷"
      },
      {
        "en": "balcony",
        "vi": "ban công",
        "img": "🪴"
      },
      {
        "en": "stairs",
        "vi": "cầu thang",
        "img": "🪜"
      },
      {
        "en": "door",
        "vi": "cửa",
        "img": "🚪"
      },
      {
        "en": "window",
        "vi": "cửa sổ",
        "img": "🪟"
      },
      {
        "en": "wall",
        "vi": "tường",
        "img": "🧱"
      }
    ],
    "grammar": {
      "title": "There is / There are",
      "theory": "There is + danh từ số ít/không đếm được. There are + danh từ số nhiều. Phủ định: isn't/aren't. Câu hỏi: Is/Are there...?",
      "examples": [
        {
          "en": "There is a sofa in the living room.",
          "vi": "Có một chiếc ghế sofa trong phòng khách."
        },
        {
          "en": "There are three bedrooms in my house.",
          "vi": "Có ba phòng ngủ trong nhà tôi."
        },
        {
          "en": "There isn't a garage.",
          "vi": "Không có ga-ra."
        },
        {
          "en": "Are there any books on the desk? - Yes, there are.",
          "vi": "Có sách nào trên bàn không?"
        }
      ],
      "formula": "There is + N (số ít)  /  There are + Ns"
    },
    "listening": {
      "title": "Ngôi nhà của Linda",
      "transcript": "My house is big. There are four bedrooms and two bathrooms. There is a beautiful garden. There isn't a swimming pool.",
      "questions": [
        {
          "q": "Có mấy phòng ngủ?",
          "options": [
            "3",
            "4",
            "5"
          ],
          "answer": 1
        },
        {
          "q": "Có gì đẹp?",
          "options": [
            "balcony",
            "garage",
            "garden"
          ],
          "answer": 2
        },
        {
          "q": "KHÔNG có gì?",
          "options": [
            "bathroom",
            "garden",
            "swimming pool"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Mô tả nhà",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Is your house big?",
          "vi": "Nhà bạn có lớn không?"
        },
        {
          "speaker": "B",
          "en": "Yes, it is. There are 5 rooms.",
          "vi": "Có. Có 5 phòng."
        },
        {
          "speaker": "A",
          "en": "Is there a garden?",
          "vi": "Có vườn không?"
        },
        {
          "speaker": "B",
          "en": "No, there isn't. But there's a balcony.",
          "vi": "Không. Nhưng có ban công."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "There ___ a cat in the kitchen.",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "There ___ five chairs.",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "___ there a TV? - Yes, there is.",
        "options": [
          "Is",
          "Are",
          "Has",
          "Does"
        ],
        "answer": 0
      },
      {
        "type": "vocab",
        "q": "Phòng để nấu ăn?",
        "options": [
          "bedroom",
          "bathroom",
          "kitchen",
          "garage"
        ],
        "answer": 2
      },
      {
        "type": "writing",
        "q": "'Có 2 cửa sổ trong phòng tôi.'",
        "answer": "There are two windows in my room"
      }
    ],
    "mindmap": {
      "center": "At home",
      "branches": [
        {
          "label": "Rooms",
          "items": [
            "living room, bedroom",
            "kitchen, bathroom",
            "dining room"
          ]
        },
        {
          "label": "Other",
          "items": [
            "garage, garden",
            "balcony, stairs"
          ]
        },
        {
          "label": "There is",
          "items": [
            "+ singular",
            "+ uncountable"
          ]
        },
        {
          "label": "There are",
          "items": [
            "+ plural"
          ]
        }
      ]
    },
    "homework": [
      "Vẽ và mô tả nhà em (8-10 câu)",
      "Workbook trang 36-38"
    ]
  },
  {
    "id": 12,
    "unit": "Unit 4",
    "title": "Đồ nội thất & Giới từ chỉ vị trí",
    "subtitle": "At home - Part 2",
    "objectives": [
      "Học từ vựng đồ nội thất",
      "Sử dụng giới từ chỉ vị trí",
      "Mô tả vị trí đồ vật"
    ],
    "review": {
      "title": "Ôn there is/are",
      "questions": [
        {
          "q": "There ___ a book.",
          "answer": "is"
        },
        {
          "q": "There ___ many students.",
          "answer": "are"
        },
        {
          "q": "Phòng tắm tiếng Anh là?",
          "answer": "bathroom"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "sofa",
        "vi": "ghế sofa",
        "img": "🛋️"
      },
      {
        "en": "bed",
        "vi": "giường",
        "img": "🛏️"
      },
      {
        "en": "table",
        "vi": "bàn",
        "img": "🪑"
      },
      {
        "en": "wardrobe",
        "vi": "tủ quần áo",
        "img": "👔"
      },
      {
        "en": "fridge",
        "vi": "tủ lạnh",
        "img": "❄️"
      },
      {
        "en": "TV",
        "vi": "ti vi",
        "img": "📺"
      },
      {
        "en": "lamp",
        "vi": "đèn",
        "img": "💡"
      },
      {
        "en": "mirror",
        "vi": "gương",
        "img": "🪞"
      },
      {
        "en": "carpet",
        "vi": "thảm",
        "img": "🟫"
      },
      {
        "en": "shelf",
        "vi": "kệ",
        "img": "📚"
      }
    ],
    "grammar": {
      "title": "Prepositions of Place",
      "theory": "in (trong), on (trên), under (dưới), behind (sau), in front of (trước), next to (cạnh), between (giữa), near (gần), opposite (đối diện).",
      "examples": [
        {
          "en": "The cat is on the sofa.",
          "vi": "Con mèo ở trên sofa."
        },
        {
          "en": "The book is in the bag.",
          "vi": "Cuốn sách ở trong cặp."
        },
        {
          "en": "The lamp is next to the bed.",
          "vi": "Đèn ở cạnh giường."
        },
        {
          "en": "The TV is between the lamps.",
          "vi": "TV ở giữa hai cái đèn."
        }
      ],
      "formula": "in / on / under / next to / between"
    },
    "listening": {
      "title": "Phòng của Tom",
      "transcript": "In my room, there is a bed near the window. There's a desk next to the wardrobe. The lamp is on the desk. My books are on the shelf.",
      "questions": [
        {
          "q": "Giường ở đâu?",
          "options": [
            "near the window",
            "next to the door",
            "in the middle"
          ],
          "answer": 0
        },
        {
          "q": "Đèn ở đâu?",
          "options": [
            "on the wardrobe",
            "on the desk",
            "near the bed"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi vị trí",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Where is your phone?",
          "vi": "Điện thoại bạn ở đâu?"
        },
        {
          "speaker": "B",
          "en": "It's on the table.",
          "vi": "Trên bàn."
        },
        {
          "speaker": "A",
          "en": "And the TV?",
          "vi": "Còn TV?"
        },
        {
          "speaker": "B",
          "en": "It's next to the wardrobe.",
          "vi": "Nó ở cạnh tủ quần áo."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "The cat is ___ the box. (trong)",
        "options": [
          "on",
          "in",
          "under",
          "near"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "The lamp is ___ the table. (trên)",
        "options": [
          "on",
          "in",
          "under",
          "behind"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "The dog is ___ the chair. (dưới)",
        "options": [
          "on",
          "in",
          "under",
          "next to"
        ],
        "answer": 2
      },
      {
        "type": "vocab",
        "q": "'Tủ lạnh' là?",
        "options": [
          "wardrobe",
          "fridge",
          "shelf",
          "mirror"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Cuốn sách ở trên bàn.'",
        "answer": "The book is on the table"
      }
    ],
    "mindmap": {
      "center": "Furniture & Position",
      "branches": [
        {
          "label": "Furniture",
          "items": [
            "sofa, bed, table",
            "wardrobe, fridge",
            "lamp, mirror"
          ]
        },
        {
          "label": "in/on/under",
          "items": [
            "in (trong)",
            "on (trên)",
            "under (dưới)"
          ]
        },
        {
          "label": "Other prep.",
          "items": [
            "next to, between",
            "behind, in front of",
            "near, opposite"
          ]
        }
      ]
    },
    "homework": [
      "Vẽ phòng em và mô tả 10 câu dùng giới từ",
      "Workbook trang 39"
    ]
  },
  {
    "id": 13,
    "unit": "Unit 4",
    "title": "Đồ ăn thức uống & Đếm được/Không đếm được",
    "subtitle": "At home - Part 3",
    "objectives": [
      "Học từ vựng đồ ăn, thức uống",
      "Phân biệt danh từ đếm được và không đếm được",
      "Sử dụng some, any, a/an"
    ],
    "review": {
      "title": "Ôn nhanh",
      "questions": [
        {
          "q": "'Trên bàn' là?",
          "answer": "on the table"
        },
        {
          "q": "'Tủ quần áo' là?",
          "answer": "wardrobe"
        },
        {
          "q": "Giữa A và B là?",
          "answer": "between"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "rice",
        "vi": "cơm",
        "img": "🍚"
      },
      {
        "en": "bread",
        "vi": "bánh mì",
        "img": "🍞"
      },
      {
        "en": "milk",
        "vi": "sữa",
        "img": "🥛"
      },
      {
        "en": "water",
        "vi": "nước",
        "img": "💧"
      },
      {
        "en": "apple",
        "vi": "táo",
        "img": "🍎"
      },
      {
        "en": "banana",
        "vi": "chuối",
        "img": "🍌"
      },
      {
        "en": "egg",
        "vi": "trứng",
        "img": "🥚"
      },
      {
        "en": "chicken",
        "vi": "thịt gà",
        "img": "🍗"
      },
      {
        "en": "fish",
        "vi": "cá",
        "img": "🐟"
      },
      {
        "en": "vegetables",
        "vi": "rau",
        "img": "🥕"
      },
      {
        "en": "tea",
        "vi": "trà",
        "img": "🍵"
      },
      {
        "en": "coffee",
        "vi": "cà phê",
        "img": "☕"
      }
    ],
    "grammar": {
      "title": "Countable / Uncountable & some/any",
      "theory": "Đếm được: có số nhiều (apples, eggs). Không đếm được: không có số nhiều (water, rice, milk). Some: dùng trong câu khẳng định. Any: trong câu phủ định và câu hỏi. A/an: với danh từ đếm được số ít.",
      "examples": [
        {
          "en": "There is some milk in the fridge.",
          "vi": "Có một ít sữa trong tủ lạnh."
        },
        {
          "en": "There aren't any apples.",
          "vi": "Không có quả táo nào."
        },
        {
          "en": "Are there any eggs? - Yes, there are some.",
          "vi": "Có trứng không?"
        },
        {
          "en": "I have an apple and a banana.",
          "vi": "Tôi có một quả táo và một quả chuối."
        }
      ],
      "formula": "some (+) / any (-, ?)"
    },
    "listening": {
      "title": "Trong tủ lạnh",
      "transcript": "Let me check the fridge. There is some milk and there are some eggs. There aren't any apples but there are some bananas.",
      "questions": [
        {
          "q": "Có gì trong tủ lạnh?",
          "options": [
            "milk and eggs",
            "apples",
            "water"
          ],
          "answer": 0
        },
        {
          "q": "KHÔNG có gì?",
          "options": [
            "bananas",
            "milk",
            "apples"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Đi siêu thị",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Do we have any milk?",
          "vi": "Mình có sữa không?"
        },
        {
          "speaker": "B",
          "en": "No, we don't. We need some milk.",
          "vi": "Không. Mình cần mua sữa."
        },
        {
          "speaker": "A",
          "en": "Are there any eggs?",
          "vi": "Có trứng không?"
        },
        {
          "speaker": "B",
          "en": "Yes, there are some.",
          "vi": "Có một ít."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I have ___ apples.",
        "options": [
          "a",
          "an",
          "some",
          "any"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "There isn't ___ water.",
        "options": [
          "a",
          "any",
          "some",
          "an"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "Đếm được/Không đếm được: 'rice'?",
        "options": [
          "countable",
          "uncountable",
          "both"
        ],
        "answer": 1
      },
      {
        "type": "vocab",
        "q": "'Bánh mì' là?",
        "options": [
          "rice",
          "bread",
          "milk",
          "egg"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Tôi có một số quả táo.'",
        "answer": "I have some apples"
      }
    ],
    "mindmap": {
      "center": "Food & Drinks",
      "branches": [
        {
          "label": "Countable",
          "items": [
            "apple, egg",
            "banana, chicken"
          ]
        },
        {
          "label": "Uncountable",
          "items": [
            "rice, bread",
            "milk, water, tea"
          ]
        },
        {
          "label": "some",
          "items": [
            "+ statement",
            "(+) any in offers"
          ]
        },
        {
          "label": "any",
          "items": [
            "+ negative",
            "+ question"
          ]
        }
      ]
    },
    "homework": [
      "Viết danh sách 10 món ăn yêu thích",
      "Đặt 5 câu với some/any",
      "Workbook trang 40-43"
    ]
  },
  {
    "id": 14,
    "unit": "Unit 5",
    "title": "Máy tính & can/can't",
    "subtitle": "Log on - Part 1",
    "objectives": [
      "Học từ vựng về máy tính, thiết bị di động",
      "Sử dụng **can/can't** để nói về khả năng",
      "Hỏi và trả lời về kỹ năng"
    ],
    "review": {
      "title": "Ôn nhanh",
      "questions": [
        {
          "q": "Some hay any: 'There aren't ___ apples.'",
          "answer": "any"
        },
        {
          "q": "'Cá' là?",
          "answer": "fish"
        },
        {
          "q": "Đếm được hay không: 'water'?",
          "answer": "uncountable"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "computer",
        "vi": "máy tính",
        "img": "💻"
      },
      {
        "en": "laptop",
        "vi": "máy tính xách tay",
        "img": "💻"
      },
      {
        "en": "smartphone",
        "vi": "điện thoại thông minh",
        "img": "📱"
      },
      {
        "en": "tablet",
        "vi": "máy tính bảng",
        "img": "📱"
      },
      {
        "en": "keyboard",
        "vi": "bàn phím",
        "img": "⌨️"
      },
      {
        "en": "mouse",
        "vi": "chuột",
        "img": "🖱️"
      },
      {
        "en": "screen",
        "vi": "màn hình",
        "img": "🖥️"
      },
      {
        "en": "speaker",
        "vi": "loa",
        "img": "🔊"
      },
      {
        "en": "USB",
        "vi": "USB",
        "img": "💾"
      },
      {
        "en": "Internet",
        "vi": "mạng Internet",
        "img": "🌐"
      }
    ],
    "grammar": {
      "title": "can / can't (Khả năng)",
      "theory": "Dùng để nói về khả năng. Cấu trúc: S + can/can't + V (nguyên thể). Câu hỏi: Can + S + V? KHÔNG thêm s/es ở động từ chính dù chủ ngữ là số ít.",
      "examples": [
        {
          "en": "I can swim.",
          "vi": "Tôi biết bơi."
        },
        {
          "en": "She can't speak French.",
          "vi": "Cô ấy không nói được tiếng Pháp."
        },
        {
          "en": "Can you play the guitar? - Yes, I can.",
          "vi": "Bạn có biết chơi đàn không?"
        },
        {
          "en": "He can use a computer well.",
          "vi": "Anh ấy biết dùng máy tính tốt."
        }
      ],
      "formula": "S + can/can't + V"
    },
    "listening": {
      "title": "Khả năng của Linda",
      "transcript": "I'm Linda. I can use a computer very well. I can type fast. But I can't draw on a tablet. My brother can play computer games but he can't fix computers.",
      "questions": [
        {
          "q": "Linda biết làm gì?",
          "options": [
            "draw on tablet",
            "use computer",
            "fix computers"
          ],
          "answer": 1
        },
        {
          "q": "Em trai cô ấy KHÔNG biết?",
          "options": [
            "play games",
            "fix computers",
            "type"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi về khả năng",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Can you swim?",
          "vi": "Bạn biết bơi không?"
        },
        {
          "speaker": "B",
          "en": "Yes, I can. Can you?",
          "vi": "Có. Còn bạn?"
        },
        {
          "speaker": "A",
          "en": "No, I can't. But I can ride a bike.",
          "vi": "Không. Nhưng tôi biết đi xe đạp."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I ___ play the piano.",
        "options": [
          "can",
          "cans",
          "am can",
          "do can"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "She ___ speak Chinese.",
        "options": [
          "can not",
          "cant",
          "can't",
          "doesn't can"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "___ you swim?",
        "options": [
          "Do",
          "Are",
          "Can",
          "Is"
        ],
        "answer": 2
      },
      {
        "type": "vocab",
        "q": "'Bàn phím' là?",
        "options": [
          "mouse",
          "keyboard",
          "screen",
          "speaker"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Anh ấy có thể chạy nhanh.'",
        "answer": "He can run fast"
      }
    ],
    "mindmap": {
      "center": "Computers & can",
      "branches": [
        {
          "label": "Devices",
          "items": [
            "computer, laptop",
            "smartphone, tablet"
          ]
        },
        {
          "label": "Parts",
          "items": [
            "keyboard, mouse",
            "screen, speaker"
          ]
        },
        {
          "label": "can (+)",
          "items": [
            "S + can + V",
            "All persons"
          ]
        },
        {
          "label": "can (-/?)",
          "items": [
            "can't = cannot",
            "Can + S + V?"
          ]
        }
      ]
    },
    "homework": [
      "Viết 10 câu về điều em CÓ THỂ và KHÔNG THỂ làm",
      "Workbook trang 46-48"
    ]
  },
  {
    "id": 15,
    "unit": "Unit 5",
    "title": "Internet & Câu mệnh lệnh",
    "subtitle": "Log on - Part 2",
    "objectives": [
      "Học từ vựng về Internet",
      "Sử dụng câu mệnh lệnh trong hướng dẫn",
      "Đưa ra hướng dẫn cách sử dụng thiết bị"
    ],
    "review": {
      "title": "Ôn can/can't",
      "questions": [
        {
          "q": "She ___ swim. (không thể)",
          "answer": "can't"
        },
        {
          "q": "'Màn hình' là?",
          "answer": "screen"
        },
        {
          "q": "'Mạng' là?",
          "answer": "Internet"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "click",
        "vi": "nhấp chuột",
        "img": "🖱️"
      },
      {
        "en": "download",
        "vi": "tải xuống",
        "img": "⬇️"
      },
      {
        "en": "upload",
        "vi": "tải lên",
        "img": "⬆️"
      },
      {
        "en": "search",
        "vi": "tìm kiếm",
        "img": "🔍"
      },
      {
        "en": "send",
        "vi": "gửi",
        "img": "📤"
      },
      {
        "en": "save",
        "vi": "lưu",
        "img": "💾"
      },
      {
        "en": "delete",
        "vi": "xóa",
        "img": "🗑️"
      },
      {
        "en": "log in",
        "vi": "đăng nhập",
        "img": "🔓"
      },
      {
        "en": "log out",
        "vi": "đăng xuất",
        "img": "🔒"
      },
      {
        "en": "website",
        "vi": "trang web",
        "img": "🌐"
      },
      {
        "en": "email",
        "vi": "thư điện tử",
        "img": "📧"
      },
      {
        "en": "password",
        "vi": "mật khẩu",
        "img": "🔑"
      }
    ],
    "grammar": {
      "title": "Imperatives & like/love/hate + V-ing",
      "theory": "Mệnh lệnh: dùng V nguyên thể. Phủ định: Don't + V. Like/love/hate + V-ing (động từ thêm -ing).",
      "examples": [
        {
          "en": "Click the icon.",
          "vi": "Nhấp vào biểu tượng."
        },
        {
          "en": "Don't share your password.",
          "vi": "Đừng chia sẻ mật khẩu."
        },
        {
          "en": "I love playing games.",
          "vi": "Tôi thích chơi điện tử."
        },
        {
          "en": "She hates writing emails.",
          "vi": "Cô ấy ghét viết email."
        }
      ],
      "formula": "V + O  /  Don't + V"
    },
    "listening": {
      "title": "Hướng dẫn cài app",
      "transcript": "First, open the app store. Then, search for the app. Click 'install'. Don't close the screen. After downloading, open the app and create an account.",
      "questions": [
        {
          "q": "Bước đầu tiên?",
          "options": [
            "search",
            "open app store",
            "click install"
          ],
          "answer": 1
        },
        {
          "q": "KHÔNG được làm gì?",
          "options": [
            "download",
            "close screen",
            "create account"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi sở thích online",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Do you like watching videos online?",
          "vi": "Bạn có thích xem video online không?"
        },
        {
          "speaker": "B",
          "en": "Yes, I love it! I watch every day.",
          "vi": "Có, tôi rất thích! Xem mỗi ngày."
        },
        {
          "speaker": "A",
          "en": "What about playing online games?",
          "vi": "Còn chơi game online?"
        },
        {
          "speaker": "B",
          "en": "I don't like playing games.",
          "vi": "Tôi không thích chơi game."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "___ the icon to open it.",
        "options": [
          "Clicks",
          "Click",
          "Clicking",
          "To click"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "I love ___ music.",
        "options": [
          "listen",
          "listens",
          "listening",
          "to listening"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "She hates ___ emails.",
        "options": [
          "write",
          "writes",
          "writing",
          "to writing"
        ],
        "answer": 2
      },
      {
        "type": "vocab",
        "q": "'Đăng nhập' là?",
        "options": [
          "log out",
          "log in",
          "click",
          "search"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Đừng xóa file đó.'",
        "answer": "Don't delete that file"
      }
    ],
    "mindmap": {
      "center": "Using the Internet",
      "branches": [
        {
          "label": "Actions",
          "items": [
            "click, search",
            "download, upload",
            "save, delete, send"
          ]
        },
        {
          "label": "Account",
          "items": [
            "log in / log out",
            "password, email"
          ]
        },
        {
          "label": "Imperatives",
          "items": [
            "V (+)",
            "Don't + V (-)"
          ]
        },
        {
          "label": "like + V-ing",
          "items": [
            "love / like / hate",
            "+ V-ing"
          ]
        }
      ]
    },
    "homework": [
      "Viết hướng dẫn 5 bước cách dùng một app",
      "Workbook trang 49-51"
    ]
  },
  {
    "id": 16,
    "unit": "Unit 5",
    "title": "Trạng từ chỉ cách thức & Ôn tập",
    "subtitle": "Log on - Part 3",
    "objectives": [
      "Sử dụng trạng từ chỉ cách thức",
      "Ôn tập **can/can't** và mệnh lệnh",
      "Mô tả cách thực hiện hành động"
    ],
    "review": {
      "title": "Ôn nhanh",
      "questions": [
        {
          "q": "I love ___ (read) books.",
          "answer": "reading"
        },
        {
          "q": "'Mật khẩu' là?",
          "answer": "password"
        },
        {
          "q": "Phủ định mệnh lệnh: 'Don't ___'",
          "answer": "+ V"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "quickly",
        "vi": "nhanh chóng",
        "img": "⚡"
      },
      {
        "en": "slowly",
        "vi": "chậm rãi",
        "img": "🐢"
      },
      {
        "en": "carefully",
        "vi": "cẩn thận",
        "img": "🤔"
      },
      {
        "en": "loudly",
        "vi": "ồn ào",
        "img": "📢"
      },
      {
        "en": "quietly",
        "vi": "yên lặng",
        "img": "🤫"
      },
      {
        "en": "well",
        "vi": "tốt",
        "img": "👍"
      },
      {
        "en": "badly",
        "vi": "tệ",
        "img": "👎"
      },
      {
        "en": "fast",
        "vi": "nhanh",
        "img": "💨"
      },
      {
        "en": "hard",
        "vi": "chăm chỉ",
        "img": "💪"
      },
      {
        "en": "easily",
        "vi": "dễ dàng",
        "img": "👌"
      }
    ],
    "grammar": {
      "title": "Adverbs of Manner",
      "theory": "Tính từ + ly = trạng từ. (slow → slowly). Bất quy tắc: good → well, fast → fast, hard → hard. Đặt SAU động từ.",
      "examples": [
        {
          "en": "She speaks English well.",
          "vi": "Cô ấy nói tiếng Anh tốt."
        },
        {
          "en": "He runs fast.",
          "vi": "Anh ấy chạy nhanh."
        },
        {
          "en": "Please type slowly.",
          "vi": "Hãy gõ chậm thôi."
        },
        {
          "en": "I work hard.",
          "vi": "Tôi làm việc chăm chỉ."
        }
      ],
      "formula": "V + Adv (slowly, quickly, well)"
    },
    "listening": {
      "title": "Lớp học máy tính",
      "transcript": "In the computer class, the teacher speaks slowly. We listen carefully and type quickly. Tom can't type well, but he learns fast.",
      "questions": [
        {
          "q": "Cô giáo nói thế nào?",
          "options": [
            "fast",
            "slowly",
            "loudly"
          ],
          "answer": 1
        },
        {
          "q": "Tom thì sao?",
          "options": [
            "types well",
            "learns fast",
            "speaks loudly"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Mô tả hành động",
      "dialogue": [
        {
          "speaker": "A",
          "en": "How does she sing?",
          "vi": "Cô ấy hát thế nào?"
        },
        {
          "speaker": "B",
          "en": "She sings beautifully.",
          "vi": "Cô ấy hát rất hay."
        },
        {
          "speaker": "A",
          "en": "Can you swim well?",
          "vi": "Bạn bơi giỏi không?"
        },
        {
          "speaker": "B",
          "en": "Not really. I swim slowly.",
          "vi": "Không lắm. Tôi bơi chậm."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "Trạng từ của 'careful'?",
        "options": [
          "careful",
          "carefuly",
          "carefully",
          "carely"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "Trạng từ của 'good'?",
        "options": [
          "goodly",
          "well",
          "better",
          "best"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "He runs ___.",
        "options": [
          "fastly",
          "fast",
          "faster",
          "fasted"
        ],
        "answer": 1
      },
      {
        "type": "vocab",
        "q": "'Yên lặng' là?",
        "options": [
          "loudly",
          "slowly",
          "quietly",
          "quickly"
        ],
        "answer": 2
      },
      {
        "type": "writing",
        "q": "'Cô ấy hát hay.'",
        "answer": "She sings well"
      }
    ],
    "mindmap": {
      "center": "Adverbs of Manner",
      "branches": [
        {
          "label": "Adj + ly",
          "items": [
            "slow → slowly",
            "careful → carefully",
            "loud → loudly"
          ]
        },
        {
          "label": "Irregular",
          "items": [
            "good → well",
            "fast → fast",
            "hard → hard"
          ]
        },
        {
          "label": "Position",
          "items": [
            "after Verb",
            "after Object"
          ]
        },
        {
          "label": "Review Unit 5",
          "items": [
            "can/can't",
            "imperatives",
            "like+V-ing"
          ]
        }
      ]
    },
    "homework": [
      "Viết 10 câu dùng trạng từ chỉ cách thức",
      "Ôn tập Unit 3-5",
      "Workbook trang 52-53 + Cumulative Review"
    ]
  },
  {
    "id": 17,
    "unit": "Unit 6",
    "title": "Mua sắm & Hiện tại tiếp diễn",
    "subtitle": "Shop around - Part 1",
    "objectives": [
      "Học từ vựng về cửa hàng và mua sắm",
      "Sử dụng thì hiện tại tiếp diễn (**khẳng định**/**phủ định**)",
      "Mô tả việc đang xảy ra"
    ],
    "review": {
      "title": "Ôn Unit 5",
      "questions": [
        {
          "q": "'Tốt' (trạng từ) là?",
          "answer": "well"
        },
        {
          "q": "I love ___ (play) games.",
          "answer": "playing"
        },
        {
          "q": "'Tải xuống' là?",
          "answer": "download"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "shop / store",
        "vi": "cửa hàng",
        "img": "🏪"
      },
      {
        "en": "shopping mall",
        "vi": "trung tâm mua sắm",
        "img": "🏬"
      },
      {
        "en": "bookstore",
        "vi": "hiệu sách",
        "img": "📚"
      },
      {
        "en": "clothes shop",
        "vi": "shop quần áo",
        "img": "👕"
      },
      {
        "en": "shoe shop",
        "vi": "shop giày",
        "img": "👟"
      },
      {
        "en": "customer",
        "vi": "khách hàng",
        "img": "👥"
      },
      {
        "en": "money",
        "vi": "tiền",
        "img": "💰"
      },
      {
        "en": "buy",
        "vi": "mua",
        "img": "🛒"
      },
      {
        "en": "sell",
        "vi": "bán",
        "img": "💵"
      },
      {
        "en": "pay",
        "vi": "trả tiền",
        "img": "💳"
      }
    ],
    "grammar": {
      "title": "Present Continuous - Affirmative & Negative",
      "theory": "S + am/is/are + V-ing (đang làm gì). Quy tắc V-ing: thường +ing; e cuối → bỏ e, +ing (write→writing); CVC ngắn → gấp đôi (run→running). Phủ định: am/is/are + not.",
      "examples": [
        {
          "en": "I am studying English now.",
          "vi": "Tôi đang học tiếng Anh."
        },
        {
          "en": "She is shopping at the mall.",
          "vi": "Cô ấy đang mua sắm ở mall."
        },
        {
          "en": "They are not watching TV.",
          "vi": "Họ không đang xem TV."
        },
        {
          "en": "We're having lunch.",
          "vi": "Chúng tôi đang ăn trưa."
        }
      ],
      "formula": "S + am/is/are + V-ing"
    },
    "listening": {
      "title": "Đang ở mall",
      "transcript": "Hi mom! I'm at the mall. I'm shopping with Linda. She's buying a new dress. I'm not buying anything. We are having a great time!",
      "questions": [
        {
          "q": "Người nói đang ở đâu?",
          "options": [
            "home",
            "school",
            "mall"
          ],
          "answer": 2
        },
        {
          "q": "Linda đang làm gì?",
          "options": [
            "buying dress",
            "watching TV",
            "reading"
          ],
          "answer": 0
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Mô tả đang làm",
      "dialogue": [
        {
          "speaker": "A",
          "en": "What are you doing?",
          "vi": "Bạn đang làm gì?"
        },
        {
          "speaker": "B",
          "en": "I'm doing my homework.",
          "vi": "Tôi đang làm bài tập."
        },
        {
          "speaker": "A",
          "en": "Is your sister studying too?",
          "vi": "Chị bạn cũng đang học không?"
        },
        {
          "speaker": "B",
          "en": "No, she's watching TV.",
          "vi": "Không, chị ấy đang xem TV."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I ___ studying now.",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "She ___ ___. (run)",
        "options": [
          "is runing",
          "is running",
          "running",
          "runs"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "V-ing của 'write'?",
        "options": [
          "writeing",
          "writing",
          "writting",
          "write"
        ],
        "answer": 1
      },
      {
        "type": "vocab",
        "q": "'Khách hàng' là?",
        "options": [
          "seller",
          "customer",
          "buyer",
          "shopper"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Tôi đang đọc sách.'",
        "answer": "I am reading a book"
      }
    ],
    "mindmap": {
      "center": "Present Continuous",
      "branches": [
        {
          "label": "Form",
          "items": [
            "am/is/are + V-ing"
          ]
        },
        {
          "label": "V-ing rules",
          "items": [
            "+ing",
            "e → ing (write→writing)",
            "CVC: double (run→running)"
          ]
        },
        {
          "label": "Use",
          "items": [
            "Now (đang)",
            "These days"
          ]
        },
        {
          "label": "Shopping vocab",
          "items": [
            "shop, mall",
            "customer, money",
            "buy, sell, pay"
          ]
        }
      ]
    },
    "homework": [
      "Viết 8 câu mô tả người trong gia đình đang làm gì",
      "Workbook trang 54-56"
    ]
  },
  {
    "id": 18,
    "unit": "Unit 6",
    "title": "Quần áo & Câu hỏi Hiện tại tiếp diễn",
    "subtitle": "Shop around - Part 2",
    "objectives": [
      "Học từ vựng **quần áo**",
      "Đặt câu hỏi với hiện tại tiếp diễn",
      "Mô tả trang phục"
    ],
    "review": {
      "title": "Ôn Continuous",
      "questions": [
        {
          "q": "He ___ ___ (sleep).",
          "answer": "is sleeping"
        },
        {
          "q": "V-ing của 'swim'?",
          "answer": "swimming"
        },
        {
          "q": "'Cửa hàng' là?",
          "answer": "shop / store"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "T-shirt",
        "vi": "áo phông",
        "img": "👕"
      },
      {
        "en": "shirt",
        "vi": "áo sơ mi",
        "img": "👔"
      },
      {
        "en": "jeans",
        "vi": "quần jean",
        "img": "👖"
      },
      {
        "en": "trousers",
        "vi": "quần dài",
        "img": "👖"
      },
      {
        "en": "skirt",
        "vi": "váy",
        "img": "👗"
      },
      {
        "en": "dress",
        "vi": "đầm",
        "img": "👗"
      },
      {
        "en": "shoes",
        "vi": "giày",
        "img": "👟"
      },
      {
        "en": "boots",
        "vi": "ủng/bốt",
        "img": "👢"
      },
      {
        "en": "jacket",
        "vi": "áo khoác",
        "img": "🧥"
      },
      {
        "en": "hat",
        "vi": "mũ",
        "img": "🎩"
      },
      {
        "en": "socks",
        "vi": "tất",
        "img": "🧦"
      },
      {
        "en": "shorts",
        "vi": "quần short",
        "img": "🩳"
      }
    ],
    "grammar": {
      "title": "Present Continuous - Questions",
      "theory": "Câu hỏi: Đảo am/is/are lên trước S. Wh-questions: Wh- + am/is/are + S + V-ing? Trả lời ngắn: Yes, S + am/is/are. No, S + am/is/are + not.",
      "examples": [
        {
          "en": "Are you wearing a hat?",
          "vi": "Bạn đang đội mũ không?"
        },
        {
          "en": "Is she wearing jeans? - Yes, she is.",
          "vi": "Cô ấy đang mặc jean không?"
        },
        {
          "en": "What are they doing?",
          "vi": "Họ đang làm gì?"
        },
        {
          "en": "Who is wearing the red dress?",
          "vi": "Ai đang mặc đầm đỏ?"
        }
      ],
      "formula": "S + am/is/are + V-ing"
    },
    "listening": {
      "title": "Trong shop quần áo",
      "transcript": "Excuse me! I'm looking for a T-shirt. Are you wearing size M? Yes? Try this blue one. It looks great on you!",
      "questions": [
        {
          "q": "Khách tìm gì?",
          "options": [
            "jeans",
            "T-shirt",
            "jacket"
          ],
          "answer": 1
        },
        {
          "q": "Áo màu gì?",
          "options": [
            "red",
            "green",
            "blue"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi về trang phục",
      "dialogue": [
        {
          "speaker": "A",
          "en": "What are you wearing today?",
          "vi": "Hôm nay bạn mặc gì?"
        },
        {
          "speaker": "B",
          "en": "I'm wearing jeans and a T-shirt.",
          "vi": "Tôi mặc jean và áo phông."
        },
        {
          "speaker": "A",
          "en": "Is your sister wearing a dress?",
          "vi": "Chị bạn mặc đầm phải không?"
        },
        {
          "speaker": "B",
          "en": "No, she isn't. She's wearing a skirt.",
          "vi": "Không, chị mặc váy ngắn."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "___ you reading a book?",
        "options": [
          "Do",
          "Are",
          "Is",
          "Does"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "What ___ she doing?",
        "options": [
          "do",
          "is",
          "does",
          "are"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "Trả lời 'Are they playing?' (đúng)",
        "options": [
          "Yes, they do.",
          "Yes, they are.",
          "Yes, they're.",
          "Yes, are."
        ],
        "answer": 1
      },
      {
        "type": "vocab",
        "q": "'Áo khoác' là?",
        "options": [
          "jacket",
          "shirt",
          "skirt",
          "shoes"
        ],
        "answer": 0
      },
      {
        "type": "writing",
        "q": "'Cô ấy đang mặc gì?'",
        "answer": "What is she wearing?"
      }
    ],
    "mindmap": {
      "center": "Clothes & Questions",
      "branches": [
        {
          "label": "Tops",
          "items": [
            "T-shirt, shirt",
            "jacket"
          ]
        },
        {
          "label": "Bottoms",
          "items": [
            "jeans, trousers",
            "skirt, shorts"
          ]
        },
        {
          "label": "Footwear/Acc.",
          "items": [
            "shoes, boots",
            "socks, hat"
          ]
        },
        {
          "label": "Cont. Questions",
          "items": [
            "Am/Is/Are + S + V-ing?",
            "Wh- + am/is/are + S + V-ing?"
          ]
        }
      ]
    },
    "homework": [
      "Mô tả 5 người trong gia đình hôm nay mặc gì",
      "Workbook trang 57-58"
    ]
  },
  {
    "id": 19,
    "unit": "Unit 6",
    "title": "So sánh Hiện tại đơn vs Hiện tại tiếp diễn",
    "subtitle": "Shop around - Part 3",
    "objectives": [
      "Phân biệt hai thì hiện tại đơn và tiếp diễn",
      "Sử dụng đúng dấu hiệu nhận biết",
      "Áp dụng vào tình huống thực tế"
    ],
    "review": {
      "title": "Ôn nhanh",
      "questions": [
        {
          "q": "'Quần jean' là?",
          "answer": "jeans"
        },
        {
          "q": "Đặt câu hỏi: 'She is reading.'",
          "answer": "Is she reading?"
        },
        {
          "q": "V-ing của 'come'?",
          "answer": "coming"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "now",
        "vi": "bây giờ",
        "img": "⏰"
      },
      {
        "en": "right now",
        "vi": "ngay bây giờ",
        "img": "⚡"
      },
      {
        "en": "at the moment",
        "vi": "lúc này",
        "img": "🕐"
      },
      {
        "en": "today",
        "vi": "hôm nay",
        "img": "📅"
      },
      {
        "en": "every day",
        "vi": "mỗi ngày",
        "img": "🔄"
      },
      {
        "en": "always",
        "vi": "luôn luôn",
        "img": "♾️"
      },
      {
        "en": "usually",
        "vi": "thường",
        "img": "🔁"
      },
      {
        "en": "Look!",
        "vi": "Nhìn này!",
        "img": "👀"
      },
      {
        "en": "Listen!",
        "vi": "Nghe này!",
        "img": "👂"
      }
    ],
    "grammar": {
      "title": "Present Simple vs Present Continuous",
      "theory": "PRESENT SIMPLE: thói quen, sự thật → every day, always, usually, sometimes. PRESENT CONTINUOUS: đang xảy ra → now, right now, at the moment, today. Có động từ KHÔNG dùng tiếp diễn: like, love, want, need, have (sở hữu), know.",
      "examples": [
        {
          "en": "I usually go to school by bus. (habit)",
          "vi": "Tôi thường đi học bằng buýt."
        },
        {
          "en": "I'm going to the cinema now. (now)",
          "vi": "Tôi đang đi xem phim."
        },
        {
          "en": "She speaks English. (ability/fact)",
          "vi": "Cô ấy biết nói tiếng Anh."
        },
        {
          "en": "She is speaking now. (right now)",
          "vi": "Cô ấy đang nói chuyện."
        }
      ],
      "formula": "S + am/is/are + V-ing"
    },
    "listening": {
      "title": "Tom hôm nay",
      "transcript": "Tom usually plays football on Saturdays. But today is special. He isn't playing football. He is studying for an exam.",
      "questions": [
        {
          "q": "Tom thường thứ Bảy làm gì?",
          "options": [
            "study",
            "play football",
            "watch TV"
          ],
          "answer": 1
        },
        {
          "q": "Hôm nay Tom làm gì?",
          "options": [
            "playing football",
            "studying",
            "sleeping"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Phân biệt thì",
      "dialogue": [
        {
          "speaker": "A",
          "en": "What do you do?",
          "vi": "Bạn làm nghề gì?"
        },
        {
          "speaker": "B",
          "en": "I'm a student. I study at ABC school.",
          "vi": "Tôi là học sinh. Tôi học ở trường ABC."
        },
        {
          "speaker": "A",
          "en": "What are you doing now?",
          "vi": "Bây giờ bạn đang làm gì?"
        },
        {
          "speaker": "B",
          "en": "I'm doing my Math homework.",
          "vi": "Tôi đang làm bài Toán."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I ___ to school every day. (go)",
        "options": [
          "go",
          "am going",
          "goes",
          "going"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "Look! She ___. (dance)",
        "options": [
          "dances",
          "dance",
          "is dancing",
          "dancing"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "We usually ___ TV in the evening. (watch)",
        "options": [
          "watch",
          "watches",
          "are watching",
          "watching"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "Right now, he ___ his homework. (do)",
        "options": [
          "does",
          "do",
          "is doing",
          "doing"
        ],
        "answer": 2
      },
      {
        "type": "writing",
        "q": "'Hôm nay tôi đang đọc sách.'",
        "answer": "Today I am reading a book"
      }
    ],
    "mindmap": {
      "center": "Simple vs Continuous",
      "branches": [
        {
          "label": "Simple",
          "items": [
            "habits",
            "facts",
            "every day, always",
            "usually, often"
          ]
        },
        {
          "label": "Continuous",
          "items": [
            "now, right now",
            "at the moment",
            "today, this week"
          ]
        },
        {
          "label": "Signal words",
          "items": [
            "Look! Listen!",
            "Now / At the moment"
          ]
        },
        {
          "label": "Stative verbs",
          "items": [
            "like, love, want",
            "know, need, have"
          ]
        }
      ]
    },
    "homework": [
      "Viết 10 câu, 5 simple + 5 continuous",
      "Workbook trang 59-61"
    ]
  },
  {
    "id": 20,
    "unit": "Unit 7",
    "title": "Thể thao & Quá khứ đơn của 'to be'",
    "subtitle": "Dream team - Part 1",
    "objectives": [
      "Học từ vựng về các môn **thể thao**",
      "Sử dụng **was/were** ở quá khứ",
      "Nói về quá khứ với **to be**"
    ],
    "review": {
      "title": "Ôn 2 thì hiện tại",
      "questions": [
        {
          "q": "Look! He ___ (run).",
          "answer": "is running"
        },
        {
          "q": "She ___ (play) tennis every Sunday.",
          "answer": "plays"
        },
        {
          "q": "'Bây giờ' là?",
          "answer": "now"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "football / soccer",
        "vi": "bóng đá",
        "img": "⚽"
      },
      {
        "en": "basketball",
        "vi": "bóng rổ",
        "img": "🏀"
      },
      {
        "en": "tennis",
        "vi": "tennis",
        "img": "🎾"
      },
      {
        "en": "badminton",
        "vi": "cầu lông",
        "img": "🏸"
      },
      {
        "en": "volleyball",
        "vi": "bóng chuyền",
        "img": "🏐"
      },
      {
        "en": "swimming",
        "vi": "bơi lội",
        "img": "🏊"
      },
      {
        "en": "running",
        "vi": "chạy bộ",
        "img": "🏃"
      },
      {
        "en": "cycling",
        "vi": "đạp xe",
        "img": "🚴"
      },
      {
        "en": "yoga",
        "vi": "yoga",
        "img": "🧘"
      },
      {
        "en": "team",
        "vi": "đội",
        "img": "👥"
      },
      {
        "en": "player",
        "vi": "vận động viên",
        "img": "🏃"
      },
      {
        "en": "winner",
        "vi": "người thắng",
        "img": "🏆"
      }
    ],
    "grammar": {
      "title": "Past Simple of 'to be': was / were",
      "theory": "I/He/She/It → was. You/We/They → were. Phủ định: wasn't / weren't. Câu hỏi: Was/Were + S? Trả lời: Yes, S + was/were. No, S + wasn't/weren't.",
      "examples": [
        {
          "en": "I was at school yesterday.",
          "vi": "Tôi đã ở trường hôm qua."
        },
        {
          "en": "They were happy last weekend.",
          "vi": "Họ đã vui cuối tuần trước."
        },
        {
          "en": "She wasn't at home.",
          "vi": "Cô ấy đã không ở nhà."
        },
        {
          "en": "Were you at the match? - Yes, I was.",
          "vi": "Bạn có ở trận đấu không?"
        }
      ],
      "formula": "S + am/is/are + (Adj/N)"
    },
    "listening": {
      "title": "Trận đấu hôm qua",
      "transcript": "Yesterday, there was a big football match. The Red team was very good. They were the winners! It was an exciting game.",
      "questions": [
        {
          "q": "Trận đấu môn gì?",
          "options": [
            "basketball",
            "football",
            "tennis"
          ],
          "answer": 1
        },
        {
          "q": "Đội nào thắng?",
          "options": [
            "Blue",
            "Red",
            "Green"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi về quá khứ",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Where were you yesterday?",
          "vi": "Hôm qua bạn ở đâu?"
        },
        {
          "speaker": "B",
          "en": "I was at the stadium.",
          "vi": "Tôi ở sân vận động."
        },
        {
          "speaker": "A",
          "en": "Was the match exciting?",
          "vi": "Trận đấu có hay không?"
        },
        {
          "speaker": "B",
          "en": "Yes, it was amazing!",
          "vi": "Có, tuyệt vời!"
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I ___ tired yesterday.",
        "options": [
          "am",
          "was",
          "were",
          "is"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "They ___ happy last week.",
        "options": [
          "was",
          "were",
          "are",
          "is"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "She ___ at school. (phủ định)",
        "options": [
          "wasn't",
          "weren't",
          "isn't",
          "didn't"
        ],
        "answer": 0
      },
      {
        "type": "vocab",
        "q": "'Bóng chuyền' là?",
        "options": [
          "football",
          "basketball",
          "volleyball",
          "badminton"
        ],
        "answer": 2
      },
      {
        "type": "writing",
        "q": "'Họ đã vui cuối tuần trước.'",
        "answer": "They were happy last weekend"
      }
    ],
    "mindmap": {
      "center": "Past Simple - to be",
      "branches": [
        {
          "label": "was",
          "items": [
            "I, He, She, It"
          ]
        },
        {
          "label": "were",
          "items": [
            "You, We, They"
          ]
        },
        {
          "label": "(-)",
          "items": [
            "wasn't",
            "weren't"
          ]
        },
        {
          "label": "Sports",
          "items": [
            "football, basketball",
            "tennis, swimming",
            "team, player, winner"
          ]
        }
      ]
    },
    "homework": [
      "Viết 8 câu về tuần trước với was/were",
      "Workbook trang 62-64"
    ]
  },
  {
    "id": 21,
    "unit": "Unit 7",
    "title": "Quá khứ đơn - Động từ có quy tắc",
    "subtitle": "Dream team - Part 2",
    "objectives": [
      "Sử dụng quá khứ đơn động từ có quy tắc",
      "Quy tắc thêm -ed",
      "Nói về sự kiện trong quá khứ"
    ],
    "review": {
      "title": "Ôn was/were",
      "questions": [
        {
          "q": "He ___ at school yesterday.",
          "answer": "was"
        },
        {
          "q": "We ___ tired.",
          "answer": "were"
        },
        {
          "q": "'Người thắng' là?",
          "answer": "winner"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "yesterday",
        "vi": "hôm qua",
        "img": "📅"
      },
      {
        "en": "last week",
        "vi": "tuần trước",
        "img": "📆"
      },
      {
        "en": "last month",
        "vi": "tháng trước",
        "img": "🗓️"
      },
      {
        "en": "last year",
        "vi": "năm ngoái",
        "img": "📅"
      },
      {
        "en": "two days ago",
        "vi": "2 ngày trước",
        "img": "⏪"
      },
      {
        "en": "watch → watched",
        "vi": "đã xem",
        "img": "📺"
      },
      {
        "en": "play → played",
        "vi": "đã chơi",
        "img": "🎮"
      },
      {
        "en": "study → studied",
        "vi": "đã học",
        "img": "📚"
      },
      {
        "en": "stop → stopped",
        "vi": "đã dừng",
        "img": "🛑"
      },
      {
        "en": "live → lived",
        "vi": "đã sống",
        "img": "🏠"
      }
    ],
    "grammar": {
      "title": "Past Simple - Regular Verbs",
      "theory": "Động từ + ed: thường +ed (work→worked); kết thúc -e → +d (live→lived); phụ âm+y → -ied (study→studied); CVC → gấp đôi +ed (stop→stopped). Cách phát âm /t/, /d/, /id/.",
      "examples": [
        {
          "en": "I watched TV last night.",
          "vi": "Tôi đã xem TV tối qua."
        },
        {
          "en": "She played tennis yesterday.",
          "vi": "Cô ấy đã chơi tennis hôm qua."
        },
        {
          "en": "We studied English last week.",
          "vi": "Chúng tôi đã học tiếng Anh tuần trước."
        },
        {
          "en": "They lived in Hanoi 2 years ago.",
          "vi": "Họ đã sống ở HN cách đây 2 năm."
        }
      ],
      "formula": "S + V-ed/V2 + O"
    },
    "listening": {
      "title": "Cuối tuần của Anna",
      "transcript": "Last weekend was busy. On Saturday, I cleaned my room and helped my mom. On Sunday, I visited my grandparents and played with my cousins.",
      "questions": [
        {
          "q": "Thứ Bảy Anna làm gì?",
          "options": [
            "clean room, help mom",
            "visit grandparents",
            "play games"
          ],
          "answer": 0
        },
        {
          "q": "Chủ Nhật?",
          "options": [
            "study",
            "work",
            "visit grandparents"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Nói về cuối tuần",
      "dialogue": [
        {
          "speaker": "A",
          "en": "What did you do last weekend?",
          "vi": "Cuối tuần bạn làm gì?"
        },
        {
          "speaker": "B",
          "en": "I watched a movie and played football.",
          "vi": "Tôi đã xem phim và chơi bóng đá."
        },
        {
          "speaker": "A",
          "en": "Did you study?",
          "vi": "Bạn có học không?"
        },
        {
          "speaker": "B",
          "en": "Yes, I studied English on Sunday.",
          "vi": "Có, tôi học tiếng Anh Chủ Nhật."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "Quá khứ của 'play'?",
        "options": [
          "plaied",
          "played",
          "playd",
          "plays"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "Quá khứ của 'study'?",
        "options": [
          "studyed",
          "studyd",
          "studied",
          "study"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "Quá khứ của 'stop'?",
        "options": [
          "stoped",
          "stopped",
          "stoping",
          "stops"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "I ___ TV yesterday. (watch)",
        "options": [
          "watch",
          "watched",
          "watching",
          "watches"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "Quá khứ của 'live'?",
        "answer": "lived"
      }
    ],
    "mindmap": {
      "center": "Past Simple Regular",
      "branches": [
        {
          "label": "Time markers",
          "items": [
            "yesterday",
            "last week/month/year",
            "ago"
          ]
        },
        {
          "label": "+ ed",
          "items": [
            "work → worked"
          ]
        },
        {
          "label": "+ d",
          "items": [
            "live → lived"
          ]
        },
        {
          "label": "y → ied",
          "items": [
            "study → studied"
          ]
        },
        {
          "label": "double + ed",
          "items": [
            "stop → stopped"
          ]
        }
      ]
    },
    "homework": [
      "Viết nhật ký 1 ngày trong tuần qua (10 câu)",
      "Workbook trang 65-66"
    ]
  },
  {
    "id": 22,
    "unit": "Unit 7",
    "title": "Động từ bất quy tắc",
    "subtitle": "Dream team - Part 3",
    "objectives": [
      "Học các động từ bất quy tắc thông dụng",
      "Sử dụng **past simple** với động từ bất quy tắc",
      "Kể chuyện đơn giản"
    ],
    "review": {
      "title": "Ôn quy tắc -ed",
      "questions": [
        {
          "q": "Quá khứ 'play'?",
          "answer": "played"
        },
        {
          "q": "Quá khứ 'study'?",
          "answer": "studied"
        },
        {
          "q": "'Hôm qua' là?",
          "answer": "yesterday"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "go → went",
        "vi": "đã đi",
        "img": "🚶"
      },
      {
        "en": "see → saw",
        "vi": "đã thấy",
        "img": "👁️"
      },
      {
        "en": "have → had",
        "vi": "đã có",
        "img": "✅"
      },
      {
        "en": "do → did",
        "vi": "đã làm",
        "img": "✔️"
      },
      {
        "en": "eat → ate",
        "vi": "đã ăn",
        "img": "🍴"
      },
      {
        "en": "drink → drank",
        "vi": "đã uống",
        "img": "🥤"
      },
      {
        "en": "buy → bought",
        "vi": "đã mua",
        "img": "🛒"
      },
      {
        "en": "get → got",
        "vi": "đã lấy",
        "img": "📦"
      },
      {
        "en": "take → took",
        "vi": "đã lấy/đi",
        "img": "👜"
      },
      {
        "en": "make → made",
        "vi": "đã làm",
        "img": "🔨"
      },
      {
        "en": "come → came",
        "vi": "đã đến",
        "img": "🏃"
      },
      {
        "en": "give → gave",
        "vi": "đã đưa",
        "img": "🤝"
      }
    ],
    "grammar": {
      "title": "Past Simple - Irregular Verbs",
      "theory": "Động từ bất quy tắc KHÔNG thêm -ed. Phải HỌC THUỘC. Một số động từ phổ biến: go-went, see-saw, do-did, have-had, eat-ate, give-gave...",
      "examples": [
        {
          "en": "I went to the park yesterday.",
          "vi": "Tôi đã đi công viên hôm qua."
        },
        {
          "en": "She had lunch at 12.",
          "vi": "Cô ấy đã ăn trưa lúc 12 giờ."
        },
        {
          "en": "We saw a great movie last week.",
          "vi": "Chúng tôi đã xem phim hay tuần trước."
        },
        {
          "en": "He bought a new phone.",
          "vi": "Anh ấy đã mua điện thoại mới."
        }
      ],
      "formula": "S + V-ed/V2 + O"
    },
    "listening": {
      "title": "Sinh nhật của Tom",
      "transcript": "Last Saturday was Tom's birthday. He had a big party. His friends came to his house. They ate pizza and drank juice. Tom got many gifts.",
      "questions": [
        {
          "q": "Tom làm gì hôm thứ Bảy?",
          "options": [
            "went to school",
            "had a party",
            "studied"
          ],
          "answer": 1
        },
        {
          "q": "Họ ăn gì?",
          "options": [
            "pizza",
            "rice",
            "bread"
          ],
          "answer": 0
        },
        {
          "q": "Tom được gì?",
          "options": [
            "nothing",
            "money",
            "many gifts"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Kể chuyện đơn giản",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Where did you go yesterday?",
          "vi": "Hôm qua bạn đi đâu?"
        },
        {
          "speaker": "B",
          "en": "I went to the cinema.",
          "vi": "Tôi đi rạp chiếu phim."
        },
        {
          "speaker": "A",
          "en": "What did you see?",
          "vi": "Bạn xem gì?"
        },
        {
          "speaker": "B",
          "en": "I saw an action movie.",
          "vi": "Tôi xem phim hành động."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "Quá khứ của 'go'?",
        "options": [
          "goed",
          "went",
          "goes",
          "going"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "Quá khứ của 'eat'?",
        "options": [
          "eated",
          "ate",
          "eaten",
          "eats"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "Quá khứ của 'buy'?",
        "options": [
          "buyed",
          "bought",
          "bough",
          "buys"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "I ___ a new shirt yesterday. (buy)",
        "options": [
          "buy",
          "buyed",
          "bought",
          "buying"
        ],
        "answer": 2
      },
      {
        "type": "writing",
        "q": "Quá khứ của 'see'?",
        "answer": "saw"
      }
    ],
    "mindmap": {
      "center": "Irregular Verbs",
      "branches": [
        {
          "label": "Movement",
          "items": [
            "go → went",
            "come → came",
            "take → took"
          ]
        },
        {
          "label": "Senses",
          "items": [
            "see → saw",
            "hear → heard"
          ]
        },
        {
          "label": "Actions",
          "items": [
            "do → did",
            "make → made",
            "give → gave"
          ]
        },
        {
          "label": "Daily",
          "items": [
            "have → had",
            "eat → ate",
            "drink → drank"
          ]
        },
        {
          "label": "Other",
          "items": [
            "buy → bought",
            "get → got"
          ]
        }
      ]
    },
    "homework": [
      "Học thuộc 12 động từ bất quy tắc",
      "Viết 1 đoạn văn 10 câu kể về 1 ngày đặc biệt",
      "Workbook trang 67-69"
    ]
  },
  {
    "id": 23,
    "unit": "Unit 8",
    "title": "Nghề nghiệp & Quá khứ đơn (Phủ định)",
    "subtitle": "Feeling inspired - Part 1",
    "objectives": [
      "Học từ vựng **nghề nghiệp**",
      "Sử dụng didn't + V trong **câu phủ định**",
      "Phân biệt với **phủ định to be was/were**"
    ],
    "review": {
      "title": "Ôn động từ bất quy tắc",
      "questions": [
        {
          "q": "QK của 'have'?",
          "answer": "had"
        },
        {
          "q": "QK của 'do'?",
          "answer": "did"
        },
        {
          "q": "QK của 'go'?",
          "answer": "went"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "doctor",
        "vi": "bác sĩ",
        "img": "👨‍⚕️"
      },
      {
        "en": "teacher",
        "vi": "giáo viên",
        "img": "👨‍🏫"
      },
      {
        "en": "engineer",
        "vi": "kỹ sư",
        "img": "👷"
      },
      {
        "en": "nurse",
        "vi": "y tá",
        "img": "👩‍⚕️"
      },
      {
        "en": "police officer",
        "vi": "cảnh sát",
        "img": "👮"
      },
      {
        "en": "firefighter",
        "vi": "lính cứu hỏa",
        "img": "🧑‍🚒"
      },
      {
        "en": "chef",
        "vi": "đầu bếp",
        "img": "👨‍🍳"
      },
      {
        "en": "farmer",
        "vi": "nông dân",
        "img": "👨‍🌾"
      },
      {
        "en": "writer",
        "vi": "nhà văn",
        "img": "✍️"
      },
      {
        "en": "artist",
        "vi": "nghệ sĩ",
        "img": "🎨"
      },
      {
        "en": "scientist",
        "vi": "nhà khoa học",
        "img": "👨‍🔬"
      },
      {
        "en": "businessman",
        "vi": "doanh nhân",
        "img": "💼"
      }
    ],
    "grammar": {
      "title": "Past Simple - Negative",
      "theory": "S + didn't + V (nguyên thể). 'didn't' = did not. Áp dụng cho TẤT CẢ chủ ngữ. Động từ chính TRỞ VỀ NGUYÊN THỂ (không thêm -ed).",
      "examples": [
        {
          "en": "I didn't watch TV yesterday.",
          "vi": "Tôi đã không xem TV hôm qua."
        },
        {
          "en": "She didn't go to school.",
          "vi": "Cô ấy đã không đi học."
        },
        {
          "en": "They didn't have lunch at home.",
          "vi": "Họ đã không ăn trưa ở nhà."
        },
        {
          "en": "He didn't see the movie.",
          "vi": "Anh ấy đã không xem phim đó."
        }
      ]
    },
    "listening": {
      "title": "Một ngày tệ",
      "transcript": "Yesterday was a bad day. I didn't sleep well. I didn't eat breakfast. I went to school late. I didn't do my homework. My teacher wasn't happy.",
      "questions": [
        {
          "q": "Người nói KHÔNG làm gì?",
          "options": [
            "went to school",
            "ate breakfast",
            "saw teacher"
          ],
          "answer": 1
        },
        {
          "q": "Cô giáo thế nào?",
          "options": [
            "happy",
            "wasn't happy",
            "tired"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi về nghề",
      "dialogue": [
        {
          "speaker": "A",
          "en": "What does your father do?",
          "vi": "Bố bạn làm nghề gì?"
        },
        {
          "speaker": "B",
          "en": "He's an engineer.",
          "vi": "Ông ấy là kỹ sư."
        },
        {
          "speaker": "A",
          "en": "And your mother?",
          "vi": "Còn mẹ bạn?"
        },
        {
          "speaker": "B",
          "en": "She's a teacher. She didn't work yesterday.",
          "vi": "Mẹ tôi là giáo viên. Hôm qua mẹ không làm việc."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I ___ go to school yesterday.",
        "options": [
          "didn't",
          "wasn't",
          "don't",
          "haven't"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "She ___ ___ TV. (watch)",
        "options": [
          "didn't watched",
          "didn't watch",
          "wasn't watch",
          "doesn't watch"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "They ___ at the party.",
        "options": [
          "didn't",
          "weren't",
          "doesn't",
          "don't"
        ],
        "answer": 1
      },
      {
        "type": "vocab",
        "q": "'Đầu bếp' là?",
        "options": [
          "doctor",
          "chef",
          "writer",
          "artist"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "Phủ định: 'He played football.'",
        "answer": "He didn't play football"
      }
    ],
    "mindmap": {
      "center": "Jobs & Past Negative",
      "branches": [
        {
          "label": "Health",
          "items": [
            "doctor, nurse"
          ]
        },
        {
          "label": "Education",
          "items": [
            "teacher, scientist"
          ]
        },
        {
          "label": "Service",
          "items": [
            "police officer, firefighter",
            "chef, farmer"
          ]
        },
        {
          "label": "Creative",
          "items": [
            "writer, artist"
          ]
        },
        {
          "label": "Past (-)",
          "items": [
            "S + didn't + V",
            "All persons"
          ]
        }
      ]
    },
    "homework": [
      "Viết 5 câu phủ định về tuần qua",
      "Hỏi 5 người trong gia đình về nghề nghiệp",
      "Workbook trang 70-72"
    ]
  },
  {
    "id": 24,
    "unit": "Unit 8",
    "title": "Quá khứ đơn - Câu hỏi",
    "subtitle": "Feeling inspired - Part 2",
    "objectives": [
      "Đặt câu hỏi Yes/No với quá khứ đơn",
      "Đặt câu hỏi Wh- với quá khứ đơn",
      "Phỏng vấn người khác"
    ],
    "review": {
      "title": "Ôn quá khứ phủ định",
      "questions": [
        {
          "q": "I ___ ___ TV.",
          "answer": "didn't watch"
        },
        {
          "q": "'Y tá' là?",
          "answer": "nurse"
        },
        {
          "q": "QK 'eat'?",
          "answer": "ate"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "creative",
        "vi": "sáng tạo",
        "img": "💡"
      },
      {
        "en": "intelligent",
        "vi": "thông minh",
        "img": "🧠"
      },
      {
        "en": "hard-working",
        "vi": "chăm chỉ",
        "img": "💪"
      },
      {
        "en": "kind",
        "vi": "tốt bụng",
        "img": "❤️"
      },
      {
        "en": "friendly",
        "vi": "thân thiện",
        "img": "😊"
      },
      {
        "en": "brave",
        "vi": "dũng cảm",
        "img": "🦁"
      },
      {
        "en": "honest",
        "vi": "trung thực",
        "img": "🤝"
      },
      {
        "en": "patient",
        "vi": "kiên nhẫn",
        "img": "🙏"
      },
      {
        "en": "funny",
        "vi": "hài hước",
        "img": "😄"
      },
      {
        "en": "lazy",
        "vi": "lười biếng",
        "img": "😴"
      }
    ],
    "grammar": {
      "title": "Past Simple - Questions",
      "theory": "Yes/No: Did + S + V? Trả lời ngắn: Yes, S + did. No, S + didn't. Wh-questions: Wh- + did + S + V? Lưu ý: ĐỘNG TỪ CHÍNH GIỮ NGUYÊN THỂ.",
      "examples": [
        {
          "en": "Did you watch TV last night? - Yes, I did.",
          "vi": "Tối qua bạn xem TV không?"
        },
        {
          "en": "Did she go to school? - No, she didn't.",
          "vi": "Cô ấy đi học không?"
        },
        {
          "en": "What did you do yesterday?",
          "vi": "Hôm qua bạn làm gì?"
        },
        {
          "en": "Where did they go?",
          "vi": "Họ đã đi đâu?"
        }
      ]
    },
    "listening": {
      "title": "Phỏng vấn",
      "transcript": "Reporter: Did you study hard at school? - Yes, I did. Reporter: What was your favorite subject? - It was Math. Reporter: When did you become a writer? - 5 years ago.",
      "questions": [
        {
          "q": "Người này có học chăm không?",
          "options": [
            "No",
            "Yes",
            "Sometimes"
          ],
          "answer": 1
        },
        {
          "q": "Môn yêu thích?",
          "options": [
            "English",
            "Math",
            "Science"
          ],
          "answer": 1
        },
        {
          "q": "Trở thành nhà văn khi nào?",
          "options": [
            "3 years ago",
            "5 years ago",
            "10 years ago"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Phỏng vấn bạn",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Did you go to school yesterday?",
          "vi": "Hôm qua bạn có đi học không?"
        },
        {
          "speaker": "B",
          "en": "Yes, I did.",
          "vi": "Có."
        },
        {
          "speaker": "A",
          "en": "What did you study?",
          "vi": "Bạn học gì?"
        },
        {
          "speaker": "B",
          "en": "I studied English and Math.",
          "vi": "Tôi học Anh và Toán."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "___ you watch TV?",
        "options": [
          "Do",
          "Did",
          "Was",
          "Were"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "Trả lời: 'Did she play tennis?' (đúng)",
        "options": [
          "Yes, she played.",
          "Yes, she did.",
          "Yes, she does.",
          "Yes, was."
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "What ___ he ___? (do)",
        "options": [
          "did/did",
          "did/do",
          "do/did",
          "was/do"
        ],
        "answer": 1
      },
      {
        "type": "vocab",
        "q": "'Chăm chỉ' là?",
        "options": [
          "lazy",
          "kind",
          "hard-working",
          "funny"
        ],
        "answer": 2
      },
      {
        "type": "writing",
        "q": "Đặt câu hỏi: 'I went to Hanoi.'",
        "answer": "Where did you go?"
      }
    ],
    "mindmap": {
      "center": "Past Simple Questions",
      "branches": [
        {
          "label": "Yes/No",
          "items": [
            "Did + S + V?",
            "Yes, S + did.",
            "No, S + didn't."
          ]
        },
        {
          "label": "Wh-",
          "items": [
            "What/Where/When",
            "+ did + S + V?"
          ]
        },
        {
          "label": "to be",
          "items": [
            "Was/Were + S?",
            "+ adjective"
          ]
        },
        {
          "label": "Adjectives",
          "items": [
            "creative, kind",
            "hard-working, brave",
            "funny, honest"
          ]
        }
      ]
    },
    "homework": [
      "Viết 5 câu hỏi Yes/No và 5 câu hỏi Wh- về quá khứ",
      "Phỏng vấn 1 người và viết lại",
      "Workbook trang 73-74"
    ]
  },
  {
    "id": 25,
    "unit": "Unit 8",
    "title": "Người truyền cảm hứng & Ôn tập",
    "subtitle": "Feeling inspired - Part 3",
    "objectives": [
      "Mô tả người truyền cảm hứng",
      "Ôn tập tổng hợp quá khứ đơn",
      "Viết tiểu sử ngắn"
    ],
    "review": {
      "title": "Mini-quiz",
      "questions": [
        {
          "q": "Đặt câu hỏi 'When' về 'I went home at 6.'",
          "answer": "When did you go home?"
        },
        {
          "q": "'Sáng tạo' là?",
          "answer": "creative"
        },
        {
          "q": "QK 'come'?",
          "answer": "came"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "famous",
        "vi": "nổi tiếng",
        "img": "⭐"
      },
      {
        "en": "successful",
        "vi": "thành công",
        "img": "🏆"
      },
      {
        "en": "talented",
        "vi": "tài năng",
        "img": "🎯"
      },
      {
        "en": "inspiring",
        "vi": "truyền cảm hứng",
        "img": "✨"
      },
      {
        "en": "biography",
        "vi": "tiểu sử",
        "img": "📖"
      },
      {
        "en": "career",
        "vi": "sự nghiệp",
        "img": "💼"
      },
      {
        "en": "achievement",
        "vi": "thành tựu",
        "img": "🥇"
      },
      {
        "en": "born",
        "vi": "sinh ra",
        "img": "👶"
      },
      {
        "en": "graduated",
        "vi": "tốt nghiệp",
        "img": "🎓"
      },
      {
        "en": "started",
        "vi": "bắt đầu",
        "img": "🚀"
      }
    ],
    "grammar": {
      "title": "Past Simple - Comprehensive Review",
      "theory": "TỔNG HỢP: (+) S + V2/V-ed. (-) S + didn't + V. (?) Did + S + V? to be: was/were. Time markers: yesterday, last..., ago, in 1990, when I was a child.",
      "examples": [
        {
          "en": "Steve Jobs was born in 1955.",
          "vi": "Steve Jobs sinh năm 1955."
        },
        {
          "en": "He started Apple in 1976.",
          "vi": "Ông thành lập Apple năm 1976."
        },
        {
          "en": "He didn't go to college.",
          "vi": "Ông không học đại học."
        },
        {
          "en": "Did he change the world? - Yes, he did!",
          "vi": "Ông có thay đổi thế giới không?"
        }
      ]
    },
    "listening": {
      "title": "Tiểu sử ngắn",
      "transcript": "She was born in 1980 in Vietnam. She studied medicine in Hanoi. She graduated in 2005. She became a doctor. She worked in many countries.",
      "questions": [
        {
          "q": "Sinh năm nào?",
          "options": [
            "1975",
            "1980",
            "1985"
          ],
          "answer": 1
        },
        {
          "q": "Học gì?",
          "options": [
            "English",
            "Math",
            "medicine"
          ],
          "answer": 2
        },
        {
          "q": "Tốt nghiệp năm?",
          "options": [
            "2000",
            "2005",
            "2010"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Người em ngưỡng mộ",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Who is your hero?",
          "vi": "Anh hùng của bạn là ai?"
        },
        {
          "speaker": "B",
          "en": "My hero is my mother.",
          "vi": "Mẹ tôi."
        },
        {
          "speaker": "A",
          "en": "Why?",
          "vi": "Tại sao?"
        },
        {
          "speaker": "B",
          "en": "She is hard-working and kind. She helped many people.",
          "vi": "Bà chăm chỉ, tốt bụng. Đã giúp nhiều người."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "He ___ in 1990. (be born)",
        "options": [
          "was born",
          "is born",
          "born",
          "were born"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "We ___ to the museum last week. (go)",
        "options": [
          "go",
          "goed",
          "went",
          "gone"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "Did she ___ a doctor? (become)",
        "options": [
          "became",
          "becomes",
          "become",
          "becoming"
        ],
        "answer": 2
      },
      {
        "type": "vocab",
        "q": "'Sự nghiệp' là?",
        "options": [
          "biography",
          "career",
          "achievement",
          "famous"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Cô ấy đã không tốt nghiệp năm 2020.'",
        "answer": "She didn't graduate in 2020"
      }
    ],
    "mindmap": {
      "center": "Past Simple Mastery",
      "branches": [
        {
          "label": "(+)",
          "items": [
            "V2 / V-ed",
            "was/were"
          ]
        },
        {
          "label": "(-)",
          "items": [
            "didn't + V",
            "wasn't/weren't"
          ]
        },
        {
          "label": "(?)",
          "items": [
            "Did + S + V?",
            "Was/Were + S?"
          ]
        },
        {
          "label": "Time",
          "items": [
            "yesterday, ago",
            "last..., in 1990"
          ]
        },
        {
          "label": "Vocab",
          "items": [
            "famous, successful",
            "talented, inspiring"
          ]
        }
      ]
    },
    "homework": [
      "Viết tiểu sử ngắn (10-12 câu) về người em ngưỡng mộ",
      "Ôn tập Unit 6-8",
      "Workbook trang 75-77"
    ]
  },
  {
    "id": 26,
    "unit": "Unit 9",
    "title": "Động vật & So sánh hơn",
    "subtitle": "Life on Earth - Part 1",
    "objectives": [
      "Học từ vựng động vật",
      "Sử dụng so sánh hơn của tính từ",
      "So sánh các sự vật"
    ],
    "review": {
      "title": "Ôn quá khứ",
      "questions": [
        {
          "q": "Did you ___ (see) the movie?",
          "answer": "see"
        },
        {
          "q": "She ___ in 1990. (be born)",
          "answer": "was born"
        },
        {
          "q": "QK 'make'?",
          "answer": "made"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "elephant",
        "vi": "voi",
        "img": "🐘"
      },
      {
        "en": "lion",
        "vi": "sư tử",
        "img": "🦁"
      },
      {
        "en": "tiger",
        "vi": "hổ",
        "img": "🐯"
      },
      {
        "en": "monkey",
        "vi": "khỉ",
        "img": "🐒"
      },
      {
        "en": "dog",
        "vi": "chó",
        "img": "🐕"
      },
      {
        "en": "cat",
        "vi": "mèo",
        "img": "🐈"
      },
      {
        "en": "bird",
        "vi": "chim",
        "img": "🐦"
      },
      {
        "en": "fish",
        "vi": "cá",
        "img": "🐟"
      },
      {
        "en": "snake",
        "vi": "rắn",
        "img": "🐍"
      },
      {
        "en": "bear",
        "vi": "gấu",
        "img": "🐻"
      },
      {
        "en": "rabbit",
        "vi": "thỏ",
        "img": "🐰"
      },
      {
        "en": "horse",
        "vi": "ngựa",
        "img": "🐎"
      }
    ],
    "grammar": {
      "title": "Comparative Adjectives",
      "theory": "1 âm tiết: + er (small→smaller). Kết thúc -e: + r (large→larger). Phụ âm + y: y→ier (happy→happier). 2+ âm tiết: more + adj (beautiful → more beautiful). Bất quy tắc: good→better, bad→worse, far→farther/further. Cấu trúc: A + V + comp. + than + B.",
      "examples": [
        {
          "en": "An elephant is bigger than a dog.",
          "vi": "Voi to hơn chó."
        },
        {
          "en": "She is taller than her sister.",
          "vi": "Cô ấy cao hơn em gái."
        },
        {
          "en": "This book is more interesting than that one.",
          "vi": "Sách này hay hơn quyển kia."
        },
        {
          "en": "My English is better than my French.",
          "vi": "Tiếng Anh tôi tốt hơn tiếng Pháp."
        }
      ],
      "formula": "S + V + Adj-er/more Adj + than"
    },
    "listening": {
      "title": "So sánh động vật",
      "transcript": "Look at these animals. The elephant is bigger than the lion. But the lion is faster than the elephant. The cat is smaller than the dog.",
      "questions": [
        {
          "q": "Voi vs sư tử?",
          "options": [
            "bigger",
            "smaller",
            "same"
          ],
          "answer": 0
        },
        {
          "q": "Sư tử vs voi?",
          "options": [
            "slower",
            "faster",
            "stronger"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "So sánh đồ vật/người",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Who is taller, you or your brother?",
          "vi": "Ai cao hơn?"
        },
        {
          "speaker": "B",
          "en": "My brother is taller than me.",
          "vi": "Anh tôi cao hơn."
        },
        {
          "speaker": "A",
          "en": "Which is more interesting, math or English?",
          "vi": "Cái nào thú vị hơn?"
        },
        {
          "speaker": "B",
          "en": "English is more interesting than math.",
          "vi": "Tiếng Anh thú vị hơn."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "So sánh 'tall'?",
        "options": [
          "taller",
          "more tall",
          "tallest",
          "taler"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "So sánh 'beautiful'?",
        "options": [
          "beautifuler",
          "more beautiful",
          "most beautiful",
          "beautifuller"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "So sánh 'good'?",
        "options": [
          "gooder",
          "more good",
          "better",
          "best"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "An elephant is ___ than a cat. (big)",
        "options": [
          "big",
          "bigger",
          "more big",
          "biggest"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "So sánh 'happy'?",
        "answer": "happier"
      }
    ],
    "mindmap": {
      "center": "Comparatives",
      "branches": [
        {
          "label": "1 âm tiết",
          "items": [
            "small → smaller",
            "tall → taller"
          ]
        },
        {
          "label": "y → ier",
          "items": [
            "happy → happier"
          ]
        },
        {
          "label": "2+ âm tiết",
          "items": [
            "more + adj",
            "more beautiful"
          ]
        },
        {
          "label": "Irregular",
          "items": [
            "good → better",
            "bad → worse"
          ]
        },
        {
          "label": "Animals",
          "items": [
            "elephant, lion",
            "tiger, monkey",
            "dog, cat, bird"
          ]
        }
      ]
    },
    "homework": [
      "Viết 10 câu so sánh dùng comparatives",
      "Workbook trang 78-80"
    ]
  },
  {
    "id": 27,
    "unit": "Unit 9",
    "title": "Bộ phận cơ thể & So sánh nhất",
    "subtitle": "Life on Earth - Part 2",
    "objectives": [
      "Học từ vựng bộ phận cơ thể",
      "Sử dụng so sánh nhất",
      "Mô tả đỉnh cao của tính chất"
    ],
    "review": {
      "title": "Ôn so sánh hơn",
      "questions": [
        {
          "q": "So sánh 'big'?",
          "answer": "bigger"
        },
        {
          "q": "So sánh 'interesting'?",
          "answer": "more interesting"
        },
        {
          "q": "'Hổ' là?",
          "answer": "tiger"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "head",
        "vi": "đầu",
        "img": "🤔"
      },
      {
        "en": "face",
        "vi": "mặt",
        "img": "😊"
      },
      {
        "en": "neck",
        "vi": "cổ",
        "img": "👤"
      },
      {
        "en": "shoulder",
        "vi": "vai",
        "img": "💪"
      },
      {
        "en": "arm",
        "vi": "cánh tay",
        "img": "💪"
      },
      {
        "en": "hand",
        "vi": "bàn tay",
        "img": "✋"
      },
      {
        "en": "finger",
        "vi": "ngón tay",
        "img": "👆"
      },
      {
        "en": "leg",
        "vi": "chân",
        "img": "🦵"
      },
      {
        "en": "foot",
        "vi": "bàn chân",
        "img": "🦶"
      },
      {
        "en": "back",
        "vi": "lưng",
        "img": "👤"
      },
      {
        "en": "stomach",
        "vi": "bụng",
        "img": "🤰"
      },
      {
        "en": "heart",
        "vi": "tim",
        "img": "❤️"
      }
    ],
    "grammar": {
      "title": "Superlative Adjectives",
      "theory": "1 âm tiết: the + adj-est (small→the smallest). y → iest (happy→the happiest). 2+ âm tiết: the most + adj. Bất quy tắc: good→the best, bad→the worst. Dùng 'in/of' sau superlative.",
      "examples": [
        {
          "en": "Mount Everest is the highest mountain in the world.",
          "vi": "Everest là núi cao nhất thế giới."
        },
        {
          "en": "She is the tallest girl in my class.",
          "vi": "Cô ấy là cô gái cao nhất lớp."
        },
        {
          "en": "This is the most expensive watch.",
          "vi": "Đây là đồng hồ đắt nhất."
        },
        {
          "en": "He is the best student.",
          "vi": "Cậu ấy là học sinh giỏi nhất."
        }
      ],
      "formula": "S + V + the + Adj-est/most Adj"
    },
    "listening": {
      "title": "Sự thật về thế giới",
      "transcript": "The blue whale is the biggest animal. The cheetah is the fastest land animal. Mount Everest is the highest mountain. The Nile is the longest river.",
      "questions": [
        {
          "q": "Động vật to nhất?",
          "options": [
            "elephant",
            "blue whale",
            "lion"
          ],
          "answer": 1
        },
        {
          "q": "Sông dài nhất?",
          "options": [
            "Amazon",
            "Mekong",
            "Nile"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi về 'nhất'",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Who is the tallest in your family?",
          "vi": "Ai cao nhất nhà bạn?"
        },
        {
          "speaker": "B",
          "en": "My father is the tallest.",
          "vi": "Bố tôi cao nhất."
        },
        {
          "speaker": "A",
          "en": "What is the most beautiful place you know?",
          "vi": "Nơi đẹp nhất bạn biết?"
        },
        {
          "speaker": "B",
          "en": "I think Halong Bay is the most beautiful.",
          "vi": "Vịnh Hạ Long đẹp nhất."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "So sánh nhất 'tall'?",
        "options": [
          "taller",
          "tallest",
          "the tallest",
          "most tall"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "So sánh nhất 'expensive'?",
        "options": [
          "the expensiver",
          "the most expensive",
          "the expensivest",
          "expensiver"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "So sánh nhất 'good'?",
        "options": [
          "the gooder",
          "the goodest",
          "the best",
          "the most good"
        ],
        "answer": 2
      },
      {
        "type": "vocab",
        "q": "'Vai' là?",
        "options": [
          "arm",
          "neck",
          "shoulder",
          "back"
        ],
        "answer": 2
      },
      {
        "type": "writing",
        "q": "So sánh nhất 'happy'?",
        "answer": "the happiest"
      }
    ],
    "mindmap": {
      "center": "Superlatives",
      "branches": [
        {
          "label": "the + ...est",
          "items": [
            "the smallest",
            "the tallest"
          ]
        },
        {
          "label": "y → iest",
          "items": [
            "the happiest"
          ]
        },
        {
          "label": "the most",
          "items": [
            "the most beautiful",
            "the most expensive"
          ]
        },
        {
          "label": "Irregular",
          "items": [
            "the best",
            "the worst"
          ]
        },
        {
          "label": "Body parts",
          "items": [
            "head, face, neck",
            "arm, hand, leg",
            "back, heart"
          ]
        }
      ]
    },
    "homework": [
      "Viết 10 câu dùng superlatives",
      "Workbook trang 81-82"
    ]
  },
  {
    "id": 28,
    "unit": "Unit 9",
    "title": "Địa lý & Hiện tại hoàn thành",
    "subtitle": "Life on Earth - Part 3",
    "objectives": [
      "Học từ vựng địa lý",
      "Sử dụng hiện tại hoàn thành với ever/never",
      "Hỏi về kinh nghiệm"
    ],
    "review": {
      "title": "Ôn nhanh",
      "functions": [],
      "questions": [
        {
          "q": "So sánh nhất 'good'?",
          "answer": "the best"
        },
        {
          "q": "'Tim' là?",
          "answer": "heart"
        },
        {
          "q": "'Đẹp nhất' là?",
          "answer": "the most beautiful"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "mountain",
        "vi": "núi",
        "img": "⛰️"
      },
      {
        "en": "river",
        "vi": "sông",
        "img": "🏞️"
      },
      {
        "en": "lake",
        "vi": "hồ",
        "img": "🏞️"
      },
      {
        "en": "ocean / sea",
        "vi": "đại dương / biển",
        "img": "🌊"
      },
      {
        "en": "desert",
        "vi": "sa mạc",
        "img": "🏜️"
      },
      {
        "en": "forest",
        "vi": "rừng",
        "img": "🌲"
      },
      {
        "en": "island",
        "vi": "đảo",
        "img": "🏝️"
      },
      {
        "en": "beach",
        "vi": "bãi biển",
        "img": "🏖️"
      },
      {
        "en": "valley",
        "vi": "thung lũng",
        "img": "🏔️"
      },
      {
        "en": "ever",
        "vi": "đã từng",
        "img": "❓"
      },
      {
        "en": "never",
        "vi": "chưa bao giờ",
        "img": "🚫"
      }
    ],
    "grammar": {
      "title": "Present Perfect with ever/never",
      "theory": "S + have/has + V3/V-ed (Past Participle). Dùng 'ever' trong câu hỏi (đã bao giờ chưa). 'never' = chưa bao giờ. He/She/It → has. I/You/We/They → have.",
      "examples": [
        {
          "en": "Have you ever been to Paris?",
          "vi": "Bạn đã bao giờ đến Paris chưa?"
        },
        {
          "en": "I have never seen a lion.",
          "vi": "Tôi chưa bao giờ nhìn thấy sư tử."
        },
        {
          "en": "She has visited Vietnam.",
          "vi": "Cô ấy đã thăm Việt Nam."
        },
        {
          "en": "We have never tried sushi.",
          "vi": "Chúng tôi chưa bao giờ thử sushi."
        }
      ],
      "formula": "S + have/has + V3/ed"
    },
    "listening": {
      "title": "Du lịch của Anna",
      "transcript": "I have been to many countries. I have visited Japan, France, and Australia. I have never been to Africa. Have you ever traveled abroad?",
      "questions": [
        {
          "q": "Anna đã đến nước nào?",
          "options": [
            "Africa",
            "Japan",
            "Vietnam"
          ],
          "answer": 1
        },
        {
          "q": "Anna CHƯA đến đâu?",
          "options": [
            "France",
            "Australia",
            "Africa"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Hỏi kinh nghiệm",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Have you ever climbed a mountain?",
          "vi": "Bạn đã bao giờ leo núi chưa?"
        },
        {
          "speaker": "B",
          "en": "Yes, I have. I climbed Fansipan.",
          "vi": "Có, tôi đã leo Fansipan."
        },
        {
          "speaker": "A",
          "en": "Have you ever seen the ocean?",
          "vi": "Bạn đã thấy biển chưa?"
        },
        {
          "speaker": "B",
          "en": "Yes, I love the beach!",
          "vi": "Có, tôi thích bãi biển!"
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I ___ been to London.",
        "options": [
          "have",
          "has",
          "am",
          "did"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "She ___ visited Japan.",
        "options": [
          "have",
          "has",
          "is",
          "was"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "Have you ___ tried pizza?",
        "options": [
          "never",
          "ever",
          "always",
          "yet"
        ],
        "answer": 1
      },
      {
        "type": "vocab",
        "q": "'Sa mạc' là?",
        "options": [
          "forest",
          "desert",
          "lake",
          "valley"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Tôi chưa bao giờ thấy tuyết.'",
        "answer": "I have never seen snow"
      }
    ],
    "mindmap": {
      "center": "Geography & Present Perfect",
      "branches": [
        {
          "label": "Land",
          "items": [
            "mountain, valley",
            "desert, forest",
            "island"
          ]
        },
        {
          "label": "Water",
          "items": [
            "river, lake",
            "ocean, sea, beach"
          ]
        },
        {
          "label": "Form",
          "items": [
            "have/has + V3",
            "I have / She has"
          ]
        },
        {
          "label": "Use",
          "items": [
            "ever (questions)",
            "never (negative)",
            "Experience"
          ]
        }
      ]
    },
    "homework": [
      "Viết 8 câu về kinh nghiệm dùng ever/never",
      "Workbook trang 83-86"
    ]
  },
  {
    "id": 29,
    "unit": "Unit 10",
    "title": "Du lịch & be going to / must / should",
    "subtitle": "Let's go!",
    "objectives": [
      "Học từ vựng về **du lịch** và **thời tiết**",
      "Sử dụng **be going to** cho dự định",
      "Sử dụng **must/have to**/should"
    ],
    "review": {
      "title": "Ôn Present Perfect",
      "questions": [
        {
          "q": "I ___ been to Tokyo.",
          "answer": "have"
        },
        {
          "q": "'Bãi biển' là?",
          "answer": "beach"
        },
        {
          "q": "'Chưa bao giờ' là?",
          "answer": "never"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "sunny",
        "vi": "nắng",
        "img": "☀️"
      },
      {
        "en": "rainy",
        "vi": "mưa",
        "img": "🌧️"
      },
      {
        "en": "cloudy",
        "vi": "nhiều mây",
        "img": "☁️"
      },
      {
        "en": "windy",
        "vi": "gió",
        "img": "💨"
      },
      {
        "en": "snowy",
        "vi": "tuyết",
        "img": "❄️"
      },
      {
        "en": "hot",
        "vi": "nóng",
        "img": "🥵"
      },
      {
        "en": "cold",
        "vi": "lạnh",
        "img": "🥶"
      },
      {
        "en": "passport",
        "vi": "hộ chiếu",
        "img": "📔"
      },
      {
        "en": "suitcase",
        "vi": "vali",
        "img": "🧳"
      },
      {
        "en": "ticket",
        "vi": "vé",
        "img": "🎫"
      },
      {
        "en": "plane",
        "vi": "máy bay",
        "img": "✈️"
      },
      {
        "en": "train",
        "vi": "tàu hỏa",
        "img": "🚆"
      },
      {
        "en": "bus",
        "vi": "xe buýt",
        "img": "🚌"
      },
      {
        "en": "taxi",
        "vi": "taxi",
        "img": "🚕"
      }
    ],
    "grammar": {
      "title": "be going to / must / have to / should",
      "theory": "BE GOING TO: dự định tương lai. S + am/is/are + going to + V. MUST: phải làm (luật, yêu cầu mạnh). HAVE TO: phải làm (cần thiết). SHOULD: nên (lời khuyên). MUSTN'T: không được phép. SHOULDN'T: không nên.",
      "examples": [
        {
          "en": "I'm going to visit Hanoi next week.",
          "vi": "Tôi sẽ thăm Hà Nội tuần tới."
        },
        {
          "en": "You must show your passport at the airport.",
          "vi": "Bạn phải xuất trình hộ chiếu."
        },
        {
          "en": "We have to book tickets in advance.",
          "vi": "Chúng ta phải đặt vé trước."
        },
        {
          "en": "You should bring a jacket. It's cold.",
          "vi": "Bạn nên mang áo khoác. Trời lạnh."
        }
      ],
      "formula": "be going to V  /  must V  /  should V"
    },
    "listening": {
      "title": "Kế hoạch du lịch",
      "transcript": "We are going to travel to Da Nang next month. We are going to fly there. We must book the tickets soon. The weather is going to be sunny and hot.",
      "questions": [
        {
          "q": "Đi đâu?",
          "options": [
            "Hanoi",
            "Da Nang",
            "Saigon"
          ],
          "answer": 1
        },
        {
          "q": "Phương tiện gì?",
          "options": [
            "bus",
            "train",
            "plane"
          ],
          "answer": 2
        },
        {
          "q": "Thời tiết?",
          "options": [
            "rainy",
            "sunny and hot",
            "cold"
          ],
          "answer": 1
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Lập kế hoạch",
      "dialogue": [
        {
          "speaker": "A",
          "en": "What are you going to do this weekend?",
          "vi": "Cuối tuần bạn sẽ làm gì?"
        },
        {
          "speaker": "B",
          "en": "I'm going to visit my grandparents.",
          "vi": "Tôi sẽ thăm ông bà."
        },
        {
          "speaker": "A",
          "en": "Should I take a jacket?",
          "vi": "Tôi có nên mang áo khoác không?"
        },
        {
          "speaker": "B",
          "en": "Yes, you should. It's cold there.",
          "vi": "Có. Trời lạnh."
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I ___ ___ visit Paris next year. (be going to)",
        "options": [
          "am going to",
          "is going to",
          "are going to",
          "going to"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "You ___ bring your passport. (bắt buộc)",
        "options": [
          "should",
          "must",
          "can",
          "may"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "It's raining. You ___ take an umbrella. (lời khuyên)",
        "options": [
          "must",
          "have to",
          "should",
          "mustn't"
        ],
        "answer": 2
      },
      {
        "type": "vocab",
        "q": "'Hộ chiếu' là?",
        "options": [
          "ticket",
          "passport",
          "suitcase",
          "money"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "'Trời nắng và nóng.'",
        "answer": "It is sunny and hot"
      }
    ],
    "mindmap": {
      "center": "Travel Plans",
      "branches": [
        {
          "label": "Weather",
          "items": [
            "sunny, rainy",
            "cloudy, windy",
            "hot, cold"
          ]
        },
        {
          "label": "Travel items",
          "items": [
            "passport, ticket",
            "suitcase"
          ]
        },
        {
          "label": "Transport",
          "items": [
            "plane, train",
            "bus, taxi"
          ]
        },
        {
          "label": "be going to",
          "items": [
            "plans / intentions",
            "+ V"
          ]
        },
        {
          "label": "must / should",
          "items": [
            "must = phải",
            "should = nên"
          ]
        }
      ]
    },
    "homework": [
      "Viết kế hoạch du lịch 10 câu (be going to)",
      "Viết 5 lời khuyên dùng should",
      "Workbook trang 87-90"
    ]
  },
  {
    "id": 30,
    "unit": "Final",
    "title": "Tổng ôn tập toàn bộ chương trình",
    "subtitle": "Final Review - 30 buổi A1",
    "objectives": [
      "Ôn tập toàn bộ ngữ pháp đã học",
      "Tổng hợp từ vựng theo chủ đề",
      "Kiểm tra 4 kỹ năng nghe/nói/đọc/viết"
    ],
    "review": {
      "title": "Quick warm-up",
      "questions": [
        {
          "q": "Tense for habits?",
          "answer": "Present Simple"
        },
        {
          "q": "Tense for now?",
          "answer": "Present Continuous"
        },
        {
          "q": "Tense for yesterday?",
          "answer": "Past Simple"
        }
      ]
    },
    "vocabulary": [
      {
        "en": "Family",
        "vi": "Gia đình",
        "img": "👨‍👩‍👧"
      },
      {
        "en": "School",
        "vi": "Trường học",
        "img": "🏫"
      },
      {
        "en": "Hobbies",
        "vi": "Sở thích",
        "img": "🎨"
      },
      {
        "en": "Home",
        "vi": "Nhà",
        "img": "🏠"
      },
      {
        "en": "Food",
        "vi": "Đồ ăn",
        "img": "🍔"
      },
      {
        "en": "Technology",
        "vi": "Công nghệ",
        "img": "💻"
      },
      {
        "en": "Shopping",
        "vi": "Mua sắm",
        "img": "🛍️"
      },
      {
        "en": "Sports",
        "vi": "Thể thao",
        "img": "⚽"
      },
      {
        "en": "Jobs",
        "vi": "Nghề nghiệp",
        "img": "💼"
      },
      {
        "en": "Animals",
        "vi": "Động vật",
        "img": "🐅"
      },
      {
        "en": "Nature",
        "vi": "Thiên nhiên",
        "img": "🏞️"
      },
      {
        "en": "Travel",
        "vi": "Du lịch",
        "img": "✈️"
      }
    ],
    "grammar": {
      "title": "All Tenses & Structures Recap",
      "theory": "PRESENT SIMPLE (V/V-s): habits. PRESENT CONTINUOUS (am/is/are+V-ing): now. PAST SIMPLE (V2/V-ed): yesterday. PRESENT PERFECT (have/has+V3): experience. BE GOING TO: plans. CAN/CAN'T: ability. MUST/SHOULD: obligation/advice. COMPARATIVES & SUPERLATIVES.",
      "examples": [
        {
          "en": "I usually read books. (Present Simple)",
          "vi": "Tôi thường đọc sách."
        },
        {
          "en": "I am reading now. (Present Continuous)",
          "vi": "Tôi đang đọc."
        },
        {
          "en": "I read yesterday. (Past Simple)",
          "vi": "Tôi đã đọc hôm qua."
        },
        {
          "en": "I have read this book. (Present Perfect)",
          "vi": "Tôi đã đọc sách này."
        },
        {
          "en": "I am going to read tomorrow. (be going to)",
          "vi": "Tôi sẽ đọc ngày mai."
        }
      ]
    },
    "listening": {
      "title": "Bài nghe tổng hợp",
      "transcript": "Hi! I'm Lan. I'm Vietnamese. I have a small family. We live in Hanoi. Yesterday, I went to the park with my friends. We played football and had ice cream. Tomorrow, I'm going to study for my English test.",
      "questions": [
        {
          "q": "Lan đến từ đâu?",
          "options": [
            "China",
            "Vietnam",
            "Japan"
          ],
          "answer": 1
        },
        {
          "q": "Hôm qua Lan đi đâu?",
          "options": [
            "school",
            "park",
            "cinema"
          ],
          "answer": 1
        },
        {
          "q": "Mai Lan sẽ?",
          "options": [
            "play games",
            "go shopping",
            "study"
          ],
          "answer": 2
        }
      ],
      "translation": ""
    },
    "speaking": {
      "title": "Tự giới thiệu hoàn chỉnh",
      "dialogue": [
        {
          "speaker": "A",
          "en": "Hi! What's your name?",
          "vi": "Tên bạn là gì?"
        },
        {
          "speaker": "B",
          "en": "I'm Mai. I'm 14.",
          "vi": "Tôi là Mai, 14 tuổi."
        },
        {
          "speaker": "A",
          "en": "Where are you from?",
          "vi": "Bạn đến từ đâu?"
        },
        {
          "speaker": "B",
          "en": "I'm from Vietnam. I love English!",
          "vi": "Việt Nam. Tôi rất yêu tiếng Anh!"
        }
      ]
    },
    "minitest": [
      {
        "type": "grammar",
        "q": "I ___ to school every day.",
        "options": [
          "go",
          "going",
          "went",
          "am go"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "Look! She ___ a song. (sing)",
        "options": [
          "sing",
          "sings",
          "is singing",
          "sang"
        ],
        "answer": 2
      },
      {
        "type": "grammar",
        "q": "I ___ to Japan last year.",
        "options": [
          "go",
          "went",
          "have gone",
          "going"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "I ___ ever ___ snow.",
        "options": [
          "have/seen",
          "did/see",
          "am/seen",
          "have/saw"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "She is ___ than me. (tall)",
        "options": [
          "tall",
          "taller",
          "tallest",
          "more tall"
        ],
        "answer": 1
      },
      {
        "type": "grammar",
        "q": "He ___ swim very well. (ability)",
        "options": [
          "can",
          "must",
          "should",
          "is going to"
        ],
        "answer": 0
      },
      {
        "type": "grammar",
        "q": "We ___ visit Paris next month.",
        "options": [
          "go",
          "going to",
          "are going to",
          "went"
        ],
        "answer": 2
      },
      {
        "type": "vocab",
        "q": "Đối lập của 'big'?",
        "options": [
          "small",
          "tall",
          "long",
          "fat"
        ],
        "answer": 0
      },
      {
        "type": "vocab",
        "q": "'Bác sĩ' là?",
        "options": [
          "teacher",
          "doctor",
          "nurse",
          "engineer"
        ],
        "answer": 1
      },
      {
        "type": "writing",
        "q": "Dịch: 'Tôi yêu gia đình tôi.'",
        "answer": "I love my family"
      }
    ],
    "mindmap": {
      "center": "Gateway A1 - Complete!",
      "branches": [
        {
          "label": "Tenses",
          "items": [
            "Present Simple",
            "Present Continuous",
            "Past Simple",
            "Present Perfect",
            "be going to"
          ]
        },
        {
          "label": "Modal verbs",
          "items": [
            "can / can't",
            "must / should",
            "have to"
          ]
        },
        {
          "label": "Comparison",
          "items": [
            "Comparatives -er",
            "Superlatives -est",
            "more / most"
          ]
        },
        {
          "label": "Vocabulary",
          "items": [
            "10 main topics",
            "500+ words"
          ]
        },
        {
          "label": "Skills",
          "items": [
            "Listening",
            "Speaking",
            "Reading",
            "Writing"
          ]
        }
      ]
    },
    "homework": [
      "Viết bài giới thiệu bản thân hoàn chỉnh (15-20 câu) dùng đa dạng thì",
      "Quay video tự giới thiệu 1-2 phút",
      "Làm bài kiểm tra cuối khóa A1",
      "Sẵn sàng cho A2! 🎉"
    ]
  }
];

const EXPANDED_LESSON_SECTION_FLOW = canonicalLessonSections;

const EXPANDED_LESSON_SKIP_SECTIONS = [
  "writing",
  "story",
  "dictation"
];

function applyExpandedLessonTemplate(id, template){
  const lesson = LESSONS.find(item => item.id === id);
  if(!lesson) return;
  Object.assign(lesson, {
    sectionFlow: EXPANDED_LESSON_SECTION_FLOW,
    skipSections: EXPANDED_LESSON_SKIP_SECTIONS
  }, template);
}

const LESSON_8_TEMPLATE = {
  "objectives": [
    "Mô tả thói quen và hoạt động hằng ngày bằng Present Simple",
    "Chia động từ đúng với ngôi thứ ba số ít (thêm -s / -es)",
    "Dùng trạng từ tần suất đúng vị trí (always, usually, often, sometimes, rarely, never)",
    "Hỏi về giờ giấc và thói quen với What time...? / Do/Does...?"
  ],
  "review": {
    "title": "Mini Quiz - Ôn buổi 7 (have/has)",
    "questions": [
      { "q": "My sister ___ curly brown hair.", "answer": "has" },
      { "q": "What ___ she look like?", "answer": "does" },
      { "q": "They ___ oval faces.", "answer": "have" },
      { "q": "Dimples nghĩa là gì?", "answer": "má lúm đồng tiền" }
    ],
    "structures": [
      "She has long black hair.",
      "What does he look like?",
      "They have oval faces.",
      "He has a beard and thick eyebrows."
    ],
    "reviewGames": {
      "title": "Ôn tập Buổi 7 - Appearance & Have/Has",
      "intro": "Làm 2 thử thách để ôn từ vựng mô tả ngoại hình và cấu trúc have/has trước khi vào Present Simple.",
      "vocabulary": [
        { "en": "curly hair", "vi": "tóc xoăn", "img": "💇", "ipa": "/ˈkɜːrli her/", "options": ["tóc thẳng", "tóc xoăn", "tóc ngắn", "tóc vàng"], "answer": 1 },
        { "en": "freckles", "vi": "tàn nhang", "img": "🙂", "ipa": "/ˈfrekəlz/", "options": ["má lúm", "nốt ruồi", "tàn nhang", "ria mép"], "answer": 2 },
        { "en": "beard", "vi": "râu quai nón", "img": "🧔", "ipa": "/bɪrd/", "options": ["râu quai nón", "kính", "tóc mái", "lông mày"], "answer": 0 },
        { "en": "mustache", "vi": "ria mép", "img": "👨", "ipa": "/ˈmʌstæʃ/", "options": ["nốt ruồi", "ria mép", "tàn nhang", "kính"], "answer": 1 },
        { "en": "thin", "vi": "gầy", "img": "📏", "ipa": "/θɪn/", "options": ["cao", "thấp", "gầy", "béo"], "answer": 2 },
        { "en": "average height", "vi": "chiều cao trung bình", "img": "📐", "ipa": "/ˈævərɪdʒ haɪt/", "options": ["rất cao", "chiều cao trung bình", "rất thấp", "hơi béo"], "answer": 1 },
        { "en": "friendly", "vi": "thân thiện", "img": "🤝", "ipa": "/ˈfrendli/", "options": ["nhút nhát", "buồn chán", "thân thiện", "lười"], "answer": 2 },
        { "en": "hard-working", "vi": "chăm chỉ", "img": "💪", "ipa": "/ˌhɑːrd ˈwɜːrkɪŋ/", "options": ["chăm chỉ", "hài hước", "thông minh", "lười"], "answer": 0 },
        { "en": "What does she look like?", "vi": "Cô ấy trông như thế nào?", "img": "❓", "ipa": "", "options": ["Cô ấy thích gì?", "Cô ấy ở đâu?", "Cô ấy trông như thế nào?", "Cô ấy làm gì?"], "answer": 2 },
        { "en": "She has long black hair.", "vi": "Cô ấy có mái tóc đen dài.", "img": "💇", "ipa": "", "options": ["Cô ấy có tóc đen dài.", "Cô ấy thấp và gầy.", "Cô ấy có mắt xanh.", "Cô ấy thân thiện."], "answer": 0 }
      ],
      "quizBomb": {
        "title": "Quiz Bomb Review - Appearance",
        "instruction": "Trả lời nhanh 10 câu ôn tập Buổi 7 trong 5 giây mỗi câu.",
        "questions": [
          { "q": "She ___ curly hair.", "options": ["have", "has", "is", "are"], "answer": 1 },
          { "q": "They ___ oval faces.", "options": ["has", "is", "have", "does"], "answer": 2 },
          { "q": "What ___ he look like?", "options": ["do", "does", "is", "has"], "answer": 1 },
          { "q": "\"freckles\" nghĩa là gì?", "options": ["tàn nhang", "ria mép", "râu", "kính"], "answer": 0 },
          { "q": "He ___ a beard.", "options": ["is", "are", "have", "has"], "answer": 3 },
          { "q": "Chọn thứ tự đúng:", "options": ["black long hair", "long black hair", "hair long black", "black hair long"], "answer": 1 },
          { "q": "\"hard-working\" nghĩa là gì?", "options": ["lười", "chăm chỉ", "buồn chán", "nhút nhát"], "answer": 1 },
          { "q": "She ___ friendly.", "options": ["has", "have", "is", "does"], "answer": 2 },
          { "q": "\"average height\" nghĩa là gì?", "options": ["rất thấp", "rất cao", "chiều cao trung bình", "thừa cân"], "answer": 2 },
          { "q": "Does he wear glasses? - Yes, he ___.", "options": ["do", "does", "has", "is"], "answer": 1 }
        ]
      }
    },
    "summary": "Buổi trước chúng ta đã biết mô tả khuôn mặt người khác. Hôm nay, chúng ta sẽ nói về một ngày của họ: <b>thức dậy lúc mấy giờ</b>, <b>làm gì mỗi sáng</b>, và <b>có thói quen gì</b>."
  },
  "video": {
    "title": "Talking about daily routines in English (present simple)",
    "url": "https://www.youtube.com/watch?v=kePBvNotYy4",
    "description": "Video dạy cách kể lịch sinh hoạt hằng ngày bằng Present Simple qua các hoạt động quen thuộc: wake up, eat breakfast, brush teeth, take a shower, leave home, work, have lunch và go to bed.",
    "duration": "2 phút",
    "sceneSummary": "daily routines, present simple, frequency adverbs",
    "scenes": [
      { "time": 0, "label": "Giới thiệu Present Simple: thói quen hằng ngày" },
      { "time": 120, "label": "Từ vựng hoạt động sáng/chiều/tối" },
      { "time": 300, "label": "Trạng từ tần suất và vị trí trong câu" }
    ],
    "questions": [
      {
        "id": 1,
        "question": "Present Simple thường dùng để diễn tả điều gì?",
        "options": ["Hành động đang xảy ra ngay lúc này", "Thói quen và việc xảy ra thường xuyên", "Hành động đã hoàn thành trong quá khứ", "Kế hoạch tương lai"],
        "answer": 1
      },
      {
        "id": 2,
        "question": "She ___ up at 6 every morning.",
        "options": ["wake", "wakes up", "wakes", "is waking"],
        "answer": 2
      },
      {
        "id": 3,
        "question": "Trạng từ tần suất nào có tần suất cao nhất?",
        "options": ["sometimes", "often", "usually", "always"],
        "answer": 3
      },
      {
        "id": 4,
        "question": "He ___ breakfast at 7 a.m.",
        "options": ["have", "has", "is having", "are have"],
        "answer": 1
      },
      {
        "id": 5,
        "question": "Trạng từ tần suất thường đứng ở vị trí nào trong câu?",
        "options": ["Cuối câu", "Trước động từ chính / sau động từ be", "Đầu câu, sau dấu phẩy", "Bất kỳ vị trí nào"],
        "answer": 1
      }
    ]
  },
  "vocabGroups": {
    "introVideo": "Daily routines (15 từ)",
    "dialogueVideo": "Time expressions & frequency adverbs (13 từ)"
  },
  "matchAll": true,
  "listenPickAll": true,
  "vocabulary": [
    { "en": "wake up", "vi": "thức dậy", "ipa": "/weɪk ʌp/", "img": "⏰", "group": "introVideo" },
    { "en": "get up", "vi": "ra khỏi giường", "ipa": "/ɡet ʌp/", "img": "🛏️", "group": "introVideo" },
    { "en": "brush teeth", "vi": "đánh răng", "ipa": "/brʌʃ tiːθ/", "img": "🪥", "group": "introVideo" },
    { "en": "take a shower", "vi": "tắm", "ipa": "/teɪk ə ˈʃaʊər/", "img": "🚿", "group": "introVideo" },
    { "en": "have breakfast", "vi": "ăn sáng", "ipa": "/hæv ˈbrekfəst/", "img": "🍳", "group": "introVideo" },
    { "en": "go to work / school", "vi": "đi làm / đi học", "ipa": "/ɡoʊ tə wɜːrk/", "img": "🏢", "group": "introVideo" },
    { "en": "have lunch", "vi": "ăn trưa", "ipa": "/hæv lʌntʃ/", "img": "🍱", "group": "introVideo" },
    { "en": "come home", "vi": "về nhà", "ipa": "/kʌm hoʊm/", "img": "🏠", "group": "introVideo" },
    { "en": "cook dinner", "vi": "nấu bữa tối", "ipa": "/kʊk ˈdɪnər/", "img": "🍲", "group": "introVideo" },
    { "en": "watch TV", "vi": "xem TV", "ipa": "/wɒtʃ ˌtiːˈviː/", "img": "📺", "group": "introVideo" },
    { "en": "read a book", "vi": "đọc sách", "ipa": "/riːd ə bʊk/", "img": "📖", "group": "introVideo" },
    { "en": "exercise", "vi": "tập thể dục", "ipa": "/ˈeksərsaɪz/", "img": "🏃", "group": "introVideo" },
    { "en": "do homework", "vi": "làm bài tập về nhà", "ipa": "/duː ˈhoʊmwɜːrk/", "img": "📝", "group": "introVideo" },
    { "en": "check phone", "vi": "kiểm tra điện thoại", "ipa": "/tʃek foʊn/", "img": "📱", "group": "introVideo" },
    { "en": "go to bed", "vi": "đi ngủ", "ipa": "/ɡoʊ tə bed/", "img": "😴", "group": "introVideo" },
    { "en": "always", "vi": "luôn luôn (100%)", "ipa": "/ˈɔːlweɪz/", "img": "💯", "group": "dialogueVideo" },
    { "en": "usually", "vi": "thường thường (80%)", "ipa": "/ˈjuːʒuəli/", "img": "🔵", "group": "dialogueVideo" },
    { "en": "often", "vi": "thường xuyên (60%)", "ipa": "/ˈɒfən/", "img": "🟢", "group": "dialogueVideo" },
    { "en": "sometimes", "vi": "đôi khi (40%)", "ipa": "/ˈsʌmtaɪmz/", "img": "🟡", "group": "dialogueVideo" },
    { "en": "rarely / seldom", "vi": "hiếm khi (20%)", "ipa": "/ˈreərli/", "img": "🟠", "group": "dialogueVideo" },
    { "en": "never", "vi": "không bao giờ (0%)", "ipa": "/ˈnevər/", "img": "❌", "group": "dialogueVideo" },
    { "en": "every day", "vi": "mỗi ngày", "ipa": "/ˈevri deɪ/", "img": "📅", "group": "dialogueVideo" },
    { "en": "every morning", "vi": "mỗi buổi sáng", "ipa": "/ˈevri ˈmɔːrnɪŋ/", "img": "🌄", "group": "dialogueVideo" },
    { "en": "in the morning / afternoon / evening", "vi": "vào buổi sáng / chiều / tối", "ipa": "/ɪn ðə ˈmɔːrnɪŋ/", "img": "🌅🌤️🌆", "group": "dialogueVideo" },
    { "en": "at night", "vi": "vào ban đêm", "ipa": "/æt naɪt/", "img": "🌙", "group": "dialogueVideo" },
    { "en": "at + specific time", "vi": "lúc ... giờ (at 6, at 7 a.m.)", "ipa": "/æt .../", "img": "🕖", "group": "dialogueVideo" },
    { "en": "on weekdays", "vi": "vào các ngày trong tuần", "ipa": "/ɒn ˈwiːkdeɪz/", "img": "📆", "group": "dialogueVideo" },
    { "en": "on weekends", "vi": "vào cuối tuần", "ipa": "/ɒn ˈwiːkendz/", "img": "🎉", "group": "dialogueVideo" }
  ],
  "grammar": {
    "title": "4 Cấu Trúc Chính - Present Simple & Daily Routines",
    "intro": "Present Simple dùng để nói về thói quen và hoạt động lặp lại hằng ngày.",
    "formula": "S + V(s/es) | Adv + V / be + Adv | Do/Does + S + V? | What time/How often + do/does + S + V?",
    "structures": [
      {
        "num": 1,
        "pattern": "S + V(s/es)",
        "vi": "Câu khẳng định với hiện tại đơn",
        "style": "He/She/It thêm -s hoặc -es",
        "example": "She wakes up at 7.",
        "exampleVi": "Cô ấy thức dậy lúc 7 giờ.",
        "context": "have → has; go → goes; watch → watches; study → studies."
      },
      {
        "num": 2,
        "pattern": "Adv + V / be + Adv",
        "vi": "Vị trí trạng từ tần suất",
        "style": "Trước động từ chính, sau to be",
        "example": "I always brush my teeth in the morning.",
        "exampleVi": "Tôi luôn đánh răng vào buổi sáng.",
        "context": "She is usually on time."
      },
      {
        "num": 3,
        "pattern": "S + don't/doesn't + V | Do/Does + S + V?",
        "vi": "Phủ định và câu hỏi Yes/No",
        "style": "Không thêm -s sau doesn't",
        "example": "Does she exercise every day?",
        "exampleVi": "Cô ấy tập thể dục mỗi ngày không?",
        "context": "She doesn't watch TV at night."
      },
      {
        "num": 4,
        "pattern": "What time / How often + do/does + S + V?",
        "vi": "Hỏi giờ và tần suất",
        "style": "Dùng do/does theo chủ ngữ",
        "example": "How often does he exercise?",
        "exampleVi": "Anh ấy tập thể dục bao lâu một lần?",
        "context": "What time do you have breakfast?"
      }
    ],
    "commonQA": [
      { "q": "What time do you usually wake up?", "a": "I usually wake up at 6:30 in the morning." },
      { "q": "Do you have breakfast every day?", "a": "Yes, I always have breakfast. I never skip it!" },
      { "q": "How often does she exercise?", "a": "She sometimes exercises on weekends." },
      { "q": "Does your father cook dinner at home?", "a": "No, he doesn't. My mother usually cooks dinner." }
    ]
  },
  "listening": {
    "title": "Nghe trả lời - Present Simple",
    "transcript": "Listen and choose the correct answer.",
    "translation": "Nghe từng câu có chỗ trống và chọn đáp án đúng.",
    "audio": "Listen and choose the correct answer.",
    "questions": [
      { "q": "She ___ up at 6 every morning.", "options": ["wake", "wakes"], "answer": 1 },
      { "q": "I always ___ breakfast before going to work.", "options": ["have", "has"], "answer": 0 },
      { "q": "He ___ watch TV at night.", "options": ["don't", "doesn't"], "answer": 1 },
      { "q": "___ she exercise every day?", "options": ["Do", "Does"], "answer": 1 },
      { "q": "My father ___ dinner at 7 p.m.", "options": ["cook", "cooks"], "answer": 1 },
      { "q": "They ___ go to school on weekends.", "options": ["don't", "doesn't"], "answer": 0 },
      { "q": "___ you brush your teeth every morning?", "options": ["Do", "Does"], "answer": 0 },
      { "q": "She ___ always has breakfast — never skips it.", "options": ["usually", "always"], "answer": 1 },
      { "q": "He ___ to work by motorbike every day.", "options": ["go", "goes"], "answer": 1 },
      { "q": "I ___ read a book before bed.", "options": ["often", "has"], "answer": 0 },
      { "q": "My sister ___ home at 6 p.m.", "options": ["come", "comes"], "answer": 1 },
      { "q": "___ your brother exercise in the morning?", "options": ["Do", "Does"], "answer": 1 },
      { "q": "She ___ check her phone at night.", "options": ["don't", "doesn't"], "answer": 1 },
      { "q": "My mother ___ TV in the evening.", "options": ["watch", "watches"], "answer": 1 },
      { "q": "She ___ English every night.", "options": ["study", "studies"], "answer": 1 }
    ]
  },
  "translation": {
    "title": "LUYỆN DỊCH: VIỆT → ANH (20 CÂU)",
    "instruction": "Dịch câu tiếng Việt sang tiếng Anh. Chú ý hiện tại đơn, do/does, trạng từ tần suất.",
    "sentences": [
      { "vi": "Tôi chuẩn bị cặp sách lúc bảy giờ mỗi sáng.", "en": "I pack my bag at seven every morning." },
      { "vi": "Cô ấy rời khỏi nhà lúc bảy giờ ba mươi.", "en": "She leaves home at seven thirty." },
      { "vi": "Anh trai tôi đi xe buýt đến trường vào các ngày trong tuần.", "en": "My brother takes the bus to school on weekdays." },
      { "vi": "Chúng tôi ăn trưa ở trường vào buổi trưa.", "en": "We have lunch at school at noon." },
      { "vi": "Bố tôi uống cà phê trước khi đi làm.", "en": "My father drinks coffee before work." },
      { "vi": "Mẹ tôi không đọc báo vào buổi sáng.", "en": "My mother doesn't read the newspaper in the morning." },
      { "vi": "Bạn có dọn phòng vào Chủ Nhật không?", "en": "Do you clean your room on Sundays?" },
      { "vi": "Cô ấy có nghe nhạc sau giờ học không?", "en": "Does she listen to music after school?" },
      { "vi": "Họ thường đi bộ đến công viên vào buổi chiều.", "en": "They often walk to the park in the afternoon." },
      { "vi": "Tôi hiếm khi dùng máy tính trước bữa sáng.", "en": "I rarely use the computer before breakfast." },
      { "vi": "Anh ấy luôn làm bài tập trước bữa tối.", "en": "He always does his homework before dinner." },
      { "vi": "Chị gái tôi thỉnh thoảng gọi điện cho bạn vào buổi tối.", "en": "My sister sometimes calls her friends in the evening." },
      { "vi": "Bạn thường đến lớp lúc mấy giờ?", "en": "What time do you usually arrive at class?" },
      { "vi": "Anh ấy đi siêu thị bao lâu một lần?", "en": "How often does he go to the supermarket?" },
      { "vi": "Cô ấy không mang bữa trưa đến văn phòng.", "en": "She doesn't bring lunch to the office." },
      { "vi": "Chúng tôi không làm việc sau chín giờ tối.", "en": "We don't work after nine p.m." },
      { "vi": "Em trai bạn có chơi bóng rổ sau giờ học không?", "en": "Does your younger brother play basketball after school?" },
      { "vi": "Tôi thường viết nhật ký trước khi đi ngủ.", "en": "I usually write in my diary before bed." },
      { "vi": "Cô ấy thay quần áo sau khi về nhà.", "en": "She changes clothes after she gets home." },
      { "vi": "Gia đình tôi ăn tối cùng nhau mỗi tối.", "en": "My family has dinner together every evening." }
    ]
  },
  "dialogueVideo": {
    "title": "Video hội thoại: Thói quen hằng ngày",
    "label": "Daily Routine Conversation",
    "url": "https://www.youtube.com/watch?v=3Qy6-4S88SA",
    "description": "Hội thoại hỏi đáp Present Simple về thói quen hằng ngày: What time do you wake up?, Do you have breakfast?, What do you do in the evenings?",
    "transcript": [
      { "speaker": "A", "en": "What time do you **usually** **wake up**?", "vi": "Bạn thường thức dậy lúc mấy giờ?" },
      { "speaker": "B", "en": "I **usually wake up** at **6:30 in the morning**.", "vi": "Tôi thường thức dậy lúc 6:30 sáng." },
      { "speaker": "A", "en": "Do you **have breakfast** **every day**?", "vi": "Bạn có ăn sáng mỗi ngày không?" },
      { "speaker": "B", "en": "Yes, I **always have breakfast**. I **never skip** it!", "vi": "Có, tôi luôn ăn sáng. Tôi không bao giờ bỏ bữa!" },
      { "speaker": "A", "en": "What does your **morning routine** look like?", "vi": "Thói quen buổi sáng của bạn như thế nào?" },
      { "speaker": "B", "en": "I **wake up**, **take a shower**, **have breakfast**, and then **go to work**.", "vi": "Tôi thức dậy, tắm, ăn sáng, rồi đi làm." },
      { "speaker": "A", "en": "Does your wife follow the same **routine**?", "vi": "Vợ bạn có lịch sinh hoạt giống bạn không?" },
      { "speaker": "B", "en": "Not really. She **wakes up later** and **sometimes skips breakfast**.", "vi": "Không hẳn. Cô ấy thức dậy muộn hơn và đôi khi bỏ bữa sáng." }
    ],
    "listenChoose": [
      { "q": "What time does the man usually wake up?", "options": ["6:30 a.m.", "7:00 a.m.", "6:00 a.m.", "7:30 a.m."], "answer": 0 },
      { "q": "Does the man skip breakfast?", "options": ["Yes, sometimes.", "No, he always has breakfast.", "Only on weekends.", "We don't know."], "answer": 1 },
      { "q": "What is NOT in the man's morning routine?", "options": ["take a shower", "have breakfast", "read a book", "go to work"], "answer": 2 },
      { "q": "What is different about the man's wife?", "options": ["She wakes up earlier.", "She never eats breakfast.", "She wakes up later and sometimes skips breakfast.", "She goes to work by bus."], "answer": 2 }
    ],
    "sentenceOrder": [
      {
        "words": [
          "What time do you usually wake up?",
          "I usually wake up at 6:30 in the morning.",
          "Do you have breakfast every day?",
          "Yes, I always have breakfast. I never skip it!"
        ],
        "answer": "What time do you usually wake up? I usually wake up at 6:30 in the morning. Do you have breakfast every day? Yes, I always have breakfast. I never skip it!"
      }
    ],
    "listenPickLine": [
      { "prompt": "Do you have breakfast every day?", "options": [{ "text": "No, I don't.", "img": "❌" }, { "text": "Yes, I always have breakfast.", "img": "🍳" }, { "text": "She has breakfast at 8.", "img": "🕗" }], "answer": 1 },
      { "prompt": "Does your wife follow the same routine?", "options": [{ "text": "Yes, she does.", "img": "✅" }, { "text": "She wakes up early.", "img": "🌅" }, { "text": "Not really. She wakes up later.", "img": "⏰" }], "answer": 2 },
      { "prompt": "I never skip breakfast! What does skip mean?", "options": [{ "text": "ăn", "img": "🍽️" }, { "text": "nấu", "img": "🍳" }, { "text": "bỏ qua", "img": "⏭️" }], "answer": 2 },
      { "prompt": "What time do you usually wake up?", "options": [{ "text": "Thói quen buổi tối", "img": "🌙" }, { "text": "Giờ thức dậy thường ngày", "img": "⏰" }, { "text": "Công việc hằng ngày", "img": "🏢" }], "answer": 1 }
    ],
    "fillConversation": [
      {
        "lines": [
          { "speaker": "Alex", "text": "What time do you [[usually]] wake up?" },
          { "speaker": "Mia", "text": "I wake up at 6:30 [[every morning]]." },
          { "speaker": "Alex", "text": "[[Does]] your wife wake up at the same time?" },
          { "speaker": "Mia", "text": "No, she [[doesn't]] — she wakes up later." }
        ],
        "wordBank": ["usually", "every morning", "Does", "doesn't"]
      },
      {
        "lines": [
          { "speaker": "Alex", "text": "Do you [[have breakfast]] every day?" },
          { "speaker": "Mia", "text": "Yes, I [[always]] have breakfast." },
          { "speaker": "Alex", "text": "Do you [[skip]] it?" },
          { "speaker": "Mia", "text": "No, I [[never]] skip it!" }
        ],
        "wordBank": ["have breakfast", "always", "skip", "never"]
      },
      {
        "lines": [
          { "speaker": "Alex", "text": "What does your morning routine [[look like]]?" },
          { "speaker": "Mia", "text": "I wake up and [[take a shower]]." },
          { "speaker": "Alex", "text": "Do you [[go to work]] after breakfast?" },
          { "speaker": "Mia", "text": "Yes, I [[do]]." }
        ],
        "wordBank": ["look like", "take a shower", "go to work", "do"]
      }
    ]
  },
  "speaking": {
    "title": "Luyện nói (AI) - Daily Routines",
    "turns": [
      {
        "id": 1,
        "ai": { "textEn": "What do you usually do in the morning?", "textVn": "Bạn thường làm gì vào buổi sáng?", "audioUrl": "What do you usually do in the morning?" },
        "user": { "formula": "I usually/always + [activity] + [time].", "sampleEn": "I usually wake up at 6, take a shower, and have breakfast at 7.", "sampleVn": "Tôi thường dậy lúc 6, tắm và ăn sáng lúc 7.", "sampleAudioUrl": "I usually wake up at 6, take a shower, and have breakfast at 7." }
      },
      {
        "id": 2,
        "ai": { "textEn": "Does your friend or family member have a fixed daily routine?", "textVn": "Bạn bè hoặc người thân của bạn có lịch sinh hoạt cố định không?", "audioUrl": "Does your friend or family member have a fixed daily routine?" },
        "user": { "formula": "Yes, he/she + V-s/es every day. He/She always/usually...", "sampleEn": "Yes, my sister has a fixed routine. She wakes up at 6, goes to work at 7, and comes home at 6 p.m.", "sampleVn": "Có. Chị tôi có lịch cố định. Chị dậy lúc 6, đi làm lúc 7 và về nhà lúc 6 giờ tối.", "sampleAudioUrl": "Yes, my sister has a fixed routine. She wakes up at 6, goes to work at 7, and comes home at 6 p.m." }
      },
      {
        "id": 3,
        "ai": { "textEn": "What do you do in the evening after work or school?", "textVn": "Bạn làm gì vào buổi tối sau khi đi làm hoặc đi học?", "audioUrl": "What do you do in the evening after work or school?" },
        "user": { "formula": "In the evening, I + [activity]. I sometimes/usually...", "sampleEn": "In the evening, I usually cook dinner and watch TV. I sometimes read a book before bed.", "sampleVn": "Buổi tối, tôi thường nấu ăn và xem TV. Thỉnh thoảng tôi đọc sách trước khi ngủ.", "sampleAudioUrl": "In the evening, I usually cook dinner and watch TV. I sometimes read a book before bed." }
      },
      {
        "id": 4,
        "ai": { "textEn": "What time do you go to bed? How often do you exercise?", "textVn": "Bạn đi ngủ lúc mấy giờ? Bạn tập thể dục thường xuyên không?", "audioUrl": "What time do you go to bed? How often do you exercise?" },
        "user": { "formula": "I go to bed at [time]. I [always/sometimes/never] exercise + [time].", "sampleEn": "I go to bed at 11 p.m. I sometimes exercise in the morning, but I never exercise at night.", "sampleVn": "Tôi đi ngủ lúc 11 giờ đêm. Tôi thỉnh thoảng tập thể dục buổi sáng, nhưng tôi không bao giờ tập thể dục vào ban đêm.", "sampleAudioUrl": "I go to bed at 11 p.m. I sometimes exercise in the morning, but I never exercise at night." }
      },
      {
        "id": 5,
        "ai": { "textEn": "Describe your full daily routine from morning to night!", "textVn": "Hãy mô tả lịch sinh hoạt cả ngày của bạn!", "audioUrl": "Describe your full daily routine from morning to night!" },
        "user": { "formula": "Use 4-5 sentences, each with one activity and time.", "sampleEn": "I wake up at 6:30 every morning. I always take a shower and have breakfast. Then I go to work at 7:30. In the evening, I usually cook dinner and watch TV. I go to bed at 11.", "sampleVn": "Tôi thức dậy lúc 6:30 mỗi sáng. Tôi luôn tắm và ăn sáng. Sau đó tôi đi làm lúc 7:30. Buổi tối, tôi thường nấu ăn và xem TV. Tôi đi ngủ lúc 11.", "sampleAudioUrl": "I wake up at 6:30 every morning. I always take a shower and have breakfast. Then I go to work at 7:30. In the evening, I usually cook dinner and watch TV. I go to bed at 11." }
      }
    ]
  },
  "minitest": [
    { "type": "grammar", "q": "She ___ up at 6 every morning.", "options": ["wake", "wakes", "is waking", "waked"], "answer": 1 },
    { "type": "grammar", "q": "Chọn câu đúng ngữ pháp:", "options": ["She don't go to school on Sunday.", "She doesn't go to school on Sunday.", "She not go to school on Sunday.", "She doesn't goes to school on Sunday."], "answer": 1 },
    { "type": "grammar", "q": "He ___ drinks coffee — he doesn't like it at all.", "options": ["always", "usually", "never", "often"], "answer": 2 },
    { "type": "grammar", "q": "My father ___ TV in the evening.", "options": ["watch", "is watch", "watches", "watchs"], "answer": 2 },
    { "type": "grammar", "q": "Do you cook dinner every day? (phủ định)", "options": ["No, I doesn't.", "No, she doesn't.", "No, I don't.", "No, I not do."], "answer": 2 },
    { "type": "vocab", "q": "'skip breakfast' nghĩa là gì?", "options": ["ăn sáng", "bỏ bữa sáng", "nấu bữa sáng", "mua bữa sáng"], "answer": 1 },
    { "type": "vocab", "q": "'rarely' có nghĩa/tần suất gần đúng là gì?", "options": ["luôn luôn (100%)", "thường thường (80%)", "hiếm khi (20%)", "không bao giờ (0%)"], "answer": 2 },
    { "type": "translation", "q": "Dịch: Anh ấy thường đi làm lúc 8 giờ sáng.", "options": ["He usually go to work at 8 a.m.", "He usually goes to work at 8 a.m.", "He go to work usually at 8 a.m.", "He always goes to work at 8 a.m."], "answer": 1 },
    { "type": "writing", "q": "Dịch: Cô ấy không bao giờ kiểm tra điện thoại vào ban đêm.", "answer": "She never checks her phone at night." },
    { "type": "writing", "q": "Chia động từ: My sister ___ (study) English every night.", "answer": "studies" }
  ],
  "mindmap": {
    "type": "structured",
    "center": "DAILY ROUTINES & PRESENT SIMPLE",
    "branches": [
      { "icon": "🌅", "label": "MORNING ROUTINE", "sub": "Buổi sáng", "items": ["wake up", "get up", "brush teeth", "take a shower", "have breakfast", "go to work"] },
      { "icon": "📐", "label": "PRESENT SIMPLE", "sub": "Khẳng định", "items": ["S + V-s/es", "have → has", "go → goes", "watch → watches", "study → studies"] },
      { "icon": "📊", "label": "FREQUENCY ADVERBS", "sub": "Tần suất", "items": ["always → usually → often", "sometimes → rarely → never"] },
      { "icon": "🕐", "label": "TIME EXPRESSIONS", "sub": "Cụm thời gian", "items": ["every day", "in the morning/evening", "at night", "on weekdays/on weekends", "at + time"] },
      { "icon": "❓", "label": "QUESTIONS", "sub": "Câu hỏi", "items": ["What time do/does...?", "How often do/does...?", "Do/Does + S + V?", "Yes/No short answers"] }
    ]
  },
  "homeworkRich": {
    "title": "BÀI TẬP VỀ NHÀ - BUỔI 8: DAILY ROUTINES",
    "submit": "Nộp qua nhóm lớp",
    "deadline": "Trước buổi học tiếp theo",
    "tasks": [
      {
        "icon": "✏️",
        "title": "BÀI TẬP 1: VIẾT - MY DAILY ROUTINE",
        "badge": "Bắt buộc",
        "desc": "Viết 1 đoạn văn ngắn (6-8 câu) mô tả lịch sinh hoạt ngày thường.",
        "items": [
          "Dùng Present Simple với chủ ngữ I",
          "Ít nhất 3 trạng từ tần suất khác nhau",
          "Ít nhất 1 câu phủ định (don't)",
          "Ít nhất 1 câu có giờ cụ thể (at 6, at 7 a.m.)"
        ]
      },
      {
        "icon": "🎙️",
        "title": "BÀI TẬP 2: NÓI / GHI ÂM - INTERVIEW",
        "badge": "Khuyến khích",
        "desc": "Hỏi 1 người thân/bạn bè về thói quen hằng ngày và ghi lại câu hỏi + trả lời bằng tiếng Anh.",
        "items": [
          "Gợi ý 5 câu hỏi: What time do you wake up? Do you always have breakfast? What do you do in the evening? How often do you exercise? What time do you go to bed?",
          "Viết 3-4 câu tóm tắt thói quen của người đó bằng ngôi thứ ba (He/She + V-s/es)"
        ],
        "note": "Khuyến khích ghi âm để luyện phát âm."
      }
    ]
  },
  "homework": [
    "✏️ Viết 1 đoạn văn 6-8 câu về daily routine (có trạng từ tần suất, câu phủ định, và mốc giờ).",
    "🎙️ Phỏng vấn 1 người thân/bạn bè về thói quen và viết 3-4 câu tóm tắt bằng ngôi thứ ba."
  ]
};

const LESSON_9_TEMPLATE = {
  "objectives": [
    "Nói về hoạt động thời gian rảnh và sở thích cá nhân",
    "Dùng hiện tại đơn dạng phủ định với don't / doesn't",
    "Đặt câu hỏi Do / Does, Wh-questions và trả lời ngắn Yes / No",
    "Luyện nghe, nói, dịch câu về free time activities theo chuẩn A1"
  ],
  "review": {
    "title": "Ôn bài cũ - Daily routines & Present Simple",
    "questions": [
      {
        "q": "She ___ up at 6 every morning.",
        "answer": "wakes"
      },
      {
        "q": "He ___ watch TV at night.",
        "answer": "doesn't"
      },
      {
        "q": "___ she exercise every day?",
        "answer": "Does"
      },
      {
        "q": "I ___ read a book before bed.",
        "answer": "usually"
      }
    ],
    "vocabGame": {
      "title": "Game 1: Nghe chọn từ - từ vựng Buổi 8",
      "items": [
        {
          "prompt": "wake up",
          "answer": "thức dậy"
        },
        {
          "prompt": "always",
          "answer": "luôn luôn"
        },
        {
          "prompt": "brush teeth",
          "answer": "đánh răng"
        },
        {
          "prompt": "on weekends",
          "answer": "vào cuối tuần"
        },
        {
          "prompt": "have breakfast",
          "answer": "ăn sáng"
        },
        {
          "prompt": "never",
          "answer": "không bao giờ"
        },
        {
          "prompt": "go to work",
          "answer": "đi làm"
        },
        {
          "prompt": "usually",
          "answer": "thường thường"
        },
        {
          "prompt": "come home",
          "answer": "về nhà"
        },
        {
          "prompt": "exercise",
          "answer": "tập thể dục"
        }
      ]
    },
    "structures": [
      "She wakes up at 6 every morning.",
      "He doesn't watch TV at night.",
      "Does she exercise every day? - Yes, she does.",
      "I usually read a book before bed."
    ],
    "reviewGames": {
      "title": "Ôn tập Buổi 8 - Daily Routines & Present Simple",
      "intro": "Làm 2 thử thách để ôn từ vựng thói quen hằng ngày, trạng từ tần suất và Present Simple trước khi học sở thích.",
      "vocabulary": [
        { "en": "wake up", "vi": "thức dậy", "img": "⏰", "ipa": "/weɪk ʌp/", "options": ["đi ngủ", "thức dậy", "đi học", "về nhà"], "answer": 1 },
        { "en": "brush teeth", "vi": "đánh răng", "img": "🪥", "ipa": "/brʌʃ tiːθ/", "options": ["rửa mặt", "tắm", "đánh răng", "ăn sáng"], "answer": 2 },
        { "en": "have breakfast", "vi": "ăn sáng", "img": "🍳", "ipa": "/hæv ˈbrekfəst/", "options": ["ăn tối", "ăn trưa", "nấu ăn", "ăn sáng"], "answer": 3 },
        { "en": "go to work", "vi": "đi làm", "img": "🏢", "ipa": "/ɡoʊ tə wɜːrk/", "options": ["đi làm", "về nhà", "đi ngủ", "đọc sách"], "answer": 0 },
        { "en": "come home", "vi": "về nhà", "img": "🏠", "ipa": "/kʌm hoʊm/", "options": ["nấu ăn", "về nhà", "đi làm", "tập thể dục"], "answer": 1 },
        { "en": "go to bed", "vi": "đi ngủ", "img": "😴", "ipa": "/ɡoʊ tə bed/", "options": ["thức dậy", "ăn sáng", "đi ngủ", "xem TV"], "answer": 2 },
        { "en": "always", "vi": "luôn luôn", "img": "💯", "ipa": "/ˈɔːlweɪz/", "options": ["đôi khi", "hiếm khi", "không bao giờ", "luôn luôn"], "answer": 3 },
        { "en": "usually", "vi": "thường thường", "img": "🔵", "ipa": "/ˈjuːʒuəli/", "options": ["thường thường", "không bao giờ", "vào ban đêm", "cuối tuần"], "answer": 0 },
        { "en": "never", "vi": "không bao giờ", "img": "❌", "ipa": "/ˈnevər/", "options": ["luôn luôn", "thường xuyên", "không bao giờ", "mỗi ngày"], "answer": 2 },
        { "en": "on weekends", "vi": "vào cuối tuần", "img": "🎉", "ipa": "/ɒn ˈwiːkendz/", "options": ["vào buổi sáng", "vào cuối tuần", "vào ban đêm", "mỗi ngày"], "answer": 1 }
      ],
      "quizBomb": {
        "title": "Quiz Bomb Review - Daily Routines",
        "instruction": "Trả lời nhanh 10 câu ôn tập Buổi 8 trong 5 giây mỗi câu.",
        "questions": [
          { "q": "She ___ up at 6 every morning.", "options": ["wake", "wakes", "waking", "waked"], "answer": 1 },
          { "q": "He ___ TV in the evening.", "options": ["watch", "watchs", "watches", "watching"], "answer": 2 },
          { "q": "My sister ___ English every night.", "options": ["study", "studies", "studys", "studying"], "answer": 1 },
          { "q": "He ___ have breakfast on weekdays.", "options": ["don't", "doesn't", "isn't", "hasn't"], "answer": 1 },
          { "q": "___ you brush your teeth every morning?", "options": ["Do", "Does", "Are", "Is"], "answer": 0 },
          { "q": "___ she exercise every day?", "options": ["Do", "Does", "Is", "Has"], "answer": 1 },
          { "q": "\"rarely\" nghĩa là gì?", "options": ["luôn luôn", "thường thường", "hiếm khi", "không bao giờ"], "answer": 2 },
          { "q": "\"skip breakfast\" nghĩa là gì?", "options": ["ăn sáng", "bỏ bữa sáng", "nấu bữa sáng", "mua bữa sáng"], "answer": 1 },
          { "q": "I ___ read a book before bed.", "options": ["often", "has", "does", "am"], "answer": 0 },
          { "q": "Does your father wake up early? - Yes, he ___.", "options": ["do", "does", "is", "has"], "answer": 1 }
        ]
      }
    },
    "summary": "Buổi này mở rộng Present Simple sang <b>phủ định don't / doesn't</b>, <b>câu hỏi Do / Does</b> và cách nói sở thích bằng <b>like / love / enjoy + V-ing</b>."
  },
  "video": {
    "title": "Recreation: What do you like doing in your free time? (Hobbies)",
    "url": "https://www.youtube.com/watch?v=Ame4RWCSz0U",
    "description": "Video giới thiệu cách nói hoạt động thời gian rảnh bằng mẫu I like ... in my free time, phù hợp để dẫn vào hobbies, like/love/enjoy và câu hỏi Do/Does.",
    "duration": "3 phút",
    "sceneSummary": "phần nội dung chính về hobbies và free time activities",
    "scenes": [
      {
        "time": 0,
        "label": "Từ vựng về hoạt động thời gian rảnh"
      },
      {
        "time": 120,
        "label": "Cách diễn đạt sở thích với like / love / enjoy + V-ing"
      },
      {
        "time": 240,
        "label": "Cách dùng don't / doesn't và do / does"
      }
    ],
    "questions": [
      {
        "q": "Present Simple dùng để diễn đạt điều gì trong video?",
        "options": [
          "Hành động đang xảy ra lúc này",
          "Thói quen, sở thích thường xuyên",
          "Hành động đã xong trong quá khứ",
          "Kế hoạch tương lai xa"
        ],
        "answer": 1
      },
      {
        "q": "She ___ like watching horror movies.",
        "options": [
          "don't",
          "doesn't",
          "not",
          "isn't"
        ],
        "answer": 1
      },
      {
        "q": "Cách nói sở thích nào đúng ngữ pháp?",
        "options": [
          "I enjoy cook on weekends.",
          "I enjoy cooking on weekends.",
          "I enjoy to cook on weekends.",
          "I enjoy cooked on weekends."
        ],
        "answer": 1
      },
      {
        "q": "___ they go hiking on weekends?",
        "options": [
          "Do",
          "Does",
          "Is",
          "Are"
        ],
        "answer": 0
      },
      {
        "q": "Does he like sports? - Câu trả lời phủ định đúng là gì?",
        "options": [
          "No, he don't.",
          "No, he not.",
          "No, he doesn't.",
          "No, he doesn't like."
        ],
        "answer": 2
      }
    ]
  },
  "vocabGroups": {
    "introVideo": "Hoạt động thời gian rảnh - Hobbies & Free Time (15 từ)",
    "dialogueVideo": "Diễn đạt sở thích - Likes & Dislikes (13 từ/cụm)"
  },
  "matchAll": true,
  "listenPickAll": true,
  "vocabulary": [
    {
      "group": "introVideo",
      "en": "hobby",
      "vi": "sở thích",
      "img": "🎨",
      "ipa": "/ˈhɑːbi/"
    },
    {
      "group": "introVideo",
      "en": "free time",
      "vi": "thời gian rảnh",
      "img": "⏳",
      "ipa": "/friː taɪm/"
    },
    {
      "group": "introVideo",
      "en": "read books",
      "vi": "đọc sách",
      "img": "📖",
      "ipa": "/riːd bʊks/"
    },
    {
      "group": "introVideo",
      "en": "watch movies",
      "vi": "xem phim",
      "img": "🎬",
      "ipa": "/wɑːtʃ ˈmuːviz/"
    },
    {
      "group": "introVideo",
      "en": "play sports",
      "vi": "chơi thể thao",
      "img": "⚽",
      "ipa": "/pleɪ spɔːrts/"
    },
    {
      "group": "introVideo",
      "en": "listen to music",
      "vi": "nghe nhạc",
      "img": "🎵",
      "ipa": "/ˈlɪsən tə ˈmjuːzɪk/"
    },
    {
      "group": "introVideo",
      "en": "go hiking",
      "vi": "đi leo núi / đi bộ dã ngoại",
      "img": "🥾",
      "ipa": "/ɡoʊ ˈhaɪkɪŋ/"
    },
    {
      "group": "introVideo",
      "en": "cook",
      "vi": "nấu ăn",
      "img": "🍳",
      "ipa": "/kʊk/"
    },
    {
      "group": "introVideo",
      "en": "travel",
      "vi": "du lịch",
      "img": "✈️",
      "ipa": "/ˈtrævəl/"
    },
    {
      "group": "introVideo",
      "en": "draw",
      "vi": "vẽ",
      "img": "🖌️",
      "ipa": "/drɔː/"
    },
    {
      "group": "introVideo",
      "en": "go swimming",
      "vi": "đi bơi",
      "img": "🏊",
      "ipa": "/ɡoʊ ˈswɪmɪŋ/"
    },
    {
      "group": "introVideo",
      "en": "hang out with friends",
      "vi": "đi chơi / tụ tập bạn bè",
      "img": "👫",
      "ipa": "/hæŋ aʊt wɪð frendz/"
    },
    {
      "group": "introVideo",
      "en": "stay home",
      "vi": "ở nhà",
      "img": "🏠",
      "ipa": "/steɪ hoʊm/"
    },
    {
      "group": "introVideo",
      "en": "go to the gym",
      "vi": "đi tập gym",
      "img": "💪",
      "ipa": "/ɡoʊ tə ðə dʒɪm/"
    },
    {
      "group": "introVideo",
      "en": "weekend",
      "vi": "cuối tuần",
      "img": "📅",
      "ipa": "/ˈwiːkend/"
    },
    {
      "group": "dialogueVideo",
      "en": "like + V-ing / noun",
      "vi": "thích",
      "img": "💙",
      "ipa": "/laɪk/"
    },
    {
      "group": "dialogueVideo",
      "en": "love + V-ing / noun",
      "vi": "yêu thích, rất thích",
      "img": "❤️",
      "ipa": "/lʌv/"
    },
    {
      "group": "dialogueVideo",
      "en": "enjoy + V-ing",
      "vi": "thích thú",
      "img": "😊",
      "ipa": "/ɪnˈdʒɔɪ/"
    },
    {
      "group": "dialogueVideo",
      "en": "hate + V-ing / noun",
      "vi": "ghét",
      "img": "😤",
      "ipa": "/heɪt/"
    },
    {
      "group": "dialogueVideo",
      "en": "prefer + V-ing / noun",
      "vi": "thích hơn, ưu tiên hơn",
      "img": "🔁",
      "ipa": "/prɪˈfɜːr/"
    },
    {
      "group": "dialogueVideo",
      "en": "don't like",
      "vi": "không thích",
      "img": "❌",
      "ipa": "/doʊnt laɪk/"
    },
    {
      "group": "dialogueVideo",
      "en": "instead",
      "vi": "thay vào đó",
      "img": "🔄",
      "ipa": "/ɪnˈsted/"
    },
    {
      "group": "dialogueVideo",
      "en": "play video games",
      "vi": "chơi game",
      "img": "🎮",
      "ipa": "/pleɪ ˈvɪdioʊ ɡeɪmz/"
    },
    {
      "group": "dialogueVideo",
      "en": "go shopping",
      "vi": "đi mua sắm",
      "img": "🛍️",
      "ipa": "/ɡoʊ ˈʃɑːpɪŋ/"
    },
    {
      "group": "dialogueVideo",
      "en": "take photos",
      "vi": "chụp ảnh",
      "img": "📷",
      "ipa": "/teɪk ˈfoʊtoʊz/"
    },
    {
      "group": "dialogueVideo",
      "en": "go cycling",
      "vi": "đi xe đạp",
      "img": "🚴",
      "ipa": "/ɡoʊ ˈsaɪklɪŋ/"
    },
    {
      "group": "dialogueVideo",
      "en": "relax",
      "vi": "thư giãn",
      "img": "😌",
      "ipa": "/rɪˈlæks/"
    },
    {
      "group": "dialogueVideo",
      "en": "in my free time",
      "vi": "trong thời gian rảnh của tôi",
      "img": "🕐",
      "ipa": "/ɪn maɪ friː taɪm/"
    }
  ],
  "grammar": {
    "title": "Sở thích & Do/Does - 4 cấu trúc quan trọng",
    "intro": "Dùng don't / doesn't để phủ định, Do / Does để hỏi và like / love / enjoy / hate + V-ing hoặc danh từ để nói về sở thích.",
    "badge": "4 CẤU TRÚC CÂU QUAN TRỌNG",
    "formula": "S + don't/doesn't + V | Do/Does + S + V? | Wh-word + do/does + S + V? | like/love/enjoy/hate + V-ing",
    "structures": [
      {
        "num": 1,
        "pattern": "S + don't / doesn't + V",
        "vi": "Phủ định với don't / doesn't",
        "style": "I/You/We/They dùng don't; He/She/It dùng doesn't",
        "example": "She doesn't play sports on weekends.",
        "exampleVi": "Cô ấy không chơi thể thao vào cuối tuần.",
        "context": "Sau doesn't, động từ chính không thêm -s/-es."
      },
      {
        "num": 2,
        "pattern": "Do / Does + S + V?",
        "vi": "Câu hỏi Yes/No",
        "style": "Do cho I/you/we/they; Does cho he/she/it",
        "example": "Does she go hiking on weekends?",
        "exampleVi": "Cô ấy có đi leo núi vào cuối tuần không?",
        "context": "Trả lời ngắn: Yes, she does. / No, she doesn't."
      },
      {
        "num": 3,
        "pattern": "Wh-word + do/does + S + V?",
        "vi": "Câu hỏi Wh-questions",
        "style": "Dùng What, Where, Who, How often trước do/does",
        "example": "What do you do in your free time?",
        "exampleVi": "Bạn làm gì trong thời gian rảnh?",
        "context": "Dùng để hỏi hoạt động, nơi chốn, người đi cùng hoặc tần suất."
      },
      {
        "num": 4,
        "pattern": "like / love / enjoy / hate + V-ing / noun",
        "vi": "Nói sở thích",
        "style": "Sau enjoy/like/love/hate dùng V-ing hoặc danh từ",
        "example": "I enjoy cooking on weekends.",
        "exampleVi": "Tôi thích nấu ăn vào cuối tuần.",
        "context": "Nói I enjoy cooking, không nói I enjoy to cook."
      }
    ],
    "commonQA": [
      {
        "q": "What do you do in your free time?",
        "a": "I usually read books and listen to music."
      },
      {
        "q": "Does your sister enjoy cooking?",
        "a": "Yes, she does. She loves it!"
      },
      {
        "q": "Do you like watching movies?",
        "a": "Not really. I prefer reading books."
      },
      {
        "q": "What does your brother do on weekends?",
        "a": "He doesn't stay home. He usually goes hiking or plays sports."
      }
    ]
  },
  "listening": {
    "title": "Nghe trả lời - Free Time & Do/Does",
    "transcript": "Listen and choose the correct word to complete each sentence.",
    "translation": "Nghe từng câu có chỗ trống và chọn từ đúng.",
    "audio": "Listen and choose the correct word.",
    "questions": [
      {
        "q": "I ___ like watching horror movies.",
        "options": [
          "don't",
          "doesn't"
        ],
        "answer": 0
      },
      {
        "q": "She ___ enjoy cooking at home.",
        "options": [
          "don't",
          "doesn't"
        ],
        "answer": 1
      },
      {
        "q": "___ you have any hobbies?",
        "options": [
          "Do",
          "Does"
        ],
        "answer": 0
      },
      {
        "q": "___ he go hiking on weekends?",
        "options": [
          "Do",
          "Does"
        ],
        "answer": 1
      },
      {
        "q": "Yes, I ___. I love reading!",
        "options": [
          "do",
          "does"
        ],
        "answer": 0
      },
      {
        "q": "No, she ___. She prefers hiking.",
        "options": [
          "don't",
          "doesn't"
        ],
        "answer": 1
      },
      {
        "q": "What ___ you do in your free time?",
        "options": [
          "do",
          "does"
        ],
        "answer": 0
      },
      {
        "q": "What ___ she do on weekends?",
        "options": [
          "do",
          "does"
        ],
        "answer": 1
      },
      {
        "q": "I enjoy ___ on weekends.",
        "options": [
          "swim",
          "swimming"
        ],
        "answer": 1
      },
      {
        "q": "She loves ___ with friends.",
        "options": [
          "hang out",
          "hanging out"
        ],
        "answer": 1
      },
      {
        "q": "They ___ travel very often.",
        "options": [
          "don't",
          "doesn't"
        ],
        "answer": 0
      },
      {
        "q": "He ___ play sports on weekdays.",
        "options": [
          "don't",
          "doesn't"
        ],
        "answer": 1
      },
      {
        "q": "How often ___ you go to the gym?",
        "options": [
          "do",
          "does"
        ],
        "answer": 0
      },
      {
        "q": "How often ___ she read books?",
        "options": [
          "do",
          "does"
        ],
        "answer": 1
      },
      {
        "q": "I like ___ photos on trips.",
        "options": [
          "take",
          "taking"
        ],
        "answer": 1
      },
      {
        "q": "My brother hates ___.",
        "options": [
          "cook",
          "cooking"
        ],
        "answer": 1
      },
      {
        "q": "___ they enjoy music?",
        "options": [
          "Do",
          "Does"
        ],
        "answer": 0
      },
      {
        "q": "She ___ stay home on weekends.",
        "options": [
          "don't",
          "doesn't"
        ],
        "answer": 1
      },
      {
        "q": "We ___ have free time on weekdays.",
        "options": [
          "don't",
          "doesn't"
        ],
        "answer": 0
      },
      {
        "q": "What ___ your friend love doing?",
        "options": [
          "do",
          "does"
        ],
        "answer": 1
      }
    ]
  },
  "translation": {
    "title": "LUYỆN DỊCH: VIỆT ↔ ANH (20 CÂU)",
    "instruction": "Dịch từng câu. Chú ý don't / doesn't, do / does và like / love / enjoy + V-ing.",
    "sentences": [
      {
        "vi": "Tôi thích sưu tầm sách cũ vào thời gian rảnh.",
        "en": "I like collecting old books in my free time."
      },
      {
        "vi": "Cô ấy thích trồng hoa trong khu vườn nhỏ của mình.",
        "en": "She enjoys growing flowers in her small garden."
      },
      {
        "vi": "Bạn có chơi cờ với bố vào buổi tối không?",
        "en": "Do you play chess with your father in the evening?"
      },
      {
        "vi": "Anh ấy có thích làm mô hình máy bay không?",
        "en": "Does he like making model planes?"
      },
      {
        "vi": "Chúng tôi không đến rạp chiếu phim vào tối thứ Hai.",
        "en": "We don't go to the cinema on Monday nights."
      },
      {
        "vi": "Bạn thân của tôi không chơi đàn ghi-ta.",
        "en": "My best friend doesn't play the guitar."
      },
      {
        "vi": "Họ thích làm bánh cho gia đình vào Chủ Nhật.",
        "en": "They love baking cakes for their family on Sundays."
      },
      {
        "vi": "Cô ấy ghét dọn dẹp bàn học sau giờ học.",
        "en": "She hates cleaning her desk after school."
      },
      {
        "vi": "Bạn thường vẽ gì trong sổ tay của bạn?",
        "en": "What do you usually draw in your notebook?"
      },
      {
        "vi": "Em gái bạn nghe podcast ở đâu?",
        "en": "Where does your younger sister listen to podcasts?"
      },
      {
        "vi": "Tôi thích trò chơi bàn cờ hơn trò chơi điện tử.",
        "en": "I prefer board games to video games."
      },
      {
        "vi": "Cô ấy thích học tiếng Hàn qua bài hát.",
        "en": "She likes learning Korean through songs."
      },
      {
        "vi": "Anh trai tôi thường sửa xe đạp vào sáng thứ Bảy.",
        "en": "My brother often fixes bikes on Saturday mornings."
      },
      {
        "vi": "Bạn có viết truyện ngắn sau giờ học không?",
        "en": "Do you write short stories after school?"
      },
      {
        "vi": "Cậu ấy không sưu tầm tem, nhưng cậu ấy sưu tầm tiền xu.",
        "en": "He doesn't collect stamps, but he collects coins."
      },
      {
        "vi": "Chúng tôi thích xem các trận bóng đá cùng nhau.",
        "en": "We enjoy watching football matches together."
      },
      {
        "vi": "Cô ấy đi câu lạc bộ nghệ thuật bao lâu một lần?",
        "en": "How often does she go to the art club?"
      },
      {
        "vi": "Họ không luyện đàn piano vào các ngày trong tuần.",
        "en": "They don't practice the piano on weekdays."
      },
      {
        "vi": "Bạn của bạn thích hoạt động ngoài trời nào nhất?",
        "en": "What outdoor activity does your friend like best?"
      },
      {
        "vi": "Tôi không thích hát trước lớp.",
        "en": "I don't like singing in front of the class."
      }
    ]
  },
  "dialogueVideo": {
    "title": "Video hội thoại: Sở thích và hoạt động cuối tuần",
    "label": "Hobbies & Weekend Conversation",
    "url": "https://www.youtube.com/watch?v=-UX0X45sYe4",
    "description": "Hội thoại học tiếng Anh về sở thích cá nhân và hoạt động thời gian rảnh.",
    "transcript": [
      {
        "speaker": "A",
        "en": "Hey! What do you **usually** do **on weekends**?",
        "vi": "Này! Bạn thường làm gì vào cuối tuần?"
      },
      {
        "speaker": "B",
        "en": "I **usually go hiking** or **stay home and read**. What about you?",
        "vi": "Tôi thường đi leo núi hoặc ở nhà đọc sách. Còn bạn?"
      },
      {
        "speaker": "A",
        "en": "I **don't like hiking**. I **prefer watching movies**.",
        "vi": "Tôi không thích đi leo núi. Tôi thích xem phim hơn."
      },
      {
        "speaker": "B",
        "en": "Really? **Does** your sister **enjoy movies** too?",
        "vi": "Thật không? Chị của bạn có thích xem phim không?"
      },
      {
        "speaker": "A",
        "en": "No, she **doesn't**. She **goes to the gym** every Saturday.",
        "vi": "Không, cô ấy không thích. Cô ấy đi tập gym mỗi thứ Bảy."
      },
      {
        "speaker": "B",
        "en": "Wow! **How often** does she **work out**?",
        "vi": "Ồ! Cô ấy tập bao lâu một lần?"
      },
      {
        "speaker": "A",
        "en": "She goes **three times a week**. She **loves** it!",
        "vi": "Cô ấy đi 3 lần một tuần. Cô ấy rất thích!"
      },
      {
        "speaker": "B",
        "en": "That's impressive. I **enjoy swimming** but only **on weekends**.",
        "vi": "Ấn tượng đấy. Tôi thích bơi nhưng chỉ vào cuối tuần."
      }
    ],
    "listenChoose": true,
    "sentenceOrder": true,
    "listenPickLine": [
      {
        "prompt": "What do you usually do on weekends?",
        "options": [
          { "text": "I'm going hiking.", "img": "🥾" },
          { "text": "I usually go hiking or read.", "img": "📖" },
          { "text": "She goes to the gym.", "img": "💪" }
        ],
        "answer": 1
      },
      {
        "prompt": "Does your sister enjoy movies?",
        "options": [
          { "text": "No, she don't.", "img": "❌" },
          { "text": "No, she doesn't. She goes to the gym.", "img": "💪" },
          { "text": "No, she not enjoy.", "img": "⚠️" }
        ],
        "answer": 1
      },
      {
        "prompt": "I prefer watching movies.",
        "options": [
          { "text": "prefer = thích", "img": "🙂" },
          { "text": "prefer = ghét", "img": "😤" },
          { "text": "prefer = thích hơn", "img": "🔁" }
        ],
        "answer": 2
      },
      {
        "prompt": "How often does she work out?",
        "options": [
          { "text": "Hỏi về tần suất tập thể dục", "img": "📊" },
          { "text": "Hỏi cô ấy tập ở đâu", "img": "📍" },
          { "text": "Hỏi cô ấy tập với ai", "img": "👥" }
        ],
        "answer": 0
      }
    ],
    "fillConversation": [
      {
        "lines": [
          {
            "speaker": "A",
            "text": "What [[do]] you do in your free time?"
          },
          {
            "speaker": "B",
            "text": "I [[enjoy]] reading and going swimming."
          },
          {
            "speaker": "A",
            "text": "[[Does]] your friend like swimming too?"
          },
          {
            "speaker": "B",
            "text": "No, she [[doesn't]]. She [[prefers]] hiking to swimming!"
          }
        ],
        "wordBank": [
          "do",
          "enjoy",
          "Does",
          "doesn't",
          "prefers"
        ]
      }
    ]
  },
  "speaking": {
    "title": "Luyện nói (AI) - Hobbies & Free Time",
    "turns": [
      {
        "id": 1,
        "ai": {
          "textEn": "What do you enjoy doing in your free time?",
          "textVn": "Bạn thích làm gì trong thời gian rảnh?",
          "audioUrl": "What do you enjoy doing in your free time?"
        },
        "user": {
          "formula": "I enjoy / like / love + [V-ing] + [time/place].",
          "sampleEn": "I enjoy reading books and listening to music in my free time. I also love going swimming on weekends.",
          "sampleVn": "Tôi thích đọc sách và nghe nhạc trong thời gian rảnh. Tôi cũng rất thích đi bơi vào cuối tuần.",
          "sampleAudioUrl": "I enjoy reading books and listening to music in my free time. I also love going swimming on weekends."
        }
      },
      {
        "id": 2,
        "ai": {
          "textEn": "Is there anything you don't like doing?",
          "textVn": "Có việc gì bạn không thích làm không?",
          "audioUrl": "Is there anything you don't like doing?"
        },
        "user": {
          "formula": "I don't like / hate + [V-ing]. I prefer + [V-ing] instead.",
          "sampleEn": "I don't like watching horror movies. I prefer romantic films. I also hate cooking - I always order food!",
          "sampleVn": "Tôi không thích xem phim kinh dị. Tôi thích phim lãng mạn hơn. Tôi cũng ghét nấu ăn - tôi luôn đặt đồ ăn!",
          "sampleAudioUrl": "I don't like watching horror movies. I prefer romantic films. I also hate cooking. I always order food!"
        }
      },
      {
        "id": 3,
        "ai": {
          "textEn": "Does your friend or family member have any interesting hobbies?",
          "textVn": "Bạn bè hoặc người thân của bạn có sở thích thú vị nào không?",
          "audioUrl": "Does your friend or family member have any interesting hobbies?"
        },
        "user": {
          "formula": "He/She enjoys/loves + [V-ing]. He/She doesn't like + [V-ing].",
          "sampleEn": "My sister loves cooking. She doesn't enjoy sports at all. She goes to the gym three times a week though - she loves it!",
          "sampleVn": "Chị tôi rất thích nấu ăn. Chị ấy không thích thể thao chút nào. Tuy vậy, chị ấy đi tập gym ba lần một tuần - chị ấy rất thích!",
          "sampleAudioUrl": "My sister loves cooking. She doesn't enjoy sports at all. She goes to the gym three times a week though. She loves it!"
        }
      },
      {
        "id": 4,
        "ai": {
          "textEn": "What are your plans for this weekend?",
          "textVn": "Cuối tuần này bạn có kế hoạch gì?",
          "audioUrl": "What are your plans for this weekend?"
        },
        "user": {
          "formula": "On weekends, I usually + [activity]. I'm going to + [activity].",
          "sampleEn": "This weekend I'm going to hang out with friends. We usually go hiking or watch movies. I don't like staying home all day.",
          "sampleVn": "Cuối tuần này tôi sẽ đi chơi với bạn bè. Chúng tôi thường đi leo núi hoặc xem phim. Tôi không thích ở nhà cả ngày.",
          "sampleAudioUrl": "This weekend I'm going to hang out with friends. We usually go hiking or watch movies. I don't like staying home all day."
        }
      },
      {
        "id": 5,
        "ai": {
          "textEn": "Tell me about your hobbies and free time. Use at least four sentences with like, enjoy, don't and doesn't.",
          "textVn": "Hãy kể về sở thích và thời gian rảnh của bạn. Dùng ít nhất 4 câu với like, enjoy, don't và doesn't.",
          "audioUrl": "Tell me about your hobbies and free time. Use at least four sentences with like, enjoy, don't and doesn't."
        },
        "user": {
          "formula": "Dùng 4-5 câu: khẳng định + phủ định + nói về người khác + cuối tuần.",
          "sampleEn": "I enjoy reading and going swimming in my free time. I don't like playing video games - I prefer outdoor activities. My best friend loves cooking but doesn't enjoy sports. On weekends, we usually go hiking together.",
          "sampleVn": "Tôi thích đọc sách và đi bơi trong thời gian rảnh. Tôi không thích chơi game - tôi thích hoạt động ngoài trời hơn. Bạn thân của tôi thích nấu ăn nhưng không thích thể thao. Cuối tuần, chúng tôi thường đi leo núi cùng nhau.",
          "sampleAudioUrl": "I enjoy reading and going swimming in my free time. I don't like playing video games. I prefer outdoor activities. My best friend loves cooking but doesn't enjoy sports. On weekends, we usually go hiking together."
        }
      }
    ]
  },
  "minitest": [
    {
      "q": "She ___ like watching horror movies.",
      "options": [
        "don't",
        "doesn't",
        "not",
        "isn't"
      ],
      "answer": 1
    },
    {
      "q": "Câu nào đúng ngữ pháp?",
      "options": [
        "I enjoy to cook on weekends.",
        "I enjoy cooking on weekends.",
        "I enjoy cook on weekends.",
        "I enjoy cooked on weekends."
      ],
      "answer": 1
    },
    {
      "q": "___ they have any hobbies?",
      "options": [
        "Does",
        "Do",
        "Is",
        "Are"
      ],
      "answer": 1
    },
    {
      "q": "Dịch: Anh ấy thích đi bơi vào cuối tuần.",
      "options": [
        "He like swimming on weekends.",
        "He likes to swim on weekends.",
        "He likes / enjoys swimming on weekends.",
        "He enjoy swimming on weekends."
      ],
      "answer": 2
    },
    {
      "q": "Hobby nghĩa là gì?",
      "options": [
        "cuối tuần",
        "thời gian rảnh",
        "sở thích",
        "hoạt động"
      ],
      "answer": 2
    },
    {
      "q": "Does she go hiking? - Trả lời phủ định đúng:",
      "options": [
        "No, she don't.",
        "No, she not.",
        "No, she doesn't.",
        "No, she doesn't goes."
      ],
      "answer": 2
    },
    {
      "q": "What ___ your brother love doing?",
      "options": [
        "do",
        "does",
        "is",
        "has"
      ],
      "answer": 1
    },
    {
      "q": "Câu nào sai ngữ pháp?",
      "options": [
        "I don't like cooking.",
        "She doesn't enjoy hiking.",
        "He doesn't plays tennis.",
        "They don't travel often."
      ],
      "answer": 2
    },
    {
      "q": "Prefer nghĩa là gì?",
      "options": [
        "thích",
        "ghét",
        "thích hơn",
        "không quan tâm"
      ],
      "answer": 2
    },
    {
      "q": "Dịch: Họ không ở nhà vào cuối tuần.",
      "options": [
        "They doesn't stay home on weekends.",
        "They not stay home on weekends.",
        "They don't stay home on weekends.",
        "They don't stays home on weekends."
      ],
      "answer": 2
    }
  ],
  "mindmap": {
    "type": "structured",
    "center": "SỞ THÍCH & PRESENT SIMPLE QUESTIONS",
    "branches": [
      {
        "icon": "🏠",
        "label": "HOBBIES - TRONG NHÀ",
        "sub": "Hoạt động ở nhà",
        "items": [
          "read books",
          "watch movies",
          "draw",
          "cook",
          "play video games",
          "relax"
        ]
      },
      {
        "icon": "🥾",
        "label": "HOBBIES - NGOÀI TRỜI",
        "sub": "Hoạt động cuối tuần",
        "items": [
          "go hiking",
          "go swimming",
          "go cycling",
          "play sports",
          "hang out",
          "go shopping"
        ]
      },
      {
        "icon": "🚫",
        "label": "PHỦ ĐỊNH",
        "sub": "don't / doesn't",
        "items": [
          "I/You/We/They don't + V",
          "He/She/It doesn't + V",
          "động từ sau doesn't không thêm -s/-es"
        ]
      },
      {
        "icon": "❓",
        "label": "CÂU HỎI",
        "sub": "Do / Does",
        "items": [
          "Do/Does + S + V?",
          "Yes, S + do/does",
          "No, S + don't/doesn't",
          "What/Where/Who/How often + do/does"
        ]
      },
      {
        "icon": "💙",
        "label": "LIKE / LOVE / ENJOY",
        "sub": "+ V-ing / noun",
        "items": [
          "enjoy cooking",
          "love swimming",
          "like reading",
          "hate drawing",
          "prefer cycling"
        ]
      }
    ]
  },
  "homeworkRich": {
    "title": "BÀI TẬP VỀ NHÀ - BUỔI 9: MY HOBBIES & WEEKEND INTERVIEW",
    "submit": "Nộp bài qua nhóm lớp",
    "deadline": "Trước buổi học tiếp theo",
    "tasks": [
      {
        "icon": "✏️",
        "title": "BÀI TẬP 1: VIẾT - MY HOBBIES & MY FRIEND'S HOBBIES",
        "badge": "Bắt buộc",
        "desc": "Viết 6-8 câu về sở thích của bạn và của một người bạn hoặc thành viên gia đình.",
        "items": [
          "Dùng ít nhất 2 câu khẳng định với like/enjoy/love + V-ing",
          "Dùng ít nhất 2 câu phủ định với don't/doesn't",
          "Dùng ít nhất 1 câu hỏi với Do/Does",
          "Mẫu: I enjoy reading books and going swimming in my free time. I don't like watching horror movies - I prefer comedies. My sister loves cooking but she doesn't play sports. Does she ever go hiking? No, she doesn't!"
        ]
      },
      {
        "icon": "🎙️",
        "title": "BÀI TẬP 2: NÓI / GHI ÂM - WEEKEND INTERVIEW",
        "badge": "Khuyến khích",
        "desc": "Tưởng tượng bạn đang phỏng vấn một người bạn về cuối tuần của họ. Ghi âm 5 câu hỏi + trả lời, bạn đóng cả 2 vai.",
        "items": [
          "What do you do in your free time?",
          "Do you enjoy cooking?",
          "Does your friend have the same hobbies as you?",
          "How often do you go out on weekends?",
          "What don't you like doing on weekends?"
        ],
        "note": "Khuyến khích quay video hoặc gửi voice note khi làm bài tập 2."
      }
    ]
  },
  "homework": [
    "Viết 6-8 câu về sở thích của bạn và một người bạn/người thân, có like/enjoy/love, don't/doesn't và Do/Does.",
    "Ghi âm 5 câu hỏi + trả lời về weekend interview và nộp qua nhóm lớp."
  ],
  "sectionFlow": [
    "intro",
    "review",
    "video",
    "vocab",
    "vocab_match",
    "listen_pick",
    "grammar",
    "listen_quiz",
    "translate",
    "dialogue_video",
    "dialogue_video_quiz",
    "dialogue_video_order",
    "speaking",
    "minitest",
    "mindmap",
    "homework"
  ],
  "skipSections": [
    "writing",
    "story",
    "dictation",
    "sprint"
  ]
};

const LESSON_10_TEMPLATE = {
  "objectives": [
    "Nhận biết và sử dụng đúng các địa điểm trong thị trấn / thành phố",
    "Dùng trạng từ tần suất (always, usually, often, sometimes, rarely, never) kết hợp với địa điểm",
    "Đặt câu hỏi và trả lời về địa điểm với Where...? / How often...? / Do/Does...?",
    "Diễn đạt thói quen đi đến các nơi trong cuộc sống hàng ngày"
  ],
  "review": {
    "title": "Ôn bài cũ - Sở thích & Thời gian rảnh",
    "questions": [
      { "q": "She ___ reading books in her free time.", "answer": "enjoys" },
      { "q": "He ___ play sports on weekends.", "answer": "doesn't" },
      { "q": "___ your friend like cooking?", "answer": "Does" },
      { "q": "I love going swimming - I ___ staying home!", "answer": "hate" }
    ],
    "structures": [
      "She enjoys reading books in her free time.",
      "He doesn't play sports on weekends.",
      "Does your friend like cooking? - Yes, she does.",
      "I love going swimming - I hate staying home!"
    ],
    "reviewGames": {
      "title": "Ôn tập Buổi 9 - Free Time & Do/Does",
      "intro": "Làm 2 thử thách để ôn từ vựng sở thích, thời gian rảnh, don't/doesn't, do/does và like/enjoy + V-ing trước khi học địa điểm trong thị trấn.",
      "vocabulary": [
        { "en": "hobby", "vi": "sở thích", "img": "🎯", "ipa": "/ˈhɒbi/", "options": ["cuối tuần", "thời gian rảnh", "sở thích", "hoạt động"], "answer": 2 },
        { "en": "enjoy", "vi": "thích thú", "img": "😊", "ipa": "/ɪnˈdʒɔɪ/", "options": ["ghét", "thích thú", "thích hơn", "không thích"], "answer": 1 },
        { "en": "go hiking", "vi": "đi leo núi", "img": "🥾", "ipa": "/ɡoʊ ˈhaɪkɪŋ/", "options": ["đi bơi", "đi mua sắm", "đi leo núi", "đi tập gym"], "answer": 2 },
        { "en": "prefer", "vi": "thích hơn", "img": "🔁", "ipa": "/prɪˈfɜːr/", "options": ["thích", "ghét", "thích hơn", "không quan tâm"], "answer": 2 },
        { "en": "watch movies", "vi": "xem phim", "img": "🎬", "ipa": "/wɑːtʃ ˈmuːviz/", "options": ["đọc sách", "xem phim", "nghe nhạc", "chơi game"], "answer": 1 },
        { "en": "love", "vi": "rất thích", "img": "💙", "ipa": "/lʌv/", "options": ["thích thú", "ghét", "rất thích", "thích hơn"], "answer": 2 },
        { "en": "free time", "vi": "thời gian rảnh", "img": "⏳", "ipa": "/friː taɪm/", "options": ["cuối tuần", "buổi sáng", "thời gian rảnh", "công việc"], "answer": 2 },
        { "en": "go swimming", "vi": "đi bơi", "img": "🏊", "ipa": "/ɡoʊ ˈswɪmɪŋ/", "options": ["đi leo núi", "đi bơi", "đi tập gym", "đi xe đạp"], "answer": 1 },
        { "en": "instead", "vi": "thay vào đó", "img": "↪️", "ipa": "/ɪnˈsted/", "options": ["thay vào đó", "cùng nhau", "trước đó", "sau đó"], "answer": 0 },
        { "en": "relax", "vi": "thư giãn", "img": "🛋️", "ipa": "/rɪˈlæks/", "options": ["tập thể dục", "làm việc", "thư giãn", "đi chơi"], "answer": 2 },
        { "en": "hate", "vi": "ghét", "img": "😖", "ipa": "/heɪt/", "options": ["yêu thích", "thích hơn", "ghét", "không quan tâm"], "answer": 2 },
        { "en": "listen to music", "vi": "nghe nhạc", "img": "🎧", "ipa": "/ˈlɪsn tə ˈmjuːzɪk/", "options": ["xem phim", "chơi thể thao", "nghe nhạc", "đọc sách"], "answer": 2 },
        { "en": "weekend", "vi": "cuối tuần", "img": "🎉", "ipa": "/ˈwiːkend/", "options": ["ngày thường", "cuối tuần", "buổi tối", "buổi sáng"], "answer": 1 },
        { "en": "play sports", "vi": "chơi thể thao", "img": "⚽", "ipa": "/pleɪ spɔːrts/", "options": ["chơi game", "đi bơi", "chơi thể thao", "đi leo núi"], "answer": 2 },
        { "en": "take photos", "vi": "chụp ảnh", "img": "📷", "ipa": "/teɪk ˈfoʊtoʊz/", "options": ["chụp ảnh", "xem phim", "vẽ", "đi shopping"], "answer": 0 },
        { "en": "go shopping", "vi": "đi mua sắm", "img": "🛍️", "ipa": "/ɡoʊ ˈʃɑːpɪŋ/", "options": ["đi tập gym", "đi bơi", "đi leo núi", "đi mua sắm"], "answer": 3 },
        { "en": "hang out", "vi": "đi chơi/tụ tập", "img": "👥", "ipa": "/hæŋ aʊt/", "options": ["ở nhà", "đi chơi/tụ tập", "đi làm", "thư giãn"], "answer": 1 },
        { "en": "go cycling", "vi": "đi xe đạp", "img": "🚴", "ipa": "/ɡoʊ ˈsaɪklɪŋ/", "options": ["đi bơi", "đi leo núi", "đi xe đạp", "đi mua sắm"], "answer": 2 },
        { "en": "play video games", "vi": "chơi game", "img": "🎮", "ipa": "/pleɪ ˈvɪdioʊ ɡeɪmz/", "options": ["chơi thể thao", "chơi game", "xem phim", "đọc sách"], "answer": 1 },
        { "en": "in my free time", "vi": "trong thời gian rảnh", "img": "🕒", "ipa": "/ɪn maɪ friː taɪm/", "options": ["vào buổi sáng", "vào cuối tuần", "trong thời gian rảnh", "vào ngày thường"], "answer": 2 }
      ],
      "quizBomb": {
        "title": "Quiz Bomb Review - Hobbies & Do/Does",
        "instruction": "Trả lời nhanh 20 câu ôn tập Buổi 9 trong 5 giây mỗi câu.",
        "questions": [
          { "q": "She ___ like watching horror movies.", "options": ["don't", "doesn't", "not", "isn't"], "answer": 1 },
          { "q": "I enjoy ___ on weekends.", "options": ["swim", "to swim", "swimming", "swam"], "answer": 2 },
          { "q": "___ they have any hobbies?", "options": ["Does", "Is", "Do", "Are"], "answer": 2 },
          { "q": "Does he go hiking? → Phủ định đúng:", "options": ["No, he don't.", "No, he doesn't.", "No, he not.", "No, he isn't."], "answer": 1 },
          { "q": "She loves ___ with friends.", "options": ["hang out", "hung out", "hanging out", "to hang"], "answer": 2 },
          { "q": "\"Hobby\" nghĩa là gì?", "options": ["cuối tuần", "sở thích", "thời gian rảnh", "hoạt động ngoài trời"], "answer": 1 },
          { "q": "Câu nào ĐÚNG?", "options": ["I enjoy to cook.", "I enjoy cook.", "I enjoy cooking.", "I enjoy cooked."], "answer": 2 },
          { "q": "What ___ she do on weekends?", "options": ["do", "does", "is", "has"], "answer": 1 },
          { "q": "\"Prefer\" nghĩa là gì?", "options": ["thích", "ghét", "thích hơn", "không thích"], "answer": 2 },
          { "q": "\"Free time\" nghĩa là gì?", "options": ["buổi sáng rảnh", "thời gian rảnh", "cuối tuần", "thời gian làm việc"], "answer": 1 },
          { "q": "He ___ play sports on weekdays.", "options": ["don't", "not", "doesn't", "isn't"], "answer": 2 },
          { "q": "Câu nào SAI?", "options": ["I don't like cooking.", "She doesn't enjoy hiking.", "He doesn't plays tennis.", "They don't travel often."], "answer": 2 },
          { "q": "\"Go hiking\" nghĩa là gì?", "options": ["đi bơi", "đi xe đạp", "đi leo núi", "đi mua sắm"], "answer": 2 },
          { "q": "How often ___ she go to the gym?", "options": ["do", "does", "is", "has"], "answer": 1 },
          { "q": "\"Instead\" nghĩa là gì?", "options": ["cùng nhau", "thay vào đó", "sau đó", "trước đó"], "answer": 1 },
          { "q": "Do you enjoy cooking? → Trả lời khẳng định:", "options": ["Yes, I does.", "Yes, I enjoy.", "Yes, I do.", "Yes, she does."], "answer": 2 },
          { "q": "\"Go cycling\" nghĩa là gì?", "options": ["đi bơi", "đi xe đạp", "đi leo núi", "đi tập gym"], "answer": 1 },
          { "q": "\"Hang out with friends\" nghĩa là gì?", "options": ["ở nhà với bạn bè", "đi chơi/tụ tập bạn bè", "làm việc cùng bạn bè", "học cùng bạn bè"], "answer": 1 },
          { "q": "My brother hates ___.", "options": ["cook", "to cook", "cooking", "cooked"], "answer": 2 },
          { "q": "They ___ stay home on weekends.", "options": ["don't", "doesn't", "not", "aren't"], "answer": 0 }
        ]
      }
    },
    "summary": "Buổi trước chúng ta đã biết nói về sở thích và những thứ mình thích/không thích. Hôm nay, chúng ta sẽ học cách nói về <b>địa điểm trong thị trấn</b> - đến đâu, bao lâu một lần - kết hợp với <b>trạng từ tần suất</b> để mô tả thói quen đi lại."
  },
  "video": {
    "title": "Places in a Town Vocabulary",
    "url": "https://www.youtube.com/watch?v=LG2xFLtUFTw",
    "embedUrl": "https://www.youtube.com/embed/LG2xFLtUFTw",
    "sourceUrl": "https://www.youtube.com/watch?v=LG2xFLtUFTw",
    "channel": "ENGLISH BITES",
    "description": "Video dạy từ vựng về các địa điểm quan trọng trong thị trấn bằng hình ảnh sinh động: supermarket, hospital, school, park, bank, library, restaurant, cinema, post office, gym, pharmacy, bus stop, police station... Phù hợp trình độ A1/A2, học nhanh bằng hình ảnh và âm thanh.",
    "duration": "~5 phút",
    "sceneSummary": "phần chính trong video",
    "scenes": [
      { "time": 0, "label": "Phần 1 (0:00-1:30): Địa điểm công cộng cơ bản - school, hospital, bank, post office, police station." },
      { "time": 90, "label": "Phần 2 (1:30-3:30): Địa điểm mua sắm & dịch vụ - supermarket, market, pharmacy, gym, library." },
      { "time": 210, "label": "Phần 3 (3:30-5:10): Địa điểm vui chơi & di chuyển - cinema, restaurant, café, park, bus stop." }
    ],
    "questions": [
      { "q": "\"Supermarket\" là địa điểm gì?", "options": ["Bệnh viện", "Ngân hàng", "Siêu thị", "Chợ"], "answer": 2 },
      { "q": "Nơi bạn đến khi cần mua thuốc là:", "options": ["hospital", "pharmacy", "bank", "post office"], "answer": 1 },
      { "q": "\"Library\" nghĩa là gì?", "options": ["Rạp chiếu phim", "Nhà hàng", "Thư viện", "Công viên"], "answer": 2 },
      { "q": "Địa điểm nào KHÔNG xuất hiện trong video?", "options": ["school", "gym", "airport", "café"], "answer": 2 },
      { "q": "Bạn đến \"bus stop\" để làm gì?", "options": ["Mua sắm", "Tập thể dục", "Đón xe buýt", "Gửi thư"], "answer": 2 }
    ]
  },
  "vocabGroups": {
    "introVideo": "Địa điểm trong thị trấn - Places in Town (15 từ)",
    "dialogueVideo": "Trạng từ tần suất & cụm từ liên quan (13 từ/cụm)"
  },
  "matchAll": true,
  "listenPickAll": true,
  "vocabulary": [
    { "en": "supermarket", "vi": "siêu thị", "ipa": "/ˈsuːpərˌmɑːrkɪt/", "img": "🛒", "group": "introVideo" },
    { "en": "hospital", "vi": "bệnh viện", "ipa": "/ˈhɒspɪtl/", "img": "🏥", "group": "introVideo" },
    { "en": "school", "vi": "trường học", "ipa": "/skuːl/", "img": "🏫", "group": "introVideo" },
    { "en": "park", "vi": "công viên", "ipa": "/pɑːrk/", "img": "🌳", "group": "introVideo" },
    { "en": "bank", "vi": "ngân hàng", "ipa": "/bæŋk/", "img": "🏦", "group": "introVideo" },
    { "en": "library", "vi": "thư viện", "ipa": "/ˈlaɪbreri/", "img": "📚", "group": "introVideo" },
    { "en": "restaurant", "vi": "nhà hàng", "ipa": "/ˈrestrɑːnt/", "img": "🍽️", "group": "introVideo" },
    { "en": "cinema / movie theater", "vi": "rạp chiếu phim", "ipa": "/ˈsɪnəmə/", "img": "🎬", "group": "introVideo" },
    { "en": "post office", "vi": "bưu điện", "ipa": "/poʊst ˈɒfɪs/", "img": "📬", "group": "introVideo" },
    { "en": "gym / sports center", "vi": "phòng tập thể dục / trung tâm thể thao", "ipa": "/dʒɪm/", "img": "💪", "group": "introVideo" },
    { "en": "pharmacy / drugstore", "vi": "nhà thuốc", "ipa": "/ˈfɑːrməsi/", "img": "💊", "group": "introVideo" },
    { "en": "market", "vi": "chợ", "ipa": "/ˈmɑːrkɪt/", "img": "🏪", "group": "introVideo" },
    { "en": "café / coffee shop", "vi": "quán cà phê", "ipa": "/ˈkæfeɪ/", "img": "☕", "group": "introVideo" },
    { "en": "bus stop", "vi": "bến xe buýt", "ipa": "/bʌs stɒp/", "img": "🚌", "group": "introVideo" },
    { "en": "police station", "vi": "đồn cảnh sát", "ipa": "/pəˈliːs ˈsteɪʃn/", "img": "🚔", "group": "introVideo" },
    { "en": "always", "vi": "luôn luôn (100%)", "ipa": "/ˈɔːlweɪz/", "img": "💯", "group": "dialogueVideo" },
    { "en": "usually", "vi": "thường thường (80%)", "ipa": "/ˈjuːʒuəli/", "img": "🔵", "group": "dialogueVideo" },
    { "en": "often", "vi": "thường xuyên (60%)", "ipa": "/ˈɒfən/", "img": "🟢", "group": "dialogueVideo" },
    { "en": "sometimes", "vi": "đôi khi (40%)", "ipa": "/ˈsʌmtaɪmz/", "img": "🟡", "group": "dialogueVideo" },
    { "en": "rarely / seldom", "vi": "hiếm khi (20%)", "ipa": "/ˈreərli/", "img": "🟠", "group": "dialogueVideo" },
    { "en": "never", "vi": "không bao giờ (0%)", "ipa": "/ˈnevər/", "img": "❌", "group": "dialogueVideo" },
    { "en": "go to + địa điểm", "vi": "đi đến (nơi nào đó)", "ipa": "/ɡoʊ tuː/", "img": "🚶", "group": "dialogueVideo" },
    { "en": "near / nearby", "vi": "gần / gần đây", "ipa": "/nɪər/", "img": "📍", "group": "dialogueVideo" },
    { "en": "far (from)", "vi": "xa (cách)", "ipa": "/fɑːr/", "img": "↔️", "group": "dialogueVideo" },
    { "en": "next to", "vi": "bên cạnh", "ipa": "/nekst tuː/", "img": "↔️", "group": "dialogueVideo" },
    { "en": "across from / opposite", "vi": "đối diện với", "ipa": "/əˈkrɒs frəm/", "img": "🔁", "group": "dialogueVideo" },
    { "en": "on the corner of", "vi": "ở góc đường", "ipa": "/ɒn ðə ˈkɔːrnər/", "img": "🔲", "group": "dialogueVideo" },
    { "en": "between ... and ...", "vi": "ở giữa ... và ...", "ipa": "/bɪˈtwiːn/", "img": "↔️", "group": "dialogueVideo" }
  ],
  "grammar": {
    "title": "Trạng từ tần suất & Địa điểm - 4 cấu trúc chính",
    "intro": "Dùng trạng từ tần suất với go to + địa điểm, đặt câu hỏi Where / How often và mô tả vị trí bằng next to, across from, between, on the corner of.",
    "badge": "4 CẤU TRÚC CHÍNH",
    "formula": "S + frequency adverb + go/goes to + place | Where do/does + S + V? | How often do/does + S + V? | place + be + position phrase",
    "structures": [
      {
        "num": 1,
        "pattern": "S + frequency adverb + go/goes to + place",
        "vi": "Trạng từ tần suất + go to + địa điểm",
        "style": "Động từ thường: trạng từ đứng trước động từ chính; động từ be: trạng từ đứng sau be",
        "example": "I always go to the supermarket on Saturdays.",
        "exampleVi": "Tôi luôn đi siêu thị vào thứ Bảy.",
        "context": "Thang tần suất: always (100%) → usually (80%) → often (60%) → sometimes (40%) → rarely (20%) → never (0%)."
      },
      {
        "num": 2,
        "pattern": "Where / Which + do/does + S + V?",
        "vi": "Hỏi về địa điểm",
        "style": "Dùng Where để hỏi đi đâu; Which để hỏi địa điểm cụ thể nào",
        "example": "Where do you usually go on weekends?",
        "exampleVi": "Bạn thường đi đâu vào cuối tuần?",
        "context": "Trả lời: I usually go to the park or the cinema."
      },
      {
        "num": 3,
        "pattern": "How often + do/does + S + V?",
        "vi": "Hỏi tần suất",
        "style": "Dùng How often để hỏi bao lâu một lần",
        "example": "How often do you go to the gym?",
        "exampleVi": "Bạn đến phòng gym bao lâu một lần?",
        "context": "Trả lời bằng trạng từ tần suất hoặc cụm như twice a week, once a month."
      },
      {
        "num": 4,
        "pattern": "The + place + is + position phrase",
        "vi": "Mô tả vị trí địa điểm",
        "style": "Dùng next to, across from, between, on the corner of, near",
        "example": "The pharmacy is next to the bank.",
        "exampleVi": "Nhà thuốc ở bên cạnh ngân hàng.",
        "context": "Có thể nối nhiều vị trí: next to the post office and across from the park."
      }
    ],
    "commonQA": [
      { "q": "Where do you usually go shopping?", "a": "I usually go to the supermarket near my house." },
      { "q": "How often do you eat at a restaurant?", "a": "I sometimes eat out on weekends - maybe twice a month." },
      { "q": "Is there a library near here?", "a": "Yes, there's one next to the school on Nguyen Hue Street." },
      { "q": "Does she often go to the cinema?", "a": "No, she rarely goes. She prefers watching at home." }
    ]
  },
  "listening": {
    "title": "Nghe trả lời - Places & Frequency",
    "transcript": "Listen and choose the correct word to complete each sentence.",
    "translation": "Nghe từng câu có chỗ trống và chọn từ đúng.",
    "audio": "Listen and choose the correct word.",
    "questions": [
      { "q": "She ___ goes to the supermarket on Saturdays.", "options": ["always", "never"], "answer": 0 },
      { "q": "I ___ go to the cinema - I prefer streaming at home.", "options": ["rarely", "usually"], "answer": 0 },
      { "q": "___ do you usually go after work?", "options": ["Where", "When"], "answer": 0 },
      { "q": "___ she go to the gym every day?", "options": ["Do", "Does"], "answer": 1 },
      { "q": "The pharmacy is ___ to the bank.", "options": ["near", "next"], "answer": 1 },
      { "q": "He ___ visits the library - only once a month.", "options": ["often", "rarely"], "answer": 1 },
      { "q": "___ often do you go to the restaurant?", "options": ["How", "What"], "answer": 0 },
      { "q": "The café is ___ from the school.", "options": ["across", "next"], "answer": 0 },
      { "q": "They ___ eat at a restaurant on weekends.", "options": ["sometimes", "never"], "answer": 0 },
      { "q": "The library is ___ the park and the cinema.", "options": ["between", "across"], "answer": 0 },
      { "q": "___ you often go to the park?", "options": ["Do", "Does"], "answer": 0 },
      { "q": "My mother ___ goes to the market every morning.", "options": ["always", "never"], "answer": 0 },
      { "q": "Is there a supermarket ___ here?", "options": ["near", "next"], "answer": 0 },
      { "q": "He ___ go to the bank - he uses the app.", "options": ["never", "always"], "answer": 0 },
      { "q": "There is a post office ___ the corner of Tran Hung Dao Street.", "options": ["on", "at"], "answer": 0 }
    ]
  },
  "translation": {
    "title": "LUYỆN DỊCH: VIỆT ↔ ANH (20 CÂU)",
    "instruction": "Dịch từng câu. Chú ý trạng từ tần suất, địa điểm, Where / How often và giới từ vị trí.",
    "sentences": [
      { "vi": "Cô ấy thường đến siêu thị vào thứ Bảy.", "en": "She usually goes to the supermarket on Saturdays." },
      { "vi": "Tôi hiếm khi đến rạp chiếu phim.", "en": "I rarely go to the cinema." },
      { "vi": "Bạn thường đến đâu sau giờ làm?", "en": "Where do you usually go after work?" },
      { "vi": "Anh ấy không bao giờ đến ngân hàng - anh ấy dùng ứng dụng.", "en": "He never goes to the bank - he uses the app." },
      { "vi": "Bạn đến nhà hàng bao lâu một lần?", "en": "How often do you go to the restaurant?" },
      { "vi": "Nhà thuốc ở bên cạnh ngân hàng.", "en": "The pharmacy is next to the bank." },
      { "vi": "Cô ấy có thường đến thư viện không?", "en": "Does she often go to the library?" },
      { "vi": "Mẹ tôi luôn đi chợ vào buổi sáng.", "en": "My mother always goes to the market in the morning." },
      { "vi": "Có một quán cà phê ở góc đường không?", "en": "Is there a café on the corner of the street?" },
      { "vi": "Thư viện nằm giữa trường học và công viên.", "en": "The library is between the school and the park." },
      { "vi": "Tôi đôi khi ăn ở nhà hàng vào thứ Sáu.", "en": "I sometimes eat at a restaurant on Fridays." },
      { "vi": "Bến xe buýt ở đối diện siêu thị.", "en": "The bus stop is across from the supermarket." },
      { "vi": "Anh ấy đôi khi đến phòng tập gym vào buổi sáng.", "en": "He sometimes goes to the gym in the morning." },
      { "vi": "Cô ấy có đến bưu điện không?", "en": "Does she go to the post office?" },
      { "vi": "Bố tôi thường đến công viên vào cuối tuần.", "en": "My father often goes to the park on weekends." },
      { "vi": "Có bệnh viện nào gần đây không?", "en": "Is there a hospital near here?" },
      { "vi": "Họ không bao giờ đến đồn cảnh sát - may mắn thay!", "en": "They never go to the police station - luckily!" },
      { "vi": "Cô ấy luôn đến quán cà phê sau giờ làm để thư giãn.", "en": "She always goes to the café after work to relax." },
      { "vi": "Bạn thường mua thuốc ở đâu?", "en": "Where do you usually buy medicine?" },
      { "vi": "Siêu thị ở bên cạnh bưu điện và đối diện với công viên.", "en": "The supermarket is next to the post office and across from the park." }
    ]
  },
  "dialogueVideo": {
    "title": "Video hội thoại",
    "label": "At different places in town",
    "url": "https://www.youtube.com/watch?v=A6Vez89aAww",
    "embedUrl": "https://www.youtube.com/embed/A6Vez89aAww",
    "sourceUrl": "https://www.youtube.com/watch?v=A6Vez89aAww",
    "channel": "Easy English",
    "duration": "~17 phút (8 cảnh)",
    "description": "Hội thoại tự nhiên tại 8 địa điểm quen thuộc trong thị trấn: snack bar, shopping mall, dry cleaner's, shoe store, clothes shop, grocery store, gas station, gift shop. Học cách giao tiếp thực tế khi đến từng nơi - hỏi đường trong mall, mua sắm, hỏi giá, yêu cầu giúp đỡ. Phù hợp luyện nghe hội thoại đời thực cấp độ A1/A2.",
    "scenes": [
      { "time": "0:09", "scene": "At the Snack Bar", "keywords": "order, I'd like, how much, here you go" },
      { "time": "3:22", "scene": "Asking for Directions in the Shopping Mall", "keywords": "excuse me, where is, turn left, straight ahead, next to" },
      { "time": "5:04", "scene": "At the Dry Cleaner's", "keywords": "drop off, pick up, ready, stain, receipt" },
      { "time": "6:59", "scene": "At the Shoe Store", "keywords": "size, try on, fit, comfortable, pair" },
      { "time": "8:26", "scene": "At the Clothes Shop", "keywords": "looking for, sale, fitting room, colour, style" },
      { "time": "10:33", "scene": "At the Grocery Store", "keywords": "aisle, on sale, fresh, total, cash or card" },
      { "time": "13:05", "scene": "At the Gas Station", "keywords": "fill up, unleaded, pump, receipt, car wash" },
      { "time": "15:07", "scene": "At the Gift Shop", "keywords": "souvenir, wrap, occasion, recommend, price tag" }
    ],
    "transcript": [
      { "scene": "Snack Bar", "speaker": "A", "en": "Hi! What can I get for you?", "vi": "Xin chào! Bạn muốn gọi gì?" },
      { "scene": "Snack Bar", "speaker": "B", "en": "I'd like a hot dog and a soda, please.", "vi": "Tôi muốn một cái hot dog và một ly nước ngọt." },
      { "scene": "Snack Bar", "speaker": "A", "en": "That'll be four dollars, please.", "vi": "Tổng cộng bốn đô la." },
      { "scene": "Snack Bar", "speaker": "B", "en": "Here you go. Thank you!", "vi": "Đây tiền. Cảm ơn!" },
      { "scene": "Directions", "speaker": "A", "en": "Excuse me, where is the shoe store?", "vi": "Xin lỗi, cửa hàng giày ở đâu vậy?" },
      { "scene": "Directions", "speaker": "B", "en": "Go straight ahead and turn left at the fountain. It's next to the café.", "vi": "Đi thẳng và rẽ trái ở đài phun nước. Nó ở bên cạnh quán cà phê." },
      { "scene": "Directions", "speaker": "A", "en": "Thank you so much!", "vi": "Cảm ơn bạn nhiều lắm!" }
    ],
    "listenChoose": true,
    "sentenceOrder": true,
    "listenPickLine": [
      { "prompt": "What can I get for you?", "options": [{ "text": "Yes, I do.", "img": "✅" }, { "text": "I'd like a hot dog and a soda, please.", "img": "🌭" }, { "text": "It's next to the café.", "img": "☕" }, { "text": "Go straight ahead.", "img": "➡️" }], "answer": 1 },
      { "prompt": "Where is the shoe store?", "options": [{ "text": "It costs four dollars.", "img": "💵" }, { "text": "I'd like to try it on.", "img": "👟" }, { "text": "Go straight and turn left at the fountain.", "img": "⛲" }, { "text": "It's across from the bank.", "img": "🏦" }], "answer": 2 },
      { "prompt": "next to", "options": [{ "text": "đối diện với", "img": "🔁" }, { "text": "ở góc đường", "img": "🔲" }, { "text": "bên cạnh", "img": "↔️" }, { "text": "ở giữa", "img": "📍" }], "answer": 2 },
      { "prompt": "Go straight ahead and turn left.", "options": [{ "text": "Mô tả giá cả", "img": "💵" }, { "text": "Chỉ đường đến địa điểm", "img": "🧭" }, { "text": "Giờ mở cửa của cửa hàng", "img": "🕘" }, { "text": "Tên cửa hàng cần tìm", "img": "🏪" }], "answer": 1 }
    ],
    "sentenceOrderLines": [
      "I'd like a hot dog and a soda, please.",
      "That'll be four dollars, please.",
      "Excuse me, where is the shoe store?",
      "Go straight ahead and turn left at the fountain. It's next to the café."
    ],
    "videoQuestions": [
      { "q": "Ở Snack Bar, người khách gọi gì?", "options": ["A burger and a coffee", "A hot dog and a soda", "A sandwich and a juice", "A pizza and water"], "answer": 1 },
      { "q": "Để đến shoe store, bạn phải làm gì?", "options": ["Turn right at the fountain", "Go straight and turn left at the fountain", "Go upstairs and turn right", "Take the elevator to floor 2"], "answer": 1 },
      { "q": "Shoe store nằm ở đâu?", "options": ["Across from the café", "Between the fountain and the bank", "Next to the café", "On the corner of the mall"], "answer": 2 },
      { "q": "Tổng tiền ở Snack Bar là bao nhiêu?", "options": ["Four dollars", "Five dollars", "Three dollars", "Six dollars"], "answer": 0 }
    ],
    "fillConversation": [
      {
        "lines": [
          { "speaker": "A", "text": "Excuse me, [[where]] is the grocery store?" },
          { "speaker": "B", "text": "Go [[straight]] ahead and it's on your right." },
          { "speaker": "A", "text": "Is it [[next]] to the pharmacy?" },
          { "speaker": "B", "text": "Yes, exactly! You can't miss it." }
        ],
        "wordBank": ["next", "straight", "where"],
        "explanation": [
          "where → Where is = hỏi vị trí địa điểm",
          "straight → go straight ahead = đi thẳng",
          "next → next to = bên cạnh"
        ]
      },
      {
        "lines": [
          { "speaker": "A", "text": "Excuse me, [[does]] your mother go to the market every day?" },
          { "speaker": "B", "text": "Yes! She [[always]] goes in the morning - she loves fresh vegetables!" },
          { "speaker": "A", "text": "Is the market [[next]] to your house?" },
          { "speaker": "B", "text": "Yes, it's very close. I [[never]] go there myself though - I prefer the supermarket." },
          { "speaker": "A", "text": "How [[often]] do you go to the supermarket?" }
        ],
        "wordBank": ["always", "does", "next", "often", "never"],
        "explanation": [
          "does → câu hỏi yes/no với chủ ngữ ngôi 3 số ít \"your mother\"",
          "always → trạng từ tần suất 100%, trước động từ chính \"goes\"",
          "next → next to = bên cạnh",
          "never → không bao giờ (0%), trước động từ chính \"go\"",
          "often → How often = hỏi về tần suất"
        ]
      }
    ]
  },
  "speaking": {
    "title": "Luyện nói (AI) - Places in Town",
    "turns": [
      { "id": 1, "ai": { "textEn": "What places are there near your home?", "textVn": "Gần nhà bạn có những địa điểm nào?", "audioUrl": "What places are there near your home?" }, "user": { "formula": "There is/are + [địa điểm] + [vị trí: next to / across from / on the corner of...].", "sampleEn": "Near my home, there's a supermarket and a café. The supermarket is next to the bank, and the café is across from the park.", "sampleVn": "Gần nhà tôi có một siêu thị và một quán cà phê. Siêu thị ở cạnh ngân hàng, và quán cà phê đối diện công viên.", "sampleAudioUrl": "Near my home, there's a supermarket and a café. The supermarket is next to the bank, and the café is across from the park." } },
      { "id": 2, "ai": { "textEn": "How often do you go to the supermarket? What about the cinema?", "textVn": "Bạn đi siêu thị bao lâu một lần? Còn rạp chiếu phim thì sao?", "audioUrl": "How often do you go to the supermarket? What about the cinema?" }, "user": { "formula": "I [always/usually/often/sometimes/rarely/never] go to the [địa điểm] + [thời gian].", "sampleEn": "I usually go to the supermarket twice a week, always on Saturdays. I rarely go to the cinema - I prefer watching at home.", "sampleVn": "Tôi thường đi siêu thị hai lần một tuần, luôn vào thứ Bảy. Tôi hiếm khi đến rạp phim - tôi thích xem ở nhà hơn.", "sampleAudioUrl": "I usually go to the supermarket twice a week, always on Saturdays. I rarely go to the cinema. I prefer watching at home." } },
      { "id": 3, "ai": { "textEn": "Excuse me, how do I get to the nearest pharmacy?", "textVn": "Xin lỗi, làm sao để đến nhà thuốc gần nhất?", "audioUrl": "Excuse me, how do I get to the nearest pharmacy?" }, "user": { "formula": "Go straight / Turn left / Turn right + It's next to / across from / on the corner of [địa điểm].", "sampleEn": "Go straight ahead and turn right at the traffic lights. The pharmacy is on the corner, next to the bank. You can't miss it!", "sampleVn": "Đi thẳng và rẽ phải ở đèn giao thông. Nhà thuốc ở góc đường, bên cạnh ngân hàng. Bạn sẽ thấy ngay!", "sampleAudioUrl": "Go straight ahead and turn right at the traffic lights. The pharmacy is on the corner, next to the bank. You can't miss it!" } },
      { "id": 4, "ai": { "textEn": "Can you describe where the places near you are located?", "textVn": "Bạn có thể mô tả vị trí các địa điểm gần bạn không?", "audioUrl": "Can you describe where the places near you are located?" }, "user": { "formula": "The [địa điểm] is [next to / across from / between / on the corner of] + [địa điểm khác / tên đường].", "sampleEn": "The pharmacy is next to the bank and across from the park. There's a bus stop on the corner of my street.", "sampleVn": "Nhà thuốc ở cạnh ngân hàng và đối diện công viên. Có một bến xe buýt ở góc đường của tôi.", "sampleAudioUrl": "The pharmacy is next to the bank and across from the park. There's a bus stop on the corner of my street." } },
      { "id": 5, "ai": { "textEn": "What is your favourite place in town? Why do you go there?", "textVn": "Địa điểm yêu thích của bạn trong thị trấn là gì? Vì sao bạn đến đó?", "audioUrl": "What is your favourite place in town? Why do you go there?" }, "user": { "formula": "My favourite place is the [địa điểm]. I [always/usually] go there + [lý do/thời gian].", "sampleEn": "My favourite place is the café near my house. I usually go there on weekend mornings to relax and read. It's between the park and the library - a perfect spot!", "sampleVn": "Địa điểm yêu thích của tôi là quán cà phê gần nhà. Tôi thường đến đó vào sáng cuối tuần để thư giãn và đọc sách. Nó nằm giữa công viên và thư viện - một nơi hoàn hảo!", "sampleAudioUrl": "My favourite place is the café near my house. I usually go there on weekend mornings to relax and read. It's between the park and the library. A perfect spot!" } }
    ]
  },
  "minitest": [
    { "q": "She ___ goes to the supermarket on Saturdays.", "options": ["never", "always", "rarely", "on weekends"], "answer": 1 },
    { "q": "Câu nào đúng về vị trí trạng từ tần suất?", "options": ["She goes always to the park.", "She always goes to the park.", "Always she goes to the park.", "She goes to the park always."], "answer": 1 },
    { "q": "\"Library\" nghĩa là gì?", "options": ["siêu thị", "bệnh viện", "thư viện", "ngân hàng"], "answer": 2 },
    { "q": "The pharmacy is ___ the bank.", "options": ["across", "between", "next to", "on the corner"], "answer": 2 },
    { "q": "___ do you usually go after work?", "options": ["Where", "When", "What", "Who"], "answer": 0 },
    { "q": "How often ___ she go to the library?", "options": ["do", "does", "is", "has"], "answer": 1 },
    { "q": "Dịch: Nhà thuốc ở đối diện với siêu thị.", "options": ["The pharmacy is next to the supermarket.", "The pharmacy is near the supermarket.", "The pharmacy is across from the supermarket.", "The pharmacy is between the supermarket."], "answer": 2 },
    { "q": "Thang tần suất đúng từ cao đến thấp:", "options": ["always → often → sometimes → usually → rarely → never", "always → usually → often → sometimes → rarely → never", "never → rarely → sometimes → often → usually → always", "always → sometimes → often → usually → rarely → never"], "answer": 1 },
    { "q": "I ___ go to the cinema - I prefer Netflix!", "options": ["always", "usually", "rarely", "often"], "answer": 2 },
    { "q": "The café is ___ the park and the library.", "options": ["across from", "next to", "between", "on the corner of"], "answer": 2 }
  ],
  "mindmap": {
    "type": "structured",
    "center": "PLACES IN TOWN & FREQUENCY ADVERBS",
    "branches": [
      { "icon": "🏙️", "label": "PLACES IN TOWN", "sub": "Địa điểm", "items": ["supermarket", "hospital", "school", "park", "bank", "library", "restaurant", "cinema", "post office", "gym", "pharmacy", "market", "café", "bus stop", "police station"] },
      { "icon": "📊", "label": "FREQUENCY ADVERBS", "sub": "Tần suất", "items": ["always (100%)", "usually (80%)", "often (60%)", "sometimes (40%)", "rarely (20%)", "never (0%)"] },
      { "icon": "📍", "label": "POSITION PHRASES", "sub": "Vị trí", "items": ["next to", "across from / opposite", "between ... and ...", "on the corner of", "near / nearby"] },
      { "icon": "❓", "label": "WHERE QUESTIONS", "sub": "Where do/does + S + V?", "items": ["Where do you go?", "Where does she buy groceries?", "I go to the supermarket.", "There is/are + place + position"] },
      { "icon": "🔄", "label": "HOW OFTEN?", "sub": "How often do/does + S + V?", "items": ["I usually go to...", "She never goes to...", "twice a week", "once a month"] }
    ]
  },
  "homeworkRich": {
    "title": "BÀI TẬP VỀ NHÀ - BUỔI 10: MY NEIGHBOURHOOD & MY TOWN MAP",
    "submit": "Nộp bài qua nhóm lớp",
    "deadline": "Trước buổi học tiếp theo",
    "tasks": [
      {
        "icon": "✏️",
        "title": "BÀI TẬP 1: VIẾT - MY NEIGHBOURHOOD",
        "badge": "Bắt buộc",
        "desc": "Viết 1 đoạn văn ngắn (6-8 câu) mô tả các địa điểm gần nhà bạn và thói quen đến những nơi đó.",
        "items": [
          "Nêu ít nhất 4 địa điểm khác nhau trong khu vực",
          "Dùng ít nhất 3 trạng từ tần suất khác nhau",
          "Có ít nhất 1 câu mô tả vị trí (next to / across from / between...)",
          "Có ít nhất 1 câu hỏi How often hoặc Where",
          "Mẫu: Near my house, there is a supermarket, a café, and a small park. The café is next to the supermarket and across from the bus stop. I usually go to the supermarket twice a week, always on Saturdays. I sometimes go to the café after work to relax. I never go to the cinema - I prefer watching at home. My mother always goes to the market every morning - she says it's much fresher!"
        ]
      },
      {
        "icon": "🗺️",
        "title": "BÀI TẬP 2: VẼ & MÔ TẢ - MY TOWN MAP",
        "badge": "Khuyến khích",
        "desc": "Vẽ một bản đồ đơn giản của khu phố hoặc thị trấn tưởng tượng của bạn. Đặt tên cho ít nhất 6 địa điểm và viết 5 câu mô tả vị trí các địa điểm đó bằng tiếng Anh.",
        "items": [
          "The library is between the school and the park.",
          "There is a pharmacy on the corner of Main Street.",
          "The bank is next to the post office.",
          "The café is across from the cinema.",
          "The supermarket is near the bus stop.",
          "Viết thêm 3 câu nói về tần suất bạn và gia đình đến các địa điểm đó."
        ],
        "note": "Khuyến khích chụp ảnh bản đồ tay hoặc tạo trên máy tính để chia sẻ với lớp."
      }
    ]
  },
  "homework": [
    "Viết đoạn văn 6-8 câu tên My Neighbourhood, có ít nhất 4 địa điểm, 3 trạng từ tần suất, 1 câu vị trí và 1 câu hỏi How often hoặc Where.",
    "Vẽ My Town Map với ít nhất 6 địa điểm, viết 5 câu mô tả vị trí và thêm 3 câu về tần suất đến các địa điểm đó."
  ],
  "sectionFlow": [
    "intro",
    "review",
    "video",
    "vocab",
    "vocab_match",
    "listen_pick",
    "grammar",
    "listen_quiz",
    "translate",
    "dialogue_video",
    "dialogue_video_quiz",
    "dialogue_video_order",
    "speaking",
    "minitest",
    "mindmap",
    "homework"
  ],
  "skipSections": [
    "writing",
    "story",
    "dictation",
    "sprint"
  ]
};

const LESSON_11_TEMPLATE = {
  "title": "Các phòng & There is/are",
  "subtitle": "Rooms in a House",
  "objectives": [
    "Gọi tên các phòng và đồ vật quen thuộc trong nhà bằng tiếng Anh",
    "Dùng đúng **There is / There are** để nói “có một / có nhiều” trong một căn phòng",
    "Đặt câu hỏi và trả lời với **Is there...? / Are there...?**",
    "Mô tả phòng ngủ, phòng khách, phòng bếp, căn hộ hoặc ngôi nhà của mình bằng câu đơn giản chuẩn A1"
  ],
  "review": {
    "title": "Ôn bài cũ - Places in town (Buổi 10)",
    "questions": [
      {
        "q": "There is a ___ near my house.",
        "answer": "supermarket"
      },
      {
        "q": "The café is ___ the supermarket.",
        "answer": "next to"
      },
      {
        "q": "The bus stop is ___ the park.",
        "answer": "across from"
      },
      {
        "q": "How often do you go to the library? — I ___ go to the library.",
        "answer": "sometimes"
      },
      {
        "q": "Does she go to the cinema on weekends? — Yes, she ___.",
        "answer": "does"
      }
    ],
    "structures": [
      "There is a supermarket near my house.",
      "The café is next to the supermarket.",
      "The bus stop is across from the park.",
      "How often do you go to the library? — I sometimes go to the library.",
      "Does she go to the cinema on weekends? — Yes, she does."
    ],
    "reviewGames": {
      "title": "Ôn tập Buổi 10 - Places in town",
      "intro": "Làm 2 thử thách để ôn địa điểm trong thị trấn, giới từ vị trí và How often trước khi học Rooms in a House.",
      "vocabulary": [
        { "en": "supermarket", "vi": "siêu thị", "img": "🏙️", "ipa": "", "options": ["ngân hàng", "siêu thị", "công viên", "trường học"], "answer": 1 },
        { "en": "café", "vi": "quán cà phê", "img": "🏙️", "ipa": "", "options": ["quán cà phê", "thư viện", "bệnh viện", "rạp phim"], "answer": 0 },
        { "en": "park", "vi": "công viên", "img": "🏙️", "ipa": "", "options": ["bến xe buýt", "nhà hàng", "công viên", "hiệu thuốc"], "answer": 2 },
        { "en": "bus stop", "vi": "bến xe buýt", "img": "🏙️", "ipa": "", "options": ["bến xe buýt", "ngân hàng", "trường học", "cửa hàng"], "answer": 0 },
        { "en": "hospital", "vi": "bệnh viện", "img": "🏙️", "ipa": "", "options": ["khách sạn", "bệnh viện", "rạp phim", "công viên"], "answer": 1 },
        { "en": "bank", "vi": "ngân hàng", "img": "🏙️", "ipa": "", "options": ["ngân hàng", "thư viện", "nhà hàng", "trường học"], "answer": 0 },
        { "en": "library", "vi": "thư viện", "img": "🏙️", "ipa": "", "options": ["rạp phim", "thư viện", "hiệu thuốc", "siêu thị"], "answer": 1 },
        { "en": "restaurant", "vi": "nhà hàng", "img": "🏙️", "ipa": "", "options": ["nhà hàng", "ngân hàng", "bến xe buýt", "bệnh viện"], "answer": 0 },
        { "en": "cinema", "vi": "rạp chiếu phim", "img": "🏙️", "ipa": "", "options": ["thư viện", "cửa hàng", "rạp chiếu phim", "công viên"], "answer": 2 },
        { "en": "pharmacy", "vi": "hiệu thuốc", "img": "🏙️", "ipa": "", "options": ["hiệu thuốc", "trường học", "nhà hàng", "quán cà phê"], "answer": 0 },
        { "en": "next to", "vi": "bên cạnh", "img": "🏙️", "ipa": "", "options": ["đối diện", "phía sau", "bên cạnh", "ở giữa"], "answer": 2 },
        { "en": "across from", "vi": "đối diện", "img": "🏙️", "ipa": "", "options": ["ở gần", "đối diện", "phía trước", "bên cạnh"], "answer": 1 },
        { "en": "near", "vi": "gần", "img": "🏙️", "ipa": "", "options": ["xa", "ở giữa", "gần", "phía sau"], "answer": 2 },
        { "en": "between", "vi": "ở giữa", "img": "🏙️", "ipa": "", "options": ["đối diện", "ở giữa", "phía trước", "bên cạnh"], "answer": 1 },
        { "en": "behind", "vi": "phía sau", "img": "🏙️", "ipa": "", "options": ["phía sau", "phía trước", "gần", "ở giữa"], "answer": 0 },
        { "en": "in front of", "vi": "phía trước", "img": "🏙️", "ipa": "", "options": ["bên cạnh", "phía sau", "phía trước", "đối diện"], "answer": 2 },
        { "en": "go to the park", "vi": "đi đến công viên", "img": "🏙️", "ipa": "", "options": ["đi đến công viên", "đi đến ngân hàng", "đi đến trường", "đi đến thư viện"], "answer": 0 },
        { "en": "go to the library", "vi": "đi đến thư viện", "img": "🏙️", "ipa": "", "options": ["đi đến rạp phim", "đi đến thư viện", "đi đến nhà hàng", "đi đến hiệu thuốc"], "answer": 1 },
        { "en": "on weekends", "vi": "vào cuối tuần", "img": "🏙️", "ipa": "", "options": ["vào buổi sáng", "vào ngày thường", "vào cuối tuần", "vào ban đêm"], "answer": 2 },
        { "en": "How often", "vi": "Thường xuyên như thế nào", "img": "🏙️", "ipa": "", "options": ["Ở đâu", "Khi nào", "Thường xuyên như thế nào", "Mấy giờ"], "answer": 2 }
      ],
      "quizBomb": {
        "title": "Quiz Bomb Review - Places in town",
        "instruction": "Trả lời nhanh 20 câu ôn tập Buổi 10 trong 5 giây mỗi câu.",
        "questions": [
          { "q": "Where ___ the supermarket?", "options": ["do", "does", "is", "are"], "answer": 2 },
          { "q": "The café is ___ the supermarket.", "options": ["go to", "next to", "often", "does"], "answer": 1 },
          { "q": "How often ___ you go to the park?", "options": ["is", "are", "do", "does"], "answer": 2 },
          { "q": "How often ___ she go to the cinema?", "options": ["do", "does", "is", "are"], "answer": 1 },
          { "q": "The bank is across ___ the pharmacy.", "options": ["to", "at", "from", "in"], "answer": 2 },
          { "q": "The park is ___ the school and the library.", "options": ["between", "behind", "often", "does"], "answer": 0 },
          { "q": "She ___ goes to the library on Sundays.", "options": ["next", "often", "across", "between"], "answer": 1 },
          { "q": "Does he go to the cinema? → Trả lời đúng:", "options": ["Yes, he do.", "Yes, he does.", "Yes, he is.", "Yes, he are."], "answer": 1 },
          { "q": "Câu nào đúng?", "options": ["She go to the bank.", "She goes to the bank.", "She going to the bank.", "She does goes to the bank."], "answer": 1 },
          { "q": "Near nghĩa là gì?", "options": ["ở xa", "gần", "đối diện", "ở giữa"], "answer": 1 },
          { "q": "Behind nghĩa là gì?", "options": ["phía trước", "ở giữa", "phía sau", "bên cạnh"], "answer": 2 },
          { "q": "In front of nghĩa là gì?", "options": ["phía trước", "phía sau", "đối diện", "gần"], "answer": 0 },
          { "q": "Where do you go on weekends? → Trả lời tự nhiên:", "options": ["I go to the park.", "I often.", "It is next to.", "Yes, I does."], "answer": 0 },
          { "q": "The bus stop is next to the café. nghĩa là gì?", "options": ["Bến xe buýt ở sau quán cà phê.", "Bến xe buýt ở cạnh quán cà phê.", "Bến xe buýt ở giữa quán cà phê.", "Bến xe buýt đối diện quán cà phê."], "answer": 1 },
          { "q": "She ___ to the supermarket every Friday.", "options": ["go", "goes", "going", "does goes"], "answer": 1 },
          { "q": "Do they go to the restaurant? → Trả lời phủ định:", "options": ["No, they doesn't.", "No, they don't.", "No, they aren't.", "No, they not."], "answer": 1 },
          { "q": "The library is ___ from the park.", "options": ["between", "next", "across", "behind"], "answer": 2 },
          { "q": "How often do you go to the café? → Câu trả lời đúng:", "options": ["I usually go there on weekends.", "It is next to the bank.", "Yes, it is.", "Where is the café?"], "answer": 0 },
          { "q": "Pharmacy nghĩa là gì?", "options": ["nhà hàng", "hiệu thuốc", "rạp phim", "ngân hàng"], "answer": 1 },
          { "q": "Câu nào sai?", "options": ["The café is next to the bank.", "The park is behind the school.", "She often go to the library.", "Do you go to the supermarket?"], "answer": 2 }
        ]
      }
    },
    "summary": "Buổi này chuyển từ địa điểm trong thành phố sang địa điểm trong nhà: <b>rooms in a house</b>, <b>things in rooms</b>, và cách mô tả bằng <b>There is / There are</b>."
  },
  "video": {
    "title": "Rooms in the House Song / Rooms Vocabulary",
    "url": "https://www.youtube.com/watch?v=R9intHqlzhc",
    "sourceUrl": "https://www.youtube.com/watch?v=R9intHqlzhc",
    "description": "Video giúp học viên nhận diện nhanh các phòng trong nhà bằng hình ảnh và âm thanh. Trọng tâm gồm: bedroom, bathroom, kitchen, living room, dining room, garden, garage. Học viên nghe tên phòng, nhìn hình và lặp lại theo mẫu để ghi nhớ cách phát âm.",
    "duration": "2-5 phút",
    "sceneSummary": "cảnh chính trong video 1",
    "scenes": [
      { "label": "Giới thiệu chủ đề rooms in the house." },
      { "label": "Các phòng chính: bedroom, bathroom, kitchen, living room." },
      { "label": "Các khu vực mở rộng: dining room, garden, garage." }
    ],
    "questions": [
      {
        "id": 1,
        "question": "Bedroom nghĩa là gì?",
        "options": ["phòng bếp", "phòng ngủ", "phòng tắm", "phòng khách"],
        "answer": 1
      },
      {
        "id": 2,
        "question": "Kitchen nghĩa là gì?",
        "options": ["phòng bếp", "phòng ăn", "ban công", "khu vườn"],
        "answer": 0
      },
      {
        "id": 3,
        "question": "Câu nào đúng với 1 cái giường?",
        "options": ["There are a bed.", "There is a bed.", "There be a bed.", "There does a bed."],
        "answer": 1
      },
      {
        "id": 4,
        "question": "Câu nào đúng với 2 cái ghế?",
        "options": ["There is two chairs.", "There are two chairs.", "There are a chair.", "There does two chairs."],
        "answer": 1
      },
      {
        "id": 5,
        "question": "Câu hỏi đúng là gì?",
        "options": ["Is there a TV?", "Are there a TV?", "Do there a TV?", "Does there TV?"],
        "answer": 0
      },
      {
        "id": 6,
        "question": "Are there any windows? trả lời khẳng định đúng là:",
        "options": ["Yes, there is.", "Yes, there are.", "Yes, it is.", "Yes, they do."],
        "answer": 1
      }
    ]
  },
  "vocabGroups": {
    "introVideo": "CÁC PHÒNG TRONG NHÀ — Rooms in a House (15 từ)",
    "dialogueVideo": "ĐỒ VẬT & CỤM TỪ THẬT TRONG VIDEO HỘI THOẠI (14 từ/cụm)",
    "dialogue_keywords": "CỤM TỪ KHOÁ HỘI THOẠI (10 từ/cụm)"
  },
  "matchAll": true,
  "listenPickAll": true,
  "vocabulary": [
    { "group": "introVideo", "en": "house", "vi": "ngôi nhà", "ipa": "/haʊs/", "img": "🏠", "example": "This is my house." },
    { "group": "introVideo", "en": "apartment", "vi": "căn hộ", "ipa": "/əˈpɑːrtmənt/", "img": "🏢", "example": "I live in an apartment." },
    { "group": "introVideo", "en": "room", "vi": "căn phòng", "ipa": "/ruːm/", "img": "🚪", "example": "There is a room upstairs." },
    { "group": "introVideo", "en": "bedroom", "vi": "phòng ngủ", "ipa": "/ˈbedruːm/", "img": "🛏️", "example": "There is a bed in my bedroom." },
    { "group": "introVideo", "en": "bathroom", "vi": "phòng tắm", "ipa": "/ˈbæθruːm/", "img": "🚿", "example": "There is a mirror in the bathroom." },
    { "group": "introVideo", "en": "kitchen", "vi": "phòng bếp", "ipa": "/ˈkɪtʃən/", "img": "🍳", "example": "There is a fridge in the kitchen." },
    { "group": "introVideo", "en": "living room", "vi": "phòng khách", "ipa": "/ˈlɪvɪŋ ruːm/", "img": "🛋️", "example": "There is a sofa in the living room." },
    { "group": "introVideo", "en": "dining room", "vi": "phòng ăn", "ipa": "/ˈdaɪnɪŋ ruːm/", "img": "🍽️", "example": "There are chairs in the dining room." },
    { "group": "introVideo", "en": "office", "vi": "phòng làm việc / văn phòng", "ipa": "/ˈɔːfɪs/", "img": "💻", "example": "My office is around the corner." },
    { "group": "dialogue_keywords", "en": "studio apartment", "vi": "căn hộ studio", "ipa": "/ˈstuːdioʊ əˈpɑːrtmənt/", "img": "🏢", "example": "It is a studio apartment." },
    { "group": "introVideo", "en": "balcony", "vi": "ban công", "ipa": "/ˈbælkəni/", "img": "🌇", "example": "There are plants on the balcony." },
    { "group": "introVideo", "en": "garden", "vi": "khu vườn", "ipa": "/ˈɡɑːrdən/", "img": "🌳", "example": "There is a small garden." },
    { "group": "introVideo", "en": "garage", "vi": "nhà để xe", "ipa": "/ɡəˈrɑːʒ/", "img": "🚗", "example": "There is a car in the garage." },
    { "group": "introVideo", "en": "upstairs", "vi": "tầng trên", "ipa": "/ˌʌpˈsterz/", "img": "⬆️", "example": "My bedroom is upstairs." },
    { "group": "introVideo", "en": "downstairs", "vi": "tầng dưới", "ipa": "/ˌdaʊnˈsterz/", "img": "⬇️", "example": "The kitchen is downstairs." },
    { "group": "dialogue_keywords", "en": "new apartment", "vi": "căn hộ mới", "ipa": "/nuː əˈpɑːrtmənt/", "img": "🏢", "example": "Welcome to my new apartment." },
    { "group": "dialogue_keywords", "en": "old apartment", "vi": "căn hộ cũ", "ipa": "/oʊld əˈpɑːrtmənt/", "img": "🏚️", "example": "I liked your old apartment better." },
    { "group": "dialogue_keywords", "en": "nice view", "vi": "tầm nhìn đẹp", "ipa": "/naɪs vjuː/", "img": "🌇", "example": "Your old apartment had a nice view." },
    { "group": "dialogue_keywords", "en": "across the street", "vi": "bên kia đường", "ipa": "/əˈkrɔːs ðə striːt/", "img": "🛣️", "example": "The park is just across the street." },
    { "group": "dialogue_keywords", "en": "around the corner", "vi": "ngay gần đây / quanh góc phố", "ipa": "/əraʊnd ðə ˈkɔːrnər/", "img": "↩️", "example": "My office is around the corner." },
    { "group": "dialogue_keywords", "en": "refrigerator", "vi": "tủ lạnh", "ipa": "/rɪˈfrɪdʒəreɪtər/", "img": "🧊", "example": "Nice refrigerator." },
    { "group": "dialogueVideo", "en": "small", "vi": "nhỏ", "ipa": "/smɔːl/", "img": "📏", "example": "The kitchen is a little small." },
    { "group": "dialogueVideo", "en": "a little small", "vi": "hơi nhỏ", "ipa": "/ə ˈlɪtəl smɔːl/", "img": "📏", "example": "It is a little small, but I like it." },
    { "group": "dialogueVideo", "en": "dining room", "vi": "phòng ăn", "ipa": "/ˈdaɪnɪŋ ruːm/", "img": "🍽️", "example": "There's the dining room." },
    { "group": "dialogueVideo", "en": "living room", "vi": "phòng khách", "ipa": "/ˈlɪvɪŋ ruːm/", "img": "🛋️", "example": "There's the living room." },
    { "group": "dialogueVideo", "en": "chair", "vi": "cái ghế", "ipa": "/tʃer/", "img": "🪑", "example": "The chairs are nice." },
    { "group": "dialogueVideo", "en": "sofa", "vi": "ghế sofa", "ipa": "/ˈsoʊfə/", "img": "🛋️", "example": "I like the sofa." },
    { "group": "dialogue_keywords", "en": "dresser", "vi": "tủ ngăn kéo / tủ quần áo", "ipa": "/ˈdresər/", "img": "🗄️", "example": "Why is the dresser in the living room?" },
    { "group": "dialogueVideo", "en": "place", "vi": "chỗ / nơi", "ipa": "/pleɪs/", "img": "📍", "example": "There is no place for it." },
    { "group": "dialogueVideo", "en": "no place else", "vi": "không còn chỗ nào khác", "ipa": "/noʊ pleɪs els/", "img": "🚫", "example": "There's no place else for it to go." },
    { "group": "dialogueVideo", "en": "other rooms", "vi": "những phòng khác", "ipa": "/ˈʌðər ruːmz/", "img": "🚪", "example": "Where are the other rooms?" },
    { "group": "dialogue_keywords", "en": "no other rooms", "vi": "không có phòng nào khác", "ipa": "/noʊ ˈʌðər ruːmz/", "img": "🚫🚪", "example": "There are no other rooms." },
    { "group": "dialogueVideo", "en": "This is it.", "vi": "Chỉ có vậy thôi.", "ipa": "/ðɪs ɪz ɪt/", "img": "✅", "example": "This is it." },
    { "group": "dialogueVideo", "en": "bedroom", "vi": "phòng ngủ", "ipa": "/ˈbedruːm/", "img": "🛏️", "example": "Where's the bedroom?" },
    { "group": "dialogueVideo", "en": "bathroom", "vi": "phòng tắm", "ipa": "/ˈbæθruːm/", "img": "🚿", "example": "What about the bathroom?" },
    { "group": "dialogueVideo", "en": "Ta-da!", "vi": "Đây rồi! / bất ngờ chưa!", "ipa": "/təˈdɑː/", "img": "🎉", "example": "Ta-da!" },
    { "group": "dialogueVideo", "en": "I'm afraid to ask.", "vi": "Tôi sợ phải hỏi.", "ipa": "/aɪm əˈfreɪd tu æsk/", "img": "😅", "example": "I'm afraid to ask about the bathroom." },
    { "group": "dialogue_keywords", "en": "I think it's nice.", "vi": "Tôi nghĩ nó đẹp.", "ipa": "/aɪ θɪŋk ɪts naɪs/", "img": "✨", "example": "I think it's nice." },
    { "group": "dialogueVideo", "en": "better", "vi": "tốt hơn / thích hơn", "ipa": "/ˈbetər/", "img": "👍", "example": "I liked your old apartment better." }
  ],
  "listenPick": {
    "title": "Nghe chọn từ",
    "instruction": "Nghe phát âm và chọn nghĩa tiếng Việt chính xác.",
    "questions": [
      { "audio": "bedroom", "options": ["phòng ngủ", "phòng tắm", "phòng bếp", "phòng khách"], "answer": 0 },
      { "audio": "bathroom", "options": ["phòng ăn", "phòng tắm", "ban công", "khu vườn"], "answer": 1 },
      { "audio": "kitchen", "options": ["phòng bếp", "phòng khách", "phòng học", "nhà để xe"], "answer": 0 },
      { "audio": "living room", "options": ["phòng tắm", "phòng ăn", "phòng khách", "hành lang"], "answer": 2 },
      { "audio": "dining room", "options": ["phòng ngủ", "phòng ăn", "ban công", "nhà để xe"], "answer": 1 },
      { "audio": "office", "options": ["phòng làm việc / văn phòng", "phòng ngủ", "nhà để xe", "khu vườn"], "answer": 0 },
      { "audio": "studio apartment", "options": ["nhà lớn nhiều tầng", "căn hộ studio", "trường học", "khách sạn"], "answer": 1 },
      { "audio": "new apartment", "options": ["căn hộ mới", "căn hộ cũ", "phòng bếp", "phòng ăn"], "answer": 0 },
      { "audio": "old apartment", "options": ["căn hộ mới", "căn hộ cũ", "nhà để xe", "phòng tắm"], "answer": 1 },
      { "audio": "nice view", "options": ["căn phòng nhỏ", "tầm nhìn đẹp", "cái ghế đẹp", "phòng ăn"], "answer": 1 },
      { "audio": "across the street", "options": ["bên kia đường", "phía sau nhà", "trên bàn", "cạnh tủ lạnh"], "answer": 0 },
      { "audio": "around the corner", "options": ["ngay gần đây / quanh góc phố", "ở tầng trên", "ở giữa phòng", "dưới ghế"], "answer": 0 },
      { "audio": "refrigerator", "options": ["gương", "tủ lạnh", "kệ sách", "cửa sổ"], "answer": 1 },
      { "audio": "sofa", "options": ["tủ lạnh", "ghế sofa", "đèn", "cửa sổ"], "answer": 1 },
      { "audio": "dresser", "options": ["tủ ngăn kéo / tủ quần áo", "bức tranh", "vòi sen", "cây cảnh"], "answer": 0 },
      { "audio": "a little small", "options": ["rất lớn", "hơi nhỏ", "rất đẹp", "rất xa"], "answer": 1 },
      { "audio": "no place else", "options": ["không còn chỗ nào khác", "có nhiều phòng", "ở bên kia đường", "cạnh văn phòng"], "answer": 0 },
      { "audio": "other rooms", "options": ["những phòng khác", "cái ghế khác", "nhà khác", "đường khác"], "answer": 0 },
      { "audio": "no other rooms", "options": ["không có phòng nào khác", "có nhiều phòng khác", "không có tủ lạnh", "không có ghế sofa"], "answer": 0 },
      { "audio": "I think it's nice.", "options": ["Tôi nghĩ nó đẹp.", "Tôi không thích nó.", "Nó ở bên kia đường.", "Đây là phòng ngủ."], "answer": 0 }
    ]
  },
  "grammar": {
    "title": "4 CẤU TRÚC CÂU QUAN TRỌNG — THERE IS / THERE ARE",
    "badge": "THERE IS / THERE ARE",
    "formula": "There is + a/an + N (số ít)  /  There are + Ns (số nhiều)",
    "intro": "Dùng There is / There are để nói 'có một / có nhiều' cái gì đó trong một không gian (căn phòng, ngôi nhà).",
    "structures": [
      {
        "num": 1,
        "pattern": "There is + danh từ số ít",
        "vi": "Dùng khi phía sau là một người / một vật / một phòng / một đồ vật",
        "style": "There is + a/an + noun. / There is + one + noun. / There's + a/an + noun.",
        "example": "There is a bed in my bedroom.",
        "exampleVi": "Có một cái giường trong phòng ngủ của tôi.",
        "context": "Ví dụ khác: There is a fridge in the kitchen. / There is a mirror in the bathroom. / There is a picture on the wall. | Lưu ý: Không dùng 'a' trước danh từ số nhiều: There is a chair. (Không nói: There is a chairs.)"
      },
      {
        "num": 2,
        "pattern": "There are + danh từ số nhiều",
        "vi": "Dùng khi phía sau là hai người / hai vật trở lên",
        "style": "There are + number + plural noun. / There are + some + plural noun.",
        "example": "There are two chairs in the kitchen.",
        "exampleVi": "Có hai cái ghế trong nhà bếp.",
        "context": "Ví dụ khác: There are two lamps on the desk. / There are three windows in the living room. / There many books on the bookshelf. | Lưu ý: Danh từ số nhiều phải thêm -s/-es: There are two chairs. (Không nói: There are two chair.)"
      },
      {
        "num": 3,
        "pattern": "Phủ định — There isn't / There aren't",
        "vi": "Dùng để nói không có cái gì / những cái gì đó",
        "style": "There isn't + a/an + noun. / There aren't + any + plural noun.",
        "example": "There isn't a TV in my bedroom.",
        "exampleVi": "Không có tivi trong phòng ngủ của tôi.",
        "context": "Ví dụ khác: There isn't a garden in my apartment. / There isn't a shower in this bathroom. / There aren't any pictures on the wall. | Bẫy thường gặp: There aren't a fridge (Sai vì a fridge là số ít, phải dùng There isn't a fridge)."
      },
      {
        "num": 4,
        "pattern": "Câu hỏi — Is there...? / Are there...?",
        "vi": "Dùng để hỏi xem có cái gì / những cái gì đó hay không",
        "style": "Is there + a/an + noun? / Are there + any + plural noun? / How many + plural noun + are there?",
        "example": "Is there a TV in your living room?",
        "exampleVi": "Có tivi trong phòng khách của bạn không?",
        "context": "Trả lời ngắn: Yes, there is. / No, there isn't. | Trả lời cho số nhiều: Yes, there are. / No, there aren't. | Hỏi số lượng: How many bedrooms are there? -> There are two bedrooms."
      }
    ],
    "commonQA": [
      { "q": "Is this a new apartment?", "a": "Yes, it is. It is a new apartment." },
      { "q": "Is the park near the apartment?", "a": "Yes. The park is across the street." },
      { "q": "Is the office far away?", "a": "No. The office is around the corner." },
      { "q": "Is the kitchen big?", "a": "No, it isn't. It is a little small." },
      { "q": "What is in the living room?", "a": "There is a sofa and a dresser in the living room." },
      { "q": "Are there any other rooms?", "a": "No, there aren't. There are no other rooms." }
    ]
  },
  "listening": {
    "title": "Nghe trả lời - There is / There are & Apartment Dialogue",
    "transcript": "Listen and choose the correct answer for each question.",
    "translation": "Nghe câu hỏi hoặc câu chưa hoàn chỉnh và chọn đáp án chính xác.",
    "audio": "Listen and choose the correct answer.",
    "questions": [
      { "audio": "Is there a refrigerator in the kitchen?", "q": "Chọn đáp án đúng.", "options": ["Yes, there is.", "Yes, there are.", "No, I don't.", "It is a park."], "answer": 0 },
      { "audio": "Are there any other rooms?", "q": "Chọn đáp án đúng.", "options": ["No, there aren't.", "No, there isn't.", "Yes, it does.", "It is around the corner."], "answer": 0 },
      { "audio": "Is the kitchen a little small?", "q": "Chọn đáp án đúng.", "options": ["Yes, it is.", "Yes, there are.", "No, they aren't.", "I like the sofa."], "answer": 0 },
      { "audio": "Where is the park?", "q": "Chọn đáp án đúng.", "options": ["It is across the street.", "It is in the bathroom.", "It is on the sofa.", "It is under the desk."], "answer": 0 },
      { "audio": "Where is the office?", "q": "Chọn đáp án đúng.", "options": ["It is around the corner.", "It is in the refrigerator.", "It is on the bed.", "It is behind the dresser."], "answer": 0 },
      { "audio": "What does Mom like?", "q": "Chọn đáp án đúng.", "options": ["She likes the sofa.", "She likes the park.", "She likes the street.", "She likes the bathroom."], "answer": 0 },
      { "audio": "What kind of apartment is it?", "q": "Chọn đáp án đúng.", "options": ["It is a studio apartment.", "It is a school.", "It is a garage.", "It is a restaurant."], "answer": 0 },
      { "audio": "What room is mentioned after the refrigerator?", "q": "Chọn đáp án đúng.", "options": ["The kitchen.", "The garden.", "The garage.", "The library."], "answer": 0 },
      { "audio": "Where is the dresser?", "q": "Chọn đáp án đúng.", "options": ["In the living room.", "In the bathroom.", "Across the street.", "Around the corner."], "answer": 0 },
      { "audio": "What does 'There are no other rooms' mean?", "q": "Chọn đáp án đúng.", "options": ["Không có phòng nào khác.", "Có rất nhiều phòng khác.", "Không có tủ lạnh.", "Có một phòng bếp lớn."], "answer": 0 },
      { "audio": "There ___ a refrigerator in the kitchen.", "q": "Chọn đáp án đúng.", "options": ["is", "are", "do", "does"], "answer": 0 },
      { "audio": "There ___ no other rooms.", "q": "Chọn đáp án đúng.", "options": ["is", "are", "am", "does"], "answer": 1 },
      { "audio": "There ___ the dining room, the office, and the living room.", "q": "Chọn đáp án đúng.", "options": ["is", "are", "do", "does"], "answer": 0 },
      { "audio": "The park is ___ the street.", "q": "Chọn đáp án đúng.", "options": ["across", "under", "between", "inside"], "answer": 0 },
      { "audio": "My office is ___ the corner.", "q": "Chọn đáp án đúng.", "options": ["around", "under", "between", "on"], "answer": 0 },
      { "audio": "The kitchen is a little ___.", "q": "Chọn đáp án đúng.", "options": ["small", "supermarket", "often", "across"], "answer": 0 },
      { "audio": "I liked your old apartment ___.", "q": "Chọn đáp án đúng.", "options": ["better", "bathroom", "chair", "street"], "answer": 0 },
      { "audio": "Your old apartment had such a nice ___.", "q": "Chọn đáp án đúng.", "options": ["view", "sofa", "room", "kitchen"], "answer": 0 },
      { "audio": "Why is the dresser in the ___?", "q": "Chọn đáp án đúng.", "options": ["living room", "street", "office", "park"], "answer": 0 },
      { "audio": "I think it's ___.", "q": "Chọn đáp án đúng.", "options": ["nice", "old", "other", "corner"], "answer": 0 }
    ]
  },
  "translation": {
    "title": "LUYỆN DỊCH: VIỆT ↔ ANH",
    "instruction": "Dịch từng câu. Chú ý There is / There are, câu hỏi, phủ định và từ vựng nhà cửa.",
    "sentences": [
      { "vi": "Có một cái giường trong phòng ngủ.", "en": "There is a bed in the bedroom." },
      { "vi": "Có hai cái ghế trong phòng bếp.", "en": "There are two chairs in the kitchen." },
      { "vi": "Có một cái tivi trong phòng khách không?", "en": "Is there a TV in the living room?" },
      { "vi": "Có ba cái cửa sổ trong phòng ngủ không?", "en": "Are there three windows in the bedroom?" },
      { "vi": "Không có tủ lạnh trong phòng ngủ.", "en": "There isn't a refrigerator in the bedroom." },
      { "vi": "Không có phòng nào khác trong căn hộ studio.", "en": "There are no other rooms in the studio apartment." },
      { "vi": "Có một phòng ăn, một phòng làm việc và một phòng khách.", "en": "There is a dining room, an office, and a living room." },
      { "vi": "Phòng bếp hơi nhỏ, nhưng tôi thích nó.", "en": "The kitchen is a little small, but I like it." },
      { "vi": "Công viên ở bên kia đường.", "en": "The park is across the street." },
      { "vi": "Văn phòng của tôi ở ngay gần đây.", "en": "My office is around the corner." },
      { "vi": "Chào mừng mẹ đến căn hộ mới của con.", "en": "Welcome to my new apartment, Mom.", "direction": "en-vi" },
      { "vi": "Mẹ thích căn hộ cũ của con hơn.", "en": "I liked your old apartment better.", "direction": "en-vi" },
      { "vi": "Căn hộ cũ của con có tầm nhìn rất đẹp.", "en": "Your old apartment had such a nice view.", "direction": "en-vi" },
      { "vi": "Tầm nhìn ở đây cũng đẹp.", "en": "The view here is nice too.", "direction": "en-vi" },
      { "vi": "Tủ lạnh đẹp đấy.", "en": "Nice refrigerator.", "direction": "en-vi" },
      { "vi": "Mấy cái ghế đẹp. Mẹ thích ghế sofa.", "en": "The chairs are nice. I like the sofa.", "direction": "en-vi" },
      { "vi": "Tại sao tủ ngăn kéo lại ở phòng khách?", "en": "Why is the dresser in the living room?", "direction": "en-vi" },
      { "vi": "Không còn chỗ nào khác để đặt nó.", "en": "There's no place else for it to go.", "direction": "en-vi" },
      { "vi": "Đó là căn hộ studio. Không có phòng nào khác.", "en": "It's a studio apartment. There are no other rooms.", "direction": "en-vi" },
      { "vi": "Mẹ nghĩ nó đẹp.", "en": "I think it's nice.", "direction": "en-vi" }
    ]
  },
  "dialogueVideo": {
    "title": "Video hội thoại chính: Top Notch TV Fundamentals Unit 7",
    "description": "Hội thoại giữa một cô gái và mẹ khi cô giới thiệu new apartment. Trọng tâm nghe hiểu gồm: tên phòng trong căn hộ, đồ vật trong phòng, vị trí gần căn hộ và cấu trúc There is / There are.",
    "label": "Top Notch TV Unit 7 — New Apartment",
    "embedUrl": "https://www.youtube.com/embed/ZGe1ymKWRWA?rel=0&modestbranding=1",
    "watchUrl": "https://www.youtube.com/watch?v=ZGe1ymKWRWA",
    "sourceUrl": "https://www.youtube.com/watch?v=ZGe1ymKWRWA",
    "transcript": [
      { "speaker": "Daughter", "en": "Hi. Welcome to my **new apartment**, Mom.", "vi": "Chào mẹ. Chào mừng mẹ đến căn hộ mới của con." },
      { "speaker": "Mom", "en": "I liked your **old apartment** better.", "vi": "Mẹ thích căn hộ cũ của con hơn." },
      { "speaker": "Daughter", "en": "That's because you live at **22 Oak Street**.", "vi": "Đó là vì mẹ sống ở số 22 đường Oak." },
      { "speaker": "Mom", "en": "Your old apartment had such a **nice view**.", "vi": "Căn hộ cũ của con có tầm nhìn rất đẹp." },
      { "speaker": "Daughter", "en": "The **view** here is nice too, Mom.", "vi": "Tầm nhìn ở đây cũng đẹp mà mẹ." },
      { "speaker": "Daughter", "en": "The **park** is just **across the street**.", "vi": "Công viên ở ngay bên kia đường." },
      { "speaker": "Daughter", "en": "And my **office** is **around the corner**.", "vi": "Và văn phòng của con ở ngay gần đây." },
      { "speaker": "Mom", "en": "Nice **refrigerator**.", "vi": "Tủ lạnh đẹp đấy." },
      { "speaker": "Mom", "en": "It's very **small**, isn't it?", "vi": "Nó nhỏ quá nhỉ?" },
      { "speaker": "Daughter", "en": "The **refrigerator**?", "vi": "Cái tủ lạnh á?" },
      { "speaker": "Mom", "en": "The **kitchen**.", "vi": "Phòng bếp cơ." },
      { "speaker": "Daughter", "en": "It's a little **small**, but I **like it**.", "vi": "Nó hơi nhỏ, nhưng con thích nó." },
      { "speaker": "Daughter", "en": "There's the **dining room**, the **office**, and the **living room**.", "vi": "Kia là phòng ăn, phòng làm việc và phòng khách." },
      { "speaker": "Mom", "en": "The **chairs** are nice. I like the **sofa**.", "vi": "Mấy cái ghế đẹp. Mẹ thích ghế sofa." },
      { "speaker": "Mom", "en": "Why is the **dresser** in the **living room**?", "vi": "Tại sao tủ ngăn kéo lại ở phòng khách?" },
      { "speaker": "Daughter", "en": "There's **no place else** for it to go.", "vi": "Không còn chỗ nào khác để đặt nó." },
      { "speaker": "Mom", "en": "But where are the **other rooms**, honey?", "vi": "Nhưng các phòng khác đâu rồi con?" },
      { "speaker": "Daughter", "en": "Mom, it's a **studio apartment**.", "vi": "Mẹ à, đây là căn hộ studio." },
      { "speaker": "Daughter", "en": "**There are no other rooms**. This is it.", "vi": "Không có phòng nào khác. Chỉ có vậy thôi." },
      { "speaker": "Mom", "en": "But where's the **bedroom**?", "vi": "Nhưng phòng ngủ ở đâu?" },
      { "speaker": "Daughter", "en": "**Ta-da!**", "vi": "Đây rồi! / bất ngờ chưa!" },
      { "speaker": "Mom", "en": "I'm afraid to ask about the **bathroom**.", "vi": "Mẹ sợ phải hỏi về phòng tắm quá." },
      { "speaker": "Mom", "en": "I think it's **nice**.", "vi": "Mẹ nghĩ nó đẹp." }
    ],
    "keywords": [
      { "en": "Welcome to my...", "vi": "Giới thiệu nơi ở", "example": "Welcome to my **new apartment**." },
      { "en": "The ... is across the street.", "vi": "Nói vị trí đối diện / bên kia đường", "example": "The **park** is **across the street**." },
      { "en": "My ... is around the corner.", "vi": "Nói vị trí gần đó", "example": "My **office** is **around the corner**." },
      { "en": "It's a little small, but...", "vi": "Nhận xét lịch sự", "example": "It's a little **small**, but I **like it**." },
      { "en": "There's the...", "vi": "Chỉ vị trí / giới thiệu khu vực", "example": "There's the **dining room**, the **office**, and the **living room**." },
      { "en": "There are no...", "vi": "Nói không có nhiều thứ", "example": "**There are no other rooms**." }
    ],
    "comprehension": [
      {
        "q": "Whose apartment is this?",
        "options": ["The mother's old apartment", "The daughter's new apartment", "The father's house", "The office"],
        "answer": 1
      },
      {
        "q": "Why did the mother like the old apartment?",
        "options": ["It had a big kitchen.", "It had a nice view.", "It had many bedrooms.", "It had a garage."],
        "answer": 1
      },
      {
        "q": "Where is the park?",
        "options": ["Behind the apartment", "Next to the office", "Across the street", "Upstairs"],
        "answer": 2
      },
      {
        "q": "What is a little small?",
        "options": ["The refrigerator", "The kitchen", "The sofa", "The bathroom"],
        "answer": 1
      },
      {
        "q": "What does the mother like in the living room?",
        "options": ["The desk", "The sofa", "The bed", "The TV"],
        "answer": 1
      },
      {
        "q": "Why is the dresser in the living room?",
        "options": ["It looks beautiful there.", "It is near the window.", "There is no place else for it to go.", "It is next to the bathroom."],
        "answer": 2
      },
      {
        "q": "What kind of apartment is it?",
        "options": ["A big house", "A two-bedroom apartment", "A studio apartment", "A hotel room"],
        "answer": 2
      },
      {
        "q": "Are there any other rooms?",
        "options": ["Yes, there are many rooms.", "No, there are no other rooms.", "Yes, there are two bedrooms.", "No, there isn't a kitchen."],
        "answer": 1
      }
    ],
    "listenPickLine": [
      { "prompt": "Welcome to my new apartment, Mom.", "options": ["Đây là căn hộ mới của con.", "Đây là văn phòng mới của con.", "Đây là trường mới của con.", "Đây là phòng tắm mới của con."], "answer": 0 },
      { "prompt": "I liked your old apartment better.", "options": ["Mẹ thích căn hộ cũ hơn.", "Mẹ thích phòng bếp hơn.", "Mẹ không thích căn hộ này.", "Mẹ sống ở đây."], "answer": 0 },
      { "prompt": "Your old apartment had such a nice view.", "options": ["It had a nice view.", "It had no rooms.", "It had a small kitchen.", "It had a big bathroom."], "answer": 0 },
      { "prompt": "The park is just across the street.", "options": ["The park is across the street.", "The park is upstairs.", "The park is in the kitchen.", "The park is behind the sofa."], "answer": 0 },
      { "prompt": "My office is around the corner.", "options": ["Văn phòng ở ngay gần đây.", "Văn phòng ở bên trong phòng ngủ.", "Văn phòng ở dưới tầng hầm.", "Văn phòng ở trên ghế sofa."], "answer": 0 },
      { "prompt": "Nice refrigerator.", "options": ["The mother talks about the refrigerator.", "The mother talks about the bathroom.", "The mother talks about the bedroom.", "The mother talks about the park."], "answer": 0 },
      { "prompt": "The kitchen is a little small, but I like it.", "options": ["The kitchen is small, but she likes it.", "The bedroom is small, but she likes it.", "The office is big, but she hates it.", "The bathroom is nice, but she hates it."], "answer": 0 },
      { "prompt": "There's the dining room, the office, and the living room.", "options": ["dining room, office, living room", "bedroom, bathroom, garage", "garden, balcony, kitchen", "school, café, park"], "answer": 0 },
      { "prompt": "I like the sofa.", "options": ["The mother likes the sofa.", "The mother likes the desk.", "The mother likes the bed.", "The mother likes the mirror."], "answer": 0 },
      { "prompt": "Why is the dresser in the living room?", "options": ["Vì sao tủ ngăn kéo ở phòng khách?", "Vì sao tủ lạnh ở phòng khách?", "Vì sao giường ở phòng bếp?", "Vì sao ghế ở phòng tắm."], "answer": 0 },
      { "prompt": "It's a studio apartment.", "options": ["It has one open space.", "It has four bedrooms.", "It has a garage.", "It has a big garden."], "answer": 0 },
      { "prompt": "There are no other rooms.", "options": ["Không có phòng nào khác.", "Có hai phòng khác.", "Không có tủ lạnh.", "Có nhiều phòng tắm."], "answer": 0 }
    ],
    "fillConversation": [
      {
        "wordBank": ["new", "old", "view", "across", "around", "corner", "office", "street"],
        "lines": [
          { "speaker": "Daughter", "text": "Welcome to my [[new]] apartment, Mom." },
          { "speaker": "Mom", "text": "I liked your [[old]] apartment better." },
          { "speaker": "Mom", "text": "Your old apartment had such a nice [[view]]." },
          { "speaker": "Daughter", "text": "The view here is nice too, Mom." },
          { "speaker": "Daughter", "text": "The park is just [[across]] the [[street]]." },
          { "speaker": "Daughter", "text": "And my [[office]] is [[around]] the [[corner]]." }
        ],
        "explanation": [
          "new apartment = căn hộ mới",
          "old apartment = căn hộ cũ",
          "nice view = tầm nhìn đẹp",
          "across the street = bên kia đường",
          "around the corner = ngay gần đây / quanh góc phố"
        ]
      },
      {
        "wordBank": ["kitchen", "small", "dining room", "office", "living room", "sofa", "dresser", "studio", "rooms", "bedroom"],
        "lines": [
          { "speaker": "Mom", "text": "Nice refrigerator. It's very small, isn't it?" },
          { "speaker": "Daughter", "text": "The refrigerator?" },
          { "speaker": "Mom", "text": "The [[kitchen]]." },
          { "speaker": "Daughter", "text": "It's a little [[small]], but I like it." },
          { "speaker": "Daughter", "text": "There's the [[dining room]], the [[office]], and the [[living room]]." },
          { "speaker": "Mom", "text": "The chairs are nice. I like the [[sofa]]." },
          { "speaker": "Mom", "text": "Why is the [[dresser]] in the living room?" },
          { "speaker": "Daughter", "text": "There's no place else for it to go." },
          { "speaker": "Mom", "text": "But where are the other rooms, honey?" },
          { "speaker": "Daughter", "text": "Mom, it's a [[studio]] apartment. There are no other [[rooms]]." },
          { "speaker": "Mom", "text": "But where's the [[bedroom]]?" },
          { "speaker": "Daughter", "text": "Ta-da!" }
        ],
        "explanation": [
          "The kitchen là phòng mẹ chê hơi nhỏ",
          "There's the dining room, office, and living room dùng giới thiệu các khu vực",
          "studio apartment = căn hộ studio",
          "no other rooms = không có phòng khác"
        ]
      }
    ],
    "sentenceOrderLines": [
      "Welcome to my new apartment, Mom.",
      "I liked your old apartment better.",
      "Your old apartment had such a nice view.",
      "The park is just across the street.",
      "The kitchen is a little small, but I like it.",
      "There's the dining room, the office, and the living room.",
      "It's a studio apartment.",
      "There are no other rooms."
    ]
  },
  "speaking": {
    "title": "Luyện nói AI - My Home",
    "formula": "There is / There are / There isn't / There aren't / Is there...? / Are there...?",
    "turns": [
      {
        "id": 1,
        "ai": {
          "textEn": "Can you introduce your apartment?",
          "textVn": "",
          "audioUrl": "Can you introduce your apartment?"
        },
        "user": {
          "formula": "Welcome to my + place. It is + adjective. There is + a/an + noun.",
          "sampleEn": "Welcome to my new apartment. It is small, but I like it. There is a living room. There is a kitchen. There are two chairs.",
          "sampleVn": "Chào mừng bạn đến với căn hộ mới của tôi. Nó nhỏ nhưng tôi thích nó. Có một phòng khách. Có một phòng bếp. Có hai cái ghế.",
          "sampleAudioUrl": "Welcome to my new apartment. It is small, but I like it. There is a living room. There is a kitchen. There are two chairs."
        }
      },
      {
        "id": 2,
        "ai": {
          "textEn": "What is near your house or apartment?",
          "textVn": "",
          "audioUrl": "What is near your house or apartment?"
        },
        "user": {
          "formula": "The + place + is across the street. / My + place + is around the corner.",
          "sampleEn": "The park is across the street. My school is around the corner. The supermarket is near my house.",
          "sampleVn": "Công viên ở bên kia đường. Trường học của tôi ở ngay gần đây. Siêu thị ở gần nhà tôi.",
          "sampleAudioUrl": "The park is across the street. My school is around the corner. The supermarket is near my house."
        }
      },
      {
        "id": 3,
        "ai": {
          "textEn": "What rooms are there in your home?",
          "textVn": "",
          "audioUrl": "What rooms are there in your home?"
        },
        "user": {
          "formula": "There's the... / There is a... / There are...",
          "sampleEn": "There's the kitchen, the dining room, and the living room. There is a sofa in the living room. There are four chairs in the dining room.",
          "sampleVn": "Có phòng bếp, phòng ăn và phòng khách. Có một ghế sofa ở phòng khách. Có bốn cái ghế ở phòng ăn.",
          "sampleAudioUrl": "There's the kitchen, the dining room, and the living room. There is a sofa in the living room. There are four chairs in the dining room."
        }
      },
      {
        "id": 4,
        "ai": {
          "textEn": "Let's role-play. I am the mother. You show me your new apartment.",
          "textVn": "",
          "audioUrl": "Let's role-play. I am the mother. You show me your new apartment."
        },
        "user": {
          "formula": "Welcome to my... / This is the... / It's a little..., but I like it.",
          "sampleEn": "Welcome to my new apartment, Mom. This is the kitchen. It is a little small, but I like it. This is the living room. There is a sofa here.",
          "sampleVn": "Chào mừng mẹ đến căn hộ mới của con. Đây là phòng bếp. Nó hơi nhỏ nhưng con thích nó. Đây là phòng khách. Có một ghế sofa ở đây.",
          "sampleAudioUrl": "Welcome to my new apartment, Mom. This is the kitchen. It is a little small, but I like it. This is the living room. There is a sofa here."
        }
      },
      {
        "id": 5,
        "ai": {
          "textEn": "Can you describe a studio apartment?",
          "textVn": "",
          "audioUrl": "Can you describe a studio apartment?"
        },
        "user": {
          "formula": "It is a studio apartment. There are no other rooms. There is... There are...",
          "sampleEn": "It is a studio apartment. There are no other rooms. There is a kitchen area, a living room area, and a bed. There is a sofa. There are two chairs. It is small, but nice.",
          "sampleVn": "Đó là một căn hộ studio. Không có phòng nào khác. Có khu vực bếp, khu vực phòng khách và một cái giường. Có một ghế sofa. Có hai cái ghế. Nó nhỏ nhưng đẹp.",
          "sampleAudioUrl": "It is a studio apartment. There are no other rooms. There is a kitchen area, a living room area, and a bed. There is a sofa. There are two chairs. It is small, but nice."
        }
      }
    ]
  },
  "minitest": [
    { "type": "grammar", "q": "There ___ a bed in my bedroom.", "options": ["is", "are", "do", "does"], "answer": 0 },
    { "type": "grammar", "q": "There ___ two chairs in the kitchen.", "options": ["is", "are", "am", "does"], "answer": 1 },
    { "type": "grammar", "q": "___ there a TV in the living room?", "options": ["Are", "Is", "Do", "Does"], "answer": 1 },
    { "type": "grammar", "q": "___ there any windows?", "options": ["Is", "Are", "Does", "Do"], "answer": 1 },
    { "type": "grammar", "q": "There ___ a refrigerator in the kitchen.", "options": ["is", "are", "be", "do"], "answer": 0 },
    { "type": "grammar", "q": "There ___ no other rooms.", "options": ["is", "are", "am", "does"], "answer": 1 },
    { "type": "grammar", "q": "Câu nào đúng?", "options": ["There are a sofa.", "There is a sofa.", "There is two sofas.", "There does sofa."], "answer": 1 },
    { "type": "grammar", "q": "Câu nào đúng?", "options": ["Are there two rooms?", "Is there two rooms?", "Do there two rooms?", "Does there rooms?"], "answer": 0 },
    { "type": "grammar", "q": "Phủ định của “There is a TV.”", "options": ["There isn't a TV.", "There aren't a TV.", "There doesn't a TV.", "There don't TV."], "answer": 0 },
    { "type": "grammar", "q": "Phủ định của “There are two windows.”", "options": ["There isn't two windows.", "There aren't two windows.", "There doesn't windows.", "There not windows."], "answer": 1 },
    { "type": "vocab", "q": "In the video, the daughter says: \"Welcome to my new ___.\"", "options": ["apartment", "supermarket", "school", "garage"], "answer": 0 },
    { "type": "vocab", "q": "The mother liked the old apartment because it had a nice ___.", "options": ["view", "sofa", "bathroom", "desk"], "answer": 0 },
    { "type": "vocab", "q": "The park is ___ the street.", "options": ["across", "under", "between", "in"], "answer": 0 },
    { "type": "vocab", "q": "Her office is around the ___.", "options": ["corner", "refrigerator", "sofa", "bedroom"], "answer": 0 },
    { "type": "vocab", "q": "What is a little small?", "options": ["The kitchen", "The park", "The street", "The office"], "answer": 0 },
    { "type": "vocab", "q": "The mother says: \"I like the ___.\"", "options": ["sofa", "fridge", "bed", "window"], "answer": 0 },
    { "type": "vocab", "q": "Where is the dresser?", "options": ["In the living room", "In the park", "Across the street", "Around the corner"], "answer": 0 },
    { "type": "vocab", "q": "It is a ___ apartment.", "options": ["studio", "school", "garden", "garage"], "answer": 0 },
    { "type": "vocab", "q": "\"There are no other rooms\" nghĩa là gì?", "options": ["Không có phòng nào khác.", "Có nhiều phòng khác.", "Không có tủ lạnh.", "Có một cái ghế."], "answer": 0 },
    { "type": "vocab", "q": "Câu nào xuất hiện trong video?", "options": ["I think it's nice.", "I go to the bank.", "There are two plants.", "Is there a balcony?"], "answer": 0 }
  ],
  "mindmap": {
    "center": "BUỔI 11 — MY HOME / NEW APARTMENT",
    "branches": [
      {
        "label": "Rooms",
        "items": [
          "house = ngôi nhà",
          "apartment = căn hộ",
          "room = căn phòng",
          "bedroom = phòng ngủ",
          "bathroom = phòng tắm",
          "kitchen = phòng bếp",
          "living room = phòng khách",
          "dining room = phòng ăn",
          "office = phòng làm việc / văn phòng",
          "studio apartment = căn hộ studio",
          "balcony = ban công",
          "garden = khu vườn",
          "garage = nhà để xe",
          "upstairs = tầng trên",
          "downstairs = tầng dưới"
        ]
      },
      {
        "label": "Things in rooms",
        "items": [
          "bed = cái giường",
          "sofa = ghế sofa",
          "table = cái bàn",
          "chair = cái ghế",
          "TV = tivi",
          "refrigerator / fridge = tủ lạnh",
          "mirror = gương",
          "shower = vòi sen",
          "lamp = đèn",
          "window = cửa sổ",
          "door = cửa ra vào",
          "desk = bàn học / bàn làm việc",
          "dresser = tủ ngăn kéo / tủ quần áo",
          "picture = bức tranh"
        ]
      },
      {
        "label": "Video keywords",
        "items": [
          "new apartment = căn hộ mới",
          "old apartment = căn hộ cũ",
          "nice view = tầm nhìn đẹp",
          "across the street = bên kia đường",
          "around the corner = ngay gần đây / quanh góc phố",
          "a little small = hơi nhỏ",
          "no place else = không còn chỗ nào khác",
          "other rooms = những phòng khác",
          "no other rooms = không có phòng nào khác",
          "I think it's nice. = Tôi nghĩ nó đẹp."
        ]
      },
      {
        "label": "Grammar",
        "items": [
          "Số ít: There is + a/an + noun.",
          "Số nhiều: There are + number/some + plural noun.",
          "Phủ định: There isn't / There aren't",
          "Câu hỏi: Is there...? / Are there...?"
        ]
      }
    ]
  },
  "homeworkRich": {
    "title": "Homework - My Home / My Apartment",
    "submit": "Nộp bài qua nhóm lớp; khuyến khích nộp ảnh vở + ghi âm hoặc video ngắn.",
    "deadline": "Trước buổi học tiếp theo",
    "tasks": [
      {
        "icon": "🏡",
        "title": "BÀI TẬP 1: VIẾT — \"My Home / My Apartment\"",
        "badge": "Bắt buộc",
        "desc": "Viết 8-10 câu mô tả nhà, căn hộ hoặc một căn phòng của bạn.",
        "items": [
          "Dùng ít nhất 4 từ chỉ phòng: bedroom, bathroom, kitchen, living room, dining room, office...",
          "Dùng ít nhất 5 từ chỉ đồ vật / cụm trong video: sofa, chair, refrigerator, dresser, view, across the street, around the corner...",
          "Có ít nhất 3 câu với There is / There's.",
          "Có ít nhất 3 câu với There are.",
          "Có ít nhất 1 câu phủ định với There isn't / There aren't / There are no...",
          "Có ít nhất 1 câu cảm nhận: nice, small, big, clean, cozy, quiet.",
          "Bài mẫu: Welcome to my apartment. It is small, but I like it. There is a kitchen and a living room. There is a sofa in the living room. There are two chairs in the dining room. There is a refrigerator in the kitchen. The park is across the street. My school is around the corner. There isn't a garage. I think my apartment is nice."
        ]
      },
      {
        "icon": "🎙️",
        "title": "BÀI TẬP 2: NÓI / GHI ÂM — \"Apartment Tour\"",
        "badge": "Bắt buộc",
        "desc": "Quay video hoặc ghi âm 45-60 giây giới thiệu nhà/căn hộ của bạn như đang dẫn mẹ/bạn đi tham quan.",
        "items": [
          "Mở đầu bằng câu: \"Welcome to my new apartment / house.\"",
          "Dùng ít nhất 6 câu mô tả với There is / There are / There's.",
          "Dùng ít nhất 2 cụm vị trí: across the street, around the corner, near, next to, in, on.",
          "Có ít nhất 1 câu nhận xét kiểu: \"It's a little small, but I like it.\"",
          "Có ít nhất 1 câu kết: \"I think it's nice.\"",
          "Câu hỏi gợi ý để nói: 1. Is your home big or small? | 2. What rooms are there? | 3. Is there a kitchen? | 4. Is there a living room? | 5. What is in the living room? | 6. Are there any other rooms? | 7. What is across the street? | 8. What is around the corner?"
        ]
      },
      {
        "icon": "🃏",
        "title": "BÀI TẬP 3: MINI FLASHCARD REVIEW",
        "badge": "Luyện thêm",
        "desc": "Tạo 12 flashcard trong vở.",
        "items": [
          "5 flashcard về rooms.",
          "4 flashcard về things in rooms.",
          "3 flashcard về cụm video hội thoại: across the street, around the corner, studio apartment, no other rooms...",
          "Mỗi flashcard có: English + Vietnamese + 1 câu mẫu."
        ]
      },
      {
        "icon": "🗣️",
        "title": "BÀI TẬP 4: SHADOWING VIDEO SCRIPT",
        "badge": "Luyện thêm",
        "desc": "Nghe lại hoặc đọc theo 8 câu chính dưới đây, ghi âm gửi nhóm lớp.",
        "items": [
          "1. Welcome to my new apartment, Mom.",
          "2. I liked your old apartment better.",
          "3. Your old apartment had such a nice view.",
          "4. The park is just across the street.",
          "5. My office is around the corner.",
          "6. It's a little small, but I like it.",
          "7. It's a studio apartment.",
          "8. There are no other rooms."
        ]
      }
    ]
  },
  "homework": [
    "Viết 8-10 câu mô tả My Home / My Apartment theo yêu cầu bài tập 1.",
    "Ghi âm hoặc quay video Apartment Tour 45-60 giây theo yêu cầu bài tập 2.",
    "Tạo 12 flashcard trong vở theo bài tập 3.",
    "Shadowing ghi âm 8 câu chính theo bài tập 4."
  ],
  "summary": [
    "Gọi tên rooms và things in rooms trong nhà/căn hộ.",
    "Dùng There is với danh từ số ít.",
    "Dùng There are với danh từ số nhiều.",
    "Dùng There isn't / There aren't / There are no... để phủ định.",
    "Đặt câu hỏi Is there...? / Are there...? / How many...?",
    "Mô tả căn hộ hoặc nhà bằng đoạn ngắn chuẩn A1."
  ],
  "sectionFlow": [
    "intro",
    "review",
    "video",
    "vocab",
    "vocab_match",
    "listen_pick",
    "grammar",
    "listen_quiz",
    "translate",
    "dialogue_video",
    "dialogue_video_quiz",
    "dialogue_video_order",
    "speaking",
    "minitest",
    "mindmap",
    "homework"
  ],
  "skipSections": [
    "writing",
    "story",
    "dictation",
    "sprint"
  ]
};

const LESSON_12_TEMPLATE = {
  "objectives": [
    "Gọi tên các đồ nội thất quen thuộc trong nhà bằng tiếng Anh",
    "Dùng đúng giới từ chỉ vị trí **in / on / under / next to / behind / in front of / between / near**",
    "Kết hợp **There is / There are** để nói đồ vật ở đâu trong phòng",
    "Hỏi và trả lời vị trí bằng **Where is...? / Where are...?** ở mức A1"
  ],
  "review": {
    "title": "Ôn bài cũ - Rooms in a House & There is / There are",
    "questions": [
      { "q": "There ___ a bed in the bedroom.", "answer": "is" },
      { "q": "There ___ two chairs in the kitchen.", "answer": "are" },
      { "q": "___ there a TV in the living room?", "answer": "Is" },
      { "q": "___ there any plants on the balcony?", "answer": "Are" }
    ],
    "structures": [
      "There is a bed in the bedroom.",
      "There are two chairs in the kitchen.",
      "Is there a TV in the living room? - Yes, there is.",
      "Are there any plants on the balcony? - Yes, there are.",
      "My bedroom is small but cozy."
    ],
    "reviewGames": {
      "title": "Ôn tập Buổi 11 - Rooms & There is / There are",
      "intro": "Làm 2 thử thách để ôn phòng trong nhà, đồ vật cơ bản và cấu trúc There is / There are trước khi học furniture + prepositions.",
      "vocabulary": [
        { "en": "bedroom", "vi": "phòng ngủ", "img": "🛏️", "ipa": "/ˈbedruːm/", "options": ["phòng bếp", "phòng ngủ", "phòng tắm", "phòng khách"], "answer": 1 },
        { "en": "bathroom", "vi": "phòng tắm", "img": "🛁", "ipa": "/ˈbæθruːm/", "options": ["phòng ăn", "ban công", "phòng tắm", "khu vườn"], "answer": 2 },
        { "en": "kitchen", "vi": "phòng bếp", "img": "🍳", "ipa": "/ˈkɪtʃən/", "options": ["phòng bếp", "phòng khách", "phòng học", "nhà để xe"], "answer": 0 },
        { "en": "living room", "vi": "phòng khách", "img": "🛋️", "ipa": "/ˈlɪvɪŋ ruːm/", "options": ["phòng tắm", "phòng khách", "hành lang", "phòng ngủ"], "answer": 1 },
        { "en": "dining room", "vi": "phòng ăn", "img": "🍽️", "ipa": "/ˈdaɪnɪŋ ruːm/", "options": ["phòng ăn", "phòng ngủ", "nhà để xe", "ban công"], "answer": 0 },
        { "en": "balcony", "vi": "ban công", "img": "🌇", "ipa": "/ˈbælkəni/", "options": ["phòng học", "ban công", "phòng bếp", "tầng dưới"], "answer": 1 },
        { "en": "garden", "vi": "khu vườn", "img": "🌳", "ipa": "/ˈɡɑːrdən/", "options": ["khu vườn", "hành lang", "phòng ăn", "căn hộ"], "answer": 0 },
        { "en": "garage", "vi": "nhà để xe", "img": "🚗", "ipa": "/ɡəˈrɑːʒ/", "options": ["phòng khách", "nhà để xe", "phòng tắm", "ban công"], "answer": 1 },
        { "en": "upstairs", "vi": "tầng trên", "img": "⬆️", "ipa": "/ˌʌpˈsterz/", "options": ["tầng dưới", "tầng trên", "trong phòng", "ngoài vườn"], "answer": 1 },
        { "en": "downstairs", "vi": "tầng dưới", "img": "⬇️", "ipa": "/ˌdaʊnˈsterz/", "options": ["tầng trên", "bên cạnh", "tầng dưới", "phía trước"], "answer": 2 },
        { "en": "bed", "vi": "cái giường", "img": "🛏️", "ipa": "/bed/", "options": ["cái bàn", "cái giường", "cái ghế", "cái gương"], "answer": 1 },
        { "en": "sofa", "vi": "ghế sofa", "img": "🛋️", "ipa": "/ˈsoʊfə/", "options": ["ghế sofa", "tủ lạnh", "đèn", "cửa sổ"], "answer": 0 },
        { "en": "fridge", "vi": "tủ lạnh", "img": "🧊", "ipa": "/frɪdʒ/", "options": ["kệ sách", "vòi sen", "tủ lạnh", "bức tranh"], "answer": 2 },
        { "en": "mirror", "vi": "gương", "img": "🪞", "ipa": "/ˈmɪrər/", "options": ["cửa ra vào", "gương", "cây cảnh", "đèn"], "answer": 1 },
        { "en": "window", "vi": "cửa sổ", "img": "🪟", "ipa": "/ˈwɪndoʊ/", "options": ["cửa sổ", "bức tranh", "cái bàn", "tủ lạnh"], "answer": 0 },
        { "en": "plant", "vi": "cây cảnh", "img": "🪴", "ipa": "/plænt/", "options": ["cây cảnh", "cái ghế", "phòng học", "phòng ăn"], "answer": 0 },
        { "en": "There is", "vi": "có một", "img": "1️⃣", "ipa": "/ðer ɪz/", "options": ["có nhiều", "có một", "không có", "ở đâu"], "answer": 1 },
        { "en": "There are", "vi": "có nhiều", "img": "🔢", "ipa": "/ðer ɑːr/", "options": ["có một", "có nhiều", "có phải không", "ở cạnh"], "answer": 1 },
        { "en": "Is there...?", "vi": "Có một ... không?", "img": "❓", "ipa": "/ɪz ðer/", "options": ["Có nhiều không?", "Có một ... không?", "Ở đâu?", "Mấy cái?"], "answer": 1 },
        { "en": "Are there...?", "vi": "Có nhiều ... không?", "img": "❓", "ipa": "/ɑːr ðer/", "options": ["Có nhiều ... không?", "Có một ... không?", "Ai ở đó?", "Khi nào?"], "answer": 0 }
      ],
      "quizBomb": {
        "title": "Quiz Bomb Review - Rooms & There is / There are",
        "instruction": "Trả lời nhanh 20 câu ôn tập Buổi 11 trong 5 giây mỗi câu.",
        "questions": [
          { "q": "There ___ a bed in my bedroom.", "options": ["are", "is", "do", "does"], "answer": 1 },
          { "q": "There ___ two chairs in the kitchen.", "options": ["is", "are", "am", "does"], "answer": 1 },
          { "q": "___ there a TV in the living room?", "options": ["Are", "Do", "Is", "Does"], "answer": 2 },
          { "q": "___ there any windows in your room?", "options": ["Is", "Are", "Does", "Do"], "answer": 1 },
          { "q": "\"Bathroom\" nghĩa là gì?", "options": ["phòng ngủ", "phòng tắm", "phòng bếp", "phòng khách"], "answer": 1 },
          { "q": "\"Kitchen\" nghĩa là gì?", "options": ["phòng bếp", "phòng ăn", "ban công", "phòng học"], "answer": 0 },
          { "q": "\"There isn't a fridge\" nghĩa là gì?", "options": ["Có một tủ lạnh", "Không có tủ lạnh", "Có nhiều tủ lạnh", "Tủ lạnh ở đâu"], "answer": 1 },
          { "q": "\"There aren't any plants\" nghĩa là gì?", "options": ["Không có cây nào", "Có một cây", "Có nhiều cây", "Cây ở ban công"], "answer": 0 },
          { "q": "Câu nào đúng?", "options": ["There are a sofa.", "There is a sofa.", "There is two sofas.", "There does sofa."], "answer": 1 },
          { "q": "Câu nào đúng?", "options": ["Are there two lamps?", "Is there two lamps?", "Do there two lamps?", "Does there lamps?"], "answer": 0 },
          { "q": "\"Living room\" nghĩa là gì?", "options": ["phòng ngủ", "phòng khách", "phòng bếp", "phòng tắm"], "answer": 1 },
          { "q": "\"Balcony\" nghĩa là gì?", "options": ["ban công", "nhà để xe", "phòng ăn", "hành lang"], "answer": 0 },
          { "q": "\"There are two chairs\" nghĩa là gì?", "options": ["Có một cái ghế", "Có hai cái ghế", "Có hai cái bàn", "Có một cái bàn"], "answer": 1 },
          { "q": "\"Is there a mirror?\" trả lời đúng:", "options": ["Yes, there are.", "Yes, there is.", "Yes, I do.", "Yes, it does."], "answer": 1 },
          { "q": "\"Are there any plants?\" trả lời đúng:", "options": ["Yes, there are.", "Yes, there is.", "Yes, it is.", "Yes, I am."], "answer": 0 },
          { "q": "\"My bedroom is small but cozy.\" nghĩa là gì?", "options": ["Phòng ngủ lớn và lạnh", "Phòng ngủ nhỏ nhưng ấm cúng", "Phòng khách sạch", "Nhà ở tầng dưới"], "answer": 1 },
          { "q": "There ___ a picture on the wall.", "options": ["is", "are", "do", "does"], "answer": 0 },
          { "q": "There ___ many books on the bookshelf.", "options": ["is", "are", "am", "does"], "answer": 1 },
          { "q": "Câu nào sai?", "options": ["There is a bed.", "There are two windows.", "There are a fridge.", "Is there a sofa?"], "answer": 2 },
          { "q": "\"Where is your bedroom?\" → Trả lời tự nhiên:", "options": ["It is upstairs.", "Yes, there is.", "There are two.", "No, it doesn't."], "answer": 0 }
        ]
      }
    },
    "summary": "Buổi 11 đã ôn phòng trong nhà và There is / There are. Buổi 12 mở rộng sang đồ nội thất và cách nói vị trí bằng giới từ."
  },
  "video": {
    "title": "Furniture & Prepositions of Place",
    "videos": [
      {
        "title": "Furniture and Appliances Vocabulary",
        "url": "https://www.youtube.com/embed/ldvRv2GRTtE",
        "embedUrl": "https://www.youtube.com/embed/ldvRv2GRTtE",
        "youtubeUrl": "https://youtu.be/ldvRv2GRTtE?si=e5b-cfFqcvoYXPKD",
        "watchUrl": "https://youtu.be/ldvRv2GRTtE?si=e5b-cfFqcvoYXPKD",
        "duration": "2-5 phút",
        "description": "Video giúp học viên học từ vựng tiếng Anh về đồ nội thất và thiết bị gia dụng quen thuộc trong nhà.",
        "sceneSummary": "cảnh chính",
        "scenes": [
          { "label": "Scene 1: Học từ vựng về đồ nội thất (Furniture) trong các phòng." },
          { "label": "Scene 2: Học từ vựng về thiết bị gia dụng (Appliances) phổ biến." },
          { "label": "Scene 3: Luyện phát âm và nhận diện hình ảnh minh họa." }
        ]
      }
    ],
    "questions": [
      { "q": "\"Furniture\" nghĩa là gì?", "options": ["phòng trong nhà", "đồ nội thất", "màu sắc", "địa điểm trong thành phố"], "answer": 1 },
      { "q": "\"Sofa\" nghĩa là gì?", "options": ["cái bàn", "ghế sofa", "cái giường", "tủ lạnh"], "answer": 1 },
      { "q": "\"The book is on the table.\" nghĩa là gì?", "options": ["Quyển sách ở dưới bàn.", "Quyển sách ở trên bàn.", "Quyển sách ở sau bàn.", "Quyển sách ở giữa hai cái bàn."], "answer": 1 },
      { "q": "\"Under\" nghĩa là gì?", "options": ["trên", "trong", "dưới", "bên cạnh"], "answer": 2 },
      { "q": "Câu hỏi đúng để hỏi vị trí một cái đèn là:", "options": ["Where is the lamp?", "Where are the lamp?", "Is where the lamp?", "Where does the lamp?"], "answer": 0 },
      { "q": "\"The chair is next to the desk.\" nghĩa là gì?", "options": ["Cái ghế ở dưới bàn học.", "Cái ghế ở cạnh bàn học.", "Cái ghế ở trong bàn học.", "Cái ghế ở sau bàn học."], "answer": 1 }
    ]
  },
  "vocabGroups": {
    "furniture": "ĐỒ NỘI THẤT - Furniture & Things in the House (20 từ)",
    "prepositions": "GIỚI TỪ CHỈ VỊ TRÍ - Prepositions of Place (15 từ/cụm)"
  },
  "matchAll": true,
  "listenPickAll": true,
  "vocabulary": [
    { "en": "furniture", "vi": "đồ nội thất", "ipa": "/ˈfɜːrnɪtʃər/", "img": "🪑", "group": "furniture", "note": "There is furniture in the room." },
    { "en": "sofa", "vi": "ghế sofa", "ipa": "/ˈsoʊfə/", "img": "🛋️", "group": "furniture", "note": "The sofa is in the living room." },
    { "en": "armchair", "vi": "ghế bành", "ipa": "/ˈɑːrmtʃer/", "img": "🪑", "group": "furniture", "note": "There is an armchair near the window." },
    { "en": "coffee table", "vi": "bàn trà", "ipa": "/ˈkɔːfi ˈteɪbəl/", "img": "☕", "group": "furniture", "note": "The coffee table is in front of the sofa." },
    { "en": "dining table", "vi": "bàn ăn", "ipa": "/ˈdaɪnɪŋ ˈteɪbəl/", "img": "🍽️", "group": "furniture", "note": "There is a dining table in the dining room." },
    { "en": "chair", "vi": "cái ghế", "ipa": "/tʃer/", "img": "🪑", "group": "furniture", "note": "There are four chairs." },
    { "en": "bed", "vi": "cái giường", "ipa": "/bed/", "img": "🛏️", "group": "furniture", "note": "The bed is in the bedroom." },
    { "en": "wardrobe", "vi": "tủ quần áo", "ipa": "/ˈwɔːrdroʊb/", "img": "🚪", "group": "furniture", "note": "The wardrobe is next to the bed." },
    { "en": "desk", "vi": "bàn học / bàn làm việc", "ipa": "/desk/", "img": "🖥️", "group": "furniture", "note": "The desk is under the window." },
    { "en": "bookshelf", "vi": "kệ sách", "ipa": "/ˈbʊkʃelf/", "img": "📚", "group": "furniture", "note": "The books are on the bookshelf." },
    { "en": "shelf", "vi": "cái kệ", "ipa": "/ʃelf/", "img": "📚", "group": "furniture", "note": "There is a lamp on the shelf." },
    { "en": "cupboard", "vi": "tủ chén / tủ đồ", "ipa": "/ˈkʌbərd/", "img": "🗄️", "group": "furniture", "note": "The cups are in the cupboard." },
    { "en": "fridge", "vi": "tủ lạnh", "ipa": "/frɪdʒ/", "img": "🧊", "group": "furniture", "note": "The fridge is in the kitchen." },
    { "en": "stove", "vi": "bếp nấu", "ipa": "/stoʊv/", "img": "🔥", "group": "furniture", "note": "The stove is next to the sink." },
    { "en": "sink", "vi": "bồn rửa", "ipa": "/sɪŋk/", "img": "🚰", "group": "furniture", "note": "The sink is in the kitchen." },
    { "en": "lamp", "vi": "đèn", "ipa": "/læmp/", "img": "💡", "group": "furniture", "note": "The lamp is on the desk." },
    { "en": "carpet", "vi": "thảm", "ipa": "/ˈkɑːrpɪt/", "img": "🟫", "group": "furniture", "note": "The carpet is under the table." },
    { "en": "curtains", "vi": "rèm cửa", "ipa": "/ˈkɜːrtnz/", "img": "🪟", "group": "furniture", "note": "The curtains are near the window." },
    { "en": "clock", "vi": "đồng hồ", "ipa": "/klɑːk/", "img": "🕒", "group": "furniture", "note": "The clock is on the wall." },
    { "en": "wall", "vi": "bức tường", "ipa": "/wɔːl/", "img": "🧱", "group": "furniture", "note": "There is a picture on the wall." },
    { "en": "in", "vi": "trong", "ipa": "/ɪn/", "img": "📦", "group": "prepositions", "note": "The books are in the box." },
    { "en": "on", "vi": "trên", "ipa": "/ɑːn/", "img": "⬆️", "group": "prepositions", "note": "The lamp is on the desk." },
    { "en": "under", "vi": "dưới", "ipa": "/ˈʌndər/", "img": "⬇️", "group": "prepositions", "note": "The carpet is under the table." },
    { "en": "next to", "vi": "bên cạnh", "ipa": "/nekst tuː/", "img": "↔️", "group": "prepositions", "note": "The chair is next to the desk." },
    { "en": "near", "vi": "gần", "ipa": "/nɪr/", "img": "📍", "group": "prepositions", "note": "The sofa is near the window." },
    { "en": "behind", "vi": "phía sau", "ipa": "/bɪˈhaɪnd/", "img": "🔙", "group": "prepositions", "note": "The bag is behind the chair." },
    { "en": "in front of", "vi": "phía trước", "ipa": "/ɪn frʌnt əv/", "img": "🔜", "group": "prepositions", "note": "The table is in front of the sofa." },
    { "en": "between", "vi": "ở giữa hai vật", "ipa": "/bɪˈtwiːn/", "img": "↔️", "group": "prepositions", "note": "The lamp is between the bed and the desk." },
    { "en": "above", "vi": "phía trên", "ipa": "/əˈbʌv/", "img": "⬆️", "group": "prepositions", "note": "The clock is above the sofa." },
    { "en": "below", "vi": "phía dưới", "ipa": "/bɪˈloʊ/", "img": "⬇️", "group": "prepositions", "note": "The shelf is below the clock." },
    { "en": "on the left", "vi": "bên trái", "ipa": "/ɑːn ðə left/", "img": "⬅️", "group": "prepositions", "note": "The bed is on the left." },
    { "en": "on the right", "vi": "bên phải", "ipa": "/ɑːn ðə raɪt/", "img": "➡️", "group": "prepositions", "note": "The wardrobe is on the right." },
    { "en": "in the corner", "vi": "ở góc phòng", "ipa": "/ɪn ðə ˈkɔːrnər/", "img": "◼️", "group": "prepositions", "note": "The lamp is in the corner." },
    { "en": "on the wall", "vi": "trên tường", "ipa": "/ɑːn ðə wɔːl/", "img": "🧱", "group": "prepositions", "note": "There is a picture on the wall." },
    { "en": "on the floor", "vi": "trên sàn", "ipa": "/ɑːn ðə flɔːr/", "img": "🟫", "group": "prepositions", "note": "The carpet is on the floor." }
  ],
  "listenPick": {
    "title": "Nghe chọn từ",
    "instruction": "Nghe audio từng từ/cụm từ Buổi 12 rồi chọn nghĩa tiếng Việt đúng.",
    "questions": [
      { "audio": "furniture", "options": ["phòng ngủ", "đồ nội thất", "khu vườn", "đồ ăn"], "answer": 1 },
      { "audio": "sofa", "options": ["ghế sofa", "cái giường", "tủ lạnh", "bức tường"], "answer": 0 },
      { "audio": "armchair", "options": ["bàn trà", "ghế bành", "rèm cửa", "thảm"], "answer": 1 },
      { "audio": "coffee table", "options": ["bàn ăn", "bàn học", "bàn trà", "cái kệ"], "answer": 2 },
      { "audio": "wardrobe", "options": ["tủ lạnh", "tủ quần áo", "bồn rửa", "kệ sách"], "answer": 1 },
      { "audio": "bookshelf", "options": ["kệ sách", "tủ chén", "ghế", "thảm"], "answer": 0 },
      { "audio": "cupboard", "options": ["tủ chén / tủ đồ", "đồng hồ", "ghế sofa", "bếp nấu"], "answer": 0 },
      { "audio": "stove", "options": ["bồn rửa", "bếp nấu", "rèm cửa", "cái đèn"], "answer": 1 },
      { "audio": "sink", "options": ["bồn rửa", "tủ lạnh", "bàn ăn", "thảm"], "answer": 0 },
      { "audio": "lamp", "options": ["đồng hồ", "đèn", "cái kệ", "bức tường"], "answer": 1 },
      { "audio": "carpet", "options": ["rèm cửa", "thảm", "bàn trà", "ghế bành"], "answer": 1 },
      { "audio": "curtains", "options": ["rèm cửa", "bức tranh", "tủ lạnh", "cái bàn"], "answer": 0 },
      { "audio": "in", "options": ["trên", "trong", "dưới", "bên cạnh"], "answer": 1 },
      { "audio": "on", "options": ["trong", "dưới", "trên", "phía sau"], "answer": 2 },
      { "audio": "under", "options": ["trên", "bên cạnh", "ở giữa", "dưới"], "answer": 3 },
      { "audio": "next to", "options": ["bên cạnh", "phía sau", "phía trước", "trên tường"], "answer": 0 },
      { "audio": "behind", "options": ["phía trước", "phía sau", "ở giữa", "gần"], "answer": 1 },
      { "audio": "in front of", "options": ["trong", "trên", "phía trước", "phía dưới"], "answer": 2 },
      { "audio": "between", "options": ["ở giữa hai vật", "gần", "dưới", "bên trái"], "answer": 0 },
      { "audio": "on the wall", "options": ["trên sàn", "trên tường", "trong tủ", "dưới bàn"], "answer": 1 }
    ]
  },
  "grammar": {
    "title": "5 Cấu Trúc Câu Quan Trọng - Mô tả vị trí đồ nội thất",
    "intro": "Dùng There is / There are, The + noun + is/are và Where is / Where are để mô tả đồ nội thất trong phòng.",
    "badge": "5 CẤU TRÚC CÂU QUAN TRỌNG",
    "formula": "There is/are + object + preposition + place | The object is/are + preposition + place | Where is/are...?",
    "structures": [
      { "num": 1, "pattern": "There is / There are + đồ vật + giới từ + nơi chốn", "vi": "Nói trong phòng có gì và ở đâu", "style": "There is dùng với số ít; There are dùng với số nhiều", "example": "There is a lamp on the desk.", "exampleVi": "Có một cái đèn trên bàn học.", "context": "There is a carpet under the coffee table. There are some books on the bookshelf. There is a clock on the wall." },
      { "num": 2, "pattern": "The + đồ vật + is/are + giới từ + nơi chốn", "vi": "Nói vị trí của đồ vật đã biết", "style": "Singular noun + is; plural noun + are", "example": "The sofa is in the living room.", "exampleVi": "Ghế sofa ở trong phòng khách.", "context": "The chair is next to the desk. The carpet is under the table. The books are on the shelf." },
      { "num": 3, "pattern": "Where is...? / Where are...?", "vi": "Hỏi vị trí đồ vật", "style": "Where is hỏi 1 vật; Where are hỏi nhiều vật", "example": "Where are the books? They are on the bookshelf.", "exampleVi": "Sách ở đâu? Chúng ở trên kệ sách.", "context": "Where is the fridge? It is in the kitchen. Where are the chairs? They are around the dining table." },
      { "num": 4, "pattern": "In / On / Under / Next to / Behind / In front of / Between", "vi": "Giới từ chỉ vị trí", "style": "Chọn giới từ theo vị trí thực tế của đồ vật", "example": "The coffee table is in front of the sofa.", "exampleVi": "Bàn trà ở phía trước ghế sofa.", "context": "On = trên và chạm bề mặt; above = phía trên nhưng không nhất thiết chạm. Between dùng khi một vật ở giữa A và B." },
      { "num": 5, "pattern": "This is my room + There is/are + The object is/are + cảm nhận", "vi": "Mô tả phòng bằng 4-5 câu đơn giản", "style": "Bắt đầu bằng phòng, thêm đồ vật, vị trí và cảm nhận", "example": "This is my bedroom. There is a bed next to the window. My room is small but cozy.", "exampleVi": "Đây là phòng ngủ của tôi. Có một cái giường cạnh cửa sổ. Phòng tôi nhỏ nhưng ấm cúng.", "context": "Dùng để làm bài nói hoặc bài viết My Room / Room Tour." }
    ],
    "commonQA": [
      { "q": "Where is the sofa?", "a": "It is in the living room." },
      { "q": "Where are the books?", "a": "They are on the bookshelf." },
      { "q": "Is there a lamp on the desk?", "a": "Yes, there is." },
      { "q": "Are there any chairs in the kitchen?", "a": "Yes, there are two chairs." },
      { "q": "What is in your bedroom?", "a": "There is a bed, a wardrobe, and a desk." }
    ]
  },
  "listening": {
    "title": "Nghe trả lời - Furniture & Prepositions",
    "transcript": "Listen and choose the correct answer.",
    "translation": "Nghe từng câu hỏi/câu có chỗ trống rồi chọn đáp án đúng.",
    "audio": "Listen and choose the correct answer.",
    "questions": [
      { "audio": "Where is the lamp?", "q": "Chọn đáp án đúng.", "options": ["It is on the desk.", "They are on the desk.", "Yes, there is.", "It is a lamp."], "answer": 0 },
      { "audio": "Where are the books?", "q": "Chọn đáp án đúng.", "options": ["It is on the shelf.", "They are on the bookshelf.", "Yes, there are.", "I read books."], "answer": 1 },
      { "audio": "Is there a sofa in the living room?", "q": "Chọn đáp án đúng.", "options": ["Yes, there is.", "Yes, there are.", "It is under the table.", "No, I don't."], "answer": 0 },
      { "audio": "Are there two chairs next to the table?", "q": "Chọn đáp án đúng.", "options": ["Yes, there is.", "Yes, there are.", "It is a chair.", "Yes, I do."], "answer": 1 },
      { "audio": "The carpet is blank the table.", "q": "The carpet is ___ the table.", "options": ["under", "in", "between", "behind"], "answer": 0 },
      { "audio": "The clock is blank the wall.", "q": "The clock is ___ the wall.", "options": ["in", "on", "under", "next to"], "answer": 1 },
      { "audio": "The cups are blank the cupboard.", "q": "The cups are ___ the cupboard.", "options": ["in", "on", "under", "behind"], "answer": 0 },
      { "audio": "The bed is blank the wardrobe.", "q": "The bed is ___ the wardrobe.", "options": ["next to", "under", "in", "above"], "answer": 0 },
      { "audio": "The plant is blank the sofa.", "q": "The plant is ___ the sofa.", "options": ["behind", "in", "on", "between"], "answer": 0 },
      { "audio": "The coffee table is blank the sofa.", "q": "The coffee table is ___ the sofa.", "options": ["in front of", "under", "in", "above"], "answer": 0 },
      { "audio": "Where is the fridge?", "q": "Chọn đáp án đúng.", "options": ["It is in the kitchen.", "They are in the kitchen.", "Yes, there are.", "It is a fridge."], "answer": 0 },
      { "audio": "Where are the curtains?", "q": "Chọn đáp án đúng.", "options": ["It is near the window.", "They are near the window.", "Yes, it is.", "It is under the bed."], "answer": 1 },
      { "audio": "There blank a lamp on the desk.", "q": "There ___ a lamp on the desk.", "options": ["is", "are", "do", "does"], "answer": 0 },
      { "audio": "There blank four chairs around the table.", "q": "There ___ four chairs around the table.", "options": ["is", "are", "does", "am"], "answer": 1 },
      { "audio": "The shelf is blank the clock.", "q": "The shelf is ___ the clock.", "options": ["below", "in", "on", "under of"], "answer": 0 },
      { "audio": "The clock is blank the sofa.", "q": "The clock is ___ the sofa.", "options": ["above", "in", "between", "on floor"], "answer": 0 },
      { "audio": "Where is the wardrobe?", "q": "Chọn đáp án đúng.", "options": ["It is next to the bed.", "They are next to the bed.", "Yes, there is.", "It is wardrobe."], "answer": 0 },
      { "audio": "Where are the chairs?", "q": "Chọn đáp án đúng.", "options": ["They are around the dining table.", "It is around the dining table.", "Yes, there is.", "No, I don't."], "answer": 0 },
      { "audio": "The lamp is blank the bed and the desk.", "q": "The lamp is ___ the bed and the desk.", "options": ["between", "behind", "under", "on"], "answer": 0 },
      { "audio": "The carpet is blank the floor.", "q": "The carpet is ___ the floor.", "options": ["on", "in", "behind", "above"], "answer": 0 }
    ]
  },
  "translation": {
    "title": "LUYỆN DỊCH: VIỆT → ANH / ANH → VIỆT (20 CÂU)",
    "instruction": "Dịch từng câu. Chú ý There is / There are + vị trí + furniture.",
    "sentences": [
      { "vi": "Có một cái đèn trên bàn học.", "en": "There is a lamp on the desk." },
      { "vi": "Có một tấm thảm dưới bàn trà.", "en": "There is a carpet under the coffee table." },
      { "vi": "Cái ghế ở cạnh bàn học.", "en": "The chair is next to the desk." },
      { "vi": "Những quyển sách ở trên kệ sách.", "en": "The books are on the bookshelf." },
      { "vi": "The sofa is in the living room.", "en": "Ghế sofa ở trong phòng khách." },
      { "vi": "The cups are in the cupboard.", "en": "Những cái cốc ở trong tủ chén." },
      { "vi": "Cái giường ở cạnh cửa sổ.", "en": "The bed is next to the window." },
      { "vi": "Có bốn cái ghế quanh bàn ăn.", "en": "There are four chairs around the dining table." },
      { "vi": "Đồng hồ ở trên tường.", "en": "The clock is on the wall." },
      { "vi": "Cái túi ở phía sau cái ghế.", "en": "The bag is behind the chair." },
      { "vi": "The coffee table is in front of the sofa.", "en": "Bàn trà ở phía trước ghế sofa." },
      { "vi": "There are some curtains near the window.", "en": "Có vài chiếc rèm gần cửa sổ." },
      { "vi": "Cái đèn ở giữa cái giường và bàn học.", "en": "The lamp is between the bed and the desk." },
      { "vi": "Tủ lạnh ở trong phòng bếp.", "en": "The fridge is in the kitchen." },
      { "vi": "Where is the wardrobe?", "en": "Tủ quần áo ở đâu?" },
      { "vi": "It is next to the bed.", "en": "Nó ở cạnh cái giường." },
      { "vi": "Có cái ghế bành gần cửa sổ không?", "en": "Is there an armchair near the window?" },
      { "vi": "Có những cái ghế quanh bàn ăn không?", "en": "Are there any chairs around the dining table?" },
      { "vi": "The shelf is below the clock.", "en": "Cái kệ ở phía dưới đồng hồ." },
      { "vi": "Phòng ngủ của tôi có một cái giường, một bàn học và một tủ quần áo.", "en": "There is a bed, a desk, and a wardrobe in my bedroom." }
    ]
  },
  "dialogueVideo": {
    "title": "Video hội thoại: My Bedroom Tour - Furniture & Prepositions",
    "description": "Hội thoại mô tả phòng ngủ và vị trí đồ nội thất, luyện Where is / Where are, There is / There are và các giới từ chỉ vị trí.",
    "label": "My Bedroom Tour - Furniture & Prepositions",
    "url": "https://www.youtube.com/embed/857G4wBNDDY",
    "embedUrl": "https://www.youtube.com/embed/857G4wBNDDY",
    "sourceUrl": "https://www.youtube.com/watch?v=857G4wBNDDY",
    "watchUrl": "https://www.youtube.com/watch?v=857G4wBNDDY",
    "transcript": [
      { "speaker": "Lan", "en": "Welcome to my bedroom!", "vi": "Chào mừng đến phòng ngủ của mình!" },
      { "speaker": "Tom", "en": "Wow, it looks clean and cozy. Where is your desk?", "vi": "Ồ, trông sạch và ấm cúng quá. Bàn học của bạn ở đâu?" },
      { "speaker": "Lan", "en": "It is next to the window. There is a lamp on the desk.", "vi": "Nó ở cạnh cửa sổ. Có một cái đèn trên bàn học." },
      { "speaker": "Tom", "en": "Nice. Where are your books?", "vi": "Hay quá. Sách của bạn ở đâu?" },
      { "speaker": "Lan", "en": "They are on the bookshelf. The bookshelf is behind the door.", "vi": "Chúng ở trên kệ sách. Kệ sách ở sau cửa." },
      { "speaker": "Tom", "en": "Is there a wardrobe in your room?", "vi": "Có tủ quần áo trong phòng bạn không?" },
      { "speaker": "Lan", "en": "Yes, there is. It is next to the bed.", "vi": "Có. Nó ở cạnh cái giường." },
      { "speaker": "Tom", "en": "What is under the bed?", "vi": "Cái gì ở dưới giường vậy?" },
      { "speaker": "Lan", "en": "There is a box under the bed.", "vi": "Có một cái hộp dưới giường." },
      { "speaker": "Tom", "en": "Great! Your bedroom is very tidy.", "vi": "Tuyệt quá! Phòng ngủ của bạn rất gọn gàng." }
    ],
    "keywords": [
      { "en": "Welcome to my bedroom!", "vi": "Chào mừng đến phòng ngủ của tôi", "example": "Welcome to my bedroom!" },
      { "en": "clean and cozy", "vi": "sạch và ấm cúng", "example": "It looks clean and cozy." },
      { "en": "next to the window", "vi": "cạnh cửa sổ", "example": "The desk is next to the window." },
      { "en": "on the bookshelf", "vi": "trên kệ sách", "example": "The books are on the bookshelf." },
      { "en": "behind the door", "vi": "sau cửa", "example": "The bookshelf is behind the door." },
      { "en": "under the bed", "vi": "dưới giường", "example": "There is a box under the bed." }
    ],
    "comprehension": [
      { "q": "Where is Lan's desk?", "options": ["Behind the door", "Next to the window", "Under the bed", "On the wall"], "answer": 1 },
      { "q": "What is on the desk?", "options": ["A clock", "A lamp", "A box", "A plant"], "answer": 1 },
      { "q": "Where are Lan's books?", "options": ["Under the bed", "In the wardrobe", "On the bookshelf", "Near the sofa"], "answer": 2 },
      { "q": "Where is the wardrobe?", "options": ["In front of the bed", "Next to the bed", "Behind the window", "Under the desk"], "answer": 1 },
      { "q": "What is under the bed?", "options": ["A chair", "A carpet", "A box", "A lamp"], "answer": 2 },
      { "q": "Is Lan's bedroom tidy?", "options": ["No, it isn't.", "Yes, it is.", "It is very messy.", "It is very small."], "answer": 1 }
    ],
    "listenPickLine": [
      {
        "prompt": "Where is your desk?",
        "options": ["It is next to the window.", "They are on the shelf.", "Yes, there is.", "It is a desk."],
        "answer": 0
      },
      {
        "prompt": "Where are your books?",
        "options": ["It is under the bed.", "They are on the bookshelf.", "There is a lamp.", "It is next to the window."],
        "answer": 1
      },
      {
        "prompt": "Is there a wardrobe in your room?",
        "options": ["Yes, there is.", "They are on the bookshelf.", "It is behind the door.", "No, it is a lamp."],
        "answer": 0
      },
      {
        "prompt": "What is under the bed?",
        "options": ["There is a box under the bed.", "It is next to the bed.", "The books are on the desk.", "There is a window."],
        "answer": 0
      },
      {
        "prompt": "Where is the bookshelf?",
        "options": ["The bookshelf is behind the door.", "It is under the bed.", "It is on the lamp.", "They are next to the window."],
        "answer": 0
      },
      {
        "prompt": "What is on the desk?",
        "options": ["There is a lamp on the desk.", "There is a box under the bed.", "There is a wardrobe.", "The bed is behind the door."],
        "answer": 0
      },
      {
        "prompt": "Where is the wardrobe?",
        "options": ["It is next to the bed.", "It is under the desk.", "It is on the bookshelf.", "It is behind the lamp."],
        "answer": 0
      },
      {
        "prompt": "How does the bedroom look?",
        "options": ["It looks clean and cozy.", "It is very noisy.", "It is under the bed.", "It is next to the window."],
        "answer": 0
      },
      {
        "prompt": "What room is this?",
        "options": ["It is a kitchen.", "It is a bedroom.", "It is a bathroom.", "It is a classroom."],
        "answer": 1
      },
      {
        "prompt": "How is the bedroom at the end?",
        "options": ["It is very tidy.", "It is very cold.", "It is very small.", "It is very old."],
        "answer": 0
      }
    ],
    "fillConversation": [
      {
        "wordBank": ["is", "is", "are", "on", "under", "in", "next"],
        "lines": [
          { "speaker": "A", "text": "Where [[is]] your desk?" },
          { "speaker": "B", "text": "It [[is]] next to the window." },
          { "speaker": "A", "text": "Where [[are]] your books?" },
          { "speaker": "B", "text": "They are [[on]] the bookshelf." },
          { "speaker": "A", "text": "Is there a box [[under]] the bed?" },
          { "speaker": "B", "text": "Yes, there is a box under the bed." }
        ]
      },
      {
        "wordBank": ["is", "to", "behind", "on", "tidy", "next", "under"],
        "lines": [
          { "speaker": "A", "text": "Is there a wardrobe in your room?" },
          { "speaker": "B", "text": "Yes, there [[is]]." },
          { "speaker": "A", "text": "Where is the wardrobe?" },
          { "speaker": "B", "text": "It is next [[to]] the bed." },
          { "speaker": "A", "text": "Where is the bookshelf?" },
          { "speaker": "B", "text": "The bookshelf is [[behind]] the door." },
          { "speaker": "A", "text": "What is on the desk?" },
          { "speaker": "B", "text": "There is a lamp [[on]] the desk." },
          { "speaker": "A", "text": "Your bedroom is very [[tidy]]." },
          { "speaker": "B", "text": "Thank you!" }
        ]
      }
    ]
  },
  "speaking": {
    "title": "Luyện nói AI - Furniture & Prepositions",
    "formula": "There is / There are + furniture + preposition + place | Where is...? / Where are...?",
    "turns": [
      { "id": 1, "ai": { "textEn": "Describe your bedroom. What furniture is in your room?", "textVn": "", "audioUrl": "Describe your bedroom. What furniture is in your room?" }, "user": { "formula": "This is my bedroom. There is + [1 đồ vật] + [vị trí]. There are + [nhiều đồ vật] + [vị trí].", "sampleEn": "This is my bedroom. There is a bed next to the window. There is a desk in the corner. There are two lamps on the desk. My room is small but cozy.", "sampleVn": "", "sampleAudioUrl": "This is my bedroom. There is a bed next to the window. There is a desk in the corner. There are two lamps on the desk. My room is small but cozy." } },
      { "id": 2, "ai": { "textEn": "Ask me where three things are in my room.", "textVn": "", "audioUrl": "Ask me where three things are in my room." }, "user": { "formula": "Where is + singular noun? / Where are + plural noun?", "sampleEn": "Where is the lamp? Where are the books? Where is the wardrobe?", "sampleVn": "", "sampleAudioUrl": "Where is the lamp? Where are the books? Where is the wardrobe?" } },
      { "id": 3, "ai": { "textEn": "Where is the lamp? Where are the books?", "textVn": "", "audioUrl": "Where is the lamp? Where are the books?" }, "user": { "formula": "It is + preposition + place. / They are + preposition + place.", "sampleEn": "The lamp is on the desk. The books are on the bookshelf. The chair is next to the desk.", "sampleVn": "", "sampleAudioUrl": "The lamp is on the desk. The books are on the bookshelf. The chair is next to the desk." } },
      { "id": 4, "ai": { "textEn": "Compare your bedroom and your living room. Use furniture and prepositions.", "textVn": "", "audioUrl": "Compare your bedroom and your living room. Use furniture and prepositions." }, "user": { "formula": "In my bedroom, there is/are... In my living room, there is/are...", "sampleEn": "In my bedroom, there is a bed next to the window. There are books on the bookshelf. In my living room, there is a sofa and a TV. The coffee table is in front of the sofa.", "sampleVn": "", "sampleAudioUrl": "In my bedroom, there is a bed next to the window. There are books on the bookshelf. In my living room, there is a sofa and a TV. The coffee table is in front of the sofa." } },
      { "id": 5, "ai": { "textEn": "Describe your dream room. Use at least 5 furniture words and 5 prepositions.", "textVn": "", "audioUrl": "Describe your dream room. Use at least 5 furniture words and 5 prepositions." }, "user": { "formula": "Dùng 6-8 câu: This is my dream room + There is/are + The object is/are + vị trí.", "sampleEn": "This is my dream room. There is a big bed next to the window. There is a desk in front of the bookshelf. There are two lamps on the desk. The carpet is under the coffee table. The wardrobe is on the right.", "sampleVn": "", "sampleAudioUrl": "This is my dream room. There is a big bed next to the window. There is a desk in front of the bookshelf. There are two lamps on the desk. The carpet is under the coffee table. The wardrobe is on the right." } }
    ]
  },
  "minitest": [
    { "type": "vocab", "q": "\"Furniture\" nghĩa là gì?", "options": ["phòng trong nhà", "đồ nội thất", "khu vườn", "địa điểm"], "answer": 1 },
    { "type": "vocab", "q": "\"Wardrobe\" nghĩa là gì?", "options": ["tủ lạnh", "kệ sách", "tủ quần áo", "bồn rửa"], "answer": 2 },
    { "type": "grammar", "q": "The lamp is ___ the desk.", "options": ["in", "on", "behind", "between"], "answer": 1 },
    { "type": "grammar", "q": "The carpet is ___ the table.", "options": ["on", "in", "under", "above"], "answer": 2 },
    { "type": "grammar", "q": "Where ___ the books?", "options": ["is", "are", "do", "does"], "answer": 1 },
    { "type": "grammar", "q": "Where is the fridge? → Trả lời đúng:", "options": ["It is in the kitchen.", "They are in the kitchen.", "Yes, there is.", "It are in the kitchen."], "answer": 0 },
    { "type": "translation", "q": "\"The chair is next to the desk.\" nghĩa là gì?", "options": ["Cái ghế ở dưới bàn học.", "Cái ghế ở cạnh bàn học.", "Cái ghế ở sau bàn học.", "Cái ghế ở trên bàn học."], "answer": 1 },
    { "type": "vocab", "q": "\"Behind\" nghĩa là gì?", "options": ["phía trước", "phía sau", "bên cạnh", "ở giữa"], "answer": 1 },
    { "type": "grammar", "q": "Câu nào đúng?", "options": ["The books is on the shelf.", "The books are on the shelf.", "The books are in the wall.", "The books on the shelf."], "answer": 1 },
    { "type": "grammar", "q": "There ___ two chairs around the table.", "options": ["is", "are", "do", "does"], "answer": 1 },
    { "type": "translation", "q": "\"The coffee table is in front of the sofa.\" nghĩa là gì?", "options": ["Bàn trà ở sau ghế sofa.", "Bàn trà ở phía trước ghế sofa.", "Bàn trà ở dưới ghế sofa.", "Bàn trà ở trong ghế sofa."], "answer": 1 },
    { "type": "vocab", "q": "\"Between\" dùng khi nào?", "options": ["Một vật ở dưới một vật", "Một vật ở trên tường", "Một vật ở giữa hai vật", "Một vật ở trong hộp"], "answer": 2 },
    { "type": "grammar", "q": "The cups are ___ the cupboard.", "options": ["in", "on", "under", "above"], "answer": 0 },
    { "type": "translation", "q": "\"The clock is on the wall.\" nghĩa là gì?", "options": ["Đồng hồ ở trên sàn.", "Đồng hồ ở trên tường.", "Đồng hồ ở dưới bàn.", "Đồng hồ ở trong tủ."], "answer": 1 },
    { "type": "grammar", "q": "\"Are there any pictures on the wall?\" → Trả lời đúng:", "options": ["Yes, there is.", "Yes, there are.", "Yes, it is.", "Yes, they do."], "answer": 1 },
    { "type": "grammar", "q": "\"Is there a lamp on the desk?\" → Trả lời phủ định đúng:", "options": ["No, there isn't.", "No, there aren't.", "No, it doesn't.", "No, I don't."], "answer": 0 },
    { "type": "grammar", "q": "Câu nào SAI ngữ pháp?", "options": ["The lamp is on the desk.", "There is a sofa in the living room.", "There are a carpet under the table.", "The books are on the bookshelf."], "answer": 2 },
    { "type": "vocab", "q": "\"On the floor\" nghĩa là gì?", "options": ["trên tường", "trên sàn", "trong tủ", "dưới bàn"], "answer": 1 },
    { "type": "translation", "q": "\"The plant is behind the sofa.\" nghĩa là gì?", "options": ["Cây ở trước ghế sofa.", "Cây ở sau ghế sofa.", "Cây ở dưới ghế sofa.", "Cây ở trên ghế sofa."], "answer": 1 },
    { "type": "translation", "q": "Dịch: \"Có một cái giường cạnh cửa sổ.\"", "options": ["There are a bed next to the window.", "There is a bed next to the window.", "The bed are next to the window.", "There is a window next to the bed only."], "answer": 1 }
  ],
  "mindmap": {
    "center": "FURNITURE & PREPOSITIONS OF PLACE",
    "branches": [
      { "label": "Furniture", "items": ["Living room: sofa, armchair, coffee table, TV, lamp, carpet, curtains", "Bedroom: bed, wardrobe, desk, chair, bookshelf, shelf", "Kitchen: fridge, stove, sink, cupboard, dining table, chairs"] },
      { "label": "Prepositions", "items": ["in, on, under", "next to, near", "behind, in front of", "between, above, below", "on the left / right, in the corner"] },
      { "label": "Where questions", "items": ["Where is + singular?", "Where are + plural?", "It is + preposition + place.", "They are + preposition + place."] },
      { "label": "There is / There are", "items": ["There is + singular noun.", "There are + plural noun.", "There is a lamp on the desk.", "There are two chairs around the table."] }
    ]
  },
  "homework": [
    "Viết 6-8 câu mô tả phòng ngủ hoặc phòng khách của em. Dùng ít nhất 5 từ furniture, 5 giới từ vị trí, 2 câu There is, 2 câu There are và 1 câu cảm nhận.",
    "Quay video hoặc ghi âm 45-60 giây giới thiệu một phòng trong nhà. Nói ít nhất 5 đồ vật, vị trí của từng đồ vật và 3 câu hỏi/tự trả lời.",
    "Vẽ sơ đồ phòng đơn giản, đánh dấu vị trí đồ vật rồi viết 5 câu mô tả."
  ],
  "homeworkRich": {
    "title": "Homework - My Room / Room Tour",
    "submit": "Nộp bài qua nhóm lớp; khuyến khích nộp ảnh sơ đồ + voice note/video ngắn.",
    "deadline": "Trước buổi học tiếp theo",
    "tasks": [
      { "icon": "🏡", "title": "BÀI TẬP 1: VIẾT - My Room", "badge": "Bắt buộc", "desc": "Viết 6-8 câu mô tả phòng ngủ hoặc phòng khách của em.", "items": ["Dùng ít nhất 5 từ đồ nội thất: bed, desk, chair, wardrobe, bookshelf, sofa, lamp...", "Dùng ít nhất 5 giới từ vị trí: in, on, under, next to, behind, in front of, between...", "Dùng ít nhất 2 câu với There is.", "Dùng ít nhất 2 câu với There are.", "Dùng ít nhất 1 câu cảm nhận: small, big, clean, nice, cozy, beautiful.", "Mẫu: This is my bedroom. There is a bed next to the window. There is a desk in the corner. There are two lamps on the desk. The books are on the bookshelf. There is a carpet under the table. My room is small but cozy."] },
      { "icon": "🎙️", "title": "BÀI TẬP 2: NÓI / GHI ÂM - Room Tour", "badge": "Bắt buộc", "desc": "Quay video hoặc ghi âm 45-60 giây giới thiệu một phòng trong nhà em.", "items": ["Chào và giới thiệu phòng: This is my bedroom/living room.", "Nói ít nhất 5 đồ vật trong phòng.", "Nói vị trí của từng đồ vật.", "Dùng ít nhất 3 câu hỏi/tự trả lời: Where is the lamp? It is on the desk. / Where are the books? They are on the bookshelf. / Is there a sofa? Yes, there is.", "Câu hỏi gợi ý: Where is your bed? Where is your desk? Where are your books? Is there a lamp in your room? Are there any pictures on the wall?"] },
      { "icon": "🗺️", "title": "BÀI TẬP 3: VẼ SƠ ĐỒ PHÒNG - Draw & Describe", "badge": "Luyện thêm", "desc": "Vẽ sơ đồ phòng đơn giản, đánh dấu vị trí đồ vật rồi viết 5 câu mô tả.", "items": ["The bed is next to the window.", "The desk is in front of the bookshelf.", "The carpet is under the coffee table.", "The wardrobe is on the right.", "There are two pictures on the wall."] }
    ]
  },
  "summary": [
    "Biết gọi tên đồ nội thất quen thuộc trong nhà.",
    "Dùng được giới từ vị trí để nói đồ vật ở đâu.",
    "Hỏi và trả lời bằng Where is...? / Where are...?",
    "Mô tả phòng bằng There is / There are + furniture + preposition."
  ],
  "keySentences": [
    "There is a lamp on the desk.",
    "There are two chairs around the dining table.",
    "The sofa is in the living room.",
    "The carpet is under the coffee table.",
    "Where are the books? They are on the bookshelf.",
    "My room is small but cozy."
  ],
  "nextPrep": "Ôn lại furniture, prepositions of place và chuẩn bị nói về đồ vật trong nhà ở dạng dài hơn."
};
applyExpandedLessonTemplate(8, LESSON_8_TEMPLATE);
applyExpandedLessonTemplate(9, LESSON_9_TEMPLATE);
applyExpandedLessonTemplate(10, LESSON_10_TEMPLATE);
applyExpandedLessonTemplate(11, LESSON_11_TEMPLATE);
applyExpandedLessonTemplate(12, LESSON_12_TEMPLATE);

// <lesson-import-overrides>
// scripts/import-lesson-md.js inserts future imported lesson templates above this line.
// <imported-lesson-16>
const LESSON_16_IMPORTED_TEMPLATE = {
  "unit": "Unit 5",
  "title": "Trạng từ chỉ cách thức & Ôn tập",
  "titleVi": "Trạng từ chỉ cách thức & Ôn tập",
  "titleEn": "Adverbs of Manner and Internet Safety Review",
  "cefrLevel": "A1",
  "mainTopic": "Adverbs of manner in computer-class instructions",
  "grammarFocus": "Adverbs of manner; adjective to adverb; irregular adverbs; imperative + adverb; review can/can't and Internet commands",
  "objectives": [
    "Cần bổ sung nội dung theo template Buổi 9"
  ],
  "importStatus": "markdown",
  "review": {
    "title": "Ôn bài cũ - Internet & Imperatives",
    "topic": "Buổi 15 - Internet vocabulary, commands, can/can't",
    "questions": [
      {
        "q": "Which sentence is a correct imperative?",
        "answer": "Open the file, please."
      },
      {
        "q": "Choose the warning sentence.",
        "answer": "Don't click strange links."
      },
      {
        "q": "\"password\" means ___.",
        "answer": "mật khẩu"
      },
      {
        "q": "First, ___ your username.",
        "answer": "type"
      },
      {
        "q": "Then, ___ Log in.",
        "answer": "click"
      },
      {
        "q": "Don't ___ your password with friends.",
        "answer": "share"
      },
      {
        "q": "\"upload\" means ___.",
        "answer": "tải lên"
      },
      {
        "q": "\"download\" means ___.",
        "answer": "tải xuống"
      },
      {
        "q": "Choose the correct order.",
        "answer": "Click the link, then open the website."
      },
      {
        "q": "Save your work and ___.",
        "answer": "log out"
      },
      {
        "q": "Can you use Wi-Fi here? - Yes, I ___.",
        "answer": "can"
      },
      {
        "q": "I ___ open this website. It is blocked.",
        "answer": "can't"
      },
      {
        "q": "Choose the safe instruction.",
        "answer": "Use a strong password."
      },
      {
        "q": "\"online\" is opposite of ___.",
        "answer": "offline"
      },
      {
        "q": "Which verb fits: ___ an email.",
        "answer": "send"
      },
      {
        "q": "Which sentence is correct?",
        "answer": "Don't save the file."
      },
      {
        "q": "\"link\" means ___.",
        "answer": "đường dẫn"
      },
      {
        "q": "Choose the correct instruction.",
        "answer": "Please log in."
      },
      {
        "q": "What should you do after class?",
        "answer": "Log out."
      },
      {
        "q": "Which word is an Internet action?",
        "answer": "click"
      }
    ],
    "structures": [
      "Topic: Buổi 15 - Internet vocabulary, commands, can/can't",
      "Structures: Open the website, please.; Don't click strange links.; First, type your username. Then, click Log in.; Save your work and log out after class.; Can you use Wi-Fi? Yes, I can.",
      "| Nghe và chọn nghĩa đúng của từ 20. | download | trang web | tên đăng nhập | trực tuyến | tải xuống | D | download = tải xuống | download | tải xuống | 🎧 |  |",
      "| Which sentence is a correct imperative? |  | You open the file. | Open the file, please. | Opening the file. | Opens the file. | B | Imperative dùng động từ nguyên mẫu ở đầu câu. |",
      "| Choose the warning sentence. |  | Click strange links. | Don't click strange links. | Clicking strange links. | You clicks strange links. | B | Câu cảnh báo dùng Don't + V. |",
      "| Don't ___ your password with friends. |  | share | shares | sharing | shared | A | Don't + V nguyên mẫu. |"
    ],
    "reviewGames": {
      "title": "Ôn bài cũ - Internet & Imperatives",
      "intro": "Ôn từ vựng Internet và câu mệnh lệnh trước khi học cách nói một hành động được làm như thế nào.",
      "vocabulary": [
        {
          "en": "internet",
          "vi": "mạng Internet",
          "img": "🎧",
          "ipa": "",
          "options": [
            "mạng Internet",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 2",
            "Option 3"
          ],
          "answer": 0
        },
        {
          "en": "website",
          "vi": "trang web",
          "img": "🎧",
          "ipa": "",
          "options": [
            "trang web",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 3",
            "Option 4"
          ],
          "answer": 0
        },
        {
          "en": "email",
          "vi": "email",
          "img": "🎧",
          "ipa": "",
          "options": [
            "email",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 4",
            "Option 5"
          ],
          "answer": 0
        },
        {
          "en": "password",
          "vi": "mật khẩu",
          "img": "🎧",
          "ipa": "",
          "options": [
            "mật khẩu",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 5",
            "Option 6"
          ],
          "answer": 0
        },
        {
          "en": "username",
          "vi": "tên đăng nhập",
          "img": "🎧",
          "ipa": "",
          "options": [
            "tên đăng nhập",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 6",
            "Option 7"
          ],
          "answer": 0
        },
        {
          "en": "account",
          "vi": "tài khoản",
          "img": "🎧",
          "ipa": "",
          "options": [
            "tài khoản",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 7",
            "Option 8"
          ],
          "answer": 0
        },
        {
          "en": "Wi-Fi",
          "vi": "mạng Wi-Fi",
          "img": "🎧",
          "ipa": "",
          "options": [
            "mạng Wi-Fi",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 8",
            "Option 9"
          ],
          "answer": 0
        },
        {
          "en": "online",
          "vi": "trực tuyến",
          "img": "🎧",
          "ipa": "",
          "options": [
            "trực tuyến",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 9",
            "Option 10"
          ],
          "answer": 0
        },
        {
          "en": "offline",
          "vi": "ngoại tuyến",
          "img": "🎧",
          "ipa": "",
          "options": [
            "ngoại tuyến",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 10",
            "Option 11"
          ],
          "answer": 0
        },
        {
          "en": "link",
          "vi": "đường dẫn",
          "img": "🎧",
          "ipa": "",
          "options": [
            "đường dẫn",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 11",
            "Option 12"
          ],
          "answer": 0
        },
        {
          "en": "click",
          "vi": "nhấn chuột",
          "img": "🎧",
          "ipa": "",
          "options": [
            "nhấn chuột",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 12",
            "Option 13"
          ],
          "answer": 0
        },
        {
          "en": "type",
          "vi": "gõ",
          "img": "🎧",
          "ipa": "",
          "options": [
            "gõ",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 13",
            "Option 14"
          ],
          "answer": 0
        },
        {
          "en": "open",
          "vi": "mở",
          "img": "🎧",
          "ipa": "",
          "options": [
            "mở",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 14",
            "Option 15"
          ],
          "answer": 0
        },
        {
          "en": "close",
          "vi": "đóng",
          "img": "🎧",
          "ipa": "",
          "options": [
            "đóng",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 15",
            "Option 16"
          ],
          "answer": 0
        },
        {
          "en": "log in",
          "vi": "đăng nhập",
          "img": "🎧",
          "ipa": "",
          "options": [
            "đăng nhập",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 16",
            "Option 17"
          ],
          "answer": 0
        },
        {
          "en": "log out",
          "vi": "đăng xuất",
          "img": "🎧",
          "ipa": "",
          "options": [
            "đăng xuất",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 17",
            "Option 18"
          ],
          "answer": 0
        },
        {
          "en": "save",
          "vi": "lưu",
          "img": "🎧",
          "ipa": "",
          "options": [
            "lưu",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 18",
            "Option 19"
          ],
          "answer": 0
        },
        {
          "en": "send",
          "vi": "gửi",
          "img": "🎧",
          "ipa": "",
          "options": [
            "gửi",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 19",
            "Option 20"
          ],
          "answer": 0
        },
        {
          "en": "upload",
          "vi": "tải lên",
          "img": "🎧",
          "ipa": "",
          "options": [
            "tải lên",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 20",
            "Option 21"
          ],
          "answer": 0
        },
        {
          "en": "download",
          "vi": "tải xuống",
          "img": "🎧",
          "ipa": "",
          "options": [
            "tải xuống",
            "Cần bổ sung nội dung theo template Buổi 9",
            "Option 21",
            "Option 22"
          ],
          "answer": 0
        }
      ],
      "quizBomb": {
        "questions": [
          {
            "q": "Which sentence is a correct imperative?",
            "options": [
              "You open the file.",
              "Open the file, please.",
              "Opening the file.",
              "Opens the file."
            ],
            "answer": 1,
            "audio": "",
            "explanation": "Imperative dùng động từ nguyên mẫu ở đầu câu."
          },
          {
            "q": "Choose the warning sentence.",
            "options": [
              "Click strange links.",
              "Don't click strange links.",
              "Clicking strange links.",
              "You clicks strange links."
            ],
            "answer": 1,
            "audio": "",
            "explanation": "Câu cảnh báo dùng Don't + V."
          },
          {
            "q": "\"password\" means ___.",
            "options": [
              "tên đăng nhập",
              "mật khẩu",
              "đường dẫn",
              "trang web"
            ],
            "answer": 1,
            "audio": "",
            "explanation": "password = mật khẩu."
          },
          {
            "q": "First, ___ your username.",
            "options": [
              "type",
              "types",
              "typing",
              "to type"
            ],
            "answer": 0,
            "audio": "",
            "explanation": "Sau First trong hướng dẫn dùng động từ nguyên mẫu."
          },
          {
            "q": "Then, ___ Log in.",
            "options": [
              "click",
              "clicks",
              "clicking",
              "clicked"
            ],
            "answer": 0,
            "audio": "",
            "explanation": "Mệnh lệnh: click."
          },
          {
            "q": "Don't ___ your password with friends.",
            "options": [
              "share",
              "shares",
              "sharing",
              "shared"
            ],
            "answer": 0,
            "audio": "",
            "explanation": "Don't + V nguyên mẫu."
          },
          {
            "q": "\"upload\" means ___.",
            "options": [
              "tải xuống",
              "tải lên",
              "đăng xuất",
              "nhấn chuột"
            ],
            "answer": 1,
            "audio": "",
            "explanation": "upload = tải lên."
          },
          {
            "q": "\"download\" means ___.",
            "options": [
              "tải xuống",
              "mở",
              "đóng",
              "gửi"
            ],
            "answer": 0,
            "audio": "",
            "explanation": "download = tải xuống."
          },
          {
            "q": "Choose the correct order.",
            "options": [
              "Click the link, then open the website.",
              "Then click the link, first open website.",
              "Open then first link click.",
              "Website click then first."
            ],
            "answer": 0,
            "audio": "",
            "explanation": "Dùng first/then để chỉ trình tự."
          },
          {
            "q": "Save your work and ___.",
            "options": [
              "log out",
              "logs out",
              "logging out",
              "logged out"
            ],
            "answer": 0,
            "audio": "",
            "explanation": "Trong hướng dẫn dùng động từ nguyên mẫu."
          },
          {
            "q": "Can you use Wi-Fi here? - Yes, I ___.",
            "options": [
              "can",
              "can't",
              "do",
              "am"
            ],
            "answer": 0,
            "audio": "",
            "explanation": "Can question trả lời can/can't."
          },
          {
            "q": "I ___ open this website. It is blocked.",
            "options": [
              "can",
              "can't",
              "am",
              "do"
            ],
            "answer": 1,
            "audio": "",
            "explanation": "Không thể mở: can't."
          },
          {
            "q": "Choose the safe instruction.",
            "options": [
              "Open strange pop-ups.",
              "Type your password everywhere.",
              "Use a strong password.",
              "Share your account."
            ],
            "answer": 2,
            "audio": "",
            "explanation": "Strong password là hướng dẫn an toàn."
          },
          {
            "q": "\"online\" is opposite of ___.",
            "options": [
              "offline",
              "website",
              "account",
              "email"
            ],
            "answer": 0,
            "audio": "",
            "explanation": "online đối nghĩa offline."
          },
          {
            "q": "Which verb fits: ___ an email.",
            "options": [
              "send",
              "sending",
              "sends",
              "sent"
            ],
            "answer": 0,
            "audio": "",
            "explanation": "Cụm từ send an email."
          },
          {
            "q": "Which sentence is correct?",
            "options": [
              "Don't saves the file.",
              "Don't save the file.",
              "Doesn't save the file.",
              "No save the file."
            ],
            "answer": 1,
            "audio": "",
            "explanation": "Mệnh lệnh phủ định: Don't + V."
          },
          {
            "q": "\"link\" means ___.",
            "options": [
              "đường dẫn",
              "mật khẩu",
              "tài khoản",
              "ngoại tuyến"
            ],
            "answer": 0,
            "audio": "",
            "explanation": "link = đường dẫn."
          },
          {
            "q": "Choose the correct instruction.",
            "options": [
              "Please log in.",
              "Please logs in.",
              "Please logging in.",
              "Please logged in."
            ],
            "answer": 0,
            "audio": "",
            "explanation": "Please + V nguyên mẫu."
          },
          {
            "q": "What should you do after class?",
            "options": [
              "Log out.",
              "Share password.",
              "Click strange links.",
              "Delete class files."
            ],
            "answer": 0,
            "audio": "",
            "explanation": "Sau lớp nên đăng xuất."
          },
          {
            "q": "Which word is an Internet action?",
            "options": [
              "quickly",
              "click",
              "carefully",
              "slowly"
            ],
            "answer": 1,
            "audio": "",
            "explanation": "click là hành động Internet."
          }
        ]
      }
    }
  },
  "video": {
    "title": "Adverbs of Manner - English Grammar lesson",
    "channel": "YouTube grammar lesson",
    "duration": "2-6 phút",
    "embedUrl": "https://www.youtube.com/embed/N9_8l4MgJzU",
    "watchUrl": "https://www.youtube.com/watch?v=N9_8l4MgJzU",
    "fallbackSearchUrl": "https://www.youtube.com/results?search_query=adverbs%20of%20manner%20ESL%20quickly%20slowly%20carefully",
    "description": "Video giới thiệu cách dùng trạng từ chỉ cách thức để trả lời câu hỏi How: carefully, quickly, slowly, clearly, well, fast, hard.",
    "scenes": [
      {
        "label": "Ghi chú Dev: Render video embed ở đầu section, sau đó render cảnh chính và câu hỏi A/B/C/D. Nếu iframe lỗi, dùng watchUrl hoặc fallbackSearchUrl. Không in đáp án trước khi học viên chọn."
      },
      {
        "label": "Scene 1: Nhận diện trạng từ chỉ cách thức và câu hỏi How."
      },
      {
        "label": "Scene 2: Đổi tính từ sang trạng từ bằng -ly."
      },
      {
        "label": "Scene 3: Ghi nhớ trạng từ bất quy tắc: good -> well; fast -> fast; hard -> hard."
      }
    ],
    "questions": [
      {
        "q": "Adverbs of manner answer which question?",
        "options": [
          "When?",
          "Where?",
          "How?",
          "How many?"
        ],
        "answer": 2,
        "audio": "",
        "explanation": "Adverbs of manner answer How."
      },
      {
        "q": "Choose the correct sentence.",
        "options": [
          "She speaks clear.",
          "She speaks clearly.",
          "She speaks clearily.",
          "She speak clearly."
        ],
        "answer": 1,
        "audio": "",
        "explanation": "Use clearly after speaks."
      },
      {
        "q": "What is the adverb of good?",
        "options": [
          "goodly",
          "well",
          "good",
          "best"
        ],
        "answer": 1,
        "audio": "",
        "explanation": "good -> well."
      },
      {
        "q": "Which word can be both adjective and adverb?",
        "options": [
          "fast",
          "safe",
          "careful",
          "clear"
        ],
        "answer": 0,
        "audio": "",
        "explanation": "fast giữ nguyên khi làm trạng từ."
      },
      {
        "q": "Where is the adverb in: Type your password carefully?",
        "options": [
          "Before Type",
          "After password",
          "Before your",
          "After Type"
        ],
        "answer": 1,
        "audio": "",
        "explanation": "Sau tân ngữ password."
      }
    ]
  },
  "vocabulary": [
    {
      "en": "carefully",
      "vi": "một cách cẩn thận",
      "ipa": "/ˈkerfəli/",
      "img": "🧐",
      "example": "Type your password carefully.",
      "group": "mainVocabulary"
    },
    {
      "en": "quickly",
      "vi": "một cách nhanh chóng",
      "ipa": "/ˈkwɪkli/",
      "img": "⚡",
      "example": "Open the app quickly.",
      "group": "mainVocabulary"
    },
    {
      "en": "slowly",
      "vi": "một cách chậm rãi",
      "ipa": "/ˈsloʊli/",
      "img": "🐢",
      "example": "Speak slowly, please.",
      "group": "mainVocabulary"
    },
    {
      "en": "clearly",
      "vi": "một cách rõ ràng",
      "ipa": "/ˈklɪrli/",
      "img": "🔊",
      "example": "Say the answer clearly.",
      "group": "mainVocabulary"
    },
    {
      "en": "quietly",
      "vi": "một cách yên lặng",
      "ipa": "/ˈkwaɪətli/",
      "img": "🤫",
      "example": "Read quietly in class.",
      "group": "mainVocabulary"
    },
    {
      "en": "loudly",
      "vi": "một cách to tiếng",
      "ipa": "/ˈlaʊdli/",
      "img": "📣",
      "example": "Do not speak loudly.",
      "group": "mainVocabulary"
    },
    {
      "en": "safely",
      "vi": "một cách an toàn",
      "ipa": "/ˈseɪfli/",
      "img": "🛡️",
      "example": "Use the internet safely.",
      "group": "mainVocabulary"
    },
    {
      "en": "politely",
      "vi": "một cách lịch sự",
      "ipa": "/pəˈlaɪtli/",
      "img": "🙏",
      "example": "Ask politely.",
      "group": "mainVocabulary"
    },
    {
      "en": "patiently",
      "vi": "một cách kiên nhẫn",
      "ipa": "/ˈpeɪʃntli/",
      "img": "⏳",
      "example": "Wait patiently.",
      "group": "mainVocabulary"
    },
    {
      "en": "easily",
      "vi": "một cách dễ dàng",
      "ipa": "/ˈiːzəli/",
      "img": "🙂",
      "example": "I can do it easily.",
      "group": "mainVocabulary"
    },
    {
      "en": "correctly",
      "vi": "một cách chính xác",
      "ipa": "/kəˈrektli/",
      "img": "✅",
      "example": "Answer correctly.",
      "group": "mainVocabulary"
    },
    {
      "en": "badly",
      "vi": "một cách tệ",
      "ipa": "/ˈbædli/",
      "img": "😟",
      "example": "He plays badly today.",
      "group": "mainVocabulary"
    },
    {
      "en": "well",
      "vi": "tốt; giỏi",
      "ipa": "/wel/",
      "img": "🌟",
      "example": "She speaks English well.",
      "group": "mainVocabulary"
    },
    {
      "en": "fast",
      "vi": "nhanh",
      "ipa": "/fæst/",
      "img": "🏃",
      "example": "He types fast.",
      "group": "mainVocabulary"
    },
    {
      "en": "hard",
      "vi": "chăm chỉ; mạnh",
      "ipa": "/hɑːrd/",
      "img": "💪",
      "example": "They work hard.",
      "group": "mainVocabulary"
    },
    {
      "en": "type carefully",
      "vi": "gõ cẩn thận",
      "ipa": "",
      "img": "⌨️",
      "example": "Type your password carefully.",
      "group": "lessonPhrases"
    },
    {
      "en": "click safely",
      "vi": "nhấn an toàn",
      "ipa": "",
      "img": "🖱️",
      "example": "Click safely on trusted links.",
      "group": "lessonPhrases"
    },
    {
      "en": "speak clearly",
      "vi": "nói rõ ràng",
      "ipa": "",
      "img": "🗣️",
      "example": "Speak clearly in the video.",
      "group": "lessonPhrases"
    },
    {
      "en": "listen carefully",
      "vi": "nghe cẩn thận",
      "ipa": "",
      "img": "👂",
      "example": "Listen carefully to the audio.",
      "group": "lessonPhrases"
    },
    {
      "en": "read quietly",
      "vi": "đọc yên lặng",
      "ipa": "",
      "img": "📖",
      "example": "Read quietly after you finish.",
      "group": "lessonPhrases"
    },
    {
      "en": "run quickly",
      "vi": "chạy nhanh",
      "ipa": "",
      "img": "🏃",
      "example": "He can run quickly.",
      "group": "lessonPhrases"
    },
    {
      "en": "walk slowly",
      "vi": "đi chậm",
      "ipa": "",
      "img": "🚶",
      "example": "Walk slowly in the hallway.",
      "group": "lessonPhrases"
    },
    {
      "en": "answer correctly",
      "vi": "trả lời đúng",
      "ipa": "",
      "img": "✅",
      "example": "Answer the question correctly.",
      "group": "lessonPhrases"
    },
    {
      "en": "ask politely",
      "vi": "hỏi lịch sự",
      "ipa": "",
      "img": "🙋",
      "example": "Ask the teacher politely.",
      "group": "lessonPhrases"
    },
    {
      "en": "wait patiently",
      "vi": "chờ kiên nhẫn",
      "ipa": "",
      "img": "🪑",
      "example": "Wait patiently for your turn.",
      "group": "lessonPhrases"
    },
    {
      "en": "work hard",
      "vi": "làm việc chăm chỉ",
      "ipa": "",
      "img": "💪",
      "example": "We work hard every lesson.",
      "group": "lessonPhrases"
    },
    {
      "en": "do homework carefully",
      "vi": "làm bài tập cẩn thận",
      "ipa": "",
      "img": "✍️",
      "example": "Do your homework carefully.",
      "group": "lessonPhrases"
    },
    {
      "en": "log in safely",
      "vi": "đăng nhập an toàn",
      "ipa": "",
      "img": "🔐",
      "example": "Log in safely with your password.",
      "group": "lessonPhrases"
    },
    {
      "en": "open the app quickly",
      "vi": "mở app nhanh",
      "ipa": "",
      "img": "📱",
      "example": "Open the app quickly.",
      "group": "lessonPhrases"
    },
    {
      "en": "write clearly",
      "vi": "viết rõ ràng",
      "ipa": "",
      "img": "✍️",
      "example": "Write your answer clearly.",
      "group": "lessonPhrases"
    }
  ],
  "vocabGroups": {
    "mainVocabulary": "mainVocabulary",
    "lessonPhrases": "lessonPhrases"
  },
  "listenPick": {
    "questions": [
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "một cách cẩn thận",
          "một cách chậm rãi",
          "một cách to tiếng",
          "một cách kiên nhẫn"
        ],
        "answer": 0,
        "audio": "carefully",
        "explanation": "carefully = một cách cẩn thận"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "một cách dễ dàng",
          "một cách nhanh chóng",
          "một cách rõ ràng",
          "một cách an toàn"
        ],
        "answer": 1,
        "audio": "quickly",
        "explanation": "quickly = một cách nhanh chóng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "một cách lịch sự",
          "một cách chính xác",
          "một cách chậm rãi",
          "một cách yên lặng"
        ],
        "answer": 2,
        "audio": "slowly",
        "explanation": "slowly = một cách chậm rãi"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "một cách to tiếng",
          "một cách kiên nhẫn",
          "một cách tệ",
          "một cách rõ ràng"
        ],
        "answer": 3,
        "audio": "clearly",
        "explanation": "clearly = một cách rõ ràng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "một cách yên lặng",
          "một cách an toàn",
          "một cách dễ dàng",
          "tốt; giỏi"
        ],
        "answer": 0,
        "audio": "quietly",
        "explanation": "quietly = một cách yên lặng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "nhanh",
          "một cách to tiếng",
          "một cách lịch sự",
          "một cách chính xác"
        ],
        "answer": 1,
        "audio": "loudly",
        "explanation": "loudly = một cách to tiếng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "một cách tệ",
          "chăm chỉ; mạnh",
          "một cách an toàn",
          "một cách kiên nhẫn"
        ],
        "answer": 2,
        "audio": "safely",
        "explanation": "safely = một cách an toàn"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "một cách dễ dàng",
          "tốt; giỏi",
          "gõ cẩn thận",
          "một cách lịch sự"
        ],
        "answer": 3,
        "audio": "politely",
        "explanation": "politely = một cách lịch sự"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "một cách kiên nhẫn",
          "một cách chính xác",
          "nhanh",
          "nhấn an toàn"
        ],
        "answer": 0,
        "audio": "patiently",
        "explanation": "patiently = một cách kiên nhẫn"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "nói rõ ràng",
          "một cách dễ dàng",
          "một cách tệ",
          "chăm chỉ; mạnh"
        ],
        "answer": 1,
        "audio": "easily",
        "explanation": "easily = một cách dễ dàng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "gõ cẩn thận",
          "nghe cẩn thận",
          "một cách chính xác",
          "tốt; giỏi"
        ],
        "answer": 2,
        "audio": "correctly",
        "explanation": "correctly = một cách chính xác"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "nhanh",
          "nhấn an toàn",
          "đọc yên lặng",
          "một cách tệ"
        ],
        "answer": 3,
        "audio": "badly",
        "explanation": "badly = một cách tệ"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "tốt; giỏi",
          "chăm chỉ; mạnh",
          "nói rõ ràng",
          "chạy nhanh"
        ],
        "answer": 0,
        "audio": "well",
        "explanation": "well = tốt; giỏi"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "đi chậm",
          "nhanh",
          "gõ cẩn thận",
          "nghe cẩn thận"
        ],
        "answer": 1,
        "audio": "fast",
        "explanation": "fast = nhanh"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "đọc yên lặng",
          "trả lời đúng",
          "chăm chỉ; mạnh",
          "nhấn an toàn"
        ],
        "answer": 2,
        "audio": "hard",
        "explanation": "hard = chăm chỉ; mạnh"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "nói rõ ràng",
          "chạy nhanh",
          "hỏi lịch sự",
          "gõ cẩn thận"
        ],
        "answer": 3,
        "audio": "type carefully",
        "explanation": "type carefully = gõ cẩn thận"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "nhấn an toàn",
          "nghe cẩn thận",
          "đi chậm",
          "chờ kiên nhẫn"
        ],
        "answer": 0,
        "audio": "click safely",
        "explanation": "click safely = nhấn an toàn"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "làm việc chăm chỉ",
          "nói rõ ràng",
          "đọc yên lặng",
          "trả lời đúng"
        ],
        "answer": 1,
        "audio": "speak clearly",
        "explanation": "speak clearly = nói rõ ràng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "hỏi lịch sự",
          "làm bài cẩn thận",
          "nghe cẩn thận",
          "chạy nhanh"
        ],
        "answer": 2,
        "audio": "listen carefully",
        "explanation": "listen carefully = nghe cẩn thận"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "options": [
          "đi chậm",
          "chờ kiên nhẫn",
          "đăng nhập an toàn",
          "đọc yên lặng"
        ],
        "answer": 3,
        "audio": "read quietly",
        "explanation": "read quietly = đọc yên lặng"
      }
    ]
  },
  "grammar": {
    "title": "Adverbs of manner; adjective to adverb; irregular adverbs; imperative + adverb; review can/can't and Internet commands",
    "intro": "Ghi chú Dev: Import vào `grammar.structures`. Có 5 cấu trúc. Bảng chứa công thức, ý nghĩa, ví dụ, ngữ cảnh và lỗi thường gặp. UI có thể render dạng bảng công thức + thẻ ví dụ + common mistakes.",
    "structures": [
      {
        "num": 1,
        "pattern": "S + V + adverb",
        "vi": "Ai đó làm gì như thế nào",
        "style": "Trạng từ trả lời câu hỏi How? và thường đứng sau động từ.",
        "example": "She speaks clearly.",
        "exampleVi": "Cô ấy nói rõ ràng.",
        "context": "Dùng khi mô tả cách nói, nghe, chạy, làm việc.",
        "commonMistake": "Không dùng adjective sau verb hành động: She speaks clear."
      },
      {
        "num": 2,
        "pattern": "S + V + object + adverb",
        "vi": "Ai đó làm việc gì như thế nào",
        "style": "Khi có tân ngữ, trạng từ thường đứng sau tân ngữ.",
        "example": "Type your password carefully.",
        "exampleVi": "Hãy gõ mật khẩu của bạn cẩn thận.",
        "context": "Rất hợp với Internet instructions: type, click, open, save.",
        "commonMistake": "Không chen trạng từ giữa động từ và tân ngữ: Type carefully your password."
      },
      {
        "num": 3,
        "pattern": "Adjective + -ly -> adverb",
        "vi": "Tính từ đổi thành trạng từ",
        "style": "careful -> carefully; quick -> quickly; slow -> slowly; clear -> clearly.",
        "example": "Open the app quickly.",
        "exampleVi": "Mở ứng dụng nhanh.",
        "context": "Dùng để tạo trạng từ thường gặp.",
        "commonMistake": "Không viết sai chính tả: carefuly, quick, slow trong vị trí trạng từ."
      },
      {
        "num": 4,
        "pattern": "Irregular adverbs: good -> well; fast -> fast; hard -> hard",
        "vi": "Một số trạng từ bất quy tắc",
        "style": "Không phải từ nào cũng thêm -ly.",
        "example": "She speaks English well, and he types fast.",
        "exampleVi": "Cô ấy nói tiếng Anh tốt, và anh ấy gõ nhanh.",
        "context": "Dùng cho năng lực và tốc độ.",
        "commonMistake": "Không dùng goodly, fastly, hardly khi muốn nói chăm chỉ."
      },
      {
        "num": 5,
        "pattern": "Imperative + adverb",
        "vi": "Mệnh lệnh cộng trạng từ",
        "style": "Verb + object + adverb; Don't + V + adverb.",
        "example": "Don't click strange links too quickly.",
        "exampleVi": "Đừng nhấn các link lạ quá nhanh.",
        "context": "Dùng khi nhắc bạn học làm việc an toàn trên Internet.",
        "commonMistake": "Sau Don't phải dùng V nguyên mẫu, không thêm s/es."
      }
    ],
    "commonQA": [
      {
        "q": "| Adjective + -ly",
        "a": "adverb | Tính từ đổi thành trạng từ | careful -> carefully; quick -> quickly; slow -> slowly; clear -> clearly. | Open the app quickly. | Mở ứng dụng nhanh. | Dùng để tạo trạng từ thường gặp. | Không viết sai chính tả: carefuly, quick, slow trong vị trí trạng từ. |"
      },
      {
        "q": "| Irregular adverbs: good",
        "a": "well; fast -> fast; hard -> hard | Một số trạng từ bất quy tắc | Không phải từ nào cũng thêm -ly. | She speaks English well, and he types fast. | Cô ấy nói tiếng Anh tốt, và anh ấy gõ nhanh. | Dùng cho năng lực và tốc độ. | Không dùng goodly, fastly, hardly khi muốn nói chăm chỉ. |"
      },
      {
        "q": "How does she speak?",
        "a": "She speaks clearly."
      },
      {
        "q": "How should I type my password?",
        "a": "Type your password carefully."
      },
      {
        "q": "What is the adverb of good?",
        "a": "Well."
      },
      {
        "q": "Can I say fastly?",
        "a": "No. Say fast."
      }
    ]
  },
  "listening": {
    "questions": [
      {
        "q": "She speaks English ___.",
        "options": [
          "good",
          "well",
          "goodly",
          "nice"
        ],
        "answer": 1,
        "audio": "She speaks English ___.",
        "explanation": "good đổi thành well khi làm trạng từ."
      },
      {
        "q": "Type your password ___.",
        "options": [
          "careful",
          "carefully",
          "care",
          "cares"
        ],
        "answer": 1,
        "audio": "Type your password ___.",
        "explanation": "Sau động từ type cần trạng từ."
      },
      {
        "q": "Walk ___, please.",
        "options": [
          "slow",
          "slowly",
          "slows",
          "slower"
        ],
        "answer": 1,
        "audio": "Walk ___, please.",
        "explanation": "slowly mô tả cách đi."
      },
      {
        "q": "Listen ___ to the teacher.",
        "options": [
          "carefully",
          "careful",
          "care",
          "cares"
        ],
        "answer": 0,
        "audio": "Listen ___ to the teacher.",
        "explanation": "Listen carefully là cụm đúng."
      },
      {
        "q": "He runs ___.",
        "options": [
          "quick",
          "quickly",
          "quicks",
          "quickness"
        ],
        "answer": 1,
        "audio": "He runs ___.",
        "explanation": "quickly là trạng từ."
      },
      {
        "q": "Good changes to which adverb?",
        "options": [
          "goodly",
          "well",
          "good",
          "goods"
        ],
        "answer": 1,
        "audio": "Good changes to which adverb?",
        "explanation": "good -> well."
      },
      {
        "q": "Fast as an adverb is ___.",
        "options": [
          "fast",
          "fastly",
          "fasterly",
          "fastness"
        ],
        "answer": 0,
        "audio": "Fast as an adverb is ___.",
        "explanation": "fast giữ nguyên."
      },
      {
        "q": "Don't speak ___ in class.",
        "options": [
          "loud",
          "loudly",
          "louds",
          "louder"
        ],
        "answer": 1,
        "audio": "Don't speak ___ in class.",
        "explanation": "speak loudly."
      },
      {
        "q": "Use the internet ___.",
        "options": [
          "safe",
          "safely",
          "safety",
          "safes"
        ],
        "answer": 1,
        "audio": "Use the internet ___.",
        "explanation": "safely là trạng từ."
      },
      {
        "q": "They work ___ every day.",
        "options": [
          "hard",
          "hardly",
          "hardlyly",
          "hardness"
        ],
        "answer": 0,
        "audio": "They work ___ every day.",
        "explanation": "work hard = làm việc chăm chỉ."
      },
      {
        "q": "Please write your answer ___.",
        "options": [
          "clear",
          "clearly",
          "clearness",
          "clears"
        ],
        "answer": 1,
        "audio": "Please write your answer ___.",
        "explanation": "write clearly."
      },
      {
        "q": "Ask your question ___.",
        "options": [
          "polite",
          "politely",
          "polites",
          "politeness"
        ],
        "answer": 1,
        "audio": "Ask your question ___.",
        "explanation": "ask politely."
      },
      {
        "q": "Wait ___ for your turn.",
        "options": [
          "patient",
          "patiently",
          "patience",
          "patients"
        ],
        "answer": 1,
        "audio": "Wait ___ for your turn.",
        "explanation": "wait patiently."
      },
      {
        "q": "I can finish this exercise ___.",
        "options": [
          "easy",
          "easily",
          "easiness",
          "easier"
        ],
        "answer": 1,
        "audio": "I can finish this exercise ___.",
        "explanation": "easy -> easily."
      },
      {
        "q": "Answer the question ___.",
        "options": [
          "correct",
          "correctly",
          "correction",
          "corrects"
        ],
        "answer": 1,
        "audio": "Answer the question ___.",
        "explanation": "answer correctly."
      },
      {
        "q": "He plays the game ___.",
        "options": [
          "bad",
          "badly",
          "badness",
          "bads"
        ],
        "answer": 1,
        "audio": "He plays the game ___.",
        "explanation": "bad -> badly."
      },
      {
        "q": "Open the app ___.",
        "options": [
          "quick",
          "quickly",
          "quicker",
          "quickness"
        ],
        "answer": 1,
        "audio": "Open the app ___.",
        "explanation": "open quickly."
      },
      {
        "q": "Read ___ after the test.",
        "options": [
          "quiet",
          "quietly",
          "quiets",
          "quietness"
        ],
        "answer": 1,
        "audio": "Read ___ after the test.",
        "explanation": "read quietly."
      },
      {
        "q": "Don't answer too ___.",
        "options": [
          "quick",
          "quickly",
          "quickness",
          "quicks"
        ],
        "answer": 1,
        "audio": "Don't answer too ___.",
        "explanation": "too quickly."
      },
      {
        "q": "Log in ___ with your password.",
        "options": [
          "safe",
          "safely",
          "safety",
          "safes"
        ],
        "answer": 1,
        "audio": "Log in ___ with your password.",
        "explanation": "log in safely."
      }
    ]
  },
  "translation": {
    "sentences": [
      {
        "vi": "Hãy gõ mật khẩu cẩn thận.",
        "en": "Type your password carefully.",
        "direction": "vi-en"
      },
      {
        "vi": "Đừng nhấn link lạ quá nhanh.",
        "en": "Don't click strange links too quickly.",
        "direction": "vi-en"
      },
      {
        "vi": "Làm ơn nói chậm.",
        "en": "Speak slowly, please.",
        "direction": "vi-en"
      },
      {
        "vi": "Cô ấy nói tiếng Anh rất tốt.",
        "en": "She speaks English very well.",
        "direction": "vi-en"
      },
      {
        "vi": "Sử dụng Internet an toàn.",
        "en": "Use the internet safely.",
        "direction": "en-vi"
      },
      {
        "vi": "Nghe audio cẩn thận.",
        "en": "Listen carefully to the audio.",
        "direction": "vi-en"
      },
      {
        "vi": "Anh ấy chạy nhanh.",
        "en": "He runs quickly.",
        "direction": "vi-en"
      },
      {
        "vi": "Đọc câu hỏi yên lặng.",
        "en": "Read the question quietly.",
        "direction": "vi-en"
      },
      {
        "vi": "Hỏi giáo viên một cách lịch sự.",
        "en": "Ask the teacher politely.",
        "direction": "vi-en"
      },
      {
        "vi": "Chờ đến lượt của bạn một cách kiên nhẫn.",
        "en": "Wait patiently for your turn.",
        "direction": "en-vi"
      },
      {
        "vi": "Tôi có thể làm bài này dễ dàng.",
        "en": "I can do this exercise easily.",
        "direction": "vi-en"
      },
      {
        "vi": "Họ làm việc chăm chỉ sau giờ học.",
        "en": "They work hard after class.",
        "direction": "vi-en"
      },
      {
        "vi": "Trả lời câu hỏi chính xác.",
        "en": "Answer the question correctly.",
        "direction": "vi-en"
      },
      {
        "vi": "Mở ứng dụng nhanh.",
        "en": "Open the app quickly.",
        "direction": "vi-en"
      },
      {
        "vi": "Đừng nói to trong lớp.",
        "en": "Do not speak loudly in class.",
        "direction": "en-vi"
      },
      {
        "vi": "Cô ấy đi bộ chậm trong hành lang.",
        "en": "She walks slowly in the hallway.",
        "direction": "vi-en"
      },
      {
        "vi": "Anh ấy gõ nhanh nhưng không cẩn thận.",
        "en": "He types fast, but not carefully.",
        "direction": "vi-en"
      },
      {
        "vi": "Viết tin nhắn rõ ràng.",
        "en": "Write the message clearly.",
        "direction": "vi-en"
      },
      {
        "vi": "Làm bài tập cẩn thận trước khi gửi.",
        "en": "Do your homework carefully before you send it.",
        "direction": "vi-en"
      },
      {
        "vi": "Đăng nhập an toàn và đăng xuất sau giờ học.",
        "en": "Log in safely and log out after class.",
        "direction": "en-vi"
      }
    ]
  },
  "dialogueVideo": {
    "title": "Computer Class Dialogue - Listen Carefully and Use the Internet Safely",
    "description": "Hội thoại lớp máy tính dùng trạng từ chỉ cách thức trong hướng dẫn thật: listen carefully, open quickly, type carefully, answer correctly, ask politely, wait patiently.",
    "embedUrl": "https://www.youtube.com/embed/N9_8l4MgJzU",
    "watchUrl": "https://www.youtube.com/watch?v=N9_8l4MgJzU",
    "fallbackSearchUrl": "https://www.youtube.com/results?search_query=ESL%20computer%20class%20dialogue%20adverbs%20of%20manner",
    "transcript": [
      {
        "speaker": "Teacher",
        "en": "Listen carefully, everyone.",
        "vi": "Cả lớp nghe cẩn thận nhé.",
        "keyword": "carefully",
        "audioText": "Listen carefully, everyone."
      },
      {
        "speaker": "Student A",
        "en": "Should we open the class website now?",
        "vi": "Chúng em nên mở website lớp bây giờ không?",
        "keyword": "open",
        "audioText": "Should we open the class website now?"
      },
      {
        "speaker": "Teacher",
        "en": "Yes. Open it quickly, but type your password carefully.",
        "vi": "Có. Mở nhanh, nhưng gõ mật khẩu cẩn thận.",
        "keyword": "quickly",
        "audioText": "Yes. Open it quickly, but type your password carefully."
      },
      {
        "speaker": "Student B",
        "en": "I can't hear the audio clearly.",
        "vi": "Em không nghe rõ audio.",
        "keyword": "clearly",
        "audioText": "I can't hear the audio clearly."
      },
      {
        "speaker": "Teacher",
        "en": "Please put on your headphones and listen carefully.",
        "vi": "Hãy đeo tai nghe và nghe cẩn thận.",
        "keyword": "listen carefully",
        "audioText": "Please put on your headphones and listen carefully."
      },
      {
        "speaker": "Student A",
        "en": "Can I answer now?",
        "vi": "Em có thể trả lời bây giờ không?",
        "keyword": "can",
        "audioText": "Can I answer now?"
      },
      {
        "speaker": "Teacher",
        "en": "Yes, but don't answer too quickly.",
        "vi": "Có, nhưng đừng trả lời quá nhanh.",
        "keyword": "too quickly",
        "audioText": "Yes, but don't answer too quickly."
      },
      {
        "speaker": "Student B",
        "en": "I answered correctly!",
        "vi": "Em trả lời đúng rồi!",
        "keyword": "correctly",
        "audioText": "I answered correctly!"
      },
      {
        "speaker": "Teacher",
        "en": "Great. Now read the next question quietly.",
        "vi": "Tốt. Bây giờ hãy đọc câu tiếp theo yên lặng.",
        "keyword": "quietly",
        "audioText": "Great. Now read the next question quietly."
      },
      {
        "speaker": "Student A",
        "en": "Should I ask my question politely?",
        "vi": "Em nên hỏi câu hỏi của mình lịch sự không?",
        "keyword": "politely",
        "audioText": "Should I ask my question politely?"
      },
      {
        "speaker": "Teacher",
        "en": "Yes. Ask politely and wait patiently.",
        "vi": "Đúng. Hỏi lịch sự và chờ kiên nhẫn.",
        "keyword": "patiently",
        "audioText": "Yes. Ask politely and wait patiently."
      },
      {
        "speaker": "Student B",
        "en": "We can use the internet safely in class.",
        "vi": "Chúng em có thể dùng Internet an toàn trong lớp.",
        "keyword": "safely",
        "audioText": "We can use the internet safely in class."
      }
    ],
    "keywords": [
      {
        "en": "listen carefully",
        "vi": "nghe cẩn thận",
        "ipa": "",
        "img": "👂",
        "example": "Listen carefully, everyone.",
        "group": "dialogueKeywords"
      },
      {
        "en": "open quickly",
        "vi": "mở nhanh",
        "ipa": "",
        "img": "⚡",
        "example": "Open it quickly.",
        "group": "dialogueKeywords"
      },
      {
        "en": "type carefully",
        "vi": "gõ cẩn thận",
        "ipa": "",
        "img": "⌨️",
        "example": "Type your password carefully.",
        "group": "dialogueKeywords"
      },
      {
        "en": "hear clearly",
        "vi": "nghe rõ",
        "ipa": "",
        "img": "🔊",
        "example": "I can't hear clearly.",
        "group": "dialogueKeywords"
      },
      {
        "en": "answer correctly",
        "vi": "trả lời đúng",
        "ipa": "",
        "img": "✅",
        "example": "I answered correctly.",
        "group": "dialogueKeywords"
      },
      {
        "en": "read quietly",
        "vi": "đọc yên lặng",
        "ipa": "",
        "img": "📖",
        "example": "Read quietly.",
        "group": "dialogueKeywords"
      },
      {
        "en": "ask politely",
        "vi": "hỏi lịch sự",
        "ipa": "",
        "img": "🙏",
        "example": "Ask politely.",
        "group": "dialogueKeywords"
      },
      {
        "en": "wait patiently",
        "vi": "chờ kiên nhẫn",
        "ipa": "",
        "img": "⏳",
        "example": "Wait patiently.",
        "group": "dialogueKeywords"
      },
      {
        "en": "use safely",
        "vi": "sử dụng an toàn",
        "ipa": "",
        "img": "🛡️",
        "example": "Use the internet safely.",
        "group": "dialogueKeywords"
      },
      {
        "en": "too quickly",
        "vi": "quá nhanh",
        "ipa": "",
        "img": "⏱️",
        "example": "Don't answer too quickly.",
        "group": "dialogueKeywords"
      }
    ],
    "comprehension": [
      {
        "q": "What should students do first?",
        "options": [
          "Speak loudly.",
          "Share passwords.",
          "Close the lesson.",
          "A"
        ],
        "answer": 0,
        "audio": "Listen carefully.",
        "explanation": ""
      },
      {
        "q": "How should students open the website?",
        "options": [
          "Quickly, but safely.",
          "Loudly.",
          "Badly.",
          "B"
        ],
        "answer": 0,
        "audio": "Slowly only.",
        "explanation": ""
      },
      {
        "q": "What problem does Student B have?",
        "options": [
          "He cannot run fast.",
          "He cannot write loudly.",
          "He cannot wait patiently.",
          "A"
        ],
        "answer": 0,
        "audio": "He cannot hear clearly.",
        "explanation": ""
      },
      {
        "q": "What should students avoid when answering?",
        "options": [
          "Listening carefully.",
          "Asking politely.",
          "Logging in safely.",
          "A"
        ],
        "answer": 0,
        "audio": "Answering too quickly.",
        "explanation": ""
      },
      {
        "q": "What is the final safety idea?",
        "options": [
          "Use strange links fast.",
          "Speak loudly online.",
          "Work badly.",
          "A"
        ],
        "answer": 0,
        "audio": "Use the internet safely in class.",
        "explanation": ""
      }
    ],
    "listenPickLine": [
      {
        "prompt": "Listen carefully, everyone.",
        "audioText": "Listen carefully, everyone.",
        "options": [
          "Listen carefully, everyone.",
          "Open a strange link now.",
          "Speak very loudly in class.",
          "Share your password with friends."
        ],
        "answer": 0
      },
      {
        "prompt": "Should we open the class website now?",
        "audioText": "Should we open the class website now?",
        "options": [
          "Should we open the class website now?",
          "Share your password with friends.",
          "Close the lesson and go offline.",
          "Download a game quickly."
        ],
        "answer": 0
      },
      {
        "prompt": "Yes. Open it quickly, but type your password carefully.",
        "audioText": "Yes. Open it quickly, but type your password carefully.",
        "options": [
          "Yes. Open it quickly, but type your password carefully.",
          "Download a game quickly.",
          "Type random words into the box.",
          "Read the answer before listening."
        ],
        "answer": 0
      },
      {
        "prompt": "I can't hear the audio clearly.",
        "audioText": "I can't hear the audio clearly.",
        "options": [
          "I can't hear the audio clearly.",
          "Read the answer before listening.",
          "Log out before the teacher starts.",
          "Click every pop-up."
        ],
        "answer": 0
      },
      {
        "prompt": "Please put on your headphones and listen carefully.",
        "audioText": "Please put on your headphones and listen carefully.",
        "options": [
          "Please put on your headphones and listen carefully.",
          "Click every pop-up.",
          "Send the password to the group.",
          "Open a strange link now."
        ],
        "answer": 0
      },
      {
        "prompt": "Can I answer now?",
        "audioText": "Can I answer now?",
        "options": [
          "Can I answer now?",
          "Open a strange link now.",
          "Speak very loudly in class.",
          "Share your password with friends."
        ],
        "answer": 0
      },
      {
        "prompt": "Yes, but don't answer too quickly.",
        "audioText": "Yes, but don't answer too quickly.",
        "options": [
          "Yes, but don't answer too quickly.",
          "Share your password with friends.",
          "Close the lesson and go offline.",
          "Download a game quickly."
        ],
        "answer": 0
      },
      {
        "prompt": "I answered correctly!",
        "audioText": "I answered correctly!",
        "options": [
          "I answered correctly!",
          "Download a game quickly.",
          "Type random words into the box.",
          "Read the answer before listening."
        ],
        "answer": 0
      },
      {
        "prompt": "Great. Now read the next question quietly.",
        "audioText": "Great. Now read the next question quietly.",
        "options": [
          "Great. Now read the next question quietly.",
          "Read the answer before listening.",
          "Log out before the teacher starts.",
          "Click every pop-up."
        ],
        "answer": 0
      },
      {
        "prompt": "Should I ask my question politely?",
        "audioText": "Should I ask my question politely?",
        "options": [
          "Should I ask my question politely?",
          "Click every pop-up.",
          "Send the password to the group.",
          "Open a strange link now."
        ],
        "answer": 0
      }
    ],
    "fillConversation": [
      {
        "lines": [
          {
            "speaker": "A",
            "text": "Teacher: Open the website [[quickly]], please."
          },
          {
            "speaker": "B",
            "text": "Student A: Should I type my password [[carefully]]?"
          },
          {
            "speaker": "A",
            "text": "Teacher: Yes. Listen to the audio [[carefully]]."
          },
          {
            "speaker": "B",
            "text": "Student B: I can't hear it [[clearly]]."
          },
          {
            "speaker": "A",
            "text": "Teacher: Don't answer [[too quickly]]."
          },
          {
            "speaker": "B",
            "text": "Student A: We worked [[hard]] today."
          },
          {
            "speaker": "A",
            "text": "Teacher: Good. Use the internet [[safely]]."
          },
          {
            "speaker": "B",
            "text": "Student B: I will ask [[politely]] and wait [[patiently]]."
          }
        ],
        "wordBank": [
          "carefully",
          "quickly",
          "clearly",
          "too quickly",
          "hard",
          "safely",
          "politely",
          "patiently"
        ],
        "explanations": []
      }
    ]
  },
  "speaking": {
    "turns": [
      {
        "id": 1,
        "ai": {
          "textEn": "Tell me three adverbs from today's lesson."
        },
        "user": {
          "formula": "I know + adverb 1, adverb 2, and adverb 3.",
          "sampleEn": "I know carefully, quickly, and slowly.",
          "sampleVn": "Em biết carefully, quickly và slowly.",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 2,
        "ai": {
          "textEn": "How should you type your password?"
        },
        "user": {
          "formula": "I should + verb + object + adverb.",
          "sampleEn": "I should type my password carefully.",
          "sampleVn": "Em nên gõ mật khẩu cẩn thận.",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 3,
        "ai": {
          "textEn": "Give one Internet safety warning."
        },
        "user": {
          "formula": "Don't + verb + object + too + adverb.",
          "sampleEn": "Don't click strange links too quickly.",
          "sampleVn": "Đừng nhấn link lạ quá nhanh.",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 4,
        "ai": {
          "textEn": "Ask a classmate to do something politely."
        },
        "user": {
          "formula": "Please + verb + object + adverb.",
          "sampleEn": "Please speak clearly and wait patiently.",
          "sampleVn": "Làm ơn nói rõ ràng và chờ kiên nhẫn.",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 5,
        "ai": {
          "textEn": "Speak for 30 seconds about how you study online safely."
        },
        "user": {
          "formula": "I + verb + adverb. I can/can't + verb. Don't + verb.",
          "sampleEn": "I log in safely. I listen carefully. I type my password carefully. I don't click strange links.",
          "sampleVn": "Em đăng nhập an toàn, nghe cẩn thận, gõ mật khẩu cẩn thận và không nhấn link lạ.",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      }
    ]
  },
  "minitest": [
    {
      "q": "She speaks English ___.",
      "options": [
        "good",
        "well",
        "goodly",
        "nice"
      ],
      "answer": 1,
      "audio": "She speaks English ___.",
      "explanation": "good đổi thành well khi làm trạng từ."
    },
    {
      "q": "Type your password ___.",
      "options": [
        "careful",
        "carefully",
        "care",
        "cares"
      ],
      "answer": 1,
      "audio": "Type your password ___.",
      "explanation": "Sau động từ type cần trạng từ."
    },
    {
      "q": "Walk ___, please.",
      "options": [
        "slow",
        "slowly",
        "slows",
        "slower"
      ],
      "answer": 1,
      "audio": "Walk ___, please.",
      "explanation": "slowly mô tả cách đi."
    },
    {
      "q": "Listen ___ to the teacher.",
      "options": [
        "carefully",
        "careful",
        "care",
        "cares"
      ],
      "answer": 0,
      "audio": "Listen ___ to the teacher.",
      "explanation": "Listen carefully là cụm đúng."
    },
    {
      "q": "He runs ___.",
      "options": [
        "quick",
        "quickly",
        "quicks",
        "quickness"
      ],
      "answer": 1,
      "audio": "He runs ___.",
      "explanation": "quickly là trạng từ."
    },
    {
      "q": "Good changes to which adverb?",
      "options": [
        "goodly",
        "well",
        "good",
        "goods"
      ],
      "answer": 1,
      "audio": "Good changes to which adverb?",
      "explanation": "good -> well."
    },
    {
      "q": "Fast as an adverb is ___.",
      "options": [
        "fast",
        "fastly",
        "fasterly",
        "fastness"
      ],
      "answer": 0,
      "audio": "Fast as an adverb is ___.",
      "explanation": "fast giữ nguyên."
    },
    {
      "q": "Don't speak ___ in class.",
      "options": [
        "loud",
        "loudly",
        "louds",
        "louder"
      ],
      "answer": 1,
      "audio": "Don't speak ___ in class.",
      "explanation": "speak loudly."
    },
    {
      "q": "Use the internet ___.",
      "options": [
        "safe",
        "safely",
        "safety",
        "safes"
      ],
      "answer": 1,
      "audio": "Use the internet ___.",
      "explanation": "safely là trạng từ."
    },
    {
      "q": "They work ___ every day.",
      "options": [
        "hard",
        "hardly",
        "hardlyly",
        "hardness"
      ],
      "answer": 0,
      "audio": "They work ___ every day.",
      "explanation": "work hard = làm việc chăm chỉ."
    },
    {
      "q": "Which sentence is correct?",
      "options": [
        "She speaks clear.",
        "She speaks clearly.",
        "She speaks clearily.",
        "She clearly speaksly."
      ],
      "answer": 1,
      "audio": "Which sentence is correct?",
      "explanation": "Adverb after verb: speaks clearly."
    },
    {
      "q": "Choose the correct instruction.",
      "options": [
        "Type carefully your password.",
        "Type your password carefully.",
        "Careful type your password.",
        "Types your password carefully."
      ],
      "answer": 1,
      "audio": "Choose the correct instruction.",
      "explanation": "Adverb after object."
    },
    {
      "q": "Which adverb is irregular?",
      "options": [
        "slowly",
        "carefully",
        "well",
        "clearly"
      ],
      "answer": 2,
      "audio": "Which adverb is irregular?",
      "explanation": "good -> well."
    },
    {
      "q": "\"một cách an toàn\" in English is ___.",
      "options": [
        "safe",
        "safely",
        "safety",
        "safes"
      ],
      "answer": 1,
      "audio": "\"một cách an toàn\" in English is ___.",
      "explanation": "safe -> safely."
    },
    {
      "q": "Translate: Đừng trả lời quá nhanh.",
      "options": [
        "Don't answer too quick.",
        "Don't answer too quickly.",
        "Doesn't answer too quickly.",
        "No answer too quickly."
      ],
      "answer": 1,
      "audio": "Translate: Đừng trả lời quá nhanh.",
      "explanation": "Don't + V + adverb."
    },
    {
      "q": "Which word means \"một cách lịch sự\"?",
      "options": [
        "politely",
        "patiently",
        "clearly",
        "badly"
      ],
      "answer": 0,
      "audio": "Which word means \"một cách lịch sự\"?",
      "explanation": "politely = lịch sự."
    },
    {
      "q": "Complete: We work ___ after class.",
      "options": [
        "hard",
        "hardly",
        "hardness",
        "hardlyly"
      ],
      "answer": 0,
      "audio": "Complete: We work ___ after class.",
      "explanation": "work hard = chăm chỉ."
    },
    {
      "q": "Which pair is correct?",
      "options": [
        "good -> goodly",
        "fast -> fastly",
        "hard -> hard",
        "safe -> safes"
      ],
      "answer": 2,
      "audio": "Which pair is correct?",
      "explanation": "hard giữ nguyên."
    },
    {
      "q": "Choose the Internet safety sentence.",
      "options": [
        "Click strange links quickly.",
        "Use the internet safely.",
        "Share passwords loudly.",
        "Open pop-ups carelessly."
      ],
      "answer": 1,
      "audio": "Choose the Internet safety sentence.",
      "explanation": "Use the internet safely."
    },
    {
      "q": "Translate: Cô ấy nói tiếng Anh tốt.",
      "options": [
        "She speaks English well.",
        "She speaks English good.",
        "She speak English well.",
        "She speaks English goodly."
      ],
      "answer": 0,
      "audio": "Translate: Cô ấy nói tiếng Anh tốt.",
      "explanation": "well là trạng từ của good."
    }
  ],
  "mindmap": {
    "type": "structured",
    "center": "Trạng từ chỉ cách thức & Ôn tập",
    "branches": [
      {
        "icon": "🎯",
        "label": "Adverbs answer HOW",
        "sub": "Cách hành động xảy ra",
        "items": [
          "speak clearly",
          "listen carefully",
          "run quickly",
          "walk slowly"
        ]
      },
      {
        "icon": "🧩",
        "label": "Adj + -ly",
        "sub": "Tạo trạng từ thường gặp",
        "items": [
          "careful -> carefully",
          "quick -> quickly",
          "slow -> slowly",
          "clear -> clearly",
          "safe -> safely"
        ]
      },
      {
        "icon": "⭐",
        "label": "Irregular adverbs",
        "sub": "Không thêm -ly",
        "items": [
          "good -> well",
          "fast -> fast",
          "hard -> hard"
        ]
      },
      {
        "icon": "💻",
        "label": "Internet instructions",
        "sub": "Mệnh lệnh + trạng từ",
        "items": [
          "type your password carefully",
          "click safely",
          "log in safely",
          "do not answer too quickly"
        ]
      },
      {
        "icon": "🗣️",
        "label": "Speaking output",
        "sub": "Dùng được trong nói",
        "items": [
          "How should I...?",
          "I should...",
          "Please...",
          "Don't..."
        ]
      }
    ]
  },
  "homeworkRich": {
    "title": "Homework - Buổi 16",
    "submit": "Nộp bài qua nhóm lớp.",
    "deadline": "Trước buổi học tiếp theo",
    "tasks": [
      {
        "icon": "✍️",
        "title": "Bài viết - Online Safety Instructions",
        "badge": "Bắt buộc",
        "desc": "Viết 8-10 câu hướng dẫn học online an toàn, dùng ít nhất 8 từ/cụm từ mới và 3 cấu trúc ngữ pháp.",
        "items": [
          "Dùng at least 8 vocabulary items",
          "dùng S + V + adverb",
          "dùng imperative + adverb",
          "có ít nhất 2 câu Don't",
          "kiểm tra chính tả carefully/quickly/safely."
        ],
        "sample": "Log in safely. Type your password carefully. Don't click strange links too quickly. Listen carefully to the teacher.",
        "rubric": "10 điểm: 4 điểm đúng ngữ pháp; 3 điểm đúng từ vựng; 2 điểm mạch lạc; 1 điểm chính tả."
      },
      {
        "icon": "🎙️",
        "title": "Bài nói / ghi âm - Computer Class Role-play",
        "badge": "Bắt buộc",
        "desc": "Ghi âm hoặc quay video hội thoại 8-10 lượt giữa Teacher và Student về lớp máy tính.",
        "items": [
          "Có ít nhất 5 trạng từ",
          "có can/can't",
          "có một cảnh báo Don't",
          "phát âm rõ",
          "nói 45-60 giây."
        ],
        "sample": "Teacher: Listen carefully. Student: Should I open the website now? Teacher: Yes, open it quickly but type carefully.",
        "rubric": "10 điểm: 3 điểm phát âm; 3 điểm dùng đúng trạng từ; 2 điểm đủ lượt hội thoại; 2 điểm tự nhiên và rõ ràng."
      },
      {
        "icon": "🎬",
        "title": "Video ngắn - How I Study Safely Online",
        "badge": "Luyện thêm",
        "desc": "Quay video 30-45 giây tự nói cách em học online an toàn.",
        "items": [
          "Nói ít nhất 6 câu",
          "dùng safely/carefully/clearly/quietly",
          "có 1 câu I can và 1 câu I can't",
          "kết thúc bằng một lời khuyên."
        ],
        "sample": "I study online safely. I listen carefully. I can answer correctly. I can't share my password.",
        "rubric": "Điểm cộng nếu nói không nhìn giấy, phát âm rõ, có ví dụ cá nhân."
      }
    ]
  },
  "homework": [
    "Viết 8-10 câu hướng dẫn học online an toàn, dùng ít nhất 8 từ/cụm từ mới và 3 cấu trúc ngữ pháp.",
    "Ghi âm hoặc quay video hội thoại 8-10 lượt giữa Teacher và Student về lớp máy tính.",
    "Quay video 30-45 giây tự nói cách em học online an toàn."
  ]
};
applyExpandedLessonTemplate(16, LESSON_16_IMPORTED_TEMPLATE);
// </imported-lesson-16>
// <imported-lesson-14>
const LESSON_14_TEMPLATE = {
  "unit": "Unit 5",
  "title": "Máy tính & can/can't",
  "titleVi": "Máy tính & can/can't",
  "titleEn": "Computer Vocabulary & Ability",
  "cefrLevel": "A1",
  "mainTopic": "Computer parts, computer actions, and ability with can/can't",
  "grammarFocus": "can / can't + base verb; Can you...?; computer commands",
  "objectives": [
    "Gọi tên các bộ phận máy tính và thiết bị công nghệ cơ bản.",
    "Dùng đúng can / can't để nói khả năng làm được hoặc không làm được.",
    "Đặt câu hỏi và trả lời với Can you...? / Yes, I can. / No, I can't.",
    "Thực hành hội thoại khi đăng nhập, mở trình duyệt, lưu file và gửi bài."
  ],
  "importStatus": "markdown-ready",
  "review": {
    "title": "Ôn bài cũ - Food/Drinks & Countable/Uncountable",
    "topic": "Buổi 13: Food/Drinks + a/an/some/any/much/many",
    "structures": [
      "There is an apple on the table.",
      "There are some eggs in the fridge.",
      "There is some rice in the bowl.",
      "Is there any milk? - No, there isn't.",
      "How many apples are there?",
      "How much water is there?"
    ],
    "reviewGames": {
      "title": "Ôn bài cũ - Buổi 13 Food & Drinks",
      "intro": "Hoàn thành 2 game, mỗi game 20 câu, để ôn food/drinks và countable/uncountable trước khi vào chủ đề máy tính.",
      "vocabulary": [
        {
          "en": "apple",
          "vi": "quả táo",
          "img": "🎧",
          "options": [
            "quả táo",
            "quả chuối",
            "quả cam",
            "củ cà rốt"
          ],
          "answer": 0
        },
        {
          "en": "banana",
          "vi": "quả chuối",
          "img": "🎧",
          "options": [
            "quả trứng",
            "quả chuối",
            "bánh mì",
            "nước ép"
          ],
          "answer": 1
        },
        {
          "en": "egg",
          "vi": "quả trứng",
          "img": "🎧",
          "options": [
            "quả trứng",
            "quả cam",
            "củ khoai",
            "thịt gà"
          ],
          "answer": 0
        },
        {
          "en": "rice",
          "vi": "cơm / gạo",
          "img": "🎧",
          "options": [
            "cơm / gạo",
            "nước",
            "bánh sandwich",
            "củ cà rốt"
          ],
          "answer": 0
        },
        {
          "en": "bread",
          "vi": "bánh mì",
          "img": "🎧",
          "options": [
            "bánh mì",
            "súp",
            "trứng",
            "cà phê"
          ],
          "answer": 0
        },
        {
          "en": "milk",
          "vi": "sữa",
          "img": "🎧",
          "options": [
            "nước ép",
            "sữa",
            "trà",
            "nước"
          ],
          "answer": 1
        },
        {
          "en": "juice",
          "vi": "nước ép",
          "img": "🎧",
          "options": [
            "nước ép",
            "sữa",
            "cơm",
            "thịt"
          ],
          "answer": 0
        },
        {
          "en": "chicken",
          "vi": "thịt gà",
          "img": "🎧",
          "options": [
            "cá",
            "thịt gà",
            "bánh ngọt",
            "nước"
          ],
          "answer": 1
        },
        {
          "en": "soup",
          "vi": "súp",
          "img": "🎧",
          "options": [
            "súp",
            "bánh mì",
            "trứng",
            "quả táo"
          ],
          "answer": 0
        },
        {
          "en": "potato",
          "vi": "củ khoai tây",
          "img": "🎧",
          "options": [
            "quả cà chua",
            "củ khoai tây",
            "quả cam",
            "cá"
          ],
          "answer": 1
        },
        {
          "en": "countable noun",
          "vi": "danh từ đếm được",
          "img": "🎧",
          "options": [
            "danh từ đếm được",
            "danh từ không đếm được",
            "một ly",
            "một lát"
          ],
          "answer": 0
        },
        {
          "en": "uncountable noun",
          "vi": "danh từ không đếm được",
          "img": "🎧",
          "options": [
            "danh từ không đếm được",
            "danh từ đếm được",
            "một bát",
            "đồ uống"
          ],
          "answer": 0
        },
        {
          "en": "some",
          "vi": "một ít / một vài",
          "img": "🎧",
          "options": [
            "một ít / một vài",
            "không có",
            "nhiều, dùng với đếm được",
            "một cái"
          ],
          "answer": 0
        },
        {
          "en": "any",
          "vi": "chút nào / vài cái nào",
          "img": "🎧",
          "options": [
            "chút nào / vài cái nào",
            "đủ",
            "một bát",
            "nhiều"
          ],
          "answer": 0
        },
        {
          "en": "many",
          "vi": "nhiều, dùng với đếm được",
          "img": "🎧",
          "options": [
            "nhiều, dùng với đếm được",
            "nhiều, dùng với không đếm được",
            "một chai",
            "một miếng"
          ],
          "answer": 0
        },
        {
          "en": "much",
          "vi": "nhiều, dùng với không đếm được",
          "img": "🎧",
          "options": [
            "nhiều, dùng với không đếm được",
            "nhiều, dùng với đếm được",
            "một quả",
            "một ít"
          ],
          "answer": 0
        },
        {
          "en": "a glass of",
          "vi": "một ly",
          "img": "🎧",
          "options": [
            "một ly",
            "một bát",
            "một lát",
            "một chai"
          ],
          "answer": 0
        },
        {
          "en": "a bottle of",
          "vi": "một chai",
          "img": "🎧",
          "options": [
            "một chai",
            "một tách",
            "một quả",
            "một đĩa"
          ],
          "answer": 0
        },
        {
          "en": "a piece of",
          "vi": "một miếng",
          "img": "🎧",
          "options": [
            "một miếng",
            "một ly",
            "một bát",
            "đủ"
          ],
          "answer": 0
        },
        {
          "en": "enough",
          "vi": "đủ",
          "img": "🎧",
          "options": [
            "thiếu",
            "đủ",
            "nhiều cái",
            "một chút nào"
          ],
          "answer": 1
        }
      ],
      "quizBomb": {
        "title": "Quiz Bomb - Food Grammar Review",
        "instruction": "Trả lời nhanh 20 câu trong 5 giây mỗi câu.",
        "questions": [
          {
            "q": "\"There is ___ apple.\"",
            "options": [
              "a",
              "an",
              "some",
              "any"
            ],
            "answer": 1
          },
          {
            "q": "\"There is ___ rice.\"",
            "options": [
              "a",
              "an",
              "some",
              "many"
            ],
            "answer": 2
          },
          {
            "q": "\"There are ___ eggs.\"",
            "options": [
              "some",
              "much",
              "a",
              "an"
            ],
            "answer": 0
          },
          {
            "q": "\"Is there ___ milk?\"",
            "options": [
              "some",
              "any",
              "many",
              "an"
            ],
            "answer": 1
          },
          {
            "q": "\"Are there ___ bananas?\"",
            "options": [
              "any",
              "much",
              "a",
              "an"
            ],
            "answer": 0
          },
          {
            "q": "\"How ___ apples are there?\"",
            "options": [
              "much",
              "many",
              "a",
              "an"
            ],
            "answer": 1
          },
          {
            "q": "\"How ___ water is there?\"",
            "options": [
              "much",
              "many",
              "some",
              "any"
            ],
            "answer": 0
          },
          {
            "q": "Danh từ nào đếm được?",
            "options": [
              "apple",
              "rice",
              "milk",
              "water"
            ],
            "answer": 0
          },
          {
            "q": "Danh từ nào không đếm được?",
            "options": [
              "banana",
              "egg",
              "orange",
              "bread"
            ],
            "answer": 3
          },
          {
            "q": "Câu nào đúng?",
            "options": [
              "There is a milk.",
              "There is some milk.",
              "There are some milk.",
              "There are a milk."
            ],
            "answer": 1
          },
          {
            "q": "\"a bottle of juice\" nghĩa là gì?",
            "options": [
              "một chai nước ép",
              "một bát cơm",
              "một quả táo",
              "một tách trà"
            ],
            "answer": 0
          },
          {
            "q": "\"a bowl of rice\" nghĩa là gì?",
            "options": [
              "một ly nước",
              "một bát cơm",
              "một lát pizza",
              "một quả trứng"
            ],
            "answer": 1
          },
          {
            "q": "\"There isn't any bread\" nghĩa là gì?",
            "options": [
              "Có bánh mì",
              "Không có bánh mì",
              "Có nhiều bánh mì",
              "Bánh mì ở đâu"
            ],
            "answer": 1
          },
          {
            "q": "\"There aren't any eggs\" nghĩa là gì?",
            "options": [
              "Không có quả trứng nào",
              "Có một quả trứng",
              "Có một ít trứng",
              "Có nhiều sữa"
            ],
            "answer": 0
          },
          {
            "q": "\"How many eggs are there?\" → trả lời đúng:",
            "options": [
              "There are four eggs.",
              "There is some milk.",
              "There is much egg.",
              "Yes, it is."
            ],
            "answer": 0
          },
          {
            "q": "\"How much juice is there?\" → trả lời đúng:",
            "options": [
              "There is one bottle of juice.",
              "There are two juice.",
              "There are many juice.",
              "It is an apple."
            ],
            "answer": 0
          },
          {
            "q": "\"some\" thường dùng trong câu nào?",
            "options": [
              "câu khẳng định",
              "câu phủ định",
              "chỉ câu hỏi",
              "chỉ với số ít"
            ],
            "answer": 0
          },
          {
            "q": "\"any\" thường dùng trong câu nào?",
            "options": [
              "câu hỏi/phủ định",
              "chỉ câu khẳng định",
              "chỉ với a/an",
              "chỉ với màu sắc"
            ],
            "answer": 0
          },
          {
            "q": "Câu nào sai?",
            "options": [
              "There is some water.",
              "There are three apples.",
              "Is there any rice?",
              "There are some bread."
            ],
            "answer": 3
          },
          {
            "q": "\"food and drinks\" nghĩa là gì?",
            "options": [
              "đồ ăn và đồ uống",
              "phòng và nhà",
              "máy tính và chuột",
              "vị trí và đồ vật"
            ],
            "answer": 0
          }
        ]
      }
    }
  },
  "video": {
    "title": "Computer Parts & Can/Can't Intro",
    "description": "Hai video ngắn giới thiệu từ vựng bộ phận máy tính và cách nói khả năng với can/can't.",
    "duration": "2-5 phút mỗi video",
    "sceneSummary": "cảnh chính",
    "videos": [
      {
        "title": "Computer Parts Vocabulary for Kids / Beginner English",
        "channel": "YouTube search fallback",
        "duration": "2-5 phút",
        "embedUrl": "https://www.youtube.com/embed?listType=search&list=computer%20parts%20vocabulary%20for%20kids%20english",
        "watchUrl": "https://www.youtube.com/results?search_query=computer+parts+vocabulary+for+kids+english",
        "fallbackSearchUrl": "https://www.youtube.com/results?search_query=computer+parts+vocabulary+for+kids+english",
        "description": "Học viên nhận diện computer, laptop, screen, keyboard, mouse, speaker, headphones, printer, webcam và lặp lại phát âm.",
        "sceneSummary": "cảnh chính",
        "scenes": [
          {
            "label": "Scene 1: Giới thiệu chủ đề computer / technology."
          },
          {
            "label": "Scene 2: Bộ phận chính: screen, keyboard, mouse, computer, laptop."
          },
          {
            "label": "Scene 3: Thiết bị hỗ trợ: speaker, headphones, printer, webcam, microphone."
          },
          {
            "label": "Scene 4: Thao tác cơ bản: click, type, open, save, print."
          }
        ],
        "questions": [
          {
            "q": "\"Computer\" nghĩa là gì?",
            "options": [
              "cái bàn",
              "máy tính",
              "đồ ăn",
              "phòng ngủ"
            ],
            "answer": 1
          },
          {
            "q": "\"Keyboard\" nghĩa là gì?",
            "options": [
              "con chuột máy tính",
              "bàn phím",
              "màn hình",
              "loa"
            ],
            "answer": 1
          },
          {
            "q": "\"Mouse\" trong bài này nghĩa là gì?",
            "options": [
              "con chuột thật",
              "chuột máy tính",
              "máy in",
              "tai nghe"
            ],
            "answer": 1
          }
        ]
      },
      {
        "title": "Can / Can't for Kids: What can you do?",
        "channel": "YouTube search fallback",
        "duration": "2-5 phút",
        "embedUrl": "https://www.youtube.com/embed?listType=search&list=can%20can't%20for%20kids%20english%20beginner",
        "watchUrl": "https://www.youtube.com/results?search_query=can+can't+for+kids+english+beginner",
        "fallbackSearchUrl": "https://www.youtube.com/results?search_query=can+can't+for+kids+english+beginner",
        "description": "Học cách nói khả năng bằng can/can't: I can type. I can't print. Can you open the file?",
        "sceneSummary": "cảnh chính",
        "scenes": [
          {
            "label": "Scene 1: can = có thể làm được."
          },
          {
            "label": "Scene 2: can't = không thể / không biết làm."
          },
          {
            "label": "Scene 3: Can you...? và câu trả lời ngắn."
          },
          {
            "label": "Scene 4: Can/can't trong phòng máy tính: log in, type, click, save, print."
          }
        ],
        "questions": [
          {
            "q": "\"I can type\" nghĩa là gì?",
            "options": [
              "Tôi có thể gõ bàn phím.",
              "Tôi không thể gõ.",
              "Tôi có một bàn phím.",
              "Tôi đang ăn."
            ],
            "answer": 0
          },
          {
            "q": "Câu hỏi đúng là:",
            "options": [
              "Can you open the file?",
              "Do you can open the file?",
              "Can you opens the file?",
              "You can open the file?"
            ],
            "answer": 0
          },
          {
            "q": "Trả lời phủ định đúng cho \"Can you print?\" là:",
            "options": [
              "No, I don't.",
              "No, I can't.",
              "No, I am not.",
              "No, I doesn't."
            ],
            "answer": 1
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "\"Computer\" nghĩa là gì?",
        "options": [
          "cái bàn",
          "máy tính",
          "đồ ăn",
          "phòng ngủ"
        ],
        "answer": 1
      },
      {
        "q": "\"Keyboard\" nghĩa là gì?",
        "options": [
          "con chuột máy tính",
          "bàn phím",
          "màn hình",
          "loa"
        ],
        "answer": 1
      },
      {
        "q": "\"Mouse\" trong bài này nghĩa là gì?",
        "options": [
          "con chuột thật",
          "chuột máy tính",
          "máy in",
          "tai nghe"
        ],
        "answer": 1
      },
      {
        "q": "\"I can type\" nghĩa là gì?",
        "options": [
          "Tôi có thể gõ bàn phím.",
          "Tôi không thể gõ.",
          "Tôi có một bàn phím.",
          "Tôi đang ăn."
        ],
        "answer": 0
      },
      {
        "q": "Câu hỏi đúng là:",
        "options": [
          "Can you open the file?",
          "Do you can open the file?",
          "Can you opens the file?",
          "You can open the file?"
        ],
        "answer": 0
      },
      {
        "q": "Trả lời phủ định đúng cho \"Can you print?\" là:",
        "options": [
          "No, I don't.",
          "No, I can't.",
          "No, I am not.",
          "No, I doesn't."
        ],
        "answer": 1
      }
    ]
  },
  "vocabGroups": {
    "computerParts": "Máy tính & thiết bị - Computer Parts & Devices",
    "computerActions": "Thao tác & khả năng - Computer Actions & Can/Can't"
  },
  "matchAll": true,
  "listenPickAll": true,
  "vocabulary": [
    {
      "en": "computer",
      "vi": "máy tính",
      "ipa": "/kəmˈpjuːtər/",
      "img": "🖥️",
      "example": "I use a computer.",
      "group": "computerParts"
    },
    {
      "en": "laptop",
      "vi": "máy tính xách tay",
      "ipa": "/ˈlæptɑːp/",
      "img": "💻",
      "example": "This is my laptop.",
      "group": "computerParts"
    },
    {
      "en": "screen",
      "vi": "màn hình",
      "ipa": "/skriːn/",
      "img": "🖥️",
      "example": "The screen is big.",
      "group": "computerParts"
    },
    {
      "en": "monitor",
      "vi": "màn hình máy tính",
      "ipa": "/ˈmɑːnɪtər/",
      "img": "🖥️",
      "example": "There is a monitor on the desk.",
      "group": "computerParts"
    },
    {
      "en": "keyboard",
      "vi": "bàn phím",
      "ipa": "/ˈkiːbɔːrd/",
      "img": "⌨️",
      "example": "I can type on the keyboard.",
      "group": "computerParts"
    },
    {
      "en": "mouse",
      "vi": "chuột máy tính",
      "ipa": "/maʊs/",
      "img": "🖱️",
      "example": "Click with the mouse.",
      "group": "computerParts"
    },
    {
      "en": "speaker",
      "vi": "loa",
      "ipa": "/ˈspiːkər/",
      "img": "🔊",
      "example": "The speaker is on the desk.",
      "group": "computerParts"
    },
    {
      "en": "headphones",
      "vi": "tai nghe",
      "ipa": "/ˈhedfoʊnz/",
      "img": "🎧",
      "example": "I can listen with headphones.",
      "group": "computerParts"
    },
    {
      "en": "microphone",
      "vi": "micro",
      "ipa": "/ˈmaɪkrəfoʊn/",
      "img": "🎙️",
      "example": "Use the microphone to speak.",
      "group": "computerParts"
    },
    {
      "en": "webcam",
      "vi": "camera máy tính",
      "ipa": "/ˈwebkæm/",
      "img": "📷",
      "example": "The webcam is above the screen.",
      "group": "computerParts"
    },
    {
      "en": "printer",
      "vi": "máy in",
      "ipa": "/ˈprɪntər/",
      "img": "🖨️",
      "example": "I can print with a printer.",
      "group": "computerParts"
    },
    {
      "en": "charger",
      "vi": "sạc",
      "ipa": "/ˈtʃɑːrdʒər/",
      "img": "🔌",
      "example": "Where is the charger?",
      "group": "computerParts"
    },
    {
      "en": "cable",
      "vi": "dây cáp",
      "ipa": "/ˈkeɪbəl/",
      "img": "🔌",
      "example": "There is a cable under the desk.",
      "group": "computerParts"
    },
    {
      "en": "password",
      "vi": "mật khẩu",
      "ipa": "/ˈpæswɜːrd/",
      "img": "🔑",
      "example": "Type your password.",
      "group": "computerParts"
    },
    {
      "en": "username",
      "vi": "tên đăng nhập",
      "ipa": "/ˈjuːzərneɪm/",
      "img": "👤",
      "example": "Type your username.",
      "group": "computerParts"
    },
    {
      "en": "file",
      "vi": "tệp / file",
      "ipa": "/faɪl/",
      "img": "📄",
      "example": "Open the file.",
      "group": "computerParts"
    },
    {
      "en": "folder",
      "vi": "thư mục",
      "ipa": "/ˈfoʊldər/",
      "img": "📁",
      "example": "Save it in the folder.",
      "group": "computerParts"
    },
    {
      "en": "browser",
      "vi": "trình duyệt",
      "ipa": "/ˈbraʊzər/",
      "img": "🌐",
      "example": "Open the browser.",
      "group": "computerParts"
    },
    {
      "en": "website",
      "vi": "trang web",
      "ipa": "/ˈwebsaɪt/",
      "img": "🌍",
      "example": "Go to the website.",
      "group": "computerParts"
    },
    {
      "en": "internet",
      "vi": "Internet",
      "ipa": "/ˈɪntərnet/",
      "img": "📶",
      "example": "The internet is slow.",
      "group": "computerParts"
    },
    {
      "en": "can",
      "vi": "có thể / biết làm",
      "ipa": "/kæn/",
      "img": "📝",
      "example": "I can type.",
      "group": "computerActions"
    },
    {
      "en": "can't",
      "vi": "không thể / không biết làm",
      "ipa": "/kænt/",
      "img": "❌",
      "example": "I can't print.",
      "group": "computerActions"
    },
    {
      "en": "log in",
      "vi": "đăng nhập",
      "ipa": "/lɔːɡ ɪn/",
      "img": "🔐",
      "example": "I can log in.",
      "group": "computerActions"
    },
    {
      "en": "log out",
      "vi": "đăng xuất",
      "ipa": "/lɔːɡ aʊt/",
      "img": "🚪",
      "example": "Please log out.",
      "group": "computerActions"
    },
    {
      "en": "turn on",
      "vi": "bật",
      "ipa": "/tɜːrn ɑːn/",
      "img": "🔛",
      "example": "Turn on the computer.",
      "group": "computerActions"
    },
    {
      "en": "turn off",
      "vi": "tắt",
      "ipa": "/tɜːrn ɔːf/",
      "img": "⏻",
      "example": "Turn off the screen.",
      "group": "computerActions"
    },
    {
      "en": "click",
      "vi": "nhấp chuột",
      "ipa": "/klɪk/",
      "img": "🖱️",
      "example": "Click the button.",
      "group": "computerActions"
    },
    {
      "en": "double-click",
      "vi": "nhấp đúp",
      "ipa": "/ˌdʌbəl ˈklɪk/",
      "img": "🖱️",
      "example": "Double-click the file.",
      "group": "computerActions"
    },
    {
      "en": "type",
      "vi": "gõ",
      "ipa": "/taɪp/",
      "img": "⌨️",
      "example": "Type your password.",
      "group": "computerActions"
    },
    {
      "en": "open",
      "vi": "mở",
      "ipa": "/ˈoʊpən/",
      "img": "📂",
      "example": "Open the browser.",
      "group": "computerActions"
    },
    {
      "en": "close",
      "vi": "đóng",
      "ipa": "/kloʊz/",
      "img": "❎",
      "example": "Close the window.",
      "group": "computerActions"
    },
    {
      "en": "save",
      "vi": "lưu",
      "ipa": "/seɪv/",
      "img": "💾",
      "example": "Save the file.",
      "group": "computerActions"
    },
    {
      "en": "print",
      "vi": "in",
      "ipa": "/prɪnt/",
      "img": "🖨️",
      "example": "Print the homework.",
      "group": "computerActions"
    },
    {
      "en": "copy",
      "vi": "sao chép",
      "ipa": "/ˈkɑːpi/",
      "img": "📋",
      "example": "Copy the sentence.",
      "group": "computerActions"
    },
    {
      "en": "paste",
      "vi": "dán",
      "ipa": "/peɪst/",
      "img": "📋",
      "example": "Paste the text.",
      "group": "computerActions"
    },
    {
      "en": "drag",
      "vi": "kéo",
      "ipa": "/dræɡ/",
      "img": "↔️",
      "example": "Drag the picture.",
      "group": "computerActions"
    },
    {
      "en": "drop",
      "vi": "thả",
      "ipa": "/drɑːp/",
      "img": "⬇️",
      "example": "Drop it here.",
      "group": "computerActions"
    },
    {
      "en": "upload",
      "vi": "tải lên",
      "ipa": "/ˌʌpˈloʊd/",
      "img": "⬆️",
      "example": "Upload the file.",
      "group": "computerActions"
    },
    {
      "en": "download",
      "vi": "tải xuống",
      "ipa": "/ˌdaʊnˈloʊd/",
      "img": "⬇️",
      "example": "Download the worksheet.",
      "group": "computerActions"
    },
    {
      "en": "send",
      "vi": "gửi",
      "ipa": "/send/",
      "img": "📤",
      "example": "Send your homework.",
      "group": "computerActions"
    }
  ],
  "listenPick": {
    "title": "Nghe chọn từ - Computer Vocabulary",
    "instruction": "Nghe audio từng từ/cụm từ Buổi 14 rồi chọn nghĩa tiếng Việt đúng. Đáp án chỉ hiện sau khi chọn.",
    "questions": [
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "computer",
        "en": "computer",
        "options": [
          "máy tính",
          "máy in",
          "màn hình",
          "tai nghe"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "laptop",
        "en": "laptop",
        "options": [
          "máy tính xách tay",
          "chuột",
          "bàn phím",
          "tệp"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "screen",
        "en": "screen",
        "options": [
          "màn hình",
          "dây cáp",
          "thư mục",
          "loa"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "keyboard",
        "en": "keyboard",
        "options": [
          "chuột máy tính",
          "bàn phím",
          "máy in",
          "micro"
        ],
        "answer": 1
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "mouse",
        "en": "mouse",
        "options": [
          "chuột máy tính",
          "màn hình",
          "sạc",
          "trang web"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "headphones",
        "en": "headphones",
        "options": [
          "tai nghe",
          "loa",
          "micro",
          "camera"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "printer",
        "en": "printer",
        "options": [
          "máy in",
          "trình duyệt",
          "file",
          "dây cáp"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "password",
        "en": "password",
        "options": [
          "tên đăng nhập",
          "mật khẩu",
          "trang web",
          "tệp"
        ],
        "answer": 1
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "username",
        "en": "username",
        "options": [
          "tên đăng nhập",
          "mật khẩu",
          "thư mục",
          "Internet"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "browser",
        "en": "browser",
        "options": [
          "trình duyệt",
          "máy tính",
          "máy in",
          "bàn phím"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "can",
        "en": "can",
        "options": [
          "không thể",
          "có thể / biết làm",
          "đăng nhập",
          "lưu"
        ],
        "answer": 1
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "can't",
        "en": "can't",
        "options": [
          "không thể / không biết làm",
          "có thể",
          "mở",
          "tải lên"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "log in",
        "en": "log in",
        "options": [
          "đăng nhập",
          "đăng xuất",
          "tắt",
          "lưu"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "click",
        "en": "click",
        "options": [
          "gõ",
          "nhấp chuột",
          "kéo",
          "gửi"
        ],
        "answer": 1
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "type",
        "en": "type",
        "options": [
          "gõ",
          "nhấp đúp",
          "in",
          "tải xuống"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "open",
        "en": "open",
        "options": [
          "mở",
          "đóng",
          "tắt",
          "dán"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "save",
        "en": "save",
        "options": [
          "lưu",
          "in",
          "tải lên",
          "thả"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "print",
        "en": "print",
        "options": [
          "in",
          "mở",
          "sao chép",
          "kéo"
        ],
        "answer": 0
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "upload",
        "en": "upload",
        "options": [
          "tải xuống",
          "tải lên",
          "đăng xuất",
          "bật"
        ],
        "answer": 1
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "download",
        "en": "download",
        "options": [
          "tải xuống",
          "tải lên",
          "gửi",
          "đóng"
        ],
        "answer": 0
      }
    ]
  },
  "grammar": {
    "title": "Can / Can't + Verb - Computer Ability",
    "intro": "Dùng can/can't để nói khả năng khi thao tác máy tính; sau can/can't luôn dùng động từ nguyên mẫu.",
    "badge": "5 CẤU TRÚC CHÍNH",
    "formula": "S + can/can't + V nguyên mẫu | Can + S + V? | Wh-word + can + S + V? | Verb + object",
    "structures": [
      {
        "num": 1,
        "pattern": "S + can + V nguyên mẫu",
        "vi": "Nói ai đó có thể/biết làm việc gì.",
        "style": "Cấu trúc chính",
        "example": "She can open the file.",
        "exampleVi": "Cô ấy có thể mở file.",
        "context": "Computer classroom communication",
        "commonMistake": "Sai: She can opens the file. Đúng: She can open the file."
      },
      {
        "num": 2,
        "pattern": "S + can't + V nguyên mẫu",
        "vi": "Nói ai đó không thể/không biết làm việc gì.",
        "style": "Cấu trúc chính",
        "example": "I can't remember my password.",
        "exampleVi": "Tôi không thể nhớ mật khẩu của mình.",
        "context": "Computer classroom communication",
        "commonMistake": "Sai: I don't can print. Đúng: I can't print."
      },
      {
        "num": 3,
        "pattern": "Can + S + V?",
        "vi": "Hỏi có thể/biết làm không.",
        "style": "Cấu trúc chính",
        "example": "Can you log in? - Yes, I can.",
        "exampleVi": "Bạn có thể đăng nhập không? - Có, tôi có thể.",
        "context": "Computer classroom communication",
        "commonMistake": "Sai: Do you can log in? Đúng: Can you log in?"
      },
      {
        "num": 4,
        "pattern": "Wh-word + can + S + V?",
        "vi": "Hỏi làm gì, ở đâu hoặc làm như thế nào với can.",
        "style": "Cấu trúc chính",
        "example": "How can I upload the file?",
        "exampleVi": "Làm thế nào tôi có thể tải file lên?",
        "context": "Computer classroom communication",
        "commonMistake": "Sai: How I can upload the file? Đúng: How can I upload the file?"
      },
      {
        "num": 5,
        "pattern": "Verb + object / Please + V / Don't + V",
        "vi": "Đưa hướng dẫn hoặc mệnh lệnh thao tác máy tính.",
        "style": "Cấu trúc chính",
        "example": "Please type your password.",
        "exampleVi": "Vui lòng gõ mật khẩu của bạn.",
        "context": "Computer classroom communication",
        "commonMistake": "Sai: Please types your password. Đúng: Please type your password."
      }
    ],
    "commonQA": [
      {
        "q": "Can you use a computer?",
        "a": "Yes, I can."
      },
      {
        "q": "Can you type your password?",
        "a": "Yes, I can type my password."
      },
      {
        "q": "Can you print the worksheet?",
        "a": "No, I can't. The printer is off."
      },
      {
        "q": "What can you do on a laptop?",
        "a": "I can open a browser and send homework."
      }
    ]
  },
  "listening": {
    "title": "Nghe trả lời - Can/Can't & Computer Actions",
    "transcript": "Listen and choose the correct word to complete each sentence.",
    "translation": "Nghe từng câu có chỗ trống và chọn từ đúng.",
    "questions": [
      {
        "q": "\"I ___ use a computer.\"",
        "audio": "\"I blank use a computer.\"",
        "options": [
          "can",
          "can't"
        ],
        "answer": 0
      },
      {
        "q": "\"I ___ remember my password.\"",
        "audio": "\"I blank remember my password.\"",
        "options": [
          "can",
          "can't"
        ],
        "answer": 1
      },
      {
        "q": "\"___ you type fast?\"",
        "audio": "\"blank you type fast?\"",
        "options": [
          "Can",
          "Do"
        ],
        "answer": 0
      },
      {
        "q": "\"Yes, I ___.\"",
        "audio": "\"Yes, I blank.\"",
        "options": [
          "can",
          "do"
        ],
        "answer": 0
      },
      {
        "q": "\"No, I ___.\"",
        "audio": "\"No, I blank.\"",
        "options": [
          "can",
          "can't"
        ],
        "answer": 1
      },
      {
        "q": "\"She can ___ the browser.\"",
        "audio": "\"She can blank the browser.\"",
        "options": [
          "opens",
          "open"
        ],
        "answer": 1
      },
      {
        "q": "\"He can't ___ the file.\"",
        "audio": "\"He can't blank the file.\"",
        "options": [
          "save",
          "saves"
        ],
        "answer": 0
      },
      {
        "q": "\"Can you ___ in?\"",
        "audio": "\"Can you blank in?\"",
        "options": [
          "log",
          "logs"
        ],
        "answer": 0
      },
      {
        "q": "\"Please ___ your password.\"",
        "audio": "\"Please blank your password.\"",
        "options": [
          "type",
          "types"
        ],
        "answer": 0
      },
      {
        "q": "\"Don't ___ the window.\"",
        "audio": "\"Don't blank the window.\"",
        "options": [
          "close",
          "closes"
        ],
        "answer": 0
      },
      {
        "q": "\"I can ___ the homework.\"",
        "audio": "\"I can blank the homework.\"",
        "options": [
          "upload",
          "uploads"
        ],
        "answer": 0
      },
      {
        "q": "\"Can she ___ the printer?\"",
        "audio": "\"Can she blank the printer?\"",
        "options": [
          "use",
          "uses"
        ],
        "answer": 0
      },
      {
        "q": "\"They can't ___ to the internet.\"",
        "audio": "\"They can't blank to the internet.\"",
        "options": [
          "connect",
          "connects"
        ],
        "answer": 0
      },
      {
        "q": "\"Open the ___.\"",
        "audio": "\"Open the blank.\"",
        "options": [
          "browser",
          "mouse"
        ],
        "answer": 0
      },
      {
        "q": "\"Click the ___.\"",
        "audio": "\"Click the blank.\"",
        "options": [
          "button",
          "screen"
        ],
        "answer": 0
      },
      {
        "q": "\"Save the ___ in the folder.\"",
        "audio": "\"Save the blank in the folder.\"",
        "options": [
          "file",
          "keyboard"
        ],
        "answer": 0
      },
      {
        "q": "\"Can you ___ the worksheet?\"",
        "audio": "\"Can you blank the worksheet?\"",
        "options": [
          "download",
          "downloads"
        ],
        "answer": 0
      },
      {
        "q": "\"He can ___ and paste.\"",
        "audio": "\"He can blank and paste.\"",
        "options": [
          "copy",
          "copies"
        ],
        "answer": 0
      },
      {
        "q": "\"The webcam is ___ the screen.\"",
        "audio": "\"The webcam is blank the screen.\"",
        "options": [
          "above",
          "under"
        ],
        "answer": 0
      },
      {
        "q": "\"The mouse is ___ the keyboard.\"",
        "audio": "\"The mouse is blank the keyboard.\"",
        "options": [
          "next to",
          "in"
        ],
        "answer": 0
      }
    ]
  },
  "translation": {
    "title": "Luyện dịch Việt ↔ Anh - Computer Ability",
    "instruction": "Dịch từng câu. Chỉ hiện đáp án sau khi học viên bấm kiểm tra.",
    "sentences": [
      {
        "vi": "🇳 Tôi có thể dùng máy tính.",
        "en": "I can use a computer.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Tôi không thể đăng nhập.",
        "en": "I can't log in.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Bạn có thể gõ mật khẩu không?",
        "en": "Can you type the password?",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Có, tôi có thể.",
        "en": "Yes, I can.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Không, tôi không thể.",
        "en": "No, I can't.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Hãy mở trình duyệt.",
        "en": "Open the browser.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Hãy lưu file.",
        "en": "Save the file.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Đừng đóng cửa sổ.",
        "en": "Don't close the window.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Tôi có thể tải bài tập lên.",
        "en": "I can upload the homework.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Anh ấy không thể in bài tập.",
        "en": "He can't print the worksheet.",
        "direction": "vi-en"
      },
      {
        "en": "🇧 Can you use the keyboard?",
        "vi": "Bạn có thể dùng bàn phím không?",
        "direction": "en-vi"
      },
      {
        "en": "🇧 She can open the file.",
        "vi": "Cô ấy có thể mở file.",
        "direction": "en-vi"
      },
      {
        "en": "🇧 They can't connect to the internet.",
        "vi": "Họ không thể kết nối Internet.",
        "direction": "en-vi"
      },
      {
        "en": "🇧 Please type your username.",
        "vi": "Vui lòng gõ tên đăng nhập của bạn.",
        "direction": "en-vi"
      },
      {
        "vi": "🇳 Chuột máy tính ở cạnh bàn phím.",
        "en": "The mouse is next to the keyboard.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Webcam ở phía trên màn hình.",
        "en": "The webcam is above the screen.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Tôi có thể sao chép và dán đoạn văn.",
        "en": "I can copy and paste the text.",
        "direction": "vi-en"
      },
      {
        "vi": "🇳 Bạn có thể tải worksheet xuống không?",
        "en": "Can you download the worksheet?",
        "direction": "vi-en"
      },
      {
        "en": "🇧 How can I send my homework?",
        "vi": "Làm thế nào tôi có thể gửi bài tập?",
        "direction": "en-vi"
      },
      {
        "en": "🇧 I can't remember my password.",
        "vi": "Tôi không thể nhớ mật khẩu của mình.",
        "direction": "en-vi"
      }
    ]
  },
  "dialogueVideo": {
    "title": "In the Computer Room: Can you log in?",
    "label": "Computer room dialogue",
    "channel": "YouTube search fallback + full transcript",
    "duration": "2-5 phút",
    "embedUrl": "https://www.youtube.com/embed?listType=search&list=computer%20room%20dialogue%20beginner%20english%20can%20you%20log%20in",
    "watchUrl": "https://www.youtube.com/results?search_query=computer+room+dialogue+beginner+english+can+you+log+in",
    "fallbackSearchUrl": "https://www.youtube.com/results?search_query=computer+room+dialogue+beginner+english+can+you+log+in",
    "description": "Hội thoại trong phòng máy về đăng nhập, mở trình duyệt, tải worksheet, upload file và gửi bài; transcript song ngữ đủ để học khi video lỗi.",
    "transcript": [
      {
        "speaker": "Teacher",
        "en": "Please turn on your computer.",
        "vi": "Hãy bật máy tính của em lên.",
        "audioText": "Please turn on your computer."
      },
      {
        "speaker": "Student",
        "en": "OK. I can turn it on.",
        "vi": "Vâng. Em có thể bật máy.",
        "audioText": "OK. I can turn it on."
      },
      {
        "speaker": "Teacher",
        "en": "Can you log in?",
        "vi": "Em có thể đăng nhập không?",
        "audioText": "Can you log in?"
      },
      {
        "speaker": "Student",
        "en": "No, I can't. I can't remember my password.",
        "vi": "Không, em không thể. Em không nhớ mật khẩu.",
        "audioText": "No, I can't. I can't remember my password."
      },
      {
        "speaker": "Teacher",
        "en": "Type your username first.",
        "vi": "Gõ tên đăng nhập của em trước.",
        "audioText": "Type your username first."
      },
      {
        "speaker": "Student",
        "en": "I can type my username, but I can't type the password.",
        "vi": "Em có thể gõ tên đăng nhập, nhưng em không thể gõ mật khẩu.",
        "audioText": "I can type my username, but I can't type the password."
      },
      {
        "speaker": "Teacher",
        "en": "That's OK. Use this new password.",
        "vi": "Không sao. Dùng mật khẩu mới này.",
        "audioText": "That's OK. Use this new password."
      },
      {
        "speaker": "Student",
        "en": "Great! I can log in now.",
        "vi": "Tuyệt! Bây giờ em có thể đăng nhập.",
        "audioText": "Great! I can log in now."
      },
      {
        "speaker": "Teacher",
        "en": "Open the browser and go to the class website.",
        "vi": "Mở trình duyệt và vào trang web lớp học.",
        "audioText": "Open the browser and go to the class website."
      },
      {
        "speaker": "Student",
        "en": "I can open the website. What can I do next?",
        "vi": "Em có thể mở trang web. Em làm gì tiếp theo?",
        "audioText": "I can open the website. What can I do next?"
      },
      {
        "speaker": "Teacher",
        "en": "Download the worksheet, finish it, and upload your file.",
        "vi": "Tải worksheet xuống, hoàn thành nó, rồi tải file của em lên.",
        "audioText": "Download the worksheet, finish it, and upload your file."
      },
      {
        "speaker": "Student",
        "en": "I can download it, but I can't upload my file.",
        "vi": "Em có thể tải xuống, nhưng em không thể tải file lên.",
        "audioText": "I can download it, but I can't upload my file."
      },
      {
        "speaker": "Teacher",
        "en": "Click this button. Then send your homework.",
        "vi": "Nhấp nút này. Sau đó gửi bài tập của em.",
        "audioText": "Click this button. Then send your homework."
      },
      {
        "speaker": "Student",
        "en": "Done! I can send it now.",
        "vi": "Xong rồi! Bây giờ em có thể gửi rồi.",
        "audioText": "Done! I can send it now."
      }
    ],
    "keywords": [
      {
        "en": "turn on your computer",
        "vi": "bật máy tính",
        "example": "Please turn on your computer."
      },
      {
        "en": "log in",
        "vi": "đăng nhập",
        "example": "Can you log in?"
      },
      {
        "en": "remember my password",
        "vi": "nhớ mật khẩu của tôi",
        "example": "I can't remember my password."
      },
      {
        "en": "open the browser",
        "vi": "mở trình duyệt",
        "example": "Open the browser."
      },
      {
        "en": "class website",
        "vi": "trang web lớp học",
        "example": "Go to the class website."
      },
      {
        "en": "upload your file",
        "vi": "tải file lên",
        "example": "Upload your file."
      },
      {
        "en": "send your homework",
        "vi": "gửi bài tập",
        "example": "Send your homework."
      }
    ],
    "comprehension": [
      {
        "q": "What does the teacher ask the student to turn on?",
        "options": [
          "The printer",
          "The computer",
          "The phone",
          "The speaker"
        ],
        "answer": 1
      },
      {
        "q": "Why can't the student log in at first?",
        "options": [
          "The screen is broken.",
          "The student can't remember the password.",
          "The internet is slow.",
          "The printer is off."
        ],
        "answer": 1
      },
      {
        "q": "What does the student open?",
        "options": [
          "A folder only",
          "The browser and the class website",
          "A picture",
          "The printer"
        ],
        "answer": 1
      },
      {
        "q": "What can the student download?",
        "options": [
          "The worksheet",
          "A game",
          "A video",
          "A song"
        ],
        "answer": 0
      },
      {
        "q": "What does the student do at the end?",
        "options": [
          "Close the computer",
          "Print a picture",
          "Send the homework",
          "Buy a laptop"
        ],
        "answer": 2
      }
    ],
    "listenPickLine": [
      {
        "prompt": "\"Can you log in?\" → trả lời đúng:",
        "audioText": "\"Can you log in?\"",
        "options": [
          "No, I can't. I can't remember my password.",
          "No, I don't.",
          "Yes, there is.",
          "It is on the desk."
        ],
        "answer": 0
      },
      {
        "prompt": "\"Type your username first.\" → nghĩa là?",
        "audioText": "\"Type your username first.\"",
        "options": [
          "Gõ tên đăng nhập trước.",
          "Tắt máy tính.",
          "In bài tập.",
          "Đóng trình duyệt."
        ],
        "answer": 0
      },
      {
        "prompt": "\"I can log in now.\" → nghĩa là?",
        "audioText": "\"I can log in now.\"",
        "options": [
          "Bây giờ tôi có thể đăng nhập.",
          "Tôi không thể đăng nhập.",
          "Tôi có thể in.",
          "Tôi đang ăn."
        ],
        "answer": 0
      },
      {
        "prompt": "\"Open the browser.\" → học sinh nên làm gì?",
        "audioText": "\"Open the browser.\"",
        "options": [
          "Mở trình duyệt.",
          "Đóng cửa sổ.",
          "Kéo thả ảnh.",
          "Tắt màn hình."
        ],
        "answer": 0
      },
      {
        "prompt": "\"Download the worksheet.\" → nghĩa là?",
        "audioText": "\"Download the worksheet.\"",
        "options": [
          "Tải worksheet xuống.",
          "Tải file lên.",
          "Gửi bài tập.",
          "Lưu file."
        ],
        "answer": 0
      },
      {
        "prompt": "\"Upload your file.\" → nghĩa là?",
        "audioText": "\"Upload your file.\"",
        "options": [
          "Tải file lên.",
          "Tải file xuống.",
          "Gõ mật khẩu.",
          "Nhấp đúp chuột."
        ],
        "answer": 0
      },
      {
        "prompt": "\"Click this button.\" → hành động đúng là:",
        "audioText": "\"Click this button.\"",
        "options": [
          "Nhấp nút này.",
          "Gõ mật khẩu này.",
          "In bài này.",
          "Tắt máy."
        ],
        "answer": 0
      },
      {
        "prompt": "\"I can't upload my file.\" → ý đúng là:",
        "audioText": "\"I can't upload my file.\"",
        "options": [
          "Tôi không thể tải file lên.",
          "Tôi có thể tải file lên.",
          "Tôi không có máy tính.",
          "Tôi thích file này."
        ],
        "answer": 0
      },
      {
        "prompt": "\"Can you use the keyboard?\" → trả lời đúng:",
        "audioText": "\"Can you use the keyboard?\"",
        "options": [
          "Yes, I can.",
          "Yes, there are.",
          "No, I don't.",
          "It is a keyboard."
        ],
        "answer": 0
      },
      {
        "prompt": "\"Don't close the window.\" → nghĩa là?",
        "audioText": "\"Don't close the window.\"",
        "options": [
          "Đừng đóng cửa sổ.",
          "Hãy đóng cửa sổ.",
          "Đừng mở trình duyệt.",
          "Hãy gửi bài."
        ],
        "answer": 0
      }
    ],
    "fillConversation": [
      {
        "wordBank": [
          "can",
          "can't",
          "log",
          "type",
          "password",
          "open",
          "browser",
          "send"
        ],
        "lines": [
          {
            "speaker": "Teacher",
            "text": "Can you [[log]] in?"
          },
          {
            "speaker": "Student",
            "text": "No, I [[can't]]. I can't remember my [[password]]."
          },
          {
            "speaker": "Teacher",
            "text": "Please [[type]] your username first."
          },
          {
            "speaker": "Student",
            "text": "OK. I [[can]] type my username now."
          },
          {
            "speaker": "Teacher",
            "text": "Great. Open the [[browser]] and go to the class website."
          },
          {
            "speaker": "Student",
            "text": "I can [[open]] the website. Can I [[send]] my homework now?"
          }
        ],
        "explanations": [
          "log in = đăng nhập",
          "can't = không thể",
          "password = mật khẩu",
          "type = gõ",
          "can + V nguyên mẫu",
          "browser = trình duyệt",
          "open = mở",
          "send = gửi"
        ]
      },
      {
        "wordBank": [
          "download",
          "upload",
          "file",
          "click",
          "save",
          "can't",
          "can",
          "printer"
        ],
        "lines": [
          {
            "speaker": "A",
            "text": "Can you [[download]] the worksheet?"
          },
          {
            "speaker": "B",
            "text": "Yes, I [[can]]."
          },
          {
            "speaker": "A",
            "text": "Can you finish and [[save]] the file?"
          },
          {
            "speaker": "B",
            "text": "Yes, I can [[save]] it in this folder."
          },
          {
            "speaker": "A",
            "text": "Can you [[upload]] your homework file?"
          },
          {
            "speaker": "B",
            "text": "No, I [[can't]]."
          },
          {
            "speaker": "A",
            "text": "[[Click]] this button first."
          },
          {
            "speaker": "B",
            "text": "Done! But I can't use the [[printer]] today."
          }
        ],
        "explanations": [
          "download = tải xuống",
          "can = trả lời ngắn khẳng định",
          "save = lưu",
          "upload = tải lên",
          "can't = không thể",
          "Click = mệnh lệnh",
          "printer = máy in"
        ]
      }
    ]
  },
  "speaking": {
    "title": "Luyện nói AI - Computer Skills with Can/Can't",
    "formula": "S + can/can't + V nguyên mẫu | Can you + V? | Verb + object",
    "turns": [
      {
        "id": 1,
        "ai": {
          "textEn": "What can you do on a computer?",
          "audioUrl": "What can you do on a computer?"
        },
        "user": {
          "formula": "I can + V nguyên mẫu. I can't + V nguyên mẫu.",
          "sampleEn": "I can use a computer. I can type and open a browser. I can't print very well.",
          "sampleAudioUrl": "I can use a computer. I can type and open a browser. I can't print very well.",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 2,
        "ai": {
          "textEn": "Ask me 3 questions with Can you...?",
          "audioUrl": "Ask me 3 questions with Can you...?"
        },
        "user": {
          "formula": "Can you + V nguyên mẫu?",
          "sampleEn": "Can you log in? Can you type your password? Can you upload your homework?",
          "sampleAudioUrl": "Can you log in? Can you type your password? Can you upload your homework?",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 3,
        "ai": {
          "textEn": "You can't log in. What do you say?",
          "audioUrl": "You can't log in. What do you say?"
        },
        "user": {
          "formula": "I can't + V. I can't remember + noun.",
          "sampleEn": "I can't log in. I can't remember my password. Can you help me, please?",
          "sampleAudioUrl": "I can't log in. I can't remember my password. Can you help me, please?",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 4,
        "ai": {
          "textEn": "Tell your friend how to send homework.",
          "audioUrl": "Tell your friend how to send homework."
        },
        "user": {
          "formula": "Verb + object: Open..., Click..., Upload..., Send...",
          "sampleEn": "Open the browser. Go to the class website. Upload your file. Click the button and send your homework.",
          "sampleAudioUrl": "Open the browser. Go to the class website. Upload your file. Click the button and send your homework.",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 5,
        "ai": {
          "textEn": "Tell me about your computer skills. Use at least 5 sentences with can/can't.",
          "audioUrl": "Tell me about your computer skills. Use at least 5 sentences with can/can't."
        },
        "user": {
          "formula": "Dùng 5 câu: 3 câu can + 2 câu can't + 1 câu hỏi Can you...?",
          "sampleEn": "I can use a laptop. I can type my username and password. I can open a browser and download a worksheet. I can't print at home. I can't upload big files. Can you help me upload my homework?",
          "sampleAudioUrl": "I can use a laptop. I can type my username and password. I can open a browser and download a worksheet. I can't print at home. I can't upload big files. Can you help me upload my homework?",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      }
    ]
  },
  "minitest": [
    {
      "q": "\"Computer\" nghĩa là gì?",
      "options": [
        "máy tính",
        "máy in",
        "bàn phím",
        "chuột"
      ],
      "answer": 0
    },
    {
      "q": "\"Keyboard\" nghĩa là gì?",
      "options": [
        "chuột",
        "bàn phím",
        "màn hình",
        "loa"
      ],
      "answer": 1
    },
    {
      "q": "\"Mouse\" trong bài này nghĩa là gì?",
      "options": [
        "chuột máy tính",
        "con mèo",
        "máy in",
        "tai nghe"
      ],
      "answer": 0
    },
    {
      "q": "\"Screen\" nghĩa là gì?",
      "options": [
        "màn hình",
        "dây cáp",
        "sạc",
        "thư mục"
      ],
      "answer": 0
    },
    {
      "q": "\"I ___ type.\"",
      "options": [
        "can",
        "cans",
        "do can",
        "am can"
      ],
      "answer": 0
    },
    {
      "q": "\"She can ___ the file.\"",
      "options": [
        "opens",
        "open",
        "opening",
        "opened"
      ],
      "answer": 1
    },
    {
      "q": "\"He ___ remember his password.\"",
      "options": [
        "can nots",
        "can't",
        "doesn't can",
        "isn't can"
      ],
      "answer": 1
    },
    {
      "q": "\"___ you log in?\"",
      "options": [
        "Do",
        "Are",
        "Can",
        "Is"
      ],
      "answer": 2
    },
    {
      "q": "\"Can you print?\" → Trả lời phủ định đúng:",
      "options": [
        "No, I don't.",
        "No, I can't.",
        "No, I am not.",
        "No, there isn't."
      ],
      "answer": 1
    },
    {
      "q": "\"Can she use a printer?\" → Trả lời khẳng định đúng:",
      "options": [
        "Yes, she can.",
        "Yes, she does.",
        "Yes, she is.",
        "Yes, there is."
      ],
      "answer": 0
    },
    {
      "q": "Câu nào đúng?",
      "options": [
        "She can types.",
        "She can type.",
        "She cans type.",
        "She can typing."
      ],
      "answer": 1
    },
    {
      "q": "\"log in\" nghĩa là gì?",
      "options": [
        "đăng nhập",
        "đăng xuất",
        "tải xuống",
        "in"
      ],
      "answer": 0
    },
    {
      "q": "\"log out\" nghĩa là gì?",
      "options": [
        "đăng nhập",
        "đăng xuất",
        "lưu",
        "dán"
      ],
      "answer": 1
    },
    {
      "q": "\"upload\" nghĩa là gì?",
      "options": [
        "tải lên",
        "tải xuống",
        "mở",
        "đóng"
      ],
      "answer": 0
    },
    {
      "q": "\"download\" nghĩa là gì?",
      "options": [
        "tải xuống",
        "tải lên",
        "gửi",
        "nhấp"
      ],
      "answer": 0
    },
    {
      "q": "\"Open the browser\" nghĩa là gì?",
      "options": [
        "Mở trình duyệt",
        "Đóng trình duyệt",
        "In file",
        "Gõ mật khẩu"
      ],
      "answer": 0
    },
    {
      "q": "\"Save the file\" nghĩa là gì?",
      "options": [
        "Lưu file",
        "Mở file",
        "Xóa file",
        "Tải lên"
      ],
      "answer": 0
    },
    {
      "q": "Câu nào là mệnh lệnh đúng?",
      "options": [
        "Please types your password.",
        "Please type your password.",
        "Please typing password.",
        "Please can type."
      ],
      "answer": 1
    },
    {
      "q": "\"I can't remember my password\" nghĩa là gì?",
      "options": [
        "Tôi không nhớ mật khẩu",
        "Tôi nhớ mật khẩu",
        "Tôi có mật khẩu mới",
        "Tôi có thể in"
      ],
      "answer": 0
    },
    {
      "q": "\"What can you do on a laptop?\" → Trả lời đúng:",
      "options": [
        "I can open a browser.",
        "Yes, there is.",
        "It is on the desk.",
        "There are two laptops."
      ],
      "answer": 0
    }
  ],
  "mindmap": {
    "type": "structured",
    "center": "COMPUTER VOCABULARY & CAN/CAN'T",
    "branches": [
      {
        "icon": "💻",
        "label": "Computer parts",
        "items": [
          "computer",
          "laptop",
          "screen",
          "keyboard",
          "mouse",
          "printer",
          "webcam",
          "headphones"
        ]
      },
      {
        "icon": "🌐",
        "label": "Digital words",
        "items": [
          "password",
          "username",
          "file",
          "folder",
          "browser",
          "website",
          "internet"
        ]
      },
      {
        "icon": "🖱️",
        "label": "Actions",
        "items": [
          "log in",
          "type",
          "click",
          "open",
          "close",
          "save",
          "print",
          "upload",
          "download",
          "send"
        ]
      },
      {
        "icon": "✅",
        "label": "Can",
        "items": [
          "S + can + V",
          "I can type.",
          "She can open.",
          "Can you...?"
        ]
      },
      {
        "icon": "❌",
        "label": "Can't",
        "items": [
          "S + can't + V",
          "I can't print.",
          "He can't log in.",
          "No, I can't."
        ]
      },
      {
        "icon": "📣",
        "label": "Commands",
        "items": [
          "Open the browser.",
          "Click the button.",
          "Type your password.",
          "Save the file.",
          "Upload your homework."
        ]
      }
    ]
  },
  "homeworkRich": {
    "title": "Bài tập về nhà - Buổi 14: Computer Skills",
    "submit": "Nộp bài qua nhóm lớp; nhận bài viết, voice note hoặc video ngắn.",
    "deadline": "Trước buổi học tiếp theo",
    "tasks": [
      {
        "icon": "✍️",
        "title": "BÀI TẬP 1: VIẾT - What I Can Do on a Computer",
        "badge": "Bắt buộc",
        "desc": "Viết 6-8 câu về việc em có thể/không thể làm trên máy tính.",
        "items": [
          "Dùng ít nhất 3 câu với can.",
          "Dùng ít nhất 2 câu với can't.",
          "Dùng ít nhất 1 câu hỏi Can you...?",
          "Dùng ít nhất 5 từ vựng máy tính trong bài."
        ],
        "sample": "I can use a computer. I can type my username and password. I can open a browser and download a worksheet. I can't print at home. I can't upload big files. Can you help me send my homework?",
        "rubric": "10 điểm: đúng chủ đề 2, ngữ pháp can/can't 3, từ vựng 2, đủ yêu cầu 2, trình bày rõ 1."
      },
      {
        "icon": "🎙️",
        "title": "BÀI TẬP 2: NÓI / GHI ÂM / VIDEO - Computer Room Dialogue",
        "badge": "Bắt buộc",
        "desc": "Ghi âm hoặc quay video hội thoại 2 vai Teacher và Student trong phòng máy tính. Mỗi vai nói ít nhất 4 câu.",
        "items": [
          "Can you turn on the computer?",
          "Can you log in?",
          "Can you type your password?",
          "Can you open the browser?",
          "Can you upload and send your homework?"
        ],
        "sample": "Teacher: Can you log in? Student: No, I can't. I can't remember my password.",
        "rubric": "10 điểm: đúng chủ đề 2, ngữ pháp can/can't 3, từ vựng 2, đủ số câu/2 vai 2, phát âm hoặc chất lượng ghi âm/video 1."
      }
    ]
  },
  "homework": [
    "Viết 6-8 câu về việc em có thể/không thể làm trên máy tính, dùng can/can't và ít nhất 5 từ vựng Buổi 14.",
    "Ghi âm hoặc quay video hội thoại 2 vai trong phòng máy tính, mỗi vai ít nhất 4 câu."
  ],
  "technicalNotes": [
    "MD giữ đúng thứ tự 15 mục theo yêu cầu Buổi 14; app normalize sang sectionFlow canonical của Buổi 9.",
    "Các đáp án nằm trong data answer/wordBank/explanations/rubric; renderer quiz chỉ hiện đúng/sai sau khi học viên chọn hoặc bấm kiểm tra.",
    "Video YouTube có embedUrl, watchUrl, fallbackSearchUrl; transcript hội thoại song ngữ đủ để học nếu iframe lỗi."
  ]
};
applyExpandedLessonTemplate(14, LESSON_14_TEMPLATE);
// </imported-lesson-14>
// <imported-lesson-19>
const LESSON_19_IMPORTED_TEMPLATE = {
  "unit": "Unit 5",
  "title": "So sánh Hiện tại đơn vs Hiện tại tiếp diễn",
  "titleVi": "So sánh Hiện tại đơn vs Hiện tại tiếp diễn",
  "titleEn": "Present Simple vs Present Continuous",
  "cefrLevel": "A1",
  "mainTopic": "Shopping habits and actions happening now",
  "grammarFocus": "Present Simple vs Present Continuous",
  "objectives": [
    "Phân biệt Present Simple và Present Continuous.",
    "Nhận diện dấu hiệu usually/every day/often và now/right now/at the moment/Look!.",
    "Dùng đúng Do/Does và Am/Is/Are trong tình huống mua sắm.",
    "Nói, nghe, dịch câu A1 về thói quen và hành động đang làm."
  ],
  "importStatus": "markdown",
  "review": {
    "title": "Ôn bài cũ - Clothing & Present Continuous",
    "topic": "Buổi 18: Quần áo và hiện tại tiếp diễn",
    "recallStructure": [
      "What are you wearing?",
      "She is trying on a jacket.",
      "Are they buying shoes?",
      "This jacket fits well."
    ],
    "reviewGames": {
      "title": "Ôn tập Buổi 18 - Clothes & Shopping",
      "intro": "Game 1 nghe chọn từ 20 câu; Game 2 Quiz Bomb 20 câu.",
      "vocabulary": [
        {
          "en": "T-shirt",
          "vi": "áo thun",
          "img": "🎧",
          "ipa": "",
          "options": [
            "áo thun",
            "quần jeans",
            "chân váy",
            "áo len"
          ],
          "answer": 0
        },
        {
          "en": "shirt",
          "vi": "áo sơ mi",
          "img": "🎧",
          "ipa": "",
          "options": [
            "giày",
            "áo sơ mi",
            "quần dài",
            "áo khoác"
          ],
          "answer": 1
        },
        {
          "en": "jeans",
          "vi": "quần jeans",
          "img": "🎧",
          "ipa": "",
          "options": [
            "áo khoác dày",
            "giày thể thao",
            "quần jeans",
            "váy liền"
          ],
          "answer": 2
        },
        {
          "en": "trousers",
          "vi": "quần dài",
          "img": "🎧",
          "ipa": "",
          "options": [
            "chân váy",
            "áo len",
            "tất/vớ",
            "quần dài"
          ],
          "answer": 3
        },
        {
          "en": "dress",
          "vi": "váy liền",
          "img": "🎧",
          "ipa": "",
          "options": [
            "váy liền",
            "áo khoác",
            "giày",
            "mũ"
          ],
          "answer": 0
        },
        {
          "en": "skirt",
          "vi": "chân váy",
          "img": "🎧",
          "ipa": "",
          "options": [
            "mũ lưỡi trai",
            "chân váy",
            "áo khoác dày",
            "giày thể thao"
          ],
          "answer": 1
        },
        {
          "en": "jacket",
          "vi": "áo khoác",
          "img": "🎧",
          "ipa": "",
          "options": [
            "tất/vớ",
            "khăn quàng",
            "áo khoác",
            "áo len"
          ],
          "answer": 2
        },
        {
          "en": "coat",
          "vi": "áo khoác dày",
          "img": "🎧",
          "ipa": "",
          "options": [
            "giày",
            "mũ",
            "kích cỡ",
            "áo khoác dày"
          ],
          "answer": 3
        },
        {
          "en": "sweater",
          "vi": "áo len",
          "img": "🎧",
          "ipa": "",
          "options": [
            "áo len",
            "giày thể thao",
            "mũ lưỡi trai",
            "nhỏ"
          ],
          "answer": 0
        },
        {
          "en": "shoes",
          "vi": "giày",
          "img": "🎧",
          "ipa": "",
          "options": [
            "vừa",
            "giày",
            "tất/vớ",
            "khăn quàng"
          ],
          "answer": 1
        },
        {
          "en": "trainers",
          "vi": "giày thể thao",
          "img": "🎧",
          "ipa": "",
          "options": [
            "kích cỡ",
            "lớn",
            "giày thể thao",
            "mũ"
          ],
          "answer": 2
        },
        {
          "en": "socks",
          "vi": "tất/vớ",
          "img": "🎧",
          "ipa": "",
          "options": [
            "mũ lưỡi trai",
            "nhỏ",
            "quá to",
            "tất/vớ"
          ],
          "answer": 3
        },
        {
          "en": "hat",
          "vi": "mũ",
          "img": "🎧",
          "ipa": "",
          "options": [
            "mũ",
            "khăn quàng",
            "vừa",
            "áo thun"
          ],
          "answer": 0
        },
        {
          "en": "cap",
          "vi": "mũ lưỡi trai",
          "img": "🎧",
          "ipa": "",
          "options": [
            "áo sơ mi",
            "mũ lưỡi trai",
            "kích cỡ",
            "lớn"
          ],
          "answer": 1
        },
        {
          "en": "scarf",
          "vi": "khăn quàng",
          "img": "🎧",
          "ipa": "",
          "options": [
            "quá to",
            "quần jeans",
            "khăn quàng",
            "nhỏ"
          ],
          "answer": 2
        },
        {
          "en": "size",
          "vi": "kích cỡ",
          "img": "🎧",
          "ipa": "",
          "options": [
            "vừa",
            "áo thun",
            "quần dài",
            "kích cỡ"
          ],
          "answer": 3
        },
        {
          "en": "small S",
          "vi": "nhỏ",
          "img": "🎧",
          "ipa": "",
          "options": [
            "nhỏ",
            "lớn",
            "áo sơ mi",
            "váy liền"
          ],
          "answer": 0
        },
        {
          "en": "medium M",
          "vi": "vừa",
          "img": "🎧",
          "ipa": "",
          "options": [
            "chân váy",
            "vừa",
            "quá to",
            "quần jeans"
          ],
          "answer": 1
        },
        {
          "en": "large L",
          "vi": "lớn",
          "img": "🎧",
          "ipa": "",
          "options": [
            "quần dài",
            "áo khoác",
            "lớn",
            "áo thun"
          ],
          "answer": 2
        },
        {
          "en": "too big",
          "vi": "quá to",
          "img": "🎧",
          "ipa": "",
          "options": [
            "áo sơ mi",
            "váy liền",
            "áo khoác dày",
            "quá to"
          ],
          "answer": 3
        }
      ],
      "quizBomb": {
        "title": "Quiz Bomb Review",
        "instruction": "Trả lời nhanh 20 câu.",
        "questions": [
          {
            "q": "\"T-shirt\" nghĩa là gì?",
            "options": [
              "áo thun",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "\"shirt\" nghĩa là gì?",
            "options": [
              "áo sơ mi",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "\"jeans\" nghĩa là gì?",
            "options": [
              "quần jeans",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "\"trousers\" nghĩa là gì?",
            "options": [
              "quần dài",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "\"dress\" nghĩa là gì?",
            "options": [
              "váy liền",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "\"skirt\" nghĩa là gì?",
            "options": [
              "chân váy",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "\"jacket\" nghĩa là gì?",
            "options": [
              "áo khoác",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "\"coat\" nghĩa là gì?",
            "options": [
              "áo khoác dày",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "\"sweater\" nghĩa là gì?",
            "options": [
              "áo len",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "\"shoes\" nghĩa là gì?",
            "options": [
              "giày",
              "nghĩa sai 1",
              "nghĩa sai 2",
              "nghĩa sai 3"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "I usually ___ jeans.",
            "options": [
              "wear",
              "am wearing",
              "wearing",
              "wore"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "I ___ jeans now.",
            "options": [
              "wear",
              "am wearing",
              "wears",
              "wore"
            ],
            "answer": 1,
            "explanation": ""
          },
          {
            "q": "She often ___ shopping.",
            "options": [
              "go",
              "goes",
              "is going",
              "going"
            ],
            "answer": 1,
            "explanation": ""
          },
          {
            "q": "Look! She ___ on a jacket.",
            "options": [
              "tries",
              "is trying",
              "try",
              "tried"
            ],
            "answer": 1,
            "explanation": ""
          },
          {
            "q": "They ___ the shop every day.",
            "options": [
              "open",
              "are opening",
              "opens",
              "opened"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "They ___ the shop now.",
            "options": [
              "open",
              "are opening",
              "opens",
              "opened"
            ],
            "answer": 1,
            "explanation": ""
          },
          {
            "q": "He usually ___ by card.",
            "options": [
              "pay",
              "pays",
              "is paying",
              "paying"
            ],
            "answer": 1,
            "explanation": ""
          },
          {
            "q": "He ___ by card right now.",
            "options": [
              "pays",
              "is paying",
              "pay",
              "paid"
            ],
            "answer": 1,
            "explanation": ""
          },
          {
            "q": "We ___ a new shirt.",
            "options": [
              "need",
              "are needing",
              "needs",
              "needed"
            ],
            "answer": 0,
            "explanation": ""
          },
          {
            "q": "She ___ this dress.",
            "options": [
              "likes",
              "is liking",
              "like",
              "liked"
            ],
            "answer": 0,
            "explanation": ""
          }
        ]
      }
    }
  },
  "video": {
    "title": "Present Simple vs Present Continuous for Beginners",
    "channel": "YouTube search / ESL",
    "duration": "2-6 phút",
    "embedUrl": "https://www.youtube.com/embed/search?query=Present%20Simple%20vs%20Present%20Continuous%20for%20Beginners",
    "watchUrl": "https://www.youtube.com/results?search_query=Present%20Simple%20vs%20Present%20Continuous%20for%20Beginners",
    "fallbackSearchUrl": "https://www.youtube.com/results?search_query=Present%20Simple%20vs%20Present%20Continuous%20for%20Beginners",
    "description": "Video giới thiệu cách phân biệt thói quen và hành động đang xảy ra trong bối cảnh mua sắm.",
    "sceneSummary": "Cảnh chính: so sánh usually/every day với now/Look!/at the moment.",
    "scenes": [
      {
        "label": "Habit with usually/every day."
      },
      {
        "label": "Action happening now."
      },
      {
        "label": "Shopping examples."
      }
    ],
    "questions": [
      {
        "q": "Where is Nick shopping today?",
        "options": [
          "Online",
          "At the mall",
          "At school",
          "At home"
        ],
        "answer": 1,
        "explanation": "Nick says he is shopping at the mall."
      },
      {
        "q": "What is Nick buying?",
        "options": [
          "A T-shirt",
          "Shoes",
          "A jacket",
          "A scarf"
        ],
        "answer": 2,
        "explanation": "He says he is buying a jacket."
      },
      {
        "q": "Which jacket is on sale?",
        "options": [
          "The black jacket",
          "The blue jacket",
          "The red jacket",
          "The white jacket"
        ],
        "answer": 1,
        "explanation": "The blue jacket is on sale."
      },
      {
        "q": "What tense is used in “I usually buy T-shirts online”?",
        "options": [
          "Present Simple",
          "Present Continuous",
          "Past Simple",
          "Future Simple"
        ],
        "answer": 0,
        "explanation": "usually signals Present Simple."
      },
      {
        "q": "What tense is used in “I am trying it on now”?",
        "options": [
          "Present Simple",
          "Present Continuous",
          "Past Simple",
          "Future Simple"
        ],
        "answer": 1,
        "explanation": "now signals Present Continuous."
      }
    ]
  },
  "vocabulary": [
    {
      "group": "mainVocabulary",
      "en": "usually",
      "vi": "thường thường",
      "ipa": "",
      "img": "📌",
      "example": "I usually wear jeans."
    },
    {
      "group": "mainVocabulary",
      "en": "often",
      "vi": "thường xuyên",
      "ipa": "",
      "img": "📌",
      "example": "She often goes shopping."
    },
    {
      "group": "mainVocabulary",
      "en": "sometimes",
      "vi": "đôi khi",
      "ipa": "",
      "img": "📌",
      "example": "We sometimes buy clothes online."
    },
    {
      "group": "mainVocabulary",
      "en": "always",
      "vi": "luôn luôn",
      "ipa": "",
      "img": "📌",
      "example": "He always pays by card."
    },
    {
      "group": "mainVocabulary",
      "en": "never",
      "vi": "không bao giờ",
      "ipa": "",
      "img": "📌",
      "example": "I never buy expensive shoes."
    },
    {
      "group": "mainVocabulary",
      "en": "every day",
      "vi": "mỗi ngày",
      "ipa": "",
      "img": "📌",
      "example": "They open the shop every day."
    },
    {
      "group": "mainVocabulary",
      "en": "on weekends",
      "vi": "vào cuối tuần",
      "ipa": "",
      "img": "📌",
      "example": "We go shopping on weekends."
    },
    {
      "group": "mainVocabulary",
      "en": "normally",
      "vi": "thông thường",
      "ipa": "",
      "img": "📌",
      "example": "I normally wear a uniform."
    },
    {
      "group": "mainVocabulary",
      "en": "now",
      "vi": "bây giờ",
      "ipa": "",
      "img": "📌",
      "example": "I am shopping now."
    },
    {
      "group": "mainVocabulary",
      "en": "right now",
      "vi": "ngay bây giờ",
      "ipa": "",
      "img": "📌",
      "example": "She is paying right now."
    },
    {
      "group": "mainVocabulary",
      "en": "at the moment",
      "vi": "lúc này",
      "ipa": "",
      "img": "📌",
      "example": "They are waiting at the moment."
    },
    {
      "group": "mainVocabulary",
      "en": "Look!",
      "vi": "Nhìn kìa!",
      "ipa": "",
      "img": "📌",
      "example": "Look! He is trying on a coat."
    },
    {
      "group": "mainVocabulary",
      "en": "Listen!",
      "vi": "Nghe này!",
      "ipa": "",
      "img": "📌",
      "example": "Listen! The customer is asking."
    },
    {
      "group": "mainVocabulary",
      "en": "today",
      "vi": "hôm nay",
      "ipa": "",
      "img": "📌",
      "example": "Today I am buying shoes."
    },
    {
      "group": "mainVocabulary",
      "en": "this week",
      "vi": "tuần này",
      "ipa": "",
      "img": "📌",
      "example": "This week we are studying shopping."
    },
    {
      "group": "lessonPhrases",
      "en": "go shopping",
      "vi": "đi mua sắm",
      "ipa": "",
      "img": "💬",
      "example": "I go shopping on Sundays."
    },
    {
      "group": "lessonPhrases",
      "en": "am shopping now",
      "vi": "đang mua sắm bây giờ",
      "ipa": "",
      "img": "💬",
      "example": "I am shopping now."
    },
    {
      "group": "lessonPhrases",
      "en": "buy clothes",
      "vi": "mua quần áo",
      "ipa": "",
      "img": "💬",
      "example": "She buys clothes every month."
    },
    {
      "group": "lessonPhrases",
      "en": "is buying a jacket",
      "vi": "đang mua áo khoác",
      "ipa": "",
      "img": "💬",
      "example": "She is buying a jacket now."
    },
    {
      "group": "lessonPhrases",
      "en": "wear a uniform",
      "vi": "mặc đồng phục",
      "ipa": "",
      "img": "💬",
      "example": "I wear a uniform at school."
    },
    {
      "group": "lessonPhrases",
      "en": "am wearing a T-shirt",
      "vi": "đang mặc áo thun",
      "ipa": "",
      "img": "💬",
      "example": "I am wearing a T-shirt today."
    },
    {
      "group": "lessonPhrases",
      "en": "try on shoes",
      "vi": "thử giày",
      "ipa": "",
      "img": "💬",
      "example": "They are trying on shoes."
    },
    {
      "group": "lessonPhrases",
      "en": "check the price",
      "vi": "kiểm tra giá",
      "ipa": "",
      "img": "💬",
      "example": "He checks the price carefully."
    },
    {
      "group": "lessonPhrases",
      "en": "pay by card",
      "vi": "trả bằng thẻ",
      "ipa": "",
      "img": "💬",
      "example": "She usually pays by card."
    },
    {
      "group": "lessonPhrases",
      "en": "stand in line",
      "vi": "xếp hàng",
      "ipa": "",
      "img": "💬",
      "example": "They are standing in line now."
    },
    {
      "group": "lessonPhrases",
      "en": "need a new shirt",
      "vi": "cần áo mới",
      "ipa": "",
      "img": "💬",
      "example": "I need a new shirt."
    },
    {
      "group": "lessonPhrases",
      "en": "want those shoes",
      "vi": "muốn đôi giày kia",
      "ipa": "",
      "img": "💬",
      "example": "She wants those shoes."
    },
    {
      "group": "lessonPhrases",
      "en": "like this dress",
      "vi": "thích váy này",
      "ipa": "",
      "img": "💬",
      "example": "I like this dress."
    },
    {
      "group": "lessonPhrases",
      "en": "work in a shop",
      "vi": "làm ở cửa hàng",
      "ipa": "",
      "img": "💬",
      "example": "My aunt works in a shop."
    },
    {
      "group": "lessonPhrases",
      "en": "is helping a customer",
      "vi": "đang giúp khách",
      "ipa": "",
      "img": "💬",
      "example": "The assistant is helping a customer."
    }
  ],
  "vocabGroups": {
    "mainVocabulary": "TAB 1: Từ vựng chính",
    "lessonPhrases": "TAB 2: Cụm từ / hành động ứng dụng"
  },
  "listenPick": {
    "title": "Nghe chọn từ",
    "instruction": "Nghe audio rồi chọn nghĩa đúng.",
    "questions": [
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "usually",
        "en": "usually",
        "options": [
          "thường thường",
          "đôi khi",
          "mỗi ngày",
          "bây giờ"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "often",
        "en": "often",
        "options": [
          "ngay bây giờ",
          "thường xuyên",
          "luôn luôn",
          "vào cuối tuần"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "sometimes",
        "en": "sometimes",
        "options": [
          "thông thường",
          "lúc này",
          "đôi khi",
          "không bao giờ"
        ],
        "answer": 2,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "always",
        "en": "always",
        "options": [
          "mỗi ngày",
          "bây giờ",
          "Nhìn kìa!",
          "luôn luôn"
        ],
        "answer": 3,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "never",
        "en": "never",
        "options": [
          "không bao giờ",
          "vào cuối tuần",
          "ngay bây giờ",
          "Nghe này!"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "every day",
        "en": "every day",
        "options": [
          "hôm nay",
          "mỗi ngày",
          "thông thường",
          "lúc này"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "on weekends",
        "en": "on weekends",
        "options": [
          "Nhìn kìa!",
          "tuần này",
          "vào cuối tuần",
          "bây giờ"
        ],
        "answer": 2,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "normally",
        "en": "normally",
        "options": [
          "ngay bây giờ",
          "Nghe này!",
          "đi mua sắm",
          "thông thường"
        ],
        "answer": 3,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "now",
        "en": "now",
        "options": [
          "bây giờ",
          "lúc này",
          "hôm nay",
          "đang mua sắm bây giờ"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "right now",
        "en": "right now",
        "options": [
          "mua quần áo",
          "ngay bây giờ",
          "Nhìn kìa!",
          "tuần này"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "at the moment",
        "en": "at the moment",
        "options": [
          "đi mua sắm",
          "đang mua áo khoác",
          "lúc này",
          "Nghe này!"
        ],
        "answer": 2,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "Look",
        "en": "Look",
        "options": [
          "hôm nay",
          "đang mua sắm bây giờ",
          "mặc đồng phục",
          "Nhìn kìa!"
        ],
        "answer": 3,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "Listen",
        "en": "Listen",
        "options": [
          "Nghe này!",
          "tuần này",
          "mua quần áo",
          "đang mặc áo thun"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "today",
        "en": "today",
        "options": [
          "thử giày",
          "hôm nay",
          "đi mua sắm",
          "đang mua áo khoác"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "this week",
        "en": "this week",
        "options": [
          "mặc đồng phục",
          "kiểm tra giá",
          "tuần này",
          "đang mua sắm bây giờ"
        ],
        "answer": 2,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "go shopping",
        "en": "go shopping",
        "options": [
          "mua quần áo",
          "đang mặc áo thun",
          "trả bằng thẻ",
          "đi mua sắm"
        ],
        "answer": 3,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "am shopping now",
        "en": "am shopping now",
        "options": [
          "đang mua sắm bây giờ",
          "đang mua áo khoác",
          "thử giày",
          "xếp hàng"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "buy clothes",
        "en": "buy clothes",
        "options": [
          "cần áo mới",
          "mua quần áo",
          "mặc đồng phục",
          "kiểm tra giá"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "is buying a jacket",
        "en": "is buying a jacket",
        "options": [
          "trả bằng thẻ",
          "muốn đôi giày kia",
          "đang mua áo khoác",
          "đang mặc áo thun"
        ],
        "answer": 2,
        "explanation": ""
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "wear a uniform",
        "en": "wear a uniform",
        "options": [
          "thử giày",
          "xếp hàng",
          "thích váy này",
          "mặc đồng phục"
        ],
        "answer": 3,
        "explanation": ""
      }
    ]
  },
  "grammar": {
    "title": "Present Simple vs Present Continuous",
    "intro": "Dùng Present Simple cho thói quen/sự thật; dùng Present Continuous cho hành động đang xảy ra hoặc tình huống tạm thời.",
    "badge": "5 CẤU TRÚC CÂU CHÍNH",
    "formula": "S + V(s/es) | S + am/is/are + V-ing | Do/Does + S + V? | Am/Is/Are + S + V-ing? | stative verbs in Simple",
    "structures": [
      {
        "num": 1,
        "pattern": "Present Simple: S + V(s/es)",
        "vi": "Nói thói quen, lịch trình, sự thật.",
        "style": "Dùng với usually, often, every day, on weekends, normally.",
        "example": "I usually wear jeans. She buys clothes every month.",
        "exampleVi": "Tôi thường mặc quần jeans. Cô ấy mua quần áo mỗi tháng.",
        "context": "Thói quen mua sắm hoặc trang phục lặp lại.",
        "commonMistake": "Sai: She buy clothes every month. Đúng: She buys clothes every month."
      },
      {
        "num": 2,
        "pattern": "Present Continuous: S + am/is/are + V-ing",
        "vi": "Nói hành động đang xảy ra hoặc tình huống tạm thời.",
        "style": "Dùng với now, right now, at the moment, Look!, today, this week.",
        "example": "I am shopping now. She is trying on a jacket.",
        "exampleVi": "Tôi đang mua sắm bây giờ. Cô ấy đang thử áo khoác.",
        "context": "Hành động xảy ra tại cửa hàng hoặc quanh thời điểm nói.",
        "commonMistake": "Sai: I shopping now. Đúng: I am shopping now."
      },
      {
        "num": 3,
        "pattern": "Questions: Do/Does + S + V? vs Am/Is/Are + S + V-ing?",
        "vi": "Đặt câu hỏi đúng theo thời.",
        "style": "Do/Does hỏi thói quen; am/is/are hỏi hành động đang diễn ra.",
        "example": "Do you usually buy clothes online? Are you buying shoes now?",
        "exampleVi": "Bạn thường mua quần áo online không? Bây giờ bạn đang mua giày à?",
        "context": "Hỏi bạn học về thói quen và việc đang làm.",
        "commonMistake": "Sai: Are you usually buy clothes? Đúng: Do you usually buy clothes?"
      },
      {
        "num": 4,
        "pattern": "Signal words decide the tense",
        "vi": "Dấu hiệu thời giúp chọn thì.",
        "style": "usually/every day/often -> Simple; now/right now/Look! -> Continuous.",
        "example": "He usually pays by card, but right now he is paying in cash.",
        "exampleVi": "Anh ấy thường trả bằng thẻ, nhưng ngay bây giờ anh ấy đang trả tiền mặt.",
        "context": "So sánh thói quen và hành động hiện tại trong cùng một câu.",
        "commonMistake": "Sai: He is usually paying by card. Đúng: He usually pays by card."
      },
      {
        "num": 5,
        "pattern": "Stative verbs: like / want / need / know",
        "vi": "Một số động từ trạng thái thường không dùng dạng V-ing ở A1.",
        "style": "Dùng Present Simple cho cảm xúc, nhu cầu, sở hữu hoặc hiểu biết.",
        "example": "I like this dress. She needs a medium size.",
        "exampleVi": "Tôi thích chiếc váy này. Cô ấy cần cỡ vừa.",
        "context": "Nói ý thích và nhu cầu trong cửa hàng.",
        "commonMistake": "Sai: I am liking this dress. Đúng: I like this dress."
      }
    ],
    "commonQA": [
      {
        "q": "Khi thấy usually/every day dùng thì nào?",
        "a": "Dùng Present Simple vì nói thói quen hoặc việc lặp lại."
      },
      {
        "q": "Khi thấy now/right now/Look! dùng thì nào?",
        "a": "Dùng Present Continuous vì nói hành động đang xảy ra."
      },
      {
        "q": "Với he/she/it ở Present Simple cần chú ý gì?",
        "a": "Thêm s/es vào động từ chính: pays, goes, buys, likes."
      },
      {
        "q": "Vì sao không nói I am liking this dress?",
        "a": "like là động từ trạng thái, ở A1 thường dùng Present Simple: I like this dress."
      }
    ]
  },
  "listening": {
    "title": "Nghe trả lời",
    "transcript": "20 câu audio luyện phân biệt Present Simple và Present Continuous.",
    "questions": [
      {
        "q": "I usually ___ jeans.",
        "audio": "I usually blank jeans.",
        "options": [
          "wear",
          "am wearing",
          "wearing",
          "wore"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "I ___ jeans now.",
        "audio": "I blank jeans now.",
        "options": [
          "wear",
          "am wearing",
          "wears",
          "wore"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "She often ___ shopping.",
        "audio": "She often blank shopping.",
        "options": [
          "go",
          "goes",
          "is going",
          "going"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "Look! She ___ on a jacket.",
        "audio": "Look! She blank on a jacket.",
        "options": [
          "tries",
          "is trying",
          "try",
          "tried"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "They ___ the shop every day.",
        "audio": "They blank the shop every day.",
        "options": [
          "open",
          "are opening",
          "opens",
          "opened"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "They ___ the shop now.",
        "audio": "They blank the shop now.",
        "options": [
          "open",
          "are opening",
          "opens",
          "opened"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "He usually ___ by card.",
        "audio": "He usually blank by card.",
        "options": [
          "pay",
          "pays",
          "is paying",
          "paying"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "He ___ by card right now.",
        "audio": "He blank by card right now.",
        "options": [
          "pays",
          "is paying",
          "pay",
          "paid"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "We ___ a new shirt.",
        "audio": "We blank a new shirt.",
        "options": [
          "need",
          "are needing",
          "needs",
          "needed"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "She ___ this dress.",
        "audio": "She blank this dress.",
        "options": [
          "likes",
          "is liking",
          "like",
          "liked"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "I usually ___ jeans.",
        "audio": "I usually blank jeans.",
        "options": [
          "wear",
          "am wearing",
          "wearing",
          "wore"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "I ___ jeans now.",
        "audio": "I blank jeans now.",
        "options": [
          "wear",
          "am wearing",
          "wears",
          "wore"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "She often ___ shopping.",
        "audio": "She often blank shopping.",
        "options": [
          "go",
          "goes",
          "is going",
          "going"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "Look! She ___ on a jacket.",
        "audio": "Look! She blank on a jacket.",
        "options": [
          "tries",
          "is trying",
          "try",
          "tried"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "They ___ the shop every day.",
        "audio": "They blank the shop every day.",
        "options": [
          "open",
          "are opening",
          "opens",
          "opened"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "They ___ the shop now.",
        "audio": "They blank the shop now.",
        "options": [
          "open",
          "are opening",
          "opens",
          "opened"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "He usually ___ by card.",
        "audio": "He usually blank by card.",
        "options": [
          "pay",
          "pays",
          "is paying",
          "paying"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "He ___ by card right now.",
        "audio": "He blank by card right now.",
        "options": [
          "pays",
          "is paying",
          "pay",
          "paid"
        ],
        "answer": 1,
        "explanation": ""
      },
      {
        "q": "We ___ a new shirt.",
        "audio": "We blank a new shirt.",
        "options": [
          "need",
          "are needing",
          "needs",
          "needed"
        ],
        "answer": 0,
        "explanation": ""
      },
      {
        "q": "She ___ this dress.",
        "audio": "She blank this dress.",
        "options": [
          "likes",
          "is liking",
          "like",
          "liked"
        ],
        "answer": 0,
        "explanation": ""
      }
    ]
  },
  "translation": {
    "title": "Luyện dịch Việt ↔ Anh",
    "instruction": "Dịch câu theo hướng được yêu cầu.",
    "sentences": [
      {
        "vi": "Tôi thường mặc quần jeans.",
        "en": "I usually wear jeans.",
        "direction": "vi-en"
      },
      {
        "vi": "Bây giờ tôi đang mặc quần jeans.",
        "en": "I am wearing jeans now.",
        "direction": "vi-en"
      },
      {
        "vi": "Cô ấy thường đi mua sắm vào cuối tuần.",
        "en": "She often goes shopping on weekends.",
        "direction": "vi-en"
      },
      {
        "vi": "Nhìn kìa! Cô ấy đang thử áo khoác.",
        "en": "Look! She is trying on a jacket.",
        "direction": "vi-en"
      },
      {
        "vi": "Anh ấy thường trả bằng thẻ.",
        "en": "He usually pays by card.",
        "direction": "en-vi"
      },
      {
        "vi": "Anh ấy đang trả bằng thẻ ngay bây giờ.",
        "en": "He is paying by card right now.",
        "direction": "vi-en"
      },
      {
        "vi": "Cửa hàng mở mỗi ngày.",
        "en": "The shop opens every day.",
        "direction": "vi-en"
      },
      {
        "vi": "Họ đang mở cửa hàng bây giờ.",
        "en": "They are opening the shop now.",
        "direction": "vi-en"
      },
      {
        "vi": "Tôi thích chiếc váy này.",
        "en": "I like this dress.",
        "direction": "vi-en"
      },
      {
        "vi": "Tôi cần cỡ vừa.",
        "en": "I need a medium.",
        "direction": "en-vi"
      },
      {
        "vi": "Cô ấy đang mua giày hôm nay.",
        "en": "She is buying shoes today.",
        "direction": "vi-en"
      },
      {
        "vi": "Cô ấy mua quần áo mỗi tháng.",
        "en": "She buys clothes every month.",
        "direction": "vi-en"
      },
      {
        "vi": "Chúng tôi đang đứng xếp hàng lúc này.",
        "en": "We are standing in line at the moment.",
        "direction": "vi-en"
      },
      {
        "vi": "Họ xếp hàng mỗi sáng.",
        "en": "They stand in line every morning.",
        "direction": "vi-en"
      },
      {
        "vi": "Anh ấy làm việc ở cửa hàng quần áo.",
        "en": "He works in a clothes shop.",
        "direction": "en-vi"
      },
      {
        "vi": "Nhân viên đang giúp khách.",
        "en": "The shop assistant is helping a customer.",
        "direction": "vi-en"
      },
      {
        "vi": "Tôi không thường mua đồ đắt tiền.",
        "en": "I don't usually buy expensive things.",
        "direction": "vi-en"
      },
      {
        "vi": "Hôm nay tôi không mua áo khoác này.",
        "en": "I am not buying this jacket today.",
        "direction": "vi-en"
      },
      {
        "vi": "Bạn thường mua sắm ở đâu?",
        "en": "Where do you usually go shopping?",
        "direction": "vi-en"
      },
      {
        "vi": "Bây giờ bạn đang mua gì?",
        "en": "What are you buying now?",
        "direction": "en-vi"
      }
    ]
  },
  "dialogueVideo": {
    "title": "Video hội thoại: Shopping Today vs Usually",
    "description": "Hội thoại song ngữ về thói quen mua sắm và việc đang làm.",
    "label": "Shopping Today vs Usually",
    "embedUrl": "https://www.youtube.com/embed?listType=search&list=shopping%20dialogue%20present%20simple%20present%20continuous%20english",
    "watchUrl": "https://www.youtube.com/results?search_query=shopping+dialogue+present+simple+present+continuous+english",
    "fallbackSearchUrl": "https://www.youtube.com/results?search_query=shopping+dialogue+present+simple+present+continuous+english",
    "transcript": [
      {
        "speaker": "Emma",
        "en": "Do you usually buy clothes online?",
        "vi": "Bạn thường mua quần áo online không?",
        "audioText": "Do you usually buy clothes online?",
        "keyword": ""
      },
      {
        "speaker": "Nick",
        "en": "Yes, I usually buy T-shirts online.",
        "vi": "Có, tôi thường mua áo thun online.",
        "audioText": "Yes, I usually buy T-shirts online.",
        "keyword": ""
      },
      {
        "speaker": "Emma",
        "en": "But what are you doing today?",
        "vi": "Nhưng hôm nay bạn đang làm gì?",
        "audioText": "But what are you doing today?",
        "keyword": ""
      },
      {
        "speaker": "Nick",
        "en": "Today I am shopping at the mall.",
        "vi": "Hôm nay tôi đang mua sắm ở trung tâm.",
        "audioText": "Today I am shopping at the mall.",
        "keyword": ""
      },
      {
        "speaker": "Emma",
        "en": "What are you buying?",
        "vi": "Bạn đang mua gì?",
        "audioText": "What are you buying?",
        "keyword": ""
      },
      {
        "speaker": "Nick",
        "en": "I am buying a jacket.",
        "vi": "Tôi đang mua áo khoác.",
        "audioText": "I am buying a jacket.",
        "keyword": ""
      },
      {
        "speaker": "Emma",
        "en": "Do you like that black jacket?",
        "vi": "Bạn thích áo đen kia không?",
        "audioText": "Do you like that black jacket?",
        "keyword": ""
      },
      {
        "speaker": "Nick",
        "en": "Yes, but the blue jacket is on sale. I am trying it on now.",
        "vi": "Có, nhưng áo xanh đang giảm giá. Tôi đang thử nó.",
        "audioText": "Yes, but the blue jacket is on sale. I am trying it on now.",
        "keyword": ""
      }
    ],
    "keywords": [
      {
        "en": "usually",
        "vi": "thường thường",
        "example": "I usually wear jeans.",
        "img": "💬"
      },
      {
        "en": "often",
        "vi": "thường xuyên",
        "example": "She often goes shopping.",
        "img": "💬"
      },
      {
        "en": "sometimes",
        "vi": "đôi khi",
        "example": "We sometimes buy clothes online.",
        "img": "💬"
      },
      {
        "en": "always",
        "vi": "luôn luôn",
        "example": "He always pays by card.",
        "img": "💬"
      },
      {
        "en": "never",
        "vi": "không bao giờ",
        "example": "I never buy expensive shoes.",
        "img": "💬"
      },
      {
        "en": "every day",
        "vi": "mỗi ngày",
        "example": "They open the shop every day.",
        "img": "💬"
      },
      {
        "en": "on weekends",
        "vi": "vào cuối tuần",
        "example": "We go shopping on weekends.",
        "img": "💬"
      },
      {
        "en": "normally",
        "vi": "thông thường",
        "example": "I normally wear a uniform.",
        "img": "💬"
      }
    ],
    "comprehension": [
      {
        "q": "Where is Nick shopping today?",
        "options": [
          "Online",
          "At the mall",
          "At school",
          "At home"
        ],
        "answer": 1,
        "explanation": "Nick says he is shopping at the mall."
      },
      {
        "q": "What is Nick buying?",
        "options": [
          "A T-shirt",
          "Shoes",
          "A jacket",
          "A scarf"
        ],
        "answer": 2,
        "explanation": "He says he is buying a jacket."
      },
      {
        "q": "Which jacket is on sale?",
        "options": [
          "The black jacket",
          "The blue jacket",
          "The red jacket",
          "The white jacket"
        ],
        "answer": 1,
        "explanation": "The blue jacket is on sale."
      },
      {
        "q": "What tense is used in “I usually buy T-shirts online”?",
        "options": [
          "Present Simple",
          "Present Continuous",
          "Past Simple",
          "Future Simple"
        ],
        "answer": 0,
        "explanation": "usually signals Present Simple."
      },
      {
        "q": "What tense is used in “I am trying it on now”?",
        "options": [
          "Present Simple",
          "Present Continuous",
          "Past Simple",
          "Future Simple"
        ],
        "answer": 1,
        "explanation": "now signals Present Continuous."
      }
    ],
    "listenPickLine": [
      {
        "prompt": "Nghe câu: \"Do you usually buy clothes online?\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"Do you usually buy clothes online?\" — nghĩa đúng là?",
        "options": [
          "Bạn thường mua quần áo online không?",
          "Bạn đang mua áo khoác à?",
          "Bạn thích màu xanh không?",
          "Bạn cần cỡ nào?"
        ],
        "answer": 0
      },
      {
        "prompt": "Nghe câu: \"Yes, I usually buy T-shirts online.\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"Yes, I usually buy T-shirts online.\" — nghĩa đúng là?",
        "options": [
          "Có, tôi thường mua áo thun online.",
          "Tôi đang mua áo thun hôm nay.",
          "Tôi không bao giờ mua áo thun.",
          "Tôi cần áo thun cỡ vừa."
        ],
        "answer": 0
      },
      {
        "prompt": "Nghe câu: \"But what are you doing today?\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"But what are you doing today?\" — nghĩa đúng là?",
        "options": [
          "Nhưng hôm nay bạn đang làm gì?",
          "Bạn thường làm gì mỗi ngày?",
          "Bạn có thích hôm nay không?",
          "Bạn đã làm gì hôm qua?"
        ],
        "answer": 0
      },
      {
        "prompt": "Nghe câu: \"Today I am shopping at the mall.\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"Today I am shopping at the mall.\" — nghĩa đúng là?",
        "options": [
          "Hôm nay tôi đang mua sắm ở trung tâm.",
          "Tôi thường mua sắm ở trung tâm.",
          "Tôi không mua sắm hôm nay.",
          "Tôi mua sắm ở nhà mỗi ngày."
        ],
        "answer": 0
      },
      {
        "prompt": "Nghe câu: \"What are you buying?\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"What are you buying?\" — nghĩa đúng là?",
        "options": [
          "Bạn đang mua gì?",
          "Bạn thường mua gì?",
          "Bạn mua ở đâu?",
          "Bạn thích mua gì?"
        ],
        "answer": 0
      },
      {
        "prompt": "Nghe câu: \"I am buying a jacket.\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"I am buying a jacket.\" — nghĩa đúng là?",
        "options": [
          "Tôi đang mua áo khoác.",
          "Tôi thường mua áo khoác.",
          "Tôi thích áo khoác.",
          "Tôi cần cỡ vừa."
        ],
        "answer": 0
      },
      {
        "prompt": "Nghe câu: \"Do you like that black jacket?\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"Do you like that black jacket?\" — nghĩa đúng là?",
        "options": [
          "Bạn thích áo khoác đen kia không?",
          "Bạn đang mua áo đen không?",
          "Bạn thường mặc áo đen không?",
          "Bạn cần áo đen không?"
        ],
        "answer": 0
      },
      {
        "prompt": "Nghe câu: \"The blue jacket is on sale.\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"The blue jacket is on sale.\" — nghĩa đúng là?",
        "options": [
          "Áo xanh đang giảm giá.",
          "Áo xanh quá nhỏ.",
          "Áo xanh ở nhà.",
          "Áo xanh rất đắt."
        ],
        "answer": 0
      },
      {
        "prompt": "Nghe câu: \"I am trying it on now.\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"I am trying it on now.\" — nghĩa đúng là?",
        "options": [
          "Tôi đang thử nó bây giờ.",
          "Tôi thường thử nó.",
          "Tôi cần nó hôm nay.",
          "Tôi mua nó mỗi tuần."
        ],
        "answer": 0
      },
      {
        "prompt": "Nghe câu: \"I need a medium size.\" — nghĩa đúng là?",
        "audioText": "Nghe câu: \"I need a medium size.\" — nghĩa đúng là?",
        "options": [
          "Tôi cần cỡ vừa.",
          "Tôi đang mặc cỡ vừa.",
          "Tôi thường mua cỡ vừa.",
          "Tôi thích màu vừa."
        ],
        "answer": 0
      }
    ],
    "fillConversation": [
      {
        "title": "Shopping dialogue cloze",
        "wordBank": [
          "usually",
          "am",
          "buying",
          "wears",
          "is wearing"
        ],
        "lines": [
          {
            "speaker": "A",
            "text": "What do you [[usually]] wear to school?"
          },
          {
            "speaker": "B",
            "text": "I usually wear a uniform."
          },
          {
            "speaker": "A",
            "text": "What are you wearing now?"
          },
          {
            "speaker": "B",
            "text": "I [[am]] wearing a T-shirt now."
          },
          {
            "speaker": "A",
            "text": "What does your sister usually wear?"
          },
          {
            "speaker": "B",
            "text": "She usually [[wears]] jeans, but today she [[is wearing]] a dress."
          },
          {
            "speaker": "A",
            "text": "Are you [[buying]] shoes today?"
          }
        ],
        "explanations": [
          "usually: dấu hiệu thói quen, dùng Present Simple.",
          "am: I đi với am trong Present Continuous.",
          "wears: she ở Present Simple thêm -s.",
          "is wearing: today trong tình huống hiện tại/tạm thời, dùng is + V-ing.",
          "buying: sau Are you dùng V-ing."
        ]
      }
    ]
  },
  "speaking": {
    "title": "Luyện nói AI - Present Simple vs Present Continuous",
    "formula": "Habit: S + usually/often + V(s/es). Now: S + am/is/are + V-ing.",
    "turns": [
      {
        "id": 1,
        "ai": {
          "textEn": "Tell me one habit and one action happening now.",
          "audioUrl": "Tell me one habit and one action happening now."
        },
        "user": {
          "formula": "Habit: I usually + V. Now: I am + V-ing + now.",
          "sampleEn": "I usually wear jeans. I am wearing a T-shirt now.",
          "sampleAudioUrl": "I usually wear jeans. I am wearing a T-shirt now.",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 2,
        "ai": {
          "textEn": "Ask me about my shopping habit.",
          "audioUrl": "Ask me about my shopping habit."
        },
        "user": {
          "formula": "Do you usually + V + object/place?",
          "sampleEn": "Do you usually buy clothes online?",
          "sampleAudioUrl": "Do you usually buy clothes online?",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 3,
        "ai": {
          "textEn": "Ask me what I am doing right now.",
          "audioUrl": "Ask me what I am doing right now."
        },
        "user": {
          "formula": "What are you + V-ing + now/right now?",
          "sampleEn": "What are you buying now?",
          "sampleAudioUrl": "What are you buying now?",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 4,
        "ai": {
          "textEn": "Compare usually and today in three sentences.",
          "audioUrl": "Compare usually and today in three sentences."
        },
        "user": {
          "formula": "I usually + V. Today I am + V-ing. But I like/need/want + noun.",
          "sampleEn": "I usually wear black. Today I am choosing a blue jacket. I want a new color this week.",
          "sampleAudioUrl": "I usually wear black. Today I am choosing a blue jacket. I want a new color this week.",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      },
      {
        "id": 5,
        "ai": {
          "textEn": "Speak for 30 seconds about your shopping style.",
          "audioUrl": "Speak for 30 seconds about your shopping style."
        },
        "user": {
          "formula": "4-5 câu: habit + current action + likes/needs + question.",
          "sampleEn": "I usually buy clothes online. Today I am shopping at the mall. I am looking for shoes. I like simple colors. What do you usually buy?",
          "sampleAudioUrl": "I usually buy clothes online. Today I am shopping at the mall. I am looking for shoes. I like simple colors. What do you usually buy?",
          "criteria": [
            "grammar",
            "vocabulary",
            "pronunciation/speaking"
          ]
        }
      }
    ]
  },
  "minitest": [
    {
      "q": "I usually ___ jeans.",
      "audio": "I usually blank jeans.",
      "options": [
        "wear",
        "am wearing",
        "wearing",
        "wore"
      ],
      "answer": 0,
      "explanation": ""
    },
    {
      "q": "I ___ jeans now.",
      "audio": "I blank jeans now.",
      "options": [
        "wear",
        "am wearing",
        "wears",
        "wore"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "She often ___ shopping.",
      "audio": "She often blank shopping.",
      "options": [
        "go",
        "goes",
        "is going",
        "going"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "Look! She ___ on a jacket.",
      "audio": "Look! She blank on a jacket.",
      "options": [
        "tries",
        "is trying",
        "try",
        "tried"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "They ___ the shop every day.",
      "audio": "They blank the shop every day.",
      "options": [
        "open",
        "are opening",
        "opens",
        "opened"
      ],
      "answer": 0,
      "explanation": ""
    },
    {
      "q": "They ___ the shop now.",
      "audio": "They blank the shop now.",
      "options": [
        "open",
        "are opening",
        "opens",
        "opened"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "He usually ___ by card.",
      "audio": "He usually blank by card.",
      "options": [
        "pay",
        "pays",
        "is paying",
        "paying"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "He ___ by card right now.",
      "audio": "He blank by card right now.",
      "options": [
        "pays",
        "is paying",
        "pay",
        "paid"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "We ___ a new shirt.",
      "audio": "We blank a new shirt.",
      "options": [
        "need",
        "are needing",
        "needs",
        "needed"
      ],
      "answer": 0,
      "explanation": ""
    },
    {
      "q": "She ___ this dress.",
      "audio": "She blank this dress.",
      "options": [
        "likes",
        "is liking",
        "like",
        "liked"
      ],
      "answer": 0,
      "explanation": ""
    },
    {
      "q": "I usually ___ jeans.",
      "audio": "I usually blank jeans.",
      "options": [
        "wear",
        "am wearing",
        "wearing",
        "wore"
      ],
      "answer": 0,
      "explanation": ""
    },
    {
      "q": "I ___ jeans now.",
      "audio": "I blank jeans now.",
      "options": [
        "wear",
        "am wearing",
        "wears",
        "wore"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "She often ___ shopping.",
      "audio": "She often blank shopping.",
      "options": [
        "go",
        "goes",
        "is going",
        "going"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "Look! She ___ on a jacket.",
      "audio": "Look! She blank on a jacket.",
      "options": [
        "tries",
        "is trying",
        "try",
        "tried"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "They ___ the shop every day.",
      "audio": "They blank the shop every day.",
      "options": [
        "open",
        "are opening",
        "opens",
        "opened"
      ],
      "answer": 0,
      "explanation": ""
    },
    {
      "q": "They ___ the shop now.",
      "audio": "They blank the shop now.",
      "options": [
        "open",
        "are opening",
        "opens",
        "opened"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "He usually ___ by card.",
      "audio": "He usually blank by card.",
      "options": [
        "pay",
        "pays",
        "is paying",
        "paying"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "He ___ by card right now.",
      "audio": "He blank by card right now.",
      "options": [
        "pays",
        "is paying",
        "pay",
        "paid"
      ],
      "answer": 1,
      "explanation": ""
    },
    {
      "q": "We ___ a new shirt.",
      "audio": "We blank a new shirt.",
      "options": [
        "need",
        "are needing",
        "needs",
        "needed"
      ],
      "answer": 0,
      "explanation": ""
    },
    {
      "q": "She ___ this dress.",
      "audio": "She blank this dress.",
      "options": [
        "likes",
        "is liking",
        "like",
        "liked"
      ],
      "answer": 0,
      "explanation": ""
    }
  ],
  "mindmap": {
    "type": "structured",
    "center": "BUỔI 19: PRESENT SIMPLE VS PRESENT CONTINUOUS",
    "branches": [
      {
        "label": "Present Simple",
        "items": [
          "usually, often, every day",
          "I usually wear jeans."
        ]
      },
      {
        "label": "Present Continuous",
        "items": [
          "now, right now, Look!",
          "I am shopping now."
        ]
      },
      {
        "label": "Questions",
        "items": [
          "Do you usually buy clothes?",
          "Are you buying shoes now?"
        ]
      },
      {
        "label": "Stative verbs",
        "items": [
          "I like this dress.",
          "She needs a medium size."
        ]
      }
    ]
  },
  "homework": [
    "Viết 8-10 câu so sánh thói quen và hôm nay.",
    "Ghi âm/quay video 45-60 giây shopping role-play."
  ],
  "homeworkRich": {
    "title": "Homework - Buổi 19",
    "submit": "Nộp bài viết và file ghi âm/video qua nhóm lớp.",
    "deadline": "Trước buổi học tiếp theo",
    "tasks": [
      {
        "icon": "✍️",
        "title": "BÀI TẬP 1: VIẾT - Usually vs Today",
        "badge": "Bắt buộc",
        "desc": "Viết 8-10 câu so sánh thói quen mua sắm/trang phục với việc em đang làm hôm nay.",
        "items": [
          "Dùng ít nhất 8 từ/cụm từ mới.",
          "Có ít nhất 3 câu Present Simple.",
          "Có ít nhất 3 câu Present Continuous.",
          "Có ít nhất 2 câu dùng like/want/need đúng dạng Simple."
        ],
        "sample": "I usually buy clothes online. Today I am shopping at the mall. I am looking for shoes.",
        "rubric": "10 điểm: 3đ grammar, 2đ từ vựng, 2đ đủ số câu, 2đ rõ ý, 1đ trình bày."
      },
      {
        "icon": "🎙️",
        "title": "BÀI TẬP 2: NÓI / GHI ÂM / VIDEO - Shopping Role-play",
        "badge": "Bắt buộc",
        "desc": "Ghi âm hoặc quay video 45-60 giây về shopping habits vs today.",
        "items": [
          "Mở đầu bằng I usually...",
          "Nói việc đang làm hôm nay: Today I am...",
          "Hỏi ít nhất 2 câu Do you usually...? / What are you ... now?",
          "Dùng ít nhất 5 từ mới."
        ],
        "sample": "A: Do you usually buy clothes online? B: Yes, but today I am shopping at the mall.",
        "rubric": "10 điểm: 3đ phát âm, 3đ đúng thì, 2đ từ vựng, 1đ thời lượng, 1đ tự nhiên."
      }
    ]
  }
};
applyExpandedLessonTemplate(19, LESSON_19_IMPORTED_TEMPLATE);
// </imported-lesson-19>
// <imported-lesson-17>
const LESSON_17_IMPORTED_TEMPLATE = {
  "title": "Mua sắm & Hiện tại tiếp diễn",
  "titleVi": "Mua sắm & Hiện tại tiếp diễn",
  "titleEn": "Shopping & Present Continuous",
  "subtitle": "Shop around - Part 1",
  "unit": "Unit 6",
  "cefrLevel": "A1",
  "mainTopic": "Mua sắm và mô tả hành động đang xảy ra",
  "grammarFocus": "Present Continuous: am/is/are + V-ing",
  "objectives": [
    "Nói được người mua/người bán đang làm gì trong cửa hàng bằng Present Continuous.",
    "Dùng đúng am/is/are + V-ing ở câu khẳng định, phủ định và câu hỏi.",
    "Học từ vựng về cửa hàng, khách hàng, thu ngân, giá tiền, thanh toán và hành động mua sắm.",
    "Nghe, đọc, dịch và nói được hội thoại mua sắm A1 kể cả khi video không phát."
  ],
  "review": {
    "title": "Ôn bài cũ - Buổi 16: Adverbs of manner & Log on",
    "intro": "Làm 2 game để ôn trạng từ chỉ cách thức và từ vựng thao tác trên mạng trước khi chuyển sang mô tả hành động đang diễn ra khi mua sắm.",
    "structures": [
      "She speaks English well.",
      "Type your password carefully.",
      "Do not answer too quickly.",
      "Use the internet safely."
    ],
    "reviewGames": {
      "title": "Ôn bài cũ - Buổi 16",
      "intro": "Game 1 luyện nghe từ/cụm từ; Game 2 Quiz Bomb kiểm tra nhanh từ vựng và cấu trúc.",
      "vocabulary": [
        {
          "en": "carefully",
          "vi": "một cách cẩn thận",
          "img": "🎯",
          "ipa": "/ˈkerfəli/",
          "options": [
            "một cách cẩn thận",
            "một cách nhanh chóng",
            "một cách yên lặng",
            "một cách an toàn"
          ],
          "answer": 0
        },
        {
          "en": "quickly",
          "vi": "một cách nhanh chóng",
          "img": "⚡",
          "ipa": "/ˈkwɪkli/",
          "options": [
            "một cách chậm rãi",
            "một cách nhanh chóng",
            "một cách rõ ràng",
            "một cách lịch sự"
          ],
          "answer": 1
        },
        {
          "en": "slowly",
          "vi": "một cách chậm rãi",
          "img": "🐢",
          "ipa": "/ˈsloʊli/",
          "options": [
            "một cách to tiếng",
            "một cách chính xác",
            "một cách chậm rãi",
            "tốt/giỏi"
          ],
          "answer": 2
        },
        {
          "en": "clearly",
          "vi": "một cách rõ ràng",
          "img": "🔎",
          "ipa": "/ˈklɪrli/",
          "options": [
            "một cách tệ",
            "chăm chỉ/mạnh",
            "một cách kiên nhẫn",
            "một cách rõ ràng"
          ],
          "answer": 3
        },
        {
          "en": "quietly",
          "vi": "một cách yên lặng",
          "img": "🤫",
          "ipa": "/ˈkwaɪətli/",
          "options": [
            "một cách yên lặng",
            "một cách dễ dàng",
            "một cách to tiếng",
            "một cách cẩn thận"
          ],
          "answer": 0
        },
        {
          "en": "loudly",
          "vi": "một cách to tiếng",
          "img": "📢",
          "ipa": "/ˈlaʊdli/",
          "options": [
            "một cách an toàn",
            "một cách to tiếng",
            "một cách chậm rãi",
            "một cách lịch sự"
          ],
          "answer": 1
        },
        {
          "en": "safely",
          "vi": "một cách an toàn",
          "img": "🛡️",
          "ipa": "/ˈseɪfli/",
          "options": [
            "một cách chính xác",
            "một cách dễ dàng",
            "một cách an toàn",
            "nhanh"
          ],
          "answer": 2
        },
        {
          "en": "politely",
          "vi": "một cách lịch sự",
          "img": "🙏",
          "ipa": "/pəˈlaɪtli/",
          "options": [
            "một cách rõ ràng",
            "một cách tệ",
            "nghe cẩn thận",
            "một cách lịch sự"
          ],
          "answer": 3
        },
        {
          "en": "patiently",
          "vi": "một cách kiên nhẫn",
          "img": "⏳",
          "ipa": "/ˈpeɪʃntli/",
          "options": [
            "một cách kiên nhẫn",
            "một cách cẩn thận",
            "một cách nhanh chóng",
            "một cách yên lặng"
          ],
          "answer": 0
        },
        {
          "en": "easily",
          "vi": "một cách dễ dàng",
          "img": "✅",
          "ipa": "/ˈiːzəli/",
          "options": [
            "chăm chỉ/mạnh",
            "một cách dễ dàng",
            "một cách an toàn",
            "một cách to tiếng"
          ],
          "answer": 1
        },
        {
          "en": "correctly",
          "vi": "một cách chính xác",
          "img": "✔️",
          "ipa": "/kəˈrektli/",
          "options": [
            "một cách tệ",
            "một cách chậm rãi",
            "một cách chính xác",
            "một cách lịch sự"
          ],
          "answer": 2
        },
        {
          "en": "badly",
          "vi": "một cách tệ",
          "img": "⚠️",
          "ipa": "/ˈbædli/",
          "options": [
            "một cách rõ ràng",
            "tốt/giỏi",
            "một cách yên lặng",
            "một cách tệ"
          ],
          "answer": 3
        },
        {
          "en": "well",
          "vi": "tốt/giỏi",
          "img": "🌟",
          "ipa": "/wel/",
          "options": [
            "tốt/giỏi",
            "một cách to tiếng",
            "một cách an toàn",
            "một cách nhanh chóng"
          ],
          "answer": 0
        },
        {
          "en": "fast",
          "vi": "nhanh",
          "img": "🏃",
          "ipa": "/fæst/",
          "options": [
            "một cách kiên nhẫn",
            "nhanh",
            "một cách chậm rãi",
            "một cách dễ dàng"
          ],
          "answer": 1
        },
        {
          "en": "hard",
          "vi": "chăm chỉ/mạnh",
          "img": "💪",
          "ipa": "/hɑːrd/",
          "options": [
            "một cách lịch sự",
            "một cách chính xác",
            "chăm chỉ/mạnh",
            "một cách tệ"
          ],
          "answer": 2
        },
        {
          "en": "type carefully",
          "vi": "gõ cẩn thận",
          "img": "⌨️",
          "ipa": "",
          "options": [
            "nói rõ ràng",
            "đọc yên lặng",
            "nhấn an toàn",
            "gõ cẩn thận"
          ],
          "answer": 3
        },
        {
          "en": "click safely",
          "vi": "nhấn an toàn",
          "img": "🖱️",
          "ipa": "",
          "options": [
            "nhấn an toàn",
            "gõ cẩn thận",
            "nghe cẩn thận",
            "đăng nhập"
          ],
          "answer": 0
        },
        {
          "en": "speak clearly",
          "vi": "nói rõ ràng",
          "img": "🗣️",
          "ipa": "",
          "options": [
            "đọc yên lặng",
            "nói rõ ràng",
            "nhấn an toàn",
            "gõ nhanh"
          ],
          "answer": 1
        },
        {
          "en": "listen carefully",
          "vi": "nghe cẩn thận",
          "img": "🎧",
          "ipa": "",
          "options": [
            "gõ cẩn thận",
            "nói rõ ràng",
            "nghe cẩn thận",
            "đọc nhanh"
          ],
          "answer": 2
        },
        {
          "en": "use the internet safely",
          "vi": "dùng internet an toàn",
          "img": "🌐",
          "ipa": "",
          "options": [
            "đọc yên lặng",
            "đăng nhập nhanh",
            "nói rõ ràng",
            "dùng internet an toàn"
          ],
          "answer": 3
        }
      ],
      "quizBomb": {
        "title": "Quiz Bomb - Adverbs & Log on",
        "instruction": "Trả lời nhanh 20 câu. Đáp án chỉ hiện sau khi chọn.",
        "questions": [
          {
            "q": "She speaks English ___.",
            "options": [
              "well",
              "good",
              "careful",
              "bad"
            ],
            "answer": 0,
            "explanation": "well là trạng từ của good."
          },
          {
            "q": "Type your password ___.",
            "options": [
              "careful",
              "carefully",
              "safe",
              "quick"
            ],
            "answer": 1,
            "explanation": "Sau động từ type dùng trạng từ carefully."
          },
          {
            "q": "Do not click strange links ___.",
            "options": [
              "badly",
              "loudly",
              "quickly",
              "slow"
            ],
            "answer": 2,
            "explanation": "quickly diễn tả làm quá nhanh."
          },
          {
            "q": "Use the internet ___.",
            "options": [
              "safe",
              "safely",
              "safety",
              "safes"
            ],
            "answer": 1,
            "explanation": "safely là trạng từ."
          },
          {
            "q": "He reads the message ___. Nobody hears him.",
            "options": [
              "quietly",
              "loudly",
              "fast",
              "hard"
            ],
            "answer": 0,
            "explanation": "quietly = một cách yên lặng."
          },
          {
            "q": "The teacher says, \"Please speak ___.\"",
            "options": [
              "clear",
              "clearly",
              "clearer",
              "clears"
            ],
            "answer": 1,
            "explanation": "clearly bổ nghĩa cho speak."
          },
          {
            "q": "\"Log in\" nghĩa là gì?",
            "options": [
              "đăng xuất",
              "đăng nhập",
              "tải xuống",
              "nhấn vào"
            ],
            "answer": 1,
            "explanation": "log in = đăng nhập."
          },
          {
            "q": "\"Password\" nghĩa là gì?",
            "options": [
              "mật khẩu",
              "trang web",
              "bàn phím",
              "tệp tin"
            ],
            "answer": 0,
            "explanation": "password = mật khẩu."
          },
          {
            "q": "\"Download\" nghĩa là gì?",
            "options": [
              "gửi đi",
              "tải xuống",
              "xóa đi",
              "đăng nhập"
            ],
            "answer": 1,
            "explanation": "download = tải xuống."
          },
          {
            "q": "\"Upload\" nghĩa là gì?",
            "options": [
              "tìm kiếm",
              "gõ vào",
              "tải lên",
              "nhấn vào"
            ],
            "answer": 2,
            "explanation": "upload = tải lên."
          },
          {
            "q": "Câu nào đúng?",
            "options": [
              "She sings beautiful.",
              "She sings beautifully.",
              "She beautiful sings.",
              "She sings beauty."
            ],
            "answer": 1,
            "explanation": "Sau sings dùng trạng từ beautifully."
          },
          {
            "q": "good chuyển sang trạng từ là:",
            "options": [
              "goodly",
              "well",
              "gooding",
              "gooder"
            ],
            "answer": 1,
            "explanation": "good là tính từ, well là trạng từ bất quy tắc."
          },
          {
            "q": "fast khi làm trạng từ là:",
            "options": [
              "fastly",
              "fast",
              "fasterly",
              "fasting"
            ],
            "answer": 1,
            "explanation": "fast không đổi dạng."
          },
          {
            "q": "hard khi làm trạng từ là:",
            "options": [
              "hard",
              "hardly luôn cùng nghĩa",
              "hardly hard",
              "hardful"
            ],
            "answer": 0,
            "explanation": "hard = chăm chỉ/mạnh; hardly có nghĩa khác."
          },
          {
            "q": "Cấu trúc đúng với trạng từ chỉ cách thức là:",
            "options": [
              "S + V + adverb",
              "S + adverb + to be",
              "Adverb + S only",
              "S + noun + adverb only"
            ],
            "answer": 0,
            "explanation": "Trạng từ thường đứng sau động từ hoặc tân ngữ."
          },
          {
            "q": "Click the button ___.",
            "options": [
              "safely",
              "safe",
              "safety",
              "safes"
            ],
            "answer": 0,
            "explanation": "safely bổ nghĩa cho click."
          },
          {
            "q": "Listen ___ before you answer.",
            "options": [
              "careful",
              "carefully",
              "care",
              "carefulness"
            ],
            "answer": 1,
            "explanation": "carefully bổ nghĩa cho listen."
          },
          {
            "q": "Read the instructions ___.",
            "options": [
              "slow",
              "slowly",
              "slowness",
              "slower"
            ],
            "answer": 1,
            "explanation": "slowly là trạng từ."
          },
          {
            "q": "\"Search online\" nghĩa là gì?",
            "options": [
              "tìm kiếm trên mạng",
              "mở túi hàng",
              "trả tiền mặt",
              "xếp hàng"
            ],
            "answer": 0,
            "explanation": "search online = tìm kiếm trên mạng."
          },
          {
            "q": "Câu nào SAI?",
            "options": [
              "He works hard.",
              "She types carefully.",
              "They speak loudly.",
              "I run quick."
            ],
            "answer": 3,
            "explanation": "Đúng là I run quickly hoặc I run fast."
          }
        ]
      }
    },
    "summary": "Buổi 16 tập trung vào cách làm hành động: carefully, quickly, safely. Buổi 17 chuyển sang mô tả hành động đang xảy ra: I am shopping now."
  },
  "video": {
    "title": "What are they doing? Present Continuous Tense",
    "channel": "Easy English",
    "duration": "3-5 phút",
    "embedUrl": "https://www.youtube.com/embed/UdEasleUc54",
    "watchUrl": "https://www.youtube.com/watch?v=UdEasleUc54",
    "fallbackSearchUrl": "https://www.youtube.com/results?search_query=What+are+they+doing+Present+Continuous+Tense+Easy+English",
    "description": "Video giới thiệu cách dùng Present Continuous để trả lời câu hỏi What are they doing? Học viên tập nhận diện am/is/are + V-ing trước khi áp dụng vào bối cảnh mua sắm.",
    "sceneSummary": "Cảnh chính: nhìn hành động đang diễn ra, nghe câu mẫu Present Continuous, chọn đúng am/is/are và V-ing.",
    "scenes": [
      {
        "time": "0:00",
        "label": "Giới thiệu câu hỏi What are they doing? và các hành động đang xảy ra."
      },
      {
        "time": "1:00",
        "label": "Nhiều nhân vật làm các hoạt động khác nhau; học viên nghe am/is/are + V-ing."
      },
      {
        "time": "2:30",
        "label": "Luyện phân biệt câu khẳng định và phủ định trong Present Continuous."
      }
    ],
    "questions": [
      {
        "q": "Cấu trúc chính trong video là gì?",
        "options": [
          "S + am/is/are + V-ing",
          "S + V-s/es",
          "There is/There are",
          "can + V"
        ],
        "answer": 0
      },
      {
        "q": "\"What are they doing?\" dùng để hỏi gì?",
        "options": [
          "Họ thích gì?",
          "Họ đang làm gì?",
          "Họ ở đâu hôm qua?",
          "Họ có bao nhiêu tiền?"
        ],
        "answer": 1
      },
      {
        "q": "I ___ shopping now.",
        "options": [
          "am",
          "is",
          "are",
          "do"
        ],
        "answer": 0
      },
      {
        "q": "She is ___ a bag.",
        "options": [
          "choose",
          "chooses",
          "choosing",
          "chose"
        ],
        "answer": 2
      },
      {
        "q": "They ___ standing in line.",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "answer": 2
      }
    ]
  },
  "vocabGroups": {
    "shoppingPlaces": "TAB 1: Từ vựng chính về cửa hàng",
    "actionsAndPhrases": "TAB 2: Cụm từ và hành động ứng dụng"
  },
  "matchAll": true,
  "listenPickAll": true,
  "vocabulary": [
    {
      "en": "shop / store",
      "vi": "cửa hàng",
      "ipa": "/ʃɑːp/ /stɔːr/",
      "img": "🏬",
      "group": "shoppingPlaces",
      "example": "This shop is busy today."
    },
    {
      "en": "supermarket",
      "vi": "siêu thị",
      "ipa": "/ˈsuːpərmɑːrkɪt/",
      "img": "🛒",
      "group": "shoppingPlaces",
      "example": "My mother is shopping at the supermarket."
    },
    {
      "en": "shopping mall",
      "vi": "trung tâm mua sắm",
      "ipa": "/ˈʃɑːpɪŋ mɔːl/",
      "img": "🏢",
      "group": "shoppingPlaces",
      "example": "They are walking in the shopping mall."
    },
    {
      "en": "market",
      "vi": "chợ",
      "ipa": "/ˈmɑːrkɪt/",
      "img": "🧺",
      "group": "shoppingPlaces",
      "example": "We are buying fruit at the market."
    },
    {
      "en": "clothes shop",
      "vi": "cửa hàng quần áo",
      "ipa": "/kloʊðz ʃɑːp/",
      "img": "👕",
      "group": "shoppingPlaces",
      "example": "She is in a clothes shop."
    },
    {
      "en": "bookshop",
      "vi": "nhà sách",
      "ipa": "/ˈbʊkʃɑːp/",
      "img": "📚",
      "group": "shoppingPlaces",
      "example": "He is buying a comic book at the bookshop."
    },
    {
      "en": "toy shop",
      "vi": "cửa hàng đồ chơi",
      "ipa": "/tɔɪ ʃɑːp/",
      "img": "🧸",
      "group": "shoppingPlaces",
      "example": "The children are looking at toys."
    },
    {
      "en": "cashier",
      "vi": "thu ngân",
      "ipa": "/kæˈʃɪr/",
      "img": "💵",
      "group": "shoppingPlaces",
      "example": "The cashier is smiling."
    },
    {
      "en": "shop assistant",
      "vi": "nhân viên bán hàng",
      "ipa": "/ʃɑːp əˈsɪstənt/",
      "img": "🤝",
      "group": "shoppingPlaces",
      "example": "The shop assistant is helping a customer."
    },
    {
      "en": "customer",
      "vi": "khách hàng",
      "ipa": "/ˈkʌstəmər/",
      "img": "🙋",
      "group": "shoppingPlaces",
      "example": "The customer is asking about the price."
    },
    {
      "en": "price tag",
      "vi": "nhãn giá",
      "ipa": "/praɪs tæɡ/",
      "img": "🏷️",
      "group": "shoppingPlaces",
      "example": "I am checking the price tag."
    },
    {
      "en": "sale",
      "vi": "giảm giá",
      "ipa": "/seɪl/",
      "img": "🔖",
      "group": "shoppingPlaces",
      "example": "These shoes are on sale."
    },
    {
      "en": "receipt",
      "vi": "hóa đơn",
      "ipa": "/rɪˈsiːt/",
      "img": "🧾",
      "group": "shoppingPlaces",
      "example": "Please keep the receipt."
    },
    {
      "en": "basket",
      "vi": "giỏ hàng",
      "ipa": "/ˈbæskɪt/",
      "img": "🧺",
      "group": "shoppingPlaces",
      "example": "She is carrying a basket."
    },
    {
      "en": "credit card",
      "vi": "thẻ tín dụng",
      "ipa": "/ˈkredɪt kɑːrd/",
      "img": "💳",
      "group": "shoppingPlaces",
      "example": "He is paying by credit card."
    },
    {
      "en": "buying",
      "vi": "đang mua",
      "ipa": "/ˈbaɪɪŋ/",
      "img": "🛍️",
      "group": "actionsAndPhrases",
      "example": "I am buying a notebook."
    },
    {
      "en": "paying",
      "vi": "đang trả tiền",
      "ipa": "/ˈpeɪɪŋ/",
      "img": "💳",
      "group": "actionsAndPhrases",
      "example": "She is paying at the cashier."
    },
    {
      "en": "looking for",
      "vi": "đang tìm",
      "ipa": "/ˈlʊkɪŋ fɔːr/",
      "img": "🔎",
      "group": "actionsAndPhrases",
      "example": "We are looking for a gift."
    },
    {
      "en": "choosing",
      "vi": "đang chọn",
      "ipa": "/ˈtʃuːzɪŋ/",
      "img": "☑️",
      "group": "actionsAndPhrases",
      "example": "They are choosing a bag."
    },
    {
      "en": "trying on",
      "vi": "đang thử đồ",
      "ipa": "/ˈtraɪɪŋ ɑːn/",
      "img": "👟",
      "group": "actionsAndPhrases",
      "example": "He is trying on shoes."
    },
    {
      "en": "checking",
      "vi": "đang kiểm tra",
      "ipa": "/ˈtʃekɪŋ/",
      "img": "✅",
      "group": "actionsAndPhrases",
      "example": "She is checking the size."
    },
    {
      "en": "carrying",
      "vi": "đang mang/xách",
      "ipa": "/ˈkæriɪŋ/",
      "img": "👜",
      "group": "actionsAndPhrases",
      "example": "I am carrying two bags."
    },
    {
      "en": "standing in line",
      "vi": "đang xếp hàng",
      "ipa": "/ˈstændɪŋ ɪn laɪn/",
      "img": "🚶",
      "group": "actionsAndPhrases",
      "example": "The customers are standing in line."
    },
    {
      "en": "asking",
      "vi": "đang hỏi",
      "ipa": "/ˈæskɪŋ/",
      "img": "❓",
      "group": "actionsAndPhrases",
      "example": "The boy is asking a question."
    },
    {
      "en": "helping",
      "vi": "đang giúp",
      "ipa": "/ˈhelpɪŋ/",
      "img": "🤝",
      "group": "actionsAndPhrases",
      "example": "The assistant is helping me."
    },
    {
      "en": "selling",
      "vi": "đang bán",
      "ipa": "/ˈselɪŋ/",
      "img": "🏪",
      "group": "actionsAndPhrases",
      "example": "The shop is selling bags."
    },
    {
      "en": "shopping",
      "vi": "đang mua sắm",
      "ipa": "/ˈʃɑːpɪŋ/",
      "img": "🛒",
      "group": "actionsAndPhrases",
      "example": "We are shopping now."
    },
    {
      "en": "waiting",
      "vi": "đang chờ",
      "ipa": "/ˈweɪtɪŋ/",
      "img": "⏳",
      "group": "actionsAndPhrases",
      "example": "I am waiting for my friend."
    },
    {
      "en": "wearing",
      "vi": "đang mặc",
      "ipa": "/ˈwerɪŋ/",
      "img": "👕",
      "group": "actionsAndPhrases",
      "example": "She is wearing a blue shirt."
    },
    {
      "en": "smiling",
      "vi": "đang cười",
      "ipa": "/ˈsmaɪlɪŋ/",
      "img": "🙂",
      "group": "actionsAndPhrases",
      "example": "The cashier is smiling."
    }
  ],
  "listenPick": {
    "title": "Nghe chọn từ - Shopping vocabulary",
    "instruction": "Nghe từng từ/cụm từ rồi chọn nghĩa tiếng Việt đúng. Đáp án chỉ hiện sau khi học viên chọn.",
    "questions": [
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "shop / store",
        "en": "shop / store",
        "options": [
          "cửa hàng",
          "nhân viên bán hàng",
          "thẻ tín dụng",
          "đang kiểm tra"
        ],
        "answer": 0,
        "explanation": "shop / store = cửa hàng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "supermarket",
        "en": "supermarket",
        "options": [
          "cửa hàng quần áo",
          "siêu thị",
          "đang tìm",
          "đang hỏi"
        ],
        "answer": 1,
        "explanation": "supermarket = siêu thị"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "shopping mall",
        "en": "shopping mall",
        "options": [
          "thu ngân",
          "thẻ tín dụng",
          "trung tâm mua sắm",
          "đang mua sắm"
        ],
        "answer": 2,
        "explanation": "shopping mall = trung tâm mua sắm"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "market",
        "en": "market",
        "options": [
          "nhãn giá",
          "đang tìm",
          "đang hỏi",
          "chợ"
        ],
        "answer": 3,
        "explanation": "market = chợ"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "clothes shop",
        "en": "clothes shop",
        "options": [
          "cửa hàng quần áo",
          "đang kiểm tra",
          "đang mua sắm",
          "trung tâm mua sắm"
        ],
        "answer": 0,
        "explanation": "clothes shop = cửa hàng quần áo"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "bookshop",
        "en": "bookshop",
        "options": [
          "đang trả tiền",
          "nhà sách",
          "đang cười",
          "cửa hàng đồ chơi"
        ],
        "answer": 1,
        "explanation": "bookshop = nhà sách"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "toy shop",
        "en": "toy shop",
        "options": [
          "đang thử đồ",
          "đang mua sắm",
          "cửa hàng đồ chơi",
          "khách hàng"
        ],
        "answer": 2,
        "explanation": "toy shop = cửa hàng đồ chơi"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "cashier",
        "en": "cashier",
        "options": [
          "đang xếp hàng",
          "đang cười",
          "nhà sách",
          "thu ngân"
        ],
        "answer": 3,
        "explanation": "cashier = thu ngân"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "shop assistant",
        "en": "shop assistant",
        "options": [
          "nhân viên bán hàng",
          "trung tâm mua sắm",
          "khách hàng",
          "đang mua"
        ],
        "answer": 0,
        "explanation": "shop assistant = nhân viên bán hàng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "customer",
        "en": "customer",
        "options": [
          "đang mặc",
          "khách hàng",
          "hóa đơn",
          "đang chọn"
        ],
        "answer": 1,
        "explanation": "customer = khách hàng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "price tag",
        "en": "price tag",
        "options": [
          "siêu thị",
          "nhân viên bán hàng",
          "nhãn giá",
          "đang mang/xách"
        ],
        "answer": 2,
        "explanation": "price tag = nhãn giá"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "sale",
        "en": "sale",
        "options": [
          "cửa hàng quần áo",
          "hóa đơn",
          "đang chọn",
          "giảm giá"
        ],
        "answer": 3,
        "explanation": "sale = giảm giá"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "receipt",
        "en": "receipt",
        "options": [
          "hóa đơn",
          "đang mua",
          "đang mang/xách",
          "đang chờ"
        ],
        "answer": 0,
        "explanation": "receipt = hóa đơn"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "basket",
        "en": "basket",
        "options": [
          "nhãn giá",
          "giỏ hàng",
          "đang giúp",
          "cửa hàng"
        ],
        "answer": 1,
        "explanation": "basket = giỏ hàng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "credit card",
        "en": "credit card",
        "options": [
          "giỏ hàng",
          "đang mang/xách",
          "thẻ tín dụng",
          "chợ"
        ],
        "answer": 2,
        "explanation": "credit card = thẻ tín dụng"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "buying",
        "en": "buying",
        "options": [
          "đang tìm",
          "đang giúp",
          "cửa hàng",
          "đang mua"
        ],
        "answer": 3,
        "explanation": "buying = đang mua"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "paying",
        "en": "paying",
        "options": [
          "đang trả tiền",
          "đang chờ",
          "chợ",
          "khách hàng"
        ],
        "answer": 0,
        "explanation": "paying = đang trả tiền"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "looking for",
        "en": "looking for",
        "options": [
          "đang hỏi",
          "đang tìm",
          "cửa hàng đồ chơi",
          "hóa đơn"
        ],
        "answer": 1,
        "explanation": "looking for = đang tìm"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "choosing",
        "en": "choosing",
        "options": [
          "đang mua sắm",
          "chợ",
          "đang chọn",
          "đang mua"
        ],
        "answer": 2,
        "explanation": "choosing = đang chọn"
      },
      {
        "q": "Nghe và chọn nghĩa đúng.",
        "audio": "trying on",
        "en": "trying on",
        "options": [
          "đang cười",
          "cửa hàng đồ chơi",
          "hóa đơn",
          "đang thử đồ"
        ],
        "answer": 3,
        "explanation": "trying on = đang thử đồ"
      }
    ]
  },
  "grammar": {
    "title": "Present Continuous - Hiện tại tiếp diễn trong mua sắm",
    "intro": "Dùng Present Continuous để nói việc đang xảy ra ngay bây giờ hoặc trong tình huống hiện tại, đặc biệt khi mô tả người đang mua, chọn, trả tiền, hỏi giá hoặc xếp hàng.",
    "badge": "5 CẤU TRÚC CHÍNH",
    "formula": "S + am/is/are + V-ing",
    "structures": [
      {
        "num": 1,
        "pattern": "S + am/is/are + V-ing",
        "vi": "Câu khẳng định",
        "style": "Nói ai đang làm gì bây giờ.",
        "example": "I am shopping now.",
        "exampleVi": "Tôi đang mua sắm bây giờ.",
        "context": "Dùng với now, right now, at the moment, Look.",
        "commonMistake": "Thiếu am/is/are: I shopping now."
      },
      {
        "num": 2,
        "pattern": "S + am/is/are + not + V-ing",
        "vi": "Câu phủ định",
        "style": "Nói ai không đang làm gì.",
        "example": "She is not paying now.",
        "exampleVi": "Cô ấy không đang trả tiền bây giờ.",
        "context": "Dùng khi muốn phủ định hành động đang diễn ra.",
        "commonMistake": "Dùng do not trước V-ing: She does not paying."
      },
      {
        "num": 3,
        "pattern": "Am/Is/Are + S + V-ing?",
        "vi": "Câu hỏi Yes/No",
        "style": "Đảo am/is/are lên trước chủ ngữ.",
        "example": "Are you looking for a bag?",
        "exampleVi": "Bạn đang tìm một cái túi à?",
        "context": "Dùng để hỏi người khác đang làm gì hoặc có đang làm hành động đó không.",
        "commonMistake": "Giữ thứ tự câu kể: You are looking for a bag?"
      },
      {
        "num": 4,
        "pattern": "Wh-word + am/is/are + S + V-ing?",
        "vi": "Câu hỏi có từ để hỏi",
        "style": "Dùng What, Where, Who, How trước am/is/are.",
        "example": "What are they buying?",
        "exampleVi": "Họ đang mua gì?",
        "context": "Dùng để hỏi thông tin cụ thể về hành động đang xảy ra.",
        "commonMistake": "Quên V-ing sau chủ ngữ: What are they buy?"
      },
      {
        "num": 5,
        "pattern": "V-ing spelling: V + ing / drop e / double consonant",
        "vi": "Quy tắc thêm -ing",
        "style": "buy -> buying; make -> making; shop -> shopping; try -> trying.",
        "example": "The customer is shopping and the cashier is smiling.",
        "exampleVi": "Khách hàng đang mua sắm và thu ngân đang cười.",
        "context": "Dùng để viết đúng động từ ở Present Continuous.",
        "commonMistake": "Viết shoping hoặc smileing."
      }
    ],
    "commonQA": [
      {
        "q": "What are you doing?",
        "a": "I am looking for a bag."
      },
      {
        "q": "Is she buying a dress?",
        "a": "Yes, she is."
      },
      {
        "q": "Are they standing in line?",
        "a": "No, they are not."
      },
      {
        "q": "How are you paying?",
        "a": "I am paying by credit card."
      }
    ]
  },
  "listening": {
    "title": "Nghe trả lời - Present Continuous at the shop",
    "transcript": "20 câu nghe về mua sắm và Present Continuous. Học viên nghe audio, chọn từ/cụm từ đúng để hoàn thành câu.",
    "translation": "Nghe câu có chỗ trống và chọn đáp án phù hợp.",
    "audio": "Present Continuous shopping listening practice.",
    "questions": [
      {
        "q": "I ___ looking for a blue bag.",
        "audio": "I am looking for a blue bag.",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "answer": 0,
        "explanation": "I đi với am."
      },
      {
        "q": "She ___ buying a dress now.",
        "audio": "She is buying a dress now.",
        "options": [
          "am",
          "is",
          "are",
          "do"
        ],
        "answer": 1,
        "explanation": "She đi với is."
      },
      {
        "q": "They ___ standing in line.",
        "audio": "They are standing in line.",
        "options": [
          "am",
          "is",
          "are",
          "does"
        ],
        "answer": 2,
        "explanation": "They đi với are."
      },
      {
        "q": "He is ___ by credit card.",
        "audio": "He is paying by credit card.",
        "options": [
          "pay",
          "pays",
          "paying",
          "paid"
        ],
        "answer": 2,
        "explanation": "Sau is dùng V-ing."
      },
      {
        "q": "We are ___ at the shopping mall.",
        "audio": "We are shopping at the shopping mall.",
        "options": [
          "shop",
          "shopping",
          "shops",
          "shopped"
        ],
        "answer": 1,
        "explanation": "shop đổi thành shopping."
      },
      {
        "q": "The cashier ___ helping a customer.",
        "audio": "The cashier is helping a customer.",
        "options": [
          "am",
          "is",
          "are",
          "do"
        ],
        "answer": 1,
        "explanation": "The cashier là số ít nên dùng is."
      },
      {
        "q": "I am not ___ clothes today.",
        "audio": "I am not buying clothes today.",
        "options": [
          "buy",
          "buys",
          "buying",
          "bought"
        ],
        "answer": 2,
        "explanation": "Phủ định vẫn dùng V-ing."
      },
      {
        "q": "Look! The children are ___ toys.",
        "audio": "Look! The children are choosing toys.",
        "options": [
          "choose",
          "chooses",
          "choosing",
          "choice"
        ],
        "answer": 2,
        "explanation": "are + choosing."
      },
      {
        "q": "My sister is ___ on a jacket.",
        "audio": "My sister is trying on a jacket.",
        "options": [
          "try",
          "trying",
          "tries",
          "tried"
        ],
        "answer": 1,
        "explanation": "try chuyển thành trying."
      },
      {
        "q": "The man is ___ the price tag.",
        "audio": "The man is checking the price tag.",
        "options": [
          "checking",
          "check",
          "checks",
          "checked"
        ],
        "answer": 0,
        "explanation": "is + checking."
      },
      {
        "q": "Are you ___ for the cashier?",
        "audio": "Are you waiting for the cashier?",
        "options": [
          "wait",
          "waiting",
          "waits",
          "waited"
        ],
        "answer": 1,
        "explanation": "Câu hỏi vẫn dùng V-ing."
      },
      {
        "q": "What are you ___?",
        "audio": "What are you buying?",
        "options": [
          "buy",
          "buys",
          "buying",
          "bought"
        ],
        "answer": 2,
        "explanation": "What are you + V-ing?"
      },
      {
        "q": "He is not ___ the receipt.",
        "audio": "He is not carrying the receipt.",
        "options": [
          "carry",
          "carries",
          "carrying",
          "carried"
        ],
        "answer": 2,
        "explanation": "carry đổi thành carrying."
      },
      {
        "q": "The shop assistant is ___ me.",
        "audio": "The shop assistant is helping me.",
        "options": [
          "help",
          "helps",
          "helping",
          "helped"
        ],
        "answer": 2,
        "explanation": "is + helping."
      },
      {
        "q": "Are they ___ in line?",
        "audio": "Are they standing in line?",
        "options": [
          "stand",
          "stands",
          "standing",
          "stood"
        ],
        "answer": 2,
        "explanation": "are + standing."
      },
      {
        "q": "She is ___ a red shirt.",
        "audio": "She is wearing a red shirt.",
        "options": [
          "wear",
          "wears",
          "wearing",
          "wore"
        ],
        "answer": 2,
        "explanation": "wear + ing."
      },
      {
        "q": "The customers are ___ politely.",
        "audio": "The customers are asking politely.",
        "options": [
          "ask",
          "asks",
          "asking",
          "asked"
        ],
        "answer": 2,
        "explanation": "are + asking."
      },
      {
        "q": "This shop is ___ bags today.",
        "audio": "This shop is selling bags today.",
        "options": [
          "sell",
          "sells",
          "selling",
          "sold"
        ],
        "answer": 2,
        "explanation": "is + selling."
      },
      {
        "q": "I am ___ for my friend near the store.",
        "audio": "I am waiting for my friend near the store.",
        "options": [
          "waiting",
          "wait",
          "waits",
          "waited"
        ],
        "answer": 0,
        "explanation": "am + waiting."
      },
      {
        "q": "The cashier is ___.",
        "audio": "The cashier is smiling.",
        "options": [
          "smile",
          "smiles",
          "smiling",
          "smiled"
        ],
        "answer": 2,
        "explanation": "smile bỏ e rồi thêm ing."
      }
    ]
  },
  "translation": {
    "title": "Luyện dịch Việt ↔ Anh - Shopping now",
    "instruction": "Dịch từng câu theo hướng yêu cầu. Chỉ xem đáp án sau khi bấm kiểm tra.",
    "sentences": [
      {
        "vi": "Tôi đang tìm một cái túi.",
        "en": "I am looking for a bag.",
        "direction": "vi-en"
      },
      {
        "vi": "Cô ấy đang mua một chiếc váy.",
        "en": "She is buying a dress.",
        "direction": "vi-en"
      },
      {
        "vi": "Họ đang xếp hàng.",
        "en": "They are standing in line.",
        "direction": "vi-en"
      },
      {
        "vi": "Anh ấy đang trả tiền ở quầy thu ngân.",
        "en": "He is paying at the cashier.",
        "direction": "vi-en"
      },
      {
        "vi": "Khách hàng đang hỏi về giá.",
        "en": "The customer is asking about the price.",
        "answer": "Khách hàng đang hỏi về giá.",
        "direction": "en-vi"
      },
      {
        "vi": "Thu ngân đang giúp tôi.",
        "en": "The cashier is helping me.",
        "direction": "vi-en"
      },
      {
        "vi": "Chúng tôi không mua quần áo hôm nay.",
        "en": "We are not buying clothes today.",
        "direction": "vi-en"
      },
      {
        "vi": "Cô ấy không kiểm tra nhãn giá.",
        "en": "She is not checking the price tag.",
        "direction": "vi-en"
      },
      {
        "vi": "Tôi đang chọn một cái túi màu xanh.",
        "en": "I am choosing a blue bag.",
        "direction": "vi-en"
      },
      {
        "vi": "Nhìn kìa! Anh ấy đang xách nhiều túi.",
        "en": "Look! He is carrying many bags.",
        "answer": "Nhìn kìa! Anh ấy đang xách nhiều túi.",
        "direction": "en-vi"
      },
      {
        "vi": "Bạn đang mua sắm bây giờ.",
        "en": "You are shopping now.",
        "direction": "vi-en"
      },
      {
        "vi": "Họ đang thử giày.",
        "en": "They are trying on shoes.",
        "direction": "vi-en"
      },
      {
        "vi": "Cô ấy đang chờ bạn của cô ấy.",
        "en": "She is waiting for her friend.",
        "direction": "vi-en"
      },
      {
        "vi": "Cửa hàng này đang bán sách.",
        "en": "This shop is selling books.",
        "direction": "vi-en"
      },
      {
        "vi": "Anh ấy đang trả bằng thẻ tín dụng.",
        "en": "He is paying by credit card.",
        "answer": "Anh ấy đang trả bằng thẻ tín dụng.",
        "direction": "en-vi"
      },
      {
        "vi": "Tôi đang cầm hóa đơn.",
        "en": "I am carrying the receipt.",
        "direction": "vi-en"
      },
      {
        "vi": "Chúng tôi đang ở trung tâm mua sắm.",
        "en": "We are at the shopping mall.",
        "direction": "vi-en"
      },
      {
        "vi": "Cô ấy đang mặc áo màu đỏ.",
        "en": "She is wearing a red shirt.",
        "direction": "vi-en"
      },
      {
        "vi": "Họ không đang xếp hàng.",
        "en": "They are not standing in line.",
        "direction": "vi-en"
      },
      {
        "vi": "Bây giờ tôi đang mua một quyển sách.",
        "en": "I am buying a book now.",
        "answer": "Bây giờ tôi đang mua một quyển sách.",
        "direction": "en-vi"
      }
    ]
  },
  "dialogueVideo": {
    "title": "Video hội thoại - At the shop now",
    "label": "Shopping dialogue with Present Continuous",
    "embedUrl": "https://www.youtube.com/embed?listType=search&list=shopping%20conversation%20at%20the%20shop%20English%20A1",
    "watchUrl": "https://www.youtube.com/results?search_query=shopping+conversation+at+the+shop+English+A1",
    "fallbackSearchUrl": "https://www.youtube.com/results?search_query=shopping+conversation+at+the+shop+English+A1",
    "channel": "YouTube search fallback",
    "duration": "2-6 phút",
    "description": "Hội thoại mua sắm A1. Transcript song ngữ bên dưới là nội dung học chính và đủ để học viên luyện nếu video YouTube không phát.",
    "scenes": [
      {
        "time": "0:00",
        "scene": "Customer asks what a friend is doing at the mall.",
        "keywords": "What are you doing, looking for"
      },
      {
        "time": "0:45",
        "scene": "Customer chooses a gift and checks the price.",
        "keywords": "choosing, on sale, price tag"
      },
      {
        "time": "1:30",
        "scene": "Customer stands in line and pays by credit card.",
        "keywords": "cashier, standing in line, paying"
      }
    ],
    "transcript": [
      {
        "speaker": "Anna",
        "en": "Hi, Ben! What are you doing at the mall?",
        "vi": "Chào Ben! Bạn đang làm gì ở trung tâm mua sắm?",
        "keyword": "What are you doing?",
        "audioText": "Hi, Ben! What are you doing at the mall?"
      },
      {
        "speaker": "Ben",
        "en": "I am looking for a birthday gift for my sister.",
        "vi": "Tôi đang tìm một món quà sinh nhật cho em gái.",
        "keyword": "looking for",
        "audioText": "I am looking for a birthday gift for my sister."
      },
      {
        "speaker": "Anna",
        "en": "Are you buying a book or a toy?",
        "vi": "Bạn đang mua sách hay đồ chơi?",
        "keyword": "Are you buying",
        "audioText": "Are you buying a book or a toy?"
      },
      {
        "speaker": "Ben",
        "en": "No, I am choosing a small blue bag.",
        "vi": "Không, tôi đang chọn một cái túi nhỏ màu xanh.",
        "keyword": "choosing",
        "audioText": "No, I am choosing a small blue bag."
      },
      {
        "speaker": "Anna",
        "en": "Look! That bag is on sale today.",
        "vi": "Nhìn kìa! Cái túi đó đang giảm giá hôm nay.",
        "keyword": "on sale",
        "audioText": "Look! That bag is on sale today."
      },
      {
        "speaker": "Ben",
        "en": "Great. I am checking the price tag now.",
        "vi": "Tuyệt. Bây giờ tôi đang kiểm tra nhãn giá.",
        "keyword": "checking",
        "audioText": "Great. I am checking the price tag now."
      },
      {
        "speaker": "Anna",
        "en": "The cashier is helping another customer.",
        "vi": "Thu ngân đang giúp một khách hàng khác.",
        "keyword": "cashier",
        "audioText": "The cashier is helping another customer."
      },
      {
        "speaker": "Ben",
        "en": "We are standing in line, so we need to wait.",
        "vi": "Chúng ta đang xếp hàng, nên chúng ta cần chờ.",
        "keyword": "standing in line",
        "audioText": "We are standing in line, so we need to wait."
      },
      {
        "speaker": "Anna",
        "en": "Are you paying by cash or by credit card?",
        "vi": "Bạn đang trả bằng tiền mặt hay thẻ tín dụng?",
        "keyword": "paying by",
        "audioText": "Are you paying by cash or by credit card?"
      },
      {
        "speaker": "Ben",
        "en": "I am paying by credit card.",
        "vi": "Tôi đang trả bằng thẻ tín dụng.",
        "keyword": "credit card",
        "audioText": "I am paying by credit card."
      },
      {
        "speaker": "Cashier",
        "en": "Here is your receipt. Would you like a bag?",
        "vi": "Đây là hóa đơn của bạn. Bạn có muốn một cái túi không?",
        "keyword": "receipt",
        "audioText": "Here is your receipt. Would you like a bag?"
      },
      {
        "speaker": "Ben",
        "en": "Yes, please. Thank you for helping us.",
        "vi": "Có, làm ơn. Cảm ơn vì đã giúp chúng tôi.",
        "keyword": "helping",
        "audioText": "Yes, please. Thank you for helping us."
      }
    ],
    "keywords": [
      {
        "en": "cashier",
        "vi": "thu ngân",
        "ipa": "/kæˈʃɪr/",
        "img": "💵",
        "group": "shoppingPlaces",
        "example": "The cashier is smiling."
      },
      {
        "en": "customer",
        "vi": "khách hàng",
        "ipa": "/ˈkʌstəmər/",
        "img": "🙋",
        "group": "shoppingPlaces",
        "example": "The customer is asking about the price."
      },
      {
        "en": "price tag",
        "vi": "nhãn giá",
        "ipa": "/praɪs tæɡ/",
        "img": "🏷️",
        "group": "shoppingPlaces",
        "example": "I am checking the price tag."
      },
      {
        "en": "sale",
        "vi": "giảm giá",
        "ipa": "/seɪl/",
        "img": "🔖",
        "group": "shoppingPlaces",
        "example": "These shoes are on sale."
      },
      {
        "en": "receipt",
        "vi": "hóa đơn",
        "ipa": "/rɪˈsiːt/",
        "img": "🧾",
        "group": "shoppingPlaces",
        "example": "Please keep the receipt."
      },
      {
        "en": "credit card",
        "vi": "thẻ tín dụng",
        "ipa": "/ˈkredɪt kɑːrd/",
        "img": "💳",
        "group": "shoppingPlaces",
        "example": "He is paying by credit card."
      },
      {
        "en": "paying",
        "vi": "đang trả tiền",
        "ipa": "/ˈpeɪɪŋ/",
        "img": "💳",
        "group": "actionsAndPhrases",
        "example": "She is paying at the cashier."
      },
      {
        "en": "looking for",
        "vi": "đang tìm",
        "ipa": "/ˈlʊkɪŋ fɔːr/",
        "img": "🔎",
        "group": "actionsAndPhrases",
        "example": "We are looking for a gift."
      },
      {
        "en": "choosing",
        "vi": "đang chọn",
        "ipa": "/ˈtʃuːzɪŋ/",
        "img": "☑️",
        "group": "actionsAndPhrases",
        "example": "They are choosing a bag."
      },
      {
        "en": "checking",
        "vi": "đang kiểm tra",
        "ipa": "/ˈtʃekɪŋ/",
        "img": "✅",
        "group": "actionsAndPhrases",
        "example": "She is checking the size."
      },
      {
        "en": "standing in line",
        "vi": "đang xếp hàng",
        "ipa": "/ˈstændɪŋ ɪn laɪn/",
        "img": "🚶",
        "group": "actionsAndPhrases",
        "example": "The customers are standing in line."
      },
      {
        "en": "helping",
        "vi": "đang giúp",
        "ipa": "/ˈhelpɪŋ/",
        "img": "🤝",
        "group": "actionsAndPhrases",
        "example": "The assistant is helping me."
      }
    ],
    "comprehension": [
      {
        "q": "Where are Anna and Ben?",
        "options": [
          "At school",
          "At the shopping mall",
          "At the hospital",
          "At home"
        ],
        "answer": 1,
        "explanation": "They are at the mall."
      },
      {
        "q": "What is Ben looking for?",
        "options": [
          "A birthday gift",
          "A bus ticket",
          "A sandwich",
          "A phone charger"
        ],
        "answer": 0,
        "explanation": "He is looking for a birthday gift."
      },
      {
        "q": "What is Ben choosing?",
        "options": [
          "A red shirt",
          "A small blue bag",
          "A toy car",
          "A receipt"
        ],
        "answer": 1,
        "explanation": "He is choosing a small blue bag."
      },
      {
        "q": "Who is helping another customer?",
        "options": [
          "Anna",
          "Ben",
          "The cashier",
          "Ben’s sister"
        ],
        "answer": 2,
        "explanation": "The cashier is helping another customer."
      },
      {
        "q": "How is Ben paying?",
        "options": [
          "By cash",
          "By credit card",
          "By phone",
          "He is not paying"
        ],
        "answer": 1,
        "explanation": "He is paying by credit card."
      }
    ],
    "listenPickLine": [
      {
        "prompt": "Nghe câu 1 và chọn câu đúng.",
        "audioText": "Hi, Ben! What are you doing at the mall?",
        "options": [
          "Hi, Ben! What are you doing at the mall?",
          "The cashier is helping another customer.",
          "I am paying by credit card.",
          "No, I am choosing a small blue bag."
        ],
        "answer": 0,
        "explanation": "Chào Ben! Bạn đang làm gì ở trung tâm mua sắm?"
      },
      {
        "prompt": "Nghe câu 2 và chọn câu đúng.",
        "audioText": "I am looking for a birthday gift for my sister.",
        "options": [
          "Look! That bag is on sale today.",
          "I am looking for a birthday gift for my sister.",
          "Here is your receipt. Would you like a bag?",
          "We are standing in line, so we need to wait."
        ],
        "answer": 1,
        "explanation": "Tôi đang tìm một món quà sinh nhật cho em gái."
      },
      {
        "prompt": "Nghe câu 3 và chọn câu đúng.",
        "audioText": "Are you buying a book or a toy?",
        "options": [
          "Great. I am checking the price tag now.",
          "Are you paying by cash or by credit card?",
          "Are you buying a book or a toy?",
          "Yes, please. Thank you for helping us."
        ],
        "answer": 2,
        "explanation": "Bạn đang mua sách hay đồ chơi?"
      },
      {
        "prompt": "Nghe câu 4 và chọn câu đúng.",
        "audioText": "No, I am choosing a small blue bag.",
        "options": [
          "The cashier is helping another customer.",
          "I am paying by credit card.",
          "Hi, Ben! What are you doing at the mall?",
          "No, I am choosing a small blue bag."
        ],
        "answer": 3,
        "explanation": "Không, tôi đang chọn một cái túi nhỏ màu xanh."
      },
      {
        "prompt": "Nghe câu 5 và chọn câu đúng.",
        "audioText": "Look! That bag is on sale today.",
        "options": [
          "Look! That bag is on sale today.",
          "Here is your receipt. Would you like a bag?",
          "I am looking for a birthday gift for my sister.",
          "We are standing in line, so we need to wait."
        ],
        "answer": 0,
        "explanation": "Nhìn kìa! Cái túi đó đang giảm giá hôm nay."
      },
      {
        "prompt": "Nghe câu 6 và chọn câu đúng.",
        "audioText": "Great. I am checking the price tag now.",
        "options": [
          "Are you paying by cash or by credit card?",
          "Great. I am checking the price tag now.",
          "Are you buying a book or a toy?",
          "Yes, please. Thank you for helping us."
        ],
        "answer": 1,
        "explanation": "Tuyệt. Bây giờ tôi đang kiểm tra nhãn giá."
      },
      {
        "prompt": "Nghe câu 7 và chọn câu đúng.",
        "audioText": "The cashier is helping another customer.",
        "options": [
          "I am paying by credit card.",
          "Hi, Ben! What are you doing at the mall?",
          "The cashier is helping another customer.",
          "No, I am choosing a small blue bag."
        ],
        "answer": 2,
        "explanation": "Thu ngân đang giúp một khách hàng khác."
      },
      {
        "prompt": "Nghe câu 8 và chọn câu đúng.",
        "audioText": "We are standing in line, so we need to wait.",
        "options": [
          "Here is your receipt. Would you like a bag?",
          "I am looking for a birthday gift for my sister.",
          "Look! That bag is on sale today.",
          "We are standing in line, so we need to wait."
        ],
        "answer": 3,
        "explanation": "Chúng ta đang xếp hàng, nên chúng ta cần chờ."
      },
      {
        "prompt": "Nghe câu 9 và chọn câu đúng.",
        "audioText": "Are you paying by cash or by credit card?",
        "options": [
          "Are you paying by cash or by credit card?",
          "Are you buying a book or a toy?",
          "Great. I am checking the price tag now.",
          "Yes, please. Thank you for helping us."
        ],
        "answer": 0,
        "explanation": "Bạn đang trả bằng tiền mặt hay thẻ tín dụng?"
      },
      {
        "prompt": "Nghe câu 10 và chọn câu đúng.",
        "audioText": "I am paying by credit card.",
        "options": [
          "Hi, Ben! What are you doing at the mall?",
          "I am paying by credit card.",
          "The cashier is helping another customer.",
          "No, I am choosing a small blue bag."
        ],
        "answer": 1,
        "explanation": "Tôi đang trả bằng thẻ tín dụng."
      }
    ],
    "fillConversation": [
      {
        "title": "At the mall - choosing a gift",
        "lines": [
          {
            "speaker": "Mia",
            "text": "What [[are]] you doing at the mall?"
          },
          {
            "speaker": "Alex",
            "text": "I [[am]] looking for a birthday gift."
          },
          {
            "speaker": "Mia",
            "text": "Are you [[buying]] a book?"
          },
          {
            "speaker": "Alex",
            "text": "No, I am [[choosing]] a small bag."
          }
        ],
        "wordBank": [
          "are",
          "am",
          "buying",
          "choosing",
          "looking for"
        ],
        "explanations": [
          "are dùng với you trong câu hỏi Present Continuous.",
          "am dùng với I.",
          "Sau Are you dùng V-ing: buying.",
          "Sau am dùng V-ing: choosing."
        ]
      },
      {
        "title": "At the cashier - payment",
        "lines": [
          {
            "speaker": "Mia",
            "text": "The cashier [[is]] helping another customer."
          },
          {
            "speaker": "Alex",
            "text": "We [[are]] standing in line now."
          },
          {
            "speaker": "Mia",
            "text": "How are you [[paying]]?"
          },
          {
            "speaker": "Alex",
            "text": "I am paying by [[credit card]]."
          }
        ],
        "wordBank": [
          "is",
          "are",
          "paying",
          "credit card",
          "receipt"
        ],
        "explanations": [
          "cashier là số ít nên dùng is.",
          "we đi với are.",
          "Sau are you dùng V-ing: paying.",
          "credit card là phương thức thanh toán."
        ]
      },
      {
        "title": "Checking the price",
        "lines": [
          {
            "speaker": "Mia",
            "text": "Look! This bag [[is]] on sale."
          },
          {
            "speaker": "Alex",
            "text": "I am [[checking]] the price tag."
          },
          {
            "speaker": "Mia",
            "text": "The shop assistant is [[smiling]]."
          },
          {
            "speaker": "Alex",
            "text": "She is [[helping]] us."
          }
        ],
        "wordBank": [
          "is",
          "checking",
          "smiling",
          "helping",
          "sale"
        ],
        "explanations": [
          "This bag là số ít nên dùng is.",
          "checking = đang kiểm tra.",
          "smile bỏ e rồi thêm ing.",
          "helping = đang giúp."
        ]
      }
    ]
  },
  "speaking": {
    "title": "Luyện nói AI - Shopping now",
    "formula": "S + am/is/are + V-ing",
    "turns": [
      {
        "id": 1,
        "ai": {
          "textEn": "What are you doing at the shopping mall?",
          "textVn": "Bạn đang làm gì ở trung tâm mua sắm?",
          "audioUrl": "What are you doing at the shopping mall?"
        },
        "user": {
          "formula": "I am + V-ing + object/place.",
          "sampleEn": "I am looking for a blue bag at the shopping mall.",
          "sampleVn": "Tôi đang tìm một cái túi màu xanh ở trung tâm mua sắm.",
          "sampleAudioUrl": "I am looking for a blue bag at the shopping mall.",
          "criteria": [
            "Dùng I am + V-ing",
            "Có ít nhất 1 từ vựng mua sắm",
            "Phát âm rõ động từ -ing"
          ]
        }
      },
      {
        "id": 2,
        "ai": {
          "textEn": "What is your friend buying now?",
          "textVn": "Bạn của bạn đang mua gì bây giờ?",
          "audioUrl": "What is your friend buying now?"
        },
        "user": {
          "formula": "He/She is + V-ing + object + now.",
          "sampleEn": "She is buying a dress now.",
          "sampleVn": "Cô ấy đang mua một chiếc váy bây giờ.",
          "sampleAudioUrl": "She is buying a dress now.",
          "criteria": [
            "Dùng he/she is",
            "Dùng V-ing đúng",
            "Trả lời đủ ý"
          ]
        }
      },
      {
        "id": 3,
        "ai": {
          "textEn": "Make one negative sentence about shopping.",
          "textVn": "Hãy nói một câu phủ định về mua sắm.",
          "audioUrl": "Make one negative sentence about shopping."
        },
        "user": {
          "formula": "S + am/is/are + not + V-ing.",
          "sampleEn": "We are not buying clothes today.",
          "sampleVn": "Chúng tôi không mua quần áo hôm nay.",
          "sampleAudioUrl": "We are not buying clothes today.",
          "criteria": [
            "Có not đúng vị trí",
            "Dùng từ vựng shopping",
            "Không dùng động từ nguyên mẫu sau be"
          ]
        }
      },
      {
        "id": 4,
        "ai": {
          "textEn": "Ask me a Present Continuous question at a shop.",
          "textVn": "Hãy hỏi tôi một câu Hiện tại tiếp diễn ở cửa hàng.",
          "audioUrl": "Ask me a Present Continuous question at a shop."
        },
        "user": {
          "formula": "Am/Is/Are + S + V-ing + object?",
          "sampleEn": "Are you paying by credit card?",
          "sampleVn": "Bạn đang trả bằng thẻ tín dụng à?",
          "sampleAudioUrl": "Are you paying by credit card?",
          "criteria": [
            "Đảo am/is/are lên đầu",
            "Có V-ing",
            "Lên giọng câu hỏi"
          ]
        }
      },
      {
        "id": 5,
        "ai": {
          "textEn": "Describe a shopping scene in 30 seconds.",
          "textVn": "Mô tả một cảnh mua sắm trong 30 giây.",
          "audioUrl": "Describe a shopping scene in 30 seconds."
        },
        "user": {
          "formula": "Use 4-5 sentences: place + people + actions + payment.",
          "sampleEn": "I am at a clothes shop. A customer is choosing a shirt. The cashier is helping another customer. Two people are standing in line. I am paying by credit card.",
          "sampleVn": "Tôi đang ở cửa hàng quần áo. Một khách hàng đang chọn áo sơ mi. Thu ngân đang giúp một khách hàng khác. Hai người đang xếp hàng. Tôi đang trả bằng thẻ tín dụng.",
          "sampleAudioUrl": "I am at a clothes shop. A customer is choosing a shirt. The cashier is helping another customer. Two people are standing in line. I am paying by credit card.",
          "criteria": [
            "Ít nhất 5 từ mới",
            "Ít nhất 3 câu Present Continuous",
            "Nói liên tục 30 giây"
          ]
        }
      }
    ]
  },
  "minitest": [
    {
      "type": "grammar",
      "q": "I ___ looking for a book.",
      "options": [
        "am",
        "is",
        "are",
        "be"
      ],
      "answer": 0,
      "explanation": "I đi với am."
    },
    {
      "type": "grammar",
      "q": "She ___ buying a dress now.",
      "options": [
        "am",
        "is",
        "are",
        "do"
      ],
      "answer": 1,
      "explanation": "She đi với is."
    },
    {
      "type": "grammar",
      "q": "They ___ shopping at the mall.",
      "options": [
        "am",
        "is",
        "are",
        "does"
      ],
      "answer": 2,
      "explanation": "They đi với are."
    },
    {
      "type": "grammar",
      "q": "He is ___ at the cashier.",
      "options": [
        "pay",
        "pays",
        "paying",
        "paid"
      ],
      "answer": 2,
      "explanation": "be + V-ing."
    },
    {
      "type": "grammar",
      "q": "We are ___ in line.",
      "options": [
        "stand",
        "stands",
        "standing",
        "stood"
      ],
      "answer": 2,
      "explanation": "stand + ing."
    },
    {
      "type": "vocab",
      "q": "Customer nghĩa là gì?",
      "options": [
        "khách hàng",
        "thu ngân",
        "giá",
        "hóa đơn"
      ],
      "answer": 0,
      "explanation": "customer = khách hàng."
    },
    {
      "type": "vocab",
      "q": "Cashier nghĩa là gì?",
      "options": [
        "thu ngân",
        "giỏ hàng",
        "khách hàng",
        "chợ"
      ],
      "answer": 0,
      "explanation": "cashier = thu ngân."
    },
    {
      "type": "vocab",
      "q": "Receipt nghĩa là gì?",
      "options": [
        "hóa đơn",
        "nhãn giá",
        "túi",
        "thẻ"
      ],
      "answer": 0,
      "explanation": "receipt = hóa đơn."
    },
    {
      "type": "grammar",
      "q": "Shop + ing là gì?",
      "options": [
        "shoping",
        "shopping",
        "shoped",
        "shops"
      ],
      "answer": 1,
      "explanation": "CVC ngắn: gấp đôi p."
    },
    {
      "type": "grammar",
      "q": "Now thường dùng với thì nào?",
      "options": [
        "Present Continuous",
        "Past Simple",
        "There is",
        "can/can't"
      ],
      "answer": 0,
      "explanation": "now là dấu hiệu hành động đang diễn ra."
    },
    {
      "type": "grammar",
      "q": "Câu phủ định đúng là:",
      "options": [
        "She not buying.",
        "She is not buying.",
        "She does not buying.",
        "She are not buying."
      ],
      "answer": 1,
      "explanation": "S + is not + V-ing."
    },
    {
      "type": "grammar",
      "q": "Câu hỏi đúng là:",
      "options": [
        "Are you paying now?",
        "Do you paying now?",
        "You are paying now?",
        "Paying you are now?"
      ],
      "answer": 0,
      "explanation": "Đảo Are lên đầu câu."
    },
    {
      "type": "vocab",
      "q": "Price tag nghĩa là gì?",
      "options": [
        "túi",
        "nhãn giá",
        "giỏ hàng",
        "giảm giá"
      ],
      "answer": 1,
      "explanation": "price tag = nhãn giá."
    },
    {
      "type": "vocab",
      "q": "Sale nghĩa là gì?",
      "options": [
        "giảm giá",
        "khách hàng",
        "thu ngân",
        "nhà sách"
      ],
      "answer": 0,
      "explanation": "on sale = đang giảm giá."
    },
    {
      "type": "translation",
      "q": "Dịch: Tôi đang trả bằng thẻ tín dụng.",
      "options": [
        "I am paying by credit card.",
        "I pay by credit card now.",
        "I is paying by credit card.",
        "I am pay by credit card."
      ],
      "answer": 0,
      "explanation": "I am + paying."
    },
    {
      "type": "translation",
      "q": "Dịch: Họ đang thử giày.",
      "options": [
        "They are trying on shoes.",
        "They is trying on shoes.",
        "They try on shoes now.",
        "They are try shoes."
      ],
      "answer": 0,
      "explanation": "They are trying on shoes."
    },
    {
      "type": "grammar",
      "q": "try + ing là:",
      "options": [
        "tryng",
        "tryying",
        "trying",
        "tried"
      ],
      "answer": 2,
      "explanation": "try chuyển thành trying."
    },
    {
      "type": "grammar",
      "q": "smile + ing là:",
      "options": [
        "smileing",
        "smiling",
        "smilling",
        "smiled"
      ],
      "answer": 1,
      "explanation": "Bỏ e cuối rồi thêm ing."
    },
    {
      "type": "vocab",
      "q": "Standing in line nghĩa là gì?",
      "options": [
        "đang xếp hàng",
        "đang trả tiền",
        "đang thử đồ",
        "đang kiểm tra"
      ],
      "answer": 0,
      "explanation": "standing in line = đang xếp hàng."
    },
    {
      "type": "translation",
      "q": "Câu nào đúng với \"Cô ấy không kiểm tra giá\"?",
      "options": [
        "She is not checking the price.",
        "She not checking the price.",
        "She are not checking the price.",
        "She does not checking the price."
      ],
      "answer": 0,
      "explanation": "She is not + checking."
    }
  ],
  "mindmap": {
    "type": "structured",
    "center": "BUỔI 17: SHOPPING & PRESENT CONTINUOUS",
    "branches": [
      {
        "icon": "🛒",
        "label": "Shopping Places",
        "sub": "Địa điểm và người trong cửa hàng",
        "items": [
          "shop / store",
          "supermarket",
          "shopping mall",
          "cashier",
          "customer",
          "shop assistant"
        ]
      },
      {
        "icon": "🏷️",
        "label": "Shopping Items",
        "sub": "Giá và thanh toán",
        "items": [
          "price tag",
          "sale",
          "receipt",
          "basket",
          "credit card"
        ]
      },
      {
        "icon": "⚡",
        "label": "Actions Now",
        "sub": "Hành động đang xảy ra",
        "items": [
          "buying",
          "paying",
          "looking for",
          "choosing",
          "trying on",
          "standing in line"
        ]
      },
      {
        "icon": "📐",
        "label": "Present Continuous",
        "sub": "am/is/are + V-ing",
        "items": [
          "I am shopping.",
          "She is buying a dress.",
          "They are standing in line.",
          "We are not buying clothes."
        ]
      },
      {
        "icon": "❓",
        "label": "Questions",
        "sub": "Hỏi đáp trong cửa hàng",
        "items": [
          "What are you doing?",
          "Are you paying by card?",
          "What are they buying?",
          "How are you paying?"
        ]
      }
    ]
  },
  "homeworkRich": {
    "title": "Bài tập về nhà - Buổi 17: Shopping & Present Continuous",
    "submit": "Nộp bài qua nhóm lớp. Khuyến khích gửi ảnh bài viết kèm voice note hoặc video ngắn.",
    "deadline": "Trước buổi học tiếp theo",
    "tasks": [
      {
        "icon": "✍️",
        "title": "BÀI TẬP 1: VIẾT - A Shopping Scene",
        "badge": "Bắt buộc",
        "desc": "Viết 8-10 câu mô tả một cảnh mua sắm đang diễn ra.",
        "items": [
          "Dùng ít nhất 8 từ vựng mới của Buổi 17.",
          "Dùng ít nhất 5 câu Present Continuous.",
          "Có ít nhất 1 câu phủ định và 1 câu hỏi.",
          "Gạch chân hoặc tô đậm am/is/are + V-ing trong bài."
        ],
        "sample": "I am at a clothes shop. A customer is choosing a shirt. The cashier is helping another customer. Two people are standing in line.",
        "rubric": "10 điểm: đúng grammar 4, đúng từ vựng 3, đủ số câu/yêu cầu 2, trình bày rõ 1."
      },
      {
        "icon": "🎙️",
        "title": "BÀI TẬP 2: NÓI / GHI ÂM / VIDEO - At the Shop Role-play",
        "badge": "Bắt buộc",
        "desc": "Ghi âm hoặc quay video 45-60 giây đóng vai khách hàng và thu ngân.",
        "items": [
          "Có ít nhất 8 lượt thoại.",
          "Dùng ít nhất 5 từ mới: cashier, price tag, sale, receipt, credit card, looking for, paying...",
          "Có ít nhất 3 câu Present Continuous.",
          "Nói rõ câu hỏi: What are you doing? / How are you paying? / Are you buying...?"
        ],
        "sample": "A: What are you doing? B: I am looking for a gift. A: Are you paying by credit card? B: Yes, I am.",
        "rubric": "10 điểm: phát âm/rõ tiếng 3, đúng mẫu câu 3, từ vựng 2, độ trôi chảy và hoàn thành tình huống 2."
      }
    ]
  },
  "homework": [
    "Viết 8-10 câu mô tả một cảnh mua sắm đang diễn ra, dùng từ vựng và Present Continuous của Buổi 17.",
    "Ghi âm hoặc quay video role-play 45-60 giây tại cửa hàng, có câu hỏi/trả lời và tiêu chí chấm như phần homeworkRich."
  ],
  "technicalNotes": [
    "Dev: Buổi 17 dùng canonical sectionFlow theo kiến trúc Buổi 9: review, video, vocab, vocab_match, listen_pick, grammar, listen_quiz, translate, dialogue_video, dialogue_video_quiz, dialogue_video_order, speaking, minitest, mindmap, homework.",
    "Dev: Đáp án nằm trong answer/wordBank/explanations của data; UI chỉ reveal sau khi học viên chọn hoặc bấm kiểm tra.",
    "Dev: Nếu YouTube iframe lỗi, transcript song ngữ ở dialogueVideo.transcript vẫn đủ để học viên học và làm các game sau video."
  ]
};
applyExpandedLessonTemplate(17, LESSON_17_IMPORTED_TEMPLATE);
// </imported-lesson-17>
// <imported-lesson-31>
LESSONS.push(LESSON_31_IMPORTED_TEMPLATE);
// </imported-lesson-31>
// </lesson-import-overrides>

const normalizedLessonSource = ensureLessonRange(LESSONS, 31);
LESSONS.splice(0, LESSONS.length, ...normalizedLessonSource);

export const LESSON_ARCHITECTURE_WARNINGS = [];
for(let i=0; i<LESSONS.length; i++){
  const previousLesson = i > 0 ? LESSONS[i - 1] : null;
  LESSONS[i] = normalizeLessonToBuoi9Architecture(LESSONS[i], previousLesson);
  const warnings = validateLessonArchitecture(LESSONS[i]);
  if(warnings.length){
    LESSON_ARCHITECTURE_WARNINGS.push({ id: LESSONS[i].id, title: LESSONS[i].title, warnings });
  }
}

export { canonicalLessonSections, lessonArchitectureV1 };

