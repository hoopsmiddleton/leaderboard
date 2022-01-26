
require('../db/mongoose')

const Golfer = require('../models/golfer')
const express = require('express')

const r = new express.Router()

r.post('/leaderboard/golfer', async (req, res) => {

	const golfer = new Golfer(req.body)

	try {
		await golfer.save()
		res.send('Added Golfer')

	}
	catch(e) {
		res.status(500).send(e)	
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

module.exports = r
