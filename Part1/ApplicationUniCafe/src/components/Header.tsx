// old Header.tsx
/*
export const Header = ({course}: {course: string}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
} 
*/


// new Header.tsx
export const Header = ({text}: {text: string}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
}
