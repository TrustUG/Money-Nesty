$(document).ready(function () {
  // ===== BLOG COUNT =====
  var count = $("main article a").length;
  $(".filter h2 span").text(count);

  // ===== THEME TOGGLE =====
  function updateThemeUI() {
    const isLight = $("body").hasClass("light-theme");
    $("#sun").toggle(!isLight);
    $("#moon").toggle(isLight);
    $(".light-logo").toggle(isLight);
    $(".dark-logo").toggle(!isLight);
  }

  const savedTheme = localStorage.getItem("theme");
  $("body").toggleClass("light-theme", savedTheme === "light");
  updateThemeUI();

  $("#theme").on("click", function () {
    $("body").toggleClass("light-theme");
    const isNowLight = $("body").hasClass("light-theme");
    localStorage.setItem("theme", isNowLight ? "light" : "dark");
    updateThemeUI();
  });

  // ===== SEARCH INPUT =====
  function toggleSearchExtras($input, $placeholder, $icon) {
    if ($input.is(":focus") || $input.val().length > 0) {
      $placeholder.fadeOut(200);
      $icon.fadeOut(200);
    } else {
      $placeholder.fadeIn(200);
      $icon.fadeIn(200);
    }
  }

  const $inputDesk = $("#searchInput"),
    $placeholderDesk = $(".header-cont header .search .placeholder-text"),
    $iconDesk = $(".header-cont header .search .icon svg"),
    $inputMob = $("#searchInputMob"),
    $placeholderMob = $("#search-bar-mob .placeholder-text"),
    $iconMob = $("#search-bar-mob .icon svg");

  [$inputDesk, $inputMob].forEach(($input, i) => {
    const $placeholder = i === 0 ? $placeholderDesk : $placeholderMob;
    const $icon = i === 0 ? $iconDesk : $iconMob;

    toggleSearchExtras($input, $placeholder, $icon);

    $input.on("focus input blur", () =>
      toggleSearchExtras($input, $placeholder, $icon)
    );
    $input.on("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        $input.val("").blur();
        toggleSearchExtras($input, $placeholder, $icon);
      }
    });
  });

  // ===== SCROLL BEHAVIOR =====
  let lastScrollTop = 0;
  $(window).on("scroll", function () {
    if (window.matchMedia("(max-width: 626px)").matches) {
      const st = $(this).scrollTop();
      const $header = $(".header-cont"),
        $searchBar = $(".header-cont #search-bar-mob");
      if (st > lastScrollTop) {
        $searchBar.fadeOut(200);
        $header.css("height", "6.3rem");
      } else {
        $searchBar.fadeIn(200);
        $header.css("height", "10.5rem");
      }
      lastScrollTop = st;
    }
  });

  // ===== BLOG CARD ICONS =====
  $(".blog-card .actions svg").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass("active");
  });

  // ===== LIKES & FAVORITES SYNC FUNCTION =====
  function initLikesAndFavorites(containerSelector) {
    $(containerSelector)
      .find(".blog-card")
      .each(function (index) {
        const $card = $(this),
          $favPath = $card.find(".favorites-icon path"),
          $likePath = $card.find(".like-icon path"),
          favKey = "favorite-" + index,
          likeKey = "like-" + index;

        // Restore saved state
        $favPath.css({
          fill: localStorage.getItem(favKey) === "true" ? "#ffcc23" : "none",
          strokeWidth: localStorage.getItem(favKey) === "true" ? 0 : "0.04rem",
        });
        $likePath.css({
          fill: localStorage.getItem(likeKey) === "true" ? "#b80000ff" : "none",
          strokeWidth: localStorage.getItem(likeKey) === "true" ? 0 : "0.04rem",
        });

        // Favorites click
        $card
          .find(".favorites-icon")
          .off("click")
          .on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            const isActive = $favPath.css("fill") !== "none";
            $favPath.css({
              fill: isActive ? "none" : "#ffcc23",
              strokeWidth: isActive ? "0.04rem" : 0,
            });
            localStorage.setItem(favKey, !isActive);
          });

        // Likes click
        $card
          .find(".like-icon")
          .off("click")
          .on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            const isActive = $likePath.css("fill") !== "none";
            $likePath.css({
              fill: isActive ? "none" : "#b80000ff",
              strokeWidth: isActive ? "0.04rem" : 0,
            });
            localStorage.setItem(likeKey, !isActive);
          });
      });
  }

  // Initialize likes/favorites on main page
  initLikesAndFavorites("main");

  // Initialize likes/favorites on dynamically loaded blog content
  $(".maore-articles-wallper").load("../index.html main > *", function () {
    initLikesAndFavorites(".maore-articles-wallper");
  });

  // ===== CHIPS FILTER =====
  $(".chip").each(function () {
    const label = $(this).find(".text").text().toLowerCase().trim();
    $(this).attr("data-filter", label);
  });

  $(".chip").on("click", function () {
    const selected = $(this).data("filter");
    $(".chip").removeClass("active");
    $(this).addClass("active");

    $(".blog-card").each(function (index) {
      const tag = $(this).find(".tag").text().toLowerCase().trim(),
        isLiked = localStorage.getItem("like-" + index) === "true",
        isFavorite = localStorage.getItem("favorite-" + index) === "true";

      if (
        selected === "all" ||
        (selected === "liked" && isLiked) ||
        (selected === "favorites" && isFavorite) ||
        tag === selected
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // ===== TEXT TRUNCATE =====
  $("main article a h1").each(function () {
    const words = $(this).text().trim().split(/\s+/);
    if (words.length > 8) $(this).text(words.slice(0, 8).join(" ") + "...");
  });

  $("main article a p").each(function () {
    const words = $(this).text().trim().split(/\s+/);
    if (words.length > 10) $(this).text(words.slice(0, 10).join(" ") + "...");
  });

  // ===== POPUP =====
  function showPopup() {
    $(".overlay").fadeIn(200);
    $(".popup").css("display", "flex").hide().fadeIn(200);
  }

  function closePopup() {
    $(".overlay").fadeOut(200);
    $(".popup").fadeOut(200, function () {
      $(this).css("display", "none");
    });
  }

  $(".filter .btn").on("click", function (e) {
    e.preventDefault();
    showPopup();
  });

  $("#close-popup").on("click", function () {
    closePopup();
  });
});
