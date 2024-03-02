import { useSelector } from "react-redux";

const Notification = () => {
  // We call the useSelector hook to get access to the state anecdotes from the store which is an object passed to main as a prop
  const notification = useSelector(state => state.notification)
  const style = {
    padding: 10,
    borderWidth: 1,
    margin: 10
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
