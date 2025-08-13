$(document).ready(function () {
  // Debounce helper function
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Escape special regex chars in keywords
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Highlight all keywords separately in the text
  function highlightMultipleWords(text, keywords) {
    if (!keywords.length) return text;

    const escapedWords = keywords
      .filter((w) => w.trim() !== "")
      .map(escapeRegExp);

    if (escapedWords.length === 0) return text;

    const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");

    return text.replace(regex, "<mark>$1</mark>");
  }

  function filterArticles(value) {
    const searchValue = value.toLowerCase().trim();

    if (!searchValue) {
      // No search: reset all highlights and show all articles
      $("main article").each(function () {
        const $article = $(this);
        const $a = $article.find("a");
        const $h1 = $a.find("h1");
        const $p = $a.find("p");

        // Restore original text from data attribute or fallback to current text
        if ($h1.data("original")) $h1.html($h1.data("original"));
        if ($p.data("original")) $p.html($p.data("original"));

        $article.show();
      });
    } else {
      const searchWords = searchValue.split(/\s+/);

      $("main article").each(function () {
        const $article = $(this);
        const $a = $article.find("a");
        const $h1 = $a.find("h1");
        const $p = $a.find("p");

        // Cache original HTML once
        if (!$h1.data("original")) $h1.data("original", $h1.html());
        if (!$p.data("original")) $p.data("original", $p.html());

        // Combine text content for searching (convert to lowercase)
        const combinedText = ($h1.text() + " " + $p.text()).toLowerCase();

        // Check if ALL words are found in combined text
        const allWordsFound = searchWords.every((word) =>
          combinedText.includes(word)
        );

        if (allWordsFound) {
          $article.show();

          // Highlight each word in both h1 and p separately
          $h1.html(highlightMultipleWords($h1.data("original"), searchWords));
          $p.html(highlightMultipleWords($p.data("original"), searchWords));
        } else {
          $article.hide();
        }
      });
    }

    // Update count of visible links inside visible articles
    var visibleCount = $("main article:visible a").length;
    $(".filter h2 span").text(visibleCount);
  }

  // Debounced filter handler
  const debouncedFilter = debounce(function () {
    const val1 = $("#searchInput").val() || "";
    const val2 = $("#searchInputMob").val() || "";
    // Use whichever has longer input (to handle both search inputs)
    const val = val1.length >= val2.length ? val1 : val2;
    filterArticles(val);
  }, 300);

  // Attach input event on both desktop and mobile search bars
  $("#searchInput, #searchInputMob").on("input", debouncedFilter);

  // Initial call to show all articles on page load and update count
  filterArticles("");
});
