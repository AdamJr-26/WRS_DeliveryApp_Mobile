import axiosAPI from "./axios";
import handleError from "./handleError";

export const apiPost = async ({ url, payload }) => {
  try {
    const res = await axiosAPI().post(url, payload);
    await handleError(res.status);
    return { data: res?.data };
  } catch (error) {
    return { error };
  }
};
export const apiGet = async (url) => {
  try {
    const res = await axiosAPI().get(url);
    await handleError(res.status);
    return { data: res?.data };
  } catch (error) {
    return { error: error?.response?.data };
  }
};
export const apiPut = async ({ url, payload }) => {
  try {
    const res = await axiosAPI().put(url, payload);
    await handleError(res.status);
    return { data: res?.data };
  } catch (error) {
    return { error };
  }
};
export const apiPutWithFile = async ({ url, payload }) => {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload?.body));
    formData.append("image", JSON.stringify(payload?.file));
    const res = await axiosAPI().put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = res.data;
    return { data };
  } catch (error) {
    console.log("[error]", error)
    return { error };
  }
};

export const apiDelete = async ({ url }) => {
  try {
    const res = await axiosAPI().delete(url);
    await handleError(res.status);
    return { data: res?.data };
  } catch (error) {
    return { error };
  }
};
