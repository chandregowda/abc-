/**
 * Main file to start our node server
 */

'use strict';
const cluster = require('cluster'); // To fork the workers and make server more scalable and efficient
const { CONFIG } = require('../config/config');

if (cluster.isMaster) {
	let numWorkers = require('os').cpus().length;
	if (CONFIG.server.MAX_NUMBER_OF_CPU && CONFIG.server.MAX_NUMBER_OF_CPU < numWorkers) {
		numWorkers = CONFIG.server.MAX_NUMBER_OF_CPU;
	}

	for (let i = 0; i < numWorkers; i++) {
		cluster.fork();
	}

	cluster.on('online', function(worker) {
		console.log('Worker ' + worker.process.pid + ' is online');
	});

	// If something goes wrong and the worker is killed, start new worker
	cluster.on('exit', function(worker, code, signal) {
		console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
	});
} else {
	const cors = require('cors');
	const compression = require('compression');
	const bodyParser = require('body-parser');
	const parseurl = require('parseurl');
	const jwt = require('jsonwebtoken');

	const express = require('express');
	let app = express();
	let router = express.Router();

	app.use(compression());
	app.use(cors());
	app.use(router);

	const validateRequest = function(req, res, next) {
		// check header or url parameters or post parameters for token
		var token = req.headers['x-access-token'] || req.body.token || req.query.token;
		// decode token
		if (token) {
			// verifies secret and checks exp
			jwt.verify(token, CONFIG.webTokenKey, function(err, decoded) {
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token.' });
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					next();
				}
			});
		} else {
			// if there is no token
			// return an error
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}
	};

	// app.use(function(req, res, next) {
	// 	let requestURL = parseurl(req);
	// 	console.log(new Date().toLocaleString() + ` : Request for : ${requestURL}`);
	// 	next();
	// });

	router.use(bodyParser.json());
	router.use(
		bodyParser.urlencoded({
			extended: false
		})
	);

	/**load route file*/
	require('./routes/router')(router, validateRequest);

	app.listen(CONFIG.server.port, (e) => {
		if (e) {
			return console.log('Failed to start server:', e);
		}
		console.log('Server Started at port : ', CONFIG.server.port);
	});
}
