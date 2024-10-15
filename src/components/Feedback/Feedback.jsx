import styles from "./Feedback.module.css";

const Feedback = ({ feedback, total, posFeedback }) => {
  return (
    <div className={styles.feedbackBox}>
      <p className={styles.feedbackCount}>Good: {feedback.good}</p>
      <p className={styles.feedbackCount}>Neutral: {feedback.neutral}</p>
      <p className={styles.feedbackCount}>Bad: {feedback.bad}</p>
      <p className={styles.feedbackCount}>Total: {total}</p>
      <p className={styles.feedbackCount}>Positive: {posFeedback}%</p>
    </div>
  );
};

export default Feedback;
