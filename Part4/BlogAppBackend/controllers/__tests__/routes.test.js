// Here we write supertests
//

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");

// This is a helper function for tests to make HTTP requests to the server
const api = supertest(app);

// Initialize the database before evrey test
const Blog = require("../../models/blog");


const initialBlogs = [{
	title: "Test1 test1",
	author: "rooott",
	url: "test1",
	likes: 3
}];


// Before each test we clear the database
beforeEach(async () => {
	await Blog.deleteMany({});
	const blogObjects = initialBlogs.map(blog => new Blog(blog));
	const promiseArray = blogObjects.map(blog => blog.save());
	await Promise.all(promiseArray);
});

describe("GET /api/blogs", () => {
// Test that makes an HTTP GET request to the /api/blogs URL
	test("Blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	// Test that makes an HTTP GET request to the /api/blogs URL and checks the length of the response
	test("All blogs are returned", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(initialBlogs.length);
	});

	// Test that makes an HTTP GET request to the /api/blogs URL and checks the content of the response
	test("A specific blog is within the returned blogs", async () => {
		const response = await api.get("/api/blogs");
		const contents = response.body.map((blog) => blog.title);
		expect(contents).toContain("Test1 test1");
	});
});

describe("Check blog posts properties", () => {
// Test that check if the blog posts have a unique identifier property
	test("Unique identifier property of the blog posts is named id", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body[0].id).toBeDefined();
	});
});

// Variable to store the token
let token = "";

describe("POST /api/blogs", () => {

	test("Requaires a valid token", async () => {
		await api
			.post("/api/blogs")
			.send({})
			.expect(401)
			.expect("Content-Type", /application\/json/);
	});

	test("Register a new user", async () => {
		await api
			.post("/api/login")
			.send({
				username: "rooott",
				password: "sekret!!",
			})
			.expect(200)
			.expect("Content-Type", /application\/json/)
			.expect(response => {
				expect(response.body.token).toBeDefined();
				token = response.body.token;
			});
	});

	// Test that makes an HTTP POST request to the /api/blogs URL and adds a new blog
	test("Increases the number of blog posts by 1", async () => {
		const newBlog = {
			title: "Test2 test2",
			author: "rooott",
			url: "test2",
			likes: 5,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set("Authorization", `Bearer ${token}`)			
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect((await api.get("/api/blogs")).body).toHaveLength(initialBlogs.length + 1);
	});
});

describe("Check missing properties", () => {
// Test to see if the title and url properties are missing
	test("Title and url properties are missing", async () => {
		const newBlog = {
			author: "test5",
		};
		await api
			.post("/api/blogs")
			.send(newBlog)
			.set("Authorization", `Bearer ${token}`)
			.expect(400);
	});
});

describe("DELETE /api/blogs/:id", () => {
// Test that makes an HTTP DELETE request to the /api/blogs URL and deletes a blog
	test("Delete a blog", async () => {
		const response = await api.get("/api/blogs");
		const id = response.body[0].id;
		await api
			.delete(`/api/blogs/${id}`)
			.set("Authorization", `Bearer ${token}`)
			.expect(204);
	});
});

describe("PUT /api/blogs/:id, update a blog", () => {
// Test that makes an HTTP PUT request to the /api/blogs URL and updates a blog
	test("Update a blog", async () => {
		const response = await api.get("/api/blogs");
		const id = response.body[0].id;
		const updatedBlog = {
			title: "Test1 test1",
			author: "rooott",
			url: "test1",
			likes: 6,
		};
		await api
			.put(`/api/blogs/${id}`)
			.send(updatedBlog)
			.set("Authorization", `Bearer ${token}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});
});

// Closes the connection
afterAll(async () => {
	await mongoose.connection.close();
});

// To run test only for this file:
// pnpm test -- controllers/__tests__/routes.test.js
