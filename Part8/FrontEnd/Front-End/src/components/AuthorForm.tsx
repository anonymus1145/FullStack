import { useState } from 'react'
import {  useMutation } from '@apollo/client'
import query from '../middleware/queries'


const PersonForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)
  const [bookCount, setBookCount] = useState(0)
  const [error, setError] = useState('')

  // We use the useMutation hook to execute the query wich retuns an array, the first element is the function to cause the mutation
  const [ createAuthor ] = useMutation(query.CREATE_AUTHOR, {
    onError: (error) => {
      const errorMessage = error.graphQLErrors.map(({ message }) => message).join('\n')
      setError(errorMessage)
      setTimeout(() => setError(''), 10000)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: query.ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(response.data.addAuthor)
        }
      })
    }
  })

  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    await createAuthor({ variables: { name, born, bookCount } })
    setName('')
    setBorn(0)
    setBookCount(0)
  }

  return (
    <div>
      <div style={{ color: 'red' }}>{error}</div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <div>
          Number of books <input value={bookCount}
            onChange={({ target }) => setBookCount(parseInt(target.value))}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )

}

export default PersonForm
