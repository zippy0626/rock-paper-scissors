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