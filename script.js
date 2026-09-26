// ============================================
// EC & CCAC - SICO ULTIMATE UI & UX SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. HERO CANVAS PARTICLE NETWORK
    // -------------------------------------------------------------
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

        // Safe fallback for window.triggerWarpSpeed if invoked
        window.triggerWarpSpeed = function() {
            // Soft warm pulse instead of sci-fi warp
            embers.forEach(e => {
                e.vy -= 2;
                e.alpha = Math.min(0.8, e.alpha + 0.3);
            });
        };

        const warmPalettes = [
            'rgba(245, 158, 11, ',   // Warm Amber Gold
            'rgba(225, 29, 72, ',    // Festival Vermilion
            'rgba(251, 191, 36, ',   // Soft Champagne
            'rgba(234, 88, 12, '     // Warm Coral
        ];

        class WarmEmber {
            constructor() {
                this.reset(true);
            }

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

                // Subtle gentle deflection away from cursor
                if (heroMouse.x !== null) {
                    const dx = heroMouse.x - this.x;
                    const dy = heroMouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < heroMouse.radius) {
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

        for (let i = 0; i < emberCount; i++) {
            embers.push(new WarmEmber());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            embers.forEach(ember => {
                ember.update();
                ember.draw();
            });

            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();

        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                heroMouse.x = e.clientX - rect.left;
                heroMouse.y = e.clientY - rect.top;
            });
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
    // 2. INTERACTIVE CURSOR GLOW
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
        });

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

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

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
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
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
                        if (href === `#${current}`) {
                            link.classList.add('active');
                        }
                    }
                });
            }
        }

        if (header) {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        const readingProgressBar = document.getElementById('readingProgressBar');
        if (readingProgressBar) {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            readingProgressBar.style.width = `${scrolled}%`;
        }
    });

    // Mobile Menu Toggle
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
            const duration = 1800; // 1.8s
            const startTime = performance.now();

            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic formula
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);

                if (numberEl) {
                    numberEl.textContent = `${currentVal.toLocaleString()}${suffix}`;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else if (numberEl) {
                    numberEl.textContent = `${target.toLocaleString()}${suffix}`;
                }
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
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

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
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            resetProgress();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        }

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

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                if (isPlaying) startCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                if (isPlaying) startCarousel();
            });
        }

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

        // Slide shine sweep
        slides.forEach(slide => {
            const shine = slide.querySelector('.slide-shine');
            if (shine) {
                const observer = new MutationObserver(() => {
                    if (slide.classList.contains('active')) {
                        shine.style.left = '-100%';
                        setTimeout(() => {
                            shine.style.left = '100%';
                            shine.style.transition = 'left 0.8s ease';
                        }, 80);
                    }
                });
                observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
            }
        });
    }

    // -------------------------------------------------------------
    // 6. EVENT CATEGORY FILTER TABS
    // -------------------------------------------------------------
    const eventFilterBtns = document.querySelectorAll('#eventFilters .filter-btn');
    const eventCards = document.querySelectorAll('#eventsGrid .event-card');

    eventFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            eventFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            eventCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 7. EVENT DETAILS MODAL & CALENDAR EXPORT
    // -------------------------------------------------------------
    const eventModal = document.getElementById('eventModal');
    const eventModalClose = document.getElementById('eventModalClose');

    // Universal iCalendar (.ics) Downloader
    window.downloadEventICS = function(title, desc, location, dateStr) {
        let dtStart = '20260930T130000';
        let dtEnd = '20260930T170000';
        const d = (dateStr || '').toUpperCase();
        
        if (d.includes('OCT') || d.includes('OCTOBER')) {
            if (d.includes('24')) {
                dtStart = '20261024T100000';
                dtEnd = '20261024T160000';
            } else {
                dtStart = '20261005T120000';
                dtEnd = '20261006T210000';
            }
        } else if (d.includes('DEC') || d.includes('DECEMBER')) {
            if (d.includes('05') || d.includes('5TH')) {
                dtStart = '20261205T140000';
                dtEnd = '20261205T180000';
            } else {
                dtStart = '20261228T090000';
                dtEnd = '20261229T220000';
            }
        } else if (d.includes('JAN') || d.includes('JANUARY')) {
            dtStart = '20270108T140000';
            dtEnd = '20270108T180000';
        } else if (d.includes('FEB') || d.includes('FEBRUARY')) {
            if (d.includes('12')) {
                dtStart = '20270212T140000';
                dtEnd = '20270212T180000';
            } else {
                dtStart = '20270206T140000';
                dtEnd = '20270206T180000';
            }
        } else if (d.includes('MAR') || d.includes('MARCH')) {
            dtStart = '20270305T090000';
            dtEnd = '20270305T200000';
        }

        const cleanTitle = (title || 'Campus Event').replace(/,/g, '\\,');
        const cleanDesc = (desc || 'EC & CCAC Campus Event at RVR&JCCE').replace(/,/g, '\\,').replace(/\n/g, '\\n');
        const cleanLoc = (location || 'RVR & JC College of Engineering').replace(/,/g, '\\,');

        const icsData = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//RVRJCCE//EC & CCAC SICO EVENTS//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `SUMMARY:${cleanTitle}`,
            `DESCRIPTION:${cleanDesc}`,
            `LOCATION:${cleanLoc}`,
            `DTSTART:${dtStart}`,
            `DTEND:${dtEnd}`,
            `STATUS:CONFIRMED`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${cleanTitle.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        if (typeof playSynthSound === 'function') playSynthSound('blip');
    };

    // Upgraded Event Details Modal with Event Delegation & Circular PDF Attachment
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-event-details');
        if (!btn) return;
        e.stopPropagation();
        const card = btn.closest('.event-card, .spotlight-card, .event-card-modern');
        if (!card || !eventModal) return;

        const title = card.getAttribute('data-title') || 'Event Details';
        const category = card.getAttribute('data-catname') || card.getAttribute('data-category') || 'Campus Event';
        const date = card.getAttribute('data-date') || 'To be announced';
        const time = card.getAttribute('data-time') || '';
        const venue = card.getAttribute('data-venue') || 'Campus Venue';
        const prize = card.getAttribute('data-prize') || '--';
        const desc = card.getAttribute('data-desc') || (card.querySelector('.event-description, .event-card-snippet') ? card.querySelector('.event-description, .event-card-snippet').textContent : '');
        const highlights = card.getAttribute('data-highlights') || 'Workshops, competitions, and student performances.';
        const rules = card.getAttribute('data-rules') || 'College ID card mandatory for entry.';
        const coordinators = card.getAttribute('data-coordinators') || 'EC & CCAC Student Leads';
        const pdfUrl = card.getAttribute('data-pdfurl');
        const pdfName = card.getAttribute('data-pdfname') || 'Official_Circular.pdf';

        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalDate = document.getElementById('modalDate');
        const modalVenue = document.getElementById('modalVenue');
        const modalPrize = document.getElementById('modalPrize');
        const modalDesc = document.getElementById('modalDesc');
        const modalHighlights = document.getElementById('modalHighlights');
        const modalRules = document.getElementById('modalRules');
        const modalCoordinators = document.getElementById('modalCoordinators');

        if (modalTitle) modalTitle.textContent = title;
        if (modalCategory) modalCategory.textContent = category.toUpperCase();
        if (modalDate) modalDate.textContent = time ? `${date} · ${time}` : date;
        if (modalVenue) modalVenue.textContent = venue;
        if (modalPrize) modalPrize.textContent = prize;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalHighlights) modalHighlights.textContent = highlights;
        if (modalRules) modalRules.textContent = rules;
        if (modalCoordinators) modalCoordinators.textContent = coordinators;

        // Render circular download link inside modal if present
        let modalCircularSection = document.getElementById('modalCircularSection');
        if (!modalCircularSection) {
            const modalBody = eventModal.querySelector('.event-modal-body');
            if (modalBody) {
                modalCircularSection = document.createElement('div');
                modalCircularSection.id = 'modalCircularSection';
                modalCircularSection.className = 'modal-section';
                modalBody.appendChild(modalCircularSection);
            }
        }
        if (modalCircularSection) {
            if (pdfUrl) {
                modalCircularSection.style.display = 'block';
                modalCircularSection.innerHTML = `
                    <h4>Official Circular &amp; Poster Attachment</h4>
                    <div style="background: rgba(14, 165, 233, 0.08); border: 1px solid rgba(14, 165, 233, 0.25); border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 8px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.6rem;">📄</span>
                            <div>
                                <div style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem;">${pdfName}</div>
                                <div style="font-size: 0.75rem; color: var(--text-muted);">Verified Administrative Circular · PDF Document</div>
                            </div>
                        </div>
                        <a href="${pdfUrl}" target="_blank" download="${pdfName}" class="btn-card-circular" style="padding: 8px 16px; font-size: 0.85rem; background: var(--accent-cyan); color: #000; font-weight: 700; text-decoration:none;">
                            <span>📥 Download Circular (PDF)</span>
                        </a>
                    </div>
                `;
            } else {
                modalCircularSection.style.display = 'none';
            }
        }

        // Wire up modal's Add to Calendar button
        const modalCalBtn = document.getElementById('modalAddToCalBtn');
        if (modalCalBtn) {
            modalCalBtn.onclick = () => {
                downloadEventICS(title, desc, venue, date);
            };
        }

        eventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (typeof playSynthSound === 'function') playSynthSound('click');
    });

    // Wire up direct Add to Calendar buttons on spotlight cards
    document.querySelectorAll('.btn-add-cal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.spotlight-card, .event-card');
            if (!card) return;
            const title = card.getAttribute('data-title') || 'Campus Event';
            const desc = card.getAttribute('data-desc') || '';
            const venue = card.getAttribute('data-venue') || 'Campus Venue';
            const date = card.getAttribute('data-date') || '';
            downloadEventICS(title, desc, venue, date);
        });
    });

    function closeEventModal() {
        if (eventModal) {
            eventModal.classList.remove('active');
            document.body.style.overflow = '';
            const modalRegisterBtn = document.getElementById('modalRegisterBtn');
            if (modalRegisterBtn) modalRegisterBtn.style.display = '';
            const modalCalBtn = document.getElementById('modalAddToCalBtn');
            if (modalCalBtn) modalCalBtn.style.display = '';
        }
    }

    // Modal Viewer for Completed Events & Verified Winners Directory
    window.viewCompletedWinnersModal = function(id) {
        const completedList = JSON.parse(localStorage.getItem('sico_completed_events') || '[]');
        const ev = completedList.find(c => c.id === id);
        if (!ev || !eventModal) return;

        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalDate = document.getElementById('modalDate');
        const modalVenue = document.getElementById('modalVenue');
        const modalPrize = document.getElementById('modalPrize');
        const modalDesc = document.getElementById('modalDesc');
        const modalHighlights = document.getElementById('modalHighlights');
        const modalRules = document.getElementById('modalRules');
        const modalCoordinators = document.getElementById('modalCoordinators');
        const modalRegisterBtn = document.getElementById('modalRegisterBtn');
        const modalCalBtn = document.getElementById('modalAddToCalBtn');

        if (modalTitle) modalTitle.textContent = ev.title;
        if (modalCategory) modalCategory.textContent = 'COMPLETED · OFFICIAL MERIT LIST';
        if (modalDate) modalDate.textContent = `Concluded on ${ev.date}`;
        if (modalVenue) modalVenue.textContent = ev.venue || 'Campus Venue';
        if (modalPrize) modalPrize.textContent = ev.prizePool || 'Cash Prizes Awarded';
        if (modalDesc) modalDesc.textContent = ev.summary || 'Official campus competition results and verified awardees.';

        if (modalHighlights) {
            modalHighlights.innerHTML = `
                <div class="winner-table-wrap" style="padding: 4px 0 10px; overflow-x: auto;">
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
                            ${(ev.winners || []).map(w => {
                                let rankBadge = `<span class="rank-badge-3">${w.rank}</span>`;
                                if (w.rank === '1st') rankBadge = `<span class="rank-badge-1">🥇 1st Prize</span>`;
                                else if (w.rank === '2nd') rankBadge = `<span class="rank-badge-2">🥈 2nd Prize</span>`;
                                else if (w.rank === '3rd') rankBadge = `<span class="rank-badge-3">🥉 3rd Prize</span>`;
                                else if (w.rank === 'Special') rankBadge = `<span class="rank-badge-3">🎖️ Special</span>`;

                                return `
                                    <tr>
                                        <td>${rankBadge}</td>
                                        <td><strong style="color:var(--text-primary); font-weight:700;">${w.name}</strong></td>
                                        <td><span class="winner-regd-pill">${w.regd}</span></td>
                                        <td><span style="font-weight:600; font-size:0.8rem; color:var(--text-secondary);">${w.branch || '--'}</span></td>
                                        <td><span class="winner-cash-text">${w.prize}</span></td>
                                        <td style="font-size:0.82rem; color:var(--text-muted);">${w.project || 'Merit Presentation'}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        if (modalRules) {
            modalRules.innerHTML = 'All cash awards, certificates, and merit standings have been verified and disbursed under the aegis of the EC & CCAC Committee and Convener.';
        }

        if (modalCoordinators) {
            modalCoordinators.textContent = `${ev.club} Student Coordinators`;
        }

        let modalCircularSection = document.getElementById('modalCircularSection');
        if (!modalCircularSection) {
            const modalBody = eventModal.querySelector('.event-modal-body');
            if (modalBody) {
                modalCircularSection = document.createElement('div');
                modalCircularSection.id = 'modalCircularSection';
                modalCircularSection.className = 'modal-section';
                modalBody.appendChild(modalCircularSection);
            }
        }
        if (modalCircularSection) {
            if (ev.pdfUrl) {
                modalCircularSection.style.display = 'block';
                modalCircularSection.innerHTML = `
                    <h4>Official Signed Result Sheet &amp; Circular PDF</h4>
                    <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 8px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.6rem;">📄</span>
                            <div>
                                <div style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem;">${ev.pdfName || 'Results_Circular.pdf'}</div>
                                <div style="font-size: 0.75rem; color: var(--text-muted);">Official Administrative Result Circular · PDF Document</div>
                            </div>
                        </div>
                        <a href="${ev.pdfUrl}" target="_blank" download="${ev.pdfName || 'results.pdf'}" class="btn-card-circular" style="padding: 8px 16px; font-size: 0.85rem; background: #10b981; color: #fff; font-weight: 700; text-decoration:none; border-radius:8px;">
                            <span>📥 Download Result Sheet (PDF)</span>
                        </a>
                    </div>
                `;
            } else {
                modalCircularSection.style.display = 'none';
            }
        }

        if (modalRegisterBtn) modalRegisterBtn.style.display = 'none';
        if (modalCalBtn) modalCalBtn.style.display = 'none';

        eventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (typeof playSynthSound === 'function') playSynthSound('click');
    };

    if (eventModalClose) eventModalClose.addEventListener('click', closeEventModal);
    if (eventModal) {
        eventModal.addEventListener('click', (e) => {
            if (e.target === eventModal) closeEventModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && eventModal && eventModal.classList.contains('active')) {
            closeEventModal();
        }
    });

    // -------------------------------------------------------------
    // 8. FAQ ACCORDION
    // -------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherBtn = otherItem.querySelector('.faq-question');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current item
                item.classList.toggle('active', !isActive);
                questionBtn.setAttribute('aria-expanded', String(!isActive));
            });
        }
    });

    // -------------------------------------------------------------
    // 9. GALLERY CATEGORY FILTER TABS
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
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 10. ENHANCED GALLERY LIGHTBOX WITH NEXT / PREV & KEYBOARD
    // -------------------------------------------------------------
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

        if (lightboxImage && img) {
            lightboxImage.innerHTML = `<img src="${img.src}" alt="${caption}">`;
        }
        if (lightboxCaption) lightboxCaption.textContent = caption;
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${visibleGalleryItems.length}`;
        }
    }

    // Event delegation on #galleryGrid for both static and dynamically added gallery photos
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

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            updateLightboxImage(currentGalleryIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            updateLightboxImage(currentGalleryIndex + 1);
        });
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') updateLightboxImage(currentGalleryIndex - 1);
        if (e.key === 'ArrowRight') updateLightboxImage(currentGalleryIndex + 1);
    });

    // -------------------------------------------------------------
    // 11. FLOATING BACK TO TOP BUTTON WITH SCROLL PROGRESS RING
    // -------------------------------------------------------------
    const backToTopBtn = document.getElementById('backToTop');
    const progressCircle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 21; // ~131.95

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
            if (scrollTop > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------
    // 12. 3D SUBTLE TILT EFFECT ON CARDS
    // -------------------------------------------------------------
    if (window.matchMedia('(pointer: fine)').matches) {
        const tiltCards = document.querySelectorAll('.event-card, .feature-card, .stat-item, .report-preview-card, .pillar-step');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // -------------------------------------------------------------
    // 13. QUICK CONTACT FORM HANDLING
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span>`;
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Sent Successfully! ✓</span>`;
                    submitBtn.style.background = 'linear-gradient(135deg, #00d084, #00f2fe)';
                }
                contactForm.reset();

                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                    }
                }, 3500);
            }, 1000);
        });
    }

    // -------------------------------------------------------------
    // 14. INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // -------------------------------------------------------------
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.event-card, .feature-card, .report-preview-card, .stat-item, .gallery-item, .pillar-step, .faq-item, .portal-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        fadeObserver.observe(el);
    });

    // -------------------------------------------------------------
    // 15. PROCEDURAL WEB AUDIO SYNTHESIZER (ZERO-DEPENDENCY)
    // -------------------------------------------------------------
    let audioCtx = null;
    let audioEnabled = localStorage.getItem('ec_hud_audio') === 'true';

    function initAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Harmonic Pentatonic Scale for UI Audio (F major pentatonic / D minor: F4, G4, A4, C5, D5, F5, G5, A5)
    const pentatonicNotes = [349.23, 392.00, 440.00, 523.25, 587.33, 698.46, 783.99, 880.00];
    let noteIndex = 0;

    function playSynthSound(type) {
        if (!audioEnabled || !audioCtx) return;
        try {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const now = audioCtx.currentTime;

            // Master soft lowpass filter to create warm organic feel
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(3400, now);
            filter.connect(audioCtx.destination);

            if (type === 'blip') {
                // Crystal bell chime (dual oscillator harmonic pair)
                const freq = pentatonicNotes[noteIndex % pentatonicNotes.length];
                noteIndex = (noteIndex + 1) % pentatonicNotes.length;

                const osc1 = audioCtx.createOscillator();
                const osc2 = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(freq, now);

                // Overtone harmonic 2.01x higher with gentle decay
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(freq * 2.01, now);

                osc1.connect(gain);
                osc2.connect(gain);
                gain.connect(filter);

                gain.gain.setValueAtTime(0.045, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + 0.14);
                osc2.stop(now + 0.14);

            } else if (type === 'click') {
                // Warm acoustic tactile click
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(90, now + 0.05);

                gain.gain.setValueAtTime(0.075, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

                osc.connect(gain);
                gain.connect(filter);

                osc.start(now);
                osc.stop(now + 0.05);

            } else if (type === 'teleport') {
                // Celestial Ascending Arpeggio (magical portal warp)
                const chord = [349.23, 440.00, 523.25, 698.46, 880.00];
                chord.forEach((note, idx) => {
                    const noteTime = now + idx * 0.038;
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(note, noteTime);

                    gain.gain.setValueAtTime(0.04, noteTime);
                    gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.22);

                    osc.connect(gain);
                    gain.connect(filter);

                    osc.start(noteTime);
                    osc.stop(noteTime + 0.22);
                });
            }
        } catch (e) {
            // Silently ignore audio context restrictions
        }
    }

    const audioToggleBtn = document.getElementById('hudAudioToggle');
    function updateAudioUI() {
        if (!audioToggleBtn) return;
        const textSpan = audioToggleBtn.querySelector('.hud-audio-text');
        if (audioEnabled) {
            audioToggleBtn.classList.add('active');
            if (textSpan) textSpan.textContent = 'AUDIO: ON';
        } else {
            audioToggleBtn.classList.remove('active');
            if (textSpan) textSpan.textContent = 'AUDIO: OFF';
        }
    }
    updateAudioUI();

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            initAudio();
            audioEnabled = !audioEnabled;
            localStorage.setItem('ec_hud_audio', audioEnabled);
            updateAudioUI();
            if (audioEnabled) playSynthSound('click');
        });
    }

    // -------------------------------------------------------------
    // 16. HEADINGS & TYPOGRAPHY READABILITY (CLEAN & STABLE)
    // -------------------------------------------------------------
    // Text decoding scramblers removed in favor of crisp, human-crafted editorial typography

    // -------------------------------------------------------------
    // 17. TACTILE CARD INTERACTION & ELEVATION
    // -------------------------------------------------------------
    if (window.matchMedia('(pointer: fine)').matches) {
        const tiltCards = document.querySelectorAll('.portal-card, .tilt-card, .stat-card, .feature-card, .event-card, .team-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotX = ((y - centerY) / centerY) * -4.5;
                const rotY = ((x - centerX) / centerX) * 4.5;

                if (!card.classList.contains('team-card') && !card.classList.contains('team-card-3rd')) {
                    card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // -------------------------------------------------------------
    // 18. FUTURISTIC COMMAND PALETTE & CYBER TERMINAL (Ctrl + K)
    // -------------------------------------------------------------
    const cmdOverlay = document.getElementById('cmdPaletteOverlay');
    const cmdInput = document.getElementById('cmdInput');
    const cmdResults = document.getElementById('cmdResults');
    const cmdTriggerBtn = document.getElementById('hudCmdTrigger');

    const cmdDestinations = [
        // Pages
        { title: 'Home / Campus Life Hub', sub: 'Interactive highlights, stats & overview', url: 'index.html', icon: '🏛️', category: 'Pages' },
        { title: 'About EC & CCAC', sub: 'Our mission, vision, leadership & history', url: 'about.html', icon: '📜', category: 'Pages' },
        { title: 'Flagship Events & Fests', sub: 'Cultural fests, dance, and music calendar', url: 'events.html', icon: '🎭', category: 'Pages' },
        { title: 'SICO Community Outreach', sub: 'Student initiatives & social impact programs', url: 'sico.html', icon: '🤝', category: 'Pages' },
        { title: 'Reports & Archives', sub: 'Annual documentation & retrospective PDFs', url: 'reports.html', icon: '📊', category: 'Pages' },
        { title: 'Student Coordinators', sub: 'Core leadership directory & committee leads', url: 'team.html', icon: '👥', category: 'Pages' },
        { title: 'Champions & Winners Hall of Fame', sub: 'Verified merit lists, student regd numbers & cash prizes', url: 'events.html#winnersHallOfFame', icon: '🏆', category: 'Pages' },
        { title: 'Visual Stories & Gallery', sub: 'Curated photo memories from campus celebrations', url: 'gallery.html', icon: '📸', category: 'Pages' },
        { title: 'Contact & FAQ Hub', sub: 'Campus address, student helpline & FAQs', url: 'contact.html', icon: '💬', category: 'Pages' },
        
        // Flagship Events
        { title: 'COLORIDO 2026', sub: 'Flagship Cultural & Arts Extravaganza (28–29 Dec 2026)', url: 'events.html', icon: '🎪', category: 'Events' },
        { title: 'Club Waltz (Mega Dance Gala)', sub: 'Two-day mega dance extravaganza & choreo battle (05–06 Oct 2026)', url: 'events.html', icon: '💃', category: 'Events' },
        { title: 'Western, Rap & Band Showdown', sub: 'Music Club live acoustic and band face-off', url: 'events.html', icon: '🎸', category: 'Events' },
        { title: 'Website Dev & Anime Video', sub: 'Digital Club technical & creative multimedia duel', url: 'events.html', icon: '💻', category: 'Events' },
        { title: 'Helping Hands Service Drive', sub: 'Volunteer outreach at blind schools & senior homes', url: 'events.html', icon: '🤝', category: 'Events' },
        { title: 'Graphic Design & Video Editing', sub: 'Pixel Craft visual storytelling & motion contest', url: 'events.html', icon: '🎨', category: 'Events' },
        { title: 'Rangoli & Kite Flying Contest', sub: 'Red Ants cultural Sankranti celebration', url: 'events.html', icon: '🪁', category: 'Events' },
        { title: 'Campus Photography Contest', sub: 'Visual lens contest for candid campus moments', url: 'events.html', icon: '📷', category: 'Events' },
        { title: '42nd Annual Day Celebrations', sub: 'Grand convocation finale & rolling trophies', url: 'events.html', icon: '🎖️', category: 'Events' },

        // Student Clubs
        { title: 'Dance Club', sub: 'Performing arts, classical, hip-hop & western choreo', url: 'events.html', icon: '💃', category: 'Clubs' },
        { title: 'Music Club', sub: 'Vocalists, live acoustic bands & sound engineering', url: 'events.html', icon: '🎵', category: 'Clubs' },
        { title: 'Digital Club', sub: 'Web development, coding challenges & anime production', url: 'events.html', icon: '⚡', category: 'Clubs' },
        { title: 'Pixel Craft Club', sub: 'Graphic design, digital art & cinematic video editing', url: 'events.html', icon: '🖌️', category: 'Clubs' },
        { title: 'Helping Hands Club', sub: 'Social service, community welfare & outreach drives', url: 'sico.html', icon: '🤲', category: 'Clubs' },
        { title: 'Photography Club', sub: 'DSLR, mobile lens photography & photojournalism', url: 'gallery.html', icon: '📸', category: 'Clubs' },
        { title: 'Red Ants Cultural Club', sub: 'Heritage, folk traditions & festive celebrations', url: 'events.html', icon: '🪔', category: 'Clubs' },

        // Coordinator Admin Studio
        { title: 'Coordinator Admin Studio (Protected)', sub: 'Update events, circular PDFs, posters, reports & gallery', url: 'admin.html', icon: '🔒', category: 'Admin' },

        // Quick Actions
        { title: 'Register for SICO 2026–27', sub: 'Official Google Form registration', url: 'https://docs.google.com/forms/d/e/1FAIpQLScUBqRMzhequ2W4xq_7PvW-Q0wlDcyWUhtyPTxr5v0KCWprlA/viewform?usp=sharing&ouid=102886629071385519420', icon: '✍️', category: 'Actions', external: true },
        { title: 'View Full Academic Calendar', sub: 'Complete schedule of all 24 annual events', url: 'events.html#calendar', icon: '📅', category: 'Actions' },

        // Aesthetic Themes (Dark & Light)
        { title: 'Switch to Dark Mode', sub: 'Deep midnight obsidian with warm amber accents', action: () => applyTheme('dark'), icon: '🌙', category: 'Theme' },
        { title: 'Switch to Light Mode', sub: 'Editorial daylight porcelain with warm amber accents', action: () => applyTheme('light'), icon: '☀️', category: 'Theme' }
    ];

    let activeCmdIndex = 0;
    let filteredCmds = [...cmdDestinations];

    function renderCmdResults() {
        if (!cmdResults) return;
        cmdResults.innerHTML = '';
        if (filteredCmds.length === 0) {
            cmdResults.innerHTML = `<div style="padding: 28px; text-align: center; color: var(--text-muted); font-size: 0.95rem;">No matching campus results found. Try searching &ldquo;Colorido&rdquo;, &ldquo;Dance&rdquo;, &ldquo;Team&rdquo; or &ldquo;Register&rdquo;.</div>`;
            return;
        }

        filteredCmds.forEach((item, idx) => {
            const a = document.createElement('a');
            a.className = `cmd-item ${idx === activeCmdIndex ? 'active' : ''}`;
            a.href = item.url || '#';
            if (item.external) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
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
            a.addEventListener('mouseenter', () => {
                activeCmdIndex = idx;
                updateActiveCmdItem();
                playSynthSound('blip');
            });
            a.addEventListener('click', (e) => {
                if (item.action) {
                    e.preventDefault();
                    item.action();
                    closeCmdPalette();
                } else {
                    playSynthSound('teleport');
                    closeCmdPalette();
                }
            });
            cmdResults.appendChild(a);
        });
    }

    function updateActiveCmdItem() {
        const items = cmdResults.querySelectorAll('.cmd-item');
        items.forEach((item, idx) => {
            if (idx === activeCmdIndex) {
                item.classList.add('active');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }

    function openCmdPalette() {
        if (!cmdOverlay) return;
        cmdOverlay.classList.add('active');
        if (cmdInput) {
            cmdInput.value = '';
            cmdInput.focus();
        }
        filteredCmds = [...cmdDestinations];
        activeCmdIndex = 0;
        renderCmdResults();
        playSynthSound('teleport');
    }

    function closeCmdPalette() {
        if (!cmdOverlay) return;
        cmdOverlay.classList.remove('active');
    }

    if (cmdTriggerBtn) {
        cmdTriggerBtn.addEventListener('click', openCmdPalette);
    }

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdOverlay && cmdOverlay.classList.contains('active')) {
                closeCmdPalette();
            } else {
                openCmdPalette();
            }
        } else if (e.key === 'Escape' && cmdOverlay && cmdOverlay.classList.contains('active')) {
            closeCmdPalette();
        }
    });

    if (cmdOverlay) {
        cmdOverlay.addEventListener('click', (e) => {
            if (e.target === cmdOverlay) closeCmdPalette();
        });
    }

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
                playSynthSound('blip');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeCmdIndex = (activeCmdIndex - 1 + filteredCmds.length) % filteredCmds.length;
                updateActiveCmdItem();
                playSynthSound('blip');
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCmds[activeCmdIndex]) {
                    const target = filteredCmds[activeCmdIndex];
                    if (target.action) {
                        target.action();
                    } else if (target.external) {
                        playSynthSound('teleport');
                        window.open(target.url, '_blank');
                    } else {
                        playSynthSound('teleport');
                        window.location.href = target.url;
                    }
                    closeCmdPalette();
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 19. TACTILE MECHANICAL THEME ROLLER & EDITORIAL MANAGER
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

        // Update all theme rollers across the DOM
        const themeRollers = document.querySelectorAll('.theme-roller-btn, #themeRoller');
        themeRollers.forEach(roller => {
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

        // Backward compatibility for legacy labels and dropdowns
        const themeLabel = document.getElementById('hudThemeLabel');
        if (themeLabel) {
            themeLabel.textContent = isLight ? 'EDITORIAL LIGHT' : 'VELVET MIDNIGHT';
        }
        const legacyOpts = document.querySelectorAll('.hud-theme-opt');
        legacyOpts.forEach(opt => {
            const optTheme = opt.getAttribute('data-set-theme');
            if ((isLight && (optTheme === 'champagne' || optTheme === 'light')) || (!isLight && (optTheme === 'obsidian' || optTheme === 'dark'))) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    // Expose setTheme globally for backward compatibility
    window.setTheme = applyTheme;

    // Initialize stored theme
    const storedTheme = localStorage.getItem('sico_theme') || localStorage.getItem('sico_editorial_theme') || localStorage.getItem('sico_cyber_theme') || 'dark';
    applyTheme(storedTheme);

    // Bind interactive events for all theme rollers
    const themeRollers = document.querySelectorAll('.theme-roller-btn, #themeRoller');
    themeRollers.forEach(roller => {
        roller.addEventListener('click', (e) => {
            const clickedOpt = e.target.closest('.roller-opt');
            if (clickedOpt) {
                const targetTheme = clickedOpt.getAttribute('data-theme-val') || 'dark';
                applyTheme(targetTheme);
            } else {
                const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light' ||
                                         document.documentElement.getAttribute('data-theme') === 'champagne';
                applyTheme(isCurrentlyLight ? 'dark' : 'light');
            }
        });

        roller.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light' ||
                                         document.documentElement.getAttribute('data-theme') === 'champagne';
                applyTheme(isCurrentlyLight ? 'dark' : 'light');
            }
        });
    });

    // Legacy dropdown handler fallback if present on any auxiliary page
    const themeTrigger = document.getElementById('hudThemeTrigger');
    const themeDropdown = document.getElementById('hudThemeDropdown');
    if (themeTrigger && themeDropdown) {
        themeTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!themeTrigger.contains(e.target) && !themeDropdown.contains(e.target)) {
                themeDropdown.classList.remove('active');
            }
        });
    }

    const legacyThemeOpts = document.querySelectorAll('.hud-theme-opt');
    legacyThemeOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            const targetTheme = opt.getAttribute('data-set-theme');
            applyTheme(targetTheme);
            if (themeDropdown) {
                themeDropdown.classList.remove('active');
            }
        });
    });

    // -------------------------------------------------------------
    // 20. LIVE COLORIDO 2026 FESTIVAL PASS COUNTDOWN (1-SECOND PRECISION)
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

            if (now < festStart) {
                diff = festStart - now;
            } else if (now <= festEnd) {
                diff = festEnd - now;
                if (cdTitle) cdTitle.textContent = 'COLORIDO 2026 · FESTIVAL LIVE NOW · FINALE IN:';
                if (cdStatus) cdStatus.innerHTML = '<span style="color:#e11d48;font-weight:700;">● LIVE NOW · COLORIDO 2026 UNDERWAY ON CAMPUS</span>';
            } else {
                diff = 0;
                if (cdTitle) cdTitle.textContent = 'COLORIDO 2026 · FESTIVAL CONCLUDED';
                if (cdStatus) cdStatus.innerHTML = '<span>COLORIDO 2026 CONCLUDED · THANK YOU TO ALL 1,000+ PARTICIPANTS</span>';
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
    // 21. AY 2026-2027 OFFICIAL CALENDAR & UPCOMING RADAR CONTROLLER
    // -------------------------------------------------------------
    const calSearchInput = document.getElementById('calendarSearchInput');
    const calStatusFilters = document.querySelectorAll('#calStatusFilters .cal-filter-btn');
    const calTableRows = document.querySelectorAll('#calendarTable tbody tr');
    const nextEventCountdownEl = document.getElementById('nextEventCountdown');

    let currentCalFilter = 'all';
    let currentSearchTerm = '';

    function filterCalendarRows() {
        if (!calTableRows.length) return;
        calTableRows.forEach(row => {
            const rowStatus = row.getAttribute('data-status');
            const rowText = row.textContent.toLowerCase();
            const matchesStatus = (currentCalFilter === 'all') || (rowStatus === currentCalFilter);
            const matchesSearch = !currentSearchTerm || rowText.includes(currentSearchTerm);

            if (matchesStatus && matchesSearch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
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
                playSynthSound('blip');
            });
        });
    }

    // Dynamic Countdown for Next Upcoming Event (30 Sep 2026, 1:00 PM IST)
    if (nextEventCountdownEl) {
        const nextTarget = new Date('2026-09-30T13:00:00+05:30').getTime();
        function updateNextEventClock() {
            const now = Date.now();
            const diff = nextTarget - now;
            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                nextEventCountdownEl.textContent = `${days}D ${hours}H REMAINING`;
            } else {
                nextEventCountdownEl.textContent = 'EVENT IN PROGRESS';
            }
        }
        updateNextEventClock();
        setInterval(updateNextEventClock, 60000);
    }

    // -------------------------------------------------------------
    // 22. UPCOMING EVENTS & COMPETITIONS SHOWCASE CONTROLLER
    // -------------------------------------------------------------
    const eventsFilterPills = document.querySelectorAll('#eventsFilterBar .filter-pill, #spotlightFilterPills .spotlight-pill');
    const eventCardsModern = document.querySelectorAll('.event-card-modern, .spotlight-card');
    const spotlightDigitalCountdown = document.getElementById('spotlightDigitalCountdown');
    const spotlightDigitalCountdownEvents = document.getElementById('spotlightDigitalCountdownEvents');

    // 1. Live Countdown for Digital Club Event (30 Sep 2026, 1:00 PM IST)
    const digitalEventTime = new Date('2026-09-30T13:00:00+05:30').getTime();
    function tickDigitalCountdown() {
        const now = Date.now();
        const diff = digitalEventTime - now;
        if (diff > 0) {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const badgeStr = `⚡ In ${d} Days (${h}h left)`;
            
            if (spotlightDigitalCountdown) spotlightDigitalCountdown.textContent = badgeStr;
            if (spotlightDigitalCountdownEvents) spotlightDigitalCountdownEvents.textContent = badgeStr;
        } else {
            if (spotlightDigitalCountdown) spotlightDigitalCountdown.textContent = '⚡ Event Live Now';
            if (spotlightDigitalCountdownEvents) spotlightDigitalCountdownEvents.textContent = '⚡ Event Live Now';
        }
    }
    tickDigitalCountdown();
    setInterval(tickDigitalCountdown, 1000);

    // 2. Simple, High-Visibility Filter Tabs
    if (eventsFilterPills.length && eventCardsModern.length) {
        eventsFilterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                eventsFilterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const filter = pill.getAttribute('data-filter');

                eventCardsModern.forEach(card => {
                    const cardType = card.getAttribute('data-type') || '';
                    if (filter === 'all' || cardType.includes(filter)) {
                        card.classList.remove('hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(12px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                });

                if (typeof playSynthSound === 'function') playSynthSound('blip');
            });
        });
    }

    // =============================================================
    // SECTION 23: 3rd Year Student Coordinators Filtering & Live Search
    // =============================================================
    const thirdYearFilterBtns = document.querySelectorAll('#thirdYearFilters .team-filter-btn');
    const thirdYearCards = document.querySelectorAll('#thirdYearGrid .team-card-3rd');
    const teamSearchInput = document.getElementById('teamSearchInput');
    const teamResultsCount = document.getElementById('teamResultsCount');

    if (thirdYearCards.length) {
        let activeCategory = 'all';
        let searchQuery = '';

        function updateTeamDisplay() {
            let visibleCount = 0;
            const query = searchQuery.trim().toLowerCase();

            thirdYearCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                const name = (card.getAttribute('data-name') || '').toLowerCase();
                const role = (card.getAttribute('data-role') || '').toLowerCase();
                const branch = (card.getAttribute('data-branch') || '').toLowerCase();

                const matchesCategory = (activeCategory === 'all' || category === activeCategory);
                const matchesSearch = !query || name.includes(query) || role.includes(query) || branch.includes(query);

                if (matchesCategory && matchesSearch) {
                    card.classList.remove('hidden-member');
                    visibleCount++;
                } else {
                    card.classList.add('hidden-member');
                }
            });

            if (teamResultsCount) {
                teamResultsCount.textContent = `Showing ${visibleCount} of ${thirdYearCards.length} student coordinators`;
            }
        }

        thirdYearFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                thirdYearFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-filter') || 'all';
                updateTeamDisplay();
                if (typeof playSynthSound === 'function') playSynthSound('click');
            });
        });

        if (teamSearchInput) {
            teamSearchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                updateTeamDisplay();
            });
        }
    }

    // =============================================================
    // 27. UNIVERSAL LIVE DATA SYNCHRONIZATION (ADMIN GOOGLE FORM -> WEBSITE)
    // =============================================================
    function syncLiveAdminData() {
        // A. Synchronize Custom Events into #eventsGridModern (index.html & events.html)
        try {
            const customEvents = JSON.parse(localStorage.getItem('sico_custom_events') || '[]');
            const eventsGrid = document.getElementById('eventsGridModern');
            const calendarTable = document.getElementById('calendarTable');

            if (eventsGrid && customEvents.length > 0) {
                // Remove previous dynamic cards to avoid duplicates on re-render
                eventsGrid.querySelectorAll('.dynamic-admin-card').forEach(el => el.remove());

                // Prepend cards so newest events appear first
                [...customEvents].reverse().forEach(ev => {
                    const card = document.createElement('div');
                    card.className = 'event-card-modern dynamic-admin-card card-imminent';
                    card.setAttribute('data-category', ev.category || 'tech');
                    card.setAttribute('data-type', 'imminent prizes dynamic');
                    card.setAttribute('data-title', ev.title || 'Campus Event');
                    card.setAttribute('data-catname', ev.catname || ev.club || 'Student Activity');
                    card.setAttribute('data-date', ev.date || 'TBA');
                    card.setAttribute('data-time', ev.time || '');
                    card.setAttribute('data-venue', ev.venue || 'Campus Venue');
                    card.setAttribute('data-prize', ev.prize || '--');
                    card.setAttribute('data-desc', ev.desc || ev.snippet || 'Join the event organized by EC & CCAC.');
                    card.setAttribute('data-highlights', ev.highlights || 'Organized by EC & CCAC, Certificates, Campus Credits');
                    card.setAttribute('data-rules', ev.rules || 'College ID card mandatory for entry.');
                    card.setAttribute('data-coordinators', ev.coordinators || 'Student Leads');
                    if (ev.pdfUrl) card.setAttribute('data-pdfurl', ev.pdfUrl);
                    if (ev.pdfName) card.setAttribute('data-pdfname', ev.pdfName);

                    let posterMarkup = '';
                    if (ev.posterUrl) {
                        posterMarkup = `
                            <div class="event-card-poster-thumb">
                                <img src="${ev.posterUrl}" alt="${ev.title}" loading="lazy">
                            </div>
                        `;
                    }

                    let circularBtn = '';
                    if (ev.pdfUrl) {
                        circularBtn = `
                            <a href="${ev.pdfUrl}" target="_blank" download="${ev.pdfName || 'circular.pdf'}" class="btn-card-circular" title="Download Official Circular PDF">
                                <span>📄 Circular (PDF)</span>
                            </a>
                        `;
                    }

                    card.innerHTML = `
                        ${posterMarkup}
                        <div class="event-card-header">
                            <div class="event-date-pill">
                                <span>📅</span>
                                <span>${ev.date}</span>
                            </div>
                            <span class="event-status-pill status-live-sync">✨ LIVE UPDATE</span>
                        </div>
                        <div class="event-card-main">
                            <h3 class="event-card-title">${ev.title}</h3>
                            <div class="event-club-badge">
                                <span class="club-dot" style="background:var(--accent-amber)"></span>
                                <span>${ev.club} · ${ev.catname || 'Official'}</span>
                            </div>
                        </div>
                        <p class="event-card-snippet">${ev.snippet || (ev.desc ? ev.desc.slice(0, 120) + '...' : 'Student club competition and cultural activity.')}</p>
                        <div class="event-details-box">
                            <div class="detail-row">
                                <span class="detail-label">📍 Venue:</span>
                                <strong class="detail-value">${ev.venue || 'Campus Venue'}</strong>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">⏰ Time:</span>
                                <strong class="detail-value">${ev.time || '10:00 AM IST'}</strong>
                            </div>
                            ${ev.prize ? `
                            <div class="detail-row detail-prize-row">
                                <span class="detail-label">🏆 Cash Prizes:</span>
                                <strong class="detail-value prize-highlight">${ev.prize}</strong>
                            </div>` : ''}
                        </div>
                        <div class="event-card-footer">
                            <button class="btn-event-details btn-card-primary" type="button">
                                <span>View Details &amp; Rules</span>
                                <i>→</i>
                            </button>
                            ${circularBtn}
                            <a href="${ev.regLink || 'https://docs.google.com/forms/d/e/1FAIpQLScUBqRMzhequ2W4xq_7PvW-Q0wlDcyWUhtyPTxr5v0KCWprlA/viewform?usp=sharing'}"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="btn-card-register">
                                <span>Register</span>
                                <i>↗</i>
                            </a>
                        </div>
                    `;

                    eventsGrid.prepend(card);
                });
            }

            // Sync into Calendar Table on events.html if present
            if (calendarTable && customEvents.length > 0) {
                const tbody = calendarTable.querySelector('tbody');
                if (tbody) {
                    tbody.querySelectorAll('.dynamic-admin-row').forEach(el => el.remove());
                    [...customEvents].reverse().forEach(ev => {
                        const tr = document.createElement('tr');
                        tr.className = 'dynamic-admin-row';
                        tr.setAttribute('data-status', 'upcoming');
                        tr.setAttribute('data-club', ev.club);
                        tr.innerHTML = `
                            <td class="cal-sno-col">✨</td>
                            <td class="cal-date-cell"><span class="cal-date-day">${ev.date}</span></td>
                            <td>
                                <div class="cal-club-name">${ev.club}</div>
                                <span class="cal-club-badge" style="background:rgba(245,158,11,0.2); color:var(--accent-amber)">Live Update</span>
                            </td>
                            <td>
                                <div class="cal-event-desc">
                                    <strong>${ev.title}</strong> - ${ev.snippet || (ev.desc ? ev.desc.slice(0, 80) : '')}
                                    ${ev.pdfUrl ? `<br><a href="${ev.pdfUrl}" target="_blank" download="${ev.pdfName || 'circular.pdf'}" style="font-size:0.8rem; color:var(--accent-cyan); font-weight:600;">📥 Download Circular (PDF)</a>` : ''}
                                </div>
                            </td>
                            <td class="cal-venue-time">
                                <span>📍 ${ev.venue || 'Campus'}</span>
                                <span>⏰ ${ev.time || 'TBA'}</span>
                            </td>
                            <td class="cal-prize-cell">${ev.prize || '--'}</td>
                            <td><span class="status-tag imminent" style="background:#10b981; color:#fff;">⚡ Live Entry</span></td>
                        `;
                        tbody.prepend(tr);
                    });
                }
            }
        } catch (err) {
            console.error('Error syncing dynamic events:', err);
        }

        // B. Synchronize Custom Reports into reports.html
        try {
            const customReports = JSON.parse(localStorage.getItem('sico_custom_reports') || '[]');
            const reportsGrid = document.querySelector('.reports-preview-grid');
            if (reportsGrid && customReports.length > 0) {
                let dynamicCard = document.getElementById('dynamicReportsCard');
                if (!dynamicCard) {
                    dynamicCard = document.createElement('div');
                    dynamicCard.id = 'dynamicReportsCard';
                    dynamicCard.className = 'report-preview-card dynamic-reports-highlight';
                    dynamicCard.style.border = '1px solid var(--accent-amber)';
                    dynamicCard.style.boxShadow = '0 8px 30px rgba(245, 158, 11, 0.15)';
                    reportsGrid.prepend(dynamicCard);
                }
                dynamicCard.innerHTML = `
                    <div class="report-preview-icon">✨</div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
                        <h3 style="margin:0;">Live Published Reports &amp; Circulars</h3>
                        <span class="status-badge" style="background:var(--accent-amber); color:#000; font-size:0.7rem; font-weight:700; padding:2px 8px; border-radius:99px;">COORDINATOR UPLOADS</span>
                    </div>
                    <p>Official records, retrospectives, and circular documentation recently uploaded via the SICO Coordinator Studio.</p>
                    <div class="report-links-list" style="margin-top:14px;">
                        ${customReports.map(rep => `
                            <div class="dynamic-report-item" style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px dashed rgba(255,255,255,0.1); gap:12px; flex-wrap:wrap;">
                                <div style="flex:1; min-width:200px;">
                                    <a href="${rep.pdfUrl}" target="_blank" download="${rep.pdfName || 'report.pdf'}" class="report-download-link" style="margin:0; font-weight:600; color:var(--text-primary);">
                                        📄 ${rep.title} (${rep.academicYear || 'AY 2026–2027'}) [PDF] ↗
                                    </a>
                                    <div style="font-size:0.8rem; color:var(--text-muted); margin-top:3px;">${rep.summary || ''}</div>
                                </div>
                                <a href="${rep.pdfUrl}" target="_blank" download="${rep.pdfName || 'report.pdf'}" class="btn-card-circular" style="font-size:0.75rem; padding:6px 12px; white-space:nowrap;">
                                    <span>📥 Download PDF</span>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        } catch (err) {
            console.error('Error syncing dynamic reports:', err);
        }

        // C. Synchronize Custom Gallery Photos into gallery.html
        try {
            const customGallery = JSON.parse(localStorage.getItem('sico_custom_gallery') || '[]');
            const galleryGrid = document.getElementById('galleryGrid');
            if (galleryGrid && customGallery.length > 0) {
                galleryGrid.querySelectorAll('.dynamic-gallery-item').forEach(el => el.remove());
                [...customGallery].reverse().forEach(item => {
                    const gItem = document.createElement('div');
                    gItem.className = 'gallery-item dynamic-gallery-item';
                    gItem.setAttribute('data-category', item.category || 'cultural');
                    gItem.setAttribute('data-caption', item.caption || item.title);
                    gItem.innerHTML = `
                        <div class="gallery-image">
                            <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
                        </div>
                        <div class="gallery-overlay">
                            <span class="gallery-caption">${item.caption || item.title}</span>
                            <span style="position:absolute; top:12px; right:12px; font-size:0.68rem; background:rgba(245,158,11,0.92); color:#000; padding:2px 8px; border-radius:99px; font-weight:700;">✨ NEW</span>
                        </div>
                    `;
                    galleryGrid.prepend(gItem);
                });
            }
        } catch (err) {
            console.error('Error syncing dynamic gallery:', err);
        }

        // D. Synchronize Completed Events & Winners List into events.html
        try {
            // Seed default completed events if empty
            if (!localStorage.getItem('sico_completed_events')) {
                const defaultCompleted = [
                    {
                        id: 'comp_seed_1',
                        title: 'Clean Energy Poster Presentation',
                        club: 'Renewable Energy Club',
                        date: '01st August 2026',
                        venue: 'SJB Seminar Hall',
                        prizePool: '₹6,000 Cash Prizes Awarded',
                        summary: 'Over 45 teams presented innovative solar microgrids, biomass gasifiers, and renewable charging stations. Judged by senior electrical engineering faculty.',
                        pdfUrl: '',
                        pdfName: 'Clean_Energy_Poster_Winners.pdf',
                        winners: [
                            { rank: '1st', name: 'K. Vamsi Krishna', regd: 'Y23EE042', branch: 'EEE', prize: '₹3,000 Cash', project: 'Hybrid Solar-Wind Microgrid' },
                            { rank: '2nd', name: 'P. Sneha Reddy', regd: 'Y23ME018', branch: 'MECH', prize: '₹2,000 Cash', project: 'Biomass Campus Generator' },
                            { rank: '3rd', name: 'T. Rahul', regd: 'Y24CS105', branch: 'CSE', prize: '₹1,000 Cash', project: 'AI Solar Tracking Panel' }
                        ]
                    },
                    {
                        id: 'comp_seed_2',
                        title: 'Youth Leadership & Oratory Conclave',
                        club: 'Club Inspiraze',
                        date: '25th July 2026',
                        venue: 'Open Air Theatre (OAT)',
                        prizePool: '₹4,000 Cash & Trophies',
                        summary: 'Annual campus oratorical conclave on ethics in technology and social impact. Evaluated by humanities department and alumni guests.',
                        pdfUrl: '',
                        pdfName: 'Inspiraze_Oratory_Results.pdf',
                        winners: [
                            { rank: '1st', name: 'G. Ananya', regd: 'Y23CS089', branch: 'CSE', prize: '₹2,500 Cash & Trophy', project: 'Vision 2030 Leadership' },
                            { rank: '2nd', name: 'Ch. Karthik', regd: 'Y23IT012', branch: 'IT', prize: '₹1,500 Cash & Trophy', project: 'Ethics in Automation' }
                        ]
                    },
                    {
                        id: 'comp_seed_3',
                        title: 'International Yoga Day Asana Championship',
                        club: 'Wellness & Sports Club',
                        date: '21st June 2026',
                        venue: 'Open Air Theatre (OAT)',
                        prizePool: '₹2,500 Cash & Medals',
                        summary: 'Campus-wide yoga competition celebrating International Yoga Day with over 300 student and faculty participants.',
                        pdfUrl: '',
                        pdfName: 'Yoga_Day_Official_Results.pdf',
                        winners: [
                            { rank: '1st', name: 'M. Divya', regd: 'Y23IT033', branch: 'IT', prize: '₹1,500 Cash & Gold Medal', project: 'Advanced Hatha Asanas' },
                            { rank: '2nd', name: 'B. Sai Kumar', regd: 'Y24EC064', branch: 'ECE', prize: '₹1,000 Cash & Silver Medal', project: 'Surya Namaskar Endurance' }
                        ]
                    }
                ];
                localStorage.setItem('sico_completed_events', JSON.stringify(defaultCompleted));
            }

            const completedEvents = JSON.parse(localStorage.getItem('sico_completed_events') || '[]');
            const winnersGrid = document.getElementById('winnersHallGrid');

            if (winnersGrid) {
                if (completedEvents.length === 0) {
                    winnersGrid.innerHTML = `
                        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px dashed var(--border-card);">
                            <p style="color: var(--text-muted); font-size: 1rem; margin: 0;">No completed events published yet. Visit the <a href="admin.html" style="color: var(--accent-amber); font-weight: 700;">Coordinator Studio</a> to publish event merit lists and winners.</p>
                        </div>
                    `;
                } else {
                    winnersGrid.innerHTML = completedEvents.map(comp => {
                        const totalCash = comp.prizePool || 'Cash Prizes Awarded';
                        let downloadPdfBtn = '';
                        if (comp.pdfUrl) {
                            downloadPdfBtn = `
                                <a href="${comp.pdfUrl}" target="_blank" download="${comp.pdfName || 'winners_circular.pdf'}" class="btn-card-circular" title="Download Official Circular PDF" style="font-size:0.75rem; padding:5px 12px; text-decoration:none;">
                                    <span>📥 Result Sheet (PDF)</span>
                                </a>
                            `;
                        }

                        return `
                            <div class="winner-event-card">
                                <div class="winner-card-header">
                                    <div>
                                        <span class="winner-club-badge">${comp.club || 'Campus Club'}</span>
                                        <h3 class="winner-event-title">${comp.title}</h3>
                                        <div class="winner-event-meta">
                                            <span>📅 Concluded: ${comp.date}</span>
                                            <span>📍 ${comp.venue || 'Campus Venue'}</span>
                                        </div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                                        <div class="winner-prize-pool">
                                            <span>💰 ${totalCash}</span>
                                        </div>
                                        ${downloadPdfBtn}
                                    </div>
                                </div>

                                ${comp.summary ? `<p style="padding: 0 1.5rem 0.5rem; font-size: 0.88rem; color: var(--text-secondary); margin: 0;">${comp.summary}</p>` : ''}

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
                                                if (w.rank === '1st') rankBadge = `<span class="rank-badge-1">🥇 1st Prize</span>`;
                                                else if (w.rank === '2nd') rankBadge = `<span class="rank-badge-2">🥈 2nd Prize</span>`;
                                                else if (w.rank === '3rd') rankBadge = `<span class="rank-badge-3">🥉 3rd Prize</span>`;
                                                else if (w.rank === 'Special') rankBadge = `<span class="rank-badge-3">🎖️ Special</span>`;

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
                            </div>
                        `;
                    }).join('');
                }
            }

            // Connect completed calendar table rows to view merit winners
            const calTable = document.getElementById('calendarTable');
            if (calTable && completedEvents.length > 0) {
                const completedRows = calTable.querySelectorAll('tr[data-status="completed"]');
                completedRows.forEach(row => {
                    if (row.querySelector('.btn-cal-winners')) return;
                    const clubNameEl = row.querySelector('.cal-club-name');
                    const clubName = clubNameEl ? clubNameEl.textContent.trim().toLowerCase() : '';
                    
                    // Match with completed events
                    const matchedComp = completedEvents.find(c => 
                        (c.club && clubName.includes(c.club.toLowerCase())) ||
                        (c.title && row.textContent.toLowerCase().includes(c.title.toLowerCase().slice(0, 15)))
                    );

                    const actionCell = row.querySelector('td:last-child');
                    if (actionCell) {
                        const winnerBtn = document.createElement('a');
                        winnerBtn.className = 'btn-cal-winners';
                        winnerBtn.href = '#winnersHallOfFame';
                        winnerBtn.style.marginTop = '6px';
                        winnerBtn.style.textDecoration = 'none';
                        winnerBtn.innerHTML = '🏆 Merit List';
                        if (matchedComp) {
                            winnerBtn.addEventListener('click', (e) => {
                                if (window.viewCompletedWinnersModal) {
                                    e.preventDefault();
                                    window.viewCompletedWinnersModal(matchedComp.id);
                                }
                            });
                        }
                        actionCell.appendChild(winnerBtn);
                    }
                });
            }

        } catch (err) {
            console.error('Error syncing dynamic completed events & winners:', err);
        }
    }

    // Call live admin synchronization immediately
    syncLiveAdminData();

    // Global Admin Shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
            e.preventDefault();
            window.location.href = 'admin.html';
        }
    });

});


