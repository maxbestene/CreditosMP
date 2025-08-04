// Main JavaScript for Corsair AI Landing Page

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all modules
    initScrollAnimations();
    initNavigation();
    initCustomCursor();
    initBackToTop();
    initSmoothScroll();
    initVideoBackground();
    initAnimatedWord();
    
    console.log('Corsair AI Landing Page initialized');
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, parseInt(delay));
                
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements that should animate
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach((el) => {
        observer.observe(el);
    });

    // Section-based animations
    initSectionAnimations();
}

// Section-specific animations
function initSectionAnimations() {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const section = entry.target;
            const sectionName = section.getAttribute('data-section');
            
            if (entry.isIntersecting) {
                // Update active navigation
                updateActiveNavigation(sectionName);
                
                // Trigger section-specific animations
                triggerSectionAnimations(section);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    });

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => sectionObserver.observe(section));
}

// Update active navigation
function updateActiveNavigation(activeSection) {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        const linkParent = link.closest('li');
        
        if (linkParent) {
            if (href === activeSection) {
                linkParent.classList.add('current-menu-item');
            } else {
                linkParent.classList.remove('current-menu-item');
            }
        }
    });
}

// Trigger section-specific animations
function triggerSectionAnimations(section) {
    const sectionName = section.getAttribute('data-section');
    
    switch(sectionName) {
        case 'home':
            animateHeroSection(section);
            break;
        case 'portfolio':
            animatePortfolioItems(section);
            break;
        case 'services':
            animateServicesSection(section);
            break;
    }
}

// Hero section animations
function animateHeroSection(section) {
    const elements = section.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.transform = 'translateY(0) scale(1)';
            el.style.opacity = '1';
        }, index * 200);
    });
}

// Portfolio items staggered animation
function animatePortfolioItems(section) {
    const items = section.querySelectorAll('.portfolio-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 150);
    });
}

// Services section animation
function animateServicesSection(section) {
    const splitscreen = section.querySelector('.apg-splitscreen');
    if (splitscreen) {
        setTimeout(() => {
            splitscreen.style.transform = 'translateY(0) rotateX(0deg)';
            splitscreen.style.opacity = '1';
        }, 300);
    }
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.nav_qrd90ms48 #navbar-top');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('#navbar-overlay');
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger && overlay) {
        hamburger.addEventListener('click', () => {
            overlay.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close overlay when clicking on links
        const overlayLinks = overlay.querySelectorAll('a[href^="#"]');
        overlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Close overlay on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay?.classList.contains('active')) {
            overlay.classList.remove('active');
            hamburger?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('semplice-cursor');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });

    // Smooth cursor movement
    function updateCursor() {
        const ease = 0.15;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .is-content[href], [role="button"]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const overlay = document.querySelector('#navbar-overlay');
                const hamburger = document.querySelector('.hamburger');
                if (overlay?.classList.contains('active')) {
                    overlay.classList.remove('active');
                    hamburger?.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Calculate position
                const headerHeight = document.querySelector('.nav_qrd90ms48 #navbar-top')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                // Smooth scroll with easing
                smoothScrollTo(targetPosition, 1000);
                
                // Update URL without triggering scroll
                history.pushState(null, null, href);
            }
        });
    });
    
    // Handle direct anchor navigation (page load with #anchor)
    window.addEventListener('load', () => {
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    const headerHeight = document.querySelector('.nav_qrd90ms48 #navbar-top')?.offsetHeight || 80;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    });
}

// Custom smooth scroll with easing
function smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Video Background
function initVideoBackground() {
    const video = document.querySelector('#hero-video');
    const videoFallback = document.querySelector('.video-fallback');
    const playPauseBtn = document.querySelector('#video-play-pause');
    const muteBtn = document.querySelector('#video-mute');
    
    if (!video) return;

    let isVideoLoaded = false;
    let isVideoError = false;
    let hasUserInteracted = false;

    // Video loading state
    video.setAttribute('data-loading', 'true');
    video.setAttribute('data-paused', 'true');

    // Video loaded successfully
    video.addEventListener('loadeddata', () => {
        video.setAttribute('data-loading', 'false');
        isVideoLoaded = true;
        console.log('Hero video loaded successfully');
        
        // Try autoplay immediately
        attemptAutoplay();
    });

    // Video can play through
    video.addEventListener('canplaythrough', () => {
        console.log('Video fully loaded and ready');
        isVideoLoaded = true;
        video.setAttribute('data-loading', 'false');
        
        // Try autoplay if not already playing
        if (video.paused) {
            attemptAutoplay();
        }
    });

    // Function to attempt autoplay
    function attemptAutoplay() {
        if (!isVideoLoaded || isVideoError) return;
        
        video.play().then(() => {
            console.log('✅ Video autoplay successful');
            hasUserInteracted = true;
            video.setAttribute('data-paused', 'false');
        }).catch((error) => {
            console.log('⚠️ Autoplay blocked by browser policy:', error.message);
            // Set up click-to-play on the video itself
            setupClickToPlay();
        });
    }

    // Setup click-to-play directly on video
    function setupClickToPlay() {
        video.style.cursor = 'pointer';
        
        const clickHandler = () => {
            video.play().then(() => {
                console.log('✅ Video started by user click');
                hasUserInteracted = true;
                video.setAttribute('data-paused', 'false');
                video.style.cursor = 'default';
                video.removeEventListener('click', clickHandler);
            }).catch(handleVideoError);
        };
        
        video.addEventListener('click', clickHandler);
    }

    // Video error handling
    video.addEventListener('error', handleVideoError);
    
    function handleVideoError(e) {
        console.error('Video error occurred:', e);
        isVideoError = true;
        video.setAttribute('data-error', 'true');
        
        if (videoFallback) {
            videoFallback.setAttribute('data-visible', 'true');
        }
        
        // Hide video controls if video failed
        const controls = document.querySelector('.video-controls');
        if (controls) controls.style.display = 'none';
        
        // Hide the video element if there's an error
        video.style.display = 'none';
    }

    // Play/Pause functionality
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    function togglePlayPause() {
        if (isVideoError || !isVideoLoaded) return;
        
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        
        if (video.paused) {
            video.play().then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }).catch(handleVideoError);
        } else {
            video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // Mute/Unmute functionality
    if (muteBtn) {
        muteBtn.addEventListener('click', toggleMute);
    }

    function toggleMute() {
        if (isVideoError || !isVideoLoaded) return;
        
        const soundOn = muteBtn.querySelector('.sound-on');
        const soundOff = muteBtn.querySelector('.sound-off');
        
        video.muted = !video.muted;
        
        if (video.muted) {
            soundOn.style.display = 'none';
            soundOff.style.display = 'block';
        } else {
            soundOn.style.display = 'block';
            soundOff.style.display = 'none';
        }
    }

    // Sync play/pause button with video state
    video.addEventListener('play', () => {
        video.setAttribute('data-paused', 'false');
        hasUserInteracted = true;
        
        const playIcon = playPauseBtn?.querySelector('.play-icon');
        const pauseIcon = playPauseBtn?.querySelector('.pause-icon');
        if (playIcon && pauseIcon) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
    });

    video.addEventListener('pause', () => {
        video.setAttribute('data-paused', 'true');
        
        const playIcon = playPauseBtn?.querySelector('.play-icon');
        const pauseIcon = playPauseBtn?.querySelector('.pause-icon');
        if (playIcon && pauseIcon) {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });



    // Pause video when out of view for performance
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!isVideoError && isVideoLoaded) {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            }
        });
    }, { threshold: 0.3 });

    videoObserver.observe(video);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        // Only if video is in focus area or hero is visible
        const heroSection = document.querySelector('#home');
        const rect = heroSection.getBoundingClientRect();
        const isHeroVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isHeroVisible && !isVideoError && isVideoLoaded) {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlayPause();
                    break;
                case 'KeyM':
                    e.preventDefault();
                    toggleMute();
                    break;
            }
        }
    });

    // Preload optimization
    video.addEventListener('canplaythrough', () => {
        console.log('Video can play through without buffering');
    });

    // Mobile optimization
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Reduce video quality on mobile if needed
        video.style.filter = 'blur(0.5px)'; // Slight blur can help with performance
        
        // Add touch controls for mobile
        let touchStartTime = 0;
        video.addEventListener('touchstart', () => {
            touchStartTime = Date.now();
        });
        
        video.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration < 300) { // Quick tap
                e.preventDefault();
                togglePlayPause();
            }
        });
    }
}

// Portfolio Grid Effects
function initPortfolioEffects() {
    const portfolioItems = document.querySelectorAll('.apg-post');
    
    portfolioItems.forEach(item => {
        const thumbnail = item.querySelector('.apg-post-thumbnail');
        const meta = item.querySelector('.apg-post-meta');
        
        if (thumbnail && meta) {
            item.addEventListener('mouseenter', () => {
                thumbnail.style.transform = 'scale(1.05)';
                meta.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', () => {
                thumbnail.style.transform = 'scale(1)';
                meta.style.transform = 'translateX(0)';
            });
        }
    });
}

// Loading Animation
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations after load
        setTimeout(() => {
            const heroElements = document.querySelectorAll('#section_269cc9fe3 .is-content');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 200);
            });
        }, 500);
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Social Media Integration
function initSocialIntegration() {
    const socialLinks = document.querySelectorAll('.social-profile a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add analytics tracking here if needed
            console.log('Social link clicked:', link.href);
        });
    });
}

// Contact Form (if needed)
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Replace with your actual form submission endpoint
            const response = await fetch('/contact', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                contactForm.reset();
                showNotification('Message sent successfully!', 'success');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'white',
        backgroundColor: type === 'success' ? '#00d084' : type === 'error' ? '#cf2e2e' : '#0693e3',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Animated Word in Hero Title - Letter by Letter
function initAnimatedWord() {
    const animatedElement = document.getElementById('animated-word');
    if (!animatedElement) return;
    
    const words = ['negocio', 'local', 'bar'];
    let currentIndex = 0;
    let isAnimating = false;
    
    // Initialize with first word split into letters
    createLetters(words[currentIndex]);
    
    function createLetters(word) {
        animatedElement.innerHTML = '';
        word.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.className = 'animated-letter';
            span.style.transitionDelay = `${index * 30}ms`;
            animatedElement.appendChild(span);
        });
    }
    
    function animateLettersIn() {
        const letters = animatedElement.querySelectorAll('.animated-letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add('letter-in');
            }, index * 30);
        });
    }
    
    function animateLettersOut() {
        const letters = animatedElement.querySelectorAll('.animated-letter');
        return new Promise((resolve) => {
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('letter-out');
                    if (index === letters.length - 1) {
                        setTimeout(resolve, 300); // Wait for last letter to finish
                    }
                }, index * 20);
            });
        });
    }
    
    async function changeWord() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Animate current letters out
        await animateLettersOut();
        
        // Change to next word
        currentIndex = (currentIndex + 1) % words.length;
        createLetters(words[currentIndex]);
        
        // Small pause before animating in
        setTimeout(() => {
            animateLettersIn();
            isAnimating = false;
        }, 150);
    }
    
    // Start animation after initial load
    setTimeout(() => {
        animateLettersIn(); // Animate initial word
        setTimeout(() => {
            setInterval(changeWord, 2500); // Change word every 2.5 seconds
        }, 1500);
    }, 1500); // Wait 1.5 seconds before starting
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initPortfolioEffects();
    initLoadingAnimation();
    optimizePerformance();
    initSocialIntegration();
    initContactForm();
});

// Export functions for external use
window.CorsairAI = {
    showNotification,
    initScrollAnimations,
    initNavigation,
    initCustomCursor,
    initAnimatedWord
};