/**
 * This file is used to configure various module routes
 * 
 */

module.exports = function(router) {
	// API Server Endpoints
	// require('../mail/mail.server.route')(router);
	require('../sample/sample.server.route')(router);
};
