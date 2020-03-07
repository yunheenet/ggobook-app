import React, { useState } from "react";
import {
  Image,
  Platform,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import { withNavigation } from "@react-navigation/compat";
import { StackActions } from "@react-navigation/native";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import Divider from "../components/Divider";
import constants from "../constants";
import useInput from "../hooks/useInput";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { USER_FRAGMENT } from "../fragments";

const DELETE_BOOK = gql`
  mutation deleteBook($id: String!) {
    deleteBook(id: $id)
  }
`;

const ADD_BOOK_MEMO = gql`
  mutation addBookMemo($bookId: String!, $text: String!) {
    addBookMemo(bookId: $bookId, text: $text) {
      id
    }
  }
`;

const EDIT_BOOK_MEMO = gql`
  mutation editBookMemo($memoId: String!, $text: String!) {
    editBookMemo(memoId: $memoId, text: $text) {
      id
    }
  }
`;

const DELETE_BOOK_MEMO = gql`
  mutation deleteBookMemo($memoId: String!) {
    deleteBookMemo(memoId: $memoId) {
      id
    }
  }
`;

const BOOK_DETAIL = gql`
  query seeFullBook($id: String!) {
    seeFullBook(id: $id) {
      id
      data {
        id
        title
        author
        publisher
        description
        coverLargeUrl
      }
      memos {
        id
        text
      }
      createdAt
      isMyBook
    }
  }
`;

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

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
  font-size: 18px;
  height: 45px;
  overflow: hidden;
`;

const Caption = styled.Text`
  width: ${constants.width - 150}px;
  padding: 0 10px 0 0;
  text-align: right;
  overflow: hidden;
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
  margin: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
`;

const NoteContainer = styled.View`
  flex: 1;
`;
const Note = styled.Text`
  min-height: 35px;
  text-align: center;
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

const Book = ({
  id: bookId,
  data: { id, title, author, publisher, description, coverLargeUrl },
  memos = [],
  createdAt,
  isMyBook,
  navigation
}) => {
  const note = useInput("");

  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState(memos);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteBookModalVisible, setIsDeleteBookModalVisible] = useState(
    false
  );
  const [listIndex, setListIndex] = useState(0);
  const [memoId, setMemoId] = useState("");

  const [deleteBookMutation] = useMutation(DELETE_BOOK, {
    variables: { id: bookId },
    refetchQueries: () => [{ query: ME }]
  });

  const [addBookMemoMutation] = useMutation(ADD_BOOK_MEMO);
  const [editBookMemoMutation] = useMutation(EDIT_BOOK_MEMO);
  const [deleteBookMemoMutation] = useMutation(DELETE_BOOK_MEMO);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleEditModal = (text, index, id) => {
    note.onChange(text);
    setListIndex(index);
    setMemoId(id);
    setIsEditModalVisible(!isEditModalVisible);
  };

  const toggleDeleteBookModal = () => {
    setIsDeleteBookModalVisible(!isDeleteBookModalVisible);
  };

  const handleDeleteBook = async () => {
    const {
      data: { deleteBook }
    } = await deleteBookMutation();

    if (deleteBook === true) {
      navigation.dispatch(StackActions.pop(1));
      navigation.navigate("Profile");
    } else {
      Alert.alert("Fail");
    }
  };

  const initialtizeNote = () => {
    note.onChange("");
  };

  const handleAddMemo = async text => {
    setLoading(true);

    try {
      const {
        data: { addBookMemo }
      } = await addBookMemoMutation({
        variables: { bookId, text },
        refetchQueries: [
          {
            query: BOOK_DETAIL,
            variables: { id: bookId }
          }
        ]
      });

      const newData = [...listData];
      newData.push({ text, id: addBookMemo.id });
      setListData(newData);
    } catch {
      Alert.alert("please retry.");
    }

    initialtizeNote();
    setLoading(false);
    toggleModal();
  };

  const handleEditMemo = async text => {
    setLoading(true);
    const newData = [...listData];
    newData[listIndex].text = text;
    setListData(newData);

    try {
      await editBookMemoMutation({
        variables: { memoId, text },
        refetchQueries: [
          {
            query: BOOK_DETAIL,
            variables: { id: bookId }
          }
        ]
      });
    } catch {
      Alert.alert("please retry.");
    }

    note.onChange("");
    setLoading(false);
    toggleEditModal();
  };

  const handleDeleteMemo = async () => {
    setLoading(true);

    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.id === listIndex);
    newData.splice(prevIndex, 1);
    setListData(newData);

    try {
      await deleteBookMemoMutation({
        variables: { memoId },
        refetchQueries: [
          {
            query: BOOK_DETAIL,
            variables: { id: bookId }
          }
        ]
      });
    } catch {
      Alert.alert("please retry.");
    }

    setLoading(false);
    toggleEditModal();
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          loading ? null : toggleModal();
        }}
      >
        <NoteModal
          onChangeText={note.onChange}
          value={note.value}
          placeholder="Add Note"
          multiline={true}
          textAlignVertical={"top"}
          placeholderTextColor={styles.lightGreyColor}
        />
        {
          <Button disabled={loading} onPress={() => handleAddMemo(note.value)}>
            {loading ? <ActivityIndicator color="white" /> : <Text>Add </Text>}
          </Button>
        }
      </Modal>
      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={() => {
          loading ? undefined : toggleEditModal();
        }}
      >
        <DeleteButton disabled={loading} onPress={handleDeleteMemo}>
          {loading ? <ActivityIndicator color="white" /> : <Text>Delete </Text>}
        </DeleteButton>
        <NoteModal
          onChangeText={note.onChange}
          value={note.value}
          multiline={true}
          textAlignVertical={"top"}
          placeholderTextColor={styles.lightGreyColor}
        />
        <Button disabled={loading} onPress={() => handleEditMemo(note.value)}>
          {loading ? <ActivityIndicator color="white" /> : <Text>Edit </Text>}
        </Button>
      </Modal>
      <Modal
        isVisible={isDeleteBookModalVisible}
        onBackdropPress={() => {
          loading ? undefined : toggleDeleteBookModal();
        }}
      >
        <DeleteButton disabled={loading} onPress={handleDeleteBook}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text>삭제하시겠어요? </Text>
          )}
        </DeleteButton>
      </Modal>
      <BookContainer>
        <BookCard>
          <Image
            resizeMode="contain"
            style={{ width: 100, height: 140 }}
            key={id}
            source={{ uri: coverLargeUrl }}
            borderTopLeftRadius={20}
            borderBottomLeftRadius={20}
          />
          <InfoContainer>
            <Title>{title}</Title>
            <Caption>{author}</Caption>
            <Caption>{publisher}</Caption>
            {isMyBook ? (
              <DeleteButton onPress={toggleDeleteBookModal}>
                <Ionicons
                  size={24}
                  name={Platform.OS === "ios" ? "ios-trash" : "md-trash"}
                />
              </DeleteButton>
            ) : (
              undefined
            )}
          </InfoContainer>
        </BookCard>
        <Divider />
        <NoteContainer>
          <SafeAreaView>
            <FlatList
              data={listData}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  disabled={!isMyBook}
                  onPress={() => toggleEditModal(item.text, index, item.id)}
                >
                  <Note>{item.text}</Note>
                  <Divider />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
            {isMyBook ? (
              <NoteAdder>
                <TouchableOpacity onPress={() => toggleModal()}>
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
            ) : (
              undefined
            )}
          </SafeAreaView>
        </NoteContainer>
      </BookContainer>
    </View>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    description: PropTypes.string,
    coverLargeUrl: PropTypes.string
  }),
  memos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  createdAt: PropTypes.string,
  isMyBook: PropTypes.bool.isRequired
};

export default withNavigation(Book);
