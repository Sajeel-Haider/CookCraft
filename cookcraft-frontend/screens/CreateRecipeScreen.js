import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CreateRecipeScreen = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);
  const [portion, setPortion] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  // New state for ingredients
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

  // Placeholder functions
  const pickImage = () => {};
  const submitRecipe = () => {};

  // Function to handle ingredient name and quantity changes
  const handleIngredientChange = (text, index, type) => {
    const newIngredients = [...ingredients];
    if (type === "name") {
      newIngredients[index].name = text;
    } else {
      newIngredients[index].quantity = text;
    }
    setIngredients(newIngredients);
  };

  // Function to add a new ingredient field
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
      <Icon name="plus" size={24} color="#007F73" />
      <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Ingredient</Text>
      </TouchableOpacity>
      <Button title="Submit Recipe" onPress={submitRecipe} />
      {/* Ingredients input */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Existing styles...
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
