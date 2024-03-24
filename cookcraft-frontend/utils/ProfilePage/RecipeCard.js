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

const RecipeCard = ({ item, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{item.name}</Text>
      <View style={styles.likesContainer}>
        <Icon name="heart" size={16} color="#888" />
        <Text style={styles.likesCount}>{item.likes}</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.threeDots}
        >
          <Icon name="dots-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                onDelete(item.id);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
export default RecipeCard;
const styles = StyleSheet.create({
  recipeCard: {
    // Add styles to match your design
    margin: 10,
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  recipeImage: {
    width: "100%",
    height: 200, // set the height you want
  },
  recipeName: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  likesCount: {
    marginLeft: 5,
  },
  threeDots: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    // Position the modal on the screen where you want
    // e.g., align it to the right and top of the card
  },
  modalOption: {
    // Styling for each option in the modal
  },
  modalText: {
    // Text styling
  },
});
