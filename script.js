// Combine header fade, carousel, parallax and reveal-on-scroll in a lightweight, original implementation
document.addEventListener('DOMContentLoaded', () => {
  // Header fade-in
  const header = document.querySelector('header');
  if (header) {
    header.style.opacity = 0;
    header.style.transition = 'opacity 1.2s ease';
    requestAnimationFrame(() => { header.style.opacity = 1; });
  }

  // Simple carousel (keeps original behavior)
  const track = document.querySelector('.carousel-track');
  if (track) {
    const items = Array.from(track.children);
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    const updateCarousel = () => {
      if (!items.length) return;
      const itemWidth = items[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    prevButton && prevButton.addEventListener('click', () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      updateCarousel();
    });

    nextButton && nextButton.addEventListener('click', () => {
      currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }

  // Parallax implementation (original, efficient): uses rAF and precomputed positions
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax-speed]'));
  const recalcPositions = () => {
    parallaxEls.forEach(el => {
      const r = el.getBoundingClientRect();
      el._baseTop = r.top + window.scrollY;
      if (el._current === undefined) el._current = 0;
    });
  };

  recalcPositions();
  window.addEventListener('resize', recalcPositions);

  let scrollY = window.scrollY;
  let ticking = false;
  const lerp = (a, b, t) => a + (b - a) * t;

  const runParallax = () => {
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallaxSpeed) || 0;
      if (!speed) return;
      const target = (scrollY - (el._baseTop || 0)) * speed;
      el._current = lerp(el._current || 0, target, 0.08);
      el.style.transform = `translate3d(0, ${el._current.toFixed(2)}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(runParallax);
    }
  }, { passive: true });

  // Reveal-on-scroll using IntersectionObserver
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
        else entry.target.classList.remove('visible');
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    // Fallback: make all visible
    reveals.forEach(el => el.classList.add('visible'));
  }
});