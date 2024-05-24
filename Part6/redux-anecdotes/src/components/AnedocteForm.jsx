import { useDispatch } from "react-redux";
import { newAnecdote } from "../features/andecdoteSlice";
import { initializeNotification } from "../features/notificationReducer";
import { useNavigate } from "react-router-dom";
// Import the custom hook
import { useField } from "../hooks/index";

const AnedocteForm = () => {
  // We call the useDispatch hook to get access to the actions from the store
  // We save the actions in the variable 'dispatch'
  // We call the appendAnecdote action from the reducer
  // We call the handleSubmit function when the form is submitted and pass the event value to the action
  const dispatch = useDispatch();
  // We call the useNavigate hook to get access to the actions from the store
  const navigate = useNavigate();
  // We call the useField custom hook
  const content = useField("text");

  const addAnecdote = async (event) => {
    event.preventDefault();
    // We save the value of the input in the variable 'anecdoteContent'
    const anecdoteContent = content.value;
    // We reset the input
    content.reset;
    // We call the newAnecdote action from the reducer to post the new anecdote
    dispatch(newAnecdote(anecdoteContent));
    const message = "You created: " + anecdoteContent;
    dispatch(initializeNotification(message));
    setTimeout(() => {
      // We call the initializeNotification action from the reducer to remove the notification
      dispatch(initializeNotification(null));
      // We call the navigate to go back to the homepage
      navigate("/");
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          {/* Utilize content object's properties */}
          <input
            name="anecdote"
            autoComplete="off"
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <button type="submit">create</button>
        {/* Call reset function when reset button is clicked */}
        <button type="button" onClick={content.reset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default AnedocteForm;
