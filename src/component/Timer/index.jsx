import PropTypes from "prop-types";

const Timer = ({ timePassed }) => {
  return (
    <div className="timer">
      <p>Time Passed: {timePassed} </p>
    </div>
  );
};
Timer.propTypes = {
  timePassed: PropTypes.string || PropTypes.number,
};

export default Timer;
