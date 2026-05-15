document.addEventListener("DOMContentLoaded", function () {

    // =============================================
    // 1. ACTIVE NAV BASED ON SCROLL POSITION
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
    // 2. ACTIVE NAV (INTERSECTION OBSERVER)
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
    // 3. SCROLL ANIMATION (Intersection Observer)
    // =============================================
    const animatedElements = document.querySelectorAll('.hidden-animate');

    const animationObserver = new IntersectionObserver(
        (entries, animationObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-animate');
                    animationObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

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
    // 5. PROGRESS BAR
    // =============================================
    function updateProgressBar() {
    // 1. Ambil daftar materi menggunakan class '.nav-list' (sesuai kodingan kanan)
    const allSteps = document.querySelectorAll('.nav-parts li');
    
    // 2. Cari urutan materi yang sedang aktif
    const activeStep = Array.from(allSteps).findIndex(li => li.classList.contains('active')) + 1;
    const totalSteps = allSteps.length;

    // Jika daftar tidak ditemukan, jangan jalankan sisanya
    if (totalSteps === 0) return;

    // 3. Hitung persentase
    const percentage = (activeStep / totalSteps) * 100;

    // 4. Update Teks "X/X selesai"
    const textElement = document.getElementById('progress-text');
    if (textElement) {
        textElement.innerText = `${activeStep}/${totalSteps} selesai`;
    }

    // 5. Update Lebar Bar Hijau
    const fillElement = document.getElementById('progress-fill');
    if (fillElement) {
        fillElement.style.width = percentage + "%";
    }
}

// Jalankan saat halaman dimuat
document.addEventListener("DOMContentLoaded", updateProgressBar);

});