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
    isbn
    title
    author
    publisher
    coverSmallUrl
    coverLargeUrl
    description
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    username
    fullName
    isFollowing
    isSelf
    bio
    followingCount
    followersCount
    postsCount
    posts {
      ...PostParts
    }
    books {
      ...BookParts
    }
  }
  ${POST_FRAGMENT}
  ${BOOK_FRAGMENT}
`;
