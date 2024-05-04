import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RecipeCard = ({
  image_link,
  Recipe_Title,
  cooking_time,
  user,
  averageRating,
  ratings,
}) => {
  // Function to render stars based on the average rating
  const renderStars = (rating) => {
    console.log(rating);
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <>
        {Array(fullStars).fill(<Icon name="star" size={16} color="#FFD700" />)}
        {halfStar > 0 && <Icon name="star-half" size={16} color="#FFD700" />}
        {Array(emptyStars).fill(
          <Icon name="star-o" size={16} color="#FFD700" />
        )}
      </>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image_link }} style={styles.image} />
      <Text style={styles.title}>{Recipe_Title}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.rating}>{renderStars(averageRating)}</View>
        <Text style={styles.time}>{cooking_time}</Text>
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
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 16,
  },
});

export default RecipeCard;
