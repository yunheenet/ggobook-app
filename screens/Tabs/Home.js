import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl, StatusBar } from "react-native";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Feed from "../../components/Feed";

export const BOOK_FEED = gql`
  {
    bookFeed {
      id
      caption
      data {
        id
        title
        author
        coverLargeUrl
      }
      createdAt
      user {
        id
        avatar
        username
      }
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(BOOK_FEED);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <StatusBar barStyle="dark-content" />
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.bookFeed &&
        data.bookFeed.map(feed => <Feed key={feed.id} {...feed} />)
      )}
    </ScrollView>
  );
};
