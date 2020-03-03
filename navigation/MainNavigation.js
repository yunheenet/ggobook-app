import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoTabs from "./PhotoTabs";
import { stackStyles } from "./config";

export default function MainNavigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FAFAFA"
          }
        }}
        headerMode="none"
        mode="modal"
      >
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        {/* <Stack.Screen component={PhotoTabs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
