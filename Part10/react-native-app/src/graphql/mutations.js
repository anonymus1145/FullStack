import { gql } from "@apollo/client";

const AUTHENTICATION = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export default { AUTHENTICATION };
