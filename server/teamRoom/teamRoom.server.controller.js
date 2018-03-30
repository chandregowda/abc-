'use strict';
const mongoose = require('mongoose');
const TeamRoomModel = require('../models/teamRoom.model');
const DB_CONNECTION = require('../database/database.js');

const TeamRoom = {};
module.exports = { TeamRoom };

// Create
// {
// 	"owner": "cgowda",
// 	"ownerName": "Chandre Gowda",
// 	"displayName": "Agni - Wellness Team 1",
// 	"value": "agni"
// }
TeamRoom.create = function(req, res) {
	TeamRoomModel.create(req.body.data, function(err, result) {
		if (!err) {
			return res.json(result);
		} else {
			return res.status(500).send(err); // 500 error
		}
	});
};

// Get
TeamRoom.get = function(req, res) {
	// let query = req.query.id ? { _id: req.query.id } : {};
	let query = req.query.owner && req.query.owner.trim() ? { owner: req.query.owner.trim() } : {};
	if (req.query.id && req.query.id.trim()) {
		query._id = req.query.id.trim();
	}

	TeamRoomModel.get(query, function(err, result = {}) {
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
TeamRoom.delete = function(req, res) {
	TeamRoomModel.removeById({ _id: req.query.id, owner: req.query.owner }, function(err, result) {
		if (!err) {
			return res.json(result);
		} else {
			return res.status(500).send(err); // 500 error
		}
	});
};

// Update
TeamRoom.update = function(req, res) {
	let query = req.query.id ? { _id: req.query.id } : {};
	TeamRoomModel.updateById(query, req.body, function(err, result) {
		if (!err) {
			return res.json(result);
		} else {
			return res.status(500).send(err); // 500 error
		}
	});
};
