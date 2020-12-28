// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
var timer = '';



function startQuiz() {
  // hide start screen
  var startScreen = document.getElementById('start-screen');
    startScreen.style.display = 'none';

  // un-hide questions section
  questionsEl.classList.remove('hide');
  //questionsEl.style.display = 'inline-block';
  

  // start timer

  var timer = setInterval(function(){
    if(time <= 0){
      clearInterval(timer);
    } else {
      timerEl.innerHTML = time
    }
    time -= 1;
  }, 1000);

  // show starting time

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  questionsEl.textContent = currentQuestion.title 
  

  // clear out any old question choices
  choicesEl.textContent = ' '

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {

    // create new button for each choice

    var choiceBtn = document.createElement('button');

    choicesEl.appendChild(choiceBtn);
    choiceBtn.setAttribute('data-value', choice);
    choiceBtn.textContent = choice;
    questionsEl.appendChild(choicesEl);
}); 
    // attach click event listener to each choice
    choicesEl.addEventListener('click',function(event){
        var isButton = event.target.nodeName === 'BUTTON';
        // if (!isButton) {
            if (isButton === true){
                questionClick();
            }else{
            
            }

        
      })
    // display on the page

}
var wrongSFX =  document.getElementById('audio1');
var correctSfx = document.getElementById('audio2');

function questionClick(event) {
  // check if user guessed wrong
  
  console.log(event.target.lastChild.data);
  if ( event.target.lastChild.data !== questions[currentQuestionIndex].answer) {
     

    // penalize time
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.innerHTML = time;


    // play "wrong" sound effect
    wrongSFX.play();


    


    feedbackEl.textContent = "Wrong!";
  } else {
    // play "right" sound effect
    correctSfx.play();
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
 currentQuestionIndex = currentQuestionIndex+ 1; 
 console.log(currentQuestionIndex);

  // check if we've run out of questions
  if (currentQuestionIndex >= questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timer);

  // show end screen
  var endScreen = document.getElementById('end-screen')
    endScreen.classList.remove('hide')

  // show final score

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.nodeValue

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    localStorage.getItem(score)
    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.addEventListener("click", saveHighscore);

// user clicks button to start quiz
startBtn.addEventListener("click", startQuiz);

initialsEl.addEventListener("onkeyup", checkForEnter);