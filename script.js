// Aggiunta di un'animazione al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    header.style.opacity = 0;
    header.style.transition = "opacity 1.5s ease-in-out";
    setTimeout(() => {
      header.style.opacity = 1;
    }, 50);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const items = Array.from(track.children);
    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");
  
    let currentIndex = 0;
  
    const updateCarousel = () => {
      const itemWidth = items[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };
  
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
      updateCarousel();
    });
  
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });
  
    // Set initial position
    updateCarousel();
  });