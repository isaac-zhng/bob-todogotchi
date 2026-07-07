# IBM Bob Todogotchi 🤖

Work can get overwhelming, but the Bob Todogotchi got you covered! Inspired by tamagotchis, Bob requires your completion of tasks to stay happy and healthy. Neglect your to-do list and watch Bob's happiness take a nosedive. Stay on top of things and Bob thrives right alongside you. To extend your streak, add a task on a weekday. Your streak won't reset on weekends, so don't worry about doing work then!

---

## Problem Statement

In modern work environments, task management tools often feel sterile and disconnected from the human experience. Lists pile up, deadlines blur together, and there's little motivation to chip away at them consistently. People know what they need to do — the challenge is actually doing it.

---

## Our Solution

IBM Bob Todogotchi transforms your to-do list into a living companion. Bob is a desktop tamagotchi-style character who lives in the corner of your screen and reacts to how well you're keeping up with your work. Complete tasks and Bob smiles and cheers you on. Let things slide and Bob's happiness drops and his mood turns sour.

This emotional feedback loop creates a low-pressure but surprisingly effective nudge to stay productive — because nobody wants to let Bob down.

### Key Features

- **Bob's Happiness Bar** — Bob's happiness is directly tied to your task completion rate. Keep it green by finishing what you start.
- **Mood Expressions** — Bob's face changes between happy, neutral, and sad depending on how many tasks you've completed.
- **Dynamic Quips** — Bob reacts with contextual messages ("You're crushing it!" or "Please complete some tasks!") that rotate every 8 seconds.
- **Daily, Weekly & Monthly Tasks** — Organise your work into three separate checklists with appropriate deadlines for each timeframe.
- **Deadline Tracking** — Overdue tasks are highlighted so nothing slips through the cracks.
- **Streak Counter** — Bob tracks consecutive days of productivity to help build habits over time.
- **Always-on-Top Popup** — Bob floats in the bottom-right corner of your screen so he's always visible without getting in the way. You can drag him around if needed.
- **Persistent State** — Your tasks and Bob's happiness are saved locally so nothing is lost between sessions.

---

## Tech Stack

- **[Electron](https://www.electronjs.org/)** — Cross-platform desktop app shell
- **[electron-store](https://github.com/sindresorhus/electron-store)** — Lightweight persistent local storage
- **[IBM Carbon Design System](https://carbondesignsystem.com/)** — UI tokens, typography, and component patterns
- **IBM Plex Sans** — IBM's typeface, loaded via Google Fonts

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd bob-tamagotchi/code_files

# Install dependencies
npm install
```

### Running the App

```bash
# Start the app
npm start

# Start in dev mode
npm run dev
```

---

## How It Works

When you open the app, Bob appears as a floating widget in the bottom-right corner of your screen. The main window lets you manage your tasks across daily, weekly, and monthly checklists. Each time you complete a task, Bob's happiness recalculates and his expression updates in real time.

Bob's happiness is calculated as the percentage of tasks completed across all active lists. At over 60% he's happy, between 30–60% he's neutral, and below 30% he's not doing well. Keep those checkmarks coming to keep Bob smiling.

---

## Project Structure

```
bob-tamagotchi/
└── code_files/
    ├── main.js              # Electron main process — window management and IPC
    ├── preload.js           # Context bridge exposing safe IPC APIs to the renderer
    ├── package.json         # Project manifest and npm scripts
    ├── package-lock.json    # Locked dependency tree
    ├── .gitignore
    └── src/
        ├── index.html       # Main app window — task management UI
        ├── popup.html       # Bob's floating widget window
        └── assets/
            ├── bob.svg      # Bob's SVG character (with animatable mouth)
            ├── bob-codemod.png
            └── bob-modes.png
```

---

<p style="text-align:center; font-size:12px; color:#888; border-top:1px solid #e5e7eb; padding-top:8px;">Made with IBM Bob</p>
