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
});

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
