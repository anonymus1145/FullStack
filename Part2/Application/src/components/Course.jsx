import { Content } from './Content'
import { Header } from './Header'
import PropTypes from 'prop-types'
import { Total } from './Total'

export const Course = (props) => {
  const { content } = props;
  const name = content.name;
  return (
    <div>
      <Header name={name} />
      <Content content={content} />
      <Total parts={content.parts} />
    </div>
  )
}

Course.propTypes = {
  content: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parts: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
}
