import { useState } from "react";

// We create a custom hook to simplify the anecdote creation
// We pass the type as a parameter -> the type is recevied from the input field
const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = (event) => {
    event.preventDefault();
    setValue("");
  };
// The function returns all of the attributes required by the input: its type, value and the onChange handler.
  return {
    type,
    value,
    onChange,
    reset,
  };
}

export { useField };
