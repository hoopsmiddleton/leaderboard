
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
		res.status(400).send(e)	
	}
})

module.exports = r
