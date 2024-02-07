/**
 * @module App
 */
//PhoneBook
// @ts-check
import React from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

export const App = () => {
  /**
   * @type {object} {name: string, number: string}
   */
  const [persons, setPersons] = React.useState([{ name: "", number: "", id: 0 }]);
  const [newName, setNewName] = React.useState({
    name: "",
    number: "",
    id: 0,
  });
  const [searchName, setSearchName] = React.useState("");

  // Fetch data from the server
  React.useEffect(() => {
    console.log("Fetching data...");
    fetch("http://localhost:3001/persons")
      .then((response) => response.json())
      .then((data) => setPersons(data) || console.log("Data fetched successfully"));
  }, []);

  /**
   * @type {(event: React.FormEvent<HTMLFormElement>) => void}
   */
  // Add a person to the Phonebook
  const addPerson = (event) => {
    event.preventDefault();
    /**
     * @type {object} {name: string, number: string}
     */
    const personObject = {
      name: newName.name,
      number: newName.number,
      id: newName.id,
    };

    // Check if a person with the same name already exists
    /**
    * Person type definition
    * @typedef {Object} person
    * @property {string} name
    * @property {string} number
    */
    if (persons.find((/** @type {person} */person) => person.name === personObject.name)) {
      alert(`${personObject.name} is already added to the phonebook`);
      return;
    }
   setNewName({
      name: "",
      number: "",
      id: 0
    });
    setPersons(persons.concat(personObject));
  };

  // Update the name of a persons in the Phonebook
  /**
   * @type {(event: React.ChangeEvent<HTMLInputElement>) => void}
   */
  const handleName = (event) => {
    const { name, value } = event.target; 
      setNewName((prevValue) => {
        return {
          ...prevValue,
          [name]: value
        }
      }
      );
  };

   // Show all contacts that match the search term
  /**
   * @type {(event: React.ChangeEvent<HTMLInputElement>) => void}
   */
  const showAll = (event) => {
    setSearchName(event.target.value);
  };
    /**
    * Person type definition
    * @typedef {Object} person
    * @property {string} name
    * @property {string} number
    */
  const filteredPersons = persons.filter((/** @type {person} */person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} showAll={showAll} /> 
      <PersonForm handleName={handleName} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};
