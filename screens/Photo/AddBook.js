import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import styled from "styled-components";
import styles from "../../styles";
import constants from "../../constants";
import Loader from "../../components/Loader";
import Divider from "../../components/Divider";

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

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
  width: ${constants.width / 2}px;
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
  width: ${constants.width - 130}px;
  margin: 10px;
  font-weight: 500;
  font-size: 18px;
  height: 45px;
  overflow: hidden;
`;

const Caption = styled.Text`
  width: ${constants.width - 130}px;
  padding: 0 10px 0 0;
`;

const Description = styled.Text`
  width: ${constants.width - 50}px;
  margin: 10px 0px;
`;

export default ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { loading, data } = useQuery(FIND_GGOBOOK, {
    variables: { isbn: route.params.data }
  });

  const [postBookMutation] = useMutation(POST_BOOK, {
    refetchQueries: () => [{ query: ME }]
  });

  const handleAddBook = async () => {
    setIsLoading(true);

    const {
      data: { postBook }
    } = await postBookMutation({
      variables: { bookId: data.findGgoBook.id }
    });

    setIsLoading(false);

    if (postBook === true) {
      navigation.goBack();
      navigation.navigate("Profile");
    } else {
      Alert.alert("Fail");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : data && data.findGgoBook && data.findGgoBook.id ? (
          <BookContainer>
            <BookCard>
              <Image
                resizeMode="contain"
                style={{ width: 100, height: 140 }}
                key={data.findGgoBook.id}
                source={{ uri: data.findGgoBook.coverLargeUrl }}
                borderTopLeftRadius={20}
                borderBottomLeftRadius={20}
              />
              <InfoContainer>
                <Title>{data.findGgoBook.title}</Title>
                <Caption>{data.findGgoBook.author}</Caption>
                <Caption>{data.findGgoBook.publisher}</Caption>
              </InfoContainer>
            </BookCard>
            <Divider />
            <Description>{data.findGgoBook.description}</Description>
          </BookContainer>
        ) : (
          <View>
            <Text>해당 책을 찾을 수 없습니다. </Text>
          </View>
        )}
      </ScrollView>
      <ButtonContainer>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : data && data.findGgoBook && data.findGgoBook.id ? (
          <TouchableOpacity onPress={handleAddBook}>
            <Text>Add Book </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleGoBack}>
            <Text>Back </Text>
          </TouchableOpacity>
        )}
      </ButtonContainer>
    </View>
  );
};
