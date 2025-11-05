// Enhanced Scripts.js with improved error handling and API integration
// Based on lesson content patterns

// Feature 1: Live Date/Time Display
function setupLiveDateTime() {
    const dateTimeContainer = document.getElementById('live-datetime');
    if (dateTimeContainer) {
        updateDateTime();
        // Update every second
        setInterval(() => updateDateTime(), 1000);
    }
}

function updateDateTime() {
    const now = new Date();
    const dateTimeContainer = document.getElementById('live-datetime');
    if (dateTimeContainer) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        dateTimeContainer.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Feature 2: Enhanced Theme Switcher with Storage API integration
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
            
            // Use Storage API to save theme preference
            if (typeof saveThemePreference === 'function') {
                saveThemePreference(newTheme);
            } else {
                localStorage.setItem('theme', newTheme);
            }
        });
    }
}

// Apply theme and update button text
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    updateThemeButtonText(theme);
}

function updateThemeButtonText(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    }
}

// Navigation Template - Enhanced with current page detection
const navTemplate = `
  <nav class="navbar">
    <ul>
      <li><a href="index.html" data-page="index">Home</a></li>
      <li><a href="journal.html" data-page="journal">Journal</a></li>
      <li><a href="projects.html" data-page="projects">Projects</a></li>
      <li><a href="about.html" data-page="about">About</a></li>
    </ul>
  </nav>
`;

// Insert navigation into the page
function insertNavigation() {
    const header = document.querySelector('.header');
    if (header) {
        header.insertAdjacentHTML('afterend', navTemplate);
        setActiveNavItem();
    }
}

// Set active navigation item based on current page
function setActiveNavItem() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Get current page name from URL
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    switch(page) {
        case 'index.html':
        case '':
            return 'index';
        case 'journal.html':
            return 'journal';
        case 'projects.html':
            return 'projects';
        case 'about.html':
            return 'about';
        default:
            return 'index';
    }
}

// Enhanced API initialization with error handling
function initializeAPIs() {
    try {
        // Initialize Storage API features
        if (typeof initStorage === 'function') {
            initStorage();
            console.log('Storage API initialized successfully');
        }
        
        // Initialize Browser API features  
        if (typeof initBrowserAPI === 'function') {
            initBrowserAPI();
            console.log('Browser API initialized successfully');
        }
        
        // Initialize Third Party API features
        if (typeof initThirdPartyAPI === 'function') {
            initThirdPartyAPI();
            console.log('Third Party API initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing APIs:', error);
    }
}

// Enhanced like button with localStorage integration
function setupLikeButton() {
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
        // Check if profile was already liked
        const isLiked = localStorage.getItem('profileLiked') === 'true';
        if (isLiked) {
            likeBtn.textContent = "❤️ Liked!";
            likeBtn.classList.add("liked");
        }
        
        likeBtn.addEventListener('click', function () {
            if (!likeBtn.classList.contains('liked')) {
                alert("Thanks for liking! 😊");
                likeBtn.textContent = "❤️ Liked!";
                likeBtn.classList.add("liked");
                // Store like status
                localStorage.setItem('profileLiked', 'true');
            } else {
                alert("You already liked this profile! 💖");
            }
        });
    }
}

// Page-specific initialization
function initializePageSpecificFeatures() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'journal':
            console.log('Initializing journal-specific features');
            // Journal page specific features are handled by browser.js
            break;
        case 'about':
            setupLikeButton();
            break;
        case 'projects':
            console.log('Projects page loaded');
            break;
        case 'index':
            console.log('Home page loaded');
            break;
    }
}

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing features...');
    
    // Core features
    setupLiveDateTime();
    setupThemeToggle();
    insertNavigation();
    setActiveNavItem();
    
    // Initialize all APIs
    initializeAPIs();
    
    // Page-specific features
    initializePageSpecificFeatures();
    
    console.log('All features initialized successfully');
});

// Legacy function for compatibility
function likeMyProfile() {
    alert("Thanks for liking my profile.");
}

// Utility function to check if an API is available
function isAPIAvailable(apiName) {
    switch(apiName) {
        case 'localStorage':
            return typeof(Storage) !== "undefined";
        case 'geolocation':
            return "geolocation" in navigator;
        case 'notification':
            return "Notification" in window;
        default:
            return false;
    }
}

