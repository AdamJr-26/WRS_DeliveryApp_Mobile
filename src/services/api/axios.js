import Axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosAPI = () => {
  const axiosInstance = Axios.create({
    baseURL: "https://wrss-backend.onrender.com",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  axiosInstance.interceptors.request.use(async (req) => {
    const access_token = await SecureStore.getItemAsync("userToken");
    req.headers.authorization = access_token;
    return req;
  });
  return axiosInstance;
};
export default axiosAPI;
