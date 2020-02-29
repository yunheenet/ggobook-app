import React from "react";
import { Platform, Image, View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import PhotoTabs from "../navigation/PhotoNavigation";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import PostDetail from "../screens/PostDetail";
import BookDetail from "../screens/BookDetail";
import UserDetail from "../screens/UserDetail";
import NavIcon from "../components/NavIcon";
import Logout from "../components/Logout";
import { stackStyles } from "./config";
import styles from "../styles";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      PostDetail: {
        screen: PostDetail,
        navigationOptions: {
          title: "Post"
        }
      },
      BookDetail: {
        screen: BookDetail,
        navigationOptions: {
          title: "Book"
        }
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam("username")
        })
      }
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: null,
        headerTintColor: styles.blackColor,
        headerStyle: { ...stackStyles }
      }
    }
  );

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        //headerTitle: <NavIcon name="md-book" size={36} />
        headerTitle: (
          <Image
            resizeMode={"contain"}
            style={{ width: 60, height: 30 }}
            source={require("../assets/logo.png")}
          />
        )
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
        )
      }
    },
    // Search: {
    //   screen: stackFactory(Search, {
    //     headerBackTitle: null
    //   }),
    //   navigationOptions: {
    //     tabBarIcon: ({ focused }) => (
    //       <NavIcon
    //         focused={focused}
    //         name={Platform.OS === "ios" ? "ios-search" : "md-search"}
    //       />
    //     )
    //   }
    // },
    Add: {
      screen: PhotoTabs,
      navigationOptions: {
        // tabBarOnPress: ({ navigation }) =>
        //   navigation.navigate("PhotoNavigation"),
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
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile",
        headerRight: <Logout />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Profile",
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#FAFAFA"
      }
    }
  }
);
