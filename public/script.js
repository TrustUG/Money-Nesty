// Wait until the page has loaded everything
document.addEventListener("DOMContentLoaded", () => {
  // Handle cards-wallper (only one expected)
  const cardsWallper = document.querySelector(".cards-wallper");
  if (cardsWallper) {
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
  }

  // Handle all chips-wallper elements
  const chipsWallpers = document.querySelectorAll(".chips-wallper");
  chipsWallpers.forEach((el) => {
    el.addEventListener(
      "wheel",
      (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      },
      { passive: false }
    );
  });
});

// Handle all wallper elements
const nextWallper = document.querySelector(".next-wallper");
nextWallper.addEventListener(
  "wheel",
  (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      nextWallper.scrollLeft += e.deltaY; // scroll horizontally
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

// Select all matching h1 elements
const nextheadings = document.querySelectorAll(
  "main article .next .next-wallper .next-box .discrip h1"
);

nextheadings.forEach((nextheading) => {
  const words = nextheading.innerText.split(" ");
  if (words.length > 8) {
    nextheading.innerText = words.slice(0, 8).join(" ") + "...";
  }
});

// Truncate p elements to 10 words
document
  .querySelectorAll("main article .next .next-wallper .next-box .discrip p")
  .forEach((el) => {
    const words = el.innerText.split(" ");
    if (words.length > 10) {
      el.innerText = words.slice(0, 10).join(" ") + "...";
    }
  });

// more hight
window.addEventListener("load", () => {
  const article = document.querySelector("main article");
  const wallper = document.querySelector(".maore-articles-wallper");

  if (article && wallper) {
    const articleHeight = article.offsetHeight;
    wallper.style.height = articleHeight + "px";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Wait until the page has loaded everything
  document.addEventListener("DOMContentLoaded", () => {
    // Handle cards-wallper (only one expected)
    const cardsWallper = document.querySelector(".cards-wallper");
    if (cardsWallper) {
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
    }

    // Handle all chips-wallper elements
    const chipsWallpers = document.querySelectorAll(".chips-wallper");
    chipsWallpers.forEach((el) => {
      el.addEventListener(
        "wheel",
        (e) => {
          if (e.deltaY !== 0) {
            e.preventDefault();
            el.scrollLeft += e.deltaY;
          }
        },
        { passive: false }
      );
    });
  });

  // Handle all wallper elements
  const nextWallper = document.querySelector(".next-wallper");
  nextWallper.addEventListener(
    "wheel",
    (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        nextWallper.scrollLeft += e.deltaY; // scroll horizontally
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

  // Select all matching h1 elements
  const nextheadings = document.querySelectorAll(
    "main article .next .next-wallper .next-box .discrip h1"
  );

  nextheadings.forEach((nextheading) => {
    const words = nextheading.innerText.split(" ");
    if (words.length > 8) {
      nextheading.innerText = words.slice(0, 8).join(" ") + "...";
    }
  });

  // Truncate p elements to 10 words
  document
    .querySelectorAll("main article .next .next-wallper .next-box .discrip p")
    .forEach((el) => {
      const words = el.innerText.split(" ");
      if (words.length > 10) {
        el.innerText = words.slice(0, 10).join(" ") + "...";
      }
    });

  // more hight
  document.addEventListener("DOMContentLoaded", () => {
    const article = document.querySelector("main article");
    const wallper = document.querySelector(".maore-articles-wallper");

    function updateWallperHeight() {
      if (article && wallper) {
        wallper.style.height = article.offsetHeight + "px";
      }
    }

    // Initial height
    updateWallperHeight();

    // Update on resize of window
    window.addEventListener("resize", updateWallperHeight);

    // Update if the article's size changes (like font size, layout)
    const resizeObserver = new ResizeObserver(updateWallperHeight);
    resizeObserver.observe(article);
  });
});
