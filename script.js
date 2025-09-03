let activeSection = 'home';
let isScrolling = false;

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    setupNavigation();
    setupScrollAnimations();
    setupSkillBars();
    setupContactForm();
    setupMobileMenu();
    startTypingAnimation();
});

// Create background particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 5;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size and position
        const size = Math.random() * 12 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.6 + 0.3;
        
        // Random animation delay
        particle.style.animationDelay = i * 1.2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Setup navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
            }
        });
    });

    // Scroll spy functionality
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('show');
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            if (activeSection !== sectionId) {
                activeSection = sectionId;
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

// Setup scroll animations for sections
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSection(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections except hero
    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach(section => observer.observe(section));
}

// Animate section elements when they come into view
function animateSection(section) {
    const sectionId = section.getAttribute('id');
    
    switch (sectionId) {
        case 'about':
            animateAboutSection();
            break;
        case 'skills':
            animateSkillsSection();
            break;
        case 'projects':
            animateProjectsSection();
            break;
        case 'contact':
            animateContactSection();
            break;
    }
}

function animateAboutSection() {
    const sectionHeader = document.querySelector('#about .section-header');
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    const cards = document.querySelectorAll('#about .card');
    
    if (!sectionHeader.classList.contains('animate')) {
        sectionHeader.classList.add('animate');
        aboutImage.classList.add('animate');
        aboutText.classList.add('animate');
        cards.forEach(card => card.classList.add('animate'));
    }
}

function animateSkillsSection() {
    const sectionHeader = document.querySelector('#skills .section-header');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    if (!sectionHeader.classList.contains('animate')) {
        sectionHeader.classList.add('animate');
        skillCategories.forEach(category => category.classList.add('animate'));
        
        // Skills animation no longer needed
    }
}

function animateProjectsSection() {
    const sectionHeader = document.querySelector('#projects .section-header');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!sectionHeader.classList.contains('animate')) {
        sectionHeader.classList.add('animate');
        projectCards.forEach(card => card.classList.add('animate'));
    }
}

function animateContactSection() {
    const sectionHeader = document.querySelector('#contact .section-header');
    const formContainer = document.querySelector('.contact-form-container');
    const footer = document.querySelector('.footer');
    
    if (!sectionHeader.classList.contains('animate')) {
        sectionHeader.classList.add('animate');
        formContainer.classList.add('animate');
        footer.classList.add('animate');
    }
}

// Setup skill items (no longer using progress bars)
function setupSkillBars() {
    // No longer needed - keeping function for compatibility
}

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = form.querySelector('button[type=\"submit\"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showNotification('Message sent successfully! Thank you for reaching out.', 'success');
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Typing animation for hero subtitle
function startTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const text = 'Full Stack Developer & Software Engineer';
    let index = 0;
    
    typingText.textContent = '';
    
    setTimeout(() => {
        const typeChar = () => {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, 100);
            } else {
                // Stop blinking cursor after typing is done
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 1000);
            }
        };
        typeChar();
    }, 500);
}

// Download CV function
function downloadCV() {
    window.open('/api/cv/download', '_blank');
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add smooth scrolling for all internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^=\"#\"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add loading animation when page loads
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});