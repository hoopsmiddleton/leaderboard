const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
		trim: true
	},
	addr1: {
		type: String
	},
        addr2: {
                type: String
        },
        city: {
                type: String
        },
        state: {
                type: String
        },
        zip: {
                type: String
        },
	url: {
		type: String
	},
	phone: {
		type: String
	}

}, {
	timestamps: true
})


const Course = mongoose.model('Course', courseSchema)

module.exports = Course
