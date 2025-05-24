// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
    
    // Animate Links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-content, .expertise-item, .work-item, .award-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animations
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.about-content, .expertise-item, .work-item, .award-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger first animation
    setTimeout(() => {
        animateOnScroll();
    }, 500);
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Add CSS for navLinkFade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Horizontal scroll for galleries with mouse drag
const expertiseGallery = document.querySelector('.expertise-gallery');
const workGallery = document.querySelector('.work-gallery');

let isDown = false;
let startX;
let scrollLeft;

const startDrag = (gallery, e) => {
    isDown = true;
    gallery.classList.add('active');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
};

const endDrag = (gallery) => {
    isDown = false;
    gallery.classList.remove('active');
};

const drag = (gallery, e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 2;
    gallery.scrollLeft = scrollLeft - walk;
};

[expertiseGallery, workGallery].forEach(gallery => {
    gallery.addEventListener('mousedown', (e) => startDrag(gallery, e));
    gallery.addEventListener('mouseleave', () => endDrag(gallery));
    gallery.addEventListener('mouseup', () => endDrag(gallery));
    gallery.addEventListener('mousemove', (e) => drag(gallery, e));
});


document.addEventListener('DOMContentLoaded', function() {
    const photosContainer = document.querySelector('.featured-photos');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    
    if (photosContainer && scrollDots.length > 0) {
      photosContainer.addEventListener('scroll', function() {
        const scrollPercentage = this.scrollLeft / (this.scrollWidth - this.clientWidth);
        const activeDot = Math.round(scrollPercentage * (scrollDots.length - 1));
        
        scrollDots.forEach((dot, index) => {
          dot.classList.toggle('active', index === activeDot);
        });
      });
    }
  });