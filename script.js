//declare the variables

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const playAgain = document.querySelector("#playAgain");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//array of placeholders - nine empty strings one for each cell

let options = ["", "", "", "", "", "", "", "", ""];
//keep track of the current player

let currentPlayer = "X";
// keep track of the game status

let running = false;

initializeGame();
function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  playAgain.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);

  checkWinner();
}

function updateCell(cell, index) {
  //update the placeholders
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn.`;
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    //check for empty spaces
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    //check for same characters/winner
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn.`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
