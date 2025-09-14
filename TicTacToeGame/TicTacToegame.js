let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg"); 
let turnIndicator = document.querySelector("#turn-indicator");

let turnO = true;  


boxes.forEach((box, index) => {
    box.setAttribute("aria-label", `Cell ${index + 1}`);
});


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnIndicator.innerText = "Current Turn: O";
};


const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};


const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("X", "O", "winning-box");
    });
};


const showWinner = (winner, winningBoxes) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; 
    msgContainer.classList.remove("hide");
    disableBoxes();

    
    winningBoxes.forEach(index => {
        boxes[index].classList.add("winning-box");
    });
};


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1, pattern);
            return;
        }
    }

    
    const isDraw = [...boxes].every(box => box.innerText !== "");
    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("O");
            turnIndicator.innerText = "Current Turn: X";
        } else {
            box.innerText = "X";
            box.classList.add("X");
            turnIndicator.innerText = "Current Turn: O";
        }
        box.disabled = true;
        turnO = !turnO;
        checkWinner();
    });
});


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

