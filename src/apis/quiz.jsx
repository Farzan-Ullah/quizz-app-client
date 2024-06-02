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
    const response = await axios.get(reqUrl);
    return response.data.quiz;
  } catch (error) {
    console.error("Error fetching quiz:", error);
  }
};

export const getQuizByUser = async (userId) => {
  try {
    const reqUrl = `${backendUrl}/quiz/quizz`;
    const response = await axios.get(reqUrl, { userId });
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
  }
};

export const updateImpressions = async (quizId) => {
  try {
    const reqUrl = `${backendUrl}/quiz/update-impressions/${quizId}`;
    const response = await axios.put(reqUrl);
    return response.data;
  } catch (error) {
    console.error("Error updating impressions:", error);
  }
};

export const getAllQuizzes = async () => {
  try {
    const reqUrl = `${backendUrl}/quiz/all`;
    const response = await axios.get(reqUrl);
    return response.data.quizzes;
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
  }
};
