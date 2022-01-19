const mongoose = require('mongoose')

const holeSchema = new mongoose.Schema({

	tee: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Tee'
	},
	hole: {
		type: Number,
		required: true
	},
	par: {
		type: Number,
	},
	yards: {
		type: Number,
	},
	Hdcp: {
		type: Number,
	},

}, {
	timestamps: true
})


const Hole = mongoose.model('Hole', holeSchema)

module.exports = Hole
