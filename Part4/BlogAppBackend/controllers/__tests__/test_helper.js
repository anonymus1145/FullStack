const User = require("../../models/user");

// Returns a promise that resolves to an array of the users in the database
const usersInDb = async () => {
	const users = await User.find({});
	return users.map(u => u.toJSON());
};


//module.exports = initialNotes;
//module.exports = nonExistingId;
//module.exports = notesInDb;
module.exports = { usersInDb };
