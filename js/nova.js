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
    }, { threshold: 0.08 });

    document.querySelectorAll('.nova-reveal').forEach(el => revealObserver.observe(el));

    // ----------------------------------------
    // 2. MOBILE NAVIGATION DRAWER
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
        setTimeout(() => mobileMenuDrawer.classList.add('hidden'), 350);
        document.body.style.overflow = '';
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    // ----------------------------------------
    // 3. LIVE ATELIER CLOCK (LONDON / TOKYO)
    // ----------------------------------------
    const atelierClock = document.getElementById('atelier-clock');
    if (atelierClock) {
        const updateClock = () => {
            const now = new Date();
            const londonTime = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });
            atelierClock.textContent = `LDN ${londonTime} GMT`;
        };
        updateClock();
        setInterval(updateClock, 30000);
    }

    // ----------------------------------------
    // 4. INTERACTIVE PRESENTATION SLIDE SWITCHER
    // ----------------------------------------
    const slideButtons = document.querySelectorAll('[data-slide-target]');
    const slideDisplayImg = document.getElementById('presentation-main-image');
    const slideTitle = document.getElementById('presentation-title');
    const slideDesc = document.getElementById('presentation-desc');
    const slideFigure = document.getElementById('presentation-figure');
    const slideMaterial = document.getElementById('presentation-material');

    const slidesData = {
        '1': {
            title: 'STRUCTURAL DRAPE & VOID',
            figure: 'FIG. 01 — RUNWAY ARCHIVE',
            desc: 'Tailored volumetric silhouette cutting raw Japanese silk against bonded architectural wool. Developed through analog toile draping.',
            material: 'Raw Silk 70% / Bonded Wool 30%',
            img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=85'
        },
        '2': {
            title: 'TACTILE MONOCHROME STUDY',
            figure: 'FIG. 02 — ATELIER SERIES',
            desc: 'Exploring high-contrast chiaroscuro shadows across asymmetric lapels and sculptural collar construction.',
            material: 'Heavy Merino Gabardine / Satin Crepe',
            img: 'https://images.unsplash.com/photo-1539109132314-3477524c8d35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=85'
        },
        '3': {
            title: 'ARCHITECTURAL OUTERWEAR',
            figure: 'FIG. 03 — EXHIBITION PROTOTYPE',
            desc: 'Angular technical cocoon coat with concealed magnetic closures and articulated ergonomic sleeves.',
            material: 'Weatherproof Twill / Silk Lining',
            img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=85'
        }
    };

    slideButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const slideId = btn.getAttribute('data-slide-target');
            const data = slidesData[slideId];
            if (!data) return;

            slideButtons.forEach(b => {
                b.classList.remove('bg-white', 'text-black');
                b.classList.add('text-zinc-400');
            });
            btn.classList.add('bg-white', 'text-black');
            btn.classList.remove('text-zinc-400');

            if (slideDisplayImg) {
                slideDisplayImg.style.opacity = '0.3';
                setTimeout(() => {
                    slideDisplayImg.src = data.img;
                    slideDisplayImg.style.opacity = '1';
                }, 200);
            }
            if (slideTitle) slideTitle.textContent = data.title;
            if (slideDesc) slideDesc.textContent = data.desc;
            if (slideFigure) slideFigure.textContent = data.figure;
            if (slideMaterial) slideMaterial.textContent = data.material;
        });
    });

    // ----------------------------------------
    // 5. ARCHIVE CATEGORY FILTER (collections.html)
    // ----------------------------------------
    const filterBtns = document.querySelectorAll('.category-filter-btn');
    const collectionItems = document.querySelectorAll('[data-category]');

    if (filterBtns.length > 0 && collectionItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                filterBtns.forEach(b => {
                    b.classList.remove('bg-white', 'text-black', 'border-white');
                    b.classList.add('text-zinc-400', 'border-zinc-800');
                });
                btn.classList.add('bg-white', 'text-black', 'border-white');
                btn.classList.remove('text-zinc-400', 'border-zinc-800');

                collectionItems.forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    if (filter === 'all' || itemCat === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('active'), 10);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ----------------------------------------
    // 6. COPYRIGHT YEAR SYNC
    // ----------------------------------------
    document.querySelectorAll('.copyright-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});
