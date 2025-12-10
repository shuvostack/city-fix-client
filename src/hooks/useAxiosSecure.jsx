import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("cityfix-token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
