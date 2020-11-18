$(document).ready(function() {
  // console.log(document);

  // testing stuff
  // $("form.form-tweet").on("mouseenter", event => {
  //   console.log($(event.target));
  // });

  // on keypress or input???
  $("textarea#tweet-text").on("input", function(event) {
    const userText = $(this).val();
    const textLength = userText.length;
    const charLimit = 140;
    // console.log(userText);
    // console.log(textLength);
    if (charLimit - textLength < 0) {
      $("output.counter").css("color", "red");
    } else {
      $("output.counter").css("color", "#545149");
    }

    $("output.counter").html(charLimit - textLength);
  });
});