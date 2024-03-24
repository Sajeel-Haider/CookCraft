import AppNavigation from "./navigation";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar
        hidden={false}
        backgroundColor="white"
        barStyle="light-content"
        translucent={false}
      ></StatusBar>
      <AppNavigation></AppNavigation>
    </>
  );
}
