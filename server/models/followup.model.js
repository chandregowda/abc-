'use strict';
const mongoose = require('mongoose');
const DB_CONNECTION = require('../database/database.js');
const moment = require('moment');
const Schema = mongoose.Schema;

const FollowUpSchema = new Schema({
	teamRoom: { type: String, required: true },
	description: { type: String, required: true },
	createdAt: { type: Number, default: moment().startOf('date') },
	closedAt: Number,
	status: { type: String, default: 'open' } // open / closed
});
FollowUpSchema.index({ teamRoom: 1 });

FollowUpSchema.statics = {
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

	// updateLoginDetails: function()

	removeById: function(removeData, callback) {
		this.remove(removeData, callback);
	},

	create: function(data, callback) {
		var instance = new this(data);
		instance.save(callback);
	}
};

module.exports = mongoose.model('FollowUp', FollowUpSchema);
