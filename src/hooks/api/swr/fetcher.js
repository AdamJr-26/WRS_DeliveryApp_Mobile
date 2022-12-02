import axiosAPI from "../../../services/api/axios";

const fetcher = (...args) => {
  return axiosAPI().get(...args).then((res) => res.data);
};

export default fetcher;
