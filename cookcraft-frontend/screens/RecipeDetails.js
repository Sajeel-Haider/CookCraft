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
      <Image source={{ uri: recipe.image_link }} style={styles.image} />
      <Text style={styles.title}>{recipe.Recipe_Title}</Text>
      <View style={styles.userInfo}>
        {/* <Text style={styles.userName}>{recipe.user}</Text> */}
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Description</Text>
        <Text>{recipe.Description}</Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            {ingredient.name}: {ingredient.quantity}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
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
    backgroundColor: "#FFA500",
    padding: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: "#FFFFFF",
  },
});

export default RecipeDetails;
