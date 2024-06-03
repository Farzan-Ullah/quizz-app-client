import React, { useEffect, useState } from "react";
import styles from "./PollAnalysis.module.css";
import { getQuizDetails } from "../../apis/quiz";

function PollAnalysis({ quiz }) {
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
    <div className={styles.pollAnalysisContainer}>
      <h2>{quizDetails.quizName} Question Analysis</h2>
      <div className={styles.metaData}>
        <span>Created on: {formatDate(quizDetails.createdAt)}</span>
        <span>Impressions: {quizDetails.totalImpressions}</span>
      </div>
      {quizDetails.slides && quizDetails.slides.length > 0 ? (
        quizDetails.slides.map((slide, index) => (
          <div key={index} className={styles.questionContainer}>
            <h3>
              Q.{index + 1} {slide.question}
            </h3>
            <div className={styles.optionsContainer}>
              {slide.options.map((option, oIndex) => (
                <div key={oIndex} className={styles.option}>
                  <span className={styles.voteCount}>{option.votes}</span>
                  <span className={styles.optionText}>Option {oIndex + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>No questions available for this quiz.</div>
      )}
    </div>
  );
}

export default PollAnalysis;
