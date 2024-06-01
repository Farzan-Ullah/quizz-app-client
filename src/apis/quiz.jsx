import axios from "axios";
const backendUrl = `https://quizzie-app-service.onrender.com/api`;
// const backendUrl = `http://localhost:3001/api`;

export const createQuiz = async (slides) => {
  try {
    const reqUrl = `${backendUrl}/quiz/create`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, slides);
    const createdQuizId = response.data.quiz._id;
    localStorage.setItem("createdQuizId", createdQuizId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getQuizDetails = async (quizId) => {
  try {
    const reqUrl = `${backendUrl}/quiz/quizz/${quizId}`;
    // const token = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    return response.data.quiz;
    // console.log("QuizId", response.data.quiz._id);
  } catch (error) {
    console.error("Error fetching quiz:", error);
  }
};
