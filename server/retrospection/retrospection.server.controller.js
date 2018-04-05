'use strict';
const mongoose = require('mongoose');
const RetrospectionModel = require('../models/retrospection.model');
const DB_CONNECTION = require('../database/database.js');

const Retrospection = {};
module.exports = { Retrospection };

// Create
// {"data": {
// 		"createdAt": "1522261615021",
// 		"right": "dsfasdf",
// 		"teamRoom": "agni",
// 		"wrong": "dasdfasd",
// 		"accountName": "cgowda",
// 		"suggestion": "asdasdfas"
// 	}
// }
Retrospection.create = function(req, res) {
	RetrospectionModel.create(req.body.data, function(err, result) {
		if (!err) {
			return res.json(result);
		} else {
			return res.status(500).send(err); // 500 error
		}
	});
};

// Get
Retrospection.get = function(req, res) {
	// let query = req.query.id ? { _id: req.query.id } : {};
	let query = {};
	if (req.query.accountName && req.query.accountName.trim()) {
		query.accountName = req.query.accountName.trim();
	}
	if (req.query.teamRoom && req.query.teamRoom.trim() !== '') {
		query.teamRoom = req.query.teamRoom.replace(/"/g, '');
	}
	if (parseInt(req.query.startDate) && parseInt(req.query.endDate)) {
		query.createdAt = {
			$gte: parseInt(req.query.startDate),
			$lte: parseInt(req.query.endDate)
		};
	} else if (parseInt(req.query.createdAt)) {
		query.createdAt = parseInt(req.query.createdAt);
	}

	RetrospectionModel.get(query, function(err, result = {}) {
		if (!err) {
			if (!result) {
				result = {};
			}
			return res.json(result);
		} else {
			return res.status(500).send(err); // 500 error
		}
	});
};

// Delete
Retrospection.delete = function(req, res) {
	RetrospectionModel.removeById({ _id: req.query.id, accountName: req.query.accountName }, function(err, result) {
		if (!err) {
			return res.json(result);
		} else {
			console.log(err);
			return res.status(500).send(err); // 500 error
		}
	});
};

// Update
Retrospection.update = function(req, res) {
	let query = req.query.id ? { _id: req.query.id } : {};
	RetrospectionModel.updateById(query, req.body, function(err, result) {
		if (!err) {
			return res.json(result);
		} else {
			return res.status(500).send(err); // 500 error
		}
	});
};
