/**
* Template Name: eBusiness
* Template URL: https://bootstrapmade.com/ebusiness-bootstrap-corporate-template/
* Updated: Jun 23 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Smooth scrolling for navigation links
   */
  document.querySelectorAll('.navmenu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80; // Account for sticky header
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Video Overlay Functionality
   */
  function initVideoOverlay() {
    const videoOverlay = document.getElementById('videoOverlay');
    const videoFrame = document.getElementById('videoFrame');
    const closeVideoBtn = document.getElementById('closeVideo');
    const playButtons = document.querySelectorAll('.play-button');

    // Open video overlay
    playButtons.forEach(button => {
      button.addEventListener('click', function () {
        const videoUrl = this.getAttribute('data-video-url');
        if (videoUrl && videoOverlay && videoFrame) {
          videoFrame.src = videoUrl;
          videoOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close video overlay
    function closeVideo() {
      if (videoOverlay && videoFrame) {
        videoOverlay.classList.remove('active');
        videoFrame.src = '';
        document.body.style.overflow = '';
      }
    }

    // Close button click
    if (closeVideoBtn) {
      closeVideoBtn.addEventListener('click', closeVideo);
    }

    // Close on overlay click
    if (videoOverlay) {
      videoOverlay.addEventListener('click', function (e) {
        if (e.target === videoOverlay) {
          closeVideo();
        }
      });
    }

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && videoOverlay && videoOverlay.classList.contains('active')) {
        closeVideo();
      }
    });
  }

  // Initialize video overlay when DOM is loaded
  window.addEventListener('load', initVideoOverlay);

  /**
   * Contact Form Validation and Submission
   */
  function initContactForm() {
    const contactForm = document.querySelector('.php-email-form');
    if (!contactForm) return;

    const loadingElement = contactForm.querySelector('.loading');
    const errorElement = contactForm.querySelector('.error-message');
    const sentElement = contactForm.querySelector('.sent-message');

    // Form validation
    function validateForm(formData) {
      const errors = [];

      // Name validation
      if (!formData.get('name') || formData.get('name').trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
      }

      // Email validation
      const email = formData.get('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
      }

      // Phone validation
      const phone = formData.get('phone');
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phone || !phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        errors.push('Please enter a valid phone number');
      }

      // Message validation
      if (!formData.get('message') || formData.get('message').trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
      }

      return errors;
    }

    // Show/hide form states
    function showLoading() {
      loadingElement.style.display = 'block';
      errorElement.style.display = 'none';
      sentElement.style.display = 'none';
    }

    function showError(message) {
      loadingElement.style.display = 'none';
      errorElement.style.display = 'block';
      errorElement.textContent = message;
      sentElement.style.display = 'none';
    }

    function showSuccess() {
      loadingElement.style.display = 'none';
      errorElement.style.display = 'none';
      sentElement.style.display = 'block';
      contactForm.reset();
    }

    // Form submission handler
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const errors = validateForm(formData);

      if (errors.length > 0) {
        showError(errors.join('. '));
        return;
      }

      showLoading();

      // Submit form data
      fetch(contactForm.action, {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Network response was not ok');
        })
        .then(data => {
          showSuccess();
        })
        .catch(error => {
          console.error('Form submission error:', error);
          showError('There was an error sending your message. Please try again later.');
        });
    });

    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function () {
        const formData = new FormData();
        formData.append(this.name, this.value);

        if (this.name === 'name' && this.value.trim().length < 2) {
          this.classList.add('is-invalid');
        } else if (this.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
          this.classList.add('is-invalid');
        } else if (this.name === 'phone' && !/^[\+]?[1-9][\d]{0,15}$/.test(this.value.replace(/[\s\-\(\)]/g, ''))) {
          this.classList.add('is-invalid');
        } else if (this.name === 'message' && this.value.trim().length < 10) {
          this.classList.add('is-invalid');
        } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
        }
      });

      input.addEventListener('input', function () {
        this.classList.remove('is-invalid', 'is-valid');
      });
    });
  }

  // Initialize contact form when DOM is loaded
  window.addEventListener('load', initContactForm);

  /**
   * Enhanced Counter Animation with Scroll Triggers
   */
  function initEnhancedCounters() {
    const counters = document.querySelectorAll('.purecounter');
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.classList.contains('counted')) {
            counter.classList.add('counted');
            // PureCounter will handle the animation
          }
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // Initialize enhanced counters when DOM is loaded
  window.addEventListener('load', initEnhancedCounters);

  /**
   * Bootstrap Component Interactions
   */
  function initBootstrapInteractions() {
    // Ensure Bootstrap tooltips work if any are added
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Ensure Bootstrap popovers work if any are added
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });

    // Enhanced mobile navigation with Bootstrap classes
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('#navmenu');

    if (mobileNavToggle && navMenu) {
      mobileNavToggle.addEventListener('click', function () {
        // Add Bootstrap collapse classes for better animation
        navMenu.classList.toggle('show');
      });
    }
  }

  // Initialize Bootstrap interactions when DOM is loaded
  window.addEventListener('load', initBootstrapInteractions);

  /**
   * Enhanced Image Loading with Performance Optimizations
   */
  function initImageOptimizations() {
    // Lazy loading support for older browsers
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.addEventListener('load', function () {
          this.classList.add('loaded');
        });
      });
    } else {
      // Fallback for browsers without native lazy loading
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => imageObserver.observe(img));
    }

    // Add loading states for image containers
    const imageContainers = document.querySelectorAll('.card-img-wrapper');
    imageContainers.forEach(container => {
      const img = container.querySelector('img');
      if (img) {
        container.classList.add('loading');

        img.addEventListener('load', function () {
          container.classList.remove('loading');
        });

        img.addEventListener('error', function () {
          container.classList.remove('loading');
          // Add error state styling if needed
          container.classList.add('error');
        });
      }
    });
  }

  /**
   * Responsive Design Enhancements
   */
  function initResponsiveEnhancements() {
    // Optimize viewport handling for mobile devices
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      // Ensure proper viewport settings for mobile
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }

    // Handle orientation changes
    window.addEventListener('orientationchange', function () {
      // Small delay to ensure proper rendering after orientation change
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    });

    // Optimize touch interactions for mobile
    if ('ontouchstart' in window) {
      document.body.classList.add('touch-device');

      // Improve button interactions on touch devices
      const buttons = document.querySelectorAll('.btn, .card, .team-card');
      buttons.forEach(button => {
        button.addEventListener('touchstart', function () {
          this.classList.add('touch-active');
        });

        button.addEventListener('touchend', function () {
          setTimeout(() => {
            this.classList.remove('touch-active');
          }, 150);
        });
      });
    }

    // Handle reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Disable AOS animations for users who prefer reduced motion
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 0,
          once: true,
          disable: true
        });
      }
    }
  }

  /**
   * Cross-Browser Compatibility Enhancements
   */
  function initCrossBrowserSupport() {
    // Polyfill for IntersectionObserver (for older browsers)
    if (!window.IntersectionObserver) {
      // Fallback for browsers without IntersectionObserver
      const counters = document.querySelectorAll('.purecounter');
      counters.forEach(counter => {
        // Simple scroll-based trigger as fallback
        window.addEventListener('scroll', function () {
          const rect = counter.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (!counter.classList.contains('counted')) {
              counter.classList.add('counted');
            }
          }
        });
      });
    }

    // CSS Custom Properties fallback for older browsers
    if (!CSS.supports('color', 'var(--fake-var)')) {
      // Apply fallback styles for browsers without CSS custom properties support
      const root = document.documentElement;
      root.style.setProperty('--accent-color', '#5ABDBF');
      root.style.setProperty('--heading-color', '#0d3035');
    }

    // Flexbox fallback detection
    if (!CSS.supports('display', 'flex')) {
      document.body.classList.add('no-flexbox');
    }

    // Grid fallback detection
    if (!CSS.supports('display', 'grid')) {
      document.body.classList.add('no-grid');
    }
  }

  /**
   * Performance Monitoring and Optimization
   */
  function initPerformanceOptimizations() {
    // Debounce scroll events for better performance
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;

    window.addEventListener('scroll', function () {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        // Execute scroll-dependent functions
        if (typeof navmenuScrollspy === 'function') {
          navmenuScrollspy();
        }
        if (typeof toggleScrollTop === 'function') {
          toggleScrollTop();
        }
      }, 10);
    }, { passive: true });

    // Optimize resize events
    let resizeTimeout;
    window.addEventListener('resize', function () {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = setTimeout(() => {
        // Re-initialize components that depend on viewport size
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      }, 250);
    }, { passive: true });

    // Preload critical images
    const criticalImages = [
      'assets/img/backgrounds/hero-background.jpg',
      'assets/img/logo.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  /**
   * Accessibility Enhancements
   */
  function initAccessibilityEnhancements() {
    // Add skip links functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Improve keyboard navigation for mobile menu
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('#navmenu');

    if (mobileNavToggle && navMenu) {
      // Handle keyboard navigation
      mobileNavToggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });

      // Trap focus within mobile menu when open
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('mobile-nav-active')) {
          mobileNavToogle();
          mobileNavToggle.focus();
        }
      });
    }

    // Add ARIA labels for better screen reader support
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
        button.setAttribute('aria-label', 'Button');
      }
    });
  }

  // Initialize all enhancements when DOM is loaded
  window.addEventListener('load', function () {
    initImageOptimizations();
    initResponsiveEnhancements();
    initCrossBrowserSupport();
    initPerformanceOptimizations();
    initAccessibilityEnhancements();
  });

})();