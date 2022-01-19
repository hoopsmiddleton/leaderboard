const mongoose = require('mongoose')

const teeSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
		trim: true
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Course'
	},
	par: {
		type: Number,
	},
	total: {
		type: Number,
	},
	F9: {
		type: Number,
	},
	B9: {
		type: Number,
	},
	slope: {
		type: Number,
	},
	rating: {
		type: Number,
	}

}, {
	timestamps: true
})


const Tee = mongoose.model('Tee', teeSchema)

module.exports = Tee
