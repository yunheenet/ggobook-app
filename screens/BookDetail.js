import React, { useEffect, useState, useLayoutEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import BookCard from "../components/BookCard";
import { ScrollView, Button } from "react-native";

export const BOOK_DETAIL = gql`
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

export default ({ navigation }) => {
  const bookId = navigation.getParam("id");
  const { loading, data, error } = useQuery(BOOK_DETAIL, {
    variables: { id: bookId }
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : error ? (
        navigation.pop()
      ) : (
        data && data.seeFullBook && <BookCard {...data.seeFullBook} />
      )}
    </ScrollView>
  );
};
