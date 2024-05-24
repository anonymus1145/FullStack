const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../../models/user");
const helper = require("./test_helper");
const assert = require("assert");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);


const initialUsers = [
	{
		email: "XhYs8@example.com",
		username: "rooott",
		name: "Superuser",
		password: "sekret!!",
	},
	{
		email: "l4t3o@example.com",
		username: "mluukkai",
		name: "Matti Luukkainen",
		password: "salainen!",
	},
];

beforeEach(async () => {
	await User.deleteMany({});
	for (const user of initialUsers) {
		const passwordHash = await bcrypt.hash(user.password, 10);
		const newUser  = new User({ ...user, passwordHash });
		await newUser.save();
	}
});

describe("POST /api/users", () => {
// Test that makes an HTTP GET request to the /api/users URL and checks the length of the response
	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();
		// Create new user
		const newUser = {
			email: "TestUser@localhost",
			username: "TestUser",
			name: "Test User",
			password: "testpassword",
		};
		// Send POST request to /api/users with new user
		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		// Check that the new user is in the database
		const usersAtEnd = await helper.usersInDb();
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

		const usernames = usersAtEnd.map(u => u.username);
		assert(usernames.includes(newUser.username));
	});
});


describe("GET /api/users", () => {
	test("invalid users are not created and status code is 400", async () => {
		const newUser = {
			email: "TestUser@localhost",
			username: "Test",
			name: "Test User",
			password: "testpassword",
		};
		await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);
	});
});


afterAll(() => {
	mongoose.connection.close();
});


// To run test only for this file:
// pnpm test -- controllers/__tests__/user.test.js
