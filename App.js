import "react-native-gesture-handler";
import React from "react";
import ProtectRoutes from "./src/hooks/protectStacks";
import AppProvider from "./src/hooks/AppProvider";
export default function App() {
  return (
    <AppProvider>
      <ProtectRoutes />
    </AppProvider>
  );
}
