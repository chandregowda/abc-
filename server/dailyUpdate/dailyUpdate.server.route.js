const { DailyUpdate } = require('./dailyUpdate.server.controller');

// API Server Endpoints
module.exports = function(router) {
	/** DB Activities */
	router.post('/dailyUpdate/create', DailyUpdate.create);
	router.post('/dailyUpdate/get', DailyUpdate.get);
	router.post('/dailyUpdate/update', DailyUpdate.update);
	router.post('/dailyUpdate/delete', DailyUpdate.delete);
};
