import React from "react";
import QuizTest from "../../components/QuizTest/QuizTest";
import styles from "./QuizTestPage.module.css";

function QuizTestPage({ quizId }) {
  return (
    <div className={styles.container}>
      <QuizTest quizId={quizId} />
    </div>
  );
}

export default QuizTestPage;
