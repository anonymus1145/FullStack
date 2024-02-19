const listHelper = require("../list_helper");

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

// Test totalLikes

describe("total likes", () => {
	const listWithOneBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
			likes: 5,
			__v: 0
		}
	];

	const listWithMultipleBlogs = [
		{
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0
		},
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
			likes: 5,
			__v: 0
		},
		{
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		},
		{
			_id: "5a422b891b54a676234d17fa",
			title: "First class tests",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
			likes: 10,
			__v: 0
		},
		{
			_id: "5a422ba71b54a676234d17fb",
			title: "TDD harms architecture",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
			likes: 0,
			__v: 0
		}
	];

	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	}),

	test("when list has multiple blogs, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithMultipleBlogs);
		expect(result).toBe(34);
	});
});

// Data to be used in tests
const listOfBlogs = [
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		likes: 5,
	},
	{
		title: "React patterns",
		author: "Edsger W. Dijkstra",
		likes: 18,
	},
	{
		title: "First class tests",
		author: "Robert C. Martin",
		likes: 10,
	},
	{
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		likes: 0,
	},
	{
		title: "Type wars",
		author: "Robert C. Martin",
		likes: 2,
	},
	{
		title: "React patterns",
		author: "Michael Chan",
		likes: 7,
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		likes: 5,
	},
	{
		title: "VsCode this nuts",
		author: "Edsger W. Dijkstra",
		likes: 12,
	},
	{
		title: "First class tests",
		author: "Robert C. Martin",
		likes: 10,
	},
	{
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		likes: 0,
	},
	{
		title: "Type wars",
		author: "Robert C. Martin",
		likes: 22,
	},
	{
		title: "React patterns",
		author: "Michael Chan",
		likes: 7,
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		likes: 5,
	},
	{
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		likes: 32,
	},
	{
		title: "First class tests",
		author: "Robert C. Martin",
		likes: 55,
	}
];
// Test favorite blog

describe("Favorite blog", () => {

	test("when list has multiple blogs, equals the likes of that", () => {
		const result = listHelper.favoriteBlog(listOfBlogs);
		expect(result).toEqual({
			title: "First class tests",
			author: "Robert C. Martin",
			likes: 55,
		});
	});

});


// Check the author with most blogs
describe("Author with most blogs", () => {

	test("when list has multiple blogs", () => {
		const result = listHelper.mostBlogs(listOfBlogs);
		expect(result).toEqual({
			author: "Robert C. Martin",
			blogs: 7,
		});
	});
});


// Check the author with most likes
describe("Author with most liked blog", () => {

	test("when list has multiple blogs", () => {
		const result = listHelper.mostLikes(listOfBlogs);
		expect(result).toEqual({
			author: "Robert C. Martin",
			likes: 55,
		});
	});
});
