import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { logo } from "../assets/logo.jpg";
import { spicy_chicken } from "../assets/spicy_chicken.jpg";
import SearchBar from "../utils/HomePage/SearchBar";
import IngredientsSection from "../components/HomeScreen/IngredientsSection";
import RecipeCard from "../utils/HomePage/RecipeCard";
import FooterNavigation from "../components/FooterNavigation";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
  const logo = require("../assets/logo.jpg"); // Ensure correct path
  const spicy_chicken = require("../assets/spicy_chicken.jpg");
  const cardData = [
    {
      image: spicy_chicken,
      title: "Spiced Fried Chicken",
      rating: "4.5",
      time: "30 min",
      authorName: "Yumna Azzahra",
    },
    {
      image: spicy_chicken,
      title: "Spiced Fried Chicken",
      rating: "4.5",
      time: "30 min",
      authorName: "Yumna Azzahra",
    },
    // Add more card data as needed
  ];
  const navigate = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={logo}
            style={{ width: 48, height: 48, borderRadius: 30 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text>Welcome👋</Text>
            <Text>Name</Text>
          </View>
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
