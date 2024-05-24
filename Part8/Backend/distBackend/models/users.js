import mongoose from 'mongoose';
const schema = new mongoose.Schema({
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
});
const User = mongoose.model('User', schema);
export default User;
