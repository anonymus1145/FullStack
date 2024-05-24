import { Link } from "react-router-dom";

// We use Link to go back to the homepage when the page is not found
// This is a beter option then a ref tag because it will not refresh the page

const Error = () => {
  return (
    <div>
      404 - Page not found
      <div style = {{margin: 10}}>
      <button> <Link to="/">Go back</Link> </button> 
      </div>
    </div>
  );
}

export default Error;
