import PropTypes from 'prop-types'
import { Part } from './Part'

export const Content = ({ content }) => {
  return (
    <div>
       {content.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

Content.propTypes = {
  content: PropTypes.shape({
    parts: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
}
