// Mobile menu functionality with improved transitions
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.style.opacity = '1';
            mobileMenu.style.transform = 'translateY(0)';
        }, 10);
    } else {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
});

// Enhanced mobile menu link handling
const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
Array.from(mobileMenuLinks).forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
        isMenuOpen = false;
    });
});

// Responsive navigation handling
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Show/hide navigation on scroll
    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
        nav.classList.remove('shadow-lg');
        nav.classList.add('shadow-sm');
    } else if (currentScroll > lastScroll) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
        nav.classList.add('shadow-lg');
        nav.classList.remove('shadow-sm');
    }
    lastScroll = currentScroll;
});

// Smooth scroll with offset adjustment for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced form submission with validation
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<div class="loading mx-auto"></div>';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Reset form
            contactForm.reset();
            
            // Show success message with custom styling
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
        } catch (error) {
            showNotification('An error occurred. Please try again later.', 'error');
        } finally {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Custom notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white transform transition-transform duration-300 translate-y-full`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(full)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Intersection Observer for scroll animations with responsive thresholds
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: window.innerWidth < 768 ? 0.1 : 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            if (entry.target.classList.contains('stagger-children')) {
                Array.from(entry.target.children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-fadeIn');
                    }, index * 100);
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections and stagger child animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    if (section.id === 'services' || section.id === 'process') {
        section.classList.add('stagger-children');
    }
});

// Responsive resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to service cards
    document.querySelectorAll('#services .bg-gray-50').forEach(card => {
        card.classList.add('hover-scale');
    });

    // Add scroll to top button with responsive positioning
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 opacity-0 pointer-events-none';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight / 2) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 