// Sleep Function
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

// Flag used to check if game is running
let isGameRunning = true;

// Rounds Resetter and round count
let currentRoundNumber = 0;

    function updateRound() {
        const rounds = document.querySelector('.rounds');
        rounds.textContent = `Round ${currentRoundNumber}`
    }

    function resetRounds() {
        currentRoundNumber = 0
        const rounds = document.querySelector('.rounds');
        rounds.textContent = `Round ?`
    }
//

// Initiate Player Choice
let playerChoice = "";


// Initiate Score Counters
let hScore = 0;
let cScore = 0;

async function checkWinner() {
    if (cScore >= 5) {
        isGameRunning = false;
        await sleep(1500)
        showWinnerMenu()
        return
    }
    
    if (hScore >= 5) {
        isGameRunning = false;
        await sleep(1500)
        showWinnerMenu()
        return
    } 
}

    // This changes DOM everytime you call it. 
    // So every time update score, call this function
    function updateScore() {
        let humanScore = document.querySelector('.human-score');
        let computerScore = document.querySelector('.computer-score');
        computerScore.textContent = `Bot:${cScore}`
        humanScore.textContent = `You:${hScore}`
    }

    function resetScores() {
        hScore = 0;
        cScore = 0;
        let humanScore = document.querySelector('.human-score');
        let computerScore = document.querySelector('.computer-score');
        humanScore.textContent = `You:0`
        computerScore.textContent = `Bot:0`
    }
//


// Displays that will be turned off with 'none'
const mainDisplay = document.querySelector('.main-display');
const continueMenu = document.querySelector('.continue-menu');
const winnerMenu = document.querySelector('.winner-menu');
const resetMenu = document.querySelector('.reset-menu');
//


// Blink Effect
const blinkSpeedMs = 800
const t = setInterval(() => {
    if (mainDisplay.textContent.trim() === "Press SPACE to start..") { // If its something else, stop blink effect
        mainDisplay.style.visibility = (mainDisplay.style.visibility === "hidden" ? "visible" : "hidden");
    }
}, blinkSpeedMs);
//


// Start Game
const body = document.querySelector('body');
async function startGame(event) {

    if (event.code !== 'Space' && event.key !== ' ') {
        return;
    }
    
    resetScores();
    resetRounds();
    
    currentRoundNumber += 1
    updateRound()
    
    mainDisplay.style.visibility = ""; // Make style unhidden (from blinking)

    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Rock' || button.textContent === 'Paper' || button.textContent === 'Scissors') {
                playerChoice = button.textContent
            }
        });
    });

    let items = ['Rock!', 'Paper!', 'Scissors!', 'Shoot!'];
    for (let i = 0; i < items.length; i++) {
        if (!isGameRunning) {
            return;
        }

        if (items[i] !== 'Shoot!' && playerChoice !== "") {
                mainDisplay.textContent = `Too Early!`;
                cScore += 1
                updateScore()
                await sleep(2000)
                showContinueMenu()
                return
        };
        mainDisplay.textContent = `${items[i]}`;
        await sleep(500);
    }

    await sleep(1500);

    if (playerChoice === '') { 
        mainDisplay.textContent = `Too Late!`;

        cScore += 1
        updateScore()

        await sleep(2500)
        showContinueMenu()

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


// Calculate winner after each round
async function calculateWinner() {

    checkWinner()
    if (!isGameRunning) {
        return;
    }

    let computerChoice = getComputerChoice()

    // Wins + Draw + Loose for Player
    if (computerChoice === playerChoice) {
        mainDisplay.textContent = `
        Tie! ${playerChoice} clashes with ${computerChoice}!
        `
        await sleep(2000)
        showContinueMenu()
    } else if (playerChoice === 'Rock' && computerChoice === 'Scissors') {
        mainDisplay.textContent = `
        You win!!
        ${playerChoice} beats ${computerChoice}!
        `
        hScore = hScore + 1
        updateScore()
        await sleep(2000)
        showContinueMenu()
    } else if (playerChoice === 'Paper' && computerChoice === 'Rock') {
        mainDisplay.textContent = `
        You..win..
        ${playerChoice} beats ${computerChoice}?
        `
        hScore = hScore + 1
        updateScore()
        await sleep(2000)
        showContinueMenu()
    } else if (playerChoice === 'Scissors' && computerChoice === 'Paper') {
        mainDisplay.textContent = `
        Did you..win?
        ${playerChoice} beats ${computerChoice}!!
        `
        hScore = hScore + 1
        updateScore()
        await sleep(2000)
        showContinueMenu()
    } else {
        mainDisplay.textContent = `
        YOU LOST!
        ${computerChoice} beats ${playerChoice}! L
        `
        cScore += 1
        updateScore()
        await sleep(2000)
        showContinueMenu()
    };
}

async function showNoMenus() {
    mainDisplay.style.display = 'none';
    winnerMenu.style.display = 'none';
    resetMenu.style.display = 'none';
    continueMenu.style.display = 'none';
}

async function showContinueMenu() {
    await sleep(100) // Account for the Main Display showing to player
    mainDisplay.style.display = 'none';
    winnerMenu.style.display = 'none';
    resetMenu.style.display = 'none';
    continueMenu.style.display = 'flex';
}

async function showResetMenu() {
    isGameRunning = false;
    await sleep(100)
    mainDisplay.style.display = 'none';
    winnerMenu.style.display = 'none';
    continueMenu.style.display = 'none';
    resetMenu.style.display = 'flex';
}

async function showWinnerMenu() {
    let playerOutcome = document.querySelector('.player-outcome');
    await sleep(100)
    mainDisplay.style.display = 'none';
    continueMenu.style.display = 'none';
    resetMenu.style.display = 'none';
    winnerMenu.style.display = 'flex';

    // Check if Player Bail early
    if (cScore >= 5 || hScore <= cScore) {
        playerOutcome.textContent = "You Lost!"
    } else if (hScore >= 5) {
        playerOutcome.textContent = "You Win!"
    } 
}



// CONTINUE MENU EVENT HANDLERS FOR Y OR N
const continueMenuYes = document.querySelector('.continue-menu-yes');
const continueMenuNo = document.querySelector('.continue-menu-no');

async function continueGame() {
    isGameRunning = true;

    playerChoice = ''

    checkWinner()
    if (!isGameRunning) {
        return;
    }

    currentRoundNumber += 1
    updateRound()
    
    mainDisplay.style.display = 'flex';
    winnerMenu.style.display = 'none';
    continueMenu.style.display = 'none';
    resetMenu.style.display = 'none'

    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Rock' || button.textContent === 'Paper' || button.textContent === 'Scissors') {
                playerChoice = button.textContent
            }
        });
    });

    let items = ['Rock!', 'Paper!', 'Scissors!', 'Shoot!'];
    for (let i = 0; i < items.length; i++) {
        if (!isGameRunning) {
            return;
        }
        
        if (items[i] !== 'Shoot!' && playerChoice !== "") { // Player Too Early
            mainDisplay.textContent = `Too Early!`;
            cScore += 1
            updateScore()
            await sleep(2000)
            
            checkWinner()
            if (!isGameRunning) {
                return;
            }

            showContinueMenu()
            return
        };
        
        mainDisplay.textContent = `${items[i]}`;
        await sleep(500);
    }

    await sleep(1500);

    if (playerChoice === '') { // Player Choice Empty
        mainDisplay.textContent = `Too Late!`;

        cScore += 1
        updateScore()

        checkWinner()
        if (!isGameRunning) {
            return;
        }

        await sleep(2500)
        showContinueMenu()
        return
    } else { // Player clicked
        checkWinner()
        if (!isGameRunning) {
            return;
        }
        
        calculateWinner();
        return
    }
}

continueMenuNo.addEventListener('click', showWinnerMenu);
continueMenuYes.addEventListener('click', continueGame);



// RESET MENU EVENT HANDLERS FOR Y N
const resetMenuYes = document.querySelector('.reset-menu-yes');
const resetMenuNo = document.querySelector('.reset-menu-no');

resetMenuNo.addEventListener('click', showContinueMenu);
// resetMenuYes.addEventListener('click', () => {
    
// }); // Reset to Start Menu



// WINNER MENU EVENT HANDLERS FOR Y N
const winnerMenuYes = document.querySelector('.winner-menu-yes');
const winnerMenuNo = document.querySelector('.winner-menu-no');

winnerMenuYes.addEventListener('click', () => { // New Game
    resetRounds()
    resetScores()
    continueGame()
});
// winnerMenuNo.addEventListener('click', ); // Reset to Start Menu



// RESET BUTTON
const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => {
    isGameRunning = false;
    showResetMenu()
});


// RESET TO START MENU
async function resetToStartMenu() {
    
}



// MESSAGES 
const messages = [
    "Dang..You Suck!",
    "Just quit bro!",
    "GG NO RE!",
    "Stop..the HORROR!",
    "Stop..the BEAUTY!",
    "I C U",
    "<3",
    "U SUK!",
    "UwU",
    "That was fun, right?",
    "...",
    "Choose rock!",
    "Choose paper!",
    "Choose scissors!",
    "U win??",
    "U LOZE!",
    "Prepare to Win!",
    "Prepare to Lose!",
    "nooooob",
    "Dang..You good!",
    "#&#@^$@@#",
    "OMGG!",
    "why u keep lose?",
    "why u keep win?",
    "Surrender!",
    "FF FF FF!",
    "Take a hike..",
    "I've seen enough",
    "My heart..POUNDS!",
    "My stomach..GROWLS!",
    "Scary!",
    "BoOOOoOoOO",
    "NOOOO!",
    "YESSS!",
    "noooooo",
    "yessss",
    "You're funny..",
    "BUM!",
    "P U !",
    "Stinky..",
    "I bet you like cheese",
    "jajajaja",
    "HAHA!",
    "Cheat Code: RPPSRSP",
]

// From MDN Docs
function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min); //Round Number
}

const message = document.querySelector('.message');
async function displayMessage() {
    const message = document.querySelector('.message');
    let currentMsgIndex = getRandomArbitrary(0, messages.length - 1);

    message.textContent = messages[currentMsgIndex]
}

// Change Message Every Interval
const changeMsg = setInterval(() => {
    displayMessage();
}, 15000);