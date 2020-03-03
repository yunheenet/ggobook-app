import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { withNavigation } from "@react-navigation/compat";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import constants from "../constants";
import styles from "../styles";
import Divider from "../components/Divider";

const Container = styled.View`
  margin-bottom: 20px;
`;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const BookContainer = styled.View`
  width: ${constants.width}px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
`;

const BookCard = styled.View`
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

// const InfoContainer = styled.View`
//   width: ${constants.width - 130}
//   margin-left: 10px;
//   align-items: flex-end;
// `;

const Title = styled.Text`
  margin: 10px;
  font-weight: 500;
  font-size: 18px;
  height: 45px;
  overflow: hidden;
`;

const Caption = styled.Text`
  padding: 0 10px 0 0;
  text-align: center;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;
const InfoContainer = styled.View`
  padding: 10px;
`;

const Feed = ({ id, caption, data, user, navigation }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{user.username}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <BookContainer>
        <TouchableOpacity
          onPress={() => navigation.navigate("BookDetail", { id })}
        >
          <BookCard>
            <Image
              resizeMode="contain"
              style={{ width: 100, height: 120 }}
              key={id}
              source={{ uri: data.coverLargeUrl }}
              borderTopLeftRadius={20}
              borderBottomLeftRadius={20}
            />
            <InfoContainer>
              <Title>{data.title}</Title>
              <Caption>{data.author}</Caption>
            </InfoContainer>
          </BookCard>
        </TouchableOpacity>
      </BookContainer>
      <InfoContainer>
        <IconsContainer></IconsContainer>
        <Caption>{caption ? caption : "..."}</Caption>
      </InfoContainer>
    </Container>
  );
};

Feed.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coverLargeUrl: PropTypes.string.isRequired
  }),
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  })
};

export default withNavigation(Feed);
