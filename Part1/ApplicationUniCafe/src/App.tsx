// @ts-check

import { Header } from "./components/Header";
import { Statistics } from "./components/Content";
//import { Total } from "./components/Total";
import { Button } from "./components/Button";
import { useState } from "react";


// First Part
/*
export type Part = {
  name: string;
  exercises: number;
};

type Course = {
  name: string;
  parts: Part[];
}

const App = () => {
  const course: Course = {
    name: "Half Stack application development",
    parts: [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ],
}
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
*/

const initialAnecdotes = [
  { anecdoteData: "If it hurts, do it more often.", votes: 0 },
  { anecdoteData: "Adding manpower to a late software project makes it later!", votes: 0 },
  { anecdoteData: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.", votes: 0 },
  { anecdoteData: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", votes: 0 },
  { anecdoteData: "Premature optimization is the root of all evil.", votes: 0 },
  { anecdoteData: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.", votes: 0 },
  { anecdoteData: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.", votes: 0 },
  { anecdoteData: "The only way to go fast, is to go well.", votes: 0 }
];

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
  const [mostVoted, setMostVoted] = useState({ anecdoteData: "", votes: 0 });

  const handleClickGood = () => {
    setGood(good + 1);
    setCount(count + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setCount(count + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
    setCount(count + 1);
  };

  const handleAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleAnecdoteVote = () => {
    const copy = [...anecdotes];
    copy[selected].votes++;
    copy.sort((a, b) => b.votes - a.votes);
    setMostVoted(copy[0]);
    setAnecdotes(copy);
  };

  return (
    <div>
      <Header text="Give Feedback" />
      <div className="btn-group">
        <Button text="Good" onClick={handleClickGood} />
        <Button text="Neutral" onClick={handleClickNeutral} />
        <Button text="Bad" onClick={handleClickBad} />
      </div>
      {count === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          text="Statistics"
          good={good}
          neutral={neutral}
          bad={bad}
          all={count}
          average={(good - bad) / count}
          positive={(good / count) * 100}
        />
      )}
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected].anecdoteData}</p>
      <Button text="Next anecdote" onClick={handleAnecdote} />
      <p>Has {anecdotes[selected].votes} votes</p>
      <Button text="vote" onClick={handleAnecdoteVote} />
      <br />
      <br />
      <Header text="Anecdote with most votes" />
      <p>{mostVoted.anecdoteData}</p>
      <p>Has {mostVoted.votes} votes</p>
    </div>
  );
};
export default App;
