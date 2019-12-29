import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      username
      id
    }
  }
`;

export const GET_USER = gql`
  query seeUser($id: String!) {
    seeUser(id: $id) {
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
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;