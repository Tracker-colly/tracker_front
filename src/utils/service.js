import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["scd"] = "trackerscd";

axios.interceptors.response.use(
  (response) => {
    let data = response?.data;
    if (data) {
      if (data.code === 1000) {
        // 로그인 필요
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
    return response;
  },
  (error) => {
    let conifg = error.config;
    let data = error.response?.data;
    if (data) {
      if (data.code === 1000) {
        // 로그인 필요
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export const postData = (url, sender = {}) => {
  let token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
  }

  // let dm = "http://localhost:4000";
  let dm = `${process.env.REACT_APP_API_URL}`;

  return axios.post(dm + `${url}`, sender);
};
