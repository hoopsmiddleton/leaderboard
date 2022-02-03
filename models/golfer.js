const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const golferSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(v) {
			if (!validator.isEmail(v)) {
				throw new Error('Not a valid email')
			}
		}
	},
	password: {
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

// Find Golfer with
golferSchema.statics.findByCredentials = async (email, password) => {
	
	const golfer = await Golfer.findOne({email: email})
	console.log(golfer)
	if (!golfer) {
		throw new Error('Unable to find Golfer')
	}
	
	const isMatch = await bcrypt.compare(password, golfer.password)
	
	if (!isMatch) {
		console.log(`isMatch: ${isMatch}`)
		throw new Error('Unable to find Golfer')
	}

	return golfer
}

// Mongoose middleware that will run pre (before) 'save'
// This middleware will hash the password and store as one-way hash instead of plain text.
golferSchema.pre('save', async function(next) {
	const golfer = this

	if (golfer.isModified('password')) {
		golfer.password = await bcrypt.hash(golfer.password, 8)
	}

	next()
})

const Golfer = mongoose.model('Golfer', golferSchema)

module.exports = Golfer
