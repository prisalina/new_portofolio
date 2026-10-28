// ========================================
// ESALINA'S PORTFOLIO - JAVASCRIPT
// ========================================

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Create additional floating leaves dynamically
function createFloatingLeaves() {
    const leafEmojis = ['🌿', '🍃', '🌱', '🌾', '🍀'];
    
    for (let i = 0; i < 8; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf-bg';
        leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        
        // Random positioning
        leaf.style.top = Math.random() * 100 + '%';
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.animationDelay = Math.random() * 3 + 's';
        leaf.style.fontSize = (2 + Math.random() * 2) + 'rem';
        
        document.body.appendChild(leaf);
    }
}

// Call the function when page loads
window.addEventListener('load', createFloatingLeaves);

// Add scroll reveal animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all containers
document.querySelectorAll('.container').forEach(container => {
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    container.style.transition = 'all 0.8s ease-out';
    observer.observe(container);
});

// Add hover effect sound (optional - you can remove this if you want)
// Uncomment below if you want to add click sound effects
/*
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        // Add your sound effect here if you have audio files
        console.log('Button clicked!');
    });
});
*/

// Log portfolio loaded
console.log('🌿 Esalina\'s Portfolio loaded successfully! 🌿');