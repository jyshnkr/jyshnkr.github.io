// Radical Steve Jobs-Inspired Portfolio JavaScript
// QR Code, Keyboard Navigation, Scroll Optimization

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.fullscreen-section');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const scrollArrow = document.getElementById('scrollArrow');
    let currentSection = 0;
    let isScrolling = false;
    
    // Generate QR Code for Resume
    function generateQRCode() {
        // Use absolute URL for GitHub Pages
        // Update the version number below when you update your resume to bust cache
        const RESUME_VERSION = 'v2'; // Change this when resume is updated
        const resumeUrl = `https://jyshnkr.github.io/assets/JayaShankarMangina.pdf?${RESUME_VERSION}`;
        const qrElement = document.getElementById('qrCode');
        
        if (qrElement) {
            // Clear any existing content
            qrElement.innerHTML = '';
            
            // Try using QRCode library (newer API)
            if (typeof QRCode !== 'undefined' && QRCode.toCanvas) {
                // Use canvas-based QR code (more reliable)
                const canvas = document.createElement('canvas');
                QRCode.toCanvas(canvas, resumeUrl, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    },
                    errorCorrectionLevel: 'H'
                }, function(error) {
                    if (error) {
                        console.error('QR Code generation error:', error);
                        useFallbackQR(qrElement, resumeUrl);
                    } else {
                        qrElement.appendChild(canvas);
                    }
                });
            } else if (typeof QRCode !== 'undefined' && QRCode.toDataURL) {
                // Alternative API
                QRCode.toDataURL(resumeUrl, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                }, function(err, url) {
                    if (err) {
                        console.error('QR Code generation error:', err);
                        useFallbackQR(qrElement, resumeUrl);
                    } else {
                        const img = document.createElement('img');
                        img.src = url;
                        img.alt = 'Resume QR Code';
                        qrElement.appendChild(img);
                    }
                });
            } else {
                // Fallback: Use API if library fails to load
                useFallbackQR(qrElement, resumeUrl);
            }
        }
    }
    
    // Fallback QR code using API
    function useFallbackQR(element, url) {
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=2&data=${encodeURIComponent(url)}`;
        const img = document.createElement('img');
        img.src = qrApiUrl;
        img.alt = 'Resume QR Code';
        img.style.width = '200px';
        img.style.height = '200px';
        img.style.display = 'block';
        element.appendChild(img);
    }
    
    // Update active scroll indicator
    function updateActiveIndicator() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = index;
                scrollDots.forEach(dot => dot.classList.remove('active'));
                if (scrollDots[index]) {
                    scrollDots[index].classList.add('active');
                }
                
                // Hide scroll arrow after first scroll
                if (index > 0 && scrollArrow) {
                    scrollArrow.classList.add('hidden');
                }
            }
        });
    }
    
    // Scroll to section
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length || isScrolling) return;
        
        isScrolling = true;
        sections[index].scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }
    
    // Scroll to section on dot click
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToSection(index));
    });
    
    // Scroll arrow click
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            scrollToSection(1);
        });
    }
    
    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (isScrolling) return;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                if (currentSection < sections.length - 1) {
                    scrollToSection(currentSection + 1);
                }
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                if (currentSection > 0) {
                    scrollToSection(currentSection - 1);
                }
                break;
            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;
            case 'End':
                e.preventDefault();
                scrollToSection(sections.length - 1);
                break;
        }
    });
    
    // Update on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveIndicator();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetIndex = Array.from(sections).findIndex(s => s.id === targetId);
                if (targetIndex !== -1) {
                    scrollToSection(targetIndex);
                }
            }
        });
    });
    
    // Generate QR code
    generateQRCode();
    
    // Initial update
    updateActiveIndicator();
    
    // Touch/swipe support for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold && !isScrolling) {
            if (diff > 0 && currentSection < sections.length - 1) {
                // Swipe up - next section
                scrollToSection(currentSection + 1);
            } else if (diff < 0 && currentSection > 0) {
                // Swipe down - previous section
                scrollToSection(currentSection - 1);
            }
        }
    }
});
