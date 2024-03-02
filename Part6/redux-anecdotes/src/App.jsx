import { useEffect } from "react";
import AnecdoteForm from "./components/AnedocteForm";
import AnedocteList from "./components/AnedocteList";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Anecdote from "./components/Anecdote";
// We import the initializeAnecdotes action creator from the reducer
import { initializeAnecdotes } from "./features/andecdoteSlice";
// We import the useDispatch hook to get access to the actions from the store
import { useDispatch } from "react-redux";
// We import the necessary import to implement the React Routers
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  // We call the useDispatch hook to get access to the actions from the store
  // We call the initializeAnecdotes action from the reducer and pass it to the action 
  const dispatch = useDispatch();
  // We call the useEffect hook to call the initializeAnecdotes action to get the data from the server only once
  useEffect(() => {
    // We call dispatch and give the action creator as an argument to update the state
    dispatch(initializeAnecdotes());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // We create the React Routers
  const router = createBrowserRouter([
// We create a route for Anecdote List
    {
      path: "/",
      element: <AnedocteList />,
      errorElement: <Error />,
    },
// We create a route for Anecdote Form
    {
      path: "/create",
      element: <AnecdoteForm />,
      errorElement: <Error />,
    },
    // We createa a route for each anecdote
    { 
      path: "/:anecdoteId",
      element: <Anecdote />,
      errorElement: <Error />,
    }
  ]);

  // We add RouterProvider to render the React Routers
  return (
     <div>
      <h1>Software anecdotes</h1>
      <RouterProvider router={router} />
      <Notification />
      <Footer />
    </div>
  );
};

export default App;
