const { Sample } = require('./sample.server.controller');

// API Server Endpoints
module.exports = function(router) {
	router.get('/sample-api/greet', Sample.greet);
};
