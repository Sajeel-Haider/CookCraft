import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { CheckBox } from "expo";

// import { MaterialIcons } from '@expo/vector-icons';

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignUp = () => {
    // Here, you would handle the sign-up logic, possibly validating
    // the input and then sending it to your backend.
    console.log(
      "Name:",
      name,
      "Email:",
      email,
      "Password:",
      password,
      "Confirm Password:",
      confirmPassword
    );
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
        <Checkbox
          value={termsAccepted}
          onValueChange={setTermsAccepted}
          color={termsAccepted ? "#fbbd5c" : "#fbbd5c"}
        />
        <Text style={styles.termsText}>Accept terms & Condition</Text>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
        {/* <MaterialIcons name="arrow-forward" size={24} color="white" style={tailwind('ml-2')} /> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log("Already a member ? Sign In")}
      >
        <Text style={styles.signInText}>
          Already a member ?<Text style={styles.signInTextBold}> Sign In</Text>
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
  termsText: {
    fontSize: 13,
    color: "#fbbd5c",
    marginLeft: 10,
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
  // Add styles for the rest of the elements as needed
});

export default SignUpPage;
