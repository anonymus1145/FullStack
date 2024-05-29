import { gql } from "@apollo/client";

const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

const IS_LOGGED_IN = gql`
  query {
    me {
      id
      username
    }
  }
`;

const GET_SINGLEREPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews {
        edges {
          node {
            text
            user {
              username
              id
            }
            rating
            id
            createdAt
          }
        }
      }
    }
  }
`;

export default {
  GET_REPOSITORIES,
  IS_LOGGED_IN,
  GET_SINGLEREPOSITORY,
};
