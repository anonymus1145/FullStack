// Module for showing logs
const info = (...params) => {
	if (process.env.NODE_ENV !== "test") {
		console.log(...params);
	}
};

const error = (...params) => {
	if (process.env.NODE_ENV !== "test") {
		console.error(...params);
	}
};

exports.info = info;
exports.error = error;
