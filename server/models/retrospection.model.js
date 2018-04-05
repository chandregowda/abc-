'use strict';
const mongoose = require('mongoose');
const DB_CONNECTION = require('../database/database.js');

const Schema = mongoose.Schema;
const RetrospectionSchema = new Schema({
	createdAt: Number,
	teamRoom: String,
	accountName: { type: String, required: true },
	right: String,
	wrong: String,
	suggestion: String
});
RetrospectionSchema.index({ createdAt: 1, teamRoom: 1, accountName: 1 }, { unique: true });
// RetrospectionSchema.set('autoIndex', false); // To imporve performance unset autoIndex

/**
 * Schema STATIC addition which works on entire Model
 */
RetrospectionSchema.statics = {
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
		let updateObj = { ...data };
		this.findOneAndUpdate(
			{
				$and: [
					{ accountName: updateObj.accountName },
					{ createdAt: updateObj.createdAt },
					{ teamRoom: updateObj.teamRoom }
				]
			},
			updateObj,
			{
				upsert: true,
				new: true // get the new record by setting it to true
			},
			function(err, model) {
				return callback(err, model);
			}
		);
	}
};

module.exports = mongoose.model('Retrospection', RetrospectionSchema);
