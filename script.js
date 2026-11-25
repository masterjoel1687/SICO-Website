// ============================================
// EC & CCAC - SICO ULTIMATE UI & UX SCRIPT
// ============================================

/* ============================================================
   SICO — CINEMATIC 5 SECOND LOADER (FIRST VISIT ONLY)
   Plays once per session; skipped with zero flash on page nav
   ============================================================ */
(function () {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    let alreadyShown = false;
    try {
        alreadyShown = sessionStorage.getItem('sico_loader_shown') === 'true';
    } catch (e) {}

    if (alreadyShown) {
        loader.remove();
        document.body.classList.add('page-ready');
        return;
    }

    const progressBar = document.getElementById('loaderProgressBar');
    const percentage  = document.getElementById('loaderPercentage');
    const status      = document.getElementById('loaderStatus');
    const message     = document.getElementById('loaderMessage');

    const duration = 5000;

    const stages = [
        { progress: 0,   status: 'INITIALIZING',  message: 'Preparing your experience...' },
        { progress: 10,  status: 'CONNECTING',    message: 'Establishing campus interface...' },
        { progress: 22,  status: 'LOADING',       message: 'Loading SICO resources...' },
        { progress: 36,  status: 'SYNCHRONIZING', message: 'Synchronizing student activities...' },
        { progress: 50,  status: 'BUILDING',      message: 'Building your campus experience...' },
        { progress: 64,  status: 'PREPARING',     message: 'Preparing events & initiatives...' },
        { progress: 78,  status: 'ALMOST READY',  message: 'Everything is coming together...' },
        { progress: 90,  status: 'FINALIZING',    message: 'Finalizing your experience...' },
        { progress: 100, status: 'WELCOME',       message: 'Welcome to SICO.' }
    ];

    let startTime = performance.now();
    let stageIndex = 0;
    let animationRunning = true;

    function updateLoader(progress) {
        progress = Math.min(100, Math.max(0, progress));
        if (progressBar) progressBar.style.width = progress + '%';
        if (percentage)  percentage.textContent  = Math.floor(progress) + '%';

        while (stageIndex < stages.length - 1 &&
               progress >= stages[stageIndex + 1].progress) {
            stageIndex++;
            const current = stages[stageIndex];
            if (message) message.classList.add('message-changing');
            setTimeout(() => {
                if (status)  status.textContent  = current.status;
                if (message) {
                    message.textContent = current.message;
                    message.classList.remove('message-changing');
                }
            }, 150);
        }
    }

    function animateLoader(currentTime) {
        if (!animationRunning) return;
        const elapsed  = currentTime - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        updateLoader(progress);
        if (elapsed < duration) {
            requestAnimationFrame(animateLoader);
        } else {
            finishLoader();
        }
    }

    function finishLoader() {
        updateLoader(100);
        if (status)  status.textContent  = 'WELCOME';
        if (message) message.textContent = 'Welcome to SICO.';

        try {
            sessionStorage.setItem('sico_loader_shown', 'true');
        } catch (e) {}

        const word = document.getElementById('sicoWord');
        if (word) word.classList.add('sico-final-impact');

        setTimeout(() => {
            loader.classList.add('loader-hidden');
            document.body.classList.add('page-ready');
            animationRunning = false;
            setTimeout(() => loader.remove(), 1000);
        }, 450);
    }

    requestAnimationFrame(animateLoader);
})();

/* ============================================================
   OFFICIAL COMPLETED EVENTS & MERIT LIST DIRECTORY
   (Edit names / regd numbers / cash prizes anytime here)
   ============================================================ */
window.SICO_COMPLETED_EVENTS = [
    {
        id: 'comp_waltz',
        matchKey: 'waltz',
        title: 'Club Waltz (Inter-College Dance Competition)',
        club: 'CLUB WALTZ',
        date: '05th & 06th October 2026',
        venue: 'Open Air Theatre (OAT)',
        prizePool: '₹7,500 Total Cash Prizes Awarded',
        summary: 'Two-day inter-college dance competition featuring Solo, Jodi, and Group crew showdowns judged by professional choreographers.',
        winners: [
            { rank: '1st', name: 'N. Harsha Vardhan & Crew', regd: 'Y23CS041', branch: 'CSE', prize: '₹3,000 Cash', project: 'Group Western Fusion' },
            { rank: '2nd', name: 'D. Keerthi & Team', regd: 'Y23IT029', branch: 'IT', prize: '₹2,000 Cash', project: 'Classical & Folk Medley' },
            { rank: '1st', name: 'A. Sravani', regd: 'Y24EC019', branch: 'ECE', prize: '₹1,500 Cash', project: 'Solo Contemporary' },
            { rank: '2nd', name: 'K. Rohit', regd: 'Y23ME054', branch: 'MECH', prize: '₹1,000 Cash', project: 'Solo Hip-Hop Freestyle' }
        ]
    },
    {
        id: 'comp_web_anime',
        matchKey: 'website development',
        title: 'Website Development & Anime Video Making',
        club: 'Digital Club',
        date: '30th September 2026',
        venue: 'SJB Seminar Hall',
        prizePool: '₹7,500 Total Cash Prizes Awarded',
        summary: 'Dual technical and creative contest combining live responsive web development and original anime video storytelling.',
        winners: [
            { rank: '1st', name: 'R. Karthikeya', regd: 'Y23CS112', branch: 'CSE', prize: '₹3,000 Cash', project: 'Campus Smart Portal (Web Dev)' },
            { rank: '2nd', name: 'S. Meghana', regd: 'Y23AI034', branch: 'CSM', prize: '₹2,000 Cash', project: 'Interactive Event Hub (Web Dev)' },
            { rank: '1st', name: 'K. Pranav', regd: 'Y24IT048', branch: 'IT', prize: '₹1,500 Cash', project: 'Cyber Dawn (Anime Short)' },
            { rank: '2nd', name: 'P. Kavya', regd: 'Y24CS077', branch: 'CSE', prize: '₹1,000 Cash', project: 'Neon Horizon (Anime Short)' }
        ]
    },
    {
        id: 'comp_endeavour',
        matchKey: 'endeavour',
        title: 'General Quiz Championship',
        club: 'CLUB ENDEAVOUR',
        date: '19th September 2026',
        venue: 'SJB Seminar Hall',
        prizePool: '₹3,250 Cash Prizes Awarded',
        summary: 'Multi-disciplinary campus quiz covering science, current affairs, literature, and technology across 38 participating teams.',
        winners: [
            { rank: '1st', name: 'R. Siddharth', regd: 'Y23EC088', branch: 'ECE', prize: '₹1,500 Cash', project: 'Grand Quiz Champion' },
            { rank: '2nd', name: 'G. Poojitha', regd: 'Y23CS063', branch: 'CSE', prize: '₹1,000 Cash', project: 'Runner-Up' },
            { rank: '3rd', name: 'T. Manish', regd: 'Y24EE021', branch: 'EEE', prize: '₹750 Cash', project: 'Second Runner-Up' }
        ]
    },
    {
        id: 'comp_theatrix',
        matchKey: 'theatrix',
        title: 'Mime, Skit & Standup Comedy Showcase',
        club: 'CLUB THEATRIX',
        date: '11th September 2026',
        venue: 'SJB & Decennial Hall',
        prizePool: '₹7,500 Total Cash Prizes Awarded',
        summary: 'Dramatics evening featuring thought-provoking group mimes, original skits, and high-energy solo standup comedy sets.',
        winners: [
            { rank: '1st', name: 'V. Nikhil & Group', regd: 'Y23ME072', branch: 'MECH', prize: '₹3,000 Cash', project: 'Group Mime — Silent Earth' },
            { rank: '2nd', name: 'Ch. Nandini & Team', regd: 'Y23CS015', branch: 'CSE', prize: '₹2,000 Cash', project: 'Campus Chronicles (Skit)' },
            { rank: '1st', name: 'B. Varun', regd: 'Y24IT014', branch: 'IT', prize: '₹1,500 Cash', project: 'Solo Standup Comedy' },
            { rank: '2nd', name: 'K. Deepika', regd: 'Y23EC051', branch: 'ECE', prize: '₹1,000 Cash', project: 'Solo Standup Comedy' }
        ]
    },
    {
        id: 'comp_redants',
        matchKey: 'face painting',
        title: 'Fine Arts Championship (Painting & Mehandi)',
        club: 'RED ANTS',
        date: '29th August 2026',
        venue: 'SJB Portico & Ground',
        prizePool: '₹3,250 Cash Prizes Awarded',
        summary: 'Creative fine arts competition across Face Painting, Pencil Shading, Mehandi, and Conceptual Painting.',
        winners: [
            { rank: '1st', name: 'V. Bhargavi', regd: 'Y23CE024', branch: 'CIVIL', prize: '₹1,500 Cash', project: 'Conceptual Acrylic Canvas' },
            { rank: '2nd', name: 'M. Swathi', regd: 'Y24CS092', branch: 'CSE', prize: '₹1,000 Cash', project: 'Portrait Pencil Shading' },
            { rank: '3rd', name: 'N. Akhil', regd: 'Y23ME039', branch: 'MECH', prize: '₹750 Cash', project: 'Traditional Face Art' }
        ]
    },
    {
        id: 'comp_spectrum',
        matchKey: 'spectrum',
        title: 'Short Film & Rhythm in Motion Festival',
        club: 'Club Spectrum',
        date: '14th August 2026',
        venue: 'SJB Seminar Hall',
        prizePool: '₹8,000 Total Cash Prizes Awarded',
        summary: 'Student filmmaking festival showcasing original 15-minute short films and 4-minute rhythmic visual edits.',
        winners: [
            { rank: '1st', name: 'P. Aditya & Crew', regd: 'Y23CS128', branch: 'CSE', prize: '₹4,000 Cash', project: 'Best Short Film — Echoes' },
            { rank: '2nd', name: 'R. Charan & Team', regd: 'Y23IT067', branch: 'IT', prize: '₹2,500 Cash', project: 'Second Best Short Film — Frame Zero' },
            { rank: '3rd', name: 'D. Pavani', regd: 'Y24EC030', branch: 'ECE', prize: '₹1,500 Cash', project: 'Best Direction & Editing' }
        ]
    },
    {
        id: 'comp_logo',
        matchKey: 'logo design',
        title: 'Logo Design Championship & Brand Identity',
        club: 'Digital Club',
        date: '11th August 2026',
        venue: 'SJB Seminar Hall',
        prizePool: '₹3,250 Cash Prizes Awarded',
        summary: 'Creative branding sprint challenging students to craft original minimalist logos and visual identity guidelines.',
        winners: [
            { rank: '1st', name: 'M. Sai Pranathi', regd: 'Y23CS074', branch: 'CSE', prize: '₹1,500 Cash', project: 'Minimalist Tech Brand Kit' },
            { rank: '2nd', name: 'K. Harish', regd: 'Y23IT045', branch: 'IT', prize: '₹1,000 Cash', project: 'Eco-Campus Identity System' },
            { rank: '3rd', name: 'P. Revathi', regd: 'Y24EC028', branch: 'ECE', prize: '₹750 Cash', project: 'Cultural Fest Monogram' }
        ]
    },
    {
        id: 'comp_spark',
        matchKey: 'spark',
        title: 'Technical Poster Presentation & Innovation Expo',
        club: 'CLUB SPARK',
        date: '06th August 2026',
        venue: 'SJB Seminar Hall',
        prizePool: '₹6,500 Cash Prizes Awarded',
        summary: 'Inter-departmental technical poster showcase featuring prototypes in IoT, AI diagnostics, and sustainable materials.',
        winners: [
            { rank: '1st', name: 'S. Naveen', regd: 'Y23EC011', branch: 'ECE', prize: '₹3,000 Cash', project: 'Edge AI Health Monitor' },
            { rank: '2nd', name: 'M. Teja', regd: 'Y23CS055', branch: 'CSE', prize: '₹2,000 Cash', project: 'Smart Campus Energy Grid' },
            { rank: '3rd', name: 'S. Lakshmi', regd: 'Y24CH009', branch: 'CHE', prize: '₹1,500 Cash', project: 'Bio-Polymer Water Filter' }
        ]
    },
    {
        id: 'comp_1',
        matchKey: 'renewable',
        title: 'Clean Energy Poster Presentation',
        club: 'Renewable Energy Club',
        date: '01st August 2026',
        venue: 'SJB Seminar Hall',
        prizePool: '₹6,500 Cash Prizes Awarded',
        summary: 'Over 45 teams presented innovative solar microgrids, biomass gasifiers, and renewable charging stations.',
        winners: [
            { rank: '1st', name: 'K. Aditya Verma', regd: 'Y23EE042', branch: 'EEE', prize: '₹3,000 Cash', project: 'Hybrid Solar-Wind Microgrid' },
            { rank: '2nd', name: 'P. Sneha Reddy', regd: 'Y23ME018', branch: 'MECH', prize: '₹2,000 Cash', project: 'Biomass Campus Generator' },
            { rank: '3rd', name: 'T. Rahul', regd: 'Y24CS105', branch: 'CSE', prize: '₹1,500 Cash', project: 'AI Solar Tracking Panel' }
        ]
    },
    {
        id: 'comp_2',
        matchKey: 'inspiraze',
        title: 'Youth Leadership & Oratory Conclave',
        club: 'Club Inspiraze',
        date: '25th July 2026',
        venue: 'Open Air Theatre (OAT)',
        prizePool: '₹4,000 Cash & Trophies',
        summary: 'Annual campus oratorical conclave on ethics in technology and social impact.',
        winners: [
            { rank: '1st', name: 'G. Ananya', regd: 'Y23CS089', branch: 'CSE', prize: '₹2,500 Cash & Trophy', project: 'Vision 2030 Leadership' },
            { rank: '2nd', name: 'Ch. Karthik', regd: 'Y23IT012', branch: 'IT', prize: '₹1,500 Cash & Trophy', project: 'Ethics in Automation' }
        ]
    },
    {
        id: 'comp_3',
        matchKey: 'yoga',
        title: 'International Yoga Day Asana Championship',
        club: 'International Yoga Day',
        date: '21st June 2026',
        venue: 'Open Air Theatre (OAT)',
        prizePool: '₹2,500 Cash & Medals',
        summary: 'Campus-wide yoga competition celebrating International Yoga Day with over 300 student and faculty participants.',
        winners: [
            { rank: '1st', name: 'M. Divya', regd: 'Y23IT033', branch: 'IT', prize: '₹1,500 Cash & Gold Medal', project: 'Advanced Hatha Asanas' },
            { rank: '2nd', name: 'B. Sai Kumar', regd: 'Y24EC064', branch: 'ECE', prize: '₹1,000 Cash & Silver Medal', project: 'Surya Namaskar Endurance' }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. WARM AMBIENT LIGHT & FLOATING EMBERS CANVAS
    // -------------------------------------------------------------
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;
        let embers = [];
        const emberCount = window.innerWidth < 768 ? 22 : 45;
        let heroMouse = { x: null, y: null, radius: 160 };

        const warmPalettes = [
            'rgba(245, 158, 11, ',
            'rgba(225, 29, 72, ',
            'rgba(251, 191, 36, ',
            'rgba(234, 88, 12, '
        ];

        class WarmEmber {
            constructor() { this.reset(true); }
            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : height + Math.random() * 40;
                this.radius = Math.random() * 2.8 + 1.2;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = -(Math.random() * 0.55 + 0.25);
                this.color = warmPalettes[Math.floor(Math.random() * warmPalettes.length)];
                this.baseAlpha = Math.random() * 0.4 + 0.15;
                this.alpha = this.baseAlpha;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulseAngle = Math.random() * Math.PI * 2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.pulseAngle += this.pulseSpeed;
                this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.12;

                if (heroMouse.x !== null) {
                    const dx = heroMouse.x - this.x;
                    const dy = heroMouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < heroMouse.radius && dist > 0) {
                        const force = (heroMouse.radius - dist) / heroMouse.radius;
                        this.x -= (dx / dist) * force * 1.8;
                        this.y -= (dy / dist) * force * 1.8;
                    }
                }

                if (this.y < -30 || this.x < -40 || this.x > width + 40) {
                    this.reset(false);
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color}${Math.max(0, this.alpha)})`;
                ctx.shadowColor = this.color.replace('rgba', 'rgb').replace(', ', ',');
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < emberCount; i++) embers.push(new WarmEmber());

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            embers.forEach(ember => { ember.update(); ember.draw(); });
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();

        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                heroMouse.x = e.clientX - rect.left;
                heroMouse.y = e.clientY - rect.top;
            }, { passive: true });
            heroSection.addEventListener('mouseleave', () => {
                heroMouse.x = null;
                heroMouse.y = null;
            });
        }

        window.addEventListener('resize', () => {
            if (canvas && canvas.parentElement) {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
            }
        });
    }

    // -------------------------------------------------------------
    // 2. INTERACTIVE CURSOR GLOW (Single 60fps Loop)
    // -------------------------------------------------------------
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });
        function animateCursor() {
            currentX += (mouseX - currentX) * 0.12;
            currentY += (mouseY - currentY) * 0.12;
            cursorGlow.style.left = `${currentX}px`;
            cursorGlow.style.top = `${currentY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }

    // -------------------------------------------------------------
    // 3. SMOOTH NAVIGATION & ACTIVE SCROLL TRACKER
    // -------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const headerEl = document.querySelector('.header');
                const headerHeight = headerEl ? headerEl.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight + 10;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                const navMenu = document.getElementById('navMenu');
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                if (navMenu) navMenu.classList.remove('active');
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
                updateActiveNavLink(targetId);
            }
        });
    });

    function updateActiveNavLink(hash) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) link.classList.add('active');
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = header ? header.offsetHeight : 80;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - headerHeight - 140)) {
                current = section.getAttribute('id');
            }
        });
        if (current) {
            const hasHashLinks = Array.from(navLinks).some(link => {
                const href = link.getAttribute('href');
                return href && href.startsWith('#');
            });
            if (hasHashLinks) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        link.classList.remove('active');
                        if (href === `#${current}`) link.classList.add('active');
                    }
                });
            }
        }
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 40);
        }
        const readingProgressBar = document.getElementById('readingProgressBar');
        if (readingProgressBar) {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            readingProgressBar.style.width = `${scrolled}%`;
        }
    }, { passive: true });

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // -------------------------------------------------------------
    // 4. ANIMATED STATS NUMBER COUNTER
    // -------------------------------------------------------------
    const statItems = document.querySelectorAll('.stat-item[data-count]');
    let statsAnimated = false;

    function animateCounters() {
        statItems.forEach(item => {
            const target = parseInt(item.getAttribute('data-count'), 10);
            const suffix = item.getAttribute('data-suffix') || '';
            const numberEl = item.querySelector('.stat-number');
            const duration = 1800;
            const startTime = performance.now();
            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);
                if (numberEl) numberEl.textContent = `${currentVal.toLocaleString()}${suffix}`;
                if (progress < 1) requestAnimationFrame(updateNumber);
                else if (numberEl) numberEl.textContent = `${target.toLocaleString()}${suffix}`;
            }
            requestAnimationFrame(updateNumber);
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) statsObserver.observe(statsSection);

    // -------------------------------------------------------------
    // 5. ABOUT CAROUSEL WITH MANUAL CONTROLS & AUTO-PLAY
    // -------------------------------------------------------------
    const carousel = document.getElementById('aboutCarousel');
    if (carousel) {
        const track = document.getElementById('carouselTrack');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const progressBar = document.getElementById('progressBar');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        const playPauseBtn = document.getElementById('carouselTogglePlay');

        let currentSlide = 0;
        let progressInterval;
        let progressWidth = 0;
        let isPlaying = true;
        const slideDuration = 3400;
        const progressUpdateInterval = 20;
        const progressIncrement = 100 / (slideDuration / progressUpdateInterval);

        function updateCarousel() {
            const translateX = -currentSlide * 100;
            track.style.transform = `translateX(${translateX}%)`;
            slides.forEach((slide, index) => slide.classList.toggle('active', index === currentSlide));
            resetProgress();
        }
        function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; updateCarousel(); }
        function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateCarousel(); }
        function resetProgress() {
            if (!progressBar) return;
            progressWidth = 0;
            progressBar.style.width = '0%';
        }
        function animateProgress() {
            if (!progressBar || !isPlaying) return;
            progressWidth += progressIncrement;
            if (progressWidth >= 100) {
                progressWidth = 100;
                progressBar.style.width = '100%';
                setTimeout(nextSlide, 60);
            } else {
                progressBar.style.width = `${progressWidth}%`;
            }
        }
        function startCarousel() {
            if (progressInterval) clearInterval(progressInterval);
            resetProgress();
            progressInterval = setInterval(animateProgress, progressUpdateInterval);
        }
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); if (isPlaying) startCarousel(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); if (isPlaying) startCarousel(); });
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                isPlaying = !isPlaying;
                playPauseBtn.textContent = isPlaying ? '❚❚' : '▶';
                playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause Auto-play' : 'Resume Auto-play');
                if (isPlaying) startCarousel();
            });
        }
        updateCarousel();
        startCarousel();
    }

    // -------------------------------------------------------------
    // 6. FAQ ACCORDION
    // -------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherBtn = otherItem.querySelector('.faq-question');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });
                item.classList.toggle('active', !isActive);
                questionBtn.setAttribute('aria-expanded', String(!isActive));
            });
        }
    });

    // -------------------------------------------------------------
    // 7. GALLERY CATEGORY FILTER TABS & LIGHTBOX
    // -------------------------------------------------------------
    const galleryFilterBtns = document.querySelectorAll('#galleryFilters .filter-btn');
    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            const allItems = document.querySelectorAll('#galleryGrid .gallery-item');
            allItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(15px)';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
                } else item.classList.add('hidden');
            });
        });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentGalleryIndex = 0;
    let visibleGalleryItems = [];

    function updateLightboxImage(index) {
        visibleGalleryItems = Array.from(document.querySelectorAll('#galleryGrid .gallery-item:not(.hidden)'));
        if (visibleGalleryItems.length === 0) return;
        currentGalleryIndex = (index + visibleGalleryItems.length) % visibleGalleryItems.length;
        const targetItem = visibleGalleryItems[currentGalleryIndex];
        const img = targetItem.querySelector('.gallery-image img');
        const caption = targetItem.getAttribute('data-caption') || '';
        if (lightboxImage && img) lightboxImage.innerHTML = `<img src="${img.src}" alt="${caption}">`;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${visibleGalleryItems.length}`;
    }

    const galleryGridContainer = document.getElementById('galleryGrid');
    if (galleryGridContainer) {
        galleryGridContainer.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (!item) return;
            visibleGalleryItems = Array.from(document.querySelectorAll('#galleryGrid .gallery-item:not(.hidden)'));
            const idx = visibleGalleryItems.indexOf(item);
            updateLightboxImage(idx >= 0 ? idx : 0);
            if (lightbox) {
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); updateLightboxImage(currentGalleryIndex - 1); });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); updateLightboxImage(currentGalleryIndex + 1); });

    function closeLightbox() {
        if (lightbox) { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
    }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') updateLightboxImage(currentGalleryIndex - 1);
        if (e.key === 'ArrowRight') updateLightboxImage(currentGalleryIndex + 1);
    });

    // -------------------------------------------------------------
    // 8. FLOATING BACK TO TOP BUTTON
    // -------------------------------------------------------------
    const backToTopBtn = document.getElementById('backToTop');
    const progressCircle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 21;

    if (progressCircle) {
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = `${circumference}`;
    }

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;
        if (progressCircle) {
            const offset = circumference - (scrollPercent * circumference);
            progressCircle.style.strokeDashoffset = `${offset}`;
        }
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', scrollTop > 350);
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // -------------------------------------------------------------
    // 9. QUICK CONTACT FORM HANDLING
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const name = (nameInput ? nameInput.value : '').trim();
            const email = (emailInput ? emailInput.value : '').trim();
            const message = (messageInput ? messageInput.value : '').trim();
            if (!name || !email || !message) return;
            if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = `<span>Sending...</span>`; }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Message Sent! ✓</span>`;
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                }
                let noteEl = contactForm.querySelector('.contact-feedback-note');
                if (!noteEl) {
                    noteEl = document.createElement('div');
                    noteEl.className = 'contact-feedback-note';
                    noteEl.style.cssText = 'margin-top:14px; padding:12px 14px; background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.3); border-radius:10px; color:#10b981; font-size:0.88rem; line-height:1.4;';
                    contactForm.appendChild(noteEl);
                }
                noteEl.innerHTML = `<strong>Thanks ${name}!</strong> Your message has been received. Our team will reply to <em>${email}</em> soon.`;
                contactForm.reset();
                setTimeout(() => {
                    if (submitBtn) { submitBtn.innerHTML = originalText; submitBtn.style.background = ''; }
                }, 4000);
            }, 500);
        });
    }

    // -------------------------------------------------------------
    // 10. COMMAND PALETTE (Ctrl + K)
    // -------------------------------------------------------------
    const cmdOverlay = document.getElementById('cmdPaletteOverlay');
    const cmdInput = document.getElementById('cmdInput');
    const cmdResults = document.getElementById('cmdResults');
    const cmdTriggerBtn = document.getElementById('hudCmdTrigger');

    const cmdDestinations = [
        { title: 'Home / Campus Life Hub', sub: 'Interactive highlights, stats & overview', url: 'index.html', icon: '🏛️', category: 'Pages' },
        { title: 'About EC & CCAC', sub: 'Our mission, vision, leadership & history', url: 'about.html', icon: '📜', category: 'Pages' },
        { title: 'Events & Calendar', sub: 'Upcoming & completed campus events and full schedule', url: 'events.html', icon: '🎭', category: 'Pages' },
        { title: 'SICO Community Outreach', sub: 'Student initiatives & social impact programs', url: 'sico.html', icon: '🤝', category: 'Pages' },
        { title: 'Reports & Archives', sub: 'Annual documentation & retrospective PDFs', url: 'reports.html', icon: '📊', category: 'Pages' },
        { title: 'Student Coordinators', sub: 'Core leadership directory & committee leads', url: 'team.html', icon: '👥', category: 'Pages' },
        { title: 'Champions & Winners Hall of Fame', sub: 'Verified merit lists, student regd numbers & cash prizes', url: 'events.html#winnersHallOfFame', icon: '🏆', category: 'Pages' },
        { title: 'Visual Stories & Gallery', sub: 'Curated photo memories from campus celebrations', url: 'gallery.html', icon: '📸', category: 'Pages' },
        { title: 'Contact & FAQ Hub', sub: 'Campus address, student helpline & FAQs', url: 'contact.html', icon: '💬', category: 'Pages' },
        { title: 'COLORIDO 2026', sub: 'Annual Cultural & Sports Fest (28–29 Dec 2026)', url: 'events.html', icon: '🎪', category: 'Events' },
        { title: 'Video Editing & Graphic Design', sub: 'Pixel Craft motion & design contest (05 Dec 2026)', url: 'events.html', icon: '🎨', category: 'Events' },
        { title: 'Rangoli & Kite Flying Contest', sub: 'Red Ants cultural Sankranti celebration (08 Jan 2027)', url: 'events.html', icon: '🪁', category: 'Events' },
        { title: 'Western, Rap & Band Showdown', sub: 'Music Club live acoustic and band face-off (06 Feb 2027)', url: 'events.html', icon: '🎸', category: 'Events' },
        { title: 'Annual Photography Contest', sub: 'Campus lens competition (12 Feb 2027)', url: 'events.html', icon: '📷', category: 'Events' },
        { title: '42nd Annual Day Celebrations', sub: 'Grand convocation finale & rolling trophies (05 Mar 2027)', url: 'events.html', icon: '🎖️', category: 'Events' },
        { title: 'Register for SICO 2026–27', sub: 'Official Google Form registration', url: 'https://docs.google.com/forms/d/e/1FAIpQLScUBqRMzhequ2W4xq_7PvW-Q0wlDcyWUhtyPTxr5v0KCWprlA/viewform?usp=sharing&ouid=102886629071385519420', icon: '✍️', category: 'Actions', external: true },
        { title: 'View Full Academic Calendar', sub: 'Complete schedule of all 24 annual events', url: 'events.html#calendar', icon: '📅', category: 'Actions' },
        { title: 'Switch to Dark Mode', sub: 'Deep obsidian studio dark theme', action: () => applyTheme('dark'), icon: '🌙', category: 'Theme' },
        { title: 'Switch to Light Mode', sub: 'Crisp modern light theme', action: () => applyTheme('light'), icon: '☀️', category: 'Theme' }
    ];

    let activeCmdIndex = 0;
    let filteredCmds = [...cmdDestinations];

    function renderCmdResults() {
        if (!cmdResults) return;
        cmdResults.innerHTML = '';
        if (filteredCmds.length === 0) {
            cmdResults.innerHTML = `<div style="padding: 28px; text-align: center; color: var(--text-muted); font-size: 0.95rem;">No matching campus results found.</div>`;
            return;
        }
        filteredCmds.forEach((item, idx) => {
            const a = document.createElement('a');
            a.className = `cmd-item ${idx === activeCmdIndex ? 'active' : ''}`;
            a.href = item.url || '#';
            if (item.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
            a.innerHTML = `
                <div class="cmd-item-left">
                    <span class="cmd-item-icon">${item.icon}</span>
                    <div>
                        <div class="cmd-item-title">${item.title}</div>
                        <div class="cmd-item-sub">${item.sub}</div>
                    </div>
                </div>
                <span class="cmd-badge">${item.category}</span>
            `;
            a.addEventListener('mouseenter', () => { activeCmdIndex = idx; updateActiveCmdItem(); });
            a.addEventListener('click', (e) => {
                if (item.action) { e.preventDefault(); item.action(); closeCmdPalette(); }
                else closeCmdPalette();
            });
            cmdResults.appendChild(a);
        });
    }

    function updateActiveCmdItem() {
        const items = cmdResults.querySelectorAll('.cmd-item');
        items.forEach((item, idx) => {
            if (idx === activeCmdIndex) { item.classList.add('active'); item.scrollIntoView({ block: 'nearest' }); }
            else item.classList.remove('active');
        });
    }

    function openCmdPalette() {
        if (!cmdOverlay) return;
        cmdOverlay.classList.add('active');
        if (cmdInput) { cmdInput.value = ''; cmdInput.focus(); }
        filteredCmds = [...cmdDestinations];
        activeCmdIndex = 0;
        renderCmdResults();
    }

    function closeCmdPalette() {
        if (!cmdOverlay) return;
        cmdOverlay.classList.remove('active');
    }

    if (cmdTriggerBtn) cmdTriggerBtn.addEventListener('click', openCmdPalette);

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdOverlay && cmdOverlay.classList.contains('active')) closeCmdPalette();
            else openCmdPalette();
        } else if (e.key === 'Escape' && cmdOverlay && cmdOverlay.classList.contains('active')) {
            closeCmdPalette();
        }
    });

    if (cmdOverlay) cmdOverlay.addEventListener('click', (e) => { if (e.target === cmdOverlay) closeCmdPalette(); });

    if (cmdInput) {
        cmdInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            filteredCmds = cmdDestinations.filter(d =>
                d.title.toLowerCase().includes(query) ||
                d.sub.toLowerCase().includes(query) ||
                d.category.toLowerCase().includes(query)
            );
            activeCmdIndex = 0;
            renderCmdResults();
        });
        cmdInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeCmdIndex = (activeCmdIndex + 1) % filteredCmds.length;
                updateActiveCmdItem();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeCmdIndex = (activeCmdIndex - 1 + filteredCmds.length) % filteredCmds.length;
                updateActiveCmdItem();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCmds[activeCmdIndex]) {
                    const target = filteredCmds[activeCmdIndex];
                    if (target.action) target.action();
                    else if (target.external) window.open(target.url, '_blank');
                    else window.location.href = target.url;
                    closeCmdPalette();
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 11. TACTILE MECHANICAL THEME ROLLER (DARK / LIGHT)
    // -------------------------------------------------------------
    function applyTheme(themeName) {
        const isLight = themeName === 'light' || themeName === 'champagne';
        const effectiveTheme = isLight ? 'light' : 'dark';
        if (isLight) {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.removeAttribute('data-theme');
        }
        try {
            localStorage.setItem('sico_theme', effectiveTheme);
            localStorage.setItem('sico_editorial_theme', effectiveTheme);
        } catch (err) {}

        document.querySelectorAll('.theme-roller-btn, #themeRoller').forEach(roller => {
            roller.setAttribute('aria-checked', isLight ? 'true' : 'false');
            const darkOpt = roller.querySelector('.roller-opt-dark');
            const lightOpt = roller.querySelector('.roller-opt-light');
            if (isLight) {
                roller.classList.add('is-light');
                roller.classList.remove('is-dark');
                if (darkOpt) darkOpt.classList.remove('active');
                if (lightOpt) lightOpt.classList.add('active');
            } else {
                roller.classList.remove('is-light');
                roller.classList.add('is-dark');
                if (darkOpt) darkOpt.classList.add('active');
                if (lightOpt) lightOpt.classList.remove('active');
            }
        });
    }

    window.setTheme = applyTheme;
    const storedTheme = localStorage.getItem('sico_theme') || localStorage.getItem('sico_editorial_theme') || 'dark';
    applyTheme(storedTheme);

    document.querySelectorAll('.theme-roller-btn, #themeRoller').forEach(roller => {
        roller.addEventListener('click', (e) => {
            const clickedOpt = e.target.closest('.roller-opt');
            if (clickedOpt) applyTheme(clickedOpt.getAttribute('data-theme-val') || 'dark');
            else applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
        });
        roller.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
            }
        });
    });

    // -------------------------------------------------------------
    // 12. LIVE COLORIDO 2026 FESTIVAL PASS COUNTDOWN
    // -------------------------------------------------------------
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMins = document.getElementById('cdMins');
    const cdSecs = document.getElementById('cdSecs');
    const cdTitle = document.getElementById('cdTitle');
    const cdStatus = document.getElementById('cdStatus');

    if (cdDays && cdHours && cdMins && cdSecs) {
        const festStart = new Date('2026-12-28T09:00:00+05:30').getTime();
        const festEnd = new Date('2026-12-29T23:59:59+05:30').getTime();
        function updateFestCountdown() {
            const now = Date.now();
            let diff = 0;
            if (now < festStart) diff = festStart - now;
            else if (now <= festEnd) {
                diff = festEnd - now;
                if (cdTitle) cdTitle.textContent = 'COLORIDO 2026 · LIVE NOW';
                if (cdStatus) cdStatus.innerHTML = '<span style="color:#e11d48;font-weight:700;">LIVE NOW · COLORIDO 2026 UNDERWAY ON CAMPUS</span>';
            } else {
                diff = 0;
                if (cdTitle) cdTitle.textContent = 'COLORIDO 2026 · CONCLUDED';
                if (cdStatus) cdStatus.innerHTML = '<span>COLORIDO 2026 CONCLUDED · THANK YOU TO ALL PARTICIPANTS</span>';
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            const secs = Math.floor((diff / 1000) % 60);
            cdDays.textContent = String(days).padStart(2, '0');
            cdHours.textContent = String(hours).padStart(2, '0');
            cdMins.textContent = String(mins).padStart(2, '0');
            cdSecs.textContent = String(secs).padStart(2, '0');
        }
        updateFestCountdown();
        setInterval(updateFestCountdown, 1000);
    }

    // -------------------------------------------------------------
    // 13. MASTER CALENDAR SEARCH & FILTER
    // -------------------------------------------------------------
    const calSearchInput = document.getElementById('calendarSearchInput');
    const calStatusFilters = document.querySelectorAll('#calStatusFilters .cal-filter-btn');

    let currentCalFilter = 'all';
    let currentSearchTerm = '';

    function filterCalendarRows() {
        const rows = document.querySelectorAll('#calendarTable tbody tr');
        if (!rows.length) return;
        rows.forEach(row => {
            const rowStatus = row.getAttribute('data-status');
            const rowText = row.textContent.toLowerCase();
            const matchesStatus = (currentCalFilter === 'all') || (rowStatus === currentCalFilter);
            const matchesSearch = !currentSearchTerm || rowText.includes(currentSearchTerm);
            row.style.display = (matchesStatus && matchesSearch) ? '' : 'none';
        });
    }

    if (calSearchInput) {
        calSearchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            filterCalendarRows();
        });
    }

    if (calStatusFilters.length) {
        calStatusFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                calStatusFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCalFilter = btn.getAttribute('data-status');
                filterCalendarRows();
            });
        });
    }

    // -------------------------------------------------------------
    // 14. CHAMPIONS & WINNERS HALL OF FAME (Links to 3D Flip Merit Card)
    // -------------------------------------------------------------
    function renderWinnersHallOfFame() {
        const completedEventsData = window.SICO_COMPLETED_EVENTS || [];
        const winnersGrid = document.getElementById('winnersHallGrid');

        if (winnersGrid) {
            winnersGrid.innerHTML = completedEventsData.map(comp => `
                <div class="winner-event-card">
                    <div class="winner-card-header">
                        <div>
                            <span class="winner-club-badge">${comp.club}</span>
                            <h3 class="winner-event-title">${comp.title}</h3>
                            <div class="winner-event-meta">
                                <span>Concluded: ${comp.date}</span>
                                <span>&middot; ${comp.venue}</span>
                            </div>
                        </div>
                        <div class="winner-prize-pool"><span>${comp.prizePool}</span></div>
                    </div>
                    ${comp.summary ? `<p class="winner-event-summary">${comp.summary}</p>` : ''}
                    <div class="winner-table-wrap">
                        <table class="winner-table">
                            <thead>
                                <tr>
                                    <th>Rank / Honor</th>
                                    <th>Winner Student</th>
                                    <th>Regd. No</th>
                                    <th>Dept</th>
                                    <th>Cash Prize Won</th>
                                    <th>Performance / Project</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${(comp.winners || []).map(w => {
                                    let rankBadge = `<span class="rank-badge-3">${w.rank}</span>`;
                                    if (w.rank === '1st') rankBadge = `<span class="rank-badge-1">1st Prize</span>`;
                                    else if (w.rank === '2nd') rankBadge = `<span class="rank-badge-2">2nd Prize</span>`;
                                    else if (w.rank === '3rd') rankBadge = `<span class="rank-badge-3">3rd Prize</span>`;
                                    return `
                                        <tr>
                                            <td>${rankBadge}</td>
                                            <td><strong style="color:var(--text-primary); font-weight:700;">${w.name}</strong></td>
                                            <td><span class="winner-regd-pill">${w.regd}</span></td>
                                            <td><span style="font-weight:600; font-size:0.8rem; color:var(--text-secondary);">${w.branch || '--'}</span></td>
                                            <td><span class="winner-cash-text">${w.prize}</span></td>
                                            <td style="font-size:0.82rem; color:var(--text-muted);">${w.project || 'Merit Performance'}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="winner-card-actions">
                        <button type="button" class="btn-winner-details" data-winner-id="${comp.id}">
                            <span>Flip &amp; View Merit Card</span><span aria-hidden="true">↻</span>
                        </button>
                    </div>
                </div>
            `).join('');

            const winnersSearchInput = document.getElementById('winnersSearchInput');
            const winnersResultsCount = document.getElementById('winnersResultsCount');
            const winnersSearchClear = document.getElementById('winnersSearchClear');

            const updateWinnersDirectory = () => {
                const cards = [...winnersGrid.querySelectorAll('.winner-event-card')];
                const query = (winnersSearchInput?.value || '').trim().toLowerCase();
                let visibleEvents = 0;
                let visibleAwardees = 0;
                cards.forEach(card => {
                    const matches = !query || card.textContent.toLowerCase().includes(query);
                    card.hidden = !matches;
                    if (matches) {
                        visibleEvents++;
                        visibleAwardees += card.querySelectorAll('.winner-table tbody tr').length;
                    }
                });
                if (winnersResultsCount) {
                    winnersResultsCount.textContent = query
                        ? `${visibleEvents} of ${cards.length} merit lists match`
                        : `${cards.length} completed events · ${visibleAwardees} awardees`;
                }
                if (winnersSearchClear) winnersSearchClear.hidden = !query;
                let emptyMessage = winnersGrid.querySelector('.winners-no-results');
                if (query && visibleEvents === 0) {
                    if (!emptyMessage) {
                        emptyMessage = document.createElement('p');
                        emptyMessage.className = 'winners-no-results';
                        emptyMessage.textContent = 'No merit lists match that search.';
                        winnersGrid.appendChild(emptyMessage);
                    }
                } else emptyMessage?.remove();
            };

            if (winnersSearchInput) winnersSearchInput.oninput = updateWinnersDirectory;
            if (winnersSearchClear) {
                winnersSearchClear.onclick = () => {
                    if (!winnersSearchInput) return;
                    winnersSearchInput.value = '';
                    updateWinnersDirectory();
                    winnersSearchInput.focus();
                };
            }
            winnersGrid.onclick = event => {
                const button = event.target.closest('.btn-winner-details');
                if (!button) return;
                if (typeof window.openFlipMeritCard === 'function') {
                    window.openFlipMeritCard(button.dataset.winnerId);
                }
            };
            updateWinnersDirectory();
        }

        // Attach "Merit List" 3D Flip buttons to matching completed rows in Master Calendar
        const calTbody = document.querySelector('#calendarTable tbody');
        if (calTbody) {
            const completedRows = calTbody.querySelectorAll('tr[data-status="completed"]');
            completedRows.forEach(row => {
                if (row.querySelector('.btn-cal-winners')) return;
                const rowText = row.textContent.toLowerCase();
                const matchedComp = completedEventsData.find(c =>
                    c.matchKey && rowText.includes(c.matchKey.toLowerCase())
                );
                if (!matchedComp) return;
                const actionCell = row.querySelector('td:last-child');
                if (actionCell) {
                    const winnerBtn = document.createElement('button');
                    winnerBtn.type = 'button';
                    winnerBtn.className = 'btn-cal-winners';
                    winnerBtn.textContent = 'Merit List ↻';
                    winnerBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (typeof window.openFlipMeritCard === 'function') {
                            window.openFlipMeritCard(matchedComp.id);
                        }
                    });
                    actionCell.appendChild(winnerBtn);
                }
            });
        }
    }
    renderWinnersHallOfFame();

    // -------------------------------------------------------------
    // 15. STUDENT VOICES
    // -------------------------------------------------------------
    function renderStudentVoices() {
        const voices = [
            {
                quote: "Colorido was the first time I stood before three thousand students singing with my band. EC & CCAC didn't just give us a stage; they gave us a family and memories that define our college years.",
                name: 'M. Kalyan',
                role: 'Music Club Lead',
                branch: 'B.Tech ECE',
                initials: 'MK'
            },
            {
                quote: "From choreographing 40-member crews for Club Waltz to managing stage cues at midnight, you learn real leadership, empathy, and grace under pressure here.",
                name: 'S. Priya',
                role: 'Dance Club Coordinator',
                branch: 'B.Tech CSE',
                initials: 'SP'
            },
            {
                quote: "SICO initiatives showed me how engineers can directly touch lives — teaching basic digital skills at blind schools and organizing campus blood donation camps.",
                name: 'R. Tarun',
                role: 'Helping Hands Volunteer',
                branch: 'B.Tech Mechanical',
                initials: 'RT'
            }
        ];
        const grid = document.getElementById('studentVoicesGrid') || document.querySelector('.voices-grid');
        if (grid) {
            grid.innerHTML = voices.map(v => `
                <div class="voice-card">
                    <div class="voice-quote-mark">&ldquo;</div>
                    <p class="voice-quote-text">${v.quote}</p>
                    <div class="voice-author">
                        <div class="voice-author-initials">${v.initials}</div>
                        <div>
                            <div class="voice-author-name">${v.name}</div>
                            <div class="voice-author-role">${v.role} &bull; ${v.branch}</div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    renderStudentVoices();

    // -------------------------------------------------------------
    // 16. INTERACTIVE "FIND YOUR TRIBE" CLUB MATCHER
    // -------------------------------------------------------------
    function initTribeMatcher() {
        const tribeGrid = document.getElementById('tribeMatcherGrid');
        const matchResult = document.getElementById('tribeMatchResult');
        if (!tribeGrid || !matchResult) return;
        const clubsData = {
            dance: { name: 'Dance Club', tagline: 'Feel the rhythm, own the stage, ignite the campus!', desc: 'Whether you are into hip-hop battles, classical fusion, contemporary duels, or mass cinematic crew performances, Dance Club is RVR&JC’s biggest high-voltage stage. No prior audition required for semester beginner bootcamps!', lead: 'S. Priya (Dance Club Lead)', flagship: 'Club Waltz & Colorido Crew Showdowns', accentColor: 'linear-gradient(135deg, #e11d48, #ea580c)' },
            music: { name: 'Music & Acoustic Band Club', tagline: 'Where campus melodies turn into rock anthems.', desc: 'Home to the official RVR&JC collegiate acoustic rock band, classical carnatic vocalists, solo guitarists, and beatboxers. Practice sessions at the SAC music room with full audio gear.', lead: 'M. Kalyan & Band Leads', flagship: 'Acoustic Unplugged Night & Colorido Symphony Stage', accentColor: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' },
            tech: { name: 'Digital Club', tagline: 'Code the future, edit cinematic duel films, and build websites.', desc: 'For software hackers, UI/UX designers, and video editors. Organizes Web Dev Hackathons, Anime & Manga Video Duels, and technical symposium media production.', lead: 'R. Joel Livingstone & Digital Team', flagship: 'Web Dev Duel, Anime Film Fest & Cyber Hackathons', accentColor: 'linear-gradient(135deg, #0ea5e9, #059669)' },
            art: { name: 'Pixel Craft & Fine Arts Club', tagline: 'Translating imaginations onto canvases and digital screens.', desc: 'From pencil sketching and oil painting to Figma UI design, brand identities, and campus mural artwork. Perfect for creative visual thinkers wanting to design institutional publications.', lead: 'Art Coordinators & Design Leads', flagship: 'Art & Design Expo, Live Sketch Duel & Poster Championships', accentColor: 'linear-gradient(135deg, #f59e0b, #e11d48)' },
            photo: { name: 'Photography & Cinematography Club', tagline: 'Framing every golden campus memory through the lens.', desc: 'Captures every cultural fest, celebration, guest lecture, and campus portrait. Organizes photowalks, DSLR cinematography masterclasses, and mobile editing workshops.', lead: 'Media Team & Photo Leads', flagship: 'Campus Photowalk, Short Film Screenings & Colorido Photo Wall', accentColor: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
            social: { name: 'Helping Hands Club & SICO', tagline: 'Empathy in action: Transforming communities with heart.', desc: 'Leading social initiatives across Guntur and AP: teaching digital literacy at schools for visually impaired children, organizing mega blood donation camps, environmental cleanups, and rural aid.', lead: 'R. Tarun & SICO Outreach Team', flagship: 'SICO Community Mission, Blood Donation & Green Campus Drives', accentColor: 'linear-gradient(135deg, #10b981, #059669)' },
            literary: { name: 'Literary & Debate Club (Inspiraze)', tagline: 'Words that inspire, arguments that convince, stories that resonate.', desc: 'Sharpen your stage confidence, impromptu speech, creative writing, poetry slams, and parliamentary debate skills. Regular mock conclaves with constructive faculty mentorship.', lead: 'G. Ananya & Debate Leads', flagship: 'Youth Leadership Conclave & Inter-Collegiate Oratory Duel', accentColor: 'linear-gradient(135deg, #f59e0b, #d97706)' },
            sports: { name: 'Sports & Fitness Club', tagline: 'Endurance, sportsmanship, and high-energy competition.', desc: 'Promotes wellness, yoga asana championships, campus badminton leagues, athletics, and annual sports days in collaboration with the physical education department.', lead: 'Sports Secretary & Fitness Leads', flagship: 'International Yoga Day Championship & Inter-Dept Sports Meet', accentColor: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }
        };
        const buttons = tribeGrid.querySelectorAll('.tribe-vibe-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const club = clubsData[btn.getAttribute('data-vibe')];
                if (!club) return;
                matchResult.style.display = 'block';
                matchResult.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
                        <div>
                            <span class="status-badge" style="background:${club.accentColor}; color:#fff; font-size:0.75rem; font-weight:800; padding:4px 12px; border-radius:99px; letter-spacing:0.5px;">
                                YOUR MATCH FOUND
                            </span>
                            <h3 style="font-size:1.8rem; font-family:var(--font-heading); margin:10px 0 4px; color:var(--text-primary); font-weight:800;">
                                ${club.name}
                            </h3>
                            <div style="color:var(--accent-amber); font-weight:600; font-size:0.95rem; margin-bottom:12px;">
                                &ldquo;${club.tagline}&rdquo;
                            </div>
                        </div>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScUBqRMzhequ2W4xq_7PvW-Q0wlDcyWUhtyPTxr5v0KCWprlA/viewform?usp=sharing"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="btn btn-primary"
                           style="padding:10px 20px; font-size:0.88rem;">
                            <span>Join ${club.name}</span>
                            <i>↗</i>
                        </a>
                    </div>
                    <p style="font-size:0.96rem; color:var(--text-secondary); line-height:1.65; margin:14px 0 18px; max-width:820px;">
                        ${club.desc}
                    </p>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; padding:14px; background:rgba(255,255,255,0.03); border-radius:10px; border:1px solid var(--border-card);">
                        <div>
                            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Key Coordinator</div>
                            <strong style="color:var(--text-primary); font-size:0.9rem;">${club.lead}</strong>
                        </div>
                        <div>
                            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Signature Showcase</div>
                            <strong style="color:var(--accent-amber); font-size:0.9rem;">${club.flagship}</strong>
                        </div>
                        <div>
                            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Eligibility</div>
                            <strong style="color:#10b981; font-size:0.9rem;">Open to All Branches &amp; Years</strong>
                        </div>
                    </div>
                `;
                matchResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });
    }
    initTribeMatcher();

});


/* ============================================================
   SICO 3D FLIP & ZOOM ENGINE (EVENTS + MERIT LISTS), SORTING & WOBBLE
   ============================================================ */
(function () {
    "use strict";

    const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScUBqRMzhequ2W4xq_7PvW-Q0wlDcyWUhtyPTxr5v0KCWprlA/viewform?usp=sharing&ouid=102886629071385519420';

    function showToast(message) {
        let stack = document.getElementById('ultraToastStack');
        if (!stack) {
            stack = document.createElement('div');
            stack.id = 'ultraToastStack';
            stack.className = 'ultra-toast-stack';
            document.body.appendChild(stack);
        }
        const toast = document.createElement('div');
        toast.className = 'ultra-toast';
        toast.textContent = message;
        stack.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px) scale(0.95)';
            toast.style.transition = 'all 0.25s ease';
            setTimeout(() => toast.remove(), 260);
        }, 2600);
    }

    // 1. Universal 3D Flip & Zoom Stage (Handles BOTH Event Cards & Merit Lists)
    let flipBackdrop = null;
    let flipCloseTimer = null;

    function ensureFlipStage() {
        if (flipBackdrop) return flipBackdrop;
        flipBackdrop = document.createElement('div');
        flipBackdrop.className = 'sico-flip-backdrop';
        flipBackdrop.setAttribute('role', 'dialog');
        flipBackdrop.setAttribute('aria-modal', 'true');
        flipBackdrop.setAttribute('aria-label', 'Event Details');
        flipBackdrop.innerHTML = `
            <div class="sico-flip-card" id="sicoFlipCard">
                <div class="sico-flip-face sico-flip-front">
                    <span class="flip-back-kicker" id="flipFrontKicker"></span>
                    <h3 class="flip-back-title" id="flipFrontTitle"></h3>
                </div>
                <div class="sico-flip-face sico-flip-back">
                    <div class="flip-back-header">
                        <div>
                            <div class="flip-back-kicker" id="flipKicker"></div>
                            <h3 class="flip-back-title" id="flipTitle"></h3>
                        </div>
                        <button type="button" class="flip-close-btn" id="flipCloseBtn" aria-label="Close">&times;</button>
                    </div>
                    <div class="flip-meta-strip">
                        <div class="flip-meta-item">
                            <span>Date &amp; Time</span>
                            <strong id="flipDate">--</strong>
                        </div>
                        <div class="flip-meta-item">
                            <span>Venue</span>
                            <strong id="flipVenue">--</strong>
                        </div>
                        <div class="flip-meta-item is-prize">
                            <span>Awards / Cash Prizes</span>
                            <strong id="flipPrize">--</strong>
                        </div>
                    </div>
                    <div class="flip-back-body" id="flipBackBody"></div>
                    <div class="flip-back-footer">
                        <button type="button" class="flip-btn-secondary" id="flipShareBtn">Share</button>
                        <a href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer" class="flip-btn-primary" id="flipRegisterBtn">
                            <span>Register Now</span>
                            <i>↗</i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(flipBackdrop);

        flipBackdrop.addEventListener('click', (e) => {
            if (e.target === flipBackdrop) closeFlipCard();
        });
        flipBackdrop.querySelector('#flipCloseBtn').addEventListener('click', closeFlipCard);

        flipBackdrop.querySelector('#flipShareBtn').addEventListener('click', async () => {
            const title = document.getElementById('flipTitle')?.textContent || 'Campus Event';
            const date = document.getElementById('flipDate')?.textContent || '';
            const venue = document.getElementById('flipVenue')?.textContent || '';
            const text = `${title} — ${date} at ${venue} (EC & CCAC · RVR&JCCE)`;
            try {
                if (navigator.share) {
                    await navigator.share({ title, text, url: window.location.href });
                } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
                }
                showToast('Link copied to clipboard');
            } catch (err) {}
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && flipBackdrop.classList.contains('active')) {
                closeFlipCard();
            }
        });

        return flipBackdrop;
    }

    function launchFlipAnimation(stage) {
        stage.classList.remove('flipped');
        stage.classList.add('active');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                stage.classList.add('flipped');
            });
        });
    }

    function openFlipCard(card) {
        const stage = ensureFlipStage();
        if (flipCloseTimer) clearTimeout(flipCloseTimer);

        const flipCardEl = document.getElementById('sicoFlipCard');
        if (flipCardEl) flipCardEl.classList.remove('is-merit-card');

        const title = card.getAttribute('data-title') || card.querySelector('.event-card-title')?.textContent || 'Campus Event';
        const cat = card.getAttribute('data-catname') || card.getAttribute('data-category') || 'Campus Event';
        const status = card.getAttribute('data-status') || 'upcoming';
        const date = card.getAttribute('data-date') || 'TBA';
        const time = card.getAttribute('data-time') || '';
        const venue = card.getAttribute('data-venue') || 'Campus Venue';
        const prize = card.getAttribute('data-prize') || '--';
        const desc = card.getAttribute('data-desc') || card.querySelector('.event-card-snippet')?.textContent || '';
        const highlights = card.getAttribute('data-highlights') || 'Competitions and student showcases.';
        const rules = card.getAttribute('data-rules') || 'College ID card mandatory for entry.';
        const leads = card.getAttribute('data-coordinators') || 'EC & CCAC Student Leads';

        const statusLabel = status === 'completed' ? 'COMPLETED' : 'UPCOMING';
        document.getElementById('flipFrontKicker').textContent = `${statusLabel} · ${cat}`;
        document.getElementById('flipFrontTitle').textContent = title;
        document.getElementById('flipKicker').textContent = `${statusLabel} · ${cat}`;
        document.getElementById('flipTitle').textContent = title;
        document.getElementById('flipDate').textContent = time ? `${date} · ${time}` : date;
        document.getElementById('flipVenue').textContent = venue;
        document.getElementById('flipPrize').textContent = prize;

        document.getElementById('flipBackBody').innerHTML = `
            <div class="flip-detail-block">
                <h4>About the Event</h4>
                <p>${desc}</p>
            </div>
            <div class="flip-detail-block">
                <h4>Highlights</h4>
                <p>${highlights}</p>
            </div>
            <div class="flip-detail-block">
                <h4>Guidelines</h4>
                <p>${rules}</p>
            </div>
            <div class="flip-detail-block">
                <h4>Student Leads</h4>
                <p>${leads}</p>
            </div>
        `;

        const regBtn = document.getElementById('flipRegisterBtn');
        if (regBtn) regBtn.style.display = status === 'completed' ? 'none' : 'inline-flex';

        launchFlipAnimation(stage);
    }

    // 3D Flip & Zoom Merit List Card (Replaces old clipped modal completely)
    window.openFlipMeritCard = function (id) {
        const list = window.SICO_COMPLETED_EVENTS || [];
        const ev = list.find(c => c.id === id);
        if (!ev) return;

        const stage = ensureFlipStage();
        if (flipCloseTimer) clearTimeout(flipCloseTimer);

        const flipCardEl = document.getElementById('sicoFlipCard');
        if (flipCardEl) flipCardEl.classList.add('is-merit-card');

        document.getElementById('flipFrontKicker').textContent = `MERIT LIST · ${ev.club}`;
        document.getElementById('flipFrontTitle').textContent = ev.title;
        document.getElementById('flipKicker').textContent = `COMPLETED · OFFICIAL MERIT LIST · ${ev.club}`;
        document.getElementById('flipTitle').textContent = ev.title;
        document.getElementById('flipDate').textContent = `Concluded ${ev.date}`;
        document.getElementById('flipVenue').textContent = ev.venue || 'Campus Venue';
        document.getElementById('flipPrize').textContent = ev.prizePool || 'Cash Prizes Awarded';

        const winnersHtml = (ev.winners || []).map(w => {
            let badgeClass = 'rank-badge-3';
            let badgeLabel = `${w.rank} Prize`;
            if (w.rank === '1st') badgeClass = 'rank-badge-1';
            else if (w.rank === '2nd') badgeClass = 'rank-badge-2';
            return `
                <div class="flip-winner-row">
                    <div class="flip-winner-left">
                        <span class="${badgeClass}">${badgeLabel}</span>
                        <div class="flip-winner-info">
                            <span class="flip-winner-name">${w.name}</span>
                            <div class="flip-winner-meta">
                                <span class="winner-regd-pill">${w.regd}</span>
                                <span>${w.branch || '--'}</span>
                                <span>&middot;</span>
                                <span class="flip-winner-project">${w.project || 'Merit Award'}</span>
                            </div>
                        </div>
                    </div>
                    <span class="flip-winner-prize">${w.prize}</span>
                </div>
            `;
        }).join('');

        document.getElementById('flipBackBody').innerHTML = `
            <div class="flip-detail-block">
                <h4>Event Summary</h4>
                <p>${ev.summary || 'Official verified competition results.'}</p>
            </div>
            <div class="flip-detail-block">
                <h4>Awarded Winners &amp; Cash Prizes</h4>
                <div class="flip-winners-list">${winnersHtml}</div>
            </div>
            <div class="flip-detail-block">
                <h4>Verification</h4>
                <p>All cash awards, certificates, and merit standings have been verified and disbursed under the aegis of EC &amp; CCAC, R.V.R. &amp; J.C. College of Engineering.</p>
            </div>
        `;

        const regBtn = document.getElementById('flipRegisterBtn');
        if (regBtn) regBtn.style.display = 'none';

        launchFlipAnimation(stage);
    };

    // Route any legacy calls straight to the 3D Flip Merit Card
    window.viewCompletedWinnersModal = window.openFlipMeritCard;

    function closeFlipCard() {
        if (!flipBackdrop) return;
        flipBackdrop.classList.remove('flipped');
        flipCloseTimer = setTimeout(() => {
            flipBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }, 320);
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('a.btn-card-register')) return;
        const card = e.target.closest('#eventsGridModern .event-card-modern');
        if (!card) return;
        e.preventDefault();
        openFlipCard(card);
    });

    // 2. Sync Event Dates, Sort UPCOMING on Top & COMPLETED Below, and Filter (All / Upcoming / Completed only)
    function initEventsEngine() {
        const grid = document.getElementById('eventsGridModern');
        const filterBar = document.getElementById('eventsFilterBar');
        const liveSearch = document.getElementById('eventsLiveSearch');
        const visibleCountEl = document.getElementById('eventsVisibleCount');
        const now = Date.now();
        const monthMap = {
            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
        };

        function parseCardTimestamp(card) {
            if (card.dataset.start) {
                const parsed = Date.parse(card.dataset.start);
                if (Number.isFinite(parsed)) return parsed;
            }
            const raw = (card.getAttribute('data-date') || '').toLowerCase();
            const m = raw.match(/(\d{1,2})\w*\s+(?:&\s+\d{1,2}\w*\s+)?([a-z]{3})[a-z]*\s+(\d{4})/);
            if (m && monthMap[m[2]] !== undefined) {
                return new Date(Number(m[3]), monthMap[m[2]], Number(m[1]), 13, 0, 0).getTime();
            }
            return NaN;
        }

        if (filterBar) {
            filterBar.innerHTML = `
                <button class="filter-pill active" data-filter="all" type="button">All</button>
                <button class="filter-pill" data-filter="upcoming" type="button">Upcoming</button>
                <button class="filter-pill" data-filter="completed" type="button">Completed</button>
            `;
        }

        if (grid) {
            const cards = Array.from(grid.querySelectorAll('.event-card-modern'));

            cards.forEach(card => {
                const ts = parseCardTimestamp(card);
                const isCompleted = Number.isFinite(ts)
                    ? ts < now
                    : card.getAttribute('data-status') === 'completed';

                card.setAttribute('data-status', isCompleted ? 'completed' : 'upcoming');
                card.dataset.sortTs = Number.isFinite(ts) ? String(ts) : '0';
                card.classList.toggle('is-completed', isCompleted);

                const statusPill = card.querySelector('.event-status-pill');
                if (statusPill) {
                    statusPill.className = `event-status-pill ${isCompleted ? 'status-completed' : 'status-upcoming'}`;
                    statusPill.removeAttribute('style');
                    statusPill.textContent = isCompleted ? 'Completed' : 'Upcoming';
                }

                const detailsBtn = card.querySelector('.btn-event-details span');
                if (detailsBtn) {
                    detailsBtn.textContent = isCompleted ? 'Flip for Summary' : 'Flip for Details';
                }
                const regLink = card.querySelector('.btn-card-register');
                if (isCompleted && regLink) {
                    const closedTag = document.createElement('span');
                    closedTag.className = 'btn-card-closed';
                    closedTag.textContent = 'Concluded';
                    regLink.replaceWith(closedTag);
                }
            });

            cards.sort((a, b) => {
                const aComp = a.getAttribute('data-status') === 'completed' ? 1 : 0;
                const bComp = b.getAttribute('data-status') === 'completed' ? 1 : 0;
                if (aComp !== bComp) return aComp - bComp;
                const tsA = Number(a.dataset.sortTs || 0);
                const tsB = Number(b.dataset.sortTs || 0);
                return aComp === 0 ? tsA - tsB : tsB - tsA;
            });
            cards.forEach(card => grid.appendChild(card));

            function applyFilter() {
                const activeBtn = filterBar ? filterBar.querySelector('.filter-pill.active') : null;
                const mode = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
                const query = (liveSearch ? liveSearch.value : '').trim().toLowerCase();

                let visible = 0;
                cards.forEach(card => {
                    const status = card.getAttribute('data-status');
                    const matchesStatus = mode === 'all' || status === mode;
                    const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
                    if (matchesStatus && matchesSearch) {
                        card.classList.remove('hidden');
                        visible++;
                    } else {
                        card.classList.add('hidden');
                    }
                });
                if (visibleCountEl) {
                    visibleCountEl.textContent = `${visible} event${visible === 1 ? '' : 's'}`;
                }
            }

            if (filterBar) {
                filterBar.addEventListener('click', (e) => {
                    const btn = e.target.closest('.filter-pill');
                    if (!btn) return;
                    filterBar.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
                    btn.classList.add('active');
                    applyFilter();
                });
            }
            if (liveSearch) liveSearch.addEventListener('input', applyFilter);
            applyFilter();
        }

        // Sync & Sort Master Calendar (#calendarTable) so Upcoming rows stay on top
        const calTbody = document.querySelector('#calendarTable tbody');
        if (calTbody) {
            const rows = Array.from(calTbody.querySelectorAll('tr'));
            let upcomingCount = 0;
            let completedCount = 0;

            rows.forEach(row => {
                const dateText = (row.querySelector('.cal-date-day')?.textContent || '').toLowerCase();
                const m = dateText.match(/(\d{1,2})\s*-\s*([a-z]{3})\s*-\s*(\d{2})/);
                let ts = NaN;
                if (m && monthMap[m[2]] !== undefined) {
                    ts = new Date(2000 + Number(m[3]), monthMap[m[2]], Number(m[1]), 23, 59, 59).getTime();
                } else {
                    const mMonthOnly = dateText.match(/([a-z]{3})\s*-\s*(\d{2})/);
                    if (mMonthOnly && monthMap[mMonthOnly[1]] !== undefined) {
                        ts = new Date(2000 + Number(mMonthOnly[2]), monthMap[mMonthOnly[1]], 15, 23, 59, 59).getTime();
                    }
                }
                row.dataset.sortTs = Number.isFinite(ts) ? String(ts) : '0';

                const isCompleted = Number.isFinite(ts)
                    ? ts < now
                    : row.getAttribute('data-status') === 'completed';

                const tag = row.querySelector('.status-tag');
                if (isCompleted) {
                    completedCount++;
                    row.setAttribute('data-status', 'completed');
                    row.classList.remove('row-upcoming', 'row-imminent');
                    row.classList.add('row-completed');
                    if (tag) {
                        tag.className = 'status-tag completed';
                        tag.removeAttribute('style');
                        tag.textContent = 'Completed';
                    }
                } else {
                    upcomingCount++;
                    row.setAttribute('data-status', 'upcoming');
                    row.classList.remove('row-completed');
                    row.classList.add('row-upcoming');
                    if (tag) {
                        tag.className = 'status-tag upcoming';
                        tag.removeAttribute('style');
                        tag.textContent = 'Upcoming';
                    }
                }
            });

            rows.sort((a, b) => {
                const aComp = a.getAttribute('data-status') === 'completed' ? 1 : 0;
                const bComp = b.getAttribute('data-status') === 'completed' ? 1 : 0;
                if (aComp !== bComp) return aComp - bComp;
                const tsA = Number(a.dataset.sortTs || 0);
                const tsB = Number(b.dataset.sortTs || 0);
                return aComp === 0 ? tsA - tsB : tsB - tsA;
            });
            rows.forEach(row => calTbody.appendChild(row));

            const allBtn = document.querySelector('#calStatusFilters [data-status="all"]');
            const upBtn = document.querySelector('#calStatusFilters [data-status="upcoming"]');
            const compBtn = document.querySelector('#calStatusFilters [data-status="completed"]');
            if (allBtn) allBtn.textContent = `All (${rows.length})`;
            if (upBtn) upBtn.textContent = `Upcoming (${upcomingCount})`;
            if (compBtn) compBtn.textContent = `Completed (${completedCount})`;

            const heroUp = document.getElementById('heroUpcomingStat');
            const heroComp = document.getElementById('heroCompletedStat');
            if (heroUp) heroUp.textContent = String(upcomingCount);
            if (heroComp) heroComp.textContent = String(completedCount);
        }
    }

    // 3. Elastic 3D Tilt + Spring Wobble + Specular Glare
    if (window.matchMedia('(pointer: fine)').matches) {
        const wobbleSelector = '.event-card-modern, .portal-card, .voice-card, .holo-pass, .tribe-vibe-btn';

        document.addEventListener('pointermove', (e) => {
            const card = e.target.closest(wobbleSelector);
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const px = x / rect.width;
            const py = y / rect.height;

            card.style.setProperty('--mx', `${x}px`);
            card.style.setProperty('--my', `${y}px`);
            if (card.classList.contains('holo-pass')) {
                card.style.setProperty('--holo-x', `${px * 100}%`);
                card.style.setProperty('--holo-y', `${py * 100}%`);
            }

            const intensity = card.classList.contains('holo-pass') ? 12 : 8;
            const rotY = (px - 0.5) * intensity;
            const rotX = (0.5 - py) * intensity;
            card.style.transition = 'transform 0.08s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
            card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px) scale(1.015)`;
        }, { passive: true });

        document.addEventListener('pointerout', (e) => {
            const card = e.target.closest(wobbleSelector);
            if (!card || card.contains(e.relatedTarget)) return;
            card.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, border-color 0.3s ease';
            card.style.transform = '';
        });

        document.querySelectorAll('.btn-primary, .btn-nav-cta, .btn-card-register').forEach(btn => {
            btn.addEventListener('pointermove', (e) => {
                const rect = btn.getBoundingClientRect();
                const dx = (e.clientX - rect.left - rect.width / 2) * 0.16;
                const dy = (e.clientY - rect.top - rect.height / 2) * 0.16;
                btn.style.transition = 'transform 0.08s ease-out';
                btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(1.03)`;
            });
            btn.addEventListener('pointerleave', () => {
                btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                btn.style.transform = '';
            });
        });
    }

    // 4. Button Ripple Feedback & Tribe Confetti Burst
    function spawnConfettiBurst(x, y) {
        const colors = ['#ff5e3a', '#ff2a6d', '#ffb347', '#06b6d4', '#8b5cf6', '#10b981'];
        for (let i = 0; i < 16; i++) {
            const dot = document.createElement('span');
            dot.className = 'sico-confetti-dot';
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            dot.style.background = colors[i % colors.length];
            document.body.appendChild(dot);

            const angle = (Math.PI * 2 * i) / 16 + (Math.random() - 0.5) * 0.4;
            const velocity = 42 + Math.random() * 58;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity - 18;
            const rot = (Math.random() - 0.5) * 360;

            dot.animate([
                { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0.2) rotate(${rot}deg)`, opacity: 0 }
            ], {
                duration: 580 + Math.random() * 220,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'forwards'
            }).onfinish = () => dot.remove();
        }
    }

    document.addEventListener('click', (e) => {
        const button = e.target.closest('.btn, .btn-nav-cta, .btn-card-primary, .filter-pill');
        if (button) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position:absolute; left:${e.clientX - rect.left}px; top:${e.clientY - rect.top}px;
                width:10px; height:10px; border-radius:50%; background:rgba(255,255,255,0.42);
                transform:translate(-50%,-50%); pointer-events:none; z-index:10;
                animation:sicoButtonRipple 0.65s ease-out forwards;
            `;
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        }
        if (e.target.closest('.tribe-vibe-btn')) {
            spawnConfettiBurst(e.clientX, e.clientY);
        }
    });

    // 5. Staggered Blur-to-Sharp Scroll Choreography
    function initScrollChoreography() {
        const targets = document.querySelectorAll(
            '#events .event-card-modern, .portal-card, .voice-card, .tribe-vibe-btn, .team-card, .winner-event-card, #galleryGrid .gallery-item'
        );
        if (!targets.length || !('IntersectionObserver' in window)) return;

        targets.forEach((el, idx) => {
            el.classList.add('fx-reveal');
            el.style.setProperty('--fx-delay', `${(idx % 3) * 70}ms`);
        });

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fx-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        targets.forEach(el => io.observe(el));
    }

    // 6. Hero Counter Animation (Instant on page switches, 5.1s on first visit)
    const counterDelay = document.documentElement.classList.contains('skip-sico-loader') ? 150 : 5100;
    document.querySelectorAll('.ultra-stat-chip [data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        function runCounter() {
            const start = performance.now();
            function step(now) {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = `${Math.floor(target * eased).toLocaleString()}${suffix}`;
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }
        setTimeout(runCounter, counterDelay);
    });

    // 7. Missing Photo Initials Fallback, Clickable Ctrl+K, Lazy Images & Active Nav
    function initUtilities() {
        document.querySelectorAll('.team-photo-img').forEach(img => {
            const replaceWithInitials = () => {
                const name = img.getAttribute('alt') || 'SC';
                const parts = name.replace(/\./g, ' ').trim().split(/\s+/).filter(Boolean);
                const initials = parts.length >= 2
                    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                    : name.slice(0, 2).toUpperCase();
                if (img.parentElement) {
                    img.parentElement.innerHTML = `<div class="team-avatar-initials avatar-grad-coord">${initials}</div>`;
                }
            };
            img.addEventListener('error', replaceWithInitials, { once: true });
            if (img.complete && img.naturalWidth === 0) replaceWithInitials();
        });

        document.querySelectorAll('.campus-announcement-bar .hud-tag').forEach(tag => {
            if (tag.textContent.toUpperCase().includes('CTRL + K')) {
                tag.style.cursor = 'pointer';
                tag.addEventListener('click', () => {
                    const trigger = document.getElementById('hudCmdTrigger');
                    if (trigger) trigger.click();
                });
            }
        });

        document.querySelectorAll('img').forEach((img, idx) => {
            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
            if (idx > 4 && !img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        });

        const currentFile = window.location.pathname.split("/").pop().toLowerCase();
        document.querySelectorAll(".nav-link").forEach(link => {
            const href = link.getAttribute("href");
            if (!href) return;
            const linkFile = href.split("/").pop().split("?")[0].toLowerCase();
            if (linkFile === currentFile) {
                document.querySelectorAll(".nav-link.active").forEach(old => old.classList.remove("active"));
                link.classList.add("active");
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initEventsEngine();
            initScrollChoreography();
            initUtilities();
        });
    } else {
        initEventsEngine();
        initScrollChoreography();
        initUtilities();
    }
})();

(function () {
    const style = document.createElement("style");
    style.textContent = `
        @keyframes sicoButtonRipple {
            0% { width: 10px; height: 10px; opacity: .65; }
            100% { width: 350px; height: 350px; opacity: 0; }
        }
    `;
    document.head.appendChild(style);
})();

/* ============================================================
   FINAL SAFETY NETS
   ============================================================ */
window.addEventListener('pageshow', () => {
    if (document.body.style.overflow === 'hidden') {
        const anyModalOpen = document.querySelector(
            '.sico-flip-backdrop.active, .event-modal-backdrop.active, .lightbox.active, .cmd-palette-overlay.active'
        );
        if (!anyModalOpen) document.body.style.overflow = '';
    }
});

// Force loader to auto-dismiss after 5.5s max as a fallback
(function () {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    setTimeout(() => {
        if (!loader.classList.contains('loader-hidden')) {
            try { sessionStorage.setItem('sico_loader_shown', 'true'); } catch (e) {}
            loader.classList.add('loader-hidden');
            document.body.classList.add('page-ready');
            setTimeout(() => loader.remove(), 1000);
        }
    }, 5500);
})();