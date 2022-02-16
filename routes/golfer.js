
require('../db/mongoose')

const Golfer = require('../models/golfer')
const express = require('express')
const { send } = require('express/lib/response')
const URL = '/leaderboard/api/v1'

const r = new express.Router()

// Add a new golfer
r.post(`${URL}/golfer`, async (req, res) => {
	
	const golfer = new Golfer(req.body)
	
	if (!golfer) {
		res.status(500).send( {'errMsg': 'Unable to add golfer - 11'} )
	}

	try {
		await golfer.save()
		
		// const golfer = await Golfer.findByCredentials(req.body.email, req.body.password)
		
		const token = await golfer.genAuthToken()
	
		res.status(202).send( {golfer, token} )

	}
	catch(e) {
		res.status(500).send({"errMsg": 'Failed to add golfer', 'error': e})	
	}
})

r.post(`${URL}/roster`, async (req, res) => {
	
	const roster = req.body

	try {

		const roster1 = await Golfer.collection.insertMany(roster)
		
		if (!roster1) {
			return res.status(500).send( {'errMsg': 'Unable to add roster golfers'} )
		}		
	
	} catch(e) {
			return res.status(500).send({'errMsg': 'Failed to add roster', 'error': e})	
	}
	res.status(202).send(roster)
})

r.post(`${URL}/login`, async (req, res) => {
	
	try {
		const golfer = await Golfer.findByCredentials(req.body.email, req.body.password)
		const token = await golfer.genAuthToken()
		if (!golfer) {
			return res.status(400).send('Invalid login')
		}
		res.send({golfer, token})
	}
	catch(e) {
		res.status(400).send(e)	
	}
})

r.patch(`${URL}/golfer/:id`, async (req, res) => {

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

r.get(`${URL}/golferInput`, (req, res) => {

		res.render('golferForm')

})

r.get('/leaderboard/golfers', (req, res) => {
	res.render('golfers')
})

r.get('/leaderboard/pairings', (req, res) => {
	res.render('pairings')
})

r.get(`${URL}/golfers`, async (req, res) => {

	try {
		const golfers = await Golfer.find({},{password:0, tokens:0}).sort({team:1})

		res.send(golfers)
	}
	catch(e) {
		res.status(500).send(e)
	}
})

r.get(`${URL}/golfer/:id`, async (req, res) => {

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

r.delete(`${URL}/golfer/:id`, async (req, res) => {

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
