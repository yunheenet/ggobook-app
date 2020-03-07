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
  headerBackTitleVisible: false,
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
        ),
        ...stackNavigatorOptions
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ title: "Book" }}
      />
      <HomeStack.Screen
        name="UserDetail"
        component={UserDetail}
        options={({ route }) => ({
          title: route.params?.username ?? "User Profile"
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
        ),
        ...stackNavigatorOptions
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerRight: () => <Logout />
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

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
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
