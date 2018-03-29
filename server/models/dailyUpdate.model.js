'use strict';
const mongoose = require('mongoose');
const DB_CONNECTION = require('../database/database.js');

const Schema = mongoose.Schema;
const DailyUpdateSchema = new Schema({
	createdAt: Number,
	teamRoom: String,
	accountName: { type: String, required: true },
	displayName: String,
	today: String,
	yesterday: String,
	obstacles: String
});
DailyUpdateSchema.index({ createdAt: 1, teamRoom: 1, accountName: 1 }, { unique: true });
// DailyUpdateSchema.set('autoIndex', false); // To imporve performance unset autoIndex

/**
 * Schema STATIC addition which works on entire Model
 */
DailyUpdateSchema.statics = {
	/**
   * Find one uses
   */
	getOne: function(query, callback) {
		this.findOne(query, callback);
	},

	/**
   * Find all users
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
		var company = new this(data);
		company.save(callback);
	}
};

module.exports = mongoose.model('DailyUpdate', DailyUpdateSchema);
