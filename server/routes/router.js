/**
 * This file is used to configure various module routes
 * 
 */

module.exports = function(router, tokenValidator) {
	// API Server Endpoints
	// require('../mail/mail.server.route')(router);
	require('../sample/sample.server.route')(router, tokenValidator);
	require('../auth/auth.server.route')(router);
	require('../dailyUpdate/dailyUpdate.server.route')(router, tokenValidator);
	require('../teamRoom/teamRoom.server.route')(router, tokenValidator);
	require('../followUp/followUp.server.route')(router, tokenValidator);
};
