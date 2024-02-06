import PropTypes from "prop-types";

export const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name.length}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

Persons.propTypes = {
  persons: PropTypes.array.isRequired,
};
