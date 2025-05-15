document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('urlInput');
  const addBtn = document.getElementById('addBtn');
  const shortcutsList = document.getElementById('shortcutsList');
  const selectAllBtn = document.getElementById('selectAllBtn');
  const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
  const emptyState = document.getElementById('emptyState');
  // START: Get new button elements
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  // END: Get new button elements

  let shortcuts = [];
  let selectedShortcuts = [];

  // Load shortcuts from storage
  chrome.storage.sync.get(['shortcuts'], (result) => {
    shortcuts = result.shortcuts || [];
    renderShortcuts();
    updateEmptyState();
    updateExportButtonState(); // Update export button on load
  });

  // Add new shortcut
  addBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) return;

    // Add http:// if missing
    const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`; // Corrected check

    // Extract domain for title
    let domain;
    try {
      domain = new URL(fullUrl).hostname.replace('www.', '');
    } catch (e){
      console.error("Invalid URL:", fullUrl, e);
      // Optionally provide user feedback about invalid URL
      alert("Invalid URL entered. Please enter a valid web address.");
      return; // Stop execution if URL is invalid
    }

    const newShortcut = {
      id: Date.now().toString(),
      title: domain,
      url: fullUrl,
      favicon: `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(domain)}` // Slightly better favicon API
    };

    shortcuts.unshift(newShortcut);
    saveShortcuts();
    urlInput.value = '';
    renderShortcuts();
    updateEmptyState();
    updateExportButtonState(); // Update export button after adding
  });

  // Select all shortcuts
  selectAllBtn.addEventListener('click', () => {
    const allCheckboxes = document.querySelectorAll('.shortcut-checkbox');
    if (selectedShortcuts.length === shortcuts.length && shortcuts.length > 0) {
      // Deselect all
      selectedShortcuts = [];
      allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      selectAllBtn.innerHTML = '<i class="fas fa-check-square"></i> Select All';
    } else {
      // Select all
      selectedShortcuts = [...shortcuts];
      allCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
      });
      selectAllBtn.innerHTML = '<i class="fas fa-times"></i> Deselect All';
    }
    updateDeleteButton();
  });

  // Delete selected shortcuts
  deleteSelectedBtn.addEventListener('click', () => {
    if (!selectedShortcuts.length) return;

    shortcuts = shortcuts.filter(shortcut =>
      !selectedShortcuts.some(selected => selected.id === shortcut.id)
    );

    selectedShortcuts = [];
    saveShortcuts();
    renderShortcuts();
    updateEmptyState();
    updateDeleteButton();
    updateExportButtonState(); // Update export button after deleting
    selectAllBtn.innerHTML = '<i class="fas fa-check-square"></i> Select All';
    // Ensure select all button text is correct if all were selected and deleted
     if (shortcuts.length === 0) {
       selectAllBtn.innerHTML = '<i class="fas fa-check-square"></i> Select All';
     }
  });

  // --- START: Export Functionality ---
  exportBtn.addEventListener('click', () => {
    if (shortcuts.length === 0) {
      alert("No shortcuts to export.");
      return;
    }

    const dataStr = JSON.stringify(shortcuts, null, 2); // Pretty print JSON
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const exportLink = document.createElement('a');

    // Create a filename with date
    const date = new Date();
    const dateString = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    const filename = `quickxins_shortcuts_${dateString}.json`;

    exportLink.href = url;
    exportLink.download = filename;
    document.body.appendChild(exportLink); // Required for Firefox
    exportLink.click();
    document.body.removeChild(exportLink); // Clean up
    URL.revokeObjectURL(url); // Release object URL memory
  });
  // --- END: Export Functionality ---

  // --- START: Import Functionality ---
  importBtn.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,application/json'; // Accept only JSON files

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) {
        return; // No file selected
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);

          // Basic validation: check if it's an array and items have expected keys
          if (!Array.isArray(importedData) || (importedData.length > 0 && (!importedData[0].id || !importedData[0].url || !importedData[0].title))) {
             throw new Error("Invalid file format. Expected an array of shortcut objects.");
          }

          // Replace existing shortcuts with imported ones
          // Optional: Could add logic here to merge or check for duplicates if desired
          shortcuts = importedData;
          selectedShortcuts = []; // Clear selection after import

          saveShortcuts();
          renderShortcuts();
          updateEmptyState();
          updateDeleteButton();
          updateExportButtonState();
          selectAllBtn.innerHTML = '<i class="fas fa-check-square"></i> Select All'; // Reset select all button

          alert(`Successfully imported ${shortcuts.length} shortcut(s).`);

        } catch (error) {
          console.error("Error importing shortcuts:", error);
          alert(`Import failed: ${error.message}`);
        }
      };

      reader.onerror = (e) => {
         console.error("Error reading file:", e);
         alert("Error reading the selected file.");
      };

      reader.readAsText(file); // Read the file content as text
    });

    fileInput.click(); // Open the file picker dialog
  });
  // --- END: Import Functionality ---


  // Render shortcuts list
  function renderShortcuts() {
    shortcutsList.innerHTML = '';
    const fragment = document.createDocumentFragment(); // Use fragment for performance

    shortcuts.forEach(shortcut => {
      const isSelected = selectedShortcuts.some(s => s.id === shortcut.id);

      const shortcutElement = document.createElement('div');
      shortcutElement.className = 'shortcut-item';
      shortcutElement.innerHTML = `
        <input type="checkbox" class="shortcut-checkbox" ${isSelected ? 'checked' : ''}
               data-id="${shortcut.id}" title="Select shortcut">
        <img src="${shortcut.favicon}" class="favicon" alt="" loading="lazy" onerror="this.style.display='none'"> <!-- Added alt="", loading, onerror -->
        <div class="shortcut-content">
          <span class="shortcut-title" title="${shortcut.title}">${shortcut.title}</span>
          <span class="shortcut-url" title="${shortcut.url}">${shortcut.url}</span>
        </div>
        <div class="shortcut-actions">
          <button class="shortcut-btn visit" title="Visit Shortcut" data-url="${shortcut.url}">
            <i class="fas fa-external-link-alt"></i>
          </button>
          <button class="shortcut-btn delete" title="Delete Shortcut" data-id="${shortcut.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;

      // --- Event listeners specific to this item ---

      // Checkbox listener
      const checkbox = shortcutElement.querySelector('.shortcut-checkbox');
      checkbox.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const currentShortcut = shortcuts.find(s => s.id === id); // Renamed variable

        if (e.target.checked) {
          selectedShortcuts.push(currentShortcut);
        } else {
          selectedShortcuts = selectedShortcuts.filter(s => s.id !== id);
        }

        updateDeleteButton();
        // Update select all button state/text if necessary
         if(selectedShortcuts.length === shortcuts.length && shortcuts.length > 0) {
             selectAllBtn.innerHTML = '<i class="fas fa-times"></i> Deselect All';
         } else {
             selectAllBtn.innerHTML = '<i class="fas fa-check-square"></i> Select All';
         }
      });

      // Delete button listener
      const deleteBtn = shortcutElement.querySelector('.shortcut-btn.delete');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering item click
        const id = e.target.closest('button').dataset.id;
        shortcuts = shortcuts.filter(s => s.id !== id);
        selectedShortcuts = selectedShortcuts.filter(s => s.id !== id); // Also remove from selection
        saveShortcuts();
        renderShortcuts(); // Re-render the list
        updateEmptyState();
        updateDeleteButton();
        updateExportButtonState();
      });

      // Visit button listener
      const visitBtn = shortcutElement.querySelector('.shortcut-btn.visit');
      visitBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering item click
        const url = e.target.closest('button').dataset.url;
        chrome.tabs.create({ url });
      });

      // Item click listener (for visiting)
      shortcutElement.addEventListener('click', (e) => {
        // Only trigger if the click is not on checkbox or action buttons
        if (!e.target.closest('.shortcut-checkbox') && !e.target.closest('.shortcut-actions')) {
          const url = visitBtn.dataset.url; // Get URL from visit button data
          chrome.tabs.create({ url });
        }
      });

      fragment.appendChild(shortcutElement);
    });

    shortcutsList.appendChild(fragment); // Append fragment once
  }

  // Save shortcuts to storage
  function saveShortcuts() {
    chrome.storage.sync.set({ shortcuts }, () => {
        if (chrome.runtime.lastError) {
            console.error("Error saving shortcuts:", chrome.runtime.lastError);
            // Handle potential storage errors (e.g., quota exceeded)
            alert("Error saving shortcuts. Storage might be full.");
        } else {
            // console.log("Shortcuts saved successfully.");
        }
    });
  }

  // Update empty state visibility
  function updateEmptyState() {
    emptyState.style.display = shortcuts.length ? 'none' : 'flex';
  }

  // Update delete button state
  function updateDeleteButton() {
    deleteSelectedBtn.disabled = selectedShortcuts.length === 0;
  }

  // START: New function to update Export button state
  function updateExportButtonState() {
      exportBtn.disabled = shortcuts.length === 0;
  }
  // END: New function

  // Allow adding shortcut with Enter key
  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });

  // Initial state updates
  updateDeleteButton();
  updateExportButtonState();

});