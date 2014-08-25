$(function() {
  var gamesCount = 0,
      gamesWon = 0,
      gamesLost = 0,
      sessionTotalGuesses = 0,
      carnacCoins = 100,
      hintsPurchased = 0,
      coinsPurchased = 0,
      secretNumber = 0,
      currentGuess = 0,
      currentGuesses = [],
      guessLimit = 5,
      newMessage = "",
      degreeMessage = "",
      newMessageType = "",
      options = {
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
      };

  // listeners
  $("body").on("click", function(event) {
    console.log(event.target.id);
    var id = event.target.id;
    if(id == "submit guess") {
      processGuess(); 
    }
    if(id == "rules") {
      newMessageType = "rules";
      newMessageBuildAndDisplay("comparison");
    }
  })
  $("body").on("keypress", function(event) {
    if (event.which == 13) {
      if($("input").val() != "") {
        console.log("submitting nonempty input field")
        processGuess(); 
      }
      else {
         console.log("the input field is empty")   
      }
    }
  })


  function createSecretNumber() {
    secretNumber = (Math.floor(Math.random()*100) + 1);
    console.log("The secret number for this game is: ", secretNumber)
  }
  createSecretNumber();

  function validateGuess() {
    console.log("The current guess is: ", currentGuess);
    if(typeof currentGuess !== "number" || Math.round(currentGuess) !== currentGuess 
      || currentGuess < 1 || currentGuess > 100) {
      console.log("Try again. You must guess an integer between 1 and 100.");
      return false;
    }
    else {
      console.log("that's a legit guess")
      return true;
    }
  }
  function processGuess() {
    currentGuess = parseInt($("input").val(), 10);
    if(validateGuess()) {
        currentGuesses.push(currentGuess);
      //TODO: figure out how to anotate the displayed guesses as to high or low
      if(currentGuesses.length) {
        var text = "";
        var comparison = "";
        var guess = currentGuess;
        for(var i; i<currentGuesses.length; i++) {
          comparison = guess > secretNumber ? "high": guess < secretNumber ?
            "low":"BINGO!";
          text += currentGuesses[i] + ": " + comparison + ",";
        }
        // text = text.slice(0,-1);
        // text = "Your guesses this game: " + text;
        $("#guess-recap").text("Your guesses this game: " + currentGuesses);
      }
      compareGuessSecret();
    }

  }
  function compareGuessSecret() {
    var diff = Math.abs(currentGuess - secretNumber);
    degreeMessage = "";
    $("input").val("");
    comparisionDegreeMessage(diff);
    if(currentGuess === secretNumber) {
      return gameWon();
    }
    if(currentGuesses.length === guessLimit) {
      return gameOver();
    }
    if(currentGuess > secretNumber) {
      newMessage = "You guessed " + currentGuess + ". Your guess is too high " + degreeMessage;
    }
    if(currentGuess < secretNumber) {
      newMessage = "You guessed " + currentGuess + " .Your guess is too low " + degreeMessage;
    }
      newMessageType = "comparison";
      newMessageBuildAndDisplay(newMessageType);
      newMessage = "";
      return;
  }
  function gameWon() {
    var guessesNumMsg = "";
    resetGame();
    newMessageType = "won";
    if(currentGuesses.length < 2) {
      guessesNumMsg = "one guess";
    }
    else {
      guessesNumMsg = (currentGuesses.length).toString() + " guesses"; 
    }
    newMessage = "Congratulations!!! You won and it only to you " + 
      guessesNumMsg + ". Do you wanna play again?"
    newMessageBuildAndDisplay(newMessageType);
    currentGuesses = [];
  }
  function gameOver() {
    resetGame();
    newMessageType = "lost";
    newMessage = "Sorry, you lose. You're out of guesses. Do you wanna play again?"
    newMessageBuildAndDisplay(newMessageType);
    currentGuesses = [];
  }
  function resetGame() {
    $("#guess-recap").text("");
    currentGuess = "";
    createSecretNumber();
  }
  function newMessageBuildAndDisplay() {
    var toastrFn;
    toastr.options = options;
    switch (newMessageType) {
      case "rules":
        newMessage = "The Rules for this are pretty simple. You have to guess a number between 1 and 100. Carnac will tell you if you are close after each try. You have 5 attempts to guess the number. If you get it in 3, Carnac will tell you a joke. You can buy hints with Carnac Coins. If you run out of coins, purchase some more!";
        toastr.options.positionClass = "toast-top-right"
        toastr.info(newMessage);
        break;
      case "comparison":
        toastr.options.positionClass = "toast-bottom-full-width";
        toastr.options.timeOut = 3500;
        toastr.options.closeButton = false;
        toastr.error(newMessage);
        break;
      case "lost":
        toastr.options.positionClass = "toast-top-left";
        toastr.options.timeOut = 0;
        toastr.options.closeButton = true;
        toastr.info(newMessage);      
        break;
      case "won":
        toastr.options.positionClass = "toast-top-left";
        toastr.options.timeOut = 0;
        toastr.options.closeButton = true;
        toastr.info(newMessage);    
        break;
      case "":
        break;
      case "":
        break;
      default:
    }
  }
  function comparisionDegreeMessage(diff) {
    if (diff > 70) {
      degreeMessage = "and a moonshot away!";
      return;
    }
    if (diff > 50) {
      degreeMessage = "and on the opposite coast!";
      return;   
    }
    if (diff > 30) {
      degreeMessage = "but at least you're within two states!";
      return; 
    }
    if (diff > 15) {
      degreeMessage = "but you're warm.";
      return;
    }
    if (diff > 6) {
      degreeMessage = "but you're damn close!";
      return; 
    }
    if (diff > 1) {
      degreeMessage = "but you're just a smidgen away!";
      return;   
    }
    if (diff > 0) {
      degreeMessage = "but you can't get any closer!";
      return;  
    } 
  }
})
