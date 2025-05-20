import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    pageLoadAnimation();
    showFeatureCards();
    createTypingEffect();
    setupSmoothScrolling();
    createScrollToTopButton();
    animateToolCategories();
    createThemeToggler();
    initializeImageSlider();
});

function pageLoadAnimation() {
    /**
     * Animates the page load sequence.
     */
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    gsap.set([nav, header], { opacity: 0, y: -20 });

    const tl = gsap.timeline();

    tl.to(nav, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    tl.to(header, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
}

function showFeatureCards() {
    /**
     * Ensures feature cards are visible and adds simple animations.
     */
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.style.opacity = 1;
        card.style.transform = 'none';
    });

    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animated');
        }, index * 100);
    });

    featureCards.forEach(card => {
        const title = card.querySelector('h3');

        card.addEventListener('mouseenter', () => {
            if (title) title.style.color = '#3b82f6';
        });

        card.addEventListener('mouseleave', () => {
            if (title) title.style.color = '';
        });
    });
}

function createTypingEffect() {
    /**
     * Creates a typing effect in the ASCII art section.
     */
    const asciiArt = document.querySelector('.ascii-art');
    if (!asciiArt) return;

    const originalText = asciiArt.innerHTML;
    asciiArt.innerHTML = '';

    const lines = originalText.split('\n');
    const tl = gsap.timeline();

    let currentLine = 0;
    let currentChar = 0;
    let outputDiv = document.createElement('div');
    asciiArt.appendChild(outputDiv);
    outputDiv.style.whiteSpace = 'pre';

    function typeText() {
        /**
         * Types the text character by character.
         */
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            if (currentChar < line.length) {
                outputDiv.innerHTML += line.charAt(currentChar);
                currentChar++;
                setTimeout(typeText, 3);
            } else {
                outputDiv.innerHTML += '\n';
                currentLine++;
                currentChar = 0;
                setTimeout(typeText, 30);
            }
        }
    }

    setTimeout(typeText, 500);
}

function animateToolCategories() {
    /**
     * Applies special effects to tool categories using GSAP and ScrollTrigger.
     */
    const toolCategories = document.querySelectorAll('.tool-category');

    toolCategories.forEach((category, index) => {
        gsap.from(category, {
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: category,
                start: "top 85%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

function setupSmoothScrolling() {
    /**
     * Sets up smooth scrolling for navigation links.
     */
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function createScrollToTopButton() {
    /**
     * Creates a scroll-to-top button and handles its visibility.
     */
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);

    gsap.set(scrollTopBtn, { opacity: 0, display: 'none' });

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 600) {
            gsap.to(scrollTopBtn, {
                opacity: 1,
                duration: 0.3,
                display: 'block'
            });
        } else {
            gsap.to(scrollTopBtn, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    scrollTopBtn.style.display = 'none';
                }
            });
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function createThemeToggler() {
    /**
     * Creates and manages the theme toggler functionality.
     */
    const themeToggleButton = document.createElement('button');
    themeToggleButton.className = 'theme-toggle';
    themeToggleButton.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(themeToggleButton);

    const sunIcon = '☀️';
    const moonIcon = '🌙';

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggleButton.innerHTML = currentTheme === 'light' ? moonIcon : sunIcon;
    } else {
        if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleButton.innerHTML = sunIcon;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggleButton.innerHTML = moonIcon;
        }
    }

    if (!document.documentElement.getAttribute('data-theme')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleButton.innerHTML = sunIcon;
    }


    themeToggleButton.addEventListener('click', () => {
        let newTheme;
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            newTheme = 'dark';
            themeToggleButton.innerHTML = sunIcon;
        } else {
            newTheme = 'light';
            themeToggleButton.innerHTML = moonIcon;
        }
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function initializeImageSlider() {
    /**
     * Initializes and manages the image slider.
     */
    const images = [
        { src: "assets/images/Main Menu Showcase.PNG", caption: "Main Menu" },
        { src: "assets/images/Agent Showcase.png", caption: "Agent Mode Showcase" },
        { src: "assets/images/Agent Mode New commands.PNG", caption: "Agent Mode - New Commands" },
        { src: "assets/images/Second Agent.PNG", caption: "Agent Mode - Example Interaction" },
        { src: "assets/images/First Implementation Chat With Ai.png", caption: "Chat With AI - Initial Query" },
        { src: "assets/images/Second Implementation Chat With Ai.PNG", caption: "Chat With AI - Follow-up" }
    ];

    let currentIndex = 0;

    const sliderImage = document.getElementById('sliderImage');
    const imageCaption = document.getElementById('imageCaption');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');

    if (!sliderImage || !imageCaption || !prevButton || !nextButton) {
        return;
    }

    function updateSlider() {
        /**
         * Updates the slider with the current image and caption.
         */
        sliderImage.src = images[currentIndex].src;
        sliderImage.alt = images[currentIndex].caption;
        imageCaption.textContent = images[currentIndex].caption;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    if (images.length > 0) {
        updateSlider();
    } else {
        imageCaption.textContent = "No images to display.";
        sliderImage.style.display = 'none';
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    }
}