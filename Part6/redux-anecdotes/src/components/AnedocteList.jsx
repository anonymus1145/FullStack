import { useSelector, useDispatch } from "react-redux";
import Filter from "./Filter";
import { initializeNotification } from "../features/notificationReducer";
import { updateAnecdote } from "../features/andecdoteSlice";
import { Link } from "react-router-dom";

const AnedocteList = () => {
  // We call the useSelector hook to get access to the state anecdotes from the store which is an object passed to main as a prop
  // We save the state in the variable 'anecdotes'
  const anecdotes = useSelector((state) => state.anecdotes);
  // We call the useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

  const click = (id) => {
    const updatedAnecdote = anecdotes.find((a) => a.id === id);
    const newAnecdote = {
      ...updatedAnecdote,
      votes: updatedAnecdote.votes + 1,
    };
    dispatch(updateAnecdote(newAnecdote));
    const message = "You voted: " + newAnecdote.content;
    dispatch(initializeNotification(message));
  };

  // We will render a link for each anecdote so we can navigate to it
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <br />
      {anecdotes.map((anecdote) => (
        <Link key={anecdote.id} to={`/${anecdote}`}>
          <li style={{ marginBottom: 10 , marginLeft: 10}}>
            {anecdote.content} 
            <button style={{marginLeft: 10}} onClick={() => click(anecdote.id)}>vote</button>
          </li>
        </Link>
      ))}
    </div>
  );
};

export default AnedocteList;
