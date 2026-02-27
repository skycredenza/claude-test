// scoring.js — Timer, points calculation, and results screen

const Scoring = (() => {
  let timerInterval = null;
  let startTime = 0;
  let elapsedSeconds = 0;
  let timerCallback = null; // called every tick with elapsed seconds

  // Per-level results
  let taskResults = [];

  function startTimer(onTick) {
    stopTimer();
    startTime = Date.now();
    elapsedSeconds = 0;
    timerCallback = onTick || null;

    timerInterval = setInterval(() => {
      elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      if (timerCallback) timerCallback(elapsedSeconds);
    }, 250);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    return elapsedSeconds;
  }

  function getElapsed() {
    return Math.floor((Date.now() - startTime) / 1000);
  }

  function calculatePoints(seconds) {
    // 10 points max, lose 1 per 10 seconds, minimum 0
    return Math.max(0, 10 - Math.floor(seconds / 10));
  }

  function resetResults() {
    taskResults = [];
  }

  function recordTask(taskInfo) {
    // taskInfo: { name, elapsed, points, correct (bool), answeredBeforeReveal (bool, optional) }
    taskResults.push(taskInfo);
  }

  function getResults() {
    return [...taskResults];
  }

  function getTotalScore() {
    return taskResults.reduce((sum, t) => sum + t.points, 0);
  }

  function renderResultsScreen(container, levelNumber, onReturn) {
    const total = getTotalScore();
    const maxScore = taskResults.length * 10;

    let grade = '';
    const pct = total / maxScore;
    if (pct >= 0.9) grade = 'Excellent!';
    else if (pct >= 0.7) grade = 'Great job!';
    else if (pct >= 0.5) grade = 'Good effort!';
    else grade = 'Keep practicing!';

    let html = `
      <div class="results-screen">
        <h2>Level ${levelNumber} Complete</h2>
        <div class="results-grade">${grade}</div>
        <div class="results-total">
          <span class="results-score">${total}</span>
          <span class="results-max">/ ${maxScore}</span>
        </div>
        <div class="results-bar-container">
          <div class="results-bar" style="width: ${pct * 100}%"></div>
        </div>
        <table class="results-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Time</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
    `;

    taskResults.forEach((r, i) => {
      const status = r.correct ? '&#10003;' : '&#10007;';
      const statusClass = r.correct ? 'result-correct' : 'result-incorrect';
      const bonusNote = r.answeredBeforeReveal ? ' <span class="bonus-tag">Early!</span>' : '';
      html += `
        <tr class="${statusClass}">
          <td>${i + 1}</td>
          <td>${r.name}${bonusNote}</td>
          <td>${r.elapsed}s</td>
          <td>${r.points}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
        <button class="btn-return" id="btn-return-level-select">Return to Level Select</button>
      </div>
    `;

    container.innerHTML = html;
    document.getElementById('btn-return-level-select').addEventListener('click', () => {
      if (onReturn) onReturn(total);
    });
  }

  // Countdown timer (for Type B levels — 10 second reveal countdown)
  let countdownInterval = null;
  let countdownRemaining = 0;

  function startCountdown(seconds, onTick, onComplete) {
    stopCountdown();
    countdownRemaining = seconds;
    if (onTick) onTick(countdownRemaining);

    countdownInterval = setInterval(() => {
      countdownRemaining--;
      if (onTick) onTick(countdownRemaining);
      if (countdownRemaining <= 0) {
        stopCountdown();
        if (onComplete) onComplete();
      }
    }, 1000);
  }

  function stopCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  return {
    startTimer,
    stopTimer,
    getElapsed,
    calculatePoints,
    resetResults,
    recordTask,
    getResults,
    getTotalScore,
    renderResultsScreen,
    startCountdown,
    stopCountdown,
  };
})();
