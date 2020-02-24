import React from "react";
import styled from "styled-components";
import styles from "../styles";

const Divider = styled.View`
  width: 300px;
  height: 10px;
  margin-top: 10px;
  border-top-color: ${styles.lightGreyColor};
  border-top-width: 0.5px;
`;

export default () => <Divider />;
