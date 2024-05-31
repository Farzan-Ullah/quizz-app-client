import React from "react";
import styles from "./Congrats.module.css";
import Congo from "../../assets/images/congo.png";

function Congrats({ slides, score }) {
  const isQnAType = slides.some((slide) => slide.correctAnswer !== undefined);

  return (
    <div className={styles.congratulations}>
      {isQnAType ? (
        <>
          <h1 className={styles.congrats}>Congrats Quiz is completed</h1>
          <img src={Congo} alt="congo" className={styles.congoImage} />
          <p className={styles.scores}>
            Your Score is{" "}
            <span>{`${score.toString().padStart(2, "0")}/${slides.length
              .toString()
              .padStart(2, "0")}`}</span>
          </p>
        </>
      ) : (
        <p className={styles.pollMessage}>
          Thank you for participating in the Poll
        </p>
      )}
    </div>
  );
}

export default Congrats;
