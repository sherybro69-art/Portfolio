// Typing Animation
const typingText = document.getElementById('typing-text');
const textToType = 'Unity Game Developer';
let typingIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    if (!typingText) return;
    
    const currentText = textToType.substring(0, typingIndex);
    typingText.textContent = currentText;
    
    if (!isDeleting && typingIndex < textToType.length) {
        typingIndex++;
        typingSpeed = 100;
    } else if (isDeleting && typingIndex > 0) {
        typingIndex--;
        typingSpeed = 50;
    } else if (typingIndex === textToType.length) {
        isDeleting = true;
        typingSpeed = 2000; // Wait before deleting
    } else if (typingIndex === 0 && isDeleting) {
        isDeleting = false;
        typingSpeed = 500; // Wait before typing again
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 1000); // Start after 1 second
});

// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
            observer.unobserve(entry.target);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');

const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const suffix = stat.getAttribute('data-suffix') || '';
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + suffix;
                    }
                };

                updateCounter();
            });
            observer.unobserve(entry.target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
});

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Dropdown filter from navigation
document.querySelectorAll('.dropdown-menu a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filterValue = link.getAttribute('data-filter');
        
        // Update filter buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('active');
            }
        });

        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Scroll to portfolio section
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            const offsetTop = portfolioSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// EmailJS initialization (commented out - using mailto: instead)
// Agar baad mein EmailJS use karna ho, to uncomment karo aur setup karo
// (function() {
//     emailjs.init("YOUR_PUBLIC_KEY");
// })();

// Contact Form Submission - Simple mailto approach
const contactForm = document.getElementById('contactForm');
const loadingOverlay = document.getElementById('loadingOverlay');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button[type="submit"]');
        const btnText = contactForm.querySelector('.btn-text');
        const btnLoading = contactForm.querySelector('.btn-loading');
        const originalBtnText = btnText ? btnText.textContent : 'Send Message';
        
        // Get form data
        const name = contactForm.querySelector('[name="name"]').value;
        const email = contactForm.querySelector('[name="email"]').value;
        const subject = contactForm.querySelector('[name="subject"]').value;
        const message = contactForm.querySelector('[name="message"]').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show loading state
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.style.cursor = 'not-allowed';
        }
        if (btnText) btnText.textContent = 'Opening Email...';
        if (btnLoading) btnLoading.style.display = 'inline';
        
        // Create mailto link with form data
        const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        const mailtoLink = `mailto:sheryrao30@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        setTimeout(() => {
            if (btnText) btnText.textContent = 'Email Opened! ✓';
            setTimeout(() => {
                if (btnText) btnText.textContent = originalBtnText;
                contactForm.reset();
            }, 2000);
        }, 500);
        
        // Reset button state
        setTimeout(() => {
            if (btn) {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
            if (btnLoading) btnLoading.style.display = 'none';
        }, 1000);
    });
}

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(section);
});

// Initialize - show first section immediately
if (sections.length > 0) {
    sections[0].style.opacity = '1';
    sections[0].style.transform = 'translateY(0)';
}

// Prevent form resubmission on page reload
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Smart Play Store Links - Mobile pe app, Desktop pe browser
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isIOSDevice() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroidDevice() {
    return /Android/i.test(navigator.userAgent);
}

function getPlayStoreLink(packageId) {
    if (isAndroidDevice()) {
        // Android mobile pe Play Store app directly open karega
        return `intent://details?id=${packageId}#Intent;scheme=market;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=https://play.google.com/store/apps/details?id=${packageId};end`;
    } else {
        // Desktop pe browser link
        return `https://play.google.com/store/apps/details?id=${packageId}`;
    }
}

function getAppStoreLink(appId) {
    if (isIOSDevice()) {
        // iOS pe App Store app directly open karega
        return `itms-apps://apps.apple.com/app/id${appId}`;
    } else {
        // Desktop/Android pe browser link
        return `https://apps.apple.com/app/id${appId}`;
    }
}

// Page load pe sab Play Store links update karo
window.addEventListener('load', () => {
    // Android Play Store links
    const portfolioLinks = document.querySelectorAll('.portfolio-link[href*="play.google.com/store/apps/details"]');
    portfolioLinks.forEach(link => {
        const href = link.getAttribute('href');
        const packageIdMatch = href.match(/id=([^&]+)/);
        if (packageIdMatch) {
            const packageId = packageIdMatch[1];
            link.setAttribute('href', getPlayStoreLink(packageId));
        }
    });
    
    // iOS App Store links - agar app ID extract ho sake
    const iosLinks = document.querySelectorAll('.portfolio-link[href*="apps.apple.com"]');
    iosLinks.forEach(link => {
        const href = link.getAttribute('href');
        // App Store link format: https://apps.apple.com/us/app/app-name/id123456789
        const appIdMatch = href.match(/\/id(\d+)/);
        if (appIdMatch) {
            const appId = appIdMatch[1];
            link.setAttribute('href', getAppStoreLink(appId));
        }
    });
    
    // Home section button (account link)
    const accountButton = document.querySelector('a[href*="play.google.com/store/apps/dev"]');
    if (accountButton && isAndroidDevice()) {
        const accountId = '4989665937495641401';
        accountButton.setAttribute('href', `intent://dev?id=${accountId}#Intent;scheme=market;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=https://play.google.com/store/apps/dev?id=${accountId};end`);
    }
});