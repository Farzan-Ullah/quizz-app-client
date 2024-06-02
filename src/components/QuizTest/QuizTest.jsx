import React, { useState, useEffect, useRef } from "react";
import styles from "./QuizTest.module.css";
import { getQuizDetails, updateImpressions } from "../../apis/quiz";
import Congrats from "./Congrats";
import { useParams } from "react-router-dom";

function QuizTest() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);
  const isImpressionUpdated = useRef(false);

  const { quizId } = useParams();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getQuizDetails(quizId);
        if (data && data.slides) {
          setSlides(data.slides);
        } else {
          throw new Error("Quiz data is not valid");
        }
      } catch (error) {
        setError("Failed to fetch quiz details");
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();

    const updateQuizImpressions = async () => {
      try {
        if (!isImpressionUpdated.current) {
          await updateImpressions(quizId);
          isImpressionUpdated.current = true;
        }
      } catch (error) {
        console.error("Error updating impressions:", error);
      }
    };
    updateQuizImpressions();
    return () => {
      isImpressionUpdated.current = true;
    };
  }, [quizId]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (
      slides.length > 0 &&
      slides[currentSlide] &&
      slides[currentSlide].timer !== "OFF"
    ) {
      const duration = parseInt(slides[currentSlide].timer.split(" ")[0], 10);
      setTimeLeft(duration);
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerRef.current);
            handleNextSlide();
            return 0;
          }
        });
      }, 1000);
    } else {
      setTimeLeft(null);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentSlide, slides]);

  const handleNextSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleQuizEnd();
    }
  };

  const handleQuizEnd = () => {
    let calculatedScore = 0;
    slides.forEach((slide) => {
      if (slide.selectedAnswer === slide.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setQuizEnded(true);
  };

  const handleOptionClick = (index) => {
    setSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[currentSlide].selectedAnswer = index;
      return newSlides;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!slides || slides.length === 0) {
    return <div>No quiz available</div>;
  }

  if (quizEnded) {
    return (
      <div className={styles.modal}>
        <Congrats slides={slides} score={score} />
      </div>
    );
  }

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <span>{`0${currentSlide + 1}/${`0${slides.length}`.slice(-2)}`}</span>
        {slides[currentSlide] && slides[currentSlide].timer !== "OFF" && (
          <span className={styles.timer}>
            {timeLeft !== null
              ? `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}s`
              : ""}
          </span>
        )}
      </div>
      <div className={styles.question}>
        <h2> {slides[currentSlide] && slides[currentSlide].question}</h2>
      </div>
      <div className={styles.options}>
        {slides[currentSlide] &&
          slides[currentSlide].options.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${
                slides[currentSlide].selectedAnswer === index
                  ? styles.selectedOption
                  : ""
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {slides[currentSlide].optionType === "text" && option.text}
              {slides[currentSlide].optionType === "image" && (
                <img src={option.image} alt={`Option ${index + 1}`} />
              )}
              {slides[currentSlide].optionType === "textImage" && (
                <>
                  <span>{option.text}</span>
                  <img src={option.image} alt={`Option ${index + 1}`} />
                </>
              )}
            </button>
          ))}
      </div>
      <button className={styles.nextButton} onClick={handleNextSlide}>
        {currentSlide < slides.length - 1 ? "NEXT" : "SUBMIT"}
      </button>
    </div>
  );
}

export default QuizTest;
