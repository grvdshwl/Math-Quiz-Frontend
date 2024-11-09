import { useState, useEffect, useCallback } from "react";
import "./gameplay.css";
import QuestionDisplay from "../QuestionDisplay";
import Timer from "../Timer";
import { useUser } from "../../context/authProvider.context";
import { toast, ToastContainer } from "react-toastify";
import { config } from "../../../config";

const Gameplay = () => {
  const { logoutUser, userDetails, updateUserDetails } = useUser();
  const [userAnswer, setUserAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timePassed, setTimePassed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const formatTime = useCallback((timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const fetchQuestions = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await fetch(`${config.API_BASE_URL}/currentQuestion`);
      const data = await response.json();
      data.success
        ? setCurrentQuestion(data.question)
        : toast.error("Error fetching questions.", { autoClose: 1000 });
    } catch (error) {
      toast.error("Error fetching questions.", { autoClose: 1000 });
      console.error("Error fetching questions:", error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const checkIfQuestionAnswered = useCallback(async () => {
    if (!currentQuestion || isFetching) return;
    try {
      const response = await fetch(
        `${config.API_BASE_URL}/checkIsQuestionAnswered/${currentQuestion._id}`
      );
      const data = await response.json();
      data.success && fetchQuestions();
    } catch (error) {
      console.error("Error checking question answered:", error);
    }
  }, [currentQuestion, fetchQuestions, isFetching]);

  const handleSubmitAnswer = async () => {
    if (!userAnswer) {
      return toast.error("Please enter answer before submitting", {
        autoClose: 1000,
      });
    }
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${config.API_BASE_URL}/submitAnswer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userDetails.email,
          questionId: currentQuestion._id,
          answer: userAnswer,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setUserAnswer("");
        updateUserDetails(data.user);
        toast.success("Correct answer! You are the winner.", {
          autoClose: 1000,
        });
      } else {
        toast.error(data.message || "Incorrect answer, try again.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Error submitting your answer.", { autoClose: 1000 });
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    setTimePassed(0);
  }, [currentQuestion]);

  useEffect(() => {
    const timerInterval = setInterval(
      () => setTimePassed((prev) => prev + 1),
      1000
    );
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const pollingInterval = setInterval(checkIfQuestionAnswered, 1000);
    return () => clearInterval(pollingInterval);
  }, [checkIfQuestionAnswered]);

  return (
    <div className="gameplay">
      <ToastContainer />
      <h1>Competitive Math Quiz</h1>

      {currentQuestion && (
        <div className="game">
          <div className="game-left">
            <QuestionDisplay
              question={currentQuestion}
              onAnswerChange={setUserAnswer}
              userAnswer={userAnswer}
              onSubmit={handleSubmitAnswer}
              isSubmitting={isSubmitting}
            />
            <Timer timePassed={formatTime(timePassed)} />
          </div>
        </div>
      )}
      <h2>User Score: {userDetails.score}</h2>
      <button onClick={logoutUser} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Gameplay;
