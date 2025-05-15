// DOM Elements
const addWordBtn = document.getElementById('addWordBtn');
const selectAllBtn = document.getElementById('selectAllBtn');
const deselectAllBtn = document.getElementById('deselectAllBtn');
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const searchInput = document.getElementById('searchInput');
const wordsList = document.querySelector('.words-list');
const bulkActions = document.querySelector('.bulk-actions');
const clearAllBtn = document.getElementById('clearAllBtn');
const exportCsvBtn = document.getElementById('exportCsvBtn');
const importCsvBtn = document.getElementById('importCsvBtn');


// Global words array with proper initialization
let words = [];

// Initialize - this stays the same
document.addEventListener('DOMContentLoaded', () => {
  loadWords().then(() => renderWords());
});


async function loadWords() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['words'], (result) => {
      words = result.words || [
        {
          id: 1,
          title: "Serendipity",
          definition: "The occurrence of events by chance in a happy or beneficial way.",
          tags: ["noun", "positive"],
          date: new Date().toISOString().split('T')[0]
        }
      ];
      resolve();
    });
  });
}


function saveWords() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ words }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

// Render Words
function renderWords(filteredWords = null) {
  wordsList.innerHTML = '';
  const displayWords = filteredWords || words;
  
  displayWords.forEach(word => {
    const wordCard = document.createElement('div');
    wordCard.className = 'word-card';
    wordCard.dataset.id = word.id;
    wordCard.innerHTML = `
      <div class="word-checkbox-area"></div>
      <div class="word-content">
        <h3 class="word-title">${word.title}</h3>
        <p class="word-definition">${word.definition}</p>
        <div class="word-tags">
          ${word.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <small class="word-date">Added: ${word.date}</small>
      </div>
    `;
    wordsList.appendChild(wordCard);

    // Make entire box clickable for selection
    const checkboxArea = wordCard.querySelector('.word-checkbox-area');
    checkboxArea.addEventListener('click', (e) => {
      e.stopPropagation();
      wordCard.classList.toggle('selected');
      updateBulkActions();
    });

    // Double-click to edit
    wordCard.addEventListener('dblclick', () => editWord(word.id));
  });
}

// Add New Word
addWordBtn.addEventListener('click', () => {
  const newWord = {
    id: Date.now(),
    title: prompt("Enter a word:") || "Untitled",
    definition: prompt("Enter definition:") || "No definition",
    tags: prompt("Enter tags (comma-separated):")?.split(',') || [],
    date: new Date().toISOString().split('T')[0]
  };
  words.push(newWord);
  saveWords();
  renderWords();
});

// Edit Word
function editWord(id) {
  const word = words.find(w => w.id === id);
  if (!word) return;

  word.title = prompt("Edit word:", word.title) || word.title;
  word.definition = prompt("Edit definition:", word.definition) || word.definition;
  word.tags = prompt("Edit tags (comma-separated):", word.tags.join(','))?.split(',') || word.tags;
  
  saveWords();
  renderWords();
}

// Select/Deselect All
selectAllBtn.addEventListener('click', () => {
  document.querySelectorAll('.word-card').forEach(card => {
    card.classList.add('selected');
  });
  updateBulkActions();
});

deselectAllBtn.addEventListener('click', () => {
  document.querySelectorAll('.word-card').forEach(card => {
    card.classList.remove('selected');
  });
  updateBulkActions();
});

// Delete Selected
deleteSelectedBtn.addEventListener('click', () => {
  const selectedCards = document.querySelectorAll('.word-card.selected');
  selectedCards.forEach(card => {
    const wordId = parseInt(card.dataset.id);
    words = words.filter(word => word.id !== wordId);
  });
  saveWords();
  renderWords();
  bulkActions.classList.add('hidden');
});

// Add this event listener (place it with other button listeners)
clearAllBtn.addEventListener('click', () => {
  if (confirm("⚠️ Delete ALL words permanently? This cannot be undone.")) {
    words = []; // Clear the array
    saveWords(); // Update Chrome storage
    renderWords(); // Refresh UI
    bulkActions.classList.add('hidden'); // Hide bulk actions
  }
});

exportCsvBtn.addEventListener('click', exportToCsv);
importCsvBtn.addEventListener('change', importFromCsv);




// Add this new CSV export function
function exportToCsv() {
  if (words.length === 0) {
    alert("No words to export!");
    return;
  }

  let csv = 'Title,Definition,Tags,Date\n';
  words.forEach(word => {
    const title = `"${word.title.replace(/"/g, '""')}"`;
    const definition = `"${word.definition.replace(/"/g, '""')}"`;
    const tags = `"${word.tags.join(', ').replace(/"/g, '""')}"`;
    csv += `${title},${definition},${tags},${word.date}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'axinity-noties-words.csv';
  link.click();
  URL.revokeObjectURL(url);
}

async function importFromCsv(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      console.log("Starting CSV import..."); // Debug log
      
      const csvData = event.target.result;
      const lines = csvData.split('\n');
      const importedWords = [];
      
      // Check if first line is header
      const hasHeader = lines[0].toLowerCase().includes('title');
      const startLine = hasHeader ? 1 : 0;

      for (let i = startLine; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Robust CSV parsing
        const values = line.match(/(?:[^,"]+|"[^"]*")+/g) || [];
        const cleanValue = (v) => v.replace(/^"|"$/g, '').replace(/""/g, '"');

        const word = {
          id: Date.now() + i,
          title: values[0] ? cleanValue(values[0]) : "Untitled",
          definition: values[1] ? cleanValue(values[1]) : "No definition",
          tags: values[2] 
            ? cleanValue(values[2]).split(',').map(t => t.trim()).filter(t => t)
            : ["imported"],
          date: values[3] ? cleanValue(values[3]) : new Date().toISOString().split('T')[0]
        };

        importedWords.push(word);
      }

      if (importedWords.length === 0) {
        alert("No valid words found in CSV.");
        return;
      }

      if (!confirm(`Import ${importedWords.length} words?`)) return;

      // Merge with existing words
      words = [...(words || []), ...importedWords];
      
      try {
        await saveWords();
        renderWords();
        alert(`Successfully imported ${importedWords.length} words!`);
      } catch (err) {
        console.error("Save error:", err);
        alert("Failed to save words. Check console for details.");
      }
    } catch (err) {
      console.error("Import error:", err);
      alert(`Import failed: ${err.message}`);
    }
  };
  reader.readAsText(file);
}


// Export to JSON
exportBtn.addEventListener('click', () => {
  const dataStr = JSON.stringify(words, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'axinity-noties-words.json';
  a.click();
});

// Import from JSON
importBtn.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedWords = JSON.parse(event.target.result);
      words = importedWords;
      saveWords();
      renderWords();
    } catch (err) {
      alert("Invalid JSON file!");
    }
  };
  reader.readAsText(file);
});

// Search Functionality
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  if (!searchTerm) {
    renderWords();
    return;
  }

  const filteredWords = words.filter(word => 
    word.title.toLowerCase().includes(searchTerm) || 
    word.definition.toLowerCase().includes(searchTerm) ||
    word.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
  renderWords(filteredWords);
});

// Show/Hide Bulk Actions
function updateBulkActions() {
  const selectedCount = document.querySelectorAll('.word-card.selected').length;
  if (selectedCount > 0) {
    bulkActions.classList.remove('hidden');
  } else {
    bulkActions.classList.add('hidden');
  }
}

