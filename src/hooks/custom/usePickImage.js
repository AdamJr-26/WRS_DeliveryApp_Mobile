import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Buffer } from "buffer";

const usePickImage = () => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    console.log("Picking image...");
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result?.cancelled) {
        // console.log("[resImage]", result);
        const resImage = {
          buffer: Buffer.from(result?.base64, "base64"),
          uri: result.uri,
          type: result.type,
          originalname: result?.uri,
          height: result.height,
          mimetype: result?.type,
        };
        setImage(resImage);
      } else {
        setImage(null);
      }
    } catch (error) {
      setImage(null);
      console.log("error", error);
    }
  };
  console.log("image", image?.uri);
  return [image, pickImage];
};

export default usePickImage;
