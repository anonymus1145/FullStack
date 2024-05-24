import mongoose from 'mongoose'

export interface IBook {
  title: string;
  published: number;
  author: mongoose.Types.ObjectId;
  genres: string[];
}

const schema = new mongoose.Schema<IBook>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

const Book = mongoose.model('Book', schema)

export default Book;
