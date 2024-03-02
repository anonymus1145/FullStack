import { useEffect, useState } from "react";
import { typeCountry } from "../components/Country";
import { useResource } from "./useResource";

// Custom hook to search for a country by name and refresh it when the name changes
export const useCountry = (name: string) => {
  const [country, setCountry] = useState<typeCountry | null>(null);
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries";
  const countryResource = useResource(`${baseUrl}/${"api/name"}/${name}`);
  useEffect(() => {
 if (!countryResource) {
   return;
 }
    setCountry(countryResource);
  }, [countryResource]);
  return country;
};
