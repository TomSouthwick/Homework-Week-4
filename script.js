var highscores = localStorage.getItem("highscores");
console.log(highscores);

if (!highscores) {
  highscores = [];
} else {
  highscores = JSON.parse(highscores);
}

function getUserSelectedOptionValue() {
  return document.querySelector('input[name="answer"]:checked').value;
}
var questions = [
  {
    text: "What are Screen Objects",
    answers: [
      "the moon is flat",
      "AvailWidth: Gives the width of the client’s screen",
      "AvailLength: Gives the width of the client’s screen",
      "Both AvailWidth and AvailLength",
    ],
    correctAnswer: 1,
  },
  {
    text: "Which of the following function of Boolean object returns the primitive value of the Boolean object?",
    answers: ["None of the below", "toSubString()", "toString()", "valueOf()"],
    correctAnswer: 3,
  },
  {
    text: "Which of the following function of Array object adds one or more elements to the front of an array and returns the new length of the array?",
    answers: ["splice()", "join()", "sort()", "unshift()"],
    correctAnswer: 1,
  },
  {
    text: "Which type of language is JavaScript",
    answers: ["Object-Based", "Object-Oriented", "High-level", "A Complex one"],
    correctAnswer: 0,
  },
  {
    text: "Which of the following type of a variable is volatile?",
    answers: [
      "Dynamic variable",
      "Immutable variable",
      "Volatile variable",
      "Mutable variable",
    ],
    correctAnswer: 3,
  },
  {
    text: "Every object contains three object attributes that are _______?",
    answers: [
      "Class, parameters, object's extensible flag",
      "Native object, Classes and Interfaces and Object's extensible flag",
      "Prototype, class, object's extensible flag",
      "Prototype, class, objects' parameters",
    ],
    correctAnswer: 2,
  },
  {
    text: "In JavaScript, do the functions always return a value?",
    answers: [
      "Some functions do not return any value",
      "No, it is not necessary",
      "Wow the Sun is really big",
      "A number of functions return values by default",
    ],
    correctAnswer: 3,
  },
  {
    text: "Who is the greatest full stack developer to have ever lived?",
    answers: ["Tom Southwick", "Ben", "Yun", "Jeff Bezos"],
    correctAnswer: 0,
  },
];

var tableElementEl = document.getElementById("tableElement");
var resetEl = document.getElementById("reset");
var timeRemainingEl = document.getElementById("timeRemaining");
var highscoretable = document.getElementById("highscoretable");
var username = document.getElementById("username");
var submitscore = document.getElementById("submitscore");
var finalScoreEl = document.getElementById("finalScore");
var quizEl = document.getElementById("quiz");
var resultsEl = document.getElementById("results");
var a0label = document.getElementById("a0label");
var a1label = document.getElementById("a1label");
var a2label = document.getElementById("a2label");
var a3label = document.getElementById("a3label");
var a0input = document.getElementById("a0");
var a1input = document.getElementById("a1");
var a2input = document.getElementById("a2");
var a3input = document.getElementById("a3");
var questiontext = document.getElementById("question");
var outcomeDiv = document.getElementById("outcome");
var updatehtml = (index) => {
  a0label.innerText = questions[index].answers[0];
  a1label.innerText = questions[index].answers[1];
  a2label.innerText = questions[index].answers[2];
  a3label.innerText = questions[index].answers[3];
  a0input.value = questions[index].answers[0];
  a1input.value = questions[index].answers[1];
  a2input.value = questions[index].answers[2];
  a3input.value = questions[index].answers[3];
  questiontext.innerText = questions[index].text;
};

var submitAnswer = () => {
  // document.querySelector('input[name="rate"]:checked').value;

  //  compare the correct answer vs the user's choice - put inside a if statement, if a === b show 'Correct'
  var currentQuestion = questions[i];
  var correctAnswerString =
    currentQuestion.answers[currentQuestion.correctAnswer];
  var selected = getUserSelectedOptionValue();

  if (selected === correctAnswerString) {
    // console.log("Correct");
    totalScore++;
    outcomeDiv.textContent = "Correct";
  } else {
    // console.log("Incorrect");
    time -= 30;
    timeRemainingEl.innerText = time;
    if (time <= 0) {
      displayResults();
    }
    outcomeDiv.textContent = "Incorrect";
  }
  outcomeDiv.classList.remove("fadeUp");
  setTimeout(() => {
    outcomeDiv.classList.add("fadeUp");
  }, 0);

  // outcomeDiv.style.animation = "";
  // outcomeDiv.style.animation = "fadeOutUp 2s ease-in-out";

  console.log(selected);

  i++;
  if (i == questions.length) {
    console.log("Quiz Over");
    displayResults();
  } else {
    updatehtml(i);
  }
};
function displayResults() {
  clearInterval(timerInterval);
  quizEl.style.display = "none";
  resultsEl.style.display = "block";
  finalScoreEl.innerText = `${totalScore} / ${questions.length}`;
}
function submitHighScore() {
  console.log(username.value, totalScore);
  highscores.push({ name: username.value, score: totalScore });
  localStorage.setItem("highscores", JSON.stringify(highscores));
  displayHighScores();
}
function displayHighScores() {
  quizEl.style.display = "none";
  resultsEl.style.display = "none";
  highscoretable.style.display = "block";
  highscores.sort(function (b, a) {
    return parseFloat(a.score) - parseFloat(b.score);
  });
  tableElementEl.innerHTML = "";
  highscores.forEach((highscore) => {
    tableElementEl.innerHTML += `<tr>
      <td>${highscore.name}</td>
      <td>${highscore.score}</td>
    </tr>`;
  });
}

// set i back to 0, set score to 0 call html function
function resetQuiz() {
  updatehtml(0);
  i = 0;
  totalScore = 0;
  time = 120;
  quizEl.style.display = "block";
  resultsEl.style.display = "none";
  highscoretable.style.display = "none";
  timerInterval = setInterval(() => {
    time--;
    timeRemainingEl.innerText = time;
    if (time <= 0) {
      displayResults();
    }
  }, 1000);
  // if i = question . length add the what
  //  reset style
}
var time = 120;
var timerInterval = null;
var i = 0;
var totalScore = 0;
resetQuiz();
