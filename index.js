"use strict";

const squares = document.getElementsByClassName("square");

const newGameBtn = document.getElementById("new-game-btn");

const scoreEl = document.getElementById("score-el");
const clearBtn = document.getElementById("clear-btn");

const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");

const popupEl = document.getElementById("popup-el");
const popupClose = document.getElementById("popup-close");
const winnerEl = document.getElementById("winner-el");

const emojis = ["🥳", "🤗", "🫡", "🤩", "😍", "🙌", "👏", "🙏", "💅", "🙆‍♀️", "💁‍♀️", "👀", "✨", "🏆", "🔥", "💃", "🎉"];
let randomEmoji = "";

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

render();

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
        squares[i].classList.add("no-hover");
        if (squares[i].textContent === "" && isOver === false) {
            squares[i].textContent = currentPlayer;
            setColor(squares[i]);

            board[i] = currentPlayer;

            checkWin();
            if (!isOver) {
                checkTie();
            }

            currentPlayer = getCurrentPlayer(currentPlayer);
        }
        if (isOver) {
            for (let j = 0; j < squares.length; j++) {
                squares[j].classList.add("no-hover");
            }
        }
    });
}

function checkWin() {
    for (let winCondition of winConditions) {
        if (board[winCondition[0]] === board[winCondition[1]] && board[winCondition[1]] === board[winCondition[2]] && board[winCondition[0]] !== null) {
            isOver = true;

            localStorage.setItem(currentPlayer, JSON.stringify(Number(localStorage.getItem(currentPlayer)) + 1));

            popup(true);
            render();
        }
    }
}

function checkTie() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            return;
        }
    }
    isOver = true;
    popup(false);
}

function getRandomEmoji() {
    randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    return randomEmoji;
}

function popup(isWinner) {
    popupEl.style.display = "block";
    if (isWinner) {
        winnerEl.textContent = `The winner is: ${currentPlayer} ${getRandomEmoji()}`;
    } else {
        winnerEl.textContent = `It's a tie! ${getRandomEmoji()}`;
    }
}

function closePopup() {
    popupEl.style.display = "none";
}

popupClose.addEventListener("click", closePopup);

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

newGameBtn.addEventListener("click", function () {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
        squares[i].classList.remove("no-hover");
    }
    closePopup();

    currentPlayer = "X";
    isOver = false;
    board = Array(9).fill(null);
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
        square.style.color = "#ff006e";
    } else {
        square.style.color = "#ffbe0b";
    }
}