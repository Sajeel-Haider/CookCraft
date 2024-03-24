import AppNavigation from "./navigation";
import { StatusBar } from "react-native";
import store from "./store/index";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar
        hidden={false}
        backgroundColor="white"
        barStyle="light-content"
        translucent={false}
      ></StatusBar>
      <AppNavigation></AppNavigation>
    </Provider>
  );
}
