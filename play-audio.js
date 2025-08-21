$(document).ready(function () {
  $(".maore-articles-wallper").load("../index.html main > *", function () {
    // This runs AFTER the content is loaded

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

    // Next articles
    $(".maore-articles-wallper .next .next-box .discrip h1").each(function () {
      const words = $(this).text().trim().split(/\s+/);
      if (words.length > 8) $(this).text(words.slice(0, 8).join(" ") + "...");
    });
  });

  const pageKey = window.location.pathname.replace(/\W/g, "_");

  // Clear saved audio time on page load so audio always starts fresh
  localStorage.removeItem(`audio-time-${pageKey}`);

  // ===== Audio Play/Pause Logic =====
  let audio = null;
  const $playBtn = $(".image .blog-actions .play-audio");
  const audioSrc = $playBtn.data("audio");
  const storageTimeKey = `audio-time-${pageKey}`;

  if (audioSrc) {
    audio = new Audio(audioSrc);

    // No resume time because cleared on page load

    // Update icons based on playing state
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

    // On audio end
    audio.onended = () => {
      showPlay();
      localStorage.removeItem(storageTimeKey);
    };

    // Save current time periodically
    audio.ontimeupdate = () => {
      localStorage.setItem(storageTimeKey, audio.currentTime);
    };

    // Initialize icons
    showPlay();

    // Play/pause toggle button click
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

  // ===== Favorites and Likes Logic =====
  const $favoritesIcon = $(".image .blog-actions .favorites-icon");
  const $favoritesPath = $favoritesIcon.find("path");
  const favStorageKey = `favorite-${pageKey}`;

  const $likeIcon = $(".image .blog-actions .like-icon");
  const $likePath = $likeIcon.find("path");
  const likeStorageKey = `like-${pageKey}`;

  // Load saved favorite state
  if (localStorage.getItem(favStorageKey) === "true") {
    $favoritesPath.css({ fill: "#ffcc23", strokeWidth: 0 });
  } else {
    $favoritesPath.css({ fill: "none", strokeWidth: "0.6" });
  }

  // Load saved like state
  if (localStorage.getItem(likeStorageKey) === "true") {
    $likePath.css({ fill: "#b80000", strokeWidth: 0 });
  } else {
    $likePath.css({ fill: "none", strokeWidth: "0.6" });
  }

  // Toggle favorite
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

  // Toggle like
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
