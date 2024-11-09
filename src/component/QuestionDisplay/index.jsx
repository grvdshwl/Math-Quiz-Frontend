import PropTypes from "prop-types";

const QuestionDisplay = ({
  question,
  onAnswerChange,
  onSubmit,
  userAnswer,
  isSubmitting,
}) => {
  return (
    <div className="question-display">
      <p className="question-text">{question.text}</p>
      <input
        type="text"
        placeholder="Your answer"
        onChange={(e) => onAnswerChange(e.target.value)}
        value={userAnswer}
      />
      <button onClick={onSubmit} className="submit-cta">
        {isSubmitting ? "Submitting..." : "Submit Answer"}
      </button>
    </div>
  );
};

export default QuestionDisplay;
QuestionDisplay.propTypes = {
  question: PropTypes.string,
  onAnswerChange: PropTypes.func,
  onSubmit: PropTypes.func,
  userAnswer: PropTypes.string,
  isSubmitting: PropTypes.bool,
};
