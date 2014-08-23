// JQuery proof of life
$(function() {
  var MESSAGE = "";
  
   function validateGuess(guess) {
    if(typeof guess !== "number" || (Math.round(guess) !== guess || guess < 1 || guess > 100)) {
      MESSAGE = "Try again. You must guess an integer between 1 and 100."
      return false;
    }
    return true
  }

  $('.guess-btn').on('click', function() {
    var high = " way too high!"
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "positionClass": "toast-bottom-full-width",
      "showDuration": "300",
      "hideDuration": "3000",
      "timeOut": "2000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    toastr.error("Sorry Charlie, your guess is" + high);
  });
    $('.rules').on('click', function() {
    var high = " way too high!"
   toastr.options = {
      "closeButton": true,
      "debug": false,
      "positionClass": "toast-top-right",
      "showDuration": "300",
      "hideDuration": "2000",
      "timeOut": "0",
      "extendedTimeOut": "0",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    toastr.info("The Rules for this are pretty simple. You have to guess a number between 1 and 100. Carnac will tell you if you are close after each try. You have 5 attempts to guess the number. If you get it in 3, Carnac will tell you a joke. You can buy hints with Carnac Coins. If you run out of coins, purchase some more!");
  });

});



