const squares = document.getElementsByClassName("square");

const newGameBtn = document.getElementById("new-game-btn");

const scoreEl = document.getElementById("score-el");
const clearBtn = document.getElementById("clear-btn");

const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");

const popupEl = document.getElementById("popup-el");
const popupClose = document.getElementById("popup-close");
const winnerEl = document.getElementById("winner-el");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = "X";
let board = Array(9).fill(null);
let isOver = false;

let xWins = localStorage.getItem("X");
let oWins = localStorage.getItem("O");

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
        if (squares[i].textContent === "" && isOver === false) {
            squares[i].textContent = currentPlayer;
            setColor(squares[i]);

            board[i] = currentPlayer;
            console.log(board);

            checkWin();

            currentPlayer = getCurrentPlayer(currentPlayer);
        }
    });
}

function checkWin() {
    for (let winCondition of winConditions) {
        if (board[winCondition[0]] === board[winCondition[1]] && board[winCondition[1]] === board[winCondition[2]] && board[winCondition[0]] !== null) {
            isOver = true;

            if (currentPlayer === "X") {
                xWins++;
                localStorage.setItem("X", JSON.stringify(xWins));
            } else {
                oWins++;
                localStorage.setItem("O", JSON.stringify(oWins));
            }
            render();
        }
    }
}

function render() {
    if (localStorage.getItem("X") === null) {
        localStorage.setItem("X", JSON.stringify(0));
    }
    if (localStorage.getItem("O") === null) {
        localStorage.setItem("O", JSON.stringify(0));
    }
    xScore.textContent = localStorage.getItem("X");
    oScore.textContent = localStorage.getItem("O");
}

render();

newGameBtn.addEventListener("click", function () {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
    }
    currentPlayer = "X";
    isOver = false;
    board = Array(9).fill(null);
    console.log(board);
});

clearBtn.addEventListener("click", function () {
    localStorage.clear();
    render();
});

function getCurrentPlayer(player) {
    if(player === "X") {
        return "O";
    }
    return "X";
}

function setColor (square) {
    if (currentPlayer === "X") {
        square.style.color = "#62B2D7";
    } else {
        square.style.color = "#ffe66d";
    }
}