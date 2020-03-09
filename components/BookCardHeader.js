import React from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import PropTypes from "prop-types";
import { withNavigation } from "@react-navigation/compat";
import Divider from "../components/Divider";
import constants from "../constants";

const BookContainer = styled.View`
  width: ${constants.width}px
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

const InfoContainer = styled.View`
  padding: 10px;
`;

const Title = styled.Text`
  margin: 10px;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  min-width: 200px;
  max-width: ${constants.width - 150}px;
  height: 45px;
  overflow: hidden;
`;

const Author = styled.Text`
  padding: 0 10px 0 0;
  text-align: center;
  max-width: ${constants.width - 150}px;
`;

const Publisher = styled.Text`
  padding: 0 10px 0 0;
  text-align: center;
  max-width: ${constants.width - 150}px;
`;

const Caption = styled.Text`
  padding: 0 10px 0 0;
`;

const BookCardHeader = ({
  navigation,
  id,
  data: { title, author, publisher, description, coverLargeUrl }
}) => {
  return (
    <BookContainer>
      <TouchableOpacity
        onPress={() => navigation.navigate("BookDetail", { id })}
      >
        <BookCard>
          <Image
            resizeMode="contain"
            style={{ width: 100, height: 120 }}
            key={id}
            source={
              coverLargeUrl
                ? { uri: coverLargeUrl }
                : require("../assets/icon.png")
            }
            borderTopLeftRadius={20}
            borderBottomLeftRadius={20}
          />
          <InfoContainer>
            <Title>{title}</Title>
            <Author>{author}</Author>
          </InfoContainer>
        </BookCard>
      </TouchableOpacity>
      <Divider />
    </BookContainer>
  );
};

BookCardHeader.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    //publisher: PropTypes.string.isRequired,
    //description: PropTypes.string,
    coverSmallUrl: PropTypes.string.isRequired,
    coverLargeUrl: PropTypes.string.isRequired
  })
};

export default withNavigation(BookCardHeader);
