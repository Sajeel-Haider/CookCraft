import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const RecipeDetails = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={recipe.image} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{recipe.authorName}</Text>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      {/* Add other details like description, ingredients, etc. */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300, // Adjust as necessary
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  userName: {
    fontSize: 16,
  },
  followButton: {
    backgroundColor: "#FFA500", // Use your theme color
    padding: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: "#FFFFFF",
  },
  // Add styles for other components like description, ingredients, etc.
});

export default RecipeDetails;
