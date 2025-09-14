// Track scores
let userScore = 0;
let compScore = 0;

// DOM elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const compChoiceDisplay = document.querySelector("#comp-choice-display");
const resetBtn = document.querySelector("#reset-btn");

// Generate computer's random choice
const genCompchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// Handle draw condition
const drawGame = () => {
    msg.innerText = "It's a Draw. Play again.";
    msg.style.backgroundColor = "#081b31";
};

// Display who won the round and update score
const showWinner = (userWin, userChoice, compChoice) => {
    // Show computer's choice to user
    compChoiceDisplay.innerText = `Computer chose: ${compChoice}`;

    // Highlight user's selected choice briefly
    const userDiv = document.getElementById(userChoice);
    userDiv.classList.add("win");
    setTimeout(() => {
        userDiv.classList.remove("win");
    }, 500);

    // Update score and display message
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lost! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }

    // Check if game has ended (score 5)
    if (userScore === 5 || compScore === 5) {
        msg.innerText = userScore === 5 ? "🎉 You won the game!" : "😢 Computer won the game.";
        choices.forEach(choice => choice.style.pointerEvents = "none"); // Disable further moves
    }
};

// Main game logic on user click
const playGame = (userChoice) => {
    const compChoice = genCompchoice();

    // Check draw
    if (userChoice === compChoice) {
        drawGame();
    } else {
        // Determine if user wins
        let userWin = true;

        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, compChoice);
    }
};

// Add event listeners to all choices
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Reset game when reset button is clicked
resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = 0;
    compScorePara.innerText = 0;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";
    compChoiceDisplay.innerText = "Computer chose: ?";
    choices.forEach(choice => choice.style.pointerEvents = "auto"); // Re-enable choices
});
