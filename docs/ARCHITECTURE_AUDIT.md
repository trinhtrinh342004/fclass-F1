# Architecture Audit

## Project Type

- Static Vite app with vanilla JavaScript modules.
- Main HTML shell: `index.html`.
- Runtime entry: `src/main.js`.
- Styling: `src/styles/main.css`.
- Supabase: browser client with anon-key auth and RLS-backed profile/admin workflows.

## Current Code Smells

- `src/main.js` is still very large and mixes app state, routing, rendering, games, progress, TTS, and global onclick handlers.
- Legacy lesson data remains large in `src/features/lessons/legacyLessonsData.js`.
- Some UI is still coordinated in `src/features/auth/studentAuthRoutes.js` while services have been extracted.
- Lesson architecture validation is still coupled to the legacy Gateway lesson format.

## Oversized Files

- `src/main.js`: app shell, all section renderers, and minigames.
- `src/styles/main.css`: all page and feature styles.
- `src/features/lessons/legacyLessonsData.js`: imported Gateway lesson content.
- `src/features/lessons/lessonArchitecture.js`: normalization and validation helpers.

## Mixed Logic

- Lesson rendering and progress logic are still in `src/main.js`.
- Auth route rendering remains in one coordinator file, though Supabase calls now route through services.
- Admin table UI remains in the auth route coordinator, while data mutations now live in `src/features/admin/adminStudentsService.js`.

## Proposed Structure

The project now has the target folders in place:

```text
src/app/
src/config/
src/lib/supabase/
src/features/auth/
src/features/admin/
src/features/lessons/
src/features/curriculum/
src/components/
src/styles/
src/utils/
```

Recommended next steps are to move one renderer at a time out of `src/main.js`, beginning with lesson cards, progress, and auth/admin views. Each move should keep `npm run build` passing before the next extraction.
