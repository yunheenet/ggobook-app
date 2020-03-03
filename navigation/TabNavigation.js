import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PhotoTabs from "../navigation/./PhotoTabs";
import Home from "../screens/Tabs/Home";
import Profile from "../screens/Tabs/Profile";
import BookDetail from "../screens/BookDetail";
import UserDetail from "../screens/UserDetail";
import NavIcon from "../components/NavIcon";
import Logout from "../components/Logout";
import { stackStyles } from "./config";
import styles from "../styles";

const stackNavigatorOptions = {
  headerBackTitle: null,
  headerTintColor: styles.blackColor,
  headerStyle: { ...stackStyles }
};

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
        )
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ ...stackNavigatorOptions }}
      />
      <HomeStack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ title: "Book" }}
      />
      <HomeStack.Screen
        name="UserDetail"
        component={UserDetail}
        options={({ route }) => ({
          title: route.params.username
        })}
      />
    </HomeStack.Navigator>
  );
}

const AddStack = createStackNavigator();

function AddStackScreen() {
  return (
    <AddStack.Navigator
      screenOptions={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={32}
            name={
              Platform.OS === "ios"
                ? "ios-add-circle-outline"
                : "md-add-circle-outline"
            }
          />
        )
      }}
    >
      <AddStack.Screen
        name="Take a Book"
        component={PhotoTabs}
        options={{ ...stackNavigatorOptions }}
      />
    </AddStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        tabBarOptions: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          />
        )
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerRight: () => <Logout />,
          ...stackNavigatorOptions
        }}
      />
      <ProfileStack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ title: "Book" }}
      />
    </ProfileStack.Navigator>
  );
}

export default () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        initialRouteName: "Profile"
      }}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "#FAFAFA"
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            />
          )
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              size={32}
              name={
                Platform.OS === "ios"
                  ? "ios-add-circle-outline"
                  : "md-add-circle-outline"
              }
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};
