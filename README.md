# Quick Key Quest

A web-based keyboard shortcuts training game that teaches PC keyboard shortcuts through 8 progressive levels.

## How to Play

Visit the hosted game on GitHub Pages or open `index.html` locally in a browser.

### Level Types

- **Learn Mode** (Levels 1, 5): See the shortcut name and key combination, then click the correct keys on the virtual keyboard.
- **Recall Mode** (Levels 2, 6): The shortcut name is shown but the key combo is hidden for 10 seconds. Try to remember it!
- **Real Practice with Hints** (Levels 3, 7): Follow real-world task prompts using your actual keyboard. Shortcut hints are displayed.
- **Real Practice, No Help** (Levels 4, 8): Same as above but without shortcut hints. You're on your own!

### Scoring

- 10 points per task, 10 tasks per level (100 points max per level)
- Lose 1 point for every 10 seconds elapsed
- Minimum score per task: 0

### Shortcuts Covered

**Set A (Levels 1-4):** Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z, Ctrl+A, Ctrl+S, Ctrl+F, Ctrl+P, Ctrl+Y, Win+L

**Set B (Levels 5-8):** Alt+Tab, Win+Shift+S, Win+V, Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Shift+T, Ctrl+Shift+V, Ctrl+N, Ctrl+H

## Tech Stack

- Vanilla HTML, CSS, and JavaScript (no frameworks)
- Single-page application
- GitHub Pages ready

## File Structure

```
Quick-Key-Game/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js          (main game controller)
│   ├── keyboard.js     (virtual keyboard)
│   ├── levels.js       (level/shortcut/task data)
│   └── scoring.js      (timer and scoring)
├── assets/
└── README.md
```

## Design

- All levels are unlocked from the start (free selection)
- Windows 11-inspired visual design with frosted glass panels
- Simulated Chrome browser window with taskbar
- Full QWERTY virtual keyboard with click interaction
- Progress saved to localStorage
