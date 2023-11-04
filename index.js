const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Set the background color to black
ctx.fillStyle = "black";

// Fill the entire canvas with the black color
ctx.fillRect(0, 0, canvas.width, canvas.height);


class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;
let highScore = 0; // Initialize high score
let isGameOver = false;

const gulpSound = new Audio("pixel-sound-effect-4-82881.mp3");

// Game loop
function drawGame() {
  if (!isGameOver) {
    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;

    changeSnakePosition();
    if (!checkGameover()) {
      clearScreen();

      checkAppleCollision();
      drawApple();
      drawSnake();

      drawScore();

      if (score > 5) {
        speed = 9;
      }
      if (score > 10) {
        speed = 11;
      }
    }
  }

  setTimeout(drawGame, 1000 / speed);
}

function checkGameover() {
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
    isGameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      isGameOver = true;
      break;
    }
  }

  if (isGameOver) {
    restartGame();
  }

  return isGameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX += xVelocity;
  headY += yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    gulpSound.play();

    // Update the high score if the current score is higher
    if (score > highScore) {
      highScore = score;
    }
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  if (event.keyCode === 38 || event.keyCode === 87) {
    if (inputsYVelocity === 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  if (event.keyCode === 40 || event.keyCode === 83) {
    if (inputsYVelocity === -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  if (event.keyCode === 37 || event.keyCode === 65) {
    if (inputsXVelocity === 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  if (event.keyCode === 39 || event.keyCode === 68) {
    if (inputsXVelocity === -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }

  if (event.keyCode === 32) {
    if (isGameOver) {
      restartGame();
      isGameOver = false;
    }
  }
}

function restartGame() {
  headX = 10;
  headY = 10;
  snakeParts.length = 0;
  tailLength = 2;
  appleX = 5;
  appleY = 5;
  inputsXVelocity = 0;
  inputsYVelocity = 0;
  xVelocity = 0;
  yVelocity = 0;
  score = 0;
  isGameOver = false;
}

drawGame();
