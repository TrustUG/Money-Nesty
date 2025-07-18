const cardsWallper = document.querySelector(".cards-wallper");
const chipsWallper = document.querySelector(".chips-wallper");

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

chipsWallper.addEventListener(
  "wheel",
  (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      chipsWallper.scrollLeft += e.deltaY;
    }
  },
  { passive: false }
);
