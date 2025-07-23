$(document).ready(function () {
  function updateThemeUI() {
    const isLight = $("body").hasClass("light-theme");

    if (isLight) {
      $("#sun").hide();
      $("#moon").show();
      $(".light-logo").show();
      $(".dark-logo").hide();
    } else {
      $("#moon").hide();
      $("#sun").show();
      $(".light-logo").hide();
      $(".dark-logo").show();
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    $("body").addClass("light-theme");
  } else {
    $("body").removeClass("light-theme");
  }

  updateThemeUI();

  // On click toggle
  $("#theme").on("click", function () {
    $("body").toggleClass("light-theme");

    const isNowLight = $("body").hasClass("light-theme");
    localStorage.setItem("theme", isNowLight ? "light" : "dark");

    updateThemeUI();
  });

  // hide search desk & mobile
  const $inputDesk = $("#searchInput");
  const $placeholderDesk = $(".header-cont header .search .placeholder-text");
  const $iconDesk = $(".header-cont header .search .icon svg");

  const $inputMob = $("#searchInputMob");
  const $placeholderMob = $("#search-bar-mob .placeholder-text");
  const $iconMob = $("#search-bar-mob .icon svg");

  function toggleSearchExtras($input, $placeholder, $icon) {
    if ($input.is(":focus") || $input.val().length > 0) {
      $placeholder.stop(true, true).fadeOut(200);
      $icon.stop(true, true).fadeOut(200);
    } else {
      $placeholder.stop(true, true).fadeIn(200);
      $icon.stop(true, true).fadeIn(200);
    }
  }

  // Initial check for both inputs
  toggleSearchExtras($inputDesk, $placeholderDesk, $iconDesk);
  toggleSearchExtras($inputMob, $placeholderMob, $iconMob);

  // Toggle extras on focus/input/blur for desktop
  $inputDesk.on("focus input blur", function () {
    toggleSearchExtras($inputDesk, $placeholderDesk, $iconDesk);
  });

  // Toggle extras on focus/input/blur for mobile
  $inputMob.on("focus input blur", function () {
    toggleSearchExtras($inputMob, $placeholderMob, $iconMob);
  });

  // Clear input and blur on Enter for desktop
  $inputDesk.on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // stop form from submitting
      $inputDesk.val(""); // clear input
      $inputDesk.blur(); // remove focus
      toggleSearchExtras($inputDesk, $placeholderDesk, $iconDesk);
    }
  });

  // Clear input and blur on Enter for mobile
  $inputMob.on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // stop form from submitting
      $inputMob.val(""); // clear input
      $inputMob.blur(); // remove focus
      toggleSearchExtras($inputMob, $placeholderMob, $iconMob);
    }
  });

  // scroll search
  let lastScrollTop = 0;

  $(window).on("scroll", function () {
    // Only run on screens <= 462px
    if (window.matchMedia("(max-width: 626px)").matches) {
      const st = $(this).scrollTop();
      const $header = $(".header-cont");
      const $searchBar = $(".header-cont #search-bar-mob");

      if (st > lastScrollTop) {
        // Scrolling down
        $searchBar.fadeOut(200);
        $header.css("height", "6.3rem");
      } else {
        // Scrolling up
        $searchBar.fadeIn(200);
        $header.css("height", "10.5rem");
      }

      lastScrollTop = st;
    }
  });

  // prevent click on blog-card action icons
  $(".blog-card .actions svg").on("click", function (e) {
    e.preventDefault(); // Stops link jump
    e.stopPropagation(); // Stops bubbling to <a>

    // Do something (like toggle)
    $(this).toggleClass("active");
  });
});

// chips
$(document).ready(function () {
  // Step 1: Automatically add data-filter from .text inside .chip
  $(".chip").each(function () {
    const label = $(this).find(".text").text().toLowerCase().trim();
    $(this).attr("data-filter", label);
  });

  // Step 2: Handle chip clicks for filtering
  $(".chip").click(function () {
    const selected = $(this).data("filter");

    // Add active class to clicked chip
    $(".chip").removeClass("active");
    $(this).addClass("active");

    // Show/hide blog cards
    $(".blog-card").each(function () {
      const tag = $(this).find(".tag").text().toLowerCase().trim();

      if (selected === "all" || tag === selected) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // For each blog card, setup favorite and like toggle with localStorage
  $(".blog-card").each(function (index) {
    const $card = $(this);

    // Cache the SVG paths inside favorites and like icons
    const $favPath = $card.find(".favorites-icon path");
    const $likePath = $card.find(".like-icon path");

    // Create localStorage keys unique per card
    const favKey = "favorite-" + index;
    const likeKey = "like-" + index;

    // Load saved state and apply styles
    if (localStorage.getItem(favKey) === "true") {
      $favPath.css({ fill: "#ffcc23", strokeWidth: 0 });
    } else {
      $favPath.css({ fill: "none", strokeWidth: "0.04rem" });
    }

    if (localStorage.getItem(likeKey) === "true") {
      $likePath.css({ fill: "#df1c1cff", strokeWidth: 0 });
    } else {
      $likePath.css({ fill: "none", strokeWidth: "0.04rem" });
    }

    // Favorite click handler
    $card.find(".favorites-icon").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isActive =
        $favPath.css("fill") !== "none" && $favPath.css("fill") !== "";

      if (isActive) {
        // Toggle off
        $favPath.css({ fill: "none", strokeWidth: "0.04rem" });
        localStorage.setItem(favKey, "false");
      } else {
        // Toggle on
        $favPath.css({ fill: "#ffcc23", strokeWidth: 0 });
        localStorage.setItem(favKey, "true");
      }
    });

    // Like click handler
    $card.find(".like-icon").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isActive =
        $likePath.css("fill") !== "none" && $likePath.css("fill") !== "";

      if (isActive) {
        // Toggle off
        $likePath.css({ fill: "none", strokeWidth: "0.04rem" });
        localStorage.setItem(likeKey, "false");
      } else {
        // Toggle on
        $likePath.css({ fill: "#b80000ff", strokeWidth: 0 });
        localStorage.setItem(likeKey, "true");
      }
    });
  });

  // Handle chip clicks for filtering blog cards
  $(".chip").click(function () {
    const selectedFilter = $(this).data("filter");

    // Add 'active' class to clicked chip, remove from others
    $(".chip").removeClass("active");
    $(this).addClass("active");

    // Show/hide blog cards based on tag match
    $(".blog-card").each(function () {
      const tag = $(this).find(".tag").text().toLowerCase().trim();

      if (selectedFilter === "all" || tag === selectedFilter) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
