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
    answers: ["a", "b", "c", "d"],
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
updatehtml(0);
var i = 0;
var totalScore = 0;
var submitAnswer = () => {
  // document.querySelector('input[name="rate"]:checked').value;

  //  compare the correct answer vs the user's choice - put inside a if statement, if a === b show 'Correct'
  var currentQuestion = questions[i];
  var correctAnswerString =
    currentQuestion.answers[currentQuestion.correctAnswer];
  var selected = getUserSelectedOptionValue();

  if (selected === correctAnswerString) {
    console.log("Correct");
    totalScore++;
    // outcomeDiv.textContent = "Correct";
  } else {
    console.log("Incorrect");
    // outcomeDiv.textContent = "Incorrect";
  }

  console.log(selected);

  // create empty div in html, give id -> out come message <div id="outcome> innertext.html=  </div>"
  // test //
  // if a is not equal to b show false
  // if i is equal to questions.length then show the final results screen//
  i++;
  if (i == questions.length) {
    console.log("Quiz Over");
    displayResults();
  } else {
    updatehtml(i);
  }
};
function displayResults() {
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
  highscores.forEach((highscore) => {
    highscoretable.innerHTML += `<div> ${highscore.name} : ${highscore.score}</div>`;
  });
}
