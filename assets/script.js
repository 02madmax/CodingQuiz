//quiz questions using questions as the id and answers as the keys
const questions = [
    {
      question: "Which answer is true when describing an HTML element?",
      answers: [
        { text: "An element has an opening and closing tag", correct: true },
        { text: "An element has an opening", correct: false },
        { text: "An element has a closing tag", correct: false },
        { text: "An element has no tag", correct: false },
      ],
    },
    {
      question: "Which is the correct syntax to log something into the console?",
      answers: [
        { text: "console.log", correct: false },
        { text: "console-log()", correct: false },
        { text: "log.console()", correct: false },
        { text: "console.log()", correct: true },
      ],
    },
    {
      question: "Where is the correct place to insert the javascript src in an HTML file",
      answers: [
        { text: "In the head", correct: false },
        { text: "In the header", correct: false },
        { text: "in the body", correct: true },
        { text: "in the footer", correct: false },
      ],
    },
    {
      question: "How do you correctly write a function?",
      answers: [
        { text: "function = myfunction()", correct: false },
        { text: "function = myfunction", correct: false },
        { text: "myfunction()", correct: false },
        { text: "function myfunction()", correct: true },
      ],
    },
    {
      question: "Which of these is a boolean?",
      answers: [
        { text: "Hello", correct: false },
        { text: "1", correct: false },
        { text: "232.4", correct: false },
        { text: "true", correct: true },
      ],
    },
  ];
  //html elements selected
  const timeLeft = document.querySelector('.time-left');
  const questionEl = document.getElementById('question');
  const answerBtns = document.getElementById('ans-btns');
  const nextBtn = document.getElementById('next');
  const currentScoreEl = document.getElementById('current-score');
  const startBtn = document.getElementById('start');
  
  //sets the score, timer and question to 0
  let currentQuestionIndex = 0;
  let score = 0;
  let count = 30;
  let countdown;
  
  //starts the quiz and resets the score, timer, but also restarts the timer and score if the quiz has been completed

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    count = 30;
    nextBtn.innerHTML = 'Next';
    currentScoreEl.style.display = 'none';
    currentScoreEl.innerHTML = '';
    resetTimer(); 
    showQuestion();
    startTimer();
  }
  
  //timer function
  function startTimer() {
    countdown = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    count--;
    timeLeft.textContent = count;
  
    if (count === 0) {
      clearInterval(countdown);
    }
  }
  
  function resetTimer() {
    clearInterval(countdown);
    count = 30;
    timeLeft.textContent = count;
  }
  //shows questions based on the current question index and also loops through through each question and creates a button that is either a correct or incorrect answer
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNo + '. ' + currentQuestion.question;
  
    currentQuestion.answers.forEach((answers) => {
      const button = document.createElement('button');
      button.innerHTML = answers.text;
      button.classList.add('ans');
      answerBtns.appendChild(button);
      if (answers.correct) {
        button.dataset.correct = answers.correct;
      }
      button.addEventListener('click', selectAnswer);
    });
//hides the score if there are no questions displayed
    if (currentQuestionIndex === 0) {
      currentScoreEl.style.display = 'none';
    } else {
      currentScoreEl.style.display = 'block';
    }
  }
  
  function resetState() {
    nextBtn.style.display = 'none';
    while (answerBtns.firstChild) {
      answerBtns.removeChild(answerBtns.firstChild);
    }
  }
  //if an answer is correct, it will add a css class to turn it green, if it is 
  //incorrect it will add an incorrect css class to turn the answer red
  //it will also disable the buttons once an answer has been selected
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
      selectedBtn.classList.add('correct');
      score++;
    } else {
      selectedBtn.classList.add('incorrect');
    }
    Array.from(answerBtns.children).forEach((button) => {
      if (button.dataset.correct === 'true') {
        button.classList.add('correct');
      }
      button.disabled = true;
    });
    nextBtn.style.display = 'block';
  }
  
//displays the score once the quiz is finished
  function showScore() {
    resetState();
    if (currentQuestionIndex > 0) {
      currentScoreEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
      
    } 
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = 'block';
  } 
  
  function clearScore() {
    score = 0;
}
  //if the next button is clicked it will show the next question or end the quiz if there are no more questions
  function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      clearInterval(countdown);
      showScore();
      currentScoreEl.style.display = 'block';
    }
  }
  
  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
      handleNextBtn();
    } else {
      startQuiz();
      clearScore();
      
    }
  });
  
  startQuiz();
  