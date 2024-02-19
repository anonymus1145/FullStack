const mongoose = require("mongoose");
// Add unique validator
// eslint-disable-next-line no-unused-vars
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true },
	name: { type: String, required: true },
	passwordHash: { type: String, required: true },
	blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash;
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
