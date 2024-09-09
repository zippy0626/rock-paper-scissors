// Sleep Function
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

// Rounds Resetter and round count
let currentRoundNumber = 0;

    function updateRound() {
        const rounds = document.querySelector('.rounds');
        rounds.textContent = `Round ${currentRoundNumber}`
    }

    function resetRounds() {
        const rounds = document.querySelector('.rounds');
        rounds.textContent = `Round 0`
    }
//

// Initiate Player Choice
let playerChoice = "";


// Initiate Score Counters
let hScore = 0
let cScore = 0

    // This changes DOM everytime you call it. 
    // So every time update score, call this function
    function updateScore() {
        let humanScore = document.querySelector('.human-score');
        let computerScore = document.querySelector('.computer-score');
        computerScore.textContent = `Bot:${cScore}`
        humanScore.textContent = `You:${hScore}`
    }

    function resetScores() {
        let humanScore = document.querySelector('.human-score');
        let computerScore = document.querySelector('.computer-score');
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

// async function
async function startGame(event) {
    if (event.code !== 'Space' && event.key !== ' ') {
        return;
    }
    
    resetScores();
    resetRounds();
    
    currentRoundNumber += 1
    updateRound()
    
    outputDisplay.style.visibility = ""; // Make style unhidden (from blinking)

    // Get Player Choice
    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Rock' || button.textContent === 'Paper' || button.textContent === 'Scissors') {
                playerChoice = button.textContent
            }
        });
    });
    //

    let items = ['Rock!', 'Paper!', 'Scissors!', 'Shoot!'];

    // Countdown
    for (let i = 0; i < items.length; i++) {
        // Check if Player is too early
        if (items[i] !== 'Shoot!' && playerChoice !== "") {
                outputDisplay.textContent = `Too Early!`;
                cScore += 1
                updateScore()
                await sleep(2000)
                showResultScreen()
                return
        };
        outputDisplay.textContent = `${items[i]}`;
        await sleep(500);
    }
    await sleep(1500); // 1.5 sec timeframe

    // Player misses
    if (playerChoice === '') { 
        outputDisplay.textContent = `Too Late!`;

        cScore += 1
        updateScore()
        await sleep(2500)
        showResultScreen()
    } else {
        calculateWinner();
    }
}

// eventListener only executes once
body.addEventListener('keydown', startGame, { once: true }); 
// This makes it so the AEL occurs once, not the function itself
// So you can reuse the function


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

// outputDisplay
const continueDisplay = document.querySelector('.continue');
const confirmDisplay = document.querySelector('.confirm');

function calculateWinner() {

    // Use showResultScreen in this function as well as the Too Late screen
    let computerChoice = getComputerChoice()

    // Wins + Draw + Loose for Player
    if (computerChoice === playerChoice) {
        outputDisplay.textContent = `
        Tie! ${playerChoice} clashes with ${computerChoice}!
        `
        showResultScreen()
    } else if (playerChoice === 'Rock' && computerChoice === 'Scissors') {
        outputDisplay.textContent = `
        You win!!
        `
        hScore += 1
        updateScore()
        showResultScreen()
    } else if (playerChoice === 'Paper' && computerChoice === 'Rock') {
        outputDisplay.textContent = `
        You..win..
        `
        hScore += 1
        updateScore()
        showResultScreen()
    } else if (playerChoice === 'Scissors' && computerChoice === 'Paper') {
        outputDisplay.textContent = `
        Did you..win?
        `
        hScore += 1
        updateScore()
        showResultScreen()
    } else {
        outputDisplay.textContent = `
        YOU LOST!
        `
        cScore += 1
        updateScore()
        showResultScreen()
    };
}

// Show Results
async function showResultScreen() {
    await sleep(2000)
    outputDisplay.style.display = 'none';
    continueDisplay.style.display = 'flex';
}
//


// Continue Event Handlers
const continueYes = document.querySelector('.continue-yes');
const continueNo = document.querySelector('.continue-no');

    // Click Yes
async function continueGame() {
    // Reset
    playerChoice = ""

    currentRoundNumber+=1
    updateRound()
    
    outputDisplay.style.display = 'flex';
    continueDisplay.style.display = 'none';

    // Get Player Choice
    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Rock' || button.textContent === 'Paper' || button.textContent === 'Scissors') {
                playerChoice = button.textContent
            }
        });
    });
    //
    
    let items = ['Rock!', 'Paper!', 'Scissors!', 'Shoot!'];
    
    // Countdown
    for (let i = 0; i < items.length; i++) {
        // Check if Player is too early
        if (items[i] !== 'Shoot!' && playerChoice !== "") {
            outputDisplay.textContent = `Too Early!`;
            cScore += 1
            updateScore()
            await sleep(2000)
            showResultScreen()
            return
        };
        outputDisplay.textContent = `${items[i]}`;
        await sleep(500);
    }
    await sleep(1500);
    
    if (playerChoice === '') { //Player misses
        outputDisplay.textContent = `Too Late!`;

        cScore += 1
        updateScore()
        await sleep(2500)
        showResultScreen()
    } else {
        calculateWinner();
    }
}
continueYes.addEventListener('click', continueGame);


// Click No
function showConfirmScreen() {
    outputDisplay.style.display = 'none';
    continueDisplay.style.display = 'none';
    confirmDisplay.style.display = 'flex';
}

continueNo.addEventListener('click', showConfirmScreen);
//



// Confirm Event Handlers
const confirmYes = document.querySelector('.confirm-yes');
const confirmNo = document.querySelector('.confirm-no');


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
