import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { Menu, IconButton } from "react-native-paper";

import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

import config from "../config/envConfig";

const ProfileScreen = () => {
  const profileData = {
    name: authUser.name,
    username: "@" + authUser.name,
    recipesCount: recipesCount,
    followersCount: 0,
    followingCount: 0,
    profileImage: require("../assets/user.png"),
  };
  const tabItems = ["My recipe"]; //, "Tested recipe", "Cookbook"];

  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("My recipe");
  const [menuVisibilities, setMenuVisibilities] = useState([]);
  const [recipesCount, setRecipesCount] = useState(0);
  const [visible, setVisible] = useState(false);

  const authUser = useSelector((state) => state.user);

  useEffect(() => {
    const initialMenuVisibilities = recipes.map(() => false);
    setMenuVisibilities(initialMenuVisibilities);
  }, [recipes]);
  useEffect(() => {
    console.log(authUser);
    const fetchRecipes = async () => {
      try {
        const response = await axios
          .get(`${config.API_URL}/recipes/${authUser._id}`)
          .then((response) => {
            if (response === 401) {
              console.log(response);
            }
            console.log("ELbtnt", response.data.length);
            setRecipesCount(response.data.length);
            setRecipes(response.data);
          });
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, [authUser._id]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  const toggleMenuVisibility = (index) => {
    setMenuVisibilities((prevVisibilities) => {
      const newVisibilities = [...prevVisibilities];
      newVisibilities[index] = !newVisibilities[index];
      return newVisibilities;
    });
  };
  const deleteRecipe = async (recipeId) => {
    try {
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this recipe?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const response = await axios.delete(
                `${config.API_URL}/recipes/${recipeId}`
              );
              if (response.status === 200) {
                console.log("Recipe deleted successfully");
                fetchRecipes();
              } else {
                console.log("Failed to delete recipe");
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log("Error deleting recipe: ", error);
    }
  };

  const renderRecipe = ({ item, index }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image_link }} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{item.Recipe_Title}</Text>
      <Text style={styles.recipeDescription}>{item.Description}</Text>
      <View style={styles.likesContainer}>
        <Icon name="heart" size={16} color="#888" />
      </View>
      <Menu
        visible={menuVisibilities[index]}
        onDismiss={() => toggleMenuVisibility(index)}
        anchor={
          <IconButton
            icon="dots-vertical"
            onPress={() => toggleMenuVisibility(index)}
          />
        }
      >
        {/* <Menu.Item onPress={() => console.log("Edit pressed")} title="Edit" /> */}
        <Menu.Item onPress={() => deleteRecipe(item._id)} title="Delete" />
      </Menu>
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
        data={recipes}
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
    backgroundColor: "#FFD700",
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
    height: 150,
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
    borderBottomColor: "#007F73",
  },
  activeTabText: {
    fontWeight: "bold",
  },
  tabText: {
    color: "#000",
  },
});

export default ProfileScreen;
