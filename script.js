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
    });

    // =============================================
    // 2. SCROLL ANIMATION (Intersection Observer)
    // =============================================
    const animatedElements = document.querySelectorAll('.hidden-animate');

    const observer = new IntersectionObserver(
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

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // =============================================
    // 3. SLIDER FOTO GRUP
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

});