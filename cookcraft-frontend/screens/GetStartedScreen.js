import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import cooking from "../assets/Cooking.png";

const App = () => {
  const navigate = useNavigation();

  const renderNextPage = () => {
    navigate.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.skipContainer}></View>
      <Image source={cooking} style={styles.image} resizeMode="contain" />
      <Text style={styles.heading}>Thousands of tested recipes</Text>
      <Text style={styles.subHeading}>
        There is no need to fear failure. Tested recipes are guaranteed to work
        by our professional chefs.
      </Text>
      <TouchableOpacity onPress={() => renderNextPage()} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  skipContainer: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
  skipText: {
    color: "#000",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 100,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 100,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007F73",
    padding: 15,
    borderRadius: 30,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default App;
