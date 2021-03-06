$(function() {
  var gamesCount = 0,
      gamesWon = 0,
      gamesLost = 0,
      sessionTotalGuesses = 0,
      carnacCoins = 100,
      hintsPurchased = 0,
      coinsPurchased = 0,
      cashSpent = 0,
      secretNumber = 0,
      currentGuess = 0,
      currentGuesses = [],
      guessLimit = 5,
      newMessage = "",
      comparedCloseness = "",
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
    var id = event.target.id;
    if(id == "submit guess") {
      processGuess(); 
    }
    if(id == "rules") {
      newMessageType = "rules";
      newMessageBuildAndDisplay();
    }
    if(id == "buy-coins") {
      newMessageType = "buy";
      buyCoins(newMessageType);
    }
    if(id == "buy-hint") {
      buyHint();
    }
    if(true) {
      // pauses the video to silence it as it is closed
      $("#myVideo").get(0).pause()
    }
  })
  $("body").on("keypress", function(event) {
    if (event.which == 13) {
      if($("input").val() != "") {
        processGuess(); 
      }
    }
  })

  function createSecretNumber() {
    secretNumber = (Math.floor(Math.random()*100) + 1);
    console.log("The secret number for this game is: ", secretNumber)
  }
  createSecretNumber();

  function validateGuess() {  
    if(typeof currentGuess !== "number" || Math.round(currentGuess) !== currentGuess 
      || currentGuess < 1 || currentGuess > 100) {
      newMessageType = "invalid";
      newMessageBuildAndDisplay();
      $("input").val("");
      return false;
    }
    for(var i = 0; i<=currentGuesses.length; i++) {
      if(currentGuesses[i] === currentGuess) {
        newMessageType = "notUnique";
        newMessageBuildAndDisplay();
        $("input").val("");
        return false;
      }
    }
    return true;
  }

  function processGuess() {
    currentGuess = parseInt($("input").val(), 10);
    if(validateGuess()) {
        currentGuesses.push(currentGuess);
        sessionTotalGuesses += 1;
        $("#numGuesses").text(currentGuesses.length);

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
    var videoSet = ["videos/sisBoomBah.mp4", "videos/Persnickety.mp4", "videos/Name-a-Fudd-a Mudd-and-a-Dud.mp4"];
    var newSrc = videoSet[Math.floor(Math.random()*3)].toString();
    var srcTitle = newSrc;
    // extract the video title words from the file name to place in the modal header below
    srcTitle = srcTitle.slice(7,-4).split("-").join(" ");
    degreeMessage = "";
    $("input").val("");
    comparisionDegreeMessage(diff);
    if(currentGuess === secretNumber) {
      console.log("the text in the h4 is...", $("#carnakeDoes").text());
      if(currentGuesses.length<4)
        $("#carnakeDoes").text('Carnac does: ' + srcTitle);
      // TODO: I don't understand why the src is not getting set to the new randomly select video
        $("#myVideo").attr("src", newSrc);
        // $("#myVideo").get(0).load();
        $('#jokeModal').modal({"show": true});
        window.setTimeout(function(){
          $("#myVideo").get(0).play();  
        }, 1); 
        newSrc = "";
        srcTitle = "";
      return gameWon();
    }
    if(currentGuesses.length === guessLimit) {
      resetGame();
      return gameOver();
    }
    //evaluates whether there is a prior guess. If yes, are you closer or further away with the new guess?      
    if(currentGuesses.length > 1) {
      if(Math.abs(secretNumber - currentGuess) < Math.abs(secretNumber - Number(currentGuesses.slice(-2,-1).join()))) {
        comparedCloseness = " You're closer than your last guess.";
      }
      if(Math.abs(secretNumber - currentGuess) === Math.abs(secretNumber - Number(currentGuesses.slice(-2,-1).join()))) {
        comparedCloseness = " You are exactly as far away as your last guess. Imagine that!!!";
      }
      if(Math.abs(secretNumber - currentGuess) > Math.abs(secretNumber - Number(currentGuesses.slice(-2,-1).join()))) {
        comparedCloseness = " Hrrrrmmph. Now you're futher away than your last guess!";
      }
    }
    if(currentGuess > secretNumber) {
      newMessage = "You guessed " + currentGuess + ". Your guess is too high " + degreeMessage + comparedCloseness;
    }
    if(currentGuess < secretNumber) {
      newMessage = "You guessed " + currentGuess + " .Your guess is too low " + degreeMessage + comparedCloseness;
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
      guessesNumMsg + ". Let's play again."
    newMessageBuildAndDisplay(newMessageType);
    resetGame();

  }
  function gameOver() {

    resetGame();
    newMessageType = "lost";
    newMessage = "Sorry, you lose. You're out of guesses. Let's play again."
    newMessageBuildAndDisplay(newMessageType);   
    $("#numGuesses").text(0); 
    $("#numLosses").text(gamesLost += 1); 
  }
  function resetGame() {
    comparedCloseness= "";
    currentGuesses = [];    
    $("#guess-recap").text("");
    currentGuess = "";
    createSecretNumber();
    $("#numGames").text(gamesCount += 1);
    $("#avgGuesses").text((sessionTotalGuesses/gamesCount).toFixed(2));
    $("#numGuesses").text(currentGuesses.length);
    $("#numWins").text(gamesWon += 1);
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
        toastr.options.timeOut = 0;
        toastr.options.closeButton = true;
        toastr.error(newMessage);
        break;
      case "lost":
        toastr.options.positionClass = "toast-top-left";
        toastr.options.timeOut = 4000;
        toastr.options.closeButton = true;
        toastr.info(newMessage);      
        break;
      case "won":
        toastr.options.positionClass = "toast-top-left";
        toastr.options.timeOut = 4000;
        toastr.options.closeButton = true;
        toastr.info(newMessage);    
        break;
      case "buy":
        toastr.options.positionClass = "toast-top-left";
        toastr.options.timeOut = 2000;
        toastr.options.closeButton = false;
        toastr.info(newMessage);    
        break;
      case "hint":
        var hint = secretNumber + [-2,-1,1,2][Math.floor(Math.random()*4)];
        newMessage = "The secret number is within two of " + hint + ". Good luck!"
        toastr.options.positionClass = "toast-bottom-full-width";
        toastr.options.timeOut = 0;
        toastr.options.closeButton = true;
        toastr.info(newMessage);    
        break;
      case "needCoins":
        newMessage = "Sorry, you don't have enough Carnac Coins to buy a hint. Go buy some coins!"
        toastr.options.positionClass = "toast-top-left";
        toastr.options.timeOut = 4000;
        toastr.options.closeButton = false;
        toastr.error(newMessage);    
        break;
      case "invalid":
        newMessage = "Try again. You must guess an integer between 1 and 100.";
        toastr.options.positionClass = "toast-top-left";
        toastr.options.timeOut = 4000;
        toastr.options.closeButton = false;
        toastr.error(newMessage);    
        break;
      case "notUnique":
        newMessage = "Sorry! You already guessed " + currentGuess + " this game. Try a unique new guess!"
        toastr.options.positionClass = "toast-top-left";
        toastr.options.timeOut = 4000;
        toastr.options.closeButton = false;
        toastr.error(newMessage);    
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
  function buyCoins() {
    $("#cashSpent").text(cashSpent += 10);
    $("#numCoins").text(carnacCoins += 100);
    newMessage = "You just paid ten bucks for 100 Carnac coins sucker!"
    newMessageBuildAndDisplay();
  }
  function buyHint() {
    if (carnacCoins < 25) {
      newMessageType = "needCoins";
      newMessageBuildAndDisplay();
      return;
    };

    newMessageType = "hint";
    hintsPurchased += 1;
    $("#hintsBought").text(hintsPurchased);
    newMessageBuildAndDisplay();
    $("#numCoins").text(carnacCoins -= 25);
  }
})
