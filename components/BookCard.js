import React, { useState } from "react";
import { Image, Platform, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import Divider from "../components/Divider";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import constants from "../constants";
import useInput from "../hooks/useInput";

const View = styled.View``;

const BookContainer = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  margin: 10px 15px 10px 10px;
  background-color: ${styles.darkGreyColor};
`;

const BookCard = styled.View`
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoContainer = styled.View`
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

const Description = styled.Text`
  margin: 10px 0px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.redColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: flex-end;
  width: 80px;
`;

const NoteContainer = styled.View`
  flex: 1;
`;
const Note = styled.Text`
  min-height: 30px;
  padding: 5px;
  font-size: 16px;
`;
const NoteAdder = styled.View`
  align-items: center;
`;
const NoteModal = styled.TextInput`
  background-color: white;
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
`;

const Book = ({ id, title, author, publisher, description, coverLargeUrl }) => {
  const [listData, setListData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [listIndex, setListIndex] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const note = useInput("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleEditModal = (item, index) => {
    note.onChange(item);
    setListIndex(index);
    setIsEditModalVisible(!isEditModalVisible);
  };

  const deleteNote = () => {
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.id === listIndex);
    newData.splice(prevIndex, 1);
    setListData(newData);
    toggleEditModal();
  };

  const editNote = () => {
    const newData = [...listData];
    newData[listIndex] = note.value;
    setListData(newData);
    note.onChange("");
    toggleEditModal();
  };

  const addNote = () => {
    const newData = [...listData];
    newData.push(note.value);
    setListData(newData);
    note.onChange("");
    toggleModal();
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          toggleModal();
        }}
      >
        <NoteModal
          onChangeText={note.onChange}
          value={note.value}
          placeholder=" Add Note"
          multiline={true}
          textAlignVertical={"top"}
          placeholderTextColor={styles.lightGreyColor}
        />
        <Button onPress={addNote}>
          {loading ? <ActivityIndicator color="white" /> : <Text>Add </Text>}
        </Button>
      </Modal>
      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={() => {
          toggleEditModal();
        }}
      >
        <DeleteButton onPress={deleteNote}>
          {loading ? <ActivityIndicator color="white" /> : <Text>Delete </Text>}
        </DeleteButton>
        <NoteModal
          onChangeText={note.onChange}
          value={note.value}
          multiline={true}
          textAlignVertical={"top"}
          placeholderTextColor={styles.lightGreyColor}
        />
        <Button onPress={editNote}>
          {loading ? <ActivityIndicator color="white" /> : <Text>Edit </Text>}
        </Button>
      </Modal>
      <BookContainer>
        <BookCard>
          <Image
            resizeMode="contain"
            style={{ width: 100, height: 140 }}
            key={id}
            source={{ uri: coverLargeUrl }}
            borderTopLeftRadius="20px"
            borderBottomLeftRadius="20px"
          />
          <InfoContainer>
            <Title>{title}</Title>
            <Caption>
              {author}, {publisher}
            </Caption>
          </InfoContainer>
        </BookCard>
        <Divider />
        <NoteContainer>
          <FlatList
            data={listData}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => toggleEditModal(item, index)}>
                <Note>{item}</Note>
              </TouchableOpacity>
            )}
            keyExtractor={index => index}
          />
          <NoteAdder>
            <TouchableOpacity onPress={toggleModal}>
              <Ionicons
                size={32}
                name={
                  Platform.OS === "ios"
                    ? "ios-add-circle-outline"
                    : "md-add-circle-outline"
                }
              />
            </TouchableOpacity>
          </NoteAdder>
        </NoteContainer>
      </BookContainer>
    </View>
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
