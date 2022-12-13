import axiosAPI from "./axios";
export const createCustomer = async (file, body) => {
//   console.log(body);
//   console.log(file);
  const formData = new FormData();
  formData.append("data", JSON.stringify(body));
  formData.append("image", JSON.stringify(file));
  try {
    const res = await axiosAPI().post("/api/customer/wrs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = res.data;
    return { data };
  } catch (error) {
    console.log("[api.create.custoemr]", error)
    return { error };
  }
};
