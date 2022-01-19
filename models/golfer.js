const mongoose = require('mongoose')

const golferSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
		trim: true
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
