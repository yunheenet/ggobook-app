import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import Book from "../components/Book";
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

export default ({ navigation }) => {
  const [addBook, { loading, data }] = useMutation(ADD_BOOK);

  useEffect(() => {
    addBook({ variables: { isbn: navigation.getParam("isbn") } });
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.addBook && <Book {...data.addBook} />
      )}
    </ScrollView>
  );
};
