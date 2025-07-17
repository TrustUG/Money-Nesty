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

  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    $("body").addClass("light-theme");
  } else {
    $("body").removeClass("light-theme");
  }

  updateThemeUI();

  // Toggle theme on click
  $("#theme").on("click", function () {
    $("body").toggleClass("light-theme");

    const isNowLight = $("body").hasClass("light-theme");
    localStorage.setItem("theme", isNowLight ? "light" : "dark");

    updateThemeUI();
  });
});
