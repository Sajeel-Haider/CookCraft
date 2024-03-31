import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigationState } from "@react-navigation/native";

import FooterNavigation from "./FooterNavigation";

const Layout = ({ children }) => {
  const navigationState = useNavigationState((state) => state);
  const { index, routeNames } = navigationState;

  const excludedRoutes = ["Login", "Signup", "GetStarted"];

  const isExcludedRoute = excludedRoutes.includes(routeNames[index]);

  return (
    <View style={styles.container}>
      {children}
      {!isExcludedRoute && <FooterNavigation />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
