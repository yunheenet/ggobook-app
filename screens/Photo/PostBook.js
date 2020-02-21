import Book from "../components/Book";
import constants from "../constants";
import { ActivityIndicator } from "react-native";
import { ME } from "./Tabs/Profile";

const POST_BOOK = gql`
  mutation postBook($bookId: String!) {
    postBook(bookId: $bookId)
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Touchable = styled.TouchableOpacity``;
const ButtonContainer = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 2};
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const [postBookMutation] = useMutation(POST_BOOK, {
  refetchQueries: () => [{ query: ME }]
});
const handlePostBook = async () => {
  const {
    data: { postBook }
  } = await postBookMutation({
    variables: { bookId: data.addBook.id }
  });

  if (postBook === true) {
    navigation.navigate("Profile");
  } else {
    alert("Fail");
  }
};

<Touchable disabled={loading} onPress={handlePostBook}>
  <ButtonContainer>
    {loading ? (
      <ActivityIndicator color="white" />
    ) : (
      <Text>내 책장에 추가하기</Text>
    )}
  </ButtonContainer>
</Touchable>;
