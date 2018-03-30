const { TeamRoom } = require('./teamRoom.server.controller');

// API Server Endpoints
module.exports = function(router, tokenValidator) {
	/** DB Activities */
	router.post('/teamRoom/create', tokenValidator, TeamRoom.create);
	router.post('/teamRoom/get', tokenValidator, TeamRoom.get);
	router.post('/teamRoom/update', tokenValidator, TeamRoom.update);
	router.post('/teamRoom/delete', tokenValidator, TeamRoom.delete);
};
