import PropTypes from 'prop-types'

export const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}

Total.propTypes = {
  parts: PropTypes.arrayOf(PropTypes.object).isRequired
}
