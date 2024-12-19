var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOver = false;
var started = false;

$(document).on("keydown", function() {
    if(level === 0 && !gameOver) {
        started = true;
        $(".text-to-start").slideUp(200);
        userClickedPattern = [];
        nextSequence();
    }
});

$("h2").text("Remember the sequence");

function updateLevel() {
    level++;
    $("h2").text("Level " + level);
}

function nextSequence() {
    updateLevel();
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenBox = buttonColours[randomNumber];
    gamePattern.push(randomChosenBox);
    $("#" + randomChosenBox).fadeOut(100).fadeIn(250);
}

function animatePress(currentBox) {
    $("#" + currentBox).fadeOut(100).fadeIn(250);
    $("#" + currentBox).addClass("pressed");
    setTimeout(function() {
        $("#" + currentBox).removeClass("pressed");
    }, 50);
}

$(".box").on("click", function() {
    if (!started) return;

    var userChosenBox = this.id;
    animatePress(userChosenBox);

    userClickedPattern.push(userChosenBox);

    console.log(userClickedPattern, gamePattern);
    setTimeout(function() {
        checkAnswer()
    }, 1000);
});


function checkAnswer() {
    if (gameOver) return;

    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            console.log("wrong");

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            gameOver = true;
            return startOver();
        }
    }

    if (userClickedPattern.length === gamePattern.length) {
        console.log("success");
        nextSequence();
        userClickedPattern = [];
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("h2").text("Remember the sequence");
    $(".text-to-start").slideDown(200);
    gameOver = false;
    started = false;
}

var buttonColours = ["box1", "box2", "box3", "box4"];
