const STORAGE_KEYS = {
    JOURNAL_ENTRIES: 'journalEntries',
    THEME: 'theme',
};

// Save journal entry to JSON file only
async function saveJournalEntry() {
    const name = document.getElementById("fname").value.trim();
    const date = document.getElementById("todayDate").textContent;
    const reflection = document.getElementById("reflection").value.trim();
    
    if (!name || !reflection) {
        alert("Please fill in all required fields.");
        return false;
    }
    
    const entry = {
        name: name,
        date: date,
        reflection: reflection,
        timestamp: new Date().toISOString()
    };
    
    try {
        
        let existingEntries = await getStoredEntries();
        existingEntries.push(entry);
        
        // Save to json is not possible with js
        displayAllEntries(); 
        return true;
    } catch (error) {
        console.error("Error saving entry:", error);
        alert("Error saving entry to JSON file.");
        return false;
    }
}

async function getStoredEntries() {
    try {
        const response = await fetch('backend/reflections.json');
        if (response.ok) {
            return await response.json();
        }
        return [];
    } catch (error) {
        console.log('Could not fetch reflections from JSON file:', error);
        return [];
    }
}

async function displayAllEntries() {
    const viewAllDiv = document.getElementById("viewAllEntries");
    if (!viewAllDiv) return;
    
    let output = "";
    let allReflections = [];
    
    try {
        allReflections = await getStoredEntries();
    } catch (error) {
        console.log('Could not fetch reflections:', error);
    }
    
    // Build HTML output from all reflections
    for (let i = 0; i < allReflections.length; i++) {
        const r = allReflections[i];
        output += "<div style='margin-bottom: 15px; padding: 10px; border-left: 3px solid palevioletred;'>";
        output += "<b>" + r.name + ":</b><br>";
        output += "<i>" + r.date + "</i><br>";
        output += r.reflection + "<br>";
        output += "</div>";
    }
    
    if (allReflections.length === 0) {
        output = "<p style='color: #999;'>No reflections found. Add your first reflection above!</p>";
    }
    
    // Display reflections in element ID 'viewAllEntries'
    viewAllDiv.innerHTML = output;
}

function clearAllEntries() {
    if (confirm("Are you sure you want to clear all saved reflections? This cannot be undone.")) {
        // Note: Clearing JSON file requires backend implementation
        alert("can't clear entries from json file through js");
       
        displayAllEntries();
    }
}

// Export  JSON file
async function exportReflections() {
    try {
        const reflections = await getStoredEntries();
        if (reflections.length === 0) {
            alert("No reflections to export!");
            return;
        }
        
        const jsonString = JSON.stringify(reflections, null, 4);
        
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reflections_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert("Reflections exported successfully!");
    } catch (error) {
        alert("Error exporting reflections!");
        console.error("Export error:", error);
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

// Make functions available globally for HTML onclick handlers
if (typeof window !== 'undefined') {
    window.exportReflections = exportReflections;
    window.displayAllEntries = displayAllEntries;
    window.clearAllEntries = clearAllEntries;
    window.saveJournalEntry = saveJournalEntry;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveJournalEntry,
        displayAllEntries,
        clearAllEntries,
        saveThemePreference,
        loadThemePreference,
        initStorage,
        exportReflections,
    };
}