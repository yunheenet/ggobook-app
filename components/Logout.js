import React, { useState } from "react";
import { Platform, ActivityIndicator, Text } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components";
import NavIcon from "./NavIcon";
import { useLogOut } from "../AuthContext";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
  margin-top: 10px;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.redColor};
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
`;

export default () => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const logout = useLogOut();
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleLogout = () => {
    setLoading(true);
    logout();
    setLoading(false);
  };

  return (
    <Container onPress={toggleModal}>
      <NavIcon name={Platform.OS === "ios" ? "ios-log-out" : "md-log-out"} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          loading ? null : toggleModal();
        }}
      >
        <LogoutButton disabled={loading} onPress={handleLogout}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text>로그아웃 </Text>
          )}
        </LogoutButton>
      </Modal>
    </Container>
  );
};
