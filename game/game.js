/* eslint-disable */

const wallGridArr = []
const hazardGridArr = []
const treasureGridArr = []
const playerPos = {x: 0, y: 0}
const player = document.getElementById('hero');
const keys = [87, 38, 65, 37, 83, 40, 68, 39]
const walls = document.querySelectorAll('.wall')
const hazards = document.querySelectorAll('.hazard')
const treasure = document.getElementById('treasure')

walls[0].style.gridColumnStart = 1
walls[0].style.gridColumnEnd = 3
walls[0].style.gridRowStart = 2
walls[0].style.gridRowEnd = 3

walls[1].style.gridColumnStart = 5
walls[1].style.gridColumnEnd = 6
walls[1].style.gridRowStart = 1
walls[1].style.gridRowEnd = 5

walls[2].style.gridColumnStart = 2
walls[2].style.gridColumnEnd = 3
walls[2].style.gridRowStart = 2
walls[2].style.gridRowEnd = 5

walls[3].style.gridColumnStart = 2
walls[3].style.gridColumnEnd = 3
walls[3].style.gridRowStart = 6
walls[3].style.gridRowEnd = 8

walls[4].style.gridColumnStart = 5
walls[4].style.gridColumnEnd = 6
walls[4].style.gridRowStart = 6
walls[4].style.gridRowEnd = 8

walls[5].style.gridColumnStart = 8
walls[5].style.gridColumnEnd = 9
walls[5].style.gridRowStart = 1
walls[5].style.gridRowEnd = 7

walls[6].style.gridColumnStart = 11
walls[6].style.gridColumnEnd = 12
walls[6].style.gridRowStart = 1
walls[6].style.gridRowEnd = 3

walls[7].style.gridColumnStart = 11
walls[7].style.gridColumnEnd = 13
walls[7].style.gridRowStart = 5
walls[7].style.gridRowEnd = 7

walls[8].style.gridColumnStart = 6
walls[8].style.gridColumnEnd = 8
walls[8].style.gridRowStart = 1
walls[8].style.gridRowEnd = 3

hazards[0].style.gridColumn = 1
hazards[0].style.gridRow = 5

hazards[1].style.gridColumn = 10
hazards[1].style.gridRow = 1

hazards[2].style.gridColumn = 9
hazards[2].style.gridRow = 7

treasure.style.gridColumnStart = 12
treasure.style.gridColumnEnd = 13
treasure.style.gridRowStart = 3
treasure.style.gridRowEnd = 4

function createWallGrid() {
    for (let i = 0; i < walls.length; i++) {
        let arrObj = {
            x1: parseInt(walls[i].style.gridColumnStart),
            x2: parseInt(walls[i].style.gridColumnEnd),
            y1: parseInt(walls[i].style.gridRowStart),
            y2: parseInt(walls[i].style.gridRowEnd),
        }
        wallGridArr.push(arrObj)
    }
    return wallGridArr
}

function createTreasureGrid() {
    let arrObj = {
        x1: parseInt(treasure.style.gridColumnStart),
        x2: parseInt(treasure.style.gridColumnEnd),
        y1: parseInt(treasure.style.gridRowStart),
        y2: parseInt(treasure.style.gridRowEnd)
    }
    treasureGridArr.push(arrObj)
    return treasureGridArr
}

function createHazardGrid() {
    for (let i = 0; i < hazards.length; i++) {
        let arrObj = {
            x: parseInt(hazards[i].style.gridColumn),
            y: parseInt(hazards[i].style.gridRow),
        }
        hazardGridArr.push(arrObj)
    }
    return hazardGridArr
}

function makePlayerGridCoordinates(x, y) {
    let pos = {}
    pos.x1 = x + 1
    pos.x2 = x + 2
    pos.y1 = y + 1
    pos.y2 = y + 2
    return pos
}

createWallGrid()
createHazardGrid()
createTreasureGrid()

const isInGrid = function(x, y) {
    if (x < 0 || y < 0 || x > 11 || y > 6) {
        return false
    }
    return true
}

const isBlockInWay = function(pos) {
    for (let i = 0; i < wallGridArr.length; i++) {
        if ((pos.x1 >= wallGridArr[i].x1 && pos.x2 <= wallGridArr[i].x2) && (pos.y1 >= wallGridArr[i].y1 && pos.y2 <= wallGridArr[i].y2)) {
            return true
        }
    }
    return false
}

const isHazardInWay = function(pos) {
    console.log('hazard')
    for (let j = 0; j < hazardGridArr.length; j++) {
        if ((pos.x1 >= hazardGridArr[j].x && pos.x2 <= hazardGridArr[j].x) && (pos.y1 >= hazardGridArr[j].y && pos.y2 <= hazardGridArr[j].y)) {
            return true
        }
    }
    return false
}

const isTreasureInWay = function(pos) {
    for (let k = 0; k < treasureGridArr.length; k++) {
        if ((pos.x1 === treasureGridArr[k].x1 && pos.x2 === treasureGridArr[k].x2) && (pos.y1 === treasureGridArr[k].y1 && pos.y2 === treasureGridArr[k].y2)) {
            return true
        }
    }
    return false
}

const removeTreasure = function() {}

const removePlayer = function() {}

const isAbleToMove = function(x, y) {
    if (!isInGrid(x, y) || isBlockInWay(makePlayerGridCoordinates(x, y))) {
        return false
    }
    return true
}

const moveThePlayer = function(x, y) {
    player.style.left = (playerPos.x * 100) + 'px';
    player.style.top = (playerPos.y * 100) + 'px';
    if (isTreasureInWay(makePlayerGridCoordinates(x, y))) {
        alert("Congratulations! You found the treasure!")
    }
    if (isHazardInWay(makePlayerGridCoordinates(x, y))) {
        alert("GAME OVER")
    }
}

function goUp() {
    if(isAbleToMove(playerPos.x, playerPos.y - 1)) {
        playerPos.y -= 1;
        moveThePlayer(playerPos.x, playerPos.y);
    }
}

function goLeft() {
    if(isAbleToMove(playerPos.x - 1, playerPos.y)) {
        playerPos.x -= 1;
        moveThePlayer(playerPos.x, playerPos.y);
    }
}

function goDown() {
    if(isAbleToMove(playerPos.x, playerPos.y + 1)) {
        playerPos.y += 1;
        moveThePlayer(playerPos.x, playerPos.y);
    }
}

function goRight() {
    if(isAbleToMove(playerPos.x + 1, playerPos.y)) {
        playerPos.x += 1;
        moveThePlayer(playerPos.x, playerPos.y);
    }
}

document.body.addEventListener('keydown', function(evt) {
    const keyCode = evt.keyCode;
    if (keys.includes(keyCode)) {
        evt.preventDefault();
    }
    if (keyCode === 87 || keyCode === 38) {
        goUp()
    }
    else if (keyCode === 65 || keyCode === 37) {
        goLeft()
    }
    else if (keyCode === 83 || keyCode === 40) {
        goDown()
    }
    else if (keyCode === 68 || keyCode === 39) {
        goRight()
    }
})

// setInterval(function(){
//     let element = document.getElementById('hazard-one');
//     let elementCoordiantes = element.getBoundingClientRect();
//     console.log('HAZARD_ONE:', elementCoordiantes.x, elementCoordiantes.y)

//     let hero = document.getElementById('hero')
//     let heroCoordinates = hero.getBoundingClientRect();
//     console.log('HERO:', heroCoordinates.x, heroCoordinates.y)
// }, 1000)