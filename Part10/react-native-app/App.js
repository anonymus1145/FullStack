import Main from "./src/componets/Main";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";

// Initialize Apollo Client
const client = createApolloClient();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
