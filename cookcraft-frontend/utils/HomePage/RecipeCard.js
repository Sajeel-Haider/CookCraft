import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const RecipeCard = ({ image, title, rating, time, authorName }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.rating}>{rating} ⭐</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.author}>{authorName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 8,
  },
  image: { width: "100%", height: 200, borderRadius: 8 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    fontSize: 16,
    color: "#FFA000", // Change color according to your theme
  },
  time: {
    fontSize: 16,
  },
  author: {
    fontSize: 16,
  },
});

export default RecipeCard;
