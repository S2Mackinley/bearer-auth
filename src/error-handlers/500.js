'use strict';

module.exports = (err, req, res, next) => {
	let error = { error: err.message || err };
	res.statusCode = err.status || 500;
	res.statusMessage = err.statusMessage || `Something went wrong on the server. I wish I could tell you more but I'm dumb`;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify(error));
	res.end();
};
