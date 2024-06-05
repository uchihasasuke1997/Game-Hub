document.addEventListener('DOMContentLoaded', () => {
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
    const playAgainButton = document.getElementById('play-again');

    startButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', submitAnswer);
    playAgainButton.addEventListener('click', playAgain);

    function startGame() {
        startButton.style.display = 'none';
        playAgainButton.style.display = 'none';
        scoreElement.textContent = '';
        resultElement.textContent = '';
        positivePoints = 0;
        negativePoints = 0;
        currentQuestionIndex = 0;
        submitButton.style.display = 'inline';
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

    function submitAnswer() {
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
        questionElement.textContent = '';
        optionsElement.textContent = '';
        submitButton.style.display = 'none';
        scoreElement.textContent = `You got ${positivePoints} questions correct and your total score is ${positivePoints - negativePoints} points.`;
        playAgainButton.style.display = 'inline';
    }

    function playAgain() {
        startGame();
    }
});
