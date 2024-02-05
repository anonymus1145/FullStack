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
