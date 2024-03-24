import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import api from "../config/axiosConfig";
import Config from "react-native-config";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigation();

  const renderLoginPage = () => {
    navigate.navigate("Login");
  };

  const renderHomePage = () => {
    navigate.navigate("Home");
  };

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword || !termsAccepted) {
      console.error("All fields are required");
      return;
    }
    axios
      .post(`${Config.API_URL}/signup`, {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Signup successful:", response.data);
        renderHomePage();
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error status", error.response.status);
          console.error("Error data", error.response.data);
          console.error("Error headers", error.response.headers);
        } else if (error.request) {
          console.error("Error request", error.request);
        } else {
          console.error("Error", error.message);
        }
        console.error("Error config", error.config);
      });
  };

  const toggleTermsAcceptance = () => {
    setTermsAccepted(!termsAccepted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>
        Let's help you set up your account, it won't take long.
      </Text>
      <Text style={styles.inputfileds}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <Text style={styles.inputfileds}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Text style={styles.inputfileds}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Text style={styles.inputfileds}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={toggleTermsAcceptance}
        >
          {termsAccepted ? (
            <MaterialIcons name="check-box" size={24} color="#fbbd5c" />
          ) : (
            <MaterialIcons
              name="check-box-outline-blank"
              size={24}
              color="#fbbd5c"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.termsText}>Accept terms & Condition</Text>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log("Already a member? Sign In")}
      >
        <Text style={styles.signInText}>
          Already a member ?
          <Text style={styles.signInTextBold} onPress={() => renderLoginPage()}>
            {" "}
            Sign In
          </Text>
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
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 30,
  },
  inputfileds: {
    paddingVertical: 5,
  },
  input: {
    borderWidth: 1.8,
    borderRadius: 8,
    borderColor: "#e2e2e2",
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    fontSize: 13,
    color: "#fbbd5c",
  },
  signUpButton: {
    backgroundColor: "#129575",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInText: {
    textAlign: "center",
  },
  signInTextBold: {
    fontWeight: "bold",
    color: "#fbbd5c",
  },
});

export default SignUpPage;
