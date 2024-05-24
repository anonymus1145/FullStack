import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import query from '../middleware/queries'

const BornForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)
  const [error, setError] = useState('')
// if a person with the given name cannot be found, the mutation response is null and GraphQL dosen't throw an error so we add result as a parameter to generate an error message
  const [ changeNumber, result] = useMutation(query.UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: query.ALL_AUTHORS }],
    onError: (error) => {
      const errorMessage = error.graphQLErrors.map(({ message }) => message).join('\n')
      setError(errorMessage)
      setTimeout(() => setError(''), 10000)
    }
  })

  const submit = (event: { preventDefault: () => void }) => {
    event.preventDefault()

    changeNumber({ variables: { name, born } })

    setName('')
    setBorn(0)
  }

  useEffect(() => {
    if (result.data && result.data.updateBirthYear === null) {
      setError(`author '${name}' not found`)
      setTimeout(() => setError(''), 10000)
    }
  }, [result.data])

  return (
    <div>
      <div style={{ color: 'red' }}>{error}</div>
      <h2>change year</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>change year</button>
      </form>
    </div>
  )
}

export default BornForm
