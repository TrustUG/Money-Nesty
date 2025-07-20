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

// Select all matching h1 elements
const headings = document.querySelectorAll("main article a h1");

headings.forEach((heading) => {
  const words = heading.innerText.split(" ");
  if (words.length > 8) {
    heading.innerText = words.slice(0, 8).join(" ") + "...";
  }
});

// Truncate p elements to 10 words
document.querySelectorAll("main article a p").forEach((el) => {
  const words = el.innerText.split(" ");
  if (words.length > 10) {
    el.innerText = words.slice(0, 10).join(" ") + "...";
  }
});
