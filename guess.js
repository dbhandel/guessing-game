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
      newMessage = "Welcome, bahahahaha!",
      newMessageType = "info",
      messageLocation = "toast-top-right",
      messageTimeout = "0",
      messageCloseBtn = true;

  // listeners
  $("body").on("click", function(event) {
    console.log(event.target.id);
    if(event.target.id == "submit guess") {
      processGuess(); 
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
    validateGuess(); 
  }




})



// $(function() {
//   var MESSAGE = "";

//   // session object stores session related data and methods
//   var session = {
//     resetSessionData: function() {
       
//     },
//     startNewSession : function() {
       
//     },
//     buyCoins: function() {
       
//     },
//     gamesCount: 0,
//     gamesWon: 0,
//     gamesLost: 0,
//     sessionTotalGuesses: 0,
//     carnacCoins: 100,
//     hintsPurchased: 0,
//     coinsPurchased: 0
//   };


//   // game object stores games related data and methods
//   var game = {
//     startNewGame: function() {
//         game.selectSecretNumber();
//         if(game.getInput()) {
//           game.validateGuess(currentGuess);
//         }
//         console.log("startNewGame function called")
//       $(".new-game").on("click", function() {      
//             // clear imput field
//              guessCount = 0;
//              $(".guess-input").val("");
//              //TODO: send newGameMsg

//           });
//     },
//     selectSecretNumber: function () {
//       secretNumber = (Math.floor(Math.random()*100) + 1);
//       console.log("The secret number for this game is: ", secretNumber)
//     },
//     getInput: function() {
//         var returnKeyPressed = false;
//         var guessBtnPressed = false;
//         $("input").keypress(function (e) {
//               if (e.which == 13) {
//                 console.log("return pressed in input field");
//                 currentGuess = $(".guess-input").val();
//                 console.log("you guessed ", currentGuess);
                
//                 return true;
//                 }
//             });
//         $('.guess-btn').on('click', function() {
//               console.log("guess button clicked");
//               return true;
//             });
      
//       },
//     validateGuess: function(currentGuess) {
//       currentGuess = parseInt(currentGuess, 10);
//       console.log(currentGuess);
//       if(typeof currentGuess !== "number" || (Math.round(currentGuess) !== currentGuess || currentGuess < 1 || currentGuess > 100)) {
//         MESSAGE = "Try again. You must guess an integer between 1 and 100."
//         return false;
//         // return false;
//       }

//       //TODO: confirm that guess is unique this game
//       // if() {

//       // }
//       return true
//     },
//     secretNumber: 0,
//     currentGuess: 0,
//     analyzeGuess: function () {
       
//     },
//     attemptsRule: function () {
       
//     },
//     tellJoke: function() {
       
//     },
//     guessesCount: 0,
//     currentGuesses: []
//   };

//   // the messages object contain the methods and data for communications to the player
//   var messages = {
//     deliverMessage: function (newMessage, messageType) {
       
//     },
//     buildNewMessage: function (newMessage, messageType) {
//        return msg;
//     },
//     high: "Your guess is high ",
//     low: "Your guess is low ",
//     realFar: "and you're rediculously far away",
//     far: "and you're far away",
//     close: "but you're close",
//     veryClose: "but you're very close",
//     rules: "The Rules for this are pretty simple. You have to guess a number between 1 and 100. Carnac will tell you if you are close after each try. You have 5 attempts to guess the number. If you get it in 3, Carnac will tell you a joke. You can buy hints with Carnac Coins. If you run out of coins, purchase some more!",
//     jokes: ["", "", 
//       ""],
//     newGameMsg: "OK, lets start a new game!"
//   };
   

//   // $('.guess-btn').on('click', function() {
//   //   var high = " way too high!"
//   //   toastr.options = {
//   //     "closeButton": false,
//   //     "debug": false,
//   //     "positionClass": "toast-bottom-full-width",
//   //     "showDuration": "300",
//   //     "hideDuration": "3000",
//   //     "timeOut": "2000",
//   //     "extendedTimeOut": "1000",
//   //     "showEasing": "swing",
//   //     "hideEasing": "linear",
//   //     "showMethod": "fadeIn",
//   //     "hideMethod": "fadeOut"
//   //   }
//   //   toastr.error("Sorry Charlie, your guess is" + high);
//   // });
//   //   $('.rules').on('click', function() {
//   //   var high = " way too high!"
//   //  toastr.options = {
//   //     "closeButton": true,
//   //     "debug": false,
//   //     "positionClass": "toast-top-right",
//   //     "showDuration": "300",
//   //     "hideDuration": "2000",
//   //     "timeOut": "0",
//   //     "extendedTimeOut": "0",
//   //     "showEasing": "swing",
//   //     "hideEasing": "linear",
//   //     "showMethod": "fadeIn",
//   //     "hideMethod": "fadeOut"
//   //   }
//   //   toastr.info("The Rules for this are pretty simple. You have to guess a number between 1 and 100. Carnac will tell you if you are close after each try. You have 5 attempts to guess the number. If you get it in 3, Carnac will tell you a joke. You can buy hints with Carnac Coins. If you run out of coins, purchase some more!");
//   // });

// // test code
// //console.log(game.selectSecretNumber());


// // end test code
//   game.startNewGame()
// });



