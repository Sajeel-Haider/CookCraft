import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import config from "../config.development";
import RecipeCard from "../utils/HomePage/RecipeCard";

const AutoMealPlanScreen = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeIds, setRecipeIds] = useState([]);

  const navigate = useNavigation();

  const fetchRecommendations = () => {
    const postData = { ingredients: ingredients.split(" ").join(", ") };
    axios
      .post(`${config.FLASK_API_URL}/recommend`, postData)
      .then((response) => {
        const fetchedRecipes = response.data;
        const filteredRecipes = fetchedRecipes.filter(
          (recipe) => recipe.similarity_score > 0.3
        );
        const ids = filteredRecipes.map((item) => item._id);
        setRecipeIds(ids);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  };

  useEffect(() => {
    if (recipeIds.length > 0) {
      const fetchRecipes = async () => {
        try {
          const responses = await Promise.all(
            recipeIds.map((id) => axios.get(`${config.API_URL}/recipe/${id}`))
          );
          setRecipes(responses.map((res) => res.data));
        } catch (error) {
          console.error("Fetching detailed recipes failed: ", error);
        }
      };
      fetchRecipes();
    }
  }, [recipeIds]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setIngredients}
        value={ingredients}
        placeholder="Enter ingredients separated by commas"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={fetchRecommendations}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigate.navigate("RecipeDetails", { recipe: item })}
            style={styles.card}
          >
            <RecipeCard {...item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9f9f9", // Light grey background for the whole screen
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10, // Rounded corners for the text input
  },
  button: {
    backgroundColor: "#007F73", // iOS blue color for the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20, // Rounded corners for the button
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff", // White text color
    fontSize: 16, // Text size
    fontWeight: "bold", // Bold text
  },
  card: {
    marginBottom: 10, // Space between cards
  },
});

export default AutoMealPlanScreen;
