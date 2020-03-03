import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

export default () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen component={AuthHome} />
        <Stack.Screen component={Login} />
        <Stack.Screen component={Confirm} />
        <Stack.Screen component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
