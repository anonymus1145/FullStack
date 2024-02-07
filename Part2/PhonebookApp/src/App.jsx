/**
 * @module App
 */
//PhoneBook
// @ts-check
import React from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { getAll, create, deletePerson,update } from "./services/phoneBook";
import { Notification } from "./components/Notification";

export const App = () => {
  /**
   * @type {object} {name: string, number: string}
   */
  const [persons, setPersons] = React.useState([{ id: "", number: "", name: "" }]);
  const [newName, setNewName] = React.useState({
    id: "",
    number: "",
    name: "",
  });
  const [searchName, setSearchName] = React.useState("");
  const [message, setMessage] = React.useState("");
  

  // Fetch data from the server
  React.useEffect(() => {
    console.log("Fetching data...");
    getAll().then((data) => {
      setPersons(data);
      console.log("Data fetched:", data);
    })
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
      id: (newName.name.length + newName.number.length).toString(),
      number: newName.number,
      name: newName.name
    };

    // Check if a person with the same name already exists
    /**
    * Person type definition
    * @typedef {Object} person
    * @property {string} name
    * @property {string} number
    * @property {number} id
    */
    if (persons.find((/** @type {person} */person) => person.name === personObject.name)) {
      persons.forEach((/** @type {person} */person) => {
        if (person.name === personObject.name) {
          personObject.id = person.id;
        }
      })  // Update the person in the Phonebook TO FIX
      window.confirm('Contact already exists in the Phonebook, we will update it!');
      update(personObject.id, personObject);
      setMessage(`${personObject.name} updated in the Phonebook`);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return setPersons(persons.map((/** @type {person} */person) => person.id === personObject.id ? personObject : person))
    }
   
    setPersons(persons.concat(personObject));

    // Send a POST request to the server with the new person object
    create(personObject);
    // Display a success message
    setMessage(`${personObject.name} added to the Phonebook`);
    setTimeout(() => {
      setMessage("");
    }, 2000);
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
          [name]: value,
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
    * @property {number} id
    */
  const filteredPersons = persons.filter((/** @type {person} */person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  // Delete a person from the Phonebook

  const deleteFunction = (/** @type {number} */id) => {
    window.confirm(`Delete ${persons.find((/** @type {person} */person) => person.id === id).name}?`);
    deletePerson(id);
    console.log("Deleted person:", id);
    setPersons(filteredPersons.filter((/** @type {person} */person) => person.id !== id));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchName={searchName} showAll={showAll} /> 
      <PersonForm handleName={handleName} addPerson={addPerson} />
      <h2>Numbers</h2>
      {filteredPersons.map((/** @type {person} */person) => (
          <p key={person.id}>
            {person.name} {person.number} <button onClick={() => deleteFunction(person.id)}>Delete</button>
          </p>
      ))}
    </div>
  );
};
