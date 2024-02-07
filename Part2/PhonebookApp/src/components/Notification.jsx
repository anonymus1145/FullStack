import PropTypes from "prop-types";

export const Notification = ({ message }) => {

  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === "") {
    return null;
  }
  return <div style={style} className="error">{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
