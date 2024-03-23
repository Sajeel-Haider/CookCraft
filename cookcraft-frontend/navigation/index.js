import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import FirstScreen from "../screens/FirstScreen";
import LoginPage from "../screens/LoginPage";
import SignUpPage from "../screens/SignupPage";
import GetStartedScreen from "../screens/GetStartedScreen";
import RecipeDetails from "../screens/RecipeDetails";
import CreateRecipeScreen from "../screens/CreateRecipeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="First"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="First" component={FirstScreen}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginPage}></Stack.Screen>
        <Stack.Screen name="Signup" component={SignUpPage}></Stack.Screen>
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
        ></Stack.Screen>
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
        <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
