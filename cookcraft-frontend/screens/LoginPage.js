import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Config from "react-native-config";

import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigation();

  const handleSignIn = () => {
    console.log("Email:", email, "Password:", password);

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }
    console.log(Config.API_URL);
    const userData = {
      email: email,
      password: password,
    };
    axios
      .post(`${Config.API_URL}/login`, userData)
      .then((response) => {
        console.log("Login successful:", response.data);
        renderHomeScreen();
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
      });
  };

  const handleSocialSignIn = (service) => {
    console.log("Sign in with:", service);
  };
  const renderHomeScreen = () => {
    navigate.navigate("Home");
  };
  const renderSignupScreen = () => {
    navigate.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello,</Text>
      <Text style={styles.subtitle}>Welcome Back!</Text>
      <Text style={styles.inputfields}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter Email"
        keyboardType="email-address"
      />
      <Text style={styles.inputfields}>Enter Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter Password"
        secureTextEntry
      />

      <TouchableOpacity onPress={() => console.log("Forgot Password")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => renderSignupScreen()}>
        <Text style={styles.signUpText}>
          Don't have an account ?
          <Text style={styles.signUpTextorange}> Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    color: "black",
    marginBottom: 20,
  },
  inputfields: {
    paddingVertical: 5,
  },
  input: {
    borderWidth: 1.8,
    borderRadius: 8,
    borderColor: "#e2e2e2",
    padding: 10,
    marginBottom: 15,
  },
  forgotPassword: {
    textAlign: "left",
    paddingLeft: 5,
    color: "#fbbd5c",
  },
  signInButton: {
    backgroundColor: "#129575",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  signInButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orSignInWith: {
    color: "gray",
    paddingHorizontal: 10,
  },
  signUpText: {
    color: "black",
    textAlign: "center",
    marginTop: 25,
  },
  signUpTextorange: {
    fontWeight: "bold",
    color: "#fbbd5c",
  },
});

export default LoginPage;
