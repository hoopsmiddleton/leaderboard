require('../db/mongoose')

const Course = require('../models/course')
const Tee = require('../models/tee')
const Hole = require('../models/hole')
const express = require('express')

const r = new express.Router()

r.post('/leaderboard/hole', async (req, res) => {

	const hole = new Hole(req.body)

	try {
		await hole.save()
		res.send('Added hole')

	}
	catch(e) {
		res.status(400).send(e)	
	}
})

r.post('/leaderboard/tee', async (req, res) => {

	const tee = new Tee(req.body)

	try {
		await tee.save()
		res.send('Added Tee')

	}
	catch(e) {
		res.status(400).send(e)	
	}
})

r.post('/leaderboard/course', async (req, res) => {

	const course = new Course(req.body)

	try {
		await course.save()
		res.send('Added Course')

	}
	catch(e) {
		res.status(400).send(e)	
	}
})

module.exports = r
