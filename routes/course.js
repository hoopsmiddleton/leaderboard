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

r.get('/leaderboard/pairings', (req, res) => {

	res.render("pairings")
})

r.get('/leaderboard/course', async (req, res) => {


	try {
		const course = await Course.find({})
		if (!course) {
			return res.status(404).send()
		}

		res.send(course)

	}
	catch(e) {
		res.status(500).send()	
	}
})

r.get('/leaderboard/scorecard/:id', async (req, res) => {

	const id = req.params.id
	try {
		const course = await Course.findOne({id})
		if (!course) {
			return res.status(404).send()
		}

		res.send(course)

	}
	catch(e) {
		res.status(500).send()	
	}
})

module.exports = r
