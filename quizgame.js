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

        // Start the game
        startGame();
    });

    function startGame() {
        gameStarted = true;
        startButton.style.display = 'none';
        submitButton.style.display = 'inline'; // Show submit button
        exitButton.style.display = 'inline'; // Show exit button
        playAgainButton.style.display = 'none';
        scoreElement.textContent = '';
        resultElement.textContent = '';
        positivePoints = 0;
        negativePoints = 0;
        currentQuestionIndex = 0;
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            optionsElement.innerHTML = '';

            currentQuestion.options.forEach(option => {
                const optionElement = document.createElement('div');
                optionElement.innerHTML = `
                    <input type="radio" id="${option}" name="option" value="${option}">
                    <label for="${option}">${option}</label>
                `;
                optionsElement.appendChild(optionElement);
            });
        } else {
            endGame();
        }
    }

    submitButton.addEventListener('click', submitAnswer);
    exitButton.addEventListener('click', endGame);
    playAgainButton.addEventListener('click', () => {
        // Reset the game
        gameStarted = false;
        startButton.style.display = 'inline'; // Show start button
        submitButton.style.display = 'none';
        exitButton.style.display = 'none';
        playAgainButton.style.display = 'none';
        scoreElement.textContent = '';
        resultElement.textContent = '';
        currentQuestionIndex = 0;
        positivePoints = 0;
        negativePoints = 0;
        loadQuestion();
    });

    function submitAnswer() {
        if (!gameStarted) return; // Check if the game has started
        const selectedOption = document.querySelector('input[name="option"]:checked');
        
        if (!selectedOption) {
            alert("Please select an answer before submitting.");
            return;
        }

        const userAnswer = selectedOption.value;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            positivePoints++;
            resultElement.textContent = "You are correct!";
        } else {
            negativePoints++;
            resultElement.textContent = `Wrong! The correct answer is ${correctAnswer}`;
        }

        currentQuestionIndex++;
        setTimeout(() => {
            resultElement.textContent = '';
            loadQuestion();
        }, 1000);
    }

    function endGame() {
        gameStarted = false;
        questionElement.textContent = '';
        optionsElement.innerHTML = ''; // Clear options
        submitButton.style.display = 'none';
        exitButton.style.display = 'none';
        scoreElement.textContent = `You got ${positivePoints} questions correct and your total score is ${positivePoints - negativePoints} points.`;
        playAgainButton.style.display = 'inline';
    }
});
