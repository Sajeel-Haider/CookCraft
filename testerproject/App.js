import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MotiView } from "react-native-reanimated";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>
        Let's help you set up your account, it won't take long.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        placeholderTextColor="#a9a9a9"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor="#a9a9a9"
      />

      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter Password"
        placeholderTextColor="#a9a9a9"
      />

      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm Password"
        placeholderTextColor="#a9a9a9"
      />

      <TouchableOpacity style={styles.checkboxContainer}>
        <View style={styles.checkbox} />
        <Text style={styles.checkboxLabel}>Accept terms & Condition</Text>
      </TouchableOpacity>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </MotiView>

      <View style={styles.socialLoginContainer}>
        <Text style={styles.orText}>Or Sign in With</Text>
        {/* Add social buttons here */}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already a member? Sign In</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 50,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eaeaea",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#333",
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#34C759",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  socialLoginContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  orText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#007AFF",
  },
});

export default App;
