import mongoose from 'mongoose'

export interface IAuthor {
  name: string
  born?: number
}

const schema = new mongoose.Schema<IAuthor>({
  name: {
    type: String,
    required: true, 
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

const Author = mongoose.model('Author', schema)

export default Author
