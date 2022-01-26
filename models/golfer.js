const mongoose = require('mongoose')
const validator = require('validator')

const golferSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate(v) { 
			if (!validator.isStrongPassword(v, {
				minLength: 6,
				minLowercase: 1,
				minUppercase: 1
				})) {
				throw new Error('Password invalid')
			}
		}
	},
	team: {
		type: String,
		required: false
	},
	Hdcp: {
		type: Number,
		required: true
	},
	tokens: [{
		token: {
			type: String,
			required: false
		}
	}]

}, {
	timestamps: true
})


const Golfer = mongoose.model('Golfer', golferSchema)

module.exports = Golfer
