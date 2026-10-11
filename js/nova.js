document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------
    // 1. REVEAL ON SCROLL
    // ----------------------------------------
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.nova-reveal').forEach(el => revealObserver.observe(el));

    // ----------------------------------------
    // 2. MOBILE NAV DRAWER
    // ----------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const openMenu = () => {
        if (!mobileMenuDrawer) return;
        mobileMenuDrawer.classList.remove('hidden');
        setTimeout(() => {
            mobileMenuDrawer.classList.remove('opacity-0');
            const panel = mobileMenuDrawer.querySelector('.mobile-nav-panel');
            if (panel) panel.classList.remove('translate-x-full');
        }, 10);
        document.body.style.overflow = 'hidden';
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        if (!mobileMenuDrawer) return;
        mobileMenuDrawer.classList.add('opacity-0');
        const panel = mobileMenuDrawer.querySelector('.mobile-nav-panel');
        if (panel) panel.classList.add('translate-x-full');
        setTimeout(() => mobileMenuDrawer.classList.add('hidden'), 400);
        document.body.style.overflow = '';
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    // ----------------------------------------
    // 3. COPYRIGHT YEAR
    // ----------------------------------------
    document.querySelectorAll('.copyright-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});
