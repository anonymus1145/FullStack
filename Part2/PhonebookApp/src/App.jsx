/**
 * @module App
 */
//import { Note } from "./components/Note";
//import PropTypes from "prop-types";
//import { useState } from "react";

/*
 // Lecture notes
export const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  // Show all notes or show only the important ones
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

App.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
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
  const [persons, setPersons] = React.useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = React.useState({
    name: "",
    number: "",
  });
  const [searchName, setSearchName] = React.useState("");

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
