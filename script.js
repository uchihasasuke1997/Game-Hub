document.addEventListener('DOMContentLoaded', () => {
    let username = ''; // Variable to store the user's name
    let gameStarted = false; // Variable to track if the game has started

    const questions = [
        { question: "What color is the sky during the day?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Blue" },
        { question: "Which fruit is known as the 'king of fruits'?", options: ["Banana", "Apple", "Mango", "Orange"], answer: "Mango" },
        { question: "How many legs does a cat have?", options: ["2", "4", "6", "8"], answer: "4" },
        { question: "What is the capital city of the United States?", options: ["Washington", "New York", "Los Angeles", "Chicago"], answer: "Washington" },
        { question: "Which season comes after winter?", options: ["Spring", "Summer", "Autumn", "Monsoon"], answer: "Spring" }
    ];

    let currentQuestionIndex = 0;
    let positivePoints = 0;
    let negativePoints = 0;

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('start');
    const submitButton = document.getElementById('submit');
    const exitButton = document.getElementById('exit');
    const playAgainButton = document.getElementById('play-again');

    startButton.addEventListener('click', () => {
        // Get the username from the input field
        username = document.getElementById('username').value.trim();

        // Check if username is provided
        if (username === '') {
            alert('Please enter your name before starting the game.');
            return;
        }

        // Hide username input and show game
        document.getElementById('username-input').style.display = 'none';
        document.getElementById('game').style.display = 'block';

