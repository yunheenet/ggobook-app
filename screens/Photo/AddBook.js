import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import constants from "../../constants";
import { ME } from "../Tabs/Profile";
import Loader from "../../components/Loader";
import BookCard from "../../components/BookCard";

const POST_BOOK = gql`
  mutation postBook($bookId: String!) {
    postBook(bookId: $bookId)
  }
`;

const FIND_GGOBOOK = gql`
  query findGgoBook($isbn: String!) {
    findGgoBook(isbn: $isbn) {
      id
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
  const { loading, data } = useQuery(FIND_GGOBOOK, {
    variables: { isbn: navigation.getParam("data") }
  });

  const [postBookMutation] = useMutation(POST_BOOK, {
    refetchQueries: () => [{ query: ME }]
  });

  const handlePostBook = async () => {
    const {
      data: { postBook }
    } = await postBookMutation({
      variables: { bookId: data.findGgoBook.id }
    });

    if (postBook === true) {
      navigation.pop();
      navigation.navigate("Profile");
    } else {
      alert("Fail");
    }
  };

  return (
    <View>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          data && data.findGgoBook && <BookCard {...data.findGgoBook} />
        )}
      </ScrollView>
      <ButtonContainer>
        <TouchableOpacity onPress={handlePostBook}>
          <Text>Add Book</Text>
        </TouchableOpacity>
      </ButtonContainer>
    </View>
  );
};
