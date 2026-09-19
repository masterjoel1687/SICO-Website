// ============================================
// EC & CCAC - SICO ULTIMATE UI & UX SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. HERO CANVAS PARTICLE NETWORK
    // -------------------------------------------------------------
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;
        let particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 65;
        const maxDist = 110;
        let heroMouse = { x: null, y: null, radius: 140 };

        const colors = ['rgba(0, 242, 254, ', 'rgba(119, 104, 229, ', 'rgba(252, 100, 65, '];

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.6 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse deflection
                if (heroMouse.x !== null) {
                    const dx = heroMouse.x - this.x;
                    const dy = heroMouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < heroMouse.radius) {
                        const force = (heroMouse.radius - dist) / heroMouse.radius;
                        this.x -= (dx / dist) * force * 3;
                        this.y -= (dy / dist) * force * 3;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color}${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const opacity = (1 - dist / maxDist) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(119, 104, 229, ${opacity})`;
                        ctx.lineWidth = 0.9;
                        ctx.stroke();
                    }
                }
                particles[i].update();
                particles[i].draw();
            }
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
    // 7. EVENT DETAILS MODAL
    // -------------------------------------------------------------
    const eventModal = document.getElementById('eventModal');
    const eventModalClose = document.getElementById('eventModalClose');

    document.querySelectorAll('.btn-event-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.event-card');
            if (!card || !eventModal) return;

            document.getElementById('modalTitle').textContent = card.getAttribute('data-title') || 'Event Details';
            document.getElementById('modalCategory').textContent = (card.getAttribute('data-category') || 'Campus Event').toUpperCase();
            document.getElementById('modalDate').textContent = card.getAttribute('data-date') || 'To be announced';
            document.getElementById('modalVenue').textContent = card.getAttribute('data-venue') || 'Campus Venue';
            document.getElementById('modalDesc').textContent = card.querySelector('.event-description') ? card.querySelector('.event-description').textContent : '';
            document.getElementById('modalHighlights').textContent = card.getAttribute('data-highlights') || '';
            document.getElementById('modalRules').textContent = card.getAttribute('data-rules') || 'College ID card mandatory.';
            document.getElementById('modalCoordinators').textContent = card.getAttribute('data-coordinators') || 'EC & CCAC Committee';

            eventModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeEventModal() {
        if (eventModal) {
            eventModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

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
    const galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
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

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            visibleGalleryItems = Array.from(document.querySelectorAll('#galleryGrid .gallery-item:not(.hidden)'));
            const idx = visibleGalleryItems.indexOf(item);
            updateLightboxImage(idx >= 0 ? idx : 0);
            if (lightbox) {
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

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

    document.querySelectorAll('.event-card, .feature-card, .report-preview-card, .stat-item, .gallery-item, .pillar-step, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        fadeObserver.observe(el);
    });

});
