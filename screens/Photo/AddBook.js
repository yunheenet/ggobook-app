import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import styles from "../../styles";
import constants from "../../constants";
import Loader from "../../components/Loader";
import Divider from "../../components/Divider";
import { ME } from "../Tabs/Profile";
import { BOOK_FEED } from "../Tabs/Home";

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
  margin-bottom: 40px;
  border-radius: 4px;
  width: ${constants.width / 2};
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;
const BookContainer = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  margin: 10px 15px 10px 10px;
  background-color: ${styles.darkGreyColor};
`;

const BookCard = styled.View`
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoContainer = styled.View`
  margin-left: 10px;
  align-items: flex-end;
`;

const Title = styled.Text`
  margin: 10px;
  font-weight: 500;
  font-size: 18;
  height: 45px;
  overflow: hidden;
`;

const Caption = styled.Text`
  padding: 0 10px 0 0;
`;

const Description = styled.Text`
  margin: 10px 0px;
`;

export default ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { loading, data } = useQuery(FIND_GGOBOOK, {
    variables: { isbn: navigation.getParam("data") }
  });

  const [postBookMutation] = useMutation(POST_BOOK);

  const handlePostBook = async () => {
    setIsLoading(true);
    const {
      data: { postBook }
    } = await postBookMutation({
      variables: { bookId: data.findGgoBook.id }
    });

    setIsLoading(false);
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
          <BookContainer>
            <BookCard>
              <Image
                resizeMode="contain"
                style={{ width: 100, height: 140 }}
                key={data.findGgoBook.id}
                source={{ uri: data.findGgoBook.coverLargeUrl }}
                borderTopLeftRadius="20px"
                borderBottomLeftRadius="20px"
              />
              <InfoContainer>
                <Title>{data.findGgoBook.title}</Title>
                <Caption>
                  {data.findGgoBook.author}, {data.findGgoBook.publisher}
                </Caption>
              </InfoContainer>
            </BookCard>
            <Divider />
            <Description>{data.findGgoBook.description}</Description>
          </BookContainer>
        )}
      </ScrollView>
      <ButtonContainer>
        <TouchableOpacity disabled={isLoading} onPress={handlePostBook}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text>Add Book </Text>
          )}
        </TouchableOpacity>
      </ButtonContainer>
    </View>
  );
};
