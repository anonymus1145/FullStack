export type typeCountry = {
  name: {
    common: string;
  };
  capital: string;
  population: number;
  flags: {
    png: string;
  };
}


export const Country = ({ country }: { country: typeCountry | null }) => {
  if (country === null) {
    return <div>not found...</div>;
  } 
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};
