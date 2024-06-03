import React from "react";
import styles from "./QuizCard.module.css";
import { AiOutlineEye } from "react-icons/ai";

function QuizCard({ title, createdOn, attempts }) {
  return (
    <div className={styles.quizCard}>
      <div className={styles.quizDetails}>
        <div className={styles.titleAndIcon}>
          {" "}
          <span className={styles.attempts}>
            {attempts} <AiOutlineEye className={styles.icon} />
          </span>
          <div className={styles.quizTitle}>{title}</div>
        </div>
        <div className={styles.createdOn}>
          <span>Created on: {createdOn}</span>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
