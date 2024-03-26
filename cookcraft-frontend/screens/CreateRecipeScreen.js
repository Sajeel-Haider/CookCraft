import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "react-native-image-picker";

const CreateRecipeScreen = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);
  const [portion, setPortion] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

  const pickImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionAsync();
      console.log("gekko");
      let result = await ImagePicker.launchCamera({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
      }
    } catch (error) {}
    // ImagePicker.launchImageLibrary({}, (response) => {
    //   // Check if image selection is successful
    //   if (response.didCancel) {
    //     console.log("User cancelled image picker");
    //   } else if (response.error) {
    //     console.log("ImagePicker Error: ", response.error);
    //   } else {
    //     // Set selected image
    //     setRecipeImage(response.uri);
    //   }
    // });
  };

  const submitRecipe = () => {
    console.log(recipeTitle);
    // Perform validation checks here if needed
    if (
      !recipeTitle ||
      !description ||
      !recipeImage ||
      !portion ||
      !cookingTime ||
      !youtubeLink ||
      ingredients.some((ingredient) => !ingredient.name || !ingredient.quantity)
    ) {
      // Display an alert or handle validation error appropriately
      Alert.alert(
        "Error",
        "Please fill in all fields before submitting the recipe."
      );
      return;
    }

    // Prepare the recipe data to be submitted
    const recipeData = {
      title: recipeTitle,
      description: description,
      image: recipeImage,
      portion: portion,
      cookingTime: cookingTime,
      youtubeLink: youtubeLink,
      ingredients: ingredients,
      // Add any additional data fields as needed
    };
    console.log(recipeData);
    // Send the recipe data to your backend server or storage system
    // Example fetch request to submit the recipe data
    fetch("https://localhost:8080/submitRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ${userToken}'
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => {
        // Handle the response from the server
        if (response.ok) {
          // Recipe submitted successfully, perform any necessary actions (e.g., navigation)
          console.log("Recipe submitted successfully!");
          // Example: Navigate to a different screen after successful submission
          // navigation.navigate('RecipeSubmittedScreen');
        } else {
          // Recipe submission failed, handle the error response
          console.error("Failed to submit recipe:", response.status);
          // Display an alert or handle the error appropriately
          Alert.alert(
            "Error",
            "Failed to submit recipe. Please try again later."
          );
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch request
        console.error("Error submitting recipe:", error);
        // Display an alert or handle the error appropriately
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

      <Button title="Submit Recipe" onPress={submitRecipe} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
