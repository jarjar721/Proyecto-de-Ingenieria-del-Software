'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({

	email: { type: String, unique: true, lowercase: true },
	username: String,
	password: { type: String, select: false },
	nombre: String,
	avatar: String,

	singupDate: { type: Date, default: Date.now() },
	lastLogin: Date

})

module.exports = mongoose.model('User', UserSchema)

