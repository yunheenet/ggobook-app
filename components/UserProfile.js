import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";
import { Platform } from "react-native";
import constants from "../constants";
import SquareBook from "./SquareBook";
import BookCardHeader from "./BookCardHeader";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const Stat = styled.View`
  align-items: center;
  margin-right: 20px;
`;

const Bold = styled.Text`
  font-weight: 600;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.blackColor};
`;

const ProfileMeta = styled.View`
  margin: 0px 15px;
  padding-horizontal: 20px;
`;

const Bio = styled.Text``;

const ButtonContainer = styled.View`
  padding-vertical: 5px;
  border: 1px solid ${styles.lightGreyColor};
  flex-direction: row;
  margin-top: 30px;
`;

const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;

const GridContainer = styled.View``;

const Square = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const List = styled.View`
  flex-direction: column;
`;

const UserProfile = ({
  fullName,
  avatar,
  bio,
  followersCount,
  followingCount,
  books
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid(i => !i);

  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ height: 80, width: 80, borderRadius: 40 }}
          source={avatar ? { uri: avatar } : require("../assets/logo_full.png")}
        />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{books.length}</Bold>
              <StatName>Books</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? styles.black : styles.lightGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-book" : "md-book"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={!isGrid ? styles.black : styles.lightGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-photos" : "md-photos"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      <GridContainer>
        {isGrid ? (
          <Square>
            {books && books.map(b => <SquareBook key={b.id} {...b} />)}
          </Square>
        ) : (
          <List>
            {books && books.map(b => <BookCardHeader key={b.id} {...b} />)}
          </List>
        )}
      </GridContainer>
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        isbn: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        publisher: PropTypes.string.isRequired,
        coverSmallUrl: PropTypes.string,
        coverLargeUrl: PropTypes.string,
        description: PropTypes.string
      })
    })
  )
};
export default UserProfile;
