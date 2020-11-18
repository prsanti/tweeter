/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $(document).ready(function() {
//   // DYNAMIC TWEETS
// // Test / driver code (temporary). Eventually will get this from the server.
//   $("form").on("submit", event => {
//     event.preventDefault();

//     console.log(
//       $("form input").val(),
//       $("form textarea").val(),
//       $("form").serialize()
//     );
//     const form = 

//     createTweetElement()
//   });  

// const tweetData = {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//       },
//     "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//     "created_at": 1461116232227
//   }

//   const createTweetElement = () => {

//   };

//   // const submitTweet = (event, action) => {
//   //   event.preventDefault();

//   //   $
//   //     .ajax({
//   //       url: "/tweets/",
//   //       method: "POST",
//   //       data: $("form").serialize()
//   //     })
//   // }

//   // const createTweetElement = (post) => {
//   //   const title = $("<h2>").text(post.title);
//   //   const text = $("<p>").text(post.text);
//   //   const newSection = $("<section>");

//   //   newSection.append(title);
//   //   newSection.append(text);
//   //   newSection.addClass("container")

//   //   return newSection;
//   // };

//   // const $tweet = createTweetElement(tweetData);

//   // // Test / driver code (temporary)
//   // console.log($tweet); // to see what it looks like
//   // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// });


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
  //console.log($tweet);
  return $tweet;
}

$(document).ready(function() {
  $("form").on("submit", event => {
    event.preventDefault();

    console.log(
      $("form textarea").val(),
      $("form").serialize()
    );
  });

  const loadTweets = () => {
    $.ajax("http://localhost:8080/tweets", { method: "GET" })
    .then(originalTweets => {
      console.log("pls help", originalTweets);
    });
  };

  loadTweets();
  renderTweets(data);
});