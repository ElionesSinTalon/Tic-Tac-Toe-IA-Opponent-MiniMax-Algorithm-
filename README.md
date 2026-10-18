# Tic-Tac-Toe — Minimax AI

A browser-based Tic-Tac-Toe game where you play against a computer opponent that chooses moves with the Minimax algorithm. The interface uses a neon-inspired theme and lets you choose whether to play as X or O.

## Play online

[Open the web deployment on GitHub Pages](https://elionesintalon.github.io/Tic-Tac-Toe-IA-Opponent-MiniMax-Algorithm-/).

## How to play

1. Open the game and choose **X** or **O**.
2. Click an empty square to make your move. You move first; the computer responds automatically.
3. Get three of your marks in a row, column, or diagonal to win. If all squares are filled without a winner, the game is a draw.
4. Select **Reset** during a game or **Play Again** at the result screen to return to player selection and start over.

The computer evaluates possible future moves using Minimax. It assigns scores to terminal board states (a computer win, player win, or draw), then chooses a move that maximizes its result while assuming the player will choose moves that minimize it. If multiple moves have the same best score, it chooses randomly among them.

## Project contents

- `index.html` — page structure, player selection, game board, and result screen.
- `styles.css` — layout, neon visual styling, and screen-transition animations.
- `logic_and_rules/game.js` — turn handling, board state, win/draw detection, and game flow.
- `logic_and_rules/minimax.js` — computer move selection and recursive Minimax evaluation.

## Run locally

No build step, package installation, or server is required. Download or clone the repository and open `index.html` in a web browser. The page loads the DynaPuff font from Google Fonts; if you are offline, the game still works with the browser's fallback font.
