// levels.js — Level definitions, shortcut data, and task data

const SHORTCUTS = {
  setA: [
    { id: 'copy', name: 'Copy', keys: ['Ctrl', 'C'] },
    { id: 'paste', name: 'Paste', keys: ['Ctrl', 'V'] },
    { id: 'cut', name: 'Cut', keys: ['Ctrl', 'X'] },
    { id: 'undo', name: 'Undo', keys: ['Ctrl', 'Z'] },
    { id: 'selectAll', name: 'Select All', keys: ['Ctrl', 'A'] },
    { id: 'save', name: 'Save', keys: ['Ctrl', 'S'] },
    { id: 'find', name: 'Find', keys: ['Ctrl', 'F'] },
    { id: 'print', name: 'Print', keys: ['Ctrl', 'P'] },
    { id: 'redo', name: 'Redo', keys: ['Ctrl', 'Y'] },
    { id: 'lock', name: 'Lock Computer', keys: ['Win', 'L'] },
  ],
  setB: [
    { id: 'switchWindow', name: 'Switch Window', keys: ['Alt', 'Tab'] },
    { id: 'screenshotSnip', name: 'Screenshot Snip', keys: ['Win', 'Shift', 'S'] },
    { id: 'clipboard', name: 'Bring up Clipboard', keys: ['Win', 'V'] },
    { id: 'bold', name: 'Bold', keys: ['Ctrl', 'B'] },
    { id: 'italic', name: 'Italic', keys: ['Ctrl', 'I'] },
    { id: 'underline', name: 'Underline', keys: ['Ctrl', 'U'] },
    { id: 'reopenTab', name: 'Reopen Closed Tab', keys: ['Ctrl', 'Shift', 'T'] },
    { id: 'pasteNoFormat', name: 'Paste Without Formatting', keys: ['Ctrl', 'Shift', 'V'] },
    { id: 'newWindow', name: 'New Window/Document', keys: ['Ctrl', 'N'] },
    { id: 'findReplace', name: 'Find and Replace', keys: ['Ctrl', 'H'] },
  ],
};

// Real Practice tasks for Level 3 (Set A, hints shown)
const TASKS_LEVEL3 = [
  {
    description: 'You just typed a paragraph with a mistake. Select all the text, cut it, then undo the cut.',
    shortcuts: ['selectAll', 'cut', 'undo'],
  },
  {
    description: "You're working on a report. Find the word \"budget,\" copy it, then save the document.",
    shortcuts: ['find', 'copy', 'save'],
  },
  {
    description: 'Select all the text in your document, copy it, then print the page.',
    shortcuts: ['selectAll', 'copy', 'print'],
  },
  {
    description: "You need to move a paragraph. Select all text, cut it, then paste it in a new location.",
    shortcuts: ['selectAll', 'cut', 'paste'],
  },
  {
    description: "You made two mistakes in a row. Undo both changes, then save the document.",
    shortcuts: ['undo', 'undo', 'save'],
  },
  {
    description: "Copy some text from a website, paste it into your document, then save.",
    shortcuts: ['copy', 'paste', 'save'],
  },
  {
    description: "Find a word in your document, select all text, then redo a previous change.",
    shortcuts: ['find', 'selectAll', 'redo'],
  },
  {
    description: "You're leaving your desk. Save your work, print a copy, then lock your computer.",
    shortcuts: ['save', 'print', 'lock'],
  },
  {
    description: "Paste text into your document, undo because it was wrong, then redo it after all.",
    shortcuts: ['paste', 'undo', 'redo'],
  },
  {
    description: "Select all content on the page, copy it for later, then find a keyword to double-check.",
    shortcuts: ['selectAll', 'copy', 'find'],
  },
];

// Real Practice tasks for Level 4 (Set A, no hints)
const TASKS_LEVEL4 = [
  {
    description: "You found an error in your essay. Find the wrong word, cut it out, then save the file.",
    shortcuts: ['find', 'cut', 'save'],
  },
  {
    description: "Before closing your laptop, select all your notes, copy them as backup, then lock the screen.",
    shortcuts: ['selectAll', 'copy', 'lock'],
  },
  {
    description: "Paste content you copied earlier, realize it's wrong, undo it, then save.",
    shortcuts: ['paste', 'undo', 'save'],
  },
  {
    description: "Select all text in your email draft, cut it to move it, then paste it in a new message.",
    shortcuts: ['selectAll', 'cut', 'paste'],
  },
  {
    description: "You need a printout. Find a specific section, copy it, then print the document.",
    shortcuts: ['find', 'copy', 'print'],
  },
  {
    description: "You accidentally deleted a sentence. Undo the deletion, redo it to confirm, then save.",
    shortcuts: ['undo', 'redo', 'save'],
  },
  {
    description: "Copy the current paragraph, paste it below, then select all text to review.",
    shortcuts: ['copy', 'paste', 'selectAll'],
  },
  {
    description: "Save your current work, find a section to revise, then cut the old text.",
    shortcuts: ['save', 'find', 'cut'],
  },
  {
    description: "You're done editing. Print the final version, save it, then lock your workstation.",
    shortcuts: ['print', 'save', 'lock'],
  },
  {
    description: "Select all content in a spreadsheet, copy it, then undo your last formatting change.",
    shortcuts: ['selectAll', 'copy', 'undo'],
  },
];

// Real Practice tasks for Level 7 (Sets A+B combined, hints shown)
const TASKS_LEVEL7 = [
  {
    description: "You're editing a Word doc. Bold the title, save the document, then print it.",
    shortcuts: ['bold', 'save', 'print'],
  },
  {
    description: "You accidentally closed a browser tab. Reopen it, take a screenshot snip, then paste it.",
    shortcuts: ['reopenTab', 'screenshotSnip', 'paste'],
  },
  {
    description: "Switch to another window, find a word on the page, then copy it.",
    shortcuts: ['switchWindow', 'find', 'copy'],
  },
  {
    description: "Underline a heading in your document, italicize a subtitle, then save your work.",
    shortcuts: ['underline', 'italic', 'save'],
  },
  {
    description: "Open a new document, paste text without formatting, then bold the first line.",
    shortcuts: ['newWindow', 'pasteNoFormat', 'bold'],
  },
  {
    description: "Take a screenshot snip, open the clipboard history, then paste into your document.",
    shortcuts: ['screenshotSnip', 'clipboard', 'paste'],
  },
  {
    description: "Switch windows to check Outlook, copy an email subject, then paste it without formatting into Word.",
    shortcuts: ['switchWindow', 'copy', 'pasteNoFormat'],
  },
  {
    description: "Find and replace a word in your document, undo the replacement, then save.",
    shortcuts: ['findReplace', 'undo', 'save'],
  },
  {
    description: "Select all text, bold it, then use find and replace to fix a recurring typo.",
    shortcuts: ['selectAll', 'bold', 'findReplace'],
  },
  {
    description: "Reopen a closed tab, select all content on the page, then copy it.",
    shortcuts: ['reopenTab', 'selectAll', 'copy'],
  },
];

// Real Practice tasks for Level 8 (Sets A+B combined, no hints)
const TASKS_LEVEL8 = [
  {
    description: "You need to clean up a Word document. Bold the header, italicize a key term, then underline the conclusion.",
    shortcuts: ['bold', 'italic', 'underline'],
  },
  {
    description: "Switch to Chrome, reopen a tab you closed earlier, then copy the URL.",
    shortcuts: ['switchWindow', 'reopenTab', 'copy'],
  },
  {
    description: "Take a screenshot of an error, paste it into a support ticket, then save the document.",
    shortcuts: ['screenshotSnip', 'paste', 'save'],
  },
  {
    description: "Open a new document, paste text without formatting from the web, then print it.",
    shortcuts: ['newWindow', 'pasteNoFormat', 'print'],
  },
  {
    description: "Find and replace all instances of \"2024\" with \"2025\" in your report, then undo and save.",
    shortcuts: ['findReplace', 'undo', 'save'],
  },
  {
    description: "Open the clipboard history, paste an older item, then bold the pasted text.",
    shortcuts: ['clipboard', 'paste', 'bold'],
  },
  {
    description: "Switch to another app, select all the text there, then cut it to move it.",
    shortcuts: ['switchWindow', 'selectAll', 'cut'],
  },
  {
    description: "Reopen a closed tab, take a screenshot snip, then open a new document to paste it.",
    shortcuts: ['reopenTab', 'screenshotSnip', 'newWindow'],
  },
  {
    description: "Italic a citation in your essay, find the next reference, then copy it.",
    shortcuts: ['italic', 'find', 'copy'],
  },
  {
    description: "Underline an important note, save the file, then lock your computer before leaving.",
    shortcuts: ['underline', 'save', 'lock'],
  },
];

// Helper: look up a shortcut object by its id from either set
function getShortcutById(id) {
  return SHORTCUTS.setA.find(s => s.id === id) || SHORTCUTS.setB.find(s => s.id === id);
}

// Format keys array as display string: "Ctrl+C"
function formatKeys(keys) {
  return keys.join('+');
}

// Level configuration
const LEVELS = [
  {
    number: 1,
    name: 'Learn Mode',
    label: 'Basic Combos',
    type: 'A',
    description: 'See the shortcut and press it',
    set: 'setA',
    color: 'green',
  },
  {
    number: 2,
    name: 'Recall Mode',
    label: 'Memory Test',
    type: 'B',
    description: 'Name shown first, shortcut revealed after 10s',
    set: 'setA',
    color: 'green',
  },
  {
    number: 3,
    name: 'Real Practice',
    label: 'Hands-On Tasks',
    type: 'C',
    description: 'Real tasks with hints shown',
    set: 'setA',
    tasks: TASKS_LEVEL3,
    color: 'yellow',
  },
  {
    number: 4,
    name: 'Real Practice',
    label: 'No Help Mode',
    type: 'D',
    description: 'Real tasks without hints',
    set: 'setA',
    tasks: TASKS_LEVEL4,
    color: 'red',
  },
  {
    number: 5,
    name: 'Learn Mode',
    label: 'Advanced Combos',
    type: 'A',
    description: 'See the shortcut and press it',
    set: 'setB',
    color: 'green',
  },
  {
    number: 6,
    name: 'Recall Mode',
    label: 'Advanced Memory',
    type: 'B',
    description: 'Name shown first, shortcut revealed after 10s',
    set: 'setB',
    color: 'yellow',
  },
  {
    number: 7,
    name: 'Real Practice',
    label: 'Combined Tasks',
    type: 'C',
    description: 'Real tasks with all shortcuts, hints shown',
    set: 'both',
    tasks: TASKS_LEVEL7,
    color: 'yellow',
  },
  {
    number: 8,
    name: 'Real Practice',
    label: 'Final Challenge',
    type: 'D',
    description: 'Real tasks with all shortcuts, no hints',
    set: 'both',
    tasks: TASKS_LEVEL8,
    color: 'red',
  },
];

// Shuffle an array (Fisher-Yates)
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generate tasks for a keyboard-based level (Type A or B)
function generateKeyboardTasks(level) {
  const shortcuts = SHORTCUTS[level.set];
  return shuffleArray(shortcuts).map(s => ({
    shortcutId: s.id,
    name: s.name,
    keys: s.keys,
    display: formatKeys(s.keys),
  }));
}

// Generate tasks for a real-practice level (Type C or D)
function generatePracticeTasks(level) {
  return shuffleArray(level.tasks).map(task => ({
    description: task.description,
    shortcuts: task.shortcuts.map(id => {
      const s = getShortcutById(id);
      return { id: s.id, name: s.name, keys: s.keys, display: formatKeys(s.keys) };
    }),
  }));
}
