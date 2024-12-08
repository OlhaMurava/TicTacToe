let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.getElementById('status');
const board = document.getElementById('board');
const resetButton = document.getElementById('resetBtn');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (gameBoard[clickedIndex] !== '' || !gameActive) return;

    gameBoard[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Хід: ${currentPlayer}`;
    }
};

const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const cellA = gameBoard[a];
        const cellB = gameBoard[b];
        const cellC = gameBoard[c];

        if (cellA === '' || cellB === '' || cellC === '') continue;

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            highlightWinningLine([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        statusDisplay.textContent = `Переможець: ${currentPlayer}`;
    } else if (!gameBoard.includes('')) {
        gameActive = false;
        statusDisplay.textContent = 'Нічия!';
    }
};

const highlightWinningLine = (line) => {
    const cells = document.querySelectorAll('.cell');
    line.forEach(index => {
        cells[index].classList.add('winning-line');
    });
};

const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Гра почалась! Хід: Хрестик`;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-line');
    });
};

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);

