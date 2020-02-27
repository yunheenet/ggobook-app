import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    location
    caption
    user {
      id
      avatar
      username
    }
    files {
      id
      url
    }
    likeCount
    isLiked
    comments {
      id
      text
      user {
        id
        username
      }
    }
    createdAt
  }
`;

export const BOOK_FRAGMENT = gql`
  fragment BookParts on Book {
    id
    data {
      id
      isbn
      title
      author
      publisher
      description
      coverSmallUrl
      coverLargeUrl
    }
    memos {
      id
      text
    }
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    username
    bio
    fullName
    isFollowing
    isSelf
    followingCount
    followersCount
    books {
      ...BookParts
    }
  }
  ${BOOK_FRAGMENT}
`;
