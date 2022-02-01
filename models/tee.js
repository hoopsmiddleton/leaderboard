const mongoose = require('mongoose')
const Hole = require('mongoose')

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
		validate(v) {
			if (v < 3 || v > 5) {
				throw new Error('Par must be 3, 4 or 5')
			}
		}
	},
	total: {
		type: Number,
		min: [0, 'Total yardage must be positive']
	},
	F9: {
		type: Number,
		min: [0, 'Front nine yardage must be positive']
	},
	B9: {
		type: Number,
		min: [0, 'Back nine yardage must be positive']
	},
	slope: {
		type: Number,
		min: [0, 'Course Slope must be positive']
	},
	rating: {
		type: Number,
		min: [0, 'Course Rating must be positive']
	}

}, {
	timestamps: true
})


teeSchema.virtual('holes', {
	ref: 'Hole',
	localField: '_id',
	foreignField: 'hole'
})

const Tee = mongoose.model('Tee', teeSchema)

// Export Tee
module.exports = Tee
