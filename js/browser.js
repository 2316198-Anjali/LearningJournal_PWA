

function checkReflection() {
    let reflection = document.forms["journalForm"]["reflection"];
    let name = document.forms["journalForm"]["fname"];
    
    if (!name.checkValidity()) {
        alert("Name is required.");
        return false;
    }
    if (!reflection.checkValidity()) {
        alert("Reflection must be more than 10 characters.");
        return false;
    }
    return true;
}

function handleJournalSubmit(event) {
    event.preventDefault();
    if (checkReflection()) {
        alert("Entry saved successfully!");
        saveJournalEntry();
        document.forms["journalForm"].reset();
        getDate();
    }
    return false;
}

function getDate() {
    const d = new Date();
    let text = d.toDateString();
    document.getElementById("todayDate").innerHTML = text;
}



function initBrowserAPI() {
    getDate();
    
    const form = document.forms["journalForm"];
    if (form) {
        form.addEventListener("submit", handleJournalSubmit);
    }
}