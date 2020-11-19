/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container

  for (const key of tweets) {
    const newTweet = createTweetElement(key);
    $('#tweets-container').prepend(newTweet);
  }
}

const createTweetElement = function(tweet) {
  // const $tweet = $(`<article class="tweet">Hello world</article>`);
  let $tweet = $(`
    <article>
      <div class="tweet hoverable">
        <header class="header">
          <img class="header icon" src="${tweet.user.avatars}" height="5%" width="5%">
          <p>${tweet.user.name}</p>
          <p class="handle">${tweet.user.handle}</p>
        </header>
        <p class="tweet-description">${tweet.content.text}</p>
        <footer class="data">${tweet.created_at}</footer>
      </div>
    </article>
    `);
  return $tweet;
}

const tweetValidation = (text) => {
  if (text.length > 140) {
    // alert("Tweet exceeds 140 characters!");
    $("#error").text("❗️ Tweet exceeds 140 characters! ❗️");
    // $(".error").slideDown();
    return false;
  } else if (!text) {
    $("#error").text("❗️ Tweet has no text! ❗️");
    // alert("No text");
    return false;
  } else {
    return true;
  }
};

const escape = function(str) {
  let textArea = document.createElement("textarea");
  textArea.appendChild(document.createTextNode(str));
  return textArea.innerHTML;
}

const loadTweets = () => {
  $.ajax("http://localhost:8080/tweets", { method: "GET" })
  .then(initialTweets => {
    renderTweets(initialTweets);
  });
};

$(document).ready(function() {
  loadTweets();

  $("form").on("submit", event => {
    event.preventDefault();

    const userText = escape($("form textarea").val());
    $("#tweet-text").val(userText);
    if (tweetValidation(userText)) {
      $.ajax({
        url:"/tweets/",
        method: "POST",
        data:$("form").serialize()
      })
      .then(() => {
        $("#tweet-text").val("");
        $("#tweets-container").empty();
        loadTweets();
      })
    } else {
      $("#error").slideDown();
      console.log("Invalid input");
    }
  });
});