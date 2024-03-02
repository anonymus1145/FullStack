import { useEffect, useState } from "react";
import axios from "axios";

// Custom hook to fetch data from an API endpoint and refresh it when the URL changes
export const useResource = (url: string) => {
  const [resources, setResources] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(url);
        setResources(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [url]);
  return resources;
};
