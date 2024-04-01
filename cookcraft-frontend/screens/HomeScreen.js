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

  const userProfileImage = require("../assets/user.png");

  const user = useSelector((state) => state.user);

  const navigate = useNavigation();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/recipes`);
      setCardData(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  });

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
            <Image
              source={userProfileImage}
              style={{
                width: 48,
                height: 48,
                borderRadius: 30,
                marginRight: 10,
              }}
            />
            <View>
              <Text>Welcome👋</Text>
              <Text>{user.name}</Text>
            </View>
          </View>
          <Icon name="bell-outline" size={30} color="rgb(143, 143, 143)" />
        </View>
        <SearchBar />
        <IngredientsSection />
        {cardData.map((item, index) => (
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
