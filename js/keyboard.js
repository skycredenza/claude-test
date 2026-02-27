// keyboard.js — Virtual keyboard rendering and click handling

const Keyboard = (() => {
  // Modifier key names
  const MODIFIERS = new Set(['Ctrl', 'Shift', 'Alt', 'Win']);

  // Currently held modifier keys
  let heldModifiers = new Set();
  // Callback when a combo is completed
  let onComboCallback = null;
  // Whether the keyboard is interactive
  let interactive = true;
  // Debounce flag to prevent rapid double-clicks
  let processing = false;

  // Keyboard layout rows
  const ROWS = [
    // Function row
    [
      { label: 'Esc', key: 'Esc', width: 1 },
      { label: '', key: '', width: 0.5, spacer: true },
      { label: 'F1', key: 'F1', width: 1 },
      { label: 'F2', key: 'F2', width: 1 },
      { label: 'F3', key: 'F3', width: 1 },
      { label: 'F4', key: 'F4', width: 1 },
      { label: '', key: '', width: 0.3, spacer: true },
      { label: 'F5', key: 'F5', width: 1 },
      { label: 'F6', key: 'F6', width: 1 },
      { label: 'F7', key: 'F7', width: 1 },
      { label: 'F8', key: 'F8', width: 1 },
      { label: '', key: '', width: 0.3, spacer: true },
      { label: 'F9', key: 'F9', width: 1 },
      { label: 'F10', key: 'F10', width: 1 },
      { label: 'F11', key: 'F11', width: 1 },
      { label: 'F12', key: 'F12', width: 1 },
      { label: '', key: '', width: 0.3, spacer: true },
      { label: 'PrtSc', key: 'PrtSc', width: 1 },
      { label: 'ScrLk', key: 'ScrLk', width: 1 },
      { label: 'Pause', key: 'Pause', width: 1 },
    ],
    // Number row
    [
      { label: '`', key: '`', width: 1 },
      { label: '1', key: '1', width: 1 },
      { label: '2', key: '2', width: 1 },
      { label: '3', key: '3', width: 1 },
      { label: '4', key: '4', width: 1 },
      { label: '5', key: '5', width: 1 },
      { label: '6', key: '6', width: 1 },
      { label: '7', key: '7', width: 1 },
      { label: '8', key: '8', width: 1 },
      { label: '9', key: '9', width: 1 },
      { label: '0', key: '0', width: 1 },
      { label: '-', key: '-', width: 1 },
      { label: '=', key: '=', width: 1 },
      { label: 'Backspace', key: 'Backspace', width: 2 },
      { label: '', key: '', width: 0.3, spacer: true },
      { label: 'Ins', key: 'Ins', width: 1 },
      { label: 'Home', key: 'Home', width: 1 },
      { label: 'PgUp', key: 'PgUp', width: 1 },
    ],
    // Q row
    [
      { label: 'Tab', key: 'Tab', width: 1.5 },
      { label: 'Q', key: 'Q', width: 1 },
      { label: 'W', key: 'W', width: 1 },
      { label: 'E', key: 'E', width: 1 },
      { label: 'R', key: 'R', width: 1 },
      { label: 'T', key: 'T', width: 1 },
      { label: 'Y', key: 'Y', width: 1 },
      { label: 'U', key: 'U', width: 1 },
      { label: 'I', key: 'I', width: 1 },
      { label: 'O', key: 'O', width: 1 },
      { label: 'P', key: 'P', width: 1 },
      { label: '[', key: '[', width: 1 },
      { label: ']', key: ']', width: 1 },
      { label: '\\', key: '\\', width: 1.5 },
      { label: '', key: '', width: 0.3, spacer: true },
      { label: 'Del', key: 'Delete', width: 1 },
      { label: 'End', key: 'End', width: 1 },
      { label: 'PgDn', key: 'PgDn', width: 1 },
    ],
    // A row (home row)
    [
      { label: 'Caps', key: 'CapsLock', width: 1.75 },
      { label: 'A', key: 'A', width: 1 },
      { label: 'S', key: 'S', width: 1 },
      { label: 'D', key: 'D', width: 1 },
      { label: 'F', key: 'F', width: 1 },
      { label: 'G', key: 'G', width: 1 },
      { label: 'H', key: 'H', width: 1 },
      { label: 'J', key: 'J', width: 1 },
      { label: 'K', key: 'K', width: 1 },
      { label: 'L', key: 'L', width: 1 },
      { label: ';', key: ';', width: 1 },
      { label: "'", key: "'", width: 1 },
      { label: 'Enter', key: 'Enter', width: 2.25 },
    ],
    // Z row
    [
      { label: 'Shift', key: 'Shift', width: 2.25, modifier: true },
      { label: 'Z', key: 'Z', width: 1 },
      { label: 'X', key: 'X', width: 1 },
      { label: 'C', key: 'C', width: 1 },
      { label: 'V', key: 'V', width: 1 },
      { label: 'B', key: 'B', width: 1 },
      { label: 'N', key: 'N', width: 1 },
      { label: 'M', key: 'M', width: 1 },
      { label: ',', key: ',', width: 1 },
      { label: '.', key: '.', width: 1 },
      { label: '/', key: '/', width: 1 },
      { label: 'Shift', key: 'Shift', width: 2.75, modifier: true },
      { label: '', key: '', width: 1.3, spacer: true },
      { label: '\u2191', key: 'Up', width: 1 },
    ],
    // Bottom row
    [
      { label: 'Ctrl', key: 'Ctrl', width: 1.5, modifier: true },
      { label: 'Win', key: 'Win', width: 1.25, modifier: true },
      { label: 'Alt', key: 'Alt', width: 1.25, modifier: true },
      { label: '', key: 'Space', width: 6.25 },
      { label: 'Alt', key: 'Alt', width: 1.25, modifier: true },
      { label: 'Win', key: 'Win', width: 1.25, modifier: true },
      { label: 'Menu', key: 'Menu', width: 1.25 },
      { label: 'Ctrl', key: 'Ctrl', width: 1.5, modifier: true },
      { label: '', key: '', width: 0.3, spacer: true },
      { label: '\u2190', key: 'Left', width: 1 },
      { label: '\u2193', key: 'Down', width: 1 },
      { label: '\u2192', key: 'Right', width: 1 },
    ],
  ];

  function render(container) {
    container.innerHTML = '';
    container.classList.add('keyboard');

    ROWS.forEach((row, rowIndex) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'keyboard-row';
      if (rowIndex === 0) rowEl.classList.add('fn-row');

      row.forEach(keyDef => {
        if (keyDef.spacer) {
          const spacer = document.createElement('div');
          spacer.className = 'key-spacer';
          spacer.style.flex = `0 0 ${keyDef.width * 2.8}rem`;
          rowEl.appendChild(spacer);
          return;
        }

        const keyEl = document.createElement('button');
        keyEl.className = 'key';
        keyEl.dataset.key = keyDef.key;
        keyEl.textContent = keyDef.label;
        keyEl.style.flex = `0 0 ${keyDef.width * 2.8}rem`;

        if (keyDef.modifier) keyEl.classList.add('modifier');
        if (keyDef.key === 'Space') keyEl.classList.add('space-key');
        if (['Enter', 'Backspace', 'Tab', 'CapsLock'].includes(keyDef.key)) {
          keyEl.classList.add('wide-key');
        }
        if (['Shift'].includes(keyDef.key)) keyEl.classList.add('wide-key');

        keyEl.addEventListener('click', () => handleKeyClick(keyDef.key));
        rowEl.appendChild(keyEl);
      });

      container.appendChild(rowEl);
    });
  }

  function handleKeyClick(key) {
    if (!interactive || processing) return;

    const isModifier = MODIFIERS.has(key);

    if (isModifier) {
      // Toggle modifier
      if (heldModifiers.has(key)) {
        heldModifiers.delete(key);
        updateKeyVisuals();
      } else {
        heldModifiers.add(key);
        updateKeyVisuals();
      }
    } else {
      // Non-modifier pressed: build the combo and fire
      processing = true;
      const combo = [...heldModifiers, key];

      // Flash the pressed key
      flashKey(key, 'pressed');

      // Fire callback
      if (onComboCallback) {
        onComboCallback(combo);
      }

      // Reset after a brief delay
      setTimeout(() => {
        heldModifiers.clear();
        updateKeyVisuals();
        processing = false;
      }, 200);
    }
  }

  function updateKeyVisuals() {
    document.querySelectorAll('.key').forEach(el => {
      const k = el.dataset.key;
      if (heldModifiers.has(k)) {
        el.classList.add('held');
      } else {
        el.classList.remove('held');
      }
    });
  }

  function flashKey(key, type) {
    const keyEls = document.querySelectorAll(`.key[data-key="${key}"]`);
    keyEls.forEach(el => {
      el.classList.add(type);
      setTimeout(() => el.classList.remove(type), 300);
    });
  }

  function flashAllHeld(className) {
    // Flash all currently-held keys + the last pressed key
    document.querySelectorAll('.key.held, .key.pressed').forEach(el => {
      el.classList.add(className);
      setTimeout(() => el.classList.remove(className), 500);
    });
  }

  function flashCorrect() {
    flashAllHeld('correct-flash');
  }

  function flashIncorrect() {
    flashAllHeld('incorrect-flash');
  }

  function highlightKeys(keys) {
    // Highlight specific keys to guide the user
    document.querySelectorAll('.key').forEach(el => el.classList.remove('hint'));
    keys.forEach(key => {
      document.querySelectorAll(`.key[data-key="${key}"]`).forEach(el => {
        el.classList.add('hint');
      });
    });
  }

  function clearHighlights() {
    document.querySelectorAll('.key').forEach(el => el.classList.remove('hint', 'held', 'pressed', 'correct-flash', 'incorrect-flash'));
    heldModifiers.clear();
  }

  function setInteractive(val) {
    interactive = val;
    const container = document.getElementById('keyboard-container');
    if (container) {
      container.classList.toggle('keyboard-disabled', !val);
    }
  }

  function onCombo(cb) {
    onComboCallback = cb;
  }

  function reset() {
    heldModifiers.clear();
    processing = false;
    clearHighlights();
  }

  return {
    render,
    onCombo,
    flashCorrect,
    flashIncorrect,
    highlightKeys,
    clearHighlights,
    setInteractive,
    reset,
  };
})();
