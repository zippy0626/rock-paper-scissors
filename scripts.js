// Randomly return rock, paper, scissors
function getComputerChoice() {
    let num = Math.floor(Math.random() * 3)

    if (num === 0) {
        return "Rock"
    } else if (num === 1) {
        return "Paper"
    } else if (num === 2) {
        return "Scissors"
    }
}


// Prompt Human choice
function getHumanChoice() {
    let choice = prompt("What is your choice? (Rock, Paper, or Scissors)?")
    return choice.toLowerCase()
}

let humanScore = 0;
let computerScore = 0;


function playRound() {
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();

    
    if ((humanChoice === 'rock' || humanChoice === 'r') && computerChoice === 'Scissors') {
        humanScore += 1
        console.log('You win, boy. Rock beats scissors, duh.');
        console.log(`Scores: You (unimpressive) ${humanScore}  Computer ${computerScore}`);
        console.log('\n');

    } else if ((humanChoice === 'scissors' || humanChoice === 's') && computerChoice === 'Paper') {
        humanScore += 1
        console.log('You win... unimpressive. Scissors beat paper genius.');
        console.log(`Scores: You (ew) ${humanScore}  Computer ${computerScore}`);
        console.log('\n');

    } else if ((humanChoice === 'paper' || humanChoice === 'p') && computerChoice === 'Rock') {
        humanScore += 1
        console.log("You win, but you're still a loser.. Paper beats rock!");
        console.log(`Scores: You (barf) ${humanScore}  Computer ${computerScore}`);
        console.log('\n');

    } else if (humanChoice === computerChoice.toLowerCase() || humanChoice === computerChoice[0].toLowerCase()) {
        console.log(`Tie, for now.. ${humanChoice} clashes with ${computerChoice.toLowerCase()}!!!`);
        console.log(`Scores: You (me?) ${humanScore}  Computer ${computerScore}`);
        console.log('\n');
    
    } else {

        if (humanScore > 0) {
            humanScore -= 1
        }

        computerScore += 1
        console.log(`You suck! Haha, I knew you were a loser. ${computerChoice} beats ${humanChoice}!`);
        console.log(`Scores: You (...) ${humanScore}  Computer ${computerScore}`);
        console.log('\n');
    };
}


function resetScores() {
    humanScore = 0;
    computerScore = 0;
}


function playGame() {
    for (let i = 0; i < 6; i++) {
        playRound()
    };

    console.log(
        `Game concluded! Total Scores:
        
        You (suck!) ${humanScore}
        Computer ${computerScore}

        GG!
        `
    );

    resetScores()
}

playGame()