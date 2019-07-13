/* eslint-disable */

const playerPos = {x: 0, y: 0}
const player = document.getElementById('hero');
const keys = [87, 38, 65, 37, 83, 40, 68, 39]
const walls = document.querySelectorAll('.wall')
const hazards = document.querySelectorAll('.hazard')

const isInGrid = function(x, y) {
    if (x < 0 || y < 0 || x > 11 || y > 7) {
        return false
    }
    return true
}

const isBlockInWay = function(x, y) {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i]
        if (player.style.left + player.style.width > wall.style.width) {
            console.log("hit wall")
            return true
        }
    }
    return false
}

const isHazardInWay = function(x, y) {
    for (let j = 0; j < hazards.length; j++) {
        const hazard = hazards[j]
        if (playerPos.x + player.style.width > wall.style.width) {
            console.log("hit wall")
            return true
        }
    }
    return false
}

const isAbleToMove = function(x, y) {
    console.log(x, y)
    if (!isInGrid(x, y) || isBlockInWay(x, y)) {
        return false
    }
    return true
}

const moveThePlayer = function(x, y) {
    player.style.left = (playerPos.x * 100) + 'px';
    player.style.top = (playerPos.y * 100) + 'px';
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
});