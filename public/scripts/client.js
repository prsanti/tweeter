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
};

// Creates new tweet in hard coded HTML
const createTweetElement = function(tweet) {
  let $tweet = $(`
    <article>
      <div class="tweet hoverable">
        <header class="header">
          <img class="header icon" src="${tweet.user.avatars}" height="5%" width="5%">
          <p>${tweet.user.name}</p>
          <p class="handle">${tweet.user.handle}</p>
        </header>
        <p class="tweet-description">${tweet.content.text}</p>
        <footer class="data">
          ${moment(tweet.created_at).fromNow()}
          <div class="graphics">
            <img class="graphic-icon flag" src="./images/flag-solid.svg">
            <img class="graphic-icon retweet" src="./images/retweet-solid.svg">
            <img class="graphic-icon heart" src="./images/heart-solid.svg">
          </div>
          </footer>
      </div>
    </article>
    `);
  return $tweet;
};

// Checks if the tweet is more than 140 or 0 characters to send an error
const tweetValidation = (text) => {
  if (text.length > 140) {
    $("#error").text("❗️ Tweet exceeds 140 characters! ❗️");
    return false;
  } else if (!text) {
    $("#error").text("❗️ Tweet has no text! ❗️");
    return false;
  } else {
    return true;
  }
};

// escape function to prevent cross-site scripting for the tweet box;
const escape = function(str) {
  let textArea = document.createElement("textarea");
  textArea.appendChild(document.createTextNode(str));
  return textArea.innerHTML;
};

// Loads all tweets from the database
const loadTweets = () => {
  $.ajax("http://localhost:8080/tweets", { method: "GET" })
    .then(initialTweets => {
      renderTweets(initialTweets);
    });
};

// loads the document
$(document).ready(function() {
  // loads all tweets
  loadTweets();

  // Event when the user submits their tweet
  $("form").on("submit", event => {
    event.preventDefault();

    // takes the user's input and applies escape function to prevent xss
    const userText = escape($("form textarea").val());
    // replaces the text value with the new escaped text
    $("#tweet-text").val(userText);
    // applies tweetValidation function to the input
    // then makes a post to the database with the new tweet
    if (tweetValidation(userText)) {
      $.ajax({
        url:"/tweets/",
        method: "POST",
        data:$("form").serialize()
      })
        .then(() => {
        // resets the text box
          $("#tweet-text").val("");
          // empties the list of tweets to prevent duplicates
          $("#tweets-container").empty();
          // reloads all tweets with the new tweets
          loadTweets();
        });
    } else {
      // an error box slides down if the tweet is >140 or 0
      $("#error").slideDown();
    }
  });
});