import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend API URL
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
