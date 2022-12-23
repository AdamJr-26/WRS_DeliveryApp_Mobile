import Axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosAPI = () => {
  const axiosInstance = Axios.create(
    {
     baseURL: "http://192.168.68.108:4000/",
     headers: {
       "Content-Type": "application/json",
     },
     withCredentials: true,
   })
   axiosInstance.interceptors.request.use(async req=>{
    const access_token  = await SecureStore.getItemAsync("userToken")
    req.headers.authorization  = access_token
    return req
   })
  return axiosInstance ;
};
export default axiosAPI;
