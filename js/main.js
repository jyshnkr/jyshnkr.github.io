// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Animate skill bars on scroll
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkills() {
        const triggerBottom = window.innerHeight * 0.8;
        
        skillLevels.forEach(skill => {
            const skillTop = skill.getBoundingClientRect().top;
            
            if (skillTop < triggerBottom) {
                skill.style.width = skill.style.width;
            } else {
                skill.style.width = '0';
            }
        });
    }
    
    // Initial check for elements in view
    animateSkills();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkills);
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted:', formValues);
            
            // Reset form and show success message
            contactForm.reset();
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-level').forEach(el => {
        // Read the target percent
        const pct = el.getAttribute('data-percent');
        // Trigger the CSS transition
        el.style.width = pct + '%';
    });
});

// Smooth scroll + close mobile menu on first click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
  
      // 1) Determine the target section
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        // 2) Smoothly scroll there
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
  
      // 3) If mobile menu is open, close it
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });