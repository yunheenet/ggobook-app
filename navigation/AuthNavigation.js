// import { createAppContainer, createStackNavigator } from "react-navigation";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

// const AuthNavigation = createStackNavigator(
//   {
//     AuthHome,
//     Login,
//     Confirm,
//     Signup
//   },
//   {
//     headerMode: "none"
//   }
// );

// export default createAppContainer(AuthNavigation);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ gestureEnabled: false }}
        headerMode="none"
      >
        <Stack.Screen component={AuthHome} />
        <Stack.Screen component={Login} />
        <Stack.Screen component={Confirm} />
        <Stack.Screen component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
