
require('../db/mongoose')

const Golfer = require('../models/golfer')
const express = require('express')

const r = new express.Router()

r.post('/leaderboard/golfer', async (req, res) => {
	const golfer = new Golfer(req.body)

	try {
		await golfer.save()
		res.send(golfer)

	}
	catch(e) {
		res.status(500).send(e)	
	}
})

r.post('/leaderboard/login', async (req, res) => {
	
	try {
		const golfer = await Golfer.findByCredentials(req.body.email, req.body.password)
		if (!golfer) {
			return res.status(400).send('Invalid login')
		}
		res.send(golfer)
	}
	catch(e) {
		console.log(`Catch: ${e}`)
		res.status(400).send(e)	
	}
})

r.patch('/leaderboard/golfer/:id', async (req, res) => {

	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'team', 'Hdcp']
	var badField = ''
	const isValidOp = updates.every((u) => {
		var isOk = allowedUpdates.includes(u)
		if (!isOk) {
			badField = u
		}
		return isOk
	})

	if (!isValidOp) {
		return res.status(400).send({error: 'Invalid update field: ' + badField})
	}
	const id = req.params.id

	try {
		// Must use this method to save updates in order to use Mongoose middleware such as hashing passwords
		const golfer = await Golfer.findById(id)
		if (!golfer) {
			return res.status(404).send('Golfer not found in DB')
		}

		updates.forEach((u) => {
			// Can't use dot notation here since the property being named is dynamic.  So, must use bracket notation
			golfer[u] = req.body[u]

		})

		// Calling golfer.save() will now run any mongoose middleware define
		await golfer.save()
		
		if (!golfer) {
			return res.status(404).send('Error Saving Golfer')
		}
		res.send(golfer)

		
	}
	catch(e) {
		res.status(400).send({"Msg": "Some error occurred", "Error": e})	
	}
})

r.get('/leaderboard/golferInput', (req, res) => {

		res.render('golferForm')

})

r.get('/leaderboard/golfers', async (req, res) => {

	try {
		const golfers = await Golfer.find({})

		res.send(golfers)
	}
	catch(e) {
		res.status(500).send(e)	
	}
})

r.get('/leaderboard/golfer/:id', async (req, res) => {

	const id = req.params.id
	try {
		const golfer = await Golfer.findOne({_id: id})

		if (!golfer) {
			return res.status(404).send()
		}

		res.send(golfer)
	}
	catch(e) {
		res.status(500).send(e)	
	}
})

r.delete('/leaderboard/golfer/:id', async (req, res) => {

	const id = req.params.id
	try {
		const golfer = await Golfer.findOneAndDelete({_id: id})

		if (!golfer) {
			return res.status(404).send()
		}

		res.send(golfer)
	}
	catch(e) {
		res.status(500).send(e)	
	}
})

module.exports = r
