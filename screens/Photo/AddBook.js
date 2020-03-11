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
    postBook(bookId: $bookId) {
      id
      caption
      data {
        id
        title
        author
        coverSmallUrl
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

const BOOK_FEED = gql`
  {
    bookFeed {
      id
      caption
      data {
        id
        title
        author
        coverSmallUrl
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
  margin: 10px 0 0 30px;
  flex-direction: row;
  align-items: center;
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
    variables: { isbn: route.params.data },
    fetchPolicy: "network-only"
  });

  const [postBookMutation] = useMutation(POST_BOOK);

  const handleAddBook = async () => {
    setIsLoading(true);

    try {
      const { error } = await postBookMutation({
        variables: { bookId: data.findGgoBook.id },
        update: (proxy, { data: { postBook } }) => {
          const meQuery = proxy.readQuery({ query: ME });
          meQuery.me.books.push(postBook);
          proxy.writeQuery({ query: ME, meQuery });

          const bookFeedQuery = proxy.readQuery({ query: BOOK_FEED });
          bookFeedQuery.bookFeed.push(postBook);
          proxy.writeQuery({ query: BOOK_FEED, bookFeedQuery });
        },
        refetchQueries: () => [{ query: ME }, { query: BOOK_FEED }]
      });

      setIsLoading(false);

      if (error) {
        Alert.alert("Fail");
      } else {
        navigation.goBack();
        navigation.navigate("Profile");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
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
