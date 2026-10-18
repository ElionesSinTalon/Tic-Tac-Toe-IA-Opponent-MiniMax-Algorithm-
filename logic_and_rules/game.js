const selection = document.querySelector('.selection');
const playBoard = document.querySelector('.play-board');
const winner = document.querySelector('.winner');

let gameBoard, user = 'X', computer = 'O', computerTurn = false;
const cells = document.querySelectorAll('.cell');
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [2, 5, 8], [1, 4, 7], [0, 3, 6]];

const playerSelect = player => {

    user = player;
    computer = (player === 'X') ? 'O' : 'X';

    gameBoard = Array.from(Array(9).keys());

    for (let cell of cells) {
        cell.addEventListener('click', handleClick, false);
    }

    if (computer === 'X') {
        turn(bestSpot(), computer);
    }

    selection.classList.add('fadeOut');
    setTimeout(() => { selection.style.display = 'none' }, 290);

    playBoard.classList.add('fadeIn');
    setTimeout(() => { playBoard.style.display = 'block' }, 290);

}

const startGame = () => {

    winner.classList.remove('fadeIn');
    winner.classList.add('fadeOut');
    setTimeout(() => { winner.style.display = 'none' }, 290);

    playBoard.classList.remove('fadeIn');
    playBoard.classList.add('fadeOut');
    setTimeout(() => { playBoard.style.display = 'none' }, 290);

    selection.classList.add('fadeIn');
    setTimeout(() => { selection.style.display = 'block' }, 290);

    for (let cell of cells) {
        cell.innerHTML = '';
        cell.style.color = '#000';
        cell.style.background = '#ff9eb150';
    }

}

startGame();

const handleClick = gameSpace => {
    if (computerTurn) return;

    if (typeof gameBoard[gameSpace.target.id] === 'number') {

        turn(gameSpace.target.id, user);
        if (!checkWin(gameBoard, user) && !checkTie()) {
            computerTurn = true;
            setTimeout(() => {
                 computerTurn = false;
                turn(bestSpot(), computer)
            }, 500);
        }
    }
}

const turn = (spaceId, player) => {

    gameBoard[spaceId] = player;
    document.getElementById(spaceId).innerHTML = player;

    let gameWon = checkWin(gameBoard, player);
    if (gameWon) {
        gameOver(gameWon);
        return;
    }

    checkTie();
}

const checkWin = (board, player) => {

    let spaces = board.reduce((acc, ele, idx) => (ele === player) ? acc.concat(idx) : acc, []);
    let gameWon = null;

    for (let [index, winComboSpaces] of winCombos.entries()) {
        if(winComboSpaces.every(elem => spaces.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

const gameOver = gameWon => {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.color = '#FFF';
        document.getElementById(index).style.backgroundColor = '#B33951';
    }

    for (let cell of cells) {
        cell.removeEventListener('click', handleClick, false);
    }

    declareWinner(gameWon.player === user ? "You Won The Game!" : "Computer Won The Game!");
}

const declareWinner = message => {
    winner.querySelector('h3').innerHTML = message;

    setTimeout(() => {

        playBoard.classList.remove('fadeIn');
        playBoard.classList.add('fadeOut');
        setTimeout(() => { playBoard.style.display = 'none' }, 290);   

        winner.classList.add('fadeIn');
        setTimeout(() => { winner.style.display = 'block' }, 290);    
         
    }, 1500);
}
const emptySquares = () => {return gameBoard.filter((elm, i) => i === elm);}

const checkTie = () => {

    if (emptySquares().length === 0) {
        selection.classList.remove('fadeOut');

        for (let cell of cells) {
            cell.style.backgroundColor = "#B33951";
            cell.removeEventListener('click', handleClick, false);
        }

        declareWinner("The Game Is Tie!");
        return true;
    }

    return false;
}