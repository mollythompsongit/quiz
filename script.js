const questions = [
    {
        question: "How many European Cups has Liverpool won?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: false },
            { text: "5", correct: false },
            { text: "6", correct: true },
        ]
    },
    {
        question: "What year was the club founded in?",
        answers: [
            { text: "1892", correct: true },
            { text: "1901", correct: false },
            { text: "1902", correct: false },
            { text: "1915", correct: false },
        ]
    },
    {
        question: "What is the clubs annual revenue?",
        answers: [
            { text: "More than 300 million Euros", correct: false },
            { text: "More than 400 million Euros", correct: false },
            { text: "More than 500 million Euros", correct: false },
            { text: "More than 600 million Euros", correct: true },
        ]
    },
    {
        question: "How many fans attended Liverpool's first match?",
        answers: [
            { text: "80", correct: false },
            { text: "100", correct: true },
            { text: "120", correct: false },
            { text: "140", correct: false },
        ]
    },
    {
        question: "How much does Roberto Firmino earn a week?",
        answers: [
            { text: "$135,000", correct: false },
            { text: "$180,000", correct: false },
            { text: "$210,000", correct: false },
            { text: "$235,000", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// this function runs the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// this function displays the questions stating from the first question
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // this displays the answer texts from the object inside the buttons HTML
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// this function sets the answer buttons innerHTML to be blank and ready for the first set of answer options
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    // if answer is true it will add the classname "correct"
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        // score ++ increases the users score by 1
        score++;
        // if answer is false it will add the classname "incorrect"
    } else {
        selectedBtn.classList.add("incorrect");
    }
    // this array shows the correct answer button when the incorrect answer is chosen
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // line 101 changes the next button css style from display none to display block so it is now visable to the user
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    // the next line changes the 'next' button's HTML to say 'Play Again' to take the user back to the start
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();