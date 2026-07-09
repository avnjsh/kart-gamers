/**
 * Kart Gamers - Custom JavaScript
 * Features: Mobile Menu, Smooth Scroll, Button Animations, Navbar Effects, Loading Animation, Dark Mode
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initButtonAnimations();
    initDarkMode();
});

/**
 * 1. Loading Animation
 * Removes the loading overlay once the page is fully loaded
 */
function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // Matches CSS transition time
        });
    }
}

/**
 * 2. Mobile Menu Toggle
 * Handles opening and closing of the mobile navigation drawer
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('toggle-active');
            
            // Accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('toggle-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * 3. Navbar Effects on Scroll
 * Adds background color/blur and shrinks navbar when scrolling down
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

/**
 * 4. Smooth Scrolling
 * Enhanced smooth scrolling for anchor links with offset fallback
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 5. Button Animations
 * Micro-interactions for gaming buttons (ripple effect / magnetic hover feedback)
 */
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-animate, .gamers-btn');
    
    buttons.forEach(btn => {
        // Ripple Effect on Click
        btn.addEventListener('click', function (e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Subtle Tilt/Scale on Mouse Move (Gaming Feel)
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            btn.style.transform = `scale(1.05) translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) translate(0px, 0px)';
        });
    });
}

/**
 * 6. Dark Mode Toggle
 * Persists user preference via LocalStorage and syncs with system preference
 */
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return;

    // Check saved theme or fallback to system preference
    const savedTheme = localStorage.getItem('kg-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleState(darkModeToggle, true);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateToggleState(darkModeToggle, false);
    }

    // Toggle click event
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme === 'light') {
            newTheme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('kg-theme', newTheme);
        updateToggleState(darkModeToggle, newTheme === 'dark');
    });
}

function updateToggleState(toggleBtn, isDark) {
    if (isDark) {
        toggleBtn.classList.add('dark-active');
        toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
        toggleBtn.classList.remove('dark-active');
        toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
}