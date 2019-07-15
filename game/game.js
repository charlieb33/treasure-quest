const wallGridArr = [];
const hazardGridArr = [];
const treasureGridArr = [];
const playerPos = { x: 0, y: 0 };
const player = document.getElementById('hero');
const keys = [87, 38, 65, 37, 83, 40, 68, 39];
const walls = document.querySelectorAll('.wall');
const hazards = document.querySelectorAll('.hazard');
const treasures = document.querySelectorAll('.treasure');
const mainTreasure = document.getElementById('main');
const secretTreasure = document.getElementById('secret');
const text = document.querySelector('h1');
let playerGone = false;

walls[0].style.gridColumnStart = 1;
walls[0].style.gridColumnEnd = 3;
walls[0].style.gridRowStart = 2;
walls[0].style.gridRowEnd = 3;

walls[1].style.gridColumnStart = 5;
walls[1].style.gridColumnEnd = 6;
walls[1].style.gridRowStart = 1;
walls[1].style.gridRowEnd = 5;

walls[2].style.gridColumnStart = 2;
walls[2].style.gridColumnEnd = 3;
walls[2].style.gridRowStart = 3;
walls[2].style.gridRowEnd = 5;

walls[3].style.gridColumnStart = 2;
walls[3].style.gridColumnEnd = 3;
walls[3].style.gridRowStart = 6;
walls[3].style.gridRowEnd = 8;

walls[4].style.gridColumnStart = 5;
walls[4].style.gridColumnEnd = 6;
walls[4].style.gridRowStart = 6;
walls[4].style.gridRowEnd = 8;

walls[5].style.gridColumnStart = 8;
walls[5].style.gridColumnEnd = 9;
walls[5].style.gridRowStart = 2;
walls[5].style.gridRowEnd = 7;

walls[6].style.gridColumnStart = 11;
walls[6].style.gridColumnEnd = 12;
walls[6].style.gridRowStart = 1;
walls[6].style.gridRowEnd = 3;

walls[7].style.gridColumnStart = 11;
walls[7].style.gridColumnEnd = 13;
walls[7].style.gridRowStart = 5;
walls[7].style.gridRowEnd = 8;

walls[8].style.gridColumnStart = 6;
walls[8].style.gridColumnEnd = 8;
walls[8].style.gridRowStart = 3;
walls[8].style.gridRowEnd = 4;

hazards[0].style.gridColumnStart = 1;
hazards[0].style.gridColumnEnd = 2;
hazards[0].style.gridRowStart = 3;
hazards[0].style.gridRowEnd = 8;

hazards[1].style.gridColumnStart = 3;
hazards[1].style.gridColumnEnd = 4;
hazards[1].style.gridRowStart = 2;
hazards[1].style.gridRowEnd = 4;

hazards[2].style.gridColumnStart = 2;
hazards[2].style.gridColumnEnd = 3;
hazards[2].style.gridRowStart = 5;
hazards[2].style.gridRowEnd = 6;

hazards[3].style.gridColumnStart = 6;
hazards[3].style.gridColumnEnd = 7;
hazards[3].style.gridRowStart = 6;
hazards[3].style.gridRowEnd = 8;

hazards[4].style.gridColumnStart = 11;
hazards[4].style.gridColumnEnd = 12;
hazards[4].style.gridRowStart = 4;
hazards[4].style.gridRowEnd = 5;

hazards[5].style.gridColumnStart = 10;
hazards[5].style.gridColumnEnd = 11;
hazards[5].style.gridRowStart = 6;
hazards[5].style.gridRowEnd = 8;

hazards[6].style.gridColumnStart = 9;
hazards[6].style.gridColumnEnd = 10;
hazards[6].style.gridRowStart = 4;
hazards[6].style.gridRowEnd = 5;

hazards[7].style.gridColumnStart = 10;
hazards[7].style.gridColumnEnd = 11;
hazards[7].style.gridRowStart = 1;
hazards[7].style.gridRowEnd = 3;

hazards[8].style.gridColumnStart = 6;
hazards[8].style.gridColumnEnd = 8;
hazards[8].style.gridRowStart = 4;
hazards[8].style.gridRowEnd = 5;

mainTreasure.style.gridColumnStart = 12;
mainTreasure.style.gridColumnEnd = 13;
mainTreasure.style.gridRowStart = 2;
mainTreasure.style.gridRowEnd = 3;

secretTreasure.style.gridColumnStart = 6;
secretTreasure.style.gridColumnEnd = 7;
secretTreasure.style.gridRowStart = 2;
secretTreasure.style.gridRowEnd = 3;

function createWallGrid() {
  for (let i = 0; i < walls.length; i += 1) {
    const arrObj = {
      x1: parseInt(walls[i].style.gridColumnStart, 10),
      x2: parseInt(walls[i].style.gridColumnEnd, 10),
      y1: parseInt(walls[i].style.gridRowStart, 10),
      y2: parseInt(walls[i].style.gridRowEnd, 10),
    };
    wallGridArr.push(arrObj);
  }
  return wallGridArr;
}

function createTreasureGrid() {
  for (let i = 0; i < treasures.length; i += 1) {
    const arrObj = {
      x1: parseInt(treasures[i].style.gridColumnStart, 10),
      x2: parseInt(treasures[i].style.gridColumnEnd, 10),
      y1: parseInt(treasures[i].style.gridRowStart, 10),
      y2: parseInt(treasures[i].style.gridRowEnd, 10),
    };
    treasureGridArr.push(arrObj);
  }
  return treasureGridArr;
}

function createHazardGrid() {
  for (let i = 0; i < hazards.length; i += 1) {
    const arrObj = {
      x1: parseInt(hazards[i].style.gridColumnStart, 10),
      x2: parseInt(hazards[i].style.gridColumnEnd, 10),
      y1: parseInt(hazards[i].style.gridRowStart, 10),
      y2: parseInt(hazards[i].style.gridRowEnd, 10),
    };
    hazardGridArr.push(arrObj);
  }
  return hazardGridArr;
}

function makePlayerGridCoordinates(x, y) {
  const pos = {};
  pos.x1 = x + 1;
  pos.x2 = x + 2;
  pos.y1 = y + 1;
  pos.y2 = y + 2;
  return pos;
}

createWallGrid();
createHazardGrid();
createTreasureGrid();

const isInGrid = (x, y) => {
  if (x < 0 || y < 0 || x > 11 || y > 6) {
    return false;
  }
  return true;
};

const isBlockInWay = (pos) => {
  for (let i = 0; i < wallGridArr.length; i += 1) {
    if ((pos.x1 >= wallGridArr[i].x1 && pos.x2 <= wallGridArr[i].x2)
    && (pos.y1 >= wallGridArr[i].y1 && pos.y2 <= wallGridArr[i].y2)) {
      return true;
    }
  }
  return false;
};

const isHazardInWay = (pos) => {
  for (let i = 0; i < hazardGridArr.length; i += 1) {
    if ((pos.x1 >= hazardGridArr[i].x1 && pos.x2 <= hazardGridArr[i].x2)
    && (pos.y1 >= hazardGridArr[i].y1 && pos.y2 <= hazardGridArr[i].y2)) {
      return true;
    }
  }
  return false;
};

const isTreasureInWay = (pos) => {
  for (let i = 0; i < treasureGridArr.length; i += 1) {
    if ((pos.x1 === treasureGridArr[i].x1 && pos.x2 === treasureGridArr[i].x2)
    && (pos.y1 === treasureGridArr[i].y1 && pos.y2 === treasureGridArr[i].y2)) {
      return true;
    }
  }
  return false;
};

const removeTreasure = () => {
  for (let i = 0; i < treasures.length; i += 1) {
    treasures[i].remove();
  }
};

const removePlayer = () => {
  player.remove();
  playerGone = true;
};

const isAbleToMove = (x, y) => {
  if (!isInGrid(x, y) || isBlockInWay(makePlayerGridCoordinates(x, y))) {
    return false;
  }
  return true;
};

function moveThePlayer(x, y) {
  player.style.left = `${playerPos.x * 100}px`;
  player.style.top = `${playerPos.y * 100}px`;
  if (isTreasureInWay(makePlayerGridCoordinates(x, y))) {
    removePlayer();
    removeTreasure();
    text.innerText = 'WAY TO GO!';
  }
  if (isHazardInWay(makePlayerGridCoordinates(x, y))) {
    removePlayer();
    text.innerText = 'GAME OVER';
  }
}

function goUp() {
  if (isAbleToMove(playerPos.x, playerPos.y - 1)) {
    playerPos.y -= 1;
    moveThePlayer(playerPos.x, playerPos.y);
  }
}

function goLeft() {
  if (isAbleToMove(playerPos.x - 1, playerPos.y)) {
    playerPos.x -= 1;
    moveThePlayer(playerPos.x, playerPos.y);
  }
}

function goDown() {
  if (isAbleToMove(playerPos.x, playerPos.y + 1)) {
    playerPos.y += 1;
    moveThePlayer(playerPos.x, playerPos.y);
  }
}

function goRight() {
  if (isAbleToMove(playerPos.x + 1, playerPos.y)) {
    playerPos.x += 1;
    moveThePlayer(playerPos.x, playerPos.y);
  }
}

document.body.addEventListener('keydown', (evt) => {
  const { keyCode } = evt;
  if (playerGone === false) {
    if (keys.includes(keyCode)) {
      evt.preventDefault();
    }
    if (keyCode === 87 || keyCode === 38) {
      goUp();
    } else if (keyCode === 65 || keyCode === 37) {
      goLeft();
    } else if (keyCode === 83 || keyCode === 40) {
      goDown();
    } else if (keyCode === 68 || keyCode === 39) {
      goRight();
    }
  }
});
