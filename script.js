const choices = ["rock", "paper", "scissors"]
const winners = [];

function game() { 
    for (let i = 1; i <= 5; i++) {
        // To pass round
        playRound(i); 
    }
    noteWins();
}
    // Play rounds
function playRound(round) {
    const playerSelection = playerChoice();
    const computerSelection = getComputerChoice();
    const winner = checkWinner(playerSelection, computerSelection);
    // Adds new items to the end of an array
    winners.push(winner);
    noteRound(playerSelection, computerSelection, winner, round);
}
// Make player selection parameter case-insensitive.
function playerChoice() {
    let input = prompt('Type Rock, Paper, or Scissors');
    // Response for invalid player choice 
    while(input == null) {
        input = prompt('Please check for misspellings. Type Rock, Paper, or Scissors');
    }
    input = input.toLowerCase();
    let check = validInput(input);
    while (check == false) {
        input = prompt('Please check for misspellings. Type Rock, Paper, or Scissors.');
        while (input == null) {
            input = prompt('Type Rock, Paper, or Scissors');
        }
        input = input.toLowerCase();
        check = validInput(input);
    }
    return input; 
}
 
// Randomly return Rock, Paper, or Scissors for computer's turn; Math.floor rounds down; choices.length is length of array
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

//Validate input
function validInput(choice) {
    if (choices.includes(choice)) {
        return true;
    } else {
        return false;
    }
}

// Return a string that declares the winner. Rock beats Scissors. Paper beats rock. Scissors beats paper. If same shape it's a tie.
function checkWinner(choicePlayer, choiceComputer) {
    if(choicePlayer === choiceComputer) {
        return 'Tie';
    } else if(
        (choicePlayer == 'rock' && choiceComputer == 'scissors') || 
        (choicePlayer == 'paper' && choiceComputer== 'rock') || 
        (choicePlayer == 'scissors' && choiceComputer == 'paper') 
    ) {
        return 'Player';
    } else {
        return 'Computer';
    }
}

function noteWins(){
    // Use array of winners & filter to loop over each item; .length is how many times each item won
    // Needs to match what's returned in checkWinner else will show 0
    let playerWins = winners.filter((item) => item == 'Player').length;
    let computerWins = winners.filter((item) => item == 'Computer').length;
    let ties = winners.filter((item) => item == 'Tie').length;
    console.log('Results: ');
    console.log('Player wins: ', playerWins);
    console.log('Computer wins: ', computerWins);
    console.log('Ties', ties);
}

// Results of each round
function noteRound(playerChoice, getComputerChoice, winner, round) {
    console.log('Round: ', round);
    console.log('Player Chose: ', playerChoice);
    console.log('Computer Chose: ', getComputerChoice);
    console.log(winner, 'won the round.');
    console.log('**********************');
}

game();