/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//

$(document).ready(function() {
  //Function to render tweets into tweet list
  function renderTweets(array) {
    array.forEach(element => {
      console.log(element);
      $(`#tweet-list`).prepend(createTweetElement(element));
    });
  }

  //Function that escapes unsafe characters
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Client side JavaScript
  //takes in tweet object and returns a tweet <article> element containing the entire HTML structure of the tweet.
  function createTweetElement(obj) {
  //create individual variables that we will use to build tweet
  //header
    const $tweet = $(`<article class="tweet-container"></article>`);
    const $header = $(`<header></header>`);
    const $avatarName = $(`<p><img src="${obj.user.avatars}">${obj.user.name}</p>`);
    const $handle = $(`<p>${obj.user.handle}</p>`);

    //main
    const $main = $(`<div class="text-content"><p></p></div>`);
    const $text = $(`<p>${escape(obj.content.text)}</p>`);

    //footer
    const $footer = $(`<footer></footer>`);
    const $timeCreated = $(`<p>${timeago.format(obj["created_at"])}</p>`);
    const $otherAvatars = $(`<div><i class="fas fa-flag"></i><i class="fas fa-heart"></i><i class="fas fa-retweet"></i></div>`);

    //build tweet header
    $header.append($avatarName);
    $header.append($handle);
  
    //build tweet main
    $main.append($text);

    //build tweet footer
    $footer.append($timeCreated);
    $footer.append($otherAvatars);

    //complete build by appending header, footer, and main to $tweet
    $tweet.append($header);
    $tweet.append($main);
    $tweet.append($footer);

    return $tweet;
  }

  //loads all tweets on page load
  function loadTweets() {
    $.ajax('/tweets', { method: 'GET'})
      .then(function(res) {
        renderTweets(res);
      });
  }

  //loads one tweet when submit button pressed
  function loadTweet() {
    $.ajax('/tweets', { method: 'GET'})
      .then(function(res) {
        renderTweets([res[res.length - 1]]);
      });
  }

  //add event listener for sumbit event
  $("#form").on("submit", function(event) {

    //prevent default behavior of submit event data
    event.preventDefault();
    
    //serialize tweet data
    const tweet = $(`#form`).serialize();

    console.log(tweet);
    //Error if tweet content too long / empty - if so, form should not be cleared
    //add 5 characters from 'text:'
    if (tweet.length > 145) {
      alert('Please do not exceed 140 characters per tweet.');
    } else if (tweet === 'text:') {
      alert('Please enter a tweet before hitting tweet button.');
    } else {
      //happy path: proceed AJAX POST request that sends form data to server
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: tweet
      })
        .then((res) => {
          loadTweet();
          let tweetForm = document.getElementById('tweet-text');
          tweetForm.value = '';
        })
        .catch((err) => {
          alert('there was an error', err);
        });
    }
  });
  //Load tweets upon page load
  loadTweets();
});