const quizData = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2 // index of the correct answer
    },
    {
        question: "Which language is used for web development?",
        answers: ["Python", "C++", "JavaScript", "Java"],
        correct: 2
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Ernest Hemingway"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersList = document.getElementById("answers-list");
const submitBtn = document.getElementById("submit-btn");
const resultElement = document.getElementById("result-section");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const quizContent = document.getElementById("quiz-content");

function loadQuestion() {
    // Clear previous answer options
    answersList.innerHTML = "";
    
    // Load the current question and answers
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    
    currentQuestion.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="answer" value="${index}" id="answer${index}">
                        <label for="answer${index}">${answer}</label>`;
        answersList.appendChild(li);
    });
}

function showResult() {
    quizContent.classList.add("hidden");  // Hide the quiz questions
    resultElement.classList.remove("hidden");  // Show the final score
    scoreElement.innerText = `${score} / ${quizData.length}`;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add("hidden");
    quizContent.classList.remove("hidden");
    loadQuestion();
}

submitBtn.addEventListener("click", () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (selectedAnswer) {
        const answerValue = parseInt(selectedAnswer.value);
        
        if (answerValue === quizData[currentQuestionIndex].correct) {
            score++;
        }
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Please select an answer!");
    }
});

restartBtn.addEventListener("click", resetQuiz);

// Load the first question when the page is loaded
loadQuestion();
