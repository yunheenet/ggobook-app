import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";

const SquareBook = ({ navigation, id, data: { coverSmallUrl } }) => (
  <TouchableOpacity onPress={() => navigation.navigate("BookDetail", { id })}>
    <Image
      source={{ uri: coverSmallUrl }}
      style={{ width: constants.width / 3, height: constants.height / 4 }}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

SquareBook.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    coverSmallUrl: PropTypes.string.isRequired,
    coverLargeUrl: PropTypes.string.isRequired
  })
};

export default withNavigation(SquareBook);
