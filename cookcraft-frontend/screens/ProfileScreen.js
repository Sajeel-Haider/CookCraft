import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("My recipe");

  const tabItems = ["My recipe"]; //, "Tested recipe", "Cookbook"];
  const authUser = useSelector((state) => state.user);
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  // Placeholder for profile data and recipe images
  const profileData = {
    name: authUser.name,
    username: "@" + authUser.name,
    recipesCount: 29,
    followersCount: 144,
    followingCount: 306,
    profileImage: require("../assets/user.png"), // Replace with actual image URL
    recipes: [
      {
        id: "1",
        name: "Shrimp with Garlic",
        likes: 186,
        image: require("../assets/spicy_chicken.jpg"),
      },
      {
        id: "2",
        name: "Spicy Sausage",
        likes: 503,
        image: require("../assets/spicy_chicken.jpg"),
      },
      // ...more recipes
    ],
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={item.image} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{item.name}</Text>
      <View style={styles.likesContainer}>
        <Icon name="heart" size={16} color="#888" />
        <Text style={styles.likesCount}>{item.likes}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={profileData.profileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>{profileData.name}</Text>
        <Text style={styles.profileUsername}>{profileData.username}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stat}>{profileData.recipesCount} Recipes</Text>
          <Text style={styles.stat}>
            {profileData.followersCount} Followers
          </Text>
          <Text style={styles.stat}>
            {profileData.followingCount} Following
          </Text>
        </View>
        {/* <TouchableOpacity style={styles.manageProfileButton}>
          <Text style={styles.manageProfileButtonText}>Manage profile</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.tabsContainer}>
        {tabItems.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === tab ? styles.activeTab : null]}
            onPress={() => handleTabPress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab ? styles.activeTabText : null,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={profileData.recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={styles.recipesList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileUsername: {
    color: "#aaa",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  stat: {
    fontSize: 16,
    fontWeight: "500",
  },
  manageProfileButton: {
    backgroundColor: "#FFD700", // Your button color
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  manageProfileButtonText: {
    color: "#fff",
  },
  recipesList: {
    paddingHorizontal: 10,
  },
  recipeCard: {
    flex: 1 / 2,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: 150, // Adjust as needed
  },
  recipeName: {
    fontWeight: "bold",
    margin: 5,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  likesCount: {
    marginLeft: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007F73", // Use your app's active color here
  },
  activeTabText: {
    fontWeight: "bold",
  },
  tabText: {
    color: "#000",
  },
});

export default ProfileScreen;
