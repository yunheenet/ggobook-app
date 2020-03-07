import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoTabs from "./PhotoTabs";
import { stackStyles } from "./config";

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            ...stackStyles
          }
        }}
        headerMode="none"
        mode="modal"
      >
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="PhotoNavigation" component={PhotoTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
