import React from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import Divider from "../components/Divider";
import constants from "../constants";

const BookContainer = styled.View`
  width: ${constants.width}
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
  width: ${constants.width - 130}
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
            source={{ uri: coverLargeUrl }}
            borderTopLeftRadius="20px"
            borderBottomLeftRadius="20px"
          />
          <InfoContainer>
            <Title>{title}</Title>
            <Caption>{author}</Caption>
            <Caption>{publisher}</Caption>
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
    publisher: PropTypes.string.isRequired,
    description: PropTypes.string,
    coverSmallUrl: PropTypes.string.isRequired,
    coverLargeUrl: PropTypes.string.isRequired
  })
};

export default withNavigation(BookCardHeader);
