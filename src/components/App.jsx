import Description from "./Description/Description";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import Notification from "./Notification/Notification";
import { useState, useEffect } from "react";
import "modern-normalize";

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    const stringifyedFbacks = localStorage.getItem("feedbacks");
    const parsedFback = JSON.parse(stringifyedFbacks) ?? {
      good: 0,
      neutral: 0,
      bad: 0,
    };
    return parsedFback;
  });

  useEffect(() => {
    localStorage.setItem(`feedbacks`, JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    const resetFeedbacks = {
      good: 0,
      neutral: 0,
      bad: 0,
    };

    setFeedback(resetFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(resetFeedbacks));
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positiveFeedback =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <>
      <Description totalFeedback={totalFeedback} />
      <Options
        onLeaveFeedback={updateFeedback}
        onReset={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          total={totalFeedback}
          posFeedback={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </>
  );
}
