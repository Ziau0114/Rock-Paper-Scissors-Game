var userScore = 0;
var compScore = 0;

var choices = document.querySelectorAll(".choice");
var msg = document.querySelector("#msg");

var userScorePara = document.querySelector("#user-score");
var compScorePara = document.querySelector("#comp-score");

var drawGame = () => {
  console.log("Game was draw");
  msg.innerText = "Game was draw!";
  msg.style.backgroundColor = "yellow";
  msg.style.color = "black";
};

var getCompChoice = () => {
  var randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber].getAttribute("id");
};

var showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    msg.style.color = "black";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    msg.style.color = "white";
  }


  if (userScore === 5) {
    displayFinalWinner("Congratulations! You are the winner!");
  } else if (compScore === 5) {
    displayFinalWinner("Finally, Computer is winner!");
  }
};

var displayFinalWinner = (message) => {
  userScorePara.style.display = "none";
  compScorePara.style.display = "none";
  msg.style.display = "none";


  var finalMessage = document.createElement("div");
  finalMessage.innerText = message;
  finalMessage.style.fontSize = "36px";
  finalMessage.style.color = "#081b31";
  finalMessage.style.textAlign = "center";
  finalMessage.style.animation = "fadeIn 2s";

  document.body.appendChild(finalMessage);

  // Optionally, add a play again button or reset functionality
  setTimeout(() => {
    finalMessage.innerText += "\n Click to Play Again!";
    finalMessage.addEventListener("click", () => {
      location.reload(); // Reload the page to restart the game
    });
  }, 3000);
};

var playGame = (userChoice) => {
  console.log("UserChoice:", userChoice);
  var compChoice = getCompChoice();
  console.log("Computer Choice:", compChoice);

  if (userChoice === compChoice) {
    drawGame();
    return;
  } else {
    var userWin = true;
    if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    var userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

