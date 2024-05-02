import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const IngredientsSection = ({
  ingredients,
  setIngredients,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const toggleSelection = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingr, i) =>
        i === index ? { ...ingr, selected: !ingr.selected } : ingr
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What's on your mind?</Text>
      <View style={styles.ingredientsRow}>
        {ingredients.map((ingr, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.ingredientButton,
              ingr.selected && styles.selectedIngredient,
            ]}
            onPress={() => toggleSelection(index)}
          >
            <Text
              style={[
                styles.ingredientText,
                ingr.selected && styles.selectedIngredientText,
              ]}
            >
              {ingr.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ingredientsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  ingredientButton: {
    backgroundColor: "#fff",
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  ingredientText: {
    fontSize: 14,
    color: "black",
  },
  selectedIngredient: {
    backgroundColor: "#4CCD99",
  },
  selectedIngredientText: {
    color: "black",
  },
});

export default IngredientsSection;
