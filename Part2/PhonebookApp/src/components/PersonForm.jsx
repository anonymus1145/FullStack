import PropTypes from "prop-types";

export const PersonForm = ({ handleName, addPerson }) => {
  return (
      <form onSubmit={addPerson}>
        <h2>Add a new person</h2>
        <div>
           <p> name: <input name="name" onChange={handleName} /> </p>
            <p> number: <input name="number" onChange={handleName} />  </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  );
};

PersonForm.propTypes = {
  handleName: PropTypes.func.isRequired,
  addPerson: PropTypes.func.isRequired,
};
