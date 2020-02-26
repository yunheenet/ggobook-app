import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import BookCard from "../components/BookCard";
import { ScrollView } from "react-native";

const ADD_BOOK = gql`
  mutation addBook($isbn: String!) {
    addBook(isbn: $isbn) {
      id
      title
      author
      publisher
      description
      coverLargeUrl
    }
  }
`;

const BOOK_DETAIL = gql`
  query seeFullBook($id: String!) {
    seeFullBook(id: $id) {
      data {
        id
        title
        author
        publisher
        description
        coverLargeUrl
      }
    }
  }
`;

export default ({ navigation }) => {
  const id = navigation.getParam("id");
  const { loading, data } = useQuery(BOOK_DETAIL, {
    variables: { id }
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullBook.data && <BookCard {...data.seeFullBook.data} />
      )}
    </ScrollView>
  );
};
