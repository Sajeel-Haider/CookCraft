import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity, // Replacing Button with TouchableOpacity
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import config from "../config/envConfig"; // Ensure this points to your config file
import { useSelector } from "react-redux";

const GroceryList = () => {
  const [groceries, setGroceries] = useState([]);
  const [newGrocery, setNewGrocery] = useState("");
  const [quantity, setQuantity] = useState("");
  const [suggestedGroceries, setSuggestedGroceries] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const [suggestionsResponse, groceriesResponse] = await Promise.all([
          axios.get(`${config.API_URL}/user/${user._id}/groceries/suggestions`),
          axios.get(`${config.API_URL}/user/${user._id}/groceries`),
        ]);
        setSuggestedGroceries(suggestionsResponse.data);
        console.log(suggestionsResponse.data);
        setGroceries(groceriesResponse.data);
      } catch (error) {
        console.error("Failed to fetch groceries:", error);
      }
    };

    if (user._id) {
      fetchGroceries();
    }
  }, [user._id]);

  const handleAddGrocery = async () => {
    if (!newGrocery || !quantity) {
      alert("Please enter both name and quantity of the grocery item.");
      return;
    }
    try {
      const response = await axios.post(
        `${config.API_URL}/user/${user._id}/groceries`,
        {
          name: newGrocery,
          quantity: quantity,
        }
      );
      if (response.status === 201) {
        setGroceries((prevGroceries) => [
          ...prevGroceries,
          { name: newGrocery, quantity: quantity, addedManually: true },
        ]);
        setNewGrocery("");
        setQuantity("");
      }
    } catch (error) {
      console.error("Error adding grocery item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Suggested Groceries</Text>
      <FlatList
        data={suggestedGroceries}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.quantity}
          </Text>
        )}
      />
      <Text style={styles.subHeader}>Your Groceries</Text>
      <FlatList
        data={groceries}
        keyExtractor={(item) => `${item.name}_${item.quantity}`}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.quantity}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a new grocery item"
        value={newGrocery}
        onChangeText={setNewGrocery}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddGrocery}
        activeOpacity={0.8} // Optional: Feedback on touch
      >
        <Text style={styles.buttonText}>Add Grocery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007F73", // Example: Teal background
    padding: 10,
    borderRadius: 20, // Example: Rounded borders
    alignItems: "center", // Center the text inside the button
    marginVertical: 10, // Spacing from other elements
  },
  buttonText: {
    color: "white", // White text color
    fontSize: 16, // Text size
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
  },
});

export default GroceryList;
