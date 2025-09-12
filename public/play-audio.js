$(document).ready(function () {
  // ===== Chips click redirect =====
  $(".chips-wallper .chip").on("click", function () {
    window.location.href = "../index.html"; // keep ../
  });

  // ===== Scroll effect =====
  let lastScrollTop = 0;
  $(window).on("scroll", function () {
    let currentScroll = $(this).scrollTop();
    if (currentScroll > lastScrollTop) {
      $(".chips-wallper").addClass("scrolled"); // scrolling down
    } else {
      $(".chips-wallper").removeClass("scrolled"); // scrolling up
    }
    lastScrollTop = currentScroll;
  });

  // ===== Load content from index.html =====
  $(".maore-articles-wallper").load("../index.html main > *", function () {
    // Truncate h1
    $(".maore-articles-wallper h1").each(function () {
      const words = $(this).text().trim().split(/\s+/);
      if (words.length > 8) $(this).text(words.slice(0, 8).join(" ") + "...");
    });

    // Truncate p
    $(".maore-articles-wallper p").each(function () {
      const words = $(this).text().trim().split(/\s+/);
      if (words.length > 10) $(this).text(words.slice(0, 10).join(" ") + "...");
    });

    // Truncate "next" articles
    $(".maore-articles-wallper .next .next-box .discrip h1").each(function () {
      const words = $(this).text().trim().split(/\s+/);
      if (words.length > 8) $(this).text(words.slice(0, 8).join(" ") + "...");
    });

    // Add verification icons
    const verifiedPublishers = ["Ethan Carter", "Olivia Harper"];

    $(".maore-articles-wallper .name").each(function () {
      const $this = $(this);
      const name = $this.text().trim();
      if (verifiedPublishers.includes(name)) {
        if (!$this.parent().hasClass("name-container")) {
          $this.wrap('<div class="name-container"></div>');
          $this
            .parent()
            .append(
              '<img src="../images/logos/verified.png" class="verified-icon" alt="Verified">'
            );
        }
      }
    });
  });

  // ===== Audio Logic =====
  const pageKey = window.location.pathname.replace(/\W/g, "_");
  localStorage.removeItem(`audio-time-${pageKey}`); // reset audio on load

  let audio = null;
  const $playBtn = $(".image .blog-actions .play-audio");
  const audioSrc = $playBtn.data("audio");
  const storageTimeKey = `audio-time-${pageKey}`;

  if (audioSrc) {
    audio = new Audio(audioSrc);

    function showPlay() {
      $playBtn.find(".play").show();
      $playBtn.find(".pause").hide();
      $playBtn.removeClass("playing");
    }
    function showPause() {
      $playBtn.find(".play").hide();
      $playBtn.find(".pause").show();
      $playBtn.addClass("playing");
    }

    audio.onended = () => {
      showPlay();
      localStorage.removeItem(storageTimeKey);
    };

    audio.ontimeupdate = () => {
      localStorage.setItem(storageTimeKey, audio.currentTime);
    };

    showPlay();

    $playBtn.on("click", function () {
      if (audio.paused) {
        audio.play();
        showPause();
      } else {
        audio.pause();
        showPlay();
      }
    });
  }

  // ===== Favorites and Likes =====
  const $favoritesIcon = $(".image .blog-actions .favorites-icon");
  const $favoritesPath = $favoritesIcon.find("path");
  const favStorageKey = `favorite-${pageKey}`;

  const $likeIcon = $(".image .blog-actions .like-icon");
  const $likePath = $likeIcon.find("path");
  const likeStorageKey = `like-${pageKey}`;

  if (localStorage.getItem(favStorageKey) === "true") {
    $favoritesPath.css({ fill: "#ffcc23", strokeWidth: 0 });
  } else {
    $favoritesPath.css({ fill: "none", strokeWidth: "0.6" });
  }

  if (localStorage.getItem(likeStorageKey) === "true") {
    $likePath.css({ fill: "#b80000", strokeWidth: 0 });
  } else {
    $likePath.css({ fill: "none", strokeWidth: "0.6" });
  }

  $favoritesIcon.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const isActive =
      $favoritesPath.css("fill") !== "none" &&
      $favoritesPath.css("fill") !== "";

    if (isActive) {
      $favoritesPath.css({ fill: "none", strokeWidth: "0.6" });
      localStorage.setItem(favStorageKey, "false");
    } else {
      $favoritesPath.css({ fill: "#ffcc23", strokeWidth: 0 });
      localStorage.setItem(favStorageKey, "true");
    }
  });

  $likeIcon.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const isActive =
      $likePath.css("fill") !== "none" && $likePath.css("fill") !== "";

    if (isActive) {
      $likePath.css({ fill: "none", strokeWidth: "0.6" });
      localStorage.setItem(likeStorageKey, "false");
    } else {
      $likePath.css({ fill: "#b80000", strokeWidth: 0 });
      localStorage.setItem(likeStorageKey, "true");
    }
  });
});
