/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//

$(document).ready(function() {
  
  function renderTweets(array) {
    array.forEach(element => {
      console.log(element)
      $(`#tweet-list`).append(createTweetElement(element));
    });
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

function loadTweets() {
  $.ajax('/tweets', { method: 'GET'})
    .then(function (res) {
      renderTweets(res);
     });
}

  //add event listener for sumbit event
  $("#form").on("submit", function(event) {

    //prevent default behavior of submit event data
    event.preventDefault();
    
    //serialize tweet data
    const tweet = $(`#form`).serialize();

    //create AJAX POST request that sends form data to server
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweet
 
    }).then((res) => {
      loadTweets();
      //clear form somehow
    })
    .catch((err) => {
      console.log('there was an error', err)
    })
  })
});