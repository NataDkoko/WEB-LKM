document.addEventListener("DOMContentLoaded", function () {

    // =============================================
    // 1. ACTIVE NAV BASED ON SCROLL POSITION (code 1 - nav-parts)
    // =============================================
    const sections = document.querySelectorAll(".materi-section");
    const navItems = document.querySelectorAll(".nav-parts li");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });
        navItems.forEach((li) => {
            li.classList.remove("active");
            if (li.querySelector("a").getAttribute("href") === `#${current}`) {
                li.classList.add("active");
            }
        });

        updateProgressBar();
    });

    // =============================================
    // 2. ACTIVE NAV (INTERSECTION OBSERVER - code 2 - nav-item)
    // =============================================
    const contentCards = document.querySelectorAll('.content-card[id]');
    const navItemsAlt = document.querySelectorAll('.nav-item');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItemsAlt.forEach(item => {
                    const link = item.querySelector('a');
                    item.classList.toggle('active', link && link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.4 });

    contentCards.forEach(s => navObserver.observe(s));

    // =============================================
    // 3. SCROLL ANIMATION
    // =============================================
    const animatedElements = document.querySelectorAll('.hidden-animate');

    const animationObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-animate');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    animatedElements.forEach(el => animationObserver.observe(el));

    // =============================================
    // 4. SLIDER FOTO GRUP
    // =============================================
    const sliderImages = document.querySelectorAll('.slider-img');
    let currentImageIndex = 0;

    if (sliderImages.length > 0) {
        setInterval(() => {
            sliderImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
            sliderImages[currentImageIndex].classList.add('active');
        }, 3500);
    }

    // =============================================
    // 5. PROGRESS BAR - code 1 (nav-parts + window scroll)
    // =============================================
    function updateProgressBar() {
        const allSteps = document.querySelectorAll('.nav-parts li');
        const activeStep = Array.from(allSteps).findIndex(li => li.classList.contains('active')) + 1;
        const totalSteps = allSteps.length;

        if (totalSteps === 0) return;

        const percentage = (activeStep / totalSteps) * 100;

        const textElement = document.getElementById('progress-text');
        if (textElement) {
            textElement.innerText = `${activeStep}/${totalSteps} selesai`;
        }

        const fillElement = document.getElementById('progress-fill');
        if (fillElement) {
            fillElement.style.width = percentage + "%";
        }
    }

    updateProgressBar();

    // =============================================
    // 6. PROGRESS BAR - code 2 (nav-item + .main scroll)
    // =============================================
    const mainEl = document.querySelector('.main');

    if (mainEl) {
        // Hitung otomatis jumlah bagian dari nav
        const totalParts = document.querySelectorAll('.nav-list .nav-item').length;

        mainEl.addEventListener('scroll', () => {
            const scrollTop = mainEl.scrollTop;
            const scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

            const fillElement = document.querySelector('.progress-fill');
            if (fillElement) fillElement.style.width = progress + '%';

            const completed = Math.max(1, Math.ceil((progress / 100) * totalParts));
            const textElement = document.querySelector('.progress-header strong');
            if (textElement) {
                textElement.textContent = Math.min(completed, totalParts) + '/' + totalParts + ' selesai';
            }
        });
    }

});