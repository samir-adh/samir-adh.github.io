// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based header styling
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 11, 13, 0.95)';
    } else {
        header.style.background = 'rgba(10, 11, 13, 0.85)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .timeline-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add typing effect to code block
const codeBlock = document.querySelector('.code-content code');
if (codeBlock) {
    // Store original HTML and clear it
    const originalHTML = codeBlock.innerHTML.trim();
    codeBlock.innerHTML = '';
    
    let index = 0;
    let displayedHTML = '';
    
    function typeText() {
        if (index < originalHTML.length) {
            const char = originalHTML[index];
            
            // If we encounter an HTML tag, add it all at once
            if (char === '<') {
                const endTag = originalHTML.indexOf('>', index);
                if (endTag !== -1) {
                    displayedHTML += originalHTML.substring(index, endTag + 1);
                    index = endTag + 1;
                } else {
                    displayedHTML += char;
                    index++;
                }
            } else {
                displayedHTML += char;
                index++;
            }
            
            // Update the innerHTML
            codeBlock.innerHTML = displayedHTML;
            
            // Vary typing speed for natural effect
            const speed = (char === '\n' || char === ' ') ? 30 : Math.random() * 30 + 10;
            setTimeout(typeText, speed);
        } else {
            // Typing complete - add blinking cursor
            addBlinkingCursor();
        }
    }
    
    function addBlinkingCursor() {
        const cursor = document.createElement('span');
        cursor.textContent = '▊';
        cursor.style.cssText = `
            color: var(--color-accent);
            animation: blink 1s step-end infinite;
            margin-left: 2px;
        `;
        codeBlock.appendChild(cursor);
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 800);
}

// Console easter egg
console.log('%c🚀 Backend Developer Portfolio', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
console.log('%cSamir Abdallah', 'font-size: 16px; color: #e8eaed;');
console.log('%c→ Python • TypeScript • Java • Go', 'font-size: 14px; color: #9ca3af;');
console.log('%cInterested in hiring? Email: samir.abdallah@telecomnancy.net', 'font-size: 14px; color: #00d9ff;');