let question;
let form;
let res;
let qno;
let score;

const questions = [
  {
    title: "Q1.What does NoSQL stand for?",
    options: [
      "Not Only SQL",
      "Non-Standard Query Language",
      "New Structured Query Language",
      "Network Optimized SQL",
    ],
    answer: "0",
    score: 1,
  },
  {
    title: "Q2.Which of the following is NOT a type of NoSQL database?",
    options: [
      "Document-based",
      "Key-value store",
      "Column-family store",
      "Relational",
    ],
    answer: "3",
    score: 1,
  },
  {
    title: "Q3.Which of the following NoSQL databases is document-based?",
    options: ["Redis", "MongoDB", "HBase", "Neo4j"],
    answer: "1",
    score: 1,
  },
  {
    title:
      "Q4.What is the primary advantage of NoSQL databases over traditional relational databases?",
    options: [
      "ACID compliance",
      "Schema flexibility and horizontal scalability",
      "Strong data consistency",
      "Support for complex joins",
    ],
    answer: "1",
    score: 1,
  },
  {
    title:
      "Q5.Which NoSQL database is optimized for storing and querying relationships between data?",
    options: ["Cassandra", "Neo4j", "CouchDB", "DynamoDB"],
    answer: "1",
    score: 1,
  },
  {
    title: "Q6.Which of the following NoSQL databases is a key-value store?",
    options: ["Redis", "MySQL", "PostgreSQL", "Oracle"],
    answer: "0",
    score: 1,
  },
  {
    title:
      "Q7.Which of the following is an example of a column-family NoSQL database?",
    options: ["Cassandra", "MongoDB", "SQLite", "MySQL"],
    answer: "0",
    score: 1,
  },
  {
    title: "Q8.What is eventual consistency in NoSQL databases?",
    options: [
      "Data is always consistent across all nodes",
      "Data updates are not propagated at all",
      "Data may not be immediately updated across nodes but will become consistent over time",
      "NoSQL databases do not support consistency",
    ],
    answer: "2",
    score: 1,
  },
  {
    title: "Q9.Which of the following is NOT an advantage of NoSQL databases?",
    options: [
      "High scalability",
      "High flexibility",
      "Strong ACID compliance",
      "High availability",
    ],
    answer: "2",
    score: 1,
  },
  {
    title: "Q10.Which query language is commonly used with MongoDB?",
    options: ["SQL", "CQL", "JSON-based queries", "SPARQL"],
    answer: "2",
    score: 1,
  },
  {
    title: "Q11.What is the primary method of scaling in NoSQL databases?",
    options: [
      "Vertical scaling (adding more CPU/RAM to a single server)",
      "Horizontal scaling (adding more servers to distribute the load)",
      "Increasing the primary key size",
      "Using more indexes",
    ],
    answer: "1",
    score: 1,
  },
  {
    title:
      "Q12.Which of the following NoSQL databases is widely used for caching purposes?",
    options: ["PostgreSQL", "Redis", "Cassandra", "Oracle"],
    answer: "1",
    score: 1,
  },
];


function restartScreen() {
  document.querySelector(".quiz-heading").innerHTML = `Score : ${score}`;
  const card = document.querySelector(".question-card");
  card.innerHTML = "<ul>";
  questions.forEach((ques) => {
    const html = `
        <li>${ques.title} <div class="answer-label">${
      ques.options[ques.answer]
    }</div></li>
        `;
    card.innerHTML += html;
  });
  card.innerHTML += "</ul>";
  document.querySelector(".answer-key").style.display = "block";
  document.querySelector("button").style.display = "block";
}

function resetradio() {
  document.querySelectorAll('[type="radio"]').forEach((radio) => {
    radio.removeAttribute("disabled");
  });
  res.setAttribute("class", "idle");
  res.innerHTML = "Empty";
}

function evaluate() {
  if (form.op.value == questions[qno].answer) {
    res.setAttribute("class", "correct");
    res.innerHTML = "Correct";
    score += questions[qno].score;
  } else {
    res.setAttribute("class", "incorrect");
    res.innerHTML = "Incorrect";
  }
  document.querySelectorAll('[type="radio"]').forEach((radio) => {
    radio.setAttribute("disabled", "");
  });
}

function getNextQuestion() {
  qno++;
  ques = questions[qno];
  question.innerHTML = ques.title;
  const labels = document.querySelectorAll("label");
  labels.forEach((label, idx) => {
    label.innerHTML = ques.options[idx];
  });
}

function handleSubmit(e) {
  e.preventDefault();
  if (!form.op.value) {
    alert("Please select an option");
  } else if (form.submit.classList.contains("submit")) {
    evaluate();
    form.submit.classList.remove("submit");
    form.submit.value = "Next";
    form.submit.classList.add("next");
  } else if (
    qno < questions.length - 1 &&
    form.submit.classList.contains("next")
  ) {
    getNextQuestion();
    resetradio();
    form.submit.classList.remove("next");
    form.submit.value = "Submit";
    form.submit.classList.add("submit");
    form.reset();
  } else if (form.submit.classList.contains("next")) {
    restartScreen();
    form.submit.classList.remove("next");
    form.submit.value = "Submit";
    form.submit.classList.add("submit");
    form.reset();
  }
}
let timerInterval;
let timeLeft;

function startTimer() {
  timeLeft = 30; // Time in seconds for each question
  document.getElementById("timer").innerHTML = `Time Left: ${timeLeft} seconds`;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById(
      "timer"
    ).innerHTML = `Time Left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      evaluate();
      moveToNext();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  startTimer();
}

function stopTimer() {
  clearInterval(timerInterval);
}

function moveToNext() {
  if (qno < questions.length - 1) {
    getNextQuestion();
    resetradio();
    resetTimer();
    form.submit.classList.remove("next");
    form.submit.value = "Submit";
    form.submit.classList.add("submit");
    form.reset();
  } else {
    restartScreen();
    stopTimer();
    form.submit.classList.remove("next");
    form.submit.value = "Submit";
    form.submit.classList.add("submit");
    form.reset();
  }
}

function handleSubmit(e) {
  e.preventDefault();
  if (!form.op.value) {
    alert("Please select an option");
  } else if (form.submit.classList.contains("submit")) {
    evaluate();
    form.submit.classList.remove("submit");
    form.submit.value = "Next";
    form.submit.classList.add("next");
    stopTimer();
  } else if (form.submit.classList.contains("next")) {
    moveToNext();
  }
}

function init() {
  document.body.innerHTML = `
        <h1 class="quiz-heading">Quiz</h1>
        <div class="app-body">
            <h1 class="answer-key">Answer Key</h1>
            <div class="question-card">
                <div id="timer">Time Left: 30 seconds</div>
                <h2 id='question'>Question</h2>
                <form>
                    <input type="radio" id="op1" name="op" value="0">
                    <label for="op1">op1</label><br>
                    <input type="radio" id="op2" name="op" value="1">
                    <label for="op2">op2</label><br>
                    <input type="radio" id="op3" name="op" value="2">
                    <label for="op3">op3</label><br>
                    <input type="radio" id="op4" name="op" value="3">
                    <label for="op4">op4</label><br>
                    <div id="res" class="idle">Empty</div><br>
                    <input type="submit" name="submit" value='Submit' class="submit" />
                </form>
            </div>
            <button>Restart</button>
        </div>
    `;
  question = document.querySelector("#question");
  form = document.querySelector("form");
  res = document.querySelector("#res");
  qno = -1;
  score = 0;
  form.addEventListener("submit", handleSubmit);
  document.querySelector("button").addEventListener("click", init);
  getNextQuestion();
  startTimer(); // Start the timer when the quiz begins
}

// function init() {
//   document.body.innerHTML = `
//         <h1 class="quiz-heading">Quiz</h1>
//         <div class="app-body">
//             <h1 class="answer-key">Answer Key</h1>
//             <div class="question-card">
//                 <h2 id='question'>Question</h2>
//                 <form>
//                     <input type="radio" id="op1" name="op" value="0">
//                     <label for="op1">op1</label><br>
//                     <input type="radio" id="op2" name="op" value="1">
//                     <label for="op2">op2</label><br>
//                     <input type="radio" id="op3" name="op" value="2">
//                     <label for="op3">op3</label><br>
//                     <input type="radio" id="op4" name="op" value="3">
//                     <label for="op4">op4</label><br>
//                     <div id = "res" class="idle">Empty</div><br>
//                     <input type="submit" name="submit" value = 'Submit' class = "submit"/>
//                 </form>
//             </div>
//             <button>Restart</button>
//         </div>
//     `;
//   question = document.querySelector("#question");
//   form = document.querySelector("form");
//   res = document.querySelector("#res");
//   qno = -1;
//   score = 0;
//   form.addEventListener("submit", handleSubmit);
//   document.querySelector("button").addEventListener("click", init);
//   getNextQuestion();
// }
document.querySelector("button").addEventListener("click", init);
init();
