import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  Modal,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RecipeDetails = ({ route }) => {
  const { recipe } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const openYouTubeLink = () => {
    const youtubeLink = recipe.youtube_link;
    Linking.openURL(youtubeLink).catch((err) => {
      console.error("Failed to open URL: " + err.message);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image_link }} style={styles.image} />
      <Text style={styles.title}>{recipe.Recipe_Title}</Text>
      <View style={styles.userInfo}>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
        <Icon
          name="info-circle"
          size={30}
          color="#007AFF"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cooking Tips</Text>
            <Text>{recipe?.tips}</Text>
            {/* Make sure 'Tips' is a string or convert it to string */}
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
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
      <Button
        title="Watch on YouTube"
        onPress={openYouTubeLink}
        color="#FF0000"
      />
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
  followButton: {
    backgroundColor: "#FFA500",
    padding: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: "#FFFFFF",
  },
  ingredient: {
    fontSize: 16,
    marginVertical: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default RecipeDetails;
