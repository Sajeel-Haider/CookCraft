import React from "react";
import { View, TextInput, Text } from "react-native";
import { Icon } from "react-native-elements";

const SearchBar = () => {
  return (
    <View className="mt-4 bg-darkgrey rounded-full p-4 flex-row items-center">
      <TextInput
        className="flex-1 mr-2"
        placeholder="Search"
        placeholderTextColor="gray"
      />
      <Icon name="search" type="font-awesome" color="gray" size={20} />
    </View>
  );
};

export default SearchBar;
