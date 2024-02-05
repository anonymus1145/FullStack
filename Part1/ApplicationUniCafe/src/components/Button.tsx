export const Button = ({text, onClick}: {text: string, onClick: () => void}) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>)  
} 
