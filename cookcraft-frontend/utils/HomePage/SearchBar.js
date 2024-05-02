import React from "react";
import { View, TextInput } from "react-native";
import { Icon } from "react-native-elements";

const SearchBar = ({ setSearch }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007F73",
        padding: 5,
        borderRadius: 20,
        marginTop: 10,
      }}
    >
      <TextInput
        style={{
          color: "white",
          flex: 1,
          paddingLeft: 10,
          marginRight: 5,
        }}
        onChangeText={(text) => setSearch(text)} // Use onChangeText for handling text input
        placeholder="Search"
        placeholderTextColor="#9ca3af"
      />
      <Icon
        style={{
          paddingRight: 10,
        }}
        name="search"
        type="font-awesome"
        color="#9ca3af"
        size={20}
      />
    </View>
  );
};

export default SearchBar;
