import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthProvider } from "./AuthContext";
import apolloClientOptions from "./apollo";
import styles from "./styles";
import NavController from "./components/NavController";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    async function preLoad() {
      try {
        await Font.loadAsync({
          ...Ionicons.font
        });

        await Asset.loadAsync([require("./assets/logo.png")]);

        const cache = new InMemoryCache();
        const client = new ApolloClient({
          cache,
          request: async operation => {
            const token = await AsyncStorage.getItem("jwt");
            return operation.setContext({
              headers: { Authorization: `Bearer ${token}` }
            });
          },
          ...apolloClientOptions
        });

        persistCache({
          cache,
          storage: AsyncStorage
        }).then(() => {
          setClient(client);
        });

        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (!isLoggedIn || isLoggedIn === "false") {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }

        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    preLoad();
  }, []);

  return loading ? (
    <AppLoading />
  ) : (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn} client={client}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
