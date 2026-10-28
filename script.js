// ========================================
// MODERN PORTFOLIO - JAVASCRIPT
// ========================================

// 1. Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openMobileNav() {
    updateActiveNavLink(); // Synchronize active section before displaying menu
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('open');
    if (navOverlay) navOverlay.classList.add('open');
    document.body.classList.add('no-scroll');
}

function closeMobileNav() {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileNav);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            closeMobileNav();
        }
    });
}

// 2. Active Section Tracker (Scroll Spy)
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 70;
    
    // Check if scrolled near the bottom of the page (activates Contact)
    const isAtBottom = (window.innerHeight + window.pageYOffset) >= (document.documentElement.scrollHeight - 60);
    
    let currentSection = '';
    
    if (isAtBottom && sections.length > 0) {
        currentSection = sections[sections.length - 1].getAttribute('id');
    } else {
        // Find which section is currently positioned around the reading line (top 35% of viewport)
        const probePoint = navHeight + 100;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= probePoint && rect.bottom >= probePoint) {
                currentSection = section.getAttribute('id');
            }
        });

        // Fallback: if at the very top of page, default to first section (home)
        if (!currentSection && window.pageYOffset < 200 && sections.length > 0) {
            currentSection = sections[0].getAttribute('id');
        }
    }
    
    if (currentSection) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
window.addEventListener('DOMContentLoaded', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// 3. Smooth scrolling with fixed nav height offset
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Remove focus blur to prevent sticky touch hover
        this.blur();

        // Immediately update active status to clicked link
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Close mobile nav when link is clicked
        closeMobileNav();

        if (targetSection) {
            const navHeight = document.querySelector('nav').offsetHeight || 70;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 4. Smooth reveal animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatableElements = document.querySelectorAll('.about-card, .skills-card, .pf-item, .contact-card, .reflection-box');

animatableElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${Math.min(index % 3 * 0.1, 0.3)}s`;
    observer.observe(el);
});

// 5. Project Filter
function filterProjects(cat, btn) {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.pf-item').forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
            item.classList.remove('hide');
            item.style.animation = 'none';
            item.offsetHeight; // reflow
            item.style.animation = '';
        } else {
            item.classList.add('hide');
        }
    });
}

// 6. Netlify Drawer / Badge Remover (Desktop & Mobile)
function purgeNetlifyBadge() {
    const netlifySelectors = [
        '#netlify-drawer',
        'netlify-drawer',
        '[class*="netlify-drawer"]',
        '[id*="netlify-drawer"]',
        '[data-netlify-deploy-id]',
        'iframe[src*="netlify"]',
        'iframe[title*="Netlify"]',
        '.netlify-badge'
    ];
    netlifySelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
    });
}

// Run immediately and repeatedly to catch asynchronous Netlify injections
purgeNetlifyBadge();
document.addEventListener('DOMContentLoaded', purgeNetlifyBadge);
window.addEventListener('load', purgeNetlifyBadge);

if (window.MutationObserver) {
    const netlifyWatcher = new MutationObserver(() => {
        purgeNetlifyBadge();
    });
    netlifyWatcher.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}
