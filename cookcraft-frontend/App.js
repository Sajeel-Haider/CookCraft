import AppNavigation from "./navigation";
import { StatusBar } from "react-native";
import store from "./store/index";
import { Provider } from "react-redux";
import { ModalPortal } from "react-native-modals";
import { Provider as PaperProvider } from "react-native-paper";
export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <StatusBar
          hidden={false}
          backgroundColor="white"
          barStyle="light-content"
          translucent={false}
        ></StatusBar>
        <AppNavigation></AppNavigation>
        <ModalPortal />
      </Provider>
    </PaperProvider>
  );
}
