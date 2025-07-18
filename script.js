const cardsWallper = document.querySelector(".cards-wallper");

cardsWallper.addEventListener(
  "wheel",
  (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      cardsWallper.scrollLeft += e.deltaY;
    }
  },
  { passive: false }
);
