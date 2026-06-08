# Fclass — Gateway A1 English Learning App

## Architecture
Single-page app (SPA), **no backend**, vanilla JS + Vite. All data is static.

```
app.js          (~2600 lines) — all render functions, game logic, state, audio
lessons-data.js (~8600 lines) — data for 30 lessons (import { LESSONS })
styles.css      (~2050 lines) — all styling + CSS variables
index.html      (137 lines)   — single HTML shell, loads app.js as ES module
```

## Key Patterns

### State
```js
const STATE = { view, lessonId, sectionIdx, sections[] }
// Game state on window: window._qbData, window._totData, window._soData, etc.
// Progress persisted: localStorage key "gateway_a1_progress_v2"
```

### Section Rendering Pipeline
```js
openLesson(id) → builds STATE.sections[] → renderSection()
renderSection() → switch(section) → stage.innerHTML = html → init*() calls
```
Init hooks in `renderSection()` (app.js ~line 282):
`vocab_match→initMatchGame`, `listen_pick→initListenPick`, `thisOrThat→initThisOrThat`, `sprint→initSprint`, `listen_choose→initLC`, `sent_order→initSO`, `role_play→initRolePlay`, `translate→initTranslate`, `listen_test→initListenTest`

### Global Exposure (ES module fix)
All functions used in inline `onclick=""` must be in the `Object.assign(window, {...})` block at the **bottom of app.js**.

### Text Registry (safe attribute embedding)
```js
const id = regTxt("some text");   // returns "_t123"
// in HTML: onclick="speakById('${id}')"
// TXT_REG[id] holds the actual text
```

### Audio
```js
speak(text, rate=0.9, onend, lang="en-US")  // TTS, pitch 1.05
speakById(id, rate)                          // via TXT_REG
// Voice priority: Google US English > Jenny/Aria Online > female > en-US
```

## Lesson Data Structure
```js
{
  id, unit, title, objectives,
  review, video,
  vocabulary: [{en, vi, img, ipa, group}],
  vocabGroups: {school, personal, furniture, ...},
  grammar: { structures[], commonQA[], formula },
  listening: { transcript, translation, audio, questions[] },
  // Games:
  pointShout: { title, instruction, round1:{words[]}, round2:{questions[]}, scoring },
  thisOrThat:  { title, instruction, rule, questions:[{sentence, answer:'left'|'right'}], bonus },
  mysteryBag:  { title, instruction, items[], adjectives[], dialogue[], scoring },
  quizBomb:    { title, instruction, questions:[{q, options[], answer:index}] },
  speaking, translation, minitest, mindmap, homework,
  skipSections: []   // e.g. ["writing"]
}
```

## CSS Variables (styles.css ~line 10)
`--navy:#1a2a5e`, `--yellow-2:#facc15`, `--green:#16a34a`, `--green-soft:#dcfce7`, `--red:#dc2626`, `--red-soft:#fee2e2`, `--line`, `--bg-soft`, `--yellow-soft`, `--radius`, `--radius-lg`

## Game CSS Classes
- Generic: `.mg-block.warm`, `.game-word`, `.game-question`, `.game-answer`, `.game-scoring`
- Point & Shout: `.ps-word-btn`, `.ps-speak-btn`, `.ps-auto-btn`, `.ps-reveal-btn`, `.ps-answer`
- This or That: `.tot-btn`, `.tot-left/.tot-right`, `.tot-sentence`, `.tot-feedback`, `.tot-ok/.tot-wrong`
- Mystery Bag: `.mb-item-card`, `.mb-item-front/back`, `.mb-adj-chip`, `.mb-dlg-line`
- Quiz Bomb: `.qb-opt-btn`, `.qb-opt-correct/.qb-opt-wrong`, `.qb-timer-bar`, `.qb-score-screen`
- Vocab: `.flashcard`, `.fc-speak`, `.fc-speak-slow` (slow 🐢 button)

## Interactive Games Implemented (Buổi 6 → all lessons)
| Section key | Render fn | Init fn | Notes |
|---|---|---|---|
| `pointShout` | `renderPointShout` | — | clickable words + auto-play + reveal |
| `thisOrThat` | `renderThisOrThat` | `initThisOrThat` | one-at-a-time, GẦN/XA buttons |
| `mysteryBag` | `renderMysteryBag` | — | flip cards + adj audio + dlg audio |
| `quizBomb` | `renderQuizBomb` | `initQuizBomb` | 5s timer, options, score, replay |
| `vocab_match` | `renderVocabMatch` | `initMatchGame` | match EN↔VI pairs |
| `listen_pick` | `renderListenPick` | `initListenPick` | hear→choose game |
| `dictation` | `renderDictation` | — | listen & type |
| `translate` | `renderTranslate` | `initTranslate` | VI→EN with mic |
| `sprint` | `renderSprint` | `initSprint` | lightning round |

## Adding a New Interactive Game
1. Write `renderXxx(l)` → returns HTML with `id="xxxContainer"` shell
2. Write `initXxx(l)` → sets `window._xxxData`, calls render helper
3. Add `if(section==="xxx") initXxx(lesson)` in `renderSection()` (~line 282)
4. Add to `Object.assign(window, {...})` at bottom of app.js
5. Add CSS classes to styles.css (append at end)

## Common Gotchas
- `regTxt()` auto-increments `_txtId` — call it once per text, store the id
- `speechSynthesis.cancel()` is called at start of every `speak()` — this cuts off any current speech
- `quizBombLesson7` is a separate key for Lesson 7's quiz (different render fn)
- `MB_ITEM_MAP` maps Vietnamese item names → English for Mystery Bag audio

## Git
- Main branch: `main`
- Feature branches: `claude/session-*`
- Deploy: Vercel (auto-deploy from main)
