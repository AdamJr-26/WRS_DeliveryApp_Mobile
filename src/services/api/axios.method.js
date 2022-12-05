import axiosAPI from "./axios";

export const apiPost = async ({ url, payload }) => {
  try {
    console.log("payload",payload)
    const res = await axiosAPI().post(url, payload);
    console.log("res",res.data)
    return { data: res?.data };
  } catch (error) {
    return { error };
  }
};

export const apiPut = async ({ url, payload }) => {
  try {
    const res = await axiosAPI().put(url, payload);
    return { data: res?.data };
  } catch (error) {
    return { error };
  }
};
