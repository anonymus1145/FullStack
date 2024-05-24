import PropTypes from 'prop-types'

export const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired
}
