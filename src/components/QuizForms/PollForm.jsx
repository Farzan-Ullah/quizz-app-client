import React, { useState } from "react";
import styles from "./PollForm.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { createQuiz, getQuizDetails } from "../../apis/quiz";
import QuizPublish from "./QuizPublish";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

function PollForm({ onBack, onSubmit }) {
  const { quizId } = useParams();
  const [slides, setSlides] = useState([
    {
      question: "",
      options: [
        { text: "", image: "" },
        { text: "", image: "" },
        { text: "", image: "" },
      ],
      optionType: "text",
    },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (slideIndex, optionIndex, value, type) => {
    const newSlides = slides.map((slide, index) => {
      if (index === slideIndex) {
        const newOptions = [...slide.options];
        if (type === "text") {
          newOptions[optionIndex].text = value;
        } else {
          newOptions[optionIndex].image = value;
        }
        return { ...slide, options: newOptions };
      }
      return slide;
    });
    setSlides(newSlides);
  };

  const addOption = (slideIndex) => {
    if (slides[slideIndex].options.length < 4) {
      const newSlides = slides.map((slide, index) => {
        if (index === slideIndex) {
          return {
            ...slide,
            options: [...slide.options, { text: "", image: "" }],
          };
        }
        return slide;
      });
      setSlides(newSlides);
    }
  };

  const removeOption = (slideIndex, optionIndex) => {
    if (slides[slideIndex].options.length > 1) {
      const newSlides = slides.map((slide, index) => {
        if (index === slideIndex) {
          return {
            ...slide,
            options: slide.options.filter((_, i) => i !== optionIndex),
          };
        }
        return slide;
      });
      setSlides(newSlides);
    }
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const addSlide = () => {
    if (slides.length < 5) {
      setSlides([
        ...slides,
        {
          question: "",
          options: [
            { text: "", image: "" },
            { text: "", image: "" },
            { text: "", image: "" },
          ],
          optionType: "text",
        },
      ]);
      setCurrentSlide(slides.length);
    }
  };

  const handleDeleteSlide = (index) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, i) => i !== index);
      setSlides(newSlides);
      if (currentSlide >= newSlides.length) {
        setCurrentSlide(newSlides.length - 1);
      }
    }
  };

  const handleQuestionChange = (slideIndex, value) => {
    const newSlides = slides.map((slide, index) => {
      if (index === slideIndex) {
        return { ...slide, question: value };
      }
      return slide;
    });
    setSlides(newSlides);
  };

  const handleOptionTypeChange = (slideIndex, optionType) => {
    const newSlides = slides.map((slide, index) => {
      if (index === slideIndex) {
        return { ...slide, optionType };
      }
      return slide;
    });
    setSlides(newSlides);
  };

  const validateSlides = () => {
    return slides.every((slide) => {
      const filledOptions = slide.options.filter(
        (option) => option.text.trim() !== "" || option.image.trim() !== ""
      );
      return slide.question.trim() !== "" && filledOptions.length >= 2;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSlides()) {
      return;
    }
    try {
      const quiz = {
        slides: slides.map((slide) => ({
          question: slide.question,
          options: slide.options,
          optionType: slide.optionType,
        })),
      };

      await createQuiz(quiz);

      console.log("poll created", quiz);
      toast.success("Quiz created successfully!");
      setIsModalOpen(true);
      const res = await getQuizDetails(localStorage.getItem("createdQuizId"));
      console.log(res);

      // Assuming onSubmit is a callback passed to the component
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen ? (
        <QuizPublish quizId={quizId} onClose={handleCloseModal} />
      ) : (
        <form className={styles.pollForm}>
          <div className={styles.header}>
            <div className={styles.slideButtons}>
              {slides.map((_, index) => (
                <div key={index} className={styles.slideButtonWrapper}>
                  <button
                    type="button"
                    className={`${styles.slideButton} ${
                      currentSlide === index ? styles.activeSlide : ""
                    }`}
                    onClick={() => handleSlideChange(index)}
                  >
                    {index + 1}
                  </button>
                  {index !== 0 && (
                    <button
                      type="button"
                      className={styles.deleteSlideButton}
                      onClick={() => handleDeleteSlide(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {slides.length < 5 && (
                <button
                  type="button"
                  className={styles.addSlideButton}
                  onClick={addSlide}
                >
                  +
                </button>
              )}
            </div>
            <span>Max 5 questions</span>
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={slides[currentSlide].question}
              onChange={(e) =>
                handleQuestionChange(currentSlide, e.target.value)
              }
              placeholder="Poll Question"
              required
            />
          </div>

          <div className={styles.optionTypes}>
            <span>Option Type</span>
            <input
              type="radio"
              name={`optionType-${currentSlide}`}
              value="text"
              id={`text-option-${currentSlide}`}
              checked={slides[currentSlide].optionType === "text"}
              onChange={() => handleOptionTypeChange(currentSlide, "text")}
            />
            <label htmlFor={`text-option-${currentSlide}`}>Text</label>
            <input
              type="radio"
              name={`optionType-${currentSlide}`}
              value="image"
              id={`img-option-${currentSlide}`}
              checked={slides[currentSlide].optionType === "image"}
              onChange={() => handleOptionTypeChange(currentSlide, "image")}
            />
            <label htmlFor={`img-option-${currentSlide}`}>Image URL</label>
            <input
              type="radio"
              name={`optionType-${currentSlide}`}
              value="textImage"
              id={`img-text-option-${currentSlide}`}
              checked={slides[currentSlide].optionType === "textImage"}
              onChange={() => handleOptionTypeChange(currentSlide, "textImage")}
            />
            <label htmlFor={`img-text-option-${currentSlide}`}>
              Text & Image URL
            </label>
          </div>
          <div className={styles.optionAndTimerContainer}>
            <div className={styles.options}>
              {slides[currentSlide].options.map((option, index) => (
                <div key={index} className={styles.option}>
                  {slides[currentSlide].optionType === "text" && (
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(
                          currentSlide,
                          index,
                          e.target.value,
                          "text"
                        )
                      }
                      placeholder="Text"
                      required
                    />
                  )}
                  {slides[currentSlide].optionType === "image" && (
                    <input
                      type="text"
                      value={option.image}
                      onChange={(e) =>
                        handleOptionChange(
                          currentSlide,
                          index,
                          e.target.value,
                          "image"
                        )
                      }
                      placeholder="Image URL"
                      required
                    />
                  )}
                  {slides[currentSlide].optionType === "textImage" && (
                    <div className={styles.textImgOption}>
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(
                            currentSlide,
                            index,
                            e.target.value,
                            "text"
                          )
                        }
                        placeholder="Text"
                        required
                      />
                      <input
                        type="text"
                        value={option.image}
                        onChange={(e) =>
                          handleOptionChange(
                            currentSlide,
                            index,
                            e.target.value,
                            "image"
                          )
                        }
                        placeholder="Image URL"
                        required
                      />
                    </div>
                  )}
                  {index >= 2 && (
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => removeOption(currentSlide, index)}
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  )}
                </div>
              ))}
              {slides[currentSlide].options.length < 4 && (
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => addOption(currentSlide)}
                >
                  Add Option
                </button>
              )}
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onBack}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.createButton}
              onClick={handleSubmit}
            >
              Create Quiz
            </button>
          </div>
        </form>
      )}
      <Toaster />
    </>
  );
}

export default PollForm;
