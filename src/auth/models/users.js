'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')//this was missing
require('dotenv').config()

const users = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
}, { toJSON: { virtuals: true }});

users.virtual('token').get(function () {
	let tokenObject = {
		username: this.username,
	};
	return jwt.sign(tokenObject, process.env.SECRET);
});

users.pre('save', async function () {
	if (this.isModified('password')) {//added
		this.password = await bcrypt.hash(this.password, 5); //this is too extreme so i made it from 10 to 5 and added await
	}
});

//BASIC AUTH
users.statics.authenticateBasic = async function (username, password) {
	const user = await this.findOne({ username });
	const valid = await bcrypt.compare(password, user.password);
	if (valid) {
		return user;
	}
	throw new Error('Invalid user');
};

//BEAR AUTH
users.statics.authenticateWithToken = async function (token) {
	try {
		const parsedToken = jwt.verify(token, process.env.SECRET);
		const user = this.findOne({ username: parsedToken.username });
		
		if (user) {
			return user;
		}
		throw new Error("User not found");
	} catch (e) {
		throw new Errror(e.message);
	}
};
module.exports = mongoose.model('users', users);
