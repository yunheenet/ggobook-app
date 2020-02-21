import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import Book from "../components/Book";

const ADD_BOOK = gql`
  mutation addBook($isbn: String!) {
    addBook(isbn: $isbn) {
      title
      author
      publisher
      description
      coverLargeUrl
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const [addBook, { loading, data }] = useMutation(ADD_BOOK);

  useEffect(() => {
    addBook({ variables: { isbn: navigation.getParam("isbn") } });
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        data && data.addBook && <Book {...data.addBook} />
      )}
    </View>
  );
};
