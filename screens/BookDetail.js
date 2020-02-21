import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import Book from "../components/Book";
import constants from "../constants";
import { ActivityIndicator } from "react-native";
import { ME } from "./Tabs/Profile";

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
const POST_BOOK = gql`
  mutation postBook($bookId: String!) {
    postBook(bookId: $bookId)
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Touchable = styled.TouchableOpacity``;
const ButtonContainer = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 2};
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [addBook, { loading, data }] = useMutation(ADD_BOOK);
  const [postBookMutation] = useMutation(POST_BOOK, {
    refetchQueries: () => [{ query: ME }]
  });
  const handlePostBook = async () => {
    const {
      data: { postBook }
    } = await postBookMutation({
      variables: { bookId: data.addBook.id }
    });

    if (postBook === true) {
      navigation.navigate("Profile");
    } else {
      alert("Fail");
    }
  };

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
      {!loading && (
        <Touchable disabled={loading} onPress={handlePostBook}>
          <ButtonContainer>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>내 책장에 추가하기</Text>
            )}
          </ButtonContainer>
        </Touchable>
      )}
    </View>
  );
};
