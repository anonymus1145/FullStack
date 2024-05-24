//import { useState } from "react";
import { useQuery } from "@apollo/client";
import query from "../graphql/queries";

// REST API Custom Hook for fetching repositories
/*
 const useRepositories = () => {
  const [repositories, setRepositories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5001/api/repositories");
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const json = await response.json();
      setRepositories(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const repositoriesNodes = repositories?.edges?.map((edge) => edge.node) || [];

  if (!repositoriesNodes) {
    console.log("Repositories in the hook: ", repositoriesNodes);
  }

  return { repositoriesNodes, loading, error };
};
*/

// Custom Hook using GraphQL

const useRepositories = () => {
  const response = useQuery(query.GET_REPOSITORIES, {
  fetchPolicy: "cache-and-network",
  });

  const { data, loading, error } = response;

  // Extract repository nodes or set an empty array if data is not available
  const repositoriesNodes = data?.repositories?.edges?.map(edge => edge.node) || [];

  // Log the repositories for debugging purposes (if you meant to log only when repositoriesNodes is empty, adjust the condition accordingly)
  return { repositoriesNodes, loading, error };
};

export default useRepositories;
