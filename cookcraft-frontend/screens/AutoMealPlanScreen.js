import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios"; // Import axios
import config from "../config.development";
import RecipeCard from "../utils/HomePage/RecipeCard";

const AutoMealPlanScreen = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeIds, setRecipeIds] = useState([]);

  const navigate = useNavigation();

  const fetchRecommendations = () => {
    console.log(config.FLASK_API_URL);
    console.log(ingredients);
    const postData = { ingredients: ingredients.split(" ").join(", ") };

    console.log(postData);
    axios
      .post(`${config.FLASK_API_URL}/recommend`, postData)
      .then((response) => {
        const ids = response.data.map((item) => item._id);
        setRecipeIds(ids);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  useEffect(() => {
    if (recipeIds.length > 0) {
      const fetchRecipes = async () => {
        try {
          const responses = await Promise.all(
            recipeIds.map((id) => axios.get(`${config.API_URL}/recipe/${id}`))
          );
          const recipesData = responses.map((res) => res.data);
          console.log("Fetched Recipes: ", recipesData);
          setRecipes(recipesData);
        } catch (error) {
          console.error("Fetching detailed recipes failed: ", error);
        }
      };

      fetchRecipes();
    }
  }, [recipeIds]);

  return (
    <View style={{ padding: 24 }}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setIngredients}
        value={ingredients}
        placeholder="Enter ingredients separated by commas"
      />
      <Button title="Get Recommendations" onPress={fetchRecommendations} />

      {recipes.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigate.navigate("RecipeDetails", { recipe: item })}
        >
          <RecipeCard {...item} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AutoMealPlanScreen;
