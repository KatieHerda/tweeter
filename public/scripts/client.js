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
  const $tweet = $(`<article class="tweet-container"></article>`);
  const $header = $(`<header></header>`)
  const $avatarName = $(`<p><img src="${obj.user.avatars}">${obj.user.name}</p>`);
  const $handle = $(`<p>${obj.user.handle}</p>`);

  //main
  const $main = $(`<div class="text-content"><p></p></div>`)
  const $text = $(`<p>${obj.content.text}</p>`);

  //footer
  const $footer = $(`<footer></footer>`);
  const $timeCreated = $(`<p>${timeago.format(obj["created_at"])}</p>`);
  const $otherAvatars = $(`<div><i class="fas fa-flag"></i><i class="fas fa-heart"></i><i class="fas fa-retweet"></i></div>`)

  //build tweet header
  $header.append($avatarName);
  $header.append($handle);
  
  //build tweet main
  $main.append($text);

  //build tweet footer
  $footer.append($timeCreated);
  $footer.append($otherAvatars);
  
  //need to grab flag, heart, retweet from font awesome

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