import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import constants from "../constants";

const SquareBook = ({ navigation, id, data: { coverSmallUrl } }) => (
  <TouchableOpacity onPress={() => navigation.navigate("BookDetail", { id })}>
    <Image
      source={
        coverSmallUrl ? { uri: coverSmallUrl } : require("../assets/icon.png")
      }
      style={{
        width: constants.width / 3.2,
        height: constants.height / 4.5,
        margin: 2
      }}
      resizeMode="cover"
    />
  </TouchableOpacity>
);

SquareBook.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    coverSmallUrl: PropTypes.string,
    coverLargeUrl: PropTypes.string
  })
};

export default withNavigation(SquareBook);
