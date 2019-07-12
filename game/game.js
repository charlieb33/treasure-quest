/* eslint-disable */

const player = {x: 0, y: 0}
const keys = [87, 38, 65, 37, 83, 40, 68, 39];

const isInGrid = function(x, y) {
    if (x < 0 || y < 0 || x > 11 || y > 7) {
        return false
    }
    return true
}

const isAbleToMove = function(x, y) {
    if (!isInGrid(x, y)) {
        return false
    }
    return true
}

const moveThePlayer = function(x, y) {
    const player = document.getElementById('hero');
    player.style.left = (x * 100).toString() + 'px';
    player.style.top = (y * 100).toString() + 'px';
}

function goUp() {
    if(isAbleToMove(player.x, player.y - 1)) {
        player.y -= 1;
        moveThePlayer(player.x, player.y);
    }
}

function goLeft() {
    if(isAbleToMove(player.x - 1, player.y)) {
        player.x -= 1;
        moveThePlayer(player.x, player.y);
    }
}

function goDown() {
    if(isAbleToMove(player.x, player.y + 1)) {
        player.y += 1;
        moveThePlayer(player.x, player.y);
    }
}

function goRight() {
    if(isAbleToMove(player.x + 1, player.y)) {
        player.x += 1;
        moveThePlayer(player.x, player.y);
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