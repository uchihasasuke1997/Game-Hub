document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');

    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    initializeBoard();

    function initializeBoard() {
        board.innerHTML = '';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }

        updateStatus(`${currentPlayer}'s turn`);
    }

    function handleCellClick(event) {
        const cellIndex = event.target.dataset.index;

        if (boardState[cellIndex] !== '' || !gameActive) return;

        boardState[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;

        checkWin();
        checkDraw();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus(`${currentPlayer}'s turn`);
    }

    function checkWin() {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                gameActive = false;
                updateStatus(`${boardState[a]} wins!`);
                return;
            }
        }
    }

    function checkDraw() {
        if (boardState.every(cell => cell !== '') && gameActive) {
            gameActive = false;
            updateStatus("It's a draw!");
        }
    }

    function updateStatus(message) {
        status.textContent = message;
    }

    resetButton.addEventListener('click', initializeBoard);
});
