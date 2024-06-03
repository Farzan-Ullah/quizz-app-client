import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { getAllQuizzes, deleteQuiz } from "../../apis/quiz";
import Modal from "../CreateQuiz/Modal";
import DeleteQuiz from "./DeleteQuiz";
import QuestionAnalysis from "./QuestionAnalysis";
import QnAForm from "../QuizForms/QnAForm";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Analytics({ formatDate, slidesData }) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    async function fetchAllQuizzes() {
      try {
        const quizzes = await getAllQuizzes();
        setAllQuizzes(quizzes);
      } catch (error) {
        console.error("Error fetching all quizzes:", error);
      }
    }
    fetchAllQuizzes();
  }, []);

  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await deleteQuiz(quizId);
      console.log(response);

      const quizzes = await getAllQuizzes();
      setAllQuizzes(quizzes);
      closeModal();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const copyToClipboard = (quizLink) => {
    navigator.clipboard.writeText(quizLink).then(
      () => {
        toast.success("Link copied to clipboard!", {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: false,
          transition: Slide,
        });

        console.log("URL copied to clipboard:", quizLink);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleShareClick = (quizId) => {
    const quizLink = `${window.location.origin}/quiz-test/${quizId}`;
    copyToClipboard(quizLink);
  };

  const handleDeleteClick = (quizId) => {
    setQuizToDelete(quizId);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setQuizToDelete(null);
  };

  const handleAnalysisClick = (quiz) => {
    console.log("Selected Quiz:", quiz);
    setSelectedQuiz(quiz);
    setShowAnalysis(true);
  };

  const handleEditClick = (quiz) => {
    setEditQuiz(quiz);
    console.log(quiz);
    setIsEditModalOpen(true);
  };

  return (
    <div className={styles.analyticsContainer}>
      {!showAnalysis ? (
        <>
          <h2>Quiz Analysis</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Quiz Name</th>
                <th>Created on</th>
                <th>Impression</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allQuizzes.map((quiz, index) => (
                <tr key={quiz.id}>
                  <td>{index + 1}</td>
                  <td>{quiz.quizName}</td>
                  <td>{formatDate(quiz.createdAt)}</td>
                  <td>{quiz.totalImpressions}</td>
                  <td className={styles.buttonContainer}>
                    <button
                      className={`${styles.button} ${styles.editButton}`}
                      onClick={() => handleEditClick(quiz)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className={`${styles.button} ${styles.deleteButton}`}
                      onClick={() => handleDeleteClick(quiz._id)}
                    >
                      <RiDeleteBin6Fill />
                    </button>
                    <button
                      className={`${styles.button} ${styles.shareButton}`}
                      onClick={() => handleShareClick(quiz._id)}
                    >
                      <IoShareSocial />
                    </button>
                  </td>
                  <td>
                    <span
                      className={styles.link}
                      onClick={() => handleAnalysisClick(quiz)}
                    >
                      Question Wise Analysis
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          {" "}
          <QuestionAnalysis quiz={selectedQuiz} />
        </>
      )}
      <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
        <DeleteQuiz
          onDeleteConfirm={() => handleDeleteQuiz(quizToDelete)}
          onCancel={closeModal}
        />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {editQuiz && (
          <QnAForm
            quizName={editQuiz.quizName}
            isEditMode={true}
            quizId={editQuiz._id}
            slides={slidesData}
            onBack={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
      <ToastContainer
        closeButton={false}
        autoClose={1000}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
        toastClassName={styles.toast}
        position="top-center"
        transition={Slide}
      />
    </div>
  );
}

export default Analytics;
