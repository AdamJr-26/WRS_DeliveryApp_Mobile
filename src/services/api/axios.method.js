import axiosAPI from "./axios";

export const apiPost = async ({ url, payload }) => {
  console.log("payload", payload);
  console.log("url", url);
  try {
    const res = await axiosAPI().post(url, payload);
    console.log("res", res.data);
    return { data: res?.data };
  } catch (error) {
    return { error };
  }
};
export const apiGet = async ( url) => {
  try {
    const res = await axiosAPI().get(url);
    // console.log("[get]", res.data);
    return { data: res?.data };
  } catch (error) {
    return { error: error?.response?.data };
  }
};
export const apiPut = async ({ url, payload }) => {
  try {
    const res = await axiosAPI().put(url, payload);
    return { data: res?.data };
  } catch (error) {
    console.log("errorerrorerror", error);
    return { error };
  }
};
