import "/styles/style.scss";

let board = document.querySelector("#board");
let blocks = document.querySelectorAll(".block");
let reset = document.querySelector(".reset");
let crossPlayer = "cross";
let circlePlayer = "circle";
let crossTurn;
let winner;

let allwincombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initBoard();

reset.addEventListener("click", () => {
  initBoard();
});

function initBoard() {
  crossTurn = Math.random() >= 0.5;
  blocks.forEach((block) => {
    document.querySelector("#info").style.display = `none`;
    block.classList.remove(circlePlayer);
    block.classList.remove(crossPlayer);
    block.classList.remove("win");
    board.classList.remove("disabled");
    block.removeEventListener("click", handleClick);
    block.removeEventListener('touchstart', handleClick)
    block.addEventListener("click", handleClick);
    block.addEventListener('touchstart', handleClick)
  });
  setBoard();
}

function handleClick(e) {
  e.preventDefault();
  let block = e.target;
  let currentTurn = crossTurn ? crossPlayer : circlePlayer;
  playBlock(block, currentTurn);

  if (checkWin(currentTurn)) {
    gameEnd(currentTurn);
    winner.forEach((winner, i) => {
      setTimeout(() => {
        blocks[winner].classList.add("win");
      }, i * 100);
    });
    board.classList.add("disabled");
  } else if (checkDraw()) {
    gameDraw();
  } else {
    switchTurn();
    setBoard();
  }
}

function playBlock(block, currentTurn) {
  block.classList.add(currentTurn);
}

function switchTurn() {
  crossTurn = !crossTurn;
}

function setBoard() {
  board.classList.remove(crossPlayer);
  board.classList.remove(circlePlayer);
  if (crossTurn) {
    board.classList.add(crossPlayer);
  } else {
    board.classList.add(circlePlayer);
  }
}

function checkDraw() {
  return Array.from(blocks).every((block) => {
    return (
      block.classList.contains(crossPlayer) ||
      block.classList.contains(circlePlayer)
    );
  });
}

function checkWin(currentTurn) {
  return allwincombos.some((combo) => {
    return combo.every((index) => {
      winner = combo;
      return blocks[index].classList.contains(currentTurn);
    });
  });
}

function gameEnd(currentTurn) {
  setTimeout(() => {
    document.querySelector("#info").style.display = `flex`;
    document.querySelector(
      ".endMessage"
    ).innerText = `${currentTurn.toUpperCase()} Wins the Game`;
  }, 400);
}
function gameDraw() {
  document.querySelector("#info").style.display = `flex`;
  document.querySelector(".endMessage").innerText = `Game is a Draw`;
}
