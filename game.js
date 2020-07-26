
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userClickedPattern = [];
var started = false;
var level = 0;

console.log(started);

$(document).keypress(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  blinkSquare(randomChosenColour);
  gamePattern.push(randomChosenColour);
}

function blinkSquare(squareName) {
  $('#' + squareName).fadeOut(100).fadeIn(100);
  playSound(squareName);
}

function playSound(squareName) {
  var sound = new Audio("sounds/" + squareName + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function(){
      $('#' + currentColour).removeClass("pressed");
  }, 100);
  playSound(currentColour);
}

$(".btn").click(function(event) {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
          nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
