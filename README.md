# TaskFlow Workspace

TaskFlow Workspace is a responsive project dashboard built with Next.js 16, React 19, HeroUI, and `next-themes`.

It includes:

- a polished home dashboard
- a task board with summary stats
- a task creation modal powered by a server action
- light and dark theme support
- shared navigation and footer

## Preview

Main routes:

- `/` - home dashboard
- `/tasks` - task board
- `/hero` - small HeroUI demo page

## Features

- Sprint overview with progress ring, metric cards, and focus task
- Task board header with progress summary and quick add-task action
- Responsive task cards with status, priority, assignee, and progress
- Add Task modal form with light/dark styling
- Shared navbar, footer, and theme switch

## Tech Stack

- Next.js 16
- React 19
- HeroUI 3
- Tailwind CSS 4
- `next-themes`

## Project Structure

```text
src/
  app/
    data/task.json
    lib/actions.js
    lib/tasks.js
    providers/NextThemeProvider.jsx
    hero/page.jsx
    tasks/page.jsx
    globals.css
    layout.js
    page.js
  component/
    AddTask.jsx
    Footer.jsx
    Navbar.jsx
    TaskCard.jsx
    ThemeSwitch.jsx
```

## How It Works

### Home Page

The home page in [src/app/page.js](/c:/Users/nafiz/Desktop/heroui-server/src/app/page.js) shows:

- top-level sprint summary
- recent work items
- current focus task
- metric cards and progress insights

### Task Board

The task board in [src/app/tasks/page.jsx](/c:/Users/nafiz/Desktop/heroui-server/src/app/tasks/page.jsx) shows:

- board-level stats
- sprint progress
- add-task modal trigger
- task cards rendered from local task data

### Task Data

Seed tasks are loaded from [src/app/data/task.json](/c:/Users/nafiz/Desktop/heroui-server/src/app/data/task.json).

Helpers:

- [src/app/lib/tasks.js](/c:/Users/nafiz/Desktop/heroui-server/src/app/lib/tasks.js) reads and mutates the in-memory task list
- [src/app/lib/actions.js](/c:/Users/nafiz/Desktop/heroui-server/src/app/lib/actions.js) exposes the server action used by the modal form

Important note:

- new tasks are appended in memory only
- data is not persisted to a database or file
- restarting the app resets newly added tasks

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Code Review Notes

During review, these issues stood out:

1. Task creation is not persistent.
   [src/app/lib/tasks.js](/c:/Users/nafiz/Desktop/heroui-server/src/app/lib/tasks.js) mutates imported JSON in memory, so added tasks disappear after restart.

2. Build is environment-sensitive because of Google font fetching.
   [src/app/layout.js](/c:/Users/nafiz/Desktop/heroui-server/src/app/layout.js) uses `next/font/google` with Geist and Geist Mono. In restricted/offline environments, `npm run build` can fail because fonts cannot be fetched.

3. Local live preview could not be fully verified from this environment.
   I was able to review the codebase and responsive CSS, but direct live browser inspection was blocked here because local dev boot returned `spawn EPERM`, and production build was blocked by font fetch failure.

## UI Architecture

- [src/app/layout.js](/c:/Users/nafiz/Desktop/heroui-server/src/app/layout.js) provides the shared app shell
- [src/component/Navbar.jsx](/c:/Users/nafiz/Desktop/heroui-server/src/component/Navbar.jsx) handles navigation and theme switch
- [src/component/Footer.jsx](/c:/Users/nafiz/Desktop/heroui-server/src/component/Footer.jsx) renders the shared footer
- [src/component/AddTask.jsx](/c:/Users/nafiz/Desktop/heroui-server/src/component/AddTask.jsx) renders the add-task modal
- [src/component/TaskCard.jsx](/c:/Users/nafiz/Desktop/heroui-server/src/component/TaskCard.jsx) renders individual task cards
- [src/app/globals.css](/c:/Users/nafiz/Desktop/heroui-server/src/app/globals.css) contains the main visual system and responsive rules

## Suggested Next Steps

- Persist tasks with a database or API route
- Add form validation and user feedback for failed submissions
- Add task edit/delete functionality
- Add board filtering by status, priority, or assignee
- Replace remote Google font dependency if offline or restricted builds matter
