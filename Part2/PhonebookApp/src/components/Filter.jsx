import PropTypes from "prop-types";

export const Filter = ({ searchName, showAll }) => {
  return (
    <div>
      <p>
        Filter shown with: <input value={searchName} onChange={showAll} />
      </p>
    </div>
  );
};

Filter.propTypes = {
  searchName: PropTypes.string.isRequired,
  showAll: PropTypes.func.isRequired,
};
