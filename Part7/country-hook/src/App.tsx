import { Country } from "./components/Country";
import { useCountry } from "./hooks/useCountry";
import { useState } from "react";

const App = () => {
  const [name, setName] = useState<string>("");
  // useCountry custom hook to fetch data from an API endpoint and refresh it when the URL changes after returning the data based on the name
  const country = useCountry(name)

  // handle form submission sets the name state variable to the value of the input
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName(event.currentTarget.country.value);
  };

// onChange set the name state variable to the value of the input dinamically
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input autoComplete="off" name="country" onChange={(e) => setName(e.target.value)}/>
        <button type="submit">find</button>
      </form>
      <br />
      <Country country={country} />
    </div>
  );
};

export default App;
