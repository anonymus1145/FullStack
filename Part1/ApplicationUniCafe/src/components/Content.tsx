// old Content.tsx
/*
import { Part } from "../App";

export const Content = ({parts} : {parts: Part[]}) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};
*/
// new Content.tsx

export type ContentProps = {
  text: string
  good: number
  neutral: number
  bad: number
  all: number
  average: number
  positive: number
}

const StatisticLine = ({text, value}: {text: string, value: number}) => {
  return (
  <>
  <p>{text} = {value}</p>
  </>
  )
}

export const Statistics = (props: ContentProps) => {
  return (
    <div>
      <h2>{props.text}</h2>
      <StatisticLine text="Good" value={props.good}/>
      <StatisticLine text="Neutral" value={props.neutral}/>
      <StatisticLine text="Bad" value={props.bad}/>
      <StatisticLine text="All" value={props.all}/>
      <StatisticLine text="Average" value={props.average}/>
      <StatisticLine text="Positive" value={props.positive}/>
    </div>
  );
}
