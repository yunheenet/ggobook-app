import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TakePhoto from "../screens/Photo/TakePhoto";
import AddBook from "../screens/Photo/AddBook";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTab = createMaterialTopTabNavigator();

function PhotoTabs() {
  return (
    <PhotoTab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        indicatorStyle: { backgroundColor: styles.blackColor, marginBottom: 0 },
        labelStyle: { color: styles.blackColor, fontWeight: "600" },
        style: { paddingBottom: 0, ...stackStyles },
        backBehavior: "history"
      }}
    >
      <PhotoTab.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{
          tabBarLabel: "Search ISBN Code"
        }}
      />
    </PhotoTab.Navigator>
  );
}

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      options={{
        headerStyle: {
          ...stackStyles
        },
        headerTintColor: styles.blackColor
      }}
    >
      <Stack.Screen
        name="PhotoTabs"
        component={PhotoTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBook"
        component={AddBook}
        options={{
          title: "Add Book",
          headerBackTitle: null,
          headerTintColor: styles.blackColor,
          headerStyle: { ...stackStyles }
        }}
      />
    </Stack.Navigator>
  );
};
