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

export default {
  GET_REPOSITORIES,
  IS_LOGGED_IN
};
