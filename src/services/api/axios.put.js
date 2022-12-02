import axiosAPI from "./axios";

export const apiPut = async ({ url, payload }) => {
  try {
    const res = await axiosAPI().put(url, payload);
    return { data: res?.data };
  } catch (error) {
    return { error };
  }
};
