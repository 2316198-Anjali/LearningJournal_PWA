// Reusable Navigation Menu Template


    // Feature 1: Live Date/Time Display
    function setupLiveDateTime() {
        const dateTimeContainer = document.getElementById('live-datetime');
        if (dateTimeContainer) {
            this.updateDateTime();
            // Update every second
            setInterval(() => this.updateDateTime(), 1000);
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

    // Feature 2: Theme Switcher
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Load saved theme or default to light
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.body.setAttribute('data-theme', savedTheme);
            this.updateThemeButtonText(savedTheme);

            themeToggle.addEventListener('click', () => {
                const currentTheme = document.body.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';

                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                this.updateThemeButtonText(newTheme);
            });
        }
    }

    function updateThemeButtonText(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? ' Dark Mode' : ' Light Mode';
        }
    }





    this.navTemplate = `
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
      header.insertAdjacentHTML('afterend', this.navTemplate);
      this.setActiveNavItem();
    }
  }

  // Set active navigation item based on current page
  function setActiveNavItem() {
    const currentPage = this.getCurrentPage();
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


  // Initialize interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupLiveDateTime();
    setupThemeToggle();

  insertNavigation();

  setActiveNavItem();

  const likeBtn = document.getElementById('like-btn');
    
    likeBtn.addEventListener('click', function () {
        alert("Thanks for liking! 😊");
        
         likeBtn.textContent = "❤️ Liked!";
        likeBtn.classList.add("liked");
    });

});


function likeMyProfile(){
    alert("Thanks for liking my profile.");
}

