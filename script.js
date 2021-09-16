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
    text: "this is a question",
    answers: [
      "the moon is flat",
      "b",
      " return document.querySelector('input[name='answer']:checked').value;",
      "d",
    ],
    correctAnswer: 2,
  },
  {
    text: "javascript question 2",
    answers: ["0", "1", "2", "3"],
    correctAnswer: 1,
  },
  {
    text: "javascript question 3",
    answers: ["0", "1", "2", "3"],
    correctAnswer: 1,
  },
  {
    text: "javascript question 4",
    answers: ["0", "1", "2", "3"],
    correctAnswer: 1,
  },
  {
    text: "javascript question 5",
    answers: ["0", "1", "2", "3"],
    correctAnswer: 1,
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
  time = 90;
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
}
var time = 90;
var timerInterval = null;
var i = 0;
var totalScore = 0;
resetQuiz();
