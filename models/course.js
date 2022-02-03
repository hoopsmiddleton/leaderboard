const mongoose = require('mongoose')
const validator = require('validator')

const Tee = require('./tee')

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
	}

}, {
	timestamps: true
})


courseSchema.virtual('tees', {
	ref: 'Tee',
	localField: '_id',
	foreignField: 'course'
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
