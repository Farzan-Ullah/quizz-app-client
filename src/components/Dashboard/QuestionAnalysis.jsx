import React, { useEffect, useState } from "react";
import styles from "./QuestionAnalysis.module.css";
import { getQuizDetails } from "../../apis/quiz";

function QuestionAnalysis({ quiz }) {
  const [quizDetails, setQuizDetails] = useState(null);

  useEffect(() => {
    async function fetchQuizDetails() {
      try {
        const details = await getQuizDetails(quiz._id);
        setQuizDetails(details);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    }

    if (quiz) {
      fetchQuizDetails();
    }
  }, [quiz]);

  if (!quizDetails) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className={styles.container}>
      <h2>{quizDetails.quizName} Question Analysis</h2>
      <div className={styles.headerDetails}>
        <p className={styles.date}>
          Created on :{formatDate(quizDetails.createdAt)}
        </p>
        <p className={styles.imp}>
          Impressions: {quizDetails.totalImpressions}
        </p>
      </div>
      {quizDetails.slides && quizDetails.slides.length > 0 ? (
        quizDetails.slides.map((slide, index) => (
          <div key={index} className={styles.questionContainer}>
            <h3>
              Q.{index + 1} {slide.question}
            </h3>
            <div className={styles.stats}>
              <div className={styles.statBox}>
                <p>{slide.attempts || 0}</p>
                <p>people Attempted the question</p>
              </div>
              <div className={styles.statBox}>
                <p>{slide.correct || 0}</p>
                <p>people Answered Correctly</p>
              </div>
              <div className={styles.statBox}>
                <p>{slide.incorrect || 0}</p>
                <p>people Answered Incorrectly</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No questions available for this quiz.</div>
      )}
    </div>
  );
}

export default QuestionAnalysis;
