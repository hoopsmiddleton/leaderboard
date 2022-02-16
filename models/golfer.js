const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const golferSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
		trim: true
	},
	alias: {
		type: String,
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

golferSchema.methods.genAuthToken = async function () {
	const golfer = this
	const token = jwt.sign( {_id: golfer._id.toString() }, 'thisismyfirstapptousejwt', {expiresIn: '1 day'})

	// Storing a user's login token per device/browser.  To logout the token will need to be removed.
	golfer.tokens = golfer.tokens.concat({token: token})
	await golfer.save()

	return token
} 

// Find Golfer with
golferSchema.statics.findByCredentials = async (email, password) => {
	
	const golfer = await Golfer.findOne({email: email})
	
	if (!golfer) {
		throw new Error('Unable to find Golfer')
	}
	
	const isMatch = await bcrypt.compare(password, golfer.password)
	
	if (!isMatch) {
		
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
