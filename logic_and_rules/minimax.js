const bestSpot = () => {

    let bestScore = -Infinity;
    let bestMoves = [];

    for (let idx of emptySquares()){
        gameBoard[idx] = computer;
        const score = minMax(gameBoard, user).score;
        gameBoard[idx] = idx;

        if (score > bestScore) {
            bestScore = score;
            bestMoves = [idx];
        } else if (score === bestScore) {
            bestMoves.push(idx);
        }
    }
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

const minMax = (testBoard, player) => {

    let openSpaces = emptySquares(testBoard);

    if (checkWin(testBoard, user))
        return { score: -10 };
    else if (checkWin(testBoard, computer))
        return { score: 10 };
    else if (openSpaces.length === 0)
        return { score: 0 };

    let moves = [];

    for (let i = 0; i < openSpaces.length; i++) {

        let move = {};
        move.index = testBoard[openSpaces[i]];
        testBoard[openSpaces[i]] = player;

        if (player === computer) 
            move.score = minMax(testBoard, user).score;
        else
            move.score = minMax(testBoard, computer).score;

        testBoard[openSpaces[i]] = move.index;

        if ((player === computer && move.score === 10) || (player === user && move.score === -10))
            return move;
        else
            moves.push(move)
    }

    let bestMove, bestScore;

    if (player === computer) {

        bestScore = -1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }

    } else {

        bestScore = 1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}