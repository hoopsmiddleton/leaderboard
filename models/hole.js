const mongoose = require('mongoose')

const holeSchema = new mongoose.Schema({

	tee: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Tee'
	},
	hole: {
		type: Number,
		required: true,
		validate(v) {
			if (v < 1 || v > 18) {
				throw new Error('Invalid hole')
			}
		}
	},
	par: {
		type: Number,
		validate(v) {
			if (v < 1 || v > 18) {
				throw new Error('Invalid hole')
			}
		}
	},
	yards: {
		type: Number,
		min: [0, 'Hole yards must be positive']
	},
	Hdcp: {
		type: Number,
		validate(v) {
			if (v < 1 || v > 18) {
				throw new Error('Invalid hole hdcp')
			}
		}
	},
	image: {
		type: Buffer
	}

}, {
	timestamps: true
})


const Hole = mongoose.model('Hole', holeSchema)

module.exports = Hole
