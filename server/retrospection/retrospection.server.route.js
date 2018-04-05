const { Retrospection } = require('./retrospection.server.controller');

// API Server Endpoints
module.exports = function(router, tokenValidator) {
	/** DB Activities */
	router.post('/retrospection/create', tokenValidator, Retrospection.create);
	router.post('/retrospection/get', tokenValidator, Retrospection.get);
	router.post('/retrospection/update', tokenValidator, Retrospection.update);
	router.post('/retrospection/delete', tokenValidator, Retrospection.delete);
};
