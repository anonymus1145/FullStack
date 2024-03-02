import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Anecdote = () => {

  // We use useParams hook to get access to the id of the anecdote from the url
  const params = useParams();

  const anecdotes = useSelector((state) => state.anecdotes);
  const anecdote = anecdotes.find((anecdote) => anecdote.id === params.anecdoteId);
  
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <p>Has {anecdote.votes} votes</p>
    </div>
  );
};
export default Anecdote;
