type Author = {

  name: string
  born: number
  bookCount: number
  id: string
}

// Person component
const Author = ({ author, onClose }: { author: Author; onClose: () => void }) => {
  return (
    <div>
      <h2>{author.name}</h2>
      <div>
        {author.born} {author.bookCount} books written
      </div>
      <div>{author.id}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

export default Author
