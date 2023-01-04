import * as SecureStore from "expo-secure-store";
async function handleError(statusCode) {
  if ([401, 403].includes(statusCode)) {
    await SecureStore.deleteItemAsync("userToken");
    location.reload();
  }
}

export default handleError;
