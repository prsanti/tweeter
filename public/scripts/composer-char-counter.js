$(document).ready(function() {
  $("textarea#tweet-text").on("input", function() {
    const userText = $(this).val();
    const textLength = userText.length;
    const charLimit = 140;

    // Checks if the user's text exceeds the char limit
    if (charLimit - textLength < 0) {
      $("output.counter").css("color", "red");
    } else {
      $("output.counter").css("color", "#545149");
      $("#error").hide();
    }
    // Adjusts the character counter when the user types
    $("output.counter").html(charLimit - textLength);
  });
});