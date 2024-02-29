import { createSlice } from "@reduxjs/toolkit";
import getData from "../../server";


const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload;
      const voted = state.find((a) => a.id === id);
      const changed = { ...voted, votes: voted.votes + 1 };
      return state
        .map((a) => (a.id !== id ? a : changed))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    filterAnecdotes: (state, action) => {
      const filter = action.payload;
      return state.filter((a) =>
        a.content.toLowerCase().includes(filter.toLowerCase()),
      );
    },
    setAnecdotes: (state, action) => {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const {
  vote,
  appendAnecdote,
  filterAnecdotes,
  fetchAnecdotes,
  setAnecdotes,
} = anecdoteSlice.actions;

// Actions creators
//
// Initialize Anecdotes based on server data
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getData.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

// Add new Anecdote
export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await getData.postNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
 };

// Update Anecdotes with the new vote's
export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await getData.updateData(anecdote);
    dispatch(vote(updatedAnecdote.id));
  };
}


export default anecdoteSlice.reducer;
