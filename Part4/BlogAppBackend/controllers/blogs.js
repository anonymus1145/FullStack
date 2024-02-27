// Module to handle notes and create routes for them
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

// Middleware to getToken
const getTokenFrom = (request, response) => {
	const authorization = request.get("authorization");

	if (authorization && authorization.startsWith("Bearer ")) {
		return authorization.replace("Bearer ", "");
	}
	return response.status(401).json({ error: "Session expired"});
};

// Function to check if token is valid
const checkToken = (token) => {
	try {
		const decodedToken = jwt.verify(token, process.env.SECRET);
		const expirationTime = Math.floor(Date.now() / 1000);

		// Log the time and expiration time
		console.log("Time till expiration: " + (decodedToken.exp - expirationTime) + "seconds");


		if (expirationTime >= decodedToken.exp + (10 * 60)) {
			return false;
		}
		return decodedToken;
	} catch (exception) {
		return false;
	}
};

// Import model/schema
const Blog = require("../models/blog");
const User = require("../models/user");

// Get all blogs
blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

// Get specific blog
blogsRouter.get("/:id", async (request, response, next) => {
	try {
		const blog = await Blog.findById(request.params.id);
		if (blog) {
			response.json(blog);
		} else {
			response.status(404).end();
		} 
	} catch (exception) {
		next(exception);
	}
});


// Create new blog
blogsRouter.post("/", async (request, response, next) => {
	const body = request.body;

	// Blog is then saved to the blogs list of the user identified by the token
	const token = getTokenFrom(request);
	if (!token) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	// Check if the token is expired
	const decodedToken = checkToken(token);
	if (!decodedToken.id || !decodedToken) {
		return response.status(401).json({ error: "token invalid" });
	}
	const user = await User.findOne({username: decodedToken.username});

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
	});

	if (!blog.title || !blog.url || !blog.author) {
		return response.status(400).json({
			error: "title and url are required"
		});
	}

	try {
		if (blog.author.toString() !== user.username.toString()) {
			return response.status(401).json({ error: "Unauthorized" });
		}
		const savedBlog = await blog.save();
		user.blogs.push(savedBlog);
		user.save();
		response.json({ message: "Blog saved" });
	} catch (exception) {
		next(exception);
	}
});

// Delete blog using async await
blogsRouter.delete("/:id", async (request, response, next) => {
	// Blog is then saved to the blogs list of the user identified by the token
	const token = getTokenFrom(request);
	if (!token) {
		return response.status(401).json({ error: "token missing or invalid" });
	}

	// Check if the token is expired
	const decodedToken = checkToken(token);
	if (!decodedToken.id || !decodedToken.username) {
		return response.status(401).json({ error: "token invalid" });
	}

	try {
		const blog = await Blog.findById(request.params.id);
		if (blog.author.toString() === decodedToken.username.toString()) {
			const userUpdate = await User.findOneAndUpdate(
				{ username: decodedToken.username },
				{ $pull: { blogs: request.params.id } },
				{ new: true }
			);

			if (userUpdate === null) {
				return response.status(401).json({ error: "We could not delete the blog" });
			}
			await Blog.findByIdAndDelete(request.params.id);
			response.status(204).end();
		}
	} catch (exception) {
		next(exception);
	}

});

// Update blog
blogsRouter.put("/:id", async (request, response, next) => {
	// Blog is then saved to the blogs list of the user identified by the token
	const token = getTokenFrom(request);
	if (!token) {
		return response.status(401).json({ error: "token missing or invalid" });
	}

	// Check if the token is expired
	const decodedToken = checkToken(token);

	if (!decodedToken.id || !decodedToken) {
		return response.status(401).json({ error: "token invalid" });
	}

	const blog = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes
	};

	if (!blog.title || !blog.url || !blog.author) {
		return response.status(400).json({
			error: "title, author and url are required"
		});
	}

	try {
		if (blog.author.toString() === decodedToken.username.toString()) {
			let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
			console.log(updatedBlog);
			response.json(updatedBlog);
		}
	} catch (exception) {
		next(exception);
	}
});

module.exports = blogsRouter;
