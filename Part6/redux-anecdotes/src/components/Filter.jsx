import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../features/andecdoteSlice";

const Filter = () => {
  const dispatch = useDispatch();
 
  const handleChange = (event) => {
    event.preventDefault();
    const filter = event.target.value.toLowerCase();
    dispatch(filterAnecdotes(filter));
  };

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
