'use strict';
const mongoose = require('mongoose');
const DB_CONNECTION = require('../database/database.js');

const Schema = mongoose.Schema;
const DailyUpdateSchema = new Schema({
	createdAt: Number,
	displayName: String,
	obstacles: String,
	teamRoom: String,
	today: String,
	userId: Number,
	yesterday: String
});

DailyUpdateSchema.index({ firstname: 1, dob: -1 }); // schema level
DailyUpdateSchema.set('autoIndex', false); // To imporve performance unset autoIndex

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
