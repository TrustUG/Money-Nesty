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

  // hide search desk
  const $input = $("#searchInput");
  const $placeholder = $(".header-cont header .search .placeholder-text");
  const $icon = $(".header-cont header .search .icon svg");

  function toggleSearchExtras() {
    if ($input.is(":focus") || $input.val().length > 0) {
      $placeholder.stop(true, true).fadeOut(200);
      $icon.stop(true, true).fadeOut(200);
    } else {
      $placeholder.stop(true, true).fadeIn(200);
      $icon.stop(true, true).fadeIn(200);
    }
  }

  // Initial check
  toggleSearchExtras();

  // Toggle extras on focus/input/blur
  $input.on("focus input blur", toggleSearchExtras);

  // Clear input and blur on Enter
  $input.on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // stop form from submitting
      $input.val(""); // clear input
      $input.blur(); // remove focus
      toggleSearchExtras(); // restore placeholder/icon
    }
  });

  // scroll search
  let lastScrollTop = 0;

  $(window).on("scroll", function () {
    // Only run on screens <= 462px
    if (window.matchMedia("(max-width: 462px)").matches) {
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

  // prevent click
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

  // Assign data-filter attribute automatically from chip text
  $(".chip").each(function () {
    const label = $(this).find(".text").text().toLowerCase().trim();
    $(this).attr("data-filter", label);
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

  // Load liked IDs from localStorage or empty array
  function getLikedIDs() {
    const liked = localStorage.getItem("likedPosts");
    return liked ? JSON.parse(liked) : [];
  }

  // Show only liked cards based on localStorage
  function showLikedCards() {
    const likedIDs = getLikedIDs();

    $(".blog-card").each(function () {
      const id = $(this).attr("id"); // make sure each blog-card has unique id
      if (likedIDs.includes(id)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  // Your filter chips click handler
  $(".filter-chip").click(function () {
    $(".chip, .filter-chip").removeClass("active");
    $(this).addClass("active");

    if ($(this).is("#filter-liked")) {
      showLikedCards();
    } else if ($(this).is("#filter-favorited")) {
      // handle favorites similarly if needed
    } else {
      // handle other filters if any
      $(".blog-card").show();
    }
  });

  // Example toggle for like icon -- update localStorage on toggle
  $(".blog-card .actions .like-icon").click(function () {
    const $card = $(this).closest(".blog-card");
    const id = $card.attr("id");
    let likedIDs = getLikedIDs();

    if ($card.hasClass("liked")) {
      // Remove like
      likedIDs = likedIDs.filter((item) => item !== id);
      $card.removeClass("liked");
    } else {
      // Add like
      likedIDs.push(id);
      $card.addClass("liked");
    }

    localStorage.setItem("likedPosts", JSON.stringify(likedIDs));
  });
});
