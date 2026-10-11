/**
 * NOVA DESIGN STUDIO - Interactive Core Script
 * Fully optimized cursor, responsive mobile menu, reveal animations & micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. HIGH-PERFORMANCE CUSTOM CURSOR (DESKTOP ONLY)
    // ----------------------------------------------------
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (hasFinePointer) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        const follower = document.createElement('div');
        follower.classList.add('cursor-follower');
        document.body.appendChild(follower);

        let mouseX = -100;
        let mouseY = -100;
        let followerX = -100;
        let followerY = -100;
        let isCursorVisible = false;

        // Position tracking
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isCursorVisible) {
                isCursorVisible = true;
                followerX = mouseX;
                followerY = mouseY;
                document.body.classList.remove('cursor-hidden');
            }

            // Direct hardware-accelerated transform for center-aligned point
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        // Smooth Lerp loop for follower
        const renderCursor = () => {
            if (isCursorVisible) {
                followerX += (mouseX - followerX) * 0.18;
                followerY += (mouseY - followerY) * 0.18;
                follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
            }
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Hover scale & magnetic states
        const attachHoverListeners = () => {
            const interactives = document.querySelectorAll('a, button, input, textarea, [role="button"], .interactive-card');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });
        };
        attachHoverListeners();

        // Handle window enter/leave
        document.addEventListener('mouseleave', () => {
            isCursorVisible = false;
            document.body.classList.add('cursor-hidden');
        });
        document.addEventListener('mouseenter', () => {
            isCursorVisible = true;
            document.body.classList.remove('cursor-hidden');
        });
    }

    // ----------------------------------------------------
    // 2. RESPONSIVE MOBILE NAVIGATION DRAWER
    // ----------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = (open) => {
        if (!mobileMenuDrawer) return;
        const shouldOpen = open !== undefined ? open : mobileMenuDrawer.classList.contains('hidden');

        if (shouldOpen) {
            mobileMenuDrawer.classList.remove('hidden');
            setTimeout(() => {
                mobileMenuDrawer.classList.remove('opacity-0');
                const panel = mobileMenuDrawer.querySelector('.mobile-nav-panel');
                if (panel) panel.classList.remove('translate-x-full');
            }, 10);
            document.body.style.overflow = 'hidden';
            if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenuDrawer.classList.add('opacity-0');
            const panel = mobileMenuDrawer.querySelector('.mobile-nav-panel');
            if (panel) panel.classList.add('translate-x-full');
            setTimeout(() => {
                mobileMenuDrawer.classList.add('hidden');
            }, 400);
            document.body.style.overflow = '';
            if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
    }
    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', () => toggleMobileMenu(false));
    }
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuDrawer && !mobileMenuDrawer.classList.contains('hidden')) {
            toggleMobileMenu(false);
        }
    });

    // ----------------------------------------------------
    // 3. INTERSECTION OBSERVER REVEAL ANIMATIONS
    // ----------------------------------------------------
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.nova-reveal').forEach(el => revealObserver.observe(el));

    // ----------------------------------------------------
    // 4. PARALLAX & TILT ON HERO / CARDS (DESKTOP)
    // ----------------------------------------------------
    const heroImage = document.getElementById('hero-img');
    if (heroImage && hasFinePointer) {
        window.addEventListener('mousemove', (e) => {
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 15;
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 15;
            heroImage.style.transform = `scale(1.04) translate(${xOffset}px, ${yOffset}px)`;
        });
    }

    // ----------------------------------------------------
    // 5. COPYRIGHT CURRENT YEAR SYNC
    // ----------------------------------------------------
    const yearEls = document.querySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    yearEls.forEach(el => {
        el.textContent = currentYear;
    });
});
