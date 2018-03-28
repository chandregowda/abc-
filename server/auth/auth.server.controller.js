'use strict';

const { CONFIG } = require('../../config/config');

// For AD authentication
const ActiveDirectory = require('activedirectory');
const maxAge = parseInt(CONFIG.server.sessionTimeOut) || 6000;

const AUTH = {};
module.exports = { AUTH };

AUTH.logout = function(options) {
	logger.INFO('Logging Out', options);
}; // logout

// Login to system using Yoldee credentials
AUTH.login = (req, res) => {
	const o = { username: req.body.email || '', password: req.body.password || '' };
	if (!o.username.trim() || !o.password.trim()) {
		res.status(401).send({ message: 'INVALID_CREDENTIALS' });
	}

	authenticate(o)
		.then((output) => {
			res.json(output);
		})
		.catch((e) => {
			res.json({ message: 'LOGIN_FAILURE', error: e });
		});
};

const authenticate = function(options) {
	let { username, password } = options;
	return new Promise((resolve, reject) => {
		if (!username || !password) {
			return reject({
				message: 'INVALID_CREDS'
			});
		}
		// let pTextPassword = new Buffer(password, 'base64').toString('utf8');
		let pTextPassword = password;
		let loginId = username;

		// Add domain to the userID
		// logger.WARN(new Date().toLocaleString() + ': LOGIN tried by : ' + loginId);

		if (!/@yodlee.com$/i.test(username)) {
			username += '@yodlee.com';
		}
		let opts = {
			url: CONFIG.server.ldapURL,
			baseDN: 'dc=corp,dc=yodlee,dc=com',
			username: username,
			password: pTextPassword,
			attributes: {
				user: [
					'userPrincipalName',
					'sAMAccountName',
					'mail',
					'lockoutTime',
					'whenCreated',
					'pwdLastSet',
					'userAccountControl',
					'employeeID',
					'sn',
					'givenName',
					'initials',
					'cn',
					'displayName',
					'comment',
					'description'
				]
			}
		};

		let ad = new ActiveDirectory(opts);
		ad.authenticate(username, pTextPassword, function(err, auth) {
			if (err) {
				// logger.WARN('Login Failed : ' + JSON.stringify(err));
				console.log('Login Failed : ' + JSON.stringify(err));
				return reject({
					message: 'INVALID_CREDS'
				});
			}

			let opts = {
				username: username,
				password: pTextPassword
			};

			if (auth) {
				ad.findUser(opts, username, function(err, details) {
					if (err) {
						// logger.WARN(username + ' : Login Failed: ' + JSON.stringify(err));
						console.log(username + ' : Login Failed: ' + JSON.stringify(err));
						return reject({
							message: 'INVALID_CREDS'
						});
					}

					if (!details) {
						// logger.WARN('User Details of ' + username + ' not found.');
						console.log('User Details of ' + username + ' not found.');
					} else {
						// logger.WARN(JSON.stringify(details));
						// logger.WARN("User details found");
					}
					// logger.WARN(new Date().toLocaleString() + ': LOGIN SUCCESS by : ' + loginId);
					console.log(new Date().toLocaleString() + ': LOGIN SUCCESS by : ' + loginId);
					let csession = new Buffer(details.whenCreated + '-' + details.mail).toString('base64');
					let dsession = new Buffer(details.whenCreated).toString('base64');

					return resolve({
						message: 'LOGIN_SUCCESSFUL',
						details
					});
				});
			} else {
				// logger.WARN(username + ' : Authentication failed!');
				console.log(username + ' : Authentication failed!');
				reject({
					message: 'INVALID_CREDS'
				});
			}
		}); // authenticate
	});
}; // Function login
