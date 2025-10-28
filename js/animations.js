/*--------------------------------------------------------------
# Animation Module - IV1 Fund Landing Page
# Comprehensive animation system with smooth scrolling, scroll-triggered animations,
# and enhanced interaction effects
--------------------------------------------------------------*/

class AnimationManager {
  constructor() {
    this.observer = null;
    this.scrollElements = [];
    this.isScrolling = false;
    this.lastScrollTop = 0;
    this.scrollDirection = 'down';
    this.scrollTimeout = null;
    
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupAccessibility();
    this.bindEvents();
  }

  /*--------------------------------------------------------------
  # Smooth Scrolling Implementation
  --------------------------------------------------------------*/
  setupSmoothScrolling() {
    // Enable smooth scrolling in CSS
    document.documentElement.style.setProperty('scroll-behavior', 'smooth');
    
    // Override for better control on anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          this.smoothScrollTo(target, 800, 'easeInOutCubic');
        }
      });
    });
  }

  smoothScrollTo(element, duration = 800, easing = 'easeInOutCubic') {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const easeFunctions = {
      easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      easeOutCubic: t => 1 - Math.pow(1 - t, 3),
      easeInOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    };

    const scroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeFunctions[easing](progress);
      
      window.scrollTo(0, startPosition + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }

  /*--------------------------------------------------------------
  # Intersection Observer for Scroll-Triggered Animations
  --------------------------------------------------------------*/
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: this.calculateThresholds()
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.handleElementInView(entry.target);
        }
      });
    }, options);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in')
      .forEach(el => this.observer.observe(el));
  }

  calculateThresholds() {
    const thresholds = [];
    for (let i = 0; i <= 1.0; i += 0.01) {
      thresholds.push(i);
    }
    return thresholds;
  }

  handleElementInView(element) {
    // Add animation class with delay based on data attributes
    const delay = element.dataset.animationDelay || '0';
    
    setTimeout(() => {
      element.classList.add('animate-in');
      
      // Dispatch custom event for additional animations
      element.dispatchEvent(new CustomEvent('animationStart', {
        bubbles: true,
        detail: { element }
      }));
    }, parseInt(delay));
  }

  /*--------------------------------------------------------------
  # Enhanced Scroll Animations
  --------------------------------------------------------------*/
  setupScrollAnimations() {
    // Parallax effect for elements with data-parallax attribute
    this.setupParallaxEffects();
    
    // Sticky header enhancement
    this.setupStickyHeader();
    
    // Progress indicators
    this.setupProgressIndicators();
  }

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      
      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        
        if (scrolled > elementTop - window.innerHeight && 
            scrolled < elementTop + elementHeight) {
          const yPos = -(scrolled - elementTop) * speed;
          element.style.transform = `translateY(${yPos}px)`;
        }
      };

      // Initial update and bind to scroll
      updateParallax();
      window.addEventListener('scroll', updateParallax);
    });
  }

  setupStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    const headerHeight = header.offsetHeight;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > lastScroll && currentScroll > headerHeight) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
      
      // Add/remove scrolled class for background change
      if (currentScroll > 50) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    };

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  setupProgressIndicators() {
    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--accent-color);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  /*--------------------------------------------------------------
  # Enhanced Hover Effects
  --------------------------------------------------------------*/
  setupHoverEffects() {
    // Enhanced card hover effects
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.enhanceHoverEffect(e.currentTarget, 'enter');
      });
      
      card.addEventListener('mouseleave', (e) => {
        this.enhanceHoverEffect(e.currentTarget, 'leave');
      });
    });

    // Button ripple effects
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.createRippleEffect(e);
      });
    });
  }

  enhanceHoverEffect(element, action) {
    if (action === 'enter') {
      element.style.zIndex = '10';
      element.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      element.style.zIndex = '';
    }
  }

  createRippleEffect(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  /*--------------------------------------------------------------
  # Accessibility Support
  --------------------------------------------------------------*/
  setupAccessibility() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize animation system only if reduced motion is not preferred
    if (!prefersReducedMotion) {
      this.setupSmoothScrolling();
      this.setupIntersectionObserver();
      this.setupParallaxEffects();
      this.setupStickyHeader();
      this.setupProgressIndicators();
      this.setupHoverEffects();
    } else {
      // Apply reduced motion alternatives
      this.applyReducedMotionAlternatives();
    }

    // Listen for preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (e.matches) {
        // User now prefers reduced motion
        this.applyReducedMotionAlternatives();
        
        // Clean up animation event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        
        // Remove parallax scroll listeners
        window.removeEventListener('scroll', this.updateParallax);
        
      } else {
        // User no longer prefers reduced motion
        location.reload(); // Reload to reinitialize animations
      }
    });
  }

  applyReducedMotionAlternatives() {
    // Disable smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Remove parallax effects
    const parallaxElements = document.querySelectorAll('.parallax-layer, .parallax-background, .parallax-midground, .parallax-foreground');
    parallaxElements.forEach(el => {
      el.style.transform = 'none';
      el.style.transition = 'none';
    });
    
    // Disable floating animations
    const floatingElements = document.querySelectorAll('.floating-element, [class*="floating-element-delay"]');
    floatingElements.forEach(el => {
      el.style.animation = 'none';
    });
    
    // Hide scroll progress indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
      scrollProgress.style.display = 'none';
    }
    
    // Add accessibility focus styles
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    focusableElements.forEach(el => {
      el.classList.add('accessibility-focus');
    });
    
    console.log('Reduced motion mode activated - animations disabled for accessibility');
  }

  disableAnimations() {
    document.body.classList.add('reduced-motion');
    
    // Stop all ongoing animations
    this.stopAllAnimations();
  }

  enableAnimations() {
    document.body.classList.remove('reduced-motion');
  }

  stopAllAnimations() {
    // Implementation to stop CSS and JS animations
    document.querySelectorAll('*').forEach(el => {
      if (el.style.animationName) {
        el.style.animation = 'none';
      }
    });
  }

  /*--------------------------------------------------------------
  # Event Binding & Utilities
  --------------------------------------------------------------*/
  bindEvents() {
    // Window load event - initialize animations after everything is loaded
    window.addEventListener('load', () => {
      this.handlePageLoad();
    });

    // Resize event - recalculate animation parameters
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Orientation change
    window.addEventListener('orientationchange', () => {
      this.handleResize();
    });
  }

  handlePageLoad() {
    // Animate in hero elements with staggered delays
    const heroElements = document.querySelectorAll('.hero [data-animate]');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 150);
    });
  }

  handleResize() {
    // Recalculate intersection observer thresholds on resize
    if (this.observer) {
      this.observer.disconnect();
      this.setupIntersectionObserver();
    }
  }

  /*--------------------------------------------------------------
  # Public Methods for External Control
  --------------------------------------------------------------*/
  animateElement(element, animationType, options = {}) {
    const config = {
      duration: options.duration || 600,
      delay: options.delay || 0,
      easing: options.easing || 'easeInOutCubic',
      ...options
    };

    element.style.transition = `all ${config.duration}ms ${config.easing}`;
    
    switch (animationType) {
      case 'fadeIn':
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        break;
      case 'slideInLeft':
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        break;
      case 'scaleIn':
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        break;
      default:
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    return new Promise(resolve => {
      setTimeout(resolve, config.duration + config.delay);
    });
  }

  // Utility method to check if element is in viewport
  isInViewport(element, threshold = 0.5) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
      rect.top <= windowHeight * threshold &&
      rect.bottom >= 0
    );
  }
}

/*--------------------------------------------------------------
# Initialize Animation Manager
--------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  window.animationManager = new AnimationManager();
});

/*--------------------------------------------------------------
# Export for Module Usage
--------------------------------------------------------------*/
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationManager;
}