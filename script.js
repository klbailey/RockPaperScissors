let winners = [];
const choices = ["rock", "paper", "scissors"];

function resetGame() {
  winners = [];
  document.querySelector(".playerScore").textContent = "Score: 0";
  document.querySelector(".computerScore").textContent = "Score: 0";
  document.querySelector(".ties").textContent = "Ties: 0";
  document.querySelector(".winner").textContent = "";
  document.querySelector(".playerChoice").textContent = "";
  document.querySelector(".computerChoice").textContent = "";
  document.querySelector(".reset").style.display = "none";
}

function game() {
  //Grab all image tags, cycle through, and add an event listener (click), and a function
  //If it has an id it's player round as computer round does not have id (see index.html)
  let imgs = document.querySelectorAll("img");
  imgs.forEach((img) =>
    img.addEventListener("click", () => {
      if (img.id) {
        playRound(img.id);
      }
    })
  );
}

function playRound(playerChoice) {
//Play the game until someone wins 5 times
  let wins = checkWins();
  if (wins >= 5) {
    return;
  }

  const computerChoice = computerSelection();

  const winner = checkWinner(playerChoice, computerChoice);
  winners.push(winner);
  sumWins();
  displayRound(playerChoice, computerChoice, winner);
  wins = checkWins();
  if (wins == 5) {
    //display end results, make button visible, change the text to display winner
    displayEnd();
  }
}

function displayEnd() {
  let playerWins = winners.filter((item) => item == "Player").length;

  if (playerWins == 5) {
    document.querySelector(".winner").textContent =
      "You Won 5 Games, Woo Hoo!";
  } else {
    document.querySelector(".winner").textContent =
      "Sorry, the computer won 5 times";
  }
  document.querySelector(".reset").style.display = "flex";
}

function displayRound(playerChoice, computerChoice, winner) {
  //Capitalizes first letter eg "R" and .slice(1) returns the remainder "ock"
  document.querySelector(".playerChoice").textContent = `You Chose: ${
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
  }`;
  document.querySelector(
    ".computerChoice"
  ).textContent = `The Computer Chose: ${
    computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
  }`;
  displayRoundWinner(winner);
}

function displayRoundWinner(winner) {
  if (winner == "Player") {
    document.querySelector(".winner").textContent = "You won the Round!";
  } else if (winner == "Computer") {
    document.querySelector(".winner").textContent =
      "The Computer won the Round";
  } else {
    document.querySelector(".winner").textContent = "The Round was a tie";
  }
}

function sumWins() {
  const playerWinCount = winners.filter((item) => item == "Player").length;
  const computerWinCount = winners.filter((item) => item == "Computer").length;
  const ties = winners.filter((item) => item == "Tie").length;
  document.querySelector(".playerScore").textContent = `Score: ${playerWinCount}`;
  document.querySelector(".computerScore").textContent = `Score: ${computerWinCount}`;
  document.querySelector(".ties").textContent = `Ties: ${ties}`;
}

function computerSelection() {
  const choice = choices[Math.floor(Math.random() * choices.length)];
  //class selected will make image bigger or smaller
  document.querySelector(`.${choice}`).classList.add("active");
  //different function can run after a set time period; here is 700 milliseconds
  setTimeout(() => {
    document.querySelector(`.${choice}`).classList.remove("active");
  }, 700);

  return choice;
}

function checkWins() {
  const playerWinCount = winners.filter((item) => item == "Player").length;
  const computerWinCount = winners.filter((item) => item == "Computer").length;
  return Math.max(playerWinCount, computerWinCount);
}

function checkWinner(choice1, choice2) {
  if (
    (choice1 == "rock" && choice2 == "scissors") ||
    (choice1 == "scissors" && choice2 == "paper") ||
    (choice1 == "paper" && choice2 == "rock")
  ) {
    return "Player";
  } else if (choice1 == choice2) {
    return "Tie";
  } else {
    return "Computer";
  }
}

function setWins() {
  const playerWinCount = winners.filter((item) => item == "Player").length;
  const computerWinCount = winners.filter((item) => item == "Computer").length;
  const ties = winners.filter((item) => item == "Tie").length;
}

game();