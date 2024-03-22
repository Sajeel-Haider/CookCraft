import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { logo } from "../assets/logo.jpg";
import { spicy_chicken } from "../assets/spicy_chicken.jpg";
import Svg, { Path } from "react-native-svg";
import SearchBar from "../utils/HomePage/SearchBar";
import IngredientsSection from "../components/HomeScreen/IngredientsSection";
import RecipeCard from "../utils/HomePage/RecipeCard";
import FooterNavigation from "../components/FooterNavigation";

const HomeScreen = () => {
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
    // ... other cards
  ];

  return (
    <View style={{ padding: 16 }}>
      <View className="flex-row">
        <View>
          <Image source={logo} style={{ width: 48, height: 48 }} />
          <View>
            <Text className="text-lg text-darkgrey">Welcome👋</Text>
            <Text className="text-lg">Name</Text>
          </View>
        </View>
        {/* <Svg
          width={20}
          height={20}
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{ width: 20, height: 20 }}
        >
          <Path
            fillRule="evenodd"
            d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
            clipRule="evenodd"
          />
        </Svg> */}
      </View>
      <SearchBar />
      <IngredientsSection />

      <ScrollView style={styles.container}>
        {cardData.map((item, index) => (
          <RecipeCard key={index} {...item} />
        ))}
      </ScrollView>
      <FooterNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
