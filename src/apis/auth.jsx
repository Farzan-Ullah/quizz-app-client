import axios from "axios";

const backendUrl = `https://quizzie-app-service.onrender.com/api`;
// const banckendUrl = `http://localhost:3001/api`;

export const registerUser = async ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  try {
    const reqUrl = `${backendUrl}/userauth/register`;
    const response = await axios.post(reqUrl, {
      username,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${backendUrl}/userauth/login`;
    const response = await axios.post(reqUrl, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.name);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
