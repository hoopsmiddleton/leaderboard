const mongoose = require('mongoose')
const validator = require('validator')

const teeSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
		trim: true
	},
	par: {
		type: Number
	},
	totalYrds: {
		type: Number,
		min: [0, 'Total yardage must be positive']
	},
	F9Yrds: {
		type: Number,
		min: [0, 'Front nine yardage must be positive']
	},
	B9Yrds: {
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

})

const courseSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
		trim: true
	},
	addr1: {
		type: String,
		trim: true
	},
    addr2: {
        type: String,
		trim: true
    },
	city: {
        type: String,
		trim: true
    },
    state: {
        type: String,
		trim: true
    },
    zip: {
        type: String,
		trim: true
    },
	url: {
		type: String,
		tim: true,
		validate(v) {
			if (!validator.isURL(v)) {
				throw new Error('Invalid URL')
			}
		}
	},
	phone: {
		type: String,
		tim: true
	},
	tees: [teeSchema]

}, {
	timestamps: true
})


const Course = mongoose.model('Course', courseSchema)

module.exports = Course
