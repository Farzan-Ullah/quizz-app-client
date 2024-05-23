import React from "react";
import styles from "./QuizCard.module.css";
import { AiOutlineEye } from "react-icons/ai";

function QuizCard({ title, createdOn, attempts }) {
  return (
    <div className={styles.quizCard}>
      <div className={styles.quizTitle}>{title}</div>
      <div className={styles.quizDetails}>
        <span className={styles.createdOn}>Created on: {createdOn}</span>
        <span className={styles.attempts}>
          {attempts} <AiOutlineEye style={{fontSize: "20px", fontWeight: "bold"}}/>
        </span>
      </div>
    </div>
  );
}

export default QuizCard;
