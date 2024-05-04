import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/slices/authUser-slice";
import { useSelector } from "react-redux";
import config from "../config/envConfig";
const StarRating = ({ recipeId }) => {
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = useSelector((state) => state.user);
  const submitRating = async () => {
    const response = await axios.post(
      `${config.API_URL}/recipes/rate/${recipeId}`,
      {
        userId: currentUser._id,
        rating: rating,
      }
    );
    if (response.status === 200) {
      Alert.alert(
        "Rating Submitted!",
        `New average rating: ${response.data.averageRating}`
      );
      setModalVisible(false);
    }
  };

  return (
    <View>
      <Button title="Rate Recipe" onPress={() => setModalVisible(true)} />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Rate this recipe:</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((index) => (
              <TouchableOpacity key={index} onPress={() => setRating(index)}>
                <Icon
                  name={index <= rating ? "star" : "star-o"}
                  size={30}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>
          <Button title="Submit Rating" onPress={submitRating} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "center",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default StarRating;
