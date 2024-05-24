import { useMutation } from "@apollo/client";
import mutation from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, response] = useMutation(mutation.AUTHENTICATION, {
    onError: (error) => {
      console.log(error);
    },
  });

  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({ variables: { username, password } });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return [signIn, response];
};

export default useSignIn;
