import React from "react";
import { Image, StyleSheet } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import constants from "../constants";

const Container = styled.View`
  width: ${constants.width};
  height: ${constants.height};
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const Touchable = styled.TouchableOpacity``;
const InfoContainer = styled.View`
  padding: 15px;
  margin-top: -40px;
`;
const Bold = styled.Text`
  font-weight: 500;
  font-size: 20px;
`;
const Caption = styled.Text`
  font-size: 16px;
`;
const Description = styled.Text`
  margin: 10px 0px;
`;
const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
  border-bottom-width: 2px;
`;
const Button = styled.Text`
  width: ${constants.width}
  height: 50px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin: 5px 0px;
`;

const Book = ({ id, title, author, publisher, description, coverLargeUrl }) => {
  return (
    <Container>
      <Image
        resizeMode="contain"
        style={{ width: constants.width / 2.5, height: constants.height / 2 }}
        key={id}
        source={{ uri: coverLargeUrl }}
      />
      <InfoContainer>
        <Bold>{title}</Bold>
        <Caption>
          {author}, {publisher}
        </Caption>
        <Description>{description}</Description>
      </InfoContainer>
      <ButtonContainer>
        <Touchable>
          <Button>등록</Button>
        </Touchable>
      </ButtonContainer>
    </Container>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  description: PropTypes.string,
  coverLargeUrl: PropTypes.string
};

export default withNavigation(Book);
