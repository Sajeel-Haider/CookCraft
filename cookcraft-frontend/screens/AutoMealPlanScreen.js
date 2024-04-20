import React, { useState } from "react";
import { View, TextInput, Button, Text, FlatList } from "react-native";
import config from "../config.development";
const AutoMealPlanScreen = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecommendations = () => {
    fetch(`http://${config.API_URL}/api/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredients.split(",") }),
    })
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <View style={{ padding: 24 }}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setIngredients(text)}
        value={ingredients}
        placeholder="Enter ingredients separated by commas"
      />
      <Button title="Get Recommendations" onPress={fetchRecommendations} />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text>
            {item.Recipe_Title}: {item.ingredients} (Score:{" "}
            {item.similarity_score})
          </Text>
        )}
      />
    </View>
  );
};

export default AutoMealPlanScreen;
