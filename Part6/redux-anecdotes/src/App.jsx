import { useEffect } from "react";
import AnecdoteForm from "./components/AnedocteForm";
import AnedocteList from "./components/AnedocteList";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./features/andecdoteSlice";

import { useDispatch } from "react-redux";

const App = () => {
  // We call the useDispatch hook to get access to the actions from the store
  // We call the initializeAnecdotes action from the reducer and pass it to the action 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnedocteList />
      <AnecdoteForm />
      <Notification />
    </div>
  );
};

export default App;
