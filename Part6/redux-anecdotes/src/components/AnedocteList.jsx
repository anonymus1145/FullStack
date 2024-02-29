import { useSelector, useDispatch } from "react-redux";
import Filter from "./Filter";
import { initializeNotification } from "../features/notificationReducer";
import { updateAnecdote } from "../features/andecdoteSlice";


const AnedocteList = () => {
  // We call the useSelector hook to get access to the state anecdotes from the store which is an object passed to main as a prop
  // We save the state in the variable 'anecdotes'
  const anecdotes = useSelector((state) => state.anecdotes);
  // We call the useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

  const click = (id) => {
    const updatedAnecdote = anecdotes.find(a => a.id === id);
    const newAnecdote = {
      ...updatedAnecdote,
      votes: updatedAnecdote.votes + 1
    };
    dispatch(updateAnecdote(newAnecdote));
    const message = "You voted: " + newAnecdote.content;
    dispatch(initializeNotification(message));
  }


  return (
    <div>
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => click(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnedocteList;
