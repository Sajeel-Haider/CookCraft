import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
const MealScreen = () => {
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigate.navigate("ManualMealPlan")}
        >
          <Text style={styles.buttonText}>Manual Menu</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigate.navigate("AutoMealPlan")}
        >
          <Text style={styles.buttonText}>Automated Menu</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#007F73",
  },
  secondaryButton: {
    backgroundColor: "#fbbd5c",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default MealScreen;
