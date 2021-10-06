/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//

//initial
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1633375562279
};

//Client side JavaScript
//takes in tweet object and returns a tweet <article> element containing the entire HTML structure of the tweet.

const createTweetElement = function(obj) {
  //create individual variables that we will use to build tweet
  //header
  const $tweet = $(`<article class="tweet">Hello world</article>`);
  const $header = $(`<header class="tweet-header"></header>`)
  const $name = $(`<p class="name">${obj.user.name}</p>`);
  const $avatar = $(`<img src="${obj.user.avatars}">`);
  const $handle = $(`<p class="handle">${obj.user.handle}</p>`);

  //main
  const $main = $(`<div><p></p></div>`)
  const $text = $(`<p class="text">${obj.content.text}</p>`);

  //footer
  const $footer = $(`<footer class="footer"></footer>`);
  const $timeCreated = $(`<p class="time-created">${obj["created_at"]}</p>`);

  //build tweet header
  $header.append($name);
  $header.append($avatar);
  $header.append($handle);
  
  //build tweet main
  $main.append($text);

  //build tweet footer
  $footer.append($timeCreated);

  //complete build by appending header, footer, and main to $tweet
  $tweet.append($header);
  $tweet.append($main);
  $tweet.append($footer);

  return $tweet;
};

$(document).ready(function() {
 const $newTweet = createTweetElement(tweetData);

 $('#tweet-list').append($newTweet);

 return $newTweet;
});