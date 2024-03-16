import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
// Import any other libraries if needed, like for social sign-ins.

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Implement your sign-in logic here
    console.log("Email:", email, "Password:", password);
  };

  const handleSocialSignIn = (service) => {
    // Implement your social sign-in logic here
    console.log("Sign in with:", service);
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
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log("Sign up")}>
        <Text style={styles.signUpText}>
          Don't have an account?
          <Text style={styles.signUpTextorange}> Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: "black",
    marginBottom: 20,
  },
  inputfields: {
    paddingVertical: 10,
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
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  signUpText: {
    color: "black",
    textAlign: "center",
    marginTop: 25,
  },
  signUpTextorange: {
    color: "#fbbd5c",
  },
});

export default LoginPage;
