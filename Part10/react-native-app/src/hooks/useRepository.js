import { useQuery } from "@apollo/client";
import query from "../graphql/queries";

const useRepository = ({ id }) => {
  const { data, loading, error } = useQuery(query.GET_SINGLEREPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  // Log the repository for debugging purposes if it's not available
  //console.log({ data, loading, error });

  return { data, loading, error };
};

export default useRepository;
