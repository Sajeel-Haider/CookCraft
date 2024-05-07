import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FooterNavigation = () => {
  const navigate = useNavigation();

  const renderCreateRecipeScreen = () => {
    navigate.navigate("CreateRecipe");
  };
  const renderProfileScreen = () => {
    navigate.navigate("Profile");
  };
  const renderMealPage = () => {
    navigate.navigate("Meal");
  };
  const renderHomePage = () => {
    navigate.navigate("Home");
  };
  const renderGroceryPage = () => {
    navigate.navigate("GroceryList");
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navItem} onPress={renderHomePage}>
        <Icon name="home" size={24} color="#FFA500" />
        <Text style={styles.navTextActive}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={renderGroceryPage}>
        <Icon name="cart-minus" size={24} color="#808080" />
        <Text style={styles.navText}>Grocery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={renderMealPage}>
        <Icon name="food" size={25} color="rgb(143, 143, 143)" />

        <Text style={styles.navText}>Meals</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={renderCreateRecipeScreen}
      >
        <Icon
          name="silverware-fork-knife"
          size={25}
          color="rgb(143, 143, 143)"
        />
        <Text style={styles.navText}>Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={renderProfileScreen}>
        <Icon name="account-circle-outline" size={24} color="#808080" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "#808080",
    fontSize: 10,
  },
  navTextActive: {
    color: "#FFA500",
    fontSize: 10,
  },
});

export default FooterNavigation;
