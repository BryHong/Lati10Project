// Intersection Observer for fade-in and fade-in-left animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.01 });

// Select all elements with the 'fade-in' or 'fade-in-left' class and observe them
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-bottom').forEach(el => {
    observer.observe(el);
});

// Navbar for Mobile
document.querySelector('.navbar-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('show');
});

// Close Navbar menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('show');
    });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});


// Smooth scrolling for navbar links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active navbar item on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
    const navbarBrand = document.querySelector('.navbar-brand');
    if (window.scrollY < 100) {
        navbarBrand.classList.add('active');
    } else {
        navbarBrand.classList.remove('active');
    }
});

// Image Slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = slider.querySelectorAll('img');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let startX;
    let isDragging = false;
  
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  
    const dots = dotsContainer.querySelectorAll('.dot');
  
    function goToSlide(index) {
      currentIndex = index;
      slider.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }
  
    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  
    function handleDragStart(e) {
      startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      isDragging = true;
    }
  
    function handleDragMove(e) {
      if (!isDragging) return;
      const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const diff = startX - currentX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < slides.length - 1) {
          goToSlide(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          goToSlide(currentIndex - 1);
        }
        isDragging = false;
      }
    }
  
    function handleDragEnd() {
      isDragging = false;
    }
  
    function handleClick() {
        if (currentIndex < slides.length - 1) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(0);
        }
      }
    slider.addEventListener('mousedown', handleDragStart);
    slider.addEventListener('mousemove', handleDragMove);
    slider.addEventListener('mouseup', handleDragEnd);
    slider.addEventListener('mouseleave', handleDragEnd);
  
    slider.addEventListener('touchstart', handleDragStart);
    slider.addEventListener('touchmove', handleDragMove);
    slider.addEventListener('touchend', handleDragEnd);
    slider.addEventListener('click', (e) => {
        if (!isDragging) {
          handleClick();
        }
      });
  
    // Initial dot update
    updateDots();
  });