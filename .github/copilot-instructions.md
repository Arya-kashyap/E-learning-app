# Copilot Instructions for E-learning-app

## Project Architecture
- **Monorepo structure**: Two main folders: `client/` (React + Vite frontend) and `server/` (Node.js + Express backend).
- **Frontend**: Uses React (JSX), Vite for dev/build, Tailwind CSS for styling, and ESLint for linting. Key folders:
  - `src/components/` – shared UI components (Navbar, Sidebar, Footer, etc.)
  - `src/pages/` – route-level pages (Home, Login, Signup, CourseDetail, etc.)
  - `src/admin_components/` – admin-specific UI and logic
  - `src/assets/` – static images and icons
- **Backend**: Express app with modular structure:
  - `controllers/` – business logic for admin, user, course
  - `models/` – Mongoose models for MongoDB (admin, user, course, purchase)
  - `routes/` – API route definitions
  - `middleware/` – auth and role-based access control
  - `config.js` – environment/configuration

## Developer Workflows
- **Frontend dev**: Run `npm run dev` in `client/` to start Vite server (HMR enabled).
- **Backend dev**: Run `node index.js` in `server/` to start Express server.
- **Linting**: Run `npx eslint .` in `client/` for code quality checks.
- **Build**: Run `npm run build` in `client/` for production build.
- **No test scripts detected**: Add tests in future if needed.

## Conventions & Patterns
- **React components**: Use functional components and hooks. Organize by feature (admin, shared, pages).
- **API communication**: Frontend calls backend via REST endpoints defined in `server/routes/`.
- **State management**: No Redux/MobX detected; use React state/hooks.
- **Styling**: Tailwind CSS utility classes in JSX.
- **Authentication**: Middleware in backend (`adminMiddle.js`, `userMiddle.js`) for route protection.
- **Error handling**: Centralized in controllers and middleware.

## Integration Points
- **MongoDB**: Models in `server/models/` use Mongoose for schema/queries.
- **Static assets**: Served from `client/public/` and `client/src/assets/`.
- **Environment config**: Use `server/config.js` for secrets, DB URIs, etc.

## Examples
- To add a new course: Update `CreateCourse.jsx` (frontend), `courseController.js` and `courseModel.js` (backend), and `courseRoute.js` (API).
- To protect a route: Add middleware in `server/middleware/` and reference in `routes/`.

## Key Files
- `client/src/App.jsx` – main React app entry
- `client/src/pages/` – main user-facing pages
- `server/index.js` – Express server entry
- `server/controllers/` – business logic
- `server/models/` – data schemas
- `server/routes/` – API endpoints

---
For questions or unclear patterns, ask for clarification or examples from maintainers.
