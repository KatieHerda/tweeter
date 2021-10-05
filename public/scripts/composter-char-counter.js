

$(document).ready(function() {
  console.log("I have loaded");

  //function to increase counter with input text and inverse with deleted text
  $('#tweet-text').on("input", function() {
    const maxCharacters = 140;
    
    //this points to input field, obtain value.length to count total number of characters
    const inputLength = $(this).val().length;

    //deternins how many characters are left
    let leftOverCharacters = maxCharacters - inputLength;

    //create a variable to hold target counter, obtain through parent/child selectors
    const $counter = $(this).parent().children('.counter-section').children('.counter');
    
    $counter.text(leftOverCharacters);

    
    if (leftOverCharacters < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "#545149");
    }
  });
});


