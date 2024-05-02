import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

import SearchBar from "../utils/HomePage/SearchBar";
import IngredientsSection from "../components/HomeScreen/IngredientsSection";
import RecipeCard from "../utils/HomePage/RecipeCard";
import FooterNavigation from "../components/FooterNavigation";
import config from "../config.development";

const HomeScreen = () => {
  const [cardData, setCardData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([
    { name: "Chicken", selected: false },
    { name: "Potato", selected: false },
    { name: "Carrot", selected: false },
  ]);

  const userProfileImage = require("../assets/user.png");
  const user = useSelector((state) => state.user);
  const navigate = useNavigation();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/recipes`);
      setCardData(response.data);
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const selectedIngredientsNames = ingredients
      .filter((ingr) => ingr.selected)
      .map((ingr) => ingr.name);

    const ingredientFiltered =
      selectedIngredientsNames.length > 0
        ? cardData.filter((recipe) =>
            recipe.ingredients.some((ingredient) =>
              selectedIngredientsNames.includes(ingredient.name)
            )
          )
        : cardData;

    const searchFiltered = search.trim()
      ? ingredientFiltered.filter((recipe) =>
          recipe.Recipe_Title.toLowerCase().includes(search.toLowerCase())
        )
      : ingredientFiltered;

    setFilteredRecipes(searchFiltered);
  }, [ingredients, cardData, search]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigate.navigate("Profile")}>
              <Image
                source={userProfileImage}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 30,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
            <View>
              <Text>Welcome👋</Text>
              <Text>{user.name}</Text>
            </View>
          </View>
          <Icon name="bell-outline" size={30} color="rgb(143, 143, 143)" />
        </View>
        <SearchBar setSearch={setSearch} />
        <IngredientsSection
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        {filteredRecipes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigate.navigate("RecipeDetails", { recipe: item })}
          >
            <RecipeCard {...item} />
          </TouchableOpacity>
        ))}
        <FooterNavigation />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
