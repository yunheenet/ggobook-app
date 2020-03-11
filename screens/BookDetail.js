import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import BookCard from "../components/BookCard";
import { View, ScrollView } from "react-native";

const BOOK_DETAIL = gql`
  query seeFullBook($id: String!) {
    seeFullBook(id: $id) {
      id
      data {
        id
        title
        author
        publisher
        description
        coverLargeUrl
      }
      memos {
        id
        text
      }
      createdAt
      isMyBook
    }
  }
`;

const BOOK_FEED = gql`
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

export default ({ navigation, route }) => {
  const bookId = route.params.id;
  const client = useApolloClient();

  const { loading, data, error } = useQuery(BOOK_DETAIL, {
    variables: { id: bookId },
    fetchPolicy: "network-only",
    onError: error => {
      const data = client.cache.read({ query: BOOK_FEED });
      const books = [...data.bookFeed];
      const idx = books.findIndex(book => {
        return book.id === bookId;
      });
      books.splice(idx, 1);
      client.writeQuery({
        query: BOOK_FEED,
        data: {
          ...data,
          bookFeed: books
        }
      });
      navigation.pop();
    }
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullBook && <BookCard {...data.seeFullBook} />
      )}
    </ScrollView>
  );
};
