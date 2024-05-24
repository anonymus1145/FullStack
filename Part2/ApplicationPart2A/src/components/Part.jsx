import PropTypes from 'prop-types'

export const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

Part.propTypes = {
  part: PropTypes.shape({
    name: PropTypes.string.isRequired,
    exercises: PropTypes.number.isRequired
  }).isRequired
}
