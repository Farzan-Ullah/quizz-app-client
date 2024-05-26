import axios from "axios";
const backendUrl = `http://localhost:3001/api`;

export const createQuiz = async (slides) => {
  try {
    const reqUrl = `${backendUrl}/quiz/create`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, slides);
    //   return response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
