// Menunggu seluruh halaman dimuat (agar elemen sudah ada di HTML)
document.addEventListener("DOMContentLoaded", function() {

    // 1. Ambil SEMUA elemen yang punya class .hidden-animate
    const animatedElements = document.querySelectorAll('.hidden-animate');

    // 2. Buat "Mata-mata" (Intersection Observer)
    const observer = new IntersectionObserver(
        (entries, observer) => {
            // entries adalah daftar elemen yang sedang diawasi
            entries.forEach(entry => {
                // entry.isIntersecting artinya: Apakah elemen ini sudah masuk ke area layar?
                if (entry.isIntersecting) {
                    // Jika YA, tambahkan class .show-animate agar CSS animasinya berjalan
                    entry.target.classList.add('show-animate');
                    
                    // Stop mengawasi elemen ini agar animasinya tidak jalan berulang-ulang kalau di-scroll naik turun
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            // Pengaturan ambang batas (threshold): 0.15 artinya animasi akan berjalan jika 15% dari elemen tersebut sudah terlihat di layar.
            threshold: 0.15 
        }
    );

    // 3. Perintahkan "Mata-mata" untuk mengawasi setiap elemen yang sudah diambil di poin 1
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});