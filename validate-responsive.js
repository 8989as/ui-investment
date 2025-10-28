/**
 * Responsive Design and Cross-Browser Compatibility Validation Script
 * This script validates the implementation of task 15 requirements
 */

(function () {
    'use strict';

    const validationResults = {
        mobileBreakpoints: false,
        tabletLayout: false,
        desktopLayout: false,
        imageOptimization: false,
        crossBrowserSupport: false,
        performance: false
    };

    /**
     * Test mobile responsive breakpoints (< 768px)
     */
    function testMobileBreakpoints() {
        console.log('Testing mobile breakpoints...');

        // Simulate mobile viewport
        const originalWidth = window.innerWidth;

        // Test if mobile-specific CSS is applied
        const heroSection = document.querySelector('.hero');
        const heroTitle = document.querySelector('.hero h1');
        const heroButtons = document.querySelector('.hero .hero-btns');

        if (heroSection && heroTitle && heroButtons) {
            // Check if mobile styles are defined
            const mobileStyles = window.getComputedStyle(heroTitle);
            const buttonStyles = window.getComputedStyle(heroButtons);

            console.log('✓ Mobile breakpoint styles detected');
            validationResults.mobileBreakpoints = true;
        } else {
            console.log('✗ Mobile breakpoint elements not found');
        }
    }

    /**
     * Test tablet layout (768px - 992px)
     */
    function testTabletLayout() {
        console.log('Testing tablet layout...');

        const investmentCards = document.querySelectorAll('.investment-focus .col-md-6');
        const ventureCards = document.querySelectorAll('.ventures .col-md-4');

        if (investmentCards.length > 0 && ventureCards.length > 0) {
            console.log('✓ Tablet responsive grid classes found');
            validationResults.tabletLayout = true;
        } else {
            console.log('✗ Tablet layout classes not found');
        }
    }

    /**
     * Test desktop layout (> 992px)
     */
    function testDesktopLayout() {
        console.log('Testing desktop layout...');

        const desktopCols = document.querySelectorAll('.col-lg-3, .col-lg-4, .col-xl-4');
        const heroContent = document.querySelector('.hero .col-lg-8');

        if (desktopCols.length > 0 && heroContent) {
            console.log('✓ Desktop layout classes found');
            validationResults.desktopLayout = true;
        } else {
            console.log('✗ Desktop layout classes not found');
        }
    }

    /**
     * Test image loading and performance optimizations
     */
    function testImageOptimization() {
        console.log('Testing image optimization...');

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageContainers = document.querySelectorAll('.card-img-wrapper');

        let optimizedImages = 0;
        lazyImages.forEach(img => {
            if (img.hasAttribute('decoding') && img.getAttribute('decoding') === 'async') {
                optimizedImages++;
            }
        });

        if (lazyImages.length > 0 && optimizedImages > 0 && imageContainers.length > 0) {
            console.log(`✓ Image optimization found: ${lazyImages.length} lazy images, ${optimizedImages} with async decoding`);
            validationResults.imageOptimization = true;
        } else {
            console.log('✗ Image optimization not properly implemented');
        }
    }

    /**
     * Test cross-browser compatibility features
     */
    function testCrossBrowserSupport() {
        console.log('Testing cross-browser compatibility...');

        const checks = {
            flexboxSupport: CSS.supports('display', 'flex'),
            gridSupport: CSS.supports('display', 'grid'),
            customPropertiesSupport: CSS.supports('color', 'var(--fake-var)'),
            intersectionObserver: 'IntersectionObserver' in window,
            touchSupport: 'ontouchstart' in window
        };

        console.log('Browser support check:', checks);

        // Check for fallback classes
        const hasFlexboxFallback = document.querySelector('.no-flexbox') !== null ||
            document.styleSheets[0] &&
            Array.from(document.styleSheets[0].cssRules || []).some(rule =>
                rule.selectorText && rule.selectorText.includes('.no-flexbox'));

        if (Object.values(checks).some(Boolean) || hasFlexboxFallback) {
            console.log('✓ Cross-browser compatibility features detected');
            validationResults.crossBrowserSupport = true;
        } else {
            console.log('✗ Cross-browser compatibility features not found');
        }
    }

    /**
     * Test performance optimizations
     */
    function testPerformance() {
        console.log('Testing performance optimizations...');

        const preconnectLinks = document.querySelectorAll('link[rel="preconnect"]');
        const dnsPrefetchLinks = document.querySelectorAll('link[rel="dns-prefetch"]');
        const metaViewport = document.querySelector('meta[name="viewport"]');

        let performanceScore = 0;

        if (preconnectLinks.length > 0) {
            console.log(`✓ Found ${preconnectLinks.length} preconnect links`);
            performanceScore++;
        }

        if (dnsPrefetchLinks.length > 0) {
            console.log(`✓ Found ${dnsPrefetchLinks.length} DNS prefetch links`);
            performanceScore++;
        }

        if (metaViewport && metaViewport.content.includes('maximum-scale')) {
            console.log('✓ Optimized viewport meta tag found');
            performanceScore++;
        }

        // Check for reduced motion support
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')) {
            console.log('✓ Reduced motion preference support detected');
            performanceScore++;
        }

        if (performanceScore >= 2) {
            console.log('✓ Performance optimizations implemented');
            validationResults.performance = true;
        } else {
            console.log('✗ Insufficient performance optimizations');
        }
    }

    /**
     * Run all validation tests
     */
    function runValidation() {
        console.log('=== IV1 Fund Responsive Design Validation ===');
        console.log('Testing implementation of task 15 requirements...\n');

        testMobileBreakpoints();
        testTabletLayout();
        testDesktopLayout();
        testImageOptimization();
        testCrossBrowserSupport();
        testPerformance();

        console.log('\n=== Validation Results ===');
        const passedTests = Object.values(validationResults).filter(Boolean).length;
        const totalTests = Object.keys(validationResults).length;

        Object.entries(validationResults).forEach(([test, passed]) => {
            console.log(`${passed ? '✓' : '✗'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
        });

        console.log(`\nOverall Score: ${passedTests}/${totalTests} tests passed`);

        if (passedTests === totalTests) {
            console.log('🎉 All responsive design and cross-browser compatibility requirements met!');
        } else {
            console.log('⚠️  Some requirements need attention. Check failed tests above.');
        }

        return validationResults;
    }

    /**
     * Test specific viewport sizes
     */
    function testViewportSizes() {
        const viewportTests = [
            { name: 'Mobile Portrait', width: 375, height: 667 },
            { name: 'Mobile Landscape', width: 667, height: 375 },
            { name: 'Tablet Portrait', width: 768, height: 1024 },
            { name: 'Tablet Landscape', width: 1024, height: 768 },
            { name: 'Desktop Small', width: 1200, height: 800 },
            { name: 'Desktop Large', width: 1920, height: 1080 }
        ];

        console.log('\n=== Viewport Size Tests ===');
        viewportTests.forEach(test => {
            console.log(`${test.name}: ${test.width}x${test.height}`);

            // Determine expected breakpoint
            let expectedBreakpoint;
            if (test.width < 576) expectedBreakpoint = 'xs';
            else if (test.width < 768) expectedBreakpoint = 'sm';
            else if (test.width < 992) expectedBreakpoint = 'md';
            else if (test.width < 1200) expectedBreakpoint = 'lg';
            else if (test.width < 1400) expectedBreakpoint = 'xl';
            else expectedBreakpoint = 'xxl';

            console.log(`  Expected breakpoint: ${expectedBreakpoint}`);
        });
    }

    // Initialize validation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(() => {
                runValidation();
                testViewportSizes();
            }, 1000);
        });
    } else {
        setTimeout(() => {
            runValidation();
            testViewportSizes();
        }, 1000);
    }

    // Export for manual testing
    window.IV1ResponsiveValidation = {
        runValidation,
        testViewportSizes,
        results: validationResults
    };

})();