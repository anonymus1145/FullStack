import mongoose from 'mongoose'

export interface IUser {
  username: string
  favoriteGenre: string
  books: string[]
}

const schema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true, 
    unique: true,
    minlength: 4
  },
  favoriteGenre: {
    type: String,
    required: true
  },
  books: {
    type: [{}]
  }
})

const User = mongoose.model('User', schema)

export default User
