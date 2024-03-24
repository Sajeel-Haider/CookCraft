import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { user } from "../assets/user.png";
import { spicy_chicken } from "../assets/spicy_chicken.jpg";
import SearchBar from "../utils/HomePage/SearchBar";
import IngredientsSection from "../components/HomeScreen/IngredientsSection";
import RecipeCard from "../utils/HomePage/RecipeCard";
import FooterNavigation from "../components/FooterNavigation";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  const user = useSelector((state) => state.user);
  const userProfileImage = require("../assets/user.png"); // Ensure correct path
  const spicy_chicken = require("../assets/spicy_chicken.jpg");
  const cardData = [
    {
      image: spicy_chicken,
      title: "Spiced Fried Chicken",
      rating: "4.5",
      time: "30 min",
      authorName: "Yumna Azzahra",
      description:
        "Indonesian Fried Chicken or Ayam Goreng, is a delicious and popular dish that showcases the vibrant flavors of Indonesian cuisine.",
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
          {/* Notification Icon */}
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
