/**
 * @module App
 */
//PhoneBook // BlogsApp
// @ts-check
import React from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { getAll, create, deletePerson, update } from "./services/phoneBook";
import { Notification } from "./components/Notification";

export const App = () => {
  /**
   * @type {object} {name: string, number: string, id: string}
   */
  const [persons, setPersons] = React.useState([
    { id: "", number: "", name: "" },
  ]);
  const [newName, setNewName] = React.useState({
    number: "",
    name: "",
  });
  const [searchName, setSearchName] = React.useState("");
  const [message, setMessage] = React.useState("");

  // Add login form
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Fetch data from the server
  React.useEffect(() => {
    console.log("Fetching data...");
    getAll().then((data) => {
      setPersons(data);
      console.log("Data fetched:", data);
    });
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
      number: newName.number,
      name: newName.name,
    };

    // Check if the name and number fields are not empty or has below 3 characters
    if (personObject.name === "" || personObject.number === "") {
      setMessage("Name and number fields cannot be empty!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    } else if (personObject.name.length < 3) {
      setMessage("Name must be at least 3 characters long!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    } else if (personObject.number.length < 8) {
      setMessage("Number must be at least 8 characters long!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    // Check if a person with the same name already exists
    /**
     * Person type definition
     * @typedef {Object} foundPerson
     * @property {string} name
     * @property {string} number
     * @property {string} id
     */
    // Variabila person will be used to check if a person with the same name already exists
    let foundPerson = persons.find(
      (/** @type {person} */ person) => person.name === personObject.name,
    );
    if (foundPerson) {
      // Update the person in the Phonebook
      window.confirm(
        "Contact already exists in the Phonebook, we will update it!",
      );
      update(foundPerson.id, personObject);
      setMessage(`${personObject.name} updated in the Phonebook`);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      setPersons(
        persons.map((/** @type {person} */ person) =>
          person.id === foundPerson.id ? personObject : person,
        ),
      );
    } else {
      setPersons(persons.concat(personObject));

      // Send a POST request to the server with the new person object
      create(personObject);
      // Display a success message
      setMessage(`${personObject.name} added to the Phonebook`);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
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
      };
    });
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
   * @property {string} id
   */
  const filteredPersons = persons.filter((/** @type {person} */ person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase()),
  );

  // Delete a person from the Phonebook

  const deleteFunction = (/** @type {string} */ id) => {
    window.confirm(
      `Delete ${persons.find((/** @type {person} */ person) => person.id === id).name}?`,
    );
    deletePerson(id).catch((error) => {
      setMessage(
        `Information of ${persons.find((/** @type {person} */ person) => person.id === id).name} has already been removed from the server`,
      );
      setTimeout(() => {
        setMessage("");
        console.log("Error:", error.message);
      }, 2000);
    });
    console.log("Deleted person:", id);
    setPersons(
      filteredPersons.filter(
        (/** @type {person} */ person) => person.id !== id,
      ),
    );
  };

  // Add logic for handle login
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <Filter searchName={searchName} showAll={showAll} />
      <PersonForm handleName={handleName} addPerson={addPerson} />
      <h2>Numbers</h2>
      {filteredPersons.map((/** @type {person} */ person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deleteFunction(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};
