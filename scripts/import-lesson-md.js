#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  canonicalSectionIdFromHeading,
  normalizeLessonToBuoi9Architecture,
  validateLessonArchitecture
} from "../src/features/lessons/lessonArchitecture.js";

const PLACEHOLDER = "Cần bổ sung nội dung theo template Buổi 9";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const args = parseArgs(process.argv.slice(2));
if(!args.input){
  console.error("Usage: node scripts/import-lesson-md.js <lesson.md> --day 13 [--write]");
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), args.input);
const markdown = fs.readFileSync(inputPath, "utf8");
const parsed = parseLessonMarkdown(markdown, Number(args.day || 0), inputPath);
const normalized = normalizeLessonToBuoi9Architecture(parsed);
const warnings = validateLessonArchitecture(normalized);

printImportReport(parsed, normalized, warnings);

if(args.write){
  if(!normalized.id){
    console.error("Cannot write: pass --day <number> or include lessonNumber/dayNumber in metadata.");
    process.exit(1);
  }
  writeImportedTemplate(parsed, normalized.id);
}

function parseArgs(argv){
  const result = { input: "", day: "", write: false };
  for(let i=0; i<argv.length; i++){
    const arg = argv[i];
    if(arg === "--day" || arg === "--lesson" || arg === "--id") result.day = argv[++i];
    else if(arg === "--write") result.write = true;
    else if(!result.input) result.input = arg;
  }
  return result;
}

function parseLessonMarkdown(markdownText, dayNumber, sourcePath){
  const titleMatch = markdownText.match(/^#\s*(.+)$/m);
  const titleFromH1 = titleMatch?.[1]?.replace(/^Buổi\s*\d+\s*[:.-]?\s*/i, "").trim();
  const sections = splitSections(markdownText);
  const meta = parseKeyValues(sections.meta || "");
  const raw = {
    id: dayNumber || Number(meta.ID || meta.Id || meta.lessonNumber || meta.dayNumber || 0),
    lessonNumber: dayNumber || Number(meta.lessonNumber || meta.dayNumber || 0),
    dayNumber: dayNumber || Number(meta.dayNumber || meta.lessonNumber || 0),
    unit: meta.Unit || meta.unit || "",
    title: meta["Title VI"] || meta.titleVi || meta.Title || titleFromH1 || PLACEHOLDER,
    titleVi: meta["Title VI"] || meta.titleVi || titleFromH1 || PLACEHOLDER,
    titleEn: meta["Title EN"] || meta.titleEn || meta.Subtitle || meta.subtitle || "",
    cefrLevel: meta.cefrLevel || meta.CEFR || "A1",
    mainTopic: meta.Topic || meta.mainTopic || titleFromH1 || PLACEHOLDER,
    grammarFocus: meta["Grammar focus"] || meta.grammarFocus || "",
    objectives: parseNumberedList(sections.objectives || sections.intro || ""),
    importStatus: "markdown",
    importedFrom: sourcePath,
    webImportNotes: []
  };

  for(const section of sections.ordered){
    switch(section.id){
      case "intro":
        raw.objectives = parseNumberedList(section.body);
        break;
      case "review":
        raw.review = parseReview(section.body);
        break;
      case "video":
        raw.video = parseVideo(section.body, raw.title);
        break;
      case "vocab":
        raw.vocabulary = parseVocabulary(section.body);
        raw.vocabGroups = inferVocabGroups(raw.vocabulary);
        break;
      case "vocab_match":
        break;
      case "grammar":
        raw.grammar = parseGrammar(section.body, raw.grammarFocus);
        break;
      case "listen_pick":
        raw.listenPick = { questions: parseQuestions(section.body) };
        break;
      case "listen_quiz":
        raw.listening = { questions: parseQuestions(section.body).map(q => ({ ...q, audio: q.audio || q.q })) };
        break;
      case "translate":
        raw.translation = { sentences: parseTranslations(section.body) };
        break;
      case "dialogue_video":
        raw.dialogueVideo = { ...(raw.dialogueVideo || {}), ...parseDialogueVideo(section.body, raw.title) };
        break;
      case "dialogue_video_quiz":
        raw.dialogueVideo = { ...(raw.dialogueVideo || {}), listenPickLine: parseDialogueListen(section.body) };
        break;
      case "dialogue_video_order":
        raw.dialogueVideo = { ...(raw.dialogueVideo || {}), fillConversation: parseDialogueCloze(section.body) };
        break;
      case "speaking":
        raw.speaking = { turns: parseSpeakingTurns(section.body) };
        break;
      case "minitest":
        raw.minitest = parseQuestions(section.body);
        break;
      case "mindmap":
        raw.mindmap = parseMindmap(section.body, raw.title);
        break;
      case "homework":
        raw.homeworkRich = parseHomework(section.body, raw.id);
        raw.homework = raw.homeworkRich.tasks.map(task => task.desc);
        break;
      case "technical_notes":
        raw.webImportNotes.push(section.body.trim());
        break;
      default:
        if(section.heading) raw.webImportNotes.push(`Extra section "${section.heading}" mapped to technical notes.`);
        break;
    }
  }
  return raw;
}

function splitSections(markdownText){
  const result = { ordered: [] };
  const headingRe = /^##\s+(.+)$/gm;
  const matches = [...markdownText.matchAll(headingRe)];
  if(!matches.length) {
    result.meta = markdownText;
    return result;
  }
  result.meta = markdownText.slice(0, matches[0].index);
  for(let i=0; i<matches.length; i++){
    const heading = matches[i][1].trim();
    const start = matches[i].index + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i+1].index : markdownText.length;
    const id = canonicalSectionIdFromHeading(heading);
    const item = { id, heading, body: markdownText.slice(start, end).trim() };
    result.ordered.push(item);
    if(id === "vocab") result.vocab = item.body;
    if(id === "review") result.review = item.body;
    if(id === "intro") result.intro = item.body;
    if(/objectives?/i.test(heading)) result.objectives = item.body;
  }
  return result;
}

function parseKeyValues(text){
  const values = {};
  for(const line of text.split(/\r?\n/)){
    const match = line.match(/^\s*-?\s*([^:]+):\s*(.+)\s*$/);
    if(match) values[match[1].trim()] = match[2].trim();
  }
  return values;
}

function parseNumberedList(text){
  const items = text.split(/\r?\n/)
    .map(line => line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);
  return items.length ? items : [PLACEHOLDER];
}

function parseVocabulary(text){
  const rows = parseTable(text);
  if(rows.length){
    return rows.map((row, i) => ({
      en: row.EN || row.en || row.Word || row.word || row.English || row.english || PLACEHOLDER,
      vi: row.VI || row.vi || row.Vietnamese || row.vietnamese || row.Meaning || row.meaning || PLACEHOLDER,
      ipa: row.IPA || row.ipa || "",
      img: row.Emoji || row.emoji || row.Icon || row.icon || "📝",
      example: row.Example || row.example || "",
      group: row.Group || row.group || (i % 2 === 0 ? "mainVocabulary" : "lessonPhrases")
    }));
  }
  return text.split(/\r?\n/)
    .map(line => line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim())
    .filter(line => line.includes("|"))
    .map((line, i) => {
      const [en, vi, img="", ipa="", example=""] = line.split("|").map(x => x.trim());
      return { en, vi, img: img || "📝", ipa, example, group: i % 2 === 0 ? "mainVocabulary" : "lessonPhrases" };
    });
}

function inferVocabGroups(vocabulary){
  const groups = [...new Set(vocabulary.map(v => v.group).filter(Boolean))];
  if(groups.length >= 2) return { [groups[0]]: groups[0], [groups[1]]: groups[1] };
  return {
    mainVocabulary: "Từ vựng chính của bài",
    lessonPhrases: "Expressions / dialogue keywords / grammar phrases"
  };
}

function parseVideo(text, lessonTitle){
  const kv = parseKeyValues(text);
  return {
    title: kv.Title || kv.title || lessonTitle,
    channel: kv.Channel || kv.Source || kv.source || "YouTube",
    duration: kv.Duration || kv.duration || "2-5 phút",
    embedUrl: kv.embedUrl || kv.URL || kv.Url || kv.url || "",
    watchUrl: kv.watchUrl || kv.URL || kv.Url || kv.url || "",
    fallbackSearchUrl: kv.fallbackSearchUrl || "",
    description: kv.Description || kv.description || text.split(/\r?\n/).find(Boolean) || PLACEHOLDER,
    scenes: parseScenes(text),
    questions: parseQuestions(text)
  };
}

function parseReview(text){
  const kv = parseKeyValues(text);
  const game1Text = findSubsection(text, [/game\s*1/i, /nghe\s*chon\s*tu/i, /nghe\s*chọn\s*từ/i]);
  const game2Text = findSubsection(text, [/game\s*2/i, /quiz\s*bomb/i]);
  const questions = parseQuestions(game2Text || text);
  const vocab = parseVocabulary(game1Text || text);
  return {
    title: kv.Title || kv.title || "Ôn bài cũ",
    topic: kv.Topic || kv.topic || "",
    questions: questions.map(q => ({ q: q.q, answer: q.options?.[q.answer] || "" })),
    structures: parseNumberedList(text).filter(line => /is|are|do|does|there|have|has|can|like/i.test(line)).slice(0, 6),
    reviewGames: {
      title: kv.Title || kv.title || "Ôn bài cũ",
      intro: kv.Intro || kv.intro || "Ôn lại kiến thức buổi trước.",
      vocabulary: vocab.map((item, i) => ({
        en: item.en,
        vi: item.vi,
        img: item.img,
        ipa: item.ipa,
        options: [item.vi, PLACEHOLDER, `Option ${i + 2}`, `Option ${i + 3}`],
        answer: 0
      })),
      quizBomb: { questions }
    }
  };
}

function parseScenes(text){
  const sceneLines = text.split(/\r?\n/)
    .filter(line => /scene|cảnh|canh/i.test(line))
    .map(line => ({ label: line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim() }));
  return sceneLines.length ? sceneLines : [{ label: PLACEHOLDER }];
}

function parseGrammar(text, title){
  const rows = parseTable(text);
  const structures = rows.length ? rows.map((row, i) => ({
    num: i + 1,
    pattern: row.Pattern || row.pattern || row.Formula || row.formula || row.Title || row.title || PLACEHOLDER,
    vi: row.VI || row.vi || row.Meaning || row.meaning || PLACEHOLDER,
    style: row.Explanation || row.explanation || "Cấu trúc chính",
    example: row.Example || row.example || PLACEHOLDER,
    exampleVi: row.ExampleVi || row.exampleVi || row["Example VI"] || PLACEHOLDER,
    context: row.Context || row.context || PLACEHOLDER,
    commonMistake: row.Mistake || row.mistake || row["Common mistake"] || PLACEHOLDER
  })) : [];
  return {
    title: title || "Ngữ pháp",
    intro: text.split(/\r?\n/).find(Boolean) || PLACEHOLDER,
    structures,
    commonQA: parseQA(text)
  };
}

function parseQuestions(text){
  const rows = parseTable(text);
  if(rows.length){
    return rows.map((row, i) => tableRowToQuestion(row, i));
  }
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  return lines.filter(line => line.includes("|")).map((line, i) => {
    const parts = line.replace(/^\d+[.)]\s*/, "").split("|").map(x => x.trim());
    const [q, a, b, c, d, answerRaw] = parts;
    const answer = parseAnswerIndex(answerRaw);
    return { q, options: [a,b,c,d].filter(Boolean), answer, audio: "" };
  });
}

function tableRowToQuestion(row, i){
  const q = row.Q || row.Question || row.q || row.question || `Q${i+1}`;
  const options = [row.A, row.B, row.C, row.D]
    .filter(value => value != null && value !== "")
    .map(String);
  const answer = parseAnswerIndex(row.Answer || row.answer || row.answerKey);
  return { q, options, answer, audio: row.Audio || row.audio || row.audioText || "", explanation: row.Explanation || row.explanation || "" };
}

function parseAnswerIndex(value){
  if(value == null) return 0;
  const text = String(value).trim();
  if(/^[ABCD]$/i.test(text)) return text.toUpperCase().charCodeAt(0) - 65;
  const n = Number(text);
  return Number.isFinite(n) ? Math.max(0, Math.min(3, n > 0 ? n - 1 : n)) : 0;
}

function parseTranslations(text){
  const rows = parseTable(text);
  if(rows.length){
    return rows.map((row, i) => ({
      vi: row.VI || row.vi || row.Vietnamese || row.vietnamese || "",
      en: row.EN || row.en || row.English || row.english || "",
      direction: row.Direction || row.direction || (i % 5 === 4 ? "en-vi" : "vi-en")
    }));
  }
  return text.split(/\r?\n/)
    .map(line => line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim())
    .filter(line => line.includes("|"))
    .map((line, i) => {
      const [vi, en, direction] = line.split("|").map(x => x.trim());
      return { vi, en, direction: direction || (i % 5 === 4 ? "en-vi" : "vi-en") };
    });
}

function parseDialogueVideo(text, lessonTitle){
  const kv = parseKeyValues(text);
  const transcriptText = findSubsection(text, [/transcript/i, /song\s*ngu/i, /song\s*ngữ/i]);
  const keywordText = findSubsection(text, [/tu\s*khoa/i, /từ\s*khóa/i, /keyword/i]);
  const questionText = findSubsection(text, [/cau\s*hoi/i, /câu\s*hỏi/i, /comprehension/i, /hieu\s*bai/i, /hiểu\s*bài/i]);
  return {
    title: kv.Title || kv.title || "Video hội thoại",
    description: kv.Description || kv.description || PLACEHOLDER,
    embedUrl: kv.embedUrl || kv.URL || kv.url || "",
    watchUrl: kv.watchUrl || kv.URL || kv.url || "",
    fallbackSearchUrl: kv.fallbackSearchUrl || "",
    transcript: parseTranscript(transcriptText || text),
    keywords: parseVocabulary(keywordText || "").slice(0, 12),
    comprehension: parseQuestions(questionText || text)
  };
}

function parseTranscript(text){
  const rows = parseTable(text);
  if(rows.length && Object.keys(rows[0]).some(key => /speaker|english|vietnamese|en|vi/i.test(key))){
    return rows.map((row, i) => ({
      speaker: row.Speaker || row.speaker || (i % 2 ? "B" : "A"),
      en: row.EN || row.en || row.English || row.english || row.Text || row.text || PLACEHOLDER,
      vi: row.VI || row.vi || row.Vietnamese || row.vietnamese || PLACEHOLDER,
      keyword: row.Keyword || row.keyword || "",
      audioText: row.Audio || row.audio || row.audioText || row.EN || row.en || row.English || row.english || ""
    }));
  }
  return text.split(/\r?\n/)
    .map(line => line.match(/^\s*(A|B|Teacher|Student|AI|You|[A-Za-z]+)\s*:\s*(.+?)(?:\s*\|\s*(.+))?$/))
    .filter(Boolean)
    .map(match => ({ speaker: match[1], en: match[2].trim(), vi: (match[3] || PLACEHOLDER).trim(), audioText: match[2].trim() }));
}

function parseDialogueListen(text){
  return parseQuestions(text).map(q => ({ prompt: q.audio || q.q, audioText: q.audio || q.q, options: q.options, answer: q.answer }));
}

function parseDialogueCloze(text){
  const wordBankMatch = text.match(/word\s*bank\s*:\s*(.+)$/im);
  const wordBank = wordBankMatch ? wordBankMatch[1].split(/[,|]/).map(x => x.trim()).filter(Boolean) : [];
  const lines = text.split(/\r?\n/)
    .filter(line => /\[\[.+?\]\]/.test(line))
    .filter(line => !/^\s*(?:\*|_)?\s*ghi chú dev/i.test(line))
    .map((line, i) => ({ speaker: i % 2 ? "B" : "A", text: line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim() }));
  return lines.length ? [{ lines, wordBank, explanations: [] }] : [];
}

function parseSpeakingTurns(text){
  const rows = parseTable(text);
  if(rows.length){
    return rows.map((row, i) => ({
      id: i + 1,
      ai: { textEn: row.Teacher || row.teacher || row.AI || row.ai || row.Question || row.question || PLACEHOLDER },
      user: {
        formula: row.Formula || row.formula || PLACEHOLDER,
        sampleEn: row.Sample || row.sample || row.Answer || row.answer || PLACEHOLDER,
        sampleVn: row.SampleVi || row.sampleVi || row.VI || row.vi || "",
        criteria: ["grammar", "vocabulary", "pronunciation/speaking"]
      }
    }));
  }
  return [];
}

function parseMindmap(text, lessonTitle){
  const rows = parseTable(text);
  const branches = rows.map(row => ({
    icon: row.Icon || row.icon || "",
    label: row.Label || row.label || row.Branch || row.branch || PLACEHOLDER,
    sub: row.Sub || row.sub || "",
    items: String(row.Items || row.items || "").split(/[,;]/).map(x => x.trim()).filter(Boolean)
  }));
  return { type: "structured", center: lessonTitle, branches };
}

function parseHomework(text, id){
  const rows = parseTable(text);
  const tasks = rows.length ? rows.map((row, i) => ({
    icon: row.Icon || row.icon || (i === 0 ? "✍️" : "🎙️"),
    title: row.Title || row.title || `Bài tập ${i + 1}`,
    badge: row.Badge || row.badge || (i < 2 ? "Bắt buộc" : "Luyện thêm"),
    desc: row.Desc || row.desc || row.Description || row.description || PLACEHOLDER,
    items: String(row.Items || row.items || "").split(/[,;]/).map(x => x.trim()).filter(Boolean),
    sample: row.Sample || row.sample || "",
    rubric: row.Rubric || row.rubric || ""
  })) : parseNumberedList(text).map((item, i) => ({
    icon: i === 0 ? "✍️" : "🎙️",
    title: i === 0 ? "Bài viết" : "Bài nói / ghi âm / video",
    badge: "Bắt buộc",
    desc: item,
    items: [item],
    sample: "",
    rubric: ""
  }));
  return {
    title: `Homework - Buổi ${id || "N"}`,
    submit: "Nộp bài qua nhóm lớp.",
    deadline: "Trước buổi học tiếp theo",
    tasks
  };
}

function parseQA(text){
  return text.split(/\r?\n/)
    .map(line => line.match(/(.+?)\s*(?:->|→)\s*(.+)/))
    .filter(Boolean)
    .slice(0, 6)
    .map(match => ({ q: match[1].replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim(), a: match[2].trim() }));
}

function findSubsection(text, patterns){
  const headingRe = /^###\s+(.+)$/gm;
  const matches = [...text.matchAll(headingRe)];
  for(let i=0; i<matches.length; i++){
    const heading = matches[i][1].trim();
    const normalizedHeading = stripAccents(heading).toLowerCase();
    if(!patterns.some(pattern => pattern.test(normalizedHeading) || pattern.test(heading.toLowerCase()))) continue;
    const start = matches[i].index + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    return text.slice(start, end).trim();
  }
  return "";
}

function stripAccents(input){
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function parseTable(text){
  const tableLines = text.split(/\r?\n/).filter(line => /^\s*\|.+\|\s*$/.test(line));
  if(tableLines.length < 2) return [];
  const header = tableLines[0].split("|").slice(1, -1).map(cell => cell.trim());
  const headerKey = header.join("|").toLowerCase();
  const rows = tableLines.slice(2).filter(line => {
    if(/^\s*\|?\s*:?-+:?\s*/.test(line)) return false;
    const cells = line.split("|").slice(1, -1).map(cell => cell.trim());
    return cells.join("|").toLowerCase() !== headerKey;
  });
  return rows.map(line => {
    const cells = line.split("|").slice(1, -1).map(cell => cell.trim());
    return Object.fromEntries(header.map((key, i) => [key, cells[i] || ""]));
  });
}

function printImportReport(raw, normalized, warnings){
  console.log(`Imported Buổi ${normalized.id || "?"}: ${normalized.title}`);
  console.log(`Canonical sections: ${normalized.sectionFlow.join(" -> ")}`);
  if(warnings.length){
    console.warn("\nWarnings:");
    for(const warning of warnings) console.warn(`- ${warning}`);
  } else {
    console.log("\nNo architecture warnings.");
  }
  if(raw.webImportNotes?.length){
    console.warn("\nExtra/technical notes:");
    for(const note of raw.webImportNotes) console.warn(`- ${note}`);
  }
}

function writeImportedTemplate(raw, id){
  const lessonsPath = path.join(repoRoot, "src", "features", "lessons", "legacyLessonsData.js");
  const source = fs.readFileSync(lessonsPath, "utf8");
  const endMarker = "// </lesson-import-overrides>";
  if(!source.includes(endMarker)){
    console.error("Cannot write: import override marker not found in legacyLessonsData.js");
    process.exit(1);
  }
  const block = [
    `// <imported-lesson-${id}>`,
    `const LESSON_${id}_IMPORTED_TEMPLATE = ${JSON.stringify(toTemplatePayload(raw), null, 2)};`,
    `applyExpandedLessonTemplate(${id}, LESSON_${id}_IMPORTED_TEMPLATE);`,
    `// </imported-lesson-${id}>`
  ].join("\n");
  const re = new RegExp(`\\n// <imported-lesson-${id}>[\\s\\S]*?// </imported-lesson-${id}>`, "m");
  const next = re.test(source)
    ? source.replace(re, `\n${block}`)
    : source.replace(endMarker, `${block}\n${endMarker}`);
  fs.writeFileSync(lessonsPath, next, "utf8");
  console.log(`\nUpdated legacyLessonsData.js with imported Buổi ${id}.`);
}

function toTemplatePayload(raw){
  const {
    id, lessonNumber, dayNumber, importedFrom, webImportNotes, ...payload
  } = raw;
  return payload;
}
