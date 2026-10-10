# ForYui

## Project structure

- `src/App.tsx` composes the page and manages page-level state.
- `src/components/` contains reusable interface components and interactive scenes.
- `src/data/` contains static page content such as the hourly schedule.
- `src/hooks/` contains reusable React hooks.
- `src/utils/` contains shared utility functions.
- `src/index.css` contains the global styles.

## Conventions

- Use TypeScript and React function components.
- Keep reusable presentation in `src/components/`.
- Keep static content separate from page rendering.
- Run `pnpm build` to verify production changes.
