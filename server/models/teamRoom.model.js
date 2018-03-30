'use strict';
const mongoose = require('mongoose');
const DB_CONNECTION = require('../database/database.js');

const Schema = mongoose.Schema;

const TeamRoomSchema = new Schema({
	owner: { type: String, required: true },
	displayName: { type: String, required: true, unique: true },
	teamRoom: { type: String, required: true, unique: true } // used for Options value purpose, NO SPACE allowed
});
TeamRoomSchema.index({ createdAt: 1, teamRoom: 1 }, { unique: true });

/**
 * Schema STATIC addition which works on entire Model
 */
TeamRoomSchema.statics = {
	/**
   * Find one
   */
	getOne: function(query, callback) {
		this.findOne(query, callback);
	},

	/**
   * Find all
   */
	get: function(query, callback) {
		this.find(query, callback);
	},

	updateById: function(query, updateData, callback) {
		this.update(query, { $set: updateData }, callback);
	},

	removeById: function(removeData, callback) {
		this.remove(removeData, callback);
	},

	create: function(data, callback) {
		var instance = new this(data);
		instance.save(callback);
	}
};

module.exports = mongoose.model('TeamRoom', TeamRoomSchema);
