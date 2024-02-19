const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// Get all users
usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs");
	response.json(users);
});


// Create new user (POST)
usersRouter.post("/", async (request, response, next) => {
	const { email, username, name, password } = request.body;

	// Encrypt password
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	// Create new user
	const user = new User({
		email,
		username,
		name,
		passwordHash,
	});

	// Add validation
	if (!user.passwordHash) {
		return response.status(400).json({
			error: "password missing",
		});
	} else if (user.passwordHash.length < 8) {
		return response.status(400).json({
			error: "password too short",
		});
	} else if (!user.username || user.username.length < 5 || user.username.length > 15) {
		return response.status(400).json({
			error: "username missing",
		});
	} else if (!user.email || !user.email.includes("@")) {
		return response.status(400).json({
			error: "email missing",
		});
	} else if (!user.name) {
		return response.status(400).json({
			error: "name missing",
		});
	}

	// Save user to database
	try {
		const savedUser = await user.save();
		response.status(201).json(savedUser);
	} catch (exception) {
		next(exception);
	}
});

module.exports = usersRouter;
