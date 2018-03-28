'use strict';
const mongoose = require('mongoose');
const DailyUpdateModel = require('../models/dailyUpdate.model');
const DB_CONNECTION = require('../database/database.js');

const DailyUpdate = {};
module.exports = { DailyUpdate };

// Create
DailyUpdate.create = function(req, res) {
	/* POST DATA:
  {
		"firstname": "Chandre",
		"lastname": "Gowda",
		"age": 37,
		"description": "Something about this user",
		"dob": "1981-04-05"
  }
  */

	DailyUpdateModel.create(req.body, function(err, result) {
		if (!err) {
			return res.json(result);
		} else {
			return res.status(500).send(err); // 500 error
		}
	});
};

// Get
DailyUpdate.get = function(req, res) {
	// let query = req.query.id ? { _id: req.query.id } : {};
	let query = req.query.createdAt ? { createdAt: req.query.createdAt } : {};
	DailyUpdateModel.get(query, function(err, result = {}) {
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
DailyUpdate.delete = function(req, res) {
	DailyUpdateModel.removeById({ _id: req.query.id }, function(err, result) {
		if (!err) {
			return res.json(result);
		} else {
			console.log(err);
			return res.status(500).send(err); // 500 error
		}
	});
};

// Update
DailyUpdate.update = function(req, res) {
	let query = req.query.id ? { _id: req.query.id } : {};
	DailyUpdateModel.updateById(query, req.body, function(err, result) {
		if (!err) {
			return res.json(result);
		} else {
			return res.status(500).send(err); // 500 error
		}
	});
};
