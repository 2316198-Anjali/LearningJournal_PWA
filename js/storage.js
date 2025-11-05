
const STORAGE_KEYS = {
    JOURNAL_ENTRIES: 'journalEntries',
    THEME: 'theme',
};

// Save journal entry to localStorage 
function saveJournalEntry() {
    const name = document.getElementById("fname").value.trim();
    const date = document.getElementById("todayDate").textContent;
    const reflection = document.getElementById("reflection").value.trim();
    
    if (!name || !reflection) {
        alert("Please fill in all required fields.");
        return false;
    }
    
    const entry = {
        id: Date.now(), // unique identifier
        name: name,
        date: date,
        reflection: reflection,
        timestamp: new Date().toISOString()
    };
    let existingEntries = getStoredEntries();
    existingEntries.push(entry);
    
    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(existingEntries));
    
    displayAllEntries(); 
    return true;
}

function getStoredEntries() {
    const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
    return stored ? JSON.parse(stored) : [];
}

function displayAllEntries() {
    const entries = getStoredEntries();
    const viewAllDiv = document.getElementById("viewAllEntries");
    
    if (viewAllDiv) {
        if (entries.length === 0) {
            viewAllDiv.innerHTML = '<p style="color: #999; ">No reflections saved yet. Add your first reflection above!</p>';
            return;
        }
        
        let output = "";
        for (let i = entries.length - 1; i >= 0; i--) { 
            const entry = entries[i];
            output += "<div style='margin-bottom: 15px; padding: 10px; border-left: 3px solid palevioletred;'>";
            output += "<b>" + entry.name + ":</b><br>";
            output += "<i>" + entry.date + "</i><br>";
            output += entry.reflection + "<br>";
            output += "<small style='color: #666;'>Saved: " + new Date(entry.timestamp).toLocaleString() + "</small>";
            output += "</div>";
        }
        viewAllDiv.innerHTML = output;
    }
}

function clearAllEntries() {
    if (confirm("Are you sure you want to clear all saved reflections? This cannot be undone.")) {
        // Remove all saved entries
        localStorage.removeItem(STORAGE_KEYS.JOURNAL_ENTRIES);
        // Clear display
        displayAllEntries();
        alert("All reflections have been cleared.");
    }
}

function saveThemePreference(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
        console.log('Theme preference loaded:', savedTheme);
    }
    return savedTheme || 'light';
}

function updateThemeButton(theme) {
    const themeButton = document.getElementById("theme-toggle");
    if (themeButton) {
        if (theme === 'dark') {
            themeButton.textContent = "?? Light Mode";
        } else {
            themeButton.textContent = "?? Dark Mode";
        }
    }
}


function initStorage() {
    
    loadThemePreference();
    
    displayAllEntries();
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveJournalEntry,
        displayAllEntries,
        clearAllEntries,
        saveThemePreference,
        loadThemePreference,
        initStorage,
        getStorageStats
    };
}