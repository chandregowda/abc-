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

	const express = require('express');
	let app = express();
	let router = express.Router();

	app.use(compression());
	app.use(cors());
	app.use(router);

	app.use(function(req, res, next) {
		let requestURL = parseurl(req);
		console.log(new Date().toLocaleString() + ` : Request for : ${requestURL}`);
		next();
	});

	router.use(bodyParser.json());
	router.use(
		bodyParser.urlencoded({
			extended: false
		})
	);
	/**load route file*/
	require('./routes/router')(router);

	app.listen(CONFIG.server.port, (e) => {
		if (e) {
			return console.log('Failed to start server:', e);
		}
		console.log('Server Started at port : ', CONFIG.server.port);
	});
}
