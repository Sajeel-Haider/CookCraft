import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import config from "../config.development";

const CreateRecipeScreen = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);
  const [portion, setPortion] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

  const authUser = useSelector((state) => state.user);

  const navigate = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        setRecipeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image: ", error);
    }
  };
  const submitRecipe = () => {
    console.log(recipeTitle);
    if (
      !recipeTitle ||
      !description ||
      !recipeImage ||
      !portion ||
      !cookingTime ||
      !youtubeLink ||
      ingredients.some((ingredient) => !ingredient.name || !ingredient.quantity)
    ) {
      Alert.alert(
        "Error",
        "Please fill in all fields before submitting the recipe."
      );
      return;
    }

    const recipeData = {
      Recipe_Title: recipeTitle,
      Description: description,
      image_link: recipeImage,
      portion: portion,
      cooking_time: cookingTime,
      youtube_link: youtubeLink,
      ingredients: ingredients,
      user: authUser._id,
    };

    axios
      .post(`${config.API_URL}/addRecipe`, recipeData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Recipe submitted successfully!");
          navigate.navigate("Home");
        } else {
          console.error("Failed to submit recipe:", response.status);
          Alert.alert(
            "Error",
            "Failed to submit recipe. Please try again later."
          );
        }
      })
      .catch((error) => {
        console.error("Error submitting recipe:", error);
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      });
  };
  const handleIngredientChange = (text, index, type) => {
    const newIngredients = [...ingredients];
    if (type === "name") {
      newIngredients[index].name = text;
    } else {
      newIngredients[index].quantity = text;
    }
    setIngredients(newIngredients);
  };
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };
  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Post recipe</Text>
      <TextInput
        style={styles.input}
        onChangeText={setRecipeTitle}
        value={recipeTitle}
        placeholder="Recipe title"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
        multiline
      />
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {recipeImage ? (
          <Image source={{ uri: recipeImage }} style={styles.image} />
        ) : (
          <Icon name="camera" size={24} color="#808080" />
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setPortion}
        value={portion}
        placeholder="Portion"
      />
      <TextInput
        style={styles.input}
        onChangeText={setYoutubeLink}
        value={youtubeLink}
        placeholder="Youtube"
      />
      <TextInput
        style={styles.input}
        onChangeText={setCookingTime}
        value={cookingTime}
        placeholder="Cooking time"
      />
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientInputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            onChangeText={(text) => handleIngredientChange(text, index, "name")}
            value={ingredient.name}
            placeholder="Ingredient name"
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            onChangeText={(text) =>
              handleIngredientChange(text, index, "quantity")
            }
            value={ingredient.quantity}
            placeholder="Quantity"
          />

          {ingredients.length > 1 && (
            <TouchableOpacity
              onPress={() => removeIngredient(index)}
              style={styles.iconButton}
            >
              <Icon name="minus" size={24} color="#FF6347" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => addIngredient()}
        style={styles.iconButton}
      >
        <Icon name="plus" size={24} color="#007F73" />
      </TouchableOpacity>
      <TouchableOpacity onPress={submitRecipe}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Recipe</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007F73",
    borderRadius: 20,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  imagePicker: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  ingredientInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconButton: {
    marginLeft: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#007F73",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CreateRecipeScreen;
