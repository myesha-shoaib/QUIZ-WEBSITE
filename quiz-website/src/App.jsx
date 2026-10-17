import { useState, useEffect } from "react";
import "./App.css";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Machine Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    question: "Which language is used to style web pages?",
    options: ["Python", "CSS", "Java", "C++"],
    answer: 1,
  },
  {
    question: "Which library is used to build user interfaces?",
    options: ["Django", "Laravel", "React", "Flask"],
    answer: 2,
  },
  {
    question: "Which HTML tag creates a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "let", "const", "define"],
    answer: 2,
  },
  {
    question: "Which method selects an HTML element by its ID?",
    options: [
      "document.querySelectorAll()",
      "document.getElementById()",
      "document.getElements()",
      "document.selectId()",
    ],
    answer: 1,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style System",
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Syntax",
    ],
    answer: 2,
  },
  {
    question: "Which symbol is used for a single-line comment in JavaScript?",
    options: ["<!-- -->", "//", "**", "##"],
    answer: 1,
  },
];

function App() {
  const [screen, setScreen] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  const question = questions[currentQuestion];

  useEffect(() => {
    if (screen !== "quiz" || selectedAnswer !== null) {
      return;
    }

    if (timeLeft === 0) {
      setSelectedAnswer(-1);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [screen, timeLeft, selectedAnswer]);

  function startQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(15);
    setScreen("quiz");
  }

  function chooseAnswer(index) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (index === question.answer) {
      setScore((previousScore) => previousScore + 1);
    }
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer(null);
      setTimeLeft(15);
    } else {
      setScreen("result");
    }
  }

  function restartQuiz() {
    setScreen("start");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(15);
  }

  return (
    <main className="app">
      <div className="background-shape shape-one"></div>
      <div className="background-shape shape-two"></div>

      <header className="navbar">
        <a
          href="#home"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            restartQuiz();
          }}
        >
          <span className="brand-icon">Q</span>
          <span>Quizify</span>
        </a>

        <span className="nav-label">LEARN. PLAY. GROW.</span>
      </header>

      <section className="main-content" id="home">
        {screen === "start" && (
          <div className="start-card">
            <div className="eyebrow">
              <span className="status-dot"></span>
              YOUR KNOWLEDGE JOURNEY STARTS HERE
            </div>

            <h1>
              Challenge your
              <br />
              <span>knowledge.</span>
            </h1>

            <p className="description">
              Test your skills, explore new concepts, and discover
              what you know with our interactive quiz experience.
            </p>

            <div className="feature-grid">
              <div className="feature-item">
                <span className="feature-icon">✦</span>
                <div>
                  <strong>8 Questions</strong>
                  <small>Test your skills</small>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">◷</span>
                <div>
                  <strong>15 Seconds</strong>
                  <small>Per question</small>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <strong>Instant Feedback</strong>
                  <small>Learn as you go</small>
                </div>
              </div>
            </div>

            <button className="primary-btn" onClick={startQuiz}>
              Start Quiz <span>→</span>
            </button>

            <p className="bottom-note">
              No pressure. Just learning and having fun.
            </p>
          </div>
        )}

        {screen === "quiz" && (
          <div className="quiz-card">
            <div className="quiz-top">
              <span className="question-label">
                QUESTION {currentQuestion + 1} OF {questions.length}
              </span>

              <div className="timer">
                <span>◷</span> {String(timeLeft).padStart(2, "0")}s
              </div>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    ((currentQuestion + 1) / questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>

            <h2 className="question-title">{question.question}</h2>

            <p className="answer-instruction">
              Choose the best answer below.
            </p>

            <div className="options-list">
              {question.options.map((option, index) => {
                let className = "option-btn";

                if (selectedAnswer !== null) {
                  if (index === question.answer) {
                    className += " correct";
                  } else if (index === selectedAnswer) {
                    className += " incorrect";
                  }
                }

                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => chooseAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="option-text">{option}</span>

                    {selectedAnswer !== null &&
                      index === question.answer && (
                        <span className="option-check">✓</span>
                      )}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div
                className={`feedback ${
                  selectedAnswer === question.answer
                    ? "feedback-correct"
                    : "feedback-incorrect"
                }`}
                role="status"
              >
                {selectedAnswer === question.answer
                  ? "Excellent! That's the correct answer."
                  : selectedAnswer === -1
                  ? `Time's up! Correct answer: ${
                      question.options[question.answer]
                    }`
                  : `Not quite! Correct answer: ${
                      question.options[question.answer]
                    }`}
              </div>
            )}

            <div className="quiz-footer">
              <span>
                {currentQuestion + 1} / {questions.length} questions
              </span>

              <button
                className="primary-btn next-btn"
                onClick={nextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === questions.length - 1
                  ? "See Results"
                  : "Next Question"}
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {screen === "result" && (
          <div className="result-card">
            <div className="result-icon">
              {score >= 6 ? "🏆" : score >= 4 ? "⭐" : "🌱"}
            </div>

            <p className="eyebrow result-eyebrow">QUIZ COMPLETED</p>

            <h1>
              {score >= 6
                ? "Amazing work!"
                : score >= 4
                ? "Great effort!"
                : "Keep learning!"}
            </h1>

            <p className="description">
              You've completed all the questions. Every quiz is
              another opportunity to grow.
            </p>

            <div className="score-box">
              <span>Your Score</span>
              <strong>
                {score} <small>/ {questions.length}</small>
              </strong>
              <div className="score-track">
                <div
                  className="score-fill"
                  style={{
                    width: `${(score / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
              <p>{Math.round((score / questions.length) * 100)}% accuracy</p>
            </div>

            <button className="primary-btn" onClick={restartQuiz}>
              Play Again <span>↻</span>
            </button>
          </div>
        )}
      </section>

      <footer className="footer">
        <span>Made for curious minds.</span>
        <span>QUIZIFY © 2026</span>
      </footer>
    </main>
  );
}

export default App;