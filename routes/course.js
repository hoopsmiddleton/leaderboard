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
		res.send(course)

	}
	catch(e) {
		res.status(400).send(e)	
	}
})

r.patch('/leaderboard/course/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'addr1', 'addr2', 'city', 'state', 'zip', 'url', 'phone']
	const isValidOp = updates.every((u) => {
		allowedUpdates.includes(u)
	})

	if (!isValidOp) {
		return res.status(400).send({error: 'Invalid updates'})
	}

	const id = req.params.id
	try {
		// const course = await Course.findByIdAndUpdate(id, req.body, {
		// 	new: true, 
		// 	runValidator: true
		// })
		
		// if (!course) {
		// 	return res.status(400).send()
		// }
		// res.send(course)

		// Must use this method to save updates in order to use Mongoose middleware such as hashing passwords
		const course = await Course.findById(id)
		if (!course) {
			return res.status(404).send('Course not found in DB')
		}

		updates.forEach((u) => {
			// Can't use dot notation here since the property being named is dynamic.  So, must use bracket notation
			course[u] = req.body[u]

		})

		// Calling golfer.save() will now run any mongoose middleware define
		await course.save()
		
		if (!course) {
			return res.status(404).send('Error Saving Course')
		}
		res.send(course)
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

r.get('/leaderboard/course/:id', async (req, res) => {

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

r.delete('/leaderboard/course/:id', async (req, res) => {

	const id = req.params.id
	try {
		const course = await Course.findOneAndDelete({_id: id})
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
