import React from "react";
import { View, Text, Image,StyleSheet } from "react-native";
import logo from "../assets/logo.jpg";

const HomeScreen = () => {
  return (

    <View style={styles.view}>
        <Image source={logo} style={styles.Image} />
    </View>
  );
};
const styles = StyleSheet.create({
  Image:{
    width: 50,
    height: 50,
   
  },
  view:{
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreen;
