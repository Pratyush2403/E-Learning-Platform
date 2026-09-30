import { useState } from "react";

export default function Quiz({ test, onFinish, onExit }) {
  const total = test.questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(total).fill(null));
  const [finished, setFinished] = useState(false);

  const question = test.questions[index];
  const score = answers.filter((a, i) => a === test.questions[i].answer).length;
  const isLast = index === total - 1;

  const select = (optionIndex) => {
    const next = [...answers];
    next[index] = optionIndex;
    setAnswers(next);
  };

  const finish = () => {
    setFinished(true);
    onFinish(score, total);
  };

  const retake = () => {
    setIndex(0);
    setAnswers(Array(total).fill(null));
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="card quiz">
        <h2>{test.title}: results</h2>
        <p className="quiz-score">{score} / {total}</p>
        <p className="muted">
          {pct >= 80
            ? "Excellent work!"
            : pct >= 50
            ? "Good effort. Review the notes and try again."
            : "Keep practicing, you will get there."}
        </p>

        <ol className="review">
          {test.questions.map((q, i) => {
            const correct = answers[i] === q.answer;
            return (
              <li key={i} className={correct ? "right" : "wrong"}>
                <p>{q.q}</p>
                <p className="small">
                  Your answer: {answers[i] === null ? "Not answered" : q.options[answers[i]]}
                </p>
                {!correct && <p className="small">Correct answer: {q.options[q.answer]}</p>}
              </li>
            );
          })}
        </ol>

        <div className="quiz-actions">
          <button className="btn-outline fit" onClick={onExit}>Back to tests</button>
          <button className="btn-primary fit" onClick={retake}>Retake</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card quiz">
      <div className="quiz-top">
        <span className="muted small">Question {index + 1} of {total}</span>
        <button className="link-btn" onClick={onExit}>Exit</button>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      <h3 className="quiz-question">{question.q}</h3>
      <div className="options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={"option" + (answers[index] === i ? " selected" : "")}
            onClick={() => select(i)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="quiz-actions">
        <button className="btn-outline fit" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          Previous
        </button>
        {isLast ? (
          <button className="btn-primary fit" disabled={answers[index] === null} onClick={finish}>
            Finish
          </button>
        ) : (
          <button className="btn-primary fit" disabled={answers[index] === null} onClick={() => setIndex(index + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}