# Jobap Frontend

React + Vite + TypeScript, styled with Tailwind (layout/utilities) and MUI (components), following Google's Material Design language (Google Sans/Roboto type, Google color palette, rounded 12px shapes, soft elevation).

## Setup

1. **Install dependencies**
  ```bash
  npm install
  ```

2. **Configure environment**
  ```bash
  cp .env.example .env
  ```
  `VITE_API_URL` should point at the Jobap backend (default `http://localhost:3001`).

3. **Run the dev server**
  ```bash
  npm run dev
  ```
  App runs at http://localhost:5173. Make sure the backend (and its `/docs` Swagger) is running first.

## How Tailwind + MUI coexist
Tailwind's `preflight` (CSS reset) is disabled in `tailwind.config.js` so it doesn't fight with MUI's `CssBaseline`. MUI's theme (`src/theme.ts`) owns colors/typography/shape; Tailwind utility classes are available for quick layout tweaks (spacing, flex, grid) if you want to use them alongside MUI's `sx` prop.