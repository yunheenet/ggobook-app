import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";

const SquareBook = ({ navigation, id, coverSmallUrl }) => (
  <TouchableOpacity onPress={() => navigation.navigate("BookDetail", { id })}>
    <Image
      source={{ uri: coverSmallUrl }}
      style={{ width: constants.width / 3, height: constants.height / 6 }}
    />
  </TouchableOpacity>
);

SquareBook.propTypes = {
  id: PropTypes.string.isRequired,
  coverSmallUrl: PropTypes.string.isRequired
};

export default withNavigation(SquareBook);
