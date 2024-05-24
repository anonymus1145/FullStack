//@ts-check

const dummy = (/** @type {object} */ blogPosts) => {
	if (blogPosts) {
		return 1;
	} else {
		return 1;
	}
};

exports.dummy = dummy;

const totalLikes = (/** @type {object} */ blogPosts) => {
	return blogPosts.reduce(
		(/** @type {number} */ sum, /** @type {object} */ post) => {
			return sum + post.likes;
		},
		0,
	);
};

exports.totalLikes = totalLikes;

const favoriteBlog = (/** @type {object} */ blogPosts) => {
	// Check to see the fastes alghorithm for finding the favorite blog
	//	const start = performance.now();
	if (blogPosts.length === 0) {
		return null;
	}
	// Using the sort function to sort the blog posts by likes in descending order -> Time taken: 0.0019169999999917309ms
	blogPosts.sort(
		(/** @type {object} */ a, /** @type {object} */ b) => b.likes - a.likes,
	);
	//	const end = performance.now();
	//console.log(`Time taken: ${end - start}ms`);
	return blogPosts[0];

	// We will create a simple loop with a max and a counter variables
	/*let max = blogPosts[0].likes;
  let counter = 0;

  // Loop through the blog posts -> Time taken: 0.0021250000000350155ms
  for (let i = 1; i < blogPosts.length; i++) {
    if (blogPosts[i].likes > max) {
      max = blogPosts[i].likes;
      counter = i;
    }
  }

  const end = performance.now();
  console.log(`Time taken: ${end - start}ms`);
  return blogPosts[counter]; */
};

exports.favoriteBlog = favoriteBlog;

// Function that returns the author with the most blogs

const mostBlogs = (/** @type [] */ blogs) => {
	const authors = [];
	if (blogs.length === 0) {
		return null;
	}

	blogs.forEach((/** @type {object} */ blog) => {
		const index = authors.findIndex(
			(/** @type {object} */ author) => author.author === blog.author,
		);
		if (index === -1) {
			authors.push({ author: blog.author, blogs: 1 });
		} else {
			authors[index].blogs++;
		}
	});
	authors.sort(
		(/** @type {object} */ a, /** @type {object} */ b) => b.blogs - a.blogs,
	);
	return authors[0];
};

exports.mostBlogs = mostBlogs;

// Function that returns the author with the most likes on one blog
const mostLikes = (/** @type {object} */ blogs) => {
	if (blogs.length === 0) {
		return null;
	}
	blogs.sort((/** @type {object} */ a, /** @type {object} */ b) => b.likes - a.likes);
	return { author: blogs[0].author, likes: blogs[0].likes }; 
};

exports.mostLikes = mostLikes;
