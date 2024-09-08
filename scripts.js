// Sleep Function
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

// Rounds Resetter
const rounds = document.querySelector('.rounds');

    function setRound(currentRoundNumber) {
        rounds.textContent = `Round ${currentRoundNumber}`
    }
//


// Player Scores
let humanScore = document.querySelector('.human-score');
let computerScore = document.querySelector('.computer-score');

    function addScore(scoreAmount, player) {
        let hScoreNumber = Number(humanScore.textContent.slice(-1))
        let cScoreNumber = Number(computerScore.textContent.slice(-1))

        if (player === 'h') {
            humanScore.textContent = `You:${hScoreNumber + scoreAmount}`
        } else if (player === 'c') {
            computerScore.textContent = `Bot:${cScoreNumber + scoreAmount}`
        } 
    }

    function delScore(scoreAmount, player) {
        let hScoreNumber = Number(humanScore.textContent.slice(-1))
        let cScoreNumber = Number(computerScore.textContent.slice(-1))
        
        if (hScoreNumber > 0 && player === 'h') {
            humanScore.textContent = `You:${hScoreNumber - scoreAmount}`
        } else if (cScoreNumber > 0 && player === 'c') {
            computerScore.textContent = `Bot:${cScoreNumber - scoreAmount}`
        } 
    }

    function resetScores() {
        humanScore.textContent = `You:0`
        computerScore.textContent = `Bot:0`
    }
//


// Blink Effect
const outputDisplay = document.querySelector('.output-display');

const blinkSpeedMs = 800
    const t = setInterval(function () {
        if (outputDisplay.textContent.trim() === "Press SPACE to start..") { // If its something else, stop blink effect
            outputDisplay.style.visibility = (outputDisplay.style.visibility === "hidden" ? "" : "hidden");
        }
    }, blinkSpeedMs);
//


// Start Game
const body = document.querySelector('body');

    // Countdown with Async Function
    async function startGame(event) {
        resetScores();
        setRound(1);
        
        if (event.code === 'Space' || event.key === ' ') {
            outputDisplay.style.visibility = ""; // Make style unhidden
    
            let items = ['Rock!', 'Paper!', 'Scissors!', 'Shoot!'];
    
            for (let i = 0; i < items.length; i++) {
                outputDisplay.textContent = `${items[i]}`;
                await sleep(500);
            }
        }
        await sleep(2000);

        if (playerChoice === '') { //Player misses
            outputDisplay.textContent = `Too Late!`;

            addScore(1, "computer");
            delScore(1, 'human');

            await sleep(5000)
        } else {
            calculateWinner();
        }
    }
    
    // eventListener only executes once
    body.addEventListener('keydown', startGame, { once: true });


// Randomly return rock, paper, scissors for Bot
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
//


// Main Logic

// Player Choice
let playerChoice = "";
const buttons = document.querySelectorAll('.button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Rock' || button.textContent === 'Paper' || button.textContent === 'Scissors') {
                playerChoice = button.textContent
            }
        });
    });
//


const resultsDisplay = document.querySelector('.results-display'); // below output-display
const continueDisplay = document.querySelector('.continue');

function calculateWinner() {

    // Use showResultScreen in this function as well as the Too Late screen
    let computerChoice = getComputerChoice()

    // Wins + Draw + Loose for Player
    if (computerChoice === playerChoice) {
        outputDisplay.textContent = `
        Tie..For Now! ${playerChoice} clashes with ${computerChoice}!
        `
        showResultScreen()
    } else if (playerChoice === 'Rock' && computerChoice === 'Scissors') {
        outputDisplay.textContent = `
        You win! But still suck!
        `
        showResultScreen()
        addScore(1, 'h')
        delScore(1, 'computer')
    } else if (playerChoice === 'Paper' && computerChoice === 'Rock') {
        outputDisplay.textContent = `
        You..w-win..
        `
        showResultScreen()
        addScore(1, 'h')
        delScore(1, 'c')
    } else if (playerChoice === 'Scissors' && computerChoice === 'Paper') {
        outputDisplay.textContent = `
        Did you..win?
        `
        showResultScreen()
        addScore(1, 'h')
        delScore(1, 'c')
    } else {
        outputDisplay.textContent = `
        YOU LOST!
        `
        showResultScreen()
        addScore(1, 'c')
        delScore(1, 'h')
    };
}

// Show Results
async function showResultScreen() {
    resultsDisplay.textContent = `
    ${humanScore.textContent}
    ${computerScore.textContent}
    `

    await sleep(3000)
    outputDisplay.style.display = 'none';

    resultsDisplay.style.display = 'flex';

    continueDisplay.style.display = 'flex';
}
//


// Continue or Not?

const yes = document.querySelector('.yes');
yes.addEventListener('click', function);

const no = document.querySelector('.no');
















// Messages 
const messages = [
    "Dang..You Suck!",
    "Just quit bro!",
    "GG NO RE!",
    "Stop..the HORROR!",
    "I C U",
    "<3",
    "U SUK!",
    "UwU",
    "That was fun,right..",
    "...",
    "Choose rock!",
    "Choose paper!",
    "Choose scissors!",
    "U win??",
    "U LOZE!",
    "nooooob",
    "Dang..You good!",
    "#&#@^$@@#",
    "!OMGG!",
    "why u keep lose?",
    "why u keep win?",
    "Surrender!",
    "FF FF FF!",
    "Take a hike..",
    "I've seen enough",
    "My heart..POUNDS!",
    "NOOOO!",
    "YESSS!",
    "noooooo",
    "yessss",
    "You're funny..",
]

    function displayMessage(message) {
        
    }


// function playRoun() {
//     let humanChoice = getHumanChoice();
//     let computerChoice = getComputerChoice();

    
//     if ((humanChoice === 'rock' || humanChoice === 'r') && computerChoice === 'Scissors') {
//         humanScore += 1
//         console.log('You win, boy. Rock beats scissors, duh.');
//         console.log(`Scores: You (unimpressive) ${humanScore}  Computer ${computerScore}`);
//         console.log('\n');

//     } else if ((humanChoice === 'scissors' || humanChoice === 's') && computerChoice === 'Paper') {
//         humanScore += 1
//         console.log('You win... unimpressive. Scissors beat paper genius.');
//         console.log(`Scores: You (ew) ${humanScore}  Computer ${computerScore}`);
//         console.log('\n');

//     } else if ((humanChoice === 'paper' || humanChoice === 'p') && computerChoice === 'Rock') {
//         humanScore += 1
//         console.log("You win, but you're still a loser.. Paper beats rock!");
//         console.log(`Scores: You (barf) ${humanScore}  Computer ${computerScore}`);
//         console.log('\n');

//     } else if (humanChoice === computerChoice.toLowerCase() || humanChoice === computerChoice[0].toLowerCase()) {
//         console.log(`Tie, for now.. ${humanChoice} clashes with ${computerChoice.toLowerCase()}!!!`);
//         console.log(`Scores: You (me?) ${humanScore}  Computer ${computerScore}`);
//         console.log('\n');
    
//     } else {

//         if (humanScore > 0) {
//             humanScore -= 1
//         }

//         computerScore += 1
//         console.log(`You suck! Haha, I knew you were a loser. ${computerChoice} beats ${humanChoice}!`);
//         console.log(`Scores: You (...) ${humanScore}  Computer ${computerScore}`);
//         console.log('\n');
//     };
// }