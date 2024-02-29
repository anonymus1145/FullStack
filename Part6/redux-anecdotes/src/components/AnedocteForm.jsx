import { useDispatch } from "react-redux";
import { newAnecdote } from "../features/andecdoteSlice";
import { initializeNotification } from "../features/notificationReducer";

const AnedocteForm = () => {
  // We call the useDispatch hook to get access to the actions from the store
  // We save the actions in the variable 'dispatch'
  // We call the appendAnecdote action from the reducer
  // We call the handleSubmit function when the form is submitted and pass the event value to the action
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    // We call the newAnecdote action from the reducer to post the new anecdote
    dispatch(newAnecdote(content));
    const message = "You created: " + content;
    dispatch(initializeNotification(message));
  };
    
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" autoComplete="off" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnedocteForm;
