// Navbar functionality
const initNavigation = () => {
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const navbar = document.getElementById('mainNav');

    // Mobile menu toggle
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });

        // Close menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuButton.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
};

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavigation); 