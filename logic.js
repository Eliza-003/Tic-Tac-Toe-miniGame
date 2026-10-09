const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartBtn = document.querySelector("#restartBtn");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Initialize event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

// Handle clicking a cell
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  // Ignore click if cell is already filled or game is over
  if (board[index] !== "" || !isGameActive) {
    return;
  }

  // Update cell in array and UI
  updateCell(cell, index);
  checkResult();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  let roundWon = false;

  // Check all winning patterns
  for (let i = 0; i < winPatterns.length; i++) {
    const pattern = winPatterns[i];
    const a = board[pattern[0]];
    const b = board[pattern[1]];
    const c = board[pattern[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    isGameActive = false;
  } else if (!board.includes("")) {
    // If no empty spaces left and no winner
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
  } else {
    switchPlayer();
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}
