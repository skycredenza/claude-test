// app.js — Main game controller, level select, navigation

const App = (() => {
  // Track completed levels and scores
  const completedLevels = {};
  let currentLevel = null;
  let currentTasks = [];
  let currentTaskIndex = 0;
  let comboRevealed = false;

  // DOM references
  const $ = id => document.getElementById(id);

  function init() {
    loadProgress();
    renderLevelSelect();
    showScreen('home-screen');

    // Prevent browser shortcuts from firing during gameplay
    document.addEventListener('keydown', e => {
      if (currentLevel && (currentLevel.type === 'A' || currentLevel.type === 'B')) {
        e.preventDefault();
      }
    });
  }

  // --- Screen management ---
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = $(id);
    if (screen) screen.classList.add('active');
  }

  // --- Level Select ---
  function renderLevelSelect() {
    const grid = $('level-grid');
    grid.innerHTML = '';

    LEVELS.forEach(level => {
      const btn = document.createElement('button');
      btn.className = `level-card level-card-${level.color}`;

      const completed = completedLevels[level.number];
      if (completed !== undefined) {
        btn.classList.add('completed');
      }

      const scoreText = completed !== undefined ? `Best: ${completed}/100` : '';

      btn.innerHTML = `
        <div class="level-number">Level ${level.number}</div>
        <div class="level-label">${level.label}</div>
        <div class="level-type">${level.name}</div>
        <div class="level-score">${scoreText}</div>
      `;

      btn.addEventListener('click', () => startLevel(level));
      grid.appendChild(btn);
    });
  }

  // --- Persistence ---
  function saveProgress() {
    try {
      localStorage.setItem('quickkey_progress', JSON.stringify(completedLevels));
    } catch (e) { /* localStorage may be unavailable */ }
  }

  function loadProgress() {
    try {
      const data = localStorage.getItem('quickkey_progress');
      if (data) {
        Object.assign(completedLevels, JSON.parse(data));
      }
    } catch (e) { /* ignore */ }
  }

  // --- Start a level ---
  function startLevel(level) {
    currentLevel = level;
    currentTaskIndex = 0;
    Scoring.resetResults();
    Keyboard.reset();

    // Render keyboard
    Keyboard.render($('keyboard-container'));

    // Update level indicator
    $('game-level-label').textContent = `Level ${level.number}: ${level.label}`;
    $('game-task-counter').textContent = '';
    $('game-timer-display').textContent = '';

    showScreen('game-screen');

    if (level.type === 'A' || level.type === 'B') {
      currentTasks = generateKeyboardTasks(level);
      Keyboard.setInteractive(true);
      startKeyboardTask();
    } else {
      currentTasks = generatePracticeTasks(level);
      Keyboard.setInteractive(false);
      startPracticeTask();
    }
  }

  // --- Type A & B: Keyboard-based levels ---
  function startKeyboardTask() {
    if (currentTaskIndex >= currentTasks.length) {
      finishLevel();
      return;
    }

    const task = currentTasks[currentTaskIndex];
    const content = $('browser-content');
    comboRevealed = false;

    $('game-task-counter').textContent = `Task ${currentTaskIndex + 1} / ${currentTasks.length}`;
    Keyboard.clearHighlights();

    if (currentLevel.type === 'A') {
      // Type A: Show task name AND combo
      content.innerHTML = `
        <div class="task-prompt">
          <div class="task-action">${task.name}</div>
          <div class="task-combo">${task.display}</div>
        </div>
      `;
      Keyboard.highlightKeys(task.keys);
    } else {
      // Type B: Show task name only, reveal combo after 10 seconds
      content.innerHTML = `
        <div class="task-prompt">
          <div class="task-action">${task.name}</div>
          <div class="task-combo task-combo-hidden" id="combo-reveal">?</div>
          <div class="countdown-display" id="countdown-display">10</div>
        </div>
      `;

      Scoring.startCountdown(10,
        (remaining) => {
          const el = $('countdown-display');
          if (el) el.textContent = remaining > 0 ? remaining : '';
        },
        () => {
          // Reveal
          comboRevealed = true;
          const el = $('combo-reveal');
          if (el) {
            el.textContent = task.display;
            el.classList.remove('task-combo-hidden');
            el.classList.add('task-combo-revealed');
          }
          Keyboard.highlightKeys(task.keys);
        }
      );
    }

    // Start scoring timer
    Scoring.startTimer((elapsed) => {
      $('game-timer-display').textContent = `${elapsed}s`;
    });

    // Listen for combo
    Keyboard.onCombo((pressedKeys) => {
      checkKeyboardCombo(pressedKeys, task);
    });
  }

  function checkKeyboardCombo(pressedKeys, task) {
    const expected = task.keys.map(k => k.toUpperCase());
    const pressed = pressedKeys.map(k => k.toUpperCase());

    // Sort both for comparison (order of modifiers doesn't matter)
    const match = expected.length === pressed.length &&
      expected.sort().join('+') === pressed.sort().join('+');

    const elapsed = Scoring.stopTimer();
    Scoring.stopCountdown();

    if (match) {
      Keyboard.flashCorrect();
      const points = Scoring.calculatePoints(elapsed);
      const answeredBeforeReveal = currentLevel.type === 'B' && !comboRevealed;

      showFeedback(true, answeredBeforeReveal);

      Scoring.recordTask({
        name: task.name,
        elapsed,
        points,
        correct: true,
        answeredBeforeReveal,
      });

      setTimeout(() => {
        currentTaskIndex++;
        startKeyboardTask();
      }, 800);
    } else {
      Keyboard.flashIncorrect();
      showFeedback(false, false);

      // Record 0 points for wrong answer and move on
      Scoring.recordTask({
        name: task.name,
        elapsed,
        points: 0,
        correct: false,
      });

      setTimeout(() => {
        currentTaskIndex++;
        startKeyboardTask();
      }, 1000);
    }
  }

  // --- Type C & D: Real Practice levels ---
  function startPracticeTask() {
    if (currentTaskIndex >= currentTasks.length) {
      finishLevel();
      return;
    }

    const task = currentTasks[currentTaskIndex];
    const content = $('browser-content');

    $('game-task-counter').textContent = `Task ${currentTaskIndex + 1} / ${currentTasks.length}`;
    $('game-timer-display').textContent = '';
    Keyboard.clearHighlights();

    let hintsHtml = '';
    if (currentLevel.type === 'C') {
      // Show hints
      hintsHtml = `
        <div class="practice-hints">
          ${task.shortcuts.map(s => `<span class="hint-chip">${s.display} <small>(${s.name})</small></span>`).join(' ')}
        </div>
      `;
    }

    content.innerHTML = `
      <div class="practice-task">
        <div class="practice-instruction">${task.description}</div>
        ${hintsHtml}
        <div class="practice-controls">
          <button class="btn-start-timer" id="btn-start-timer">Start Timer</button>
          <button class="btn-done" id="btn-done" style="display:none;">Done!</button>
          <div class="practice-elapsed" id="practice-elapsed"></div>
        </div>
      </div>
    `;

    $('btn-start-timer').addEventListener('click', () => {
      $('btn-start-timer').style.display = 'none';
      $('btn-done').style.display = 'inline-block';

      Scoring.startTimer((elapsed) => {
        $('practice-elapsed').textContent = `${elapsed}s`;
        $('game-timer-display').textContent = `${elapsed}s`;
      });
    });

    $('btn-done').addEventListener('click', () => {
      const elapsed = Scoring.stopTimer();
      const points = Scoring.calculatePoints(elapsed);

      Scoring.recordTask({
        name: `Task ${currentTaskIndex + 1}`,
        elapsed,
        points,
        correct: true,
      });

      showFeedback(true, false);

      setTimeout(() => {
        currentTaskIndex++;
        startPracticeTask();
      }, 600);
    });
  }

  // --- Feedback ---
  function showFeedback(correct, early) {
    const el = $('feedback-overlay');
    if (correct) {
      el.className = 'feedback-overlay feedback-correct';
      if (early) {
        el.innerHTML = '<span>&#10003;</span> Nice, you remembered!';
      } else {
        el.innerHTML = '<span>&#10003;</span> Correct!';
      }
    } else {
      el.className = 'feedback-overlay feedback-incorrect';
      el.innerHTML = '<span>&#10007;</span> Wrong combo';
    }
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 700);
  }

  // --- Finish level ---
  function finishLevel() {
    Keyboard.reset();
    Keyboard.setInteractive(false);
    Scoring.stopTimer();
    Scoring.stopCountdown();

    const content = $('browser-content');
    content.innerHTML = '';

    // Hide game UI elements
    $('game-task-counter').textContent = '';
    $('game-timer-display').textContent = '';

    Scoring.renderResultsScreen(content, currentLevel.number, (totalScore) => {
      // Save score
      const prev = completedLevels[currentLevel.number];
      if (prev === undefined || totalScore > prev) {
        completedLevels[currentLevel.number] = totalScore;
      }
      saveProgress();
      currentLevel = null;
      renderLevelSelect();
      showScreen('home-screen');
    });
  }

  // --- Back button ---
  function goHome() {
    Scoring.stopTimer();
    Scoring.stopCountdown();
    Keyboard.reset();
    currentLevel = null;
    renderLevelSelect();
    showScreen('home-screen');
  }

  return { init, goHome };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
