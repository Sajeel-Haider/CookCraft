// components/FooterNavigation.js
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FooterNavigation = () => {
  const navigate = useNavigation();
  const renderCreateRecipeScreen = () => {
    navigate.navigate("CreateRecipe");
  };
  const renderProfileScreen = () => {
    navigate.navigate("Profile");
  };
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="home" size={24} color="#FFA500" />
        <Text style={styles.navTextActive}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="magnify" size={24} color="#808080" />
        <Text style={styles.navText}>Search</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.navItem}>
        <Icon name="plus-box" size={24} color="#808080" />
        <Text style={styles.navText}>Post</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.navItem}>
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
    borderTopColor: "#e0e0e0", // Light gray border color
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "#808080", // Inactive color
    fontSize: 10,
  },
  navTextActive: {
    color: "#FFA500", // Active color (orange)
    fontSize: 10,
  },
});

export default FooterNavigation;
