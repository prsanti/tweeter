/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const db = require("../../server/lib/in-memory-db");

//const { generateRandomUser } = require('../../server/lib/util/user-helper.js');
// console.log(generateRandomUser());

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
    alert("Tweet exceeds 140 characters!");
    return false;
  } else if (!text) {
    alert("No text");
    return false;
  } else {
    return true;
  }
};

const loadTweets = () => {
  $.ajax("http://localhost:8080/tweets", { method: "GET" })
  .then(initialTweets => {
    //console.log("pls help", initialTweets);
    renderTweets(initialTweets);
  });
};

$(document).ready(function() {
  loadTweets();

  $("form").on("submit", event => {
    event.preventDefault();

    const documentVar = $("form textarea").val();
    if (tweetValidation(documentVar)) {
      $.ajax({
        url:"/tweets/",
        method: "POST",
        data:$("form").serialize()
      })
      .then(() => {
        $("#tweets-container").empty();
        loadTweets();
      })
    } else {
      console.log("Invalid input");
    }
  });
});