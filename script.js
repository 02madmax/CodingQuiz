const questions = [
    {
        question: "Which answer is true when describing and HTML element",
        answers: [
            {text: "An element has an opening and closing tag", correct: true},
            {text: "An element has an opening", correct: false},
            {text: "An element has a closing tag", correct: false},
            {text: "An element has no tag", correct: false},
        ]
    },
    {
        question: "Which answer is true when describing and HTML element",
        answers: [
            {text: "An element has an opening and closing tag", correct: true},
            {text: "An element has an opening", correct: false},
            {text: "An element has a closing tag", correct: false},
            {text: "An element has no tag", correct: false}, 
        ]
    }
];


const timeLeft = document.querySelector('.time-left')
const questionEl = document.getElementById('question');
const answerBtns = document.getElementById('ans-btns');
const nextBtn = document.getElementById('next');
const currentScoreEl = document.getElementById('current-score');
const startBtn = document.getElementById('start');


let currentQuestionIndex = 0;
let score = 0;
let count = 15;
let countdown;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
};



function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("ans");
        answerBtns.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
    if (currentQuestionIndex === 0) {
        currentScoreEl.style.display = "none";
    } else {
        currentScoreEl.style.display = "block";
    };
};
function resetState() {
    nextBtn.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    if (currentQuestionIndex > 0) {
    currentScoreEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
    }
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}


nextBtn.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    } else {
        startQuiz();
    }
})

startQuiz();



