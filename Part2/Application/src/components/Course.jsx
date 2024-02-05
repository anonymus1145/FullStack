import { Header } from './Header'
import PropTypes from 'prop-types'

export const Course = (props) => {
  const { content } = props;
  const name = content.name.toString();
  return (
    <div>
      <Header name={name} />
      {content.parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
    </div>
  )
}

Course.propTypes = {
  content: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parts: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
}
