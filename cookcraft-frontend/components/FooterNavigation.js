// components/FooterNavigation.js
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const FooterNavigation = () => {
  return (
    <View style={styles.navContainer}>
      {/* Each TouchableOpacity would navigate to a different screen */}
      <TouchableOpacity style={styles.navItem}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text>Search</Text>
      </TouchableOpacity>
      {/* ...other navigation items */}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
  },
});

export default FooterNavigation;
