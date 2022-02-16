require('../db/mongoose')

const Round = require('../models/round')

const express = require('express')
const Golfer = require('../models/golfer')

const router = new express.Router()
const URL = '/leaderboard/api/v1'

router.post(`${URL}/round`, async (req, res) => {	

	try {
		const round = new Round(req.body)

		await round.save()
		
		res.send(round)
	}
	catch(e) {
		res.status(400).send( {errMsg: "Unable to create golf round", error: e} )	
	}
})


router.patch('/leaderboard/round/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['title', 'course', 'tee', 'date', 'groups', 'roster', 'url', 'phone']
	const isValidOp = updates.every((u) => {
		allowedUpdates.includes(u)
	})

	if (!isValidOp) {
		return res.status(400).send({error: 'Invalid updates'})
	}

	const id = req.params.id
	try {
		

		// Must use this method to save updates in order to use Mongoose middleware such as hashing passwords
		const round = await round.findById(id)
		if (!round) {
			return res.status(404).send('round not found in DB')
		}

		updates.forEach((u) => {
			// Can't use dot notation here since the property being named is dynamic.  So, must use bracket notation
			round[u] = req.body[u]

		})

		// Updating array collection: db.rounds.update({'groups._id': ObjectId("620b47293ccb8f532142044a")},{"$set": {"groups.$.name": "Group Three"}})
		
		// Calling golfer.save() will now run any mongoose middleware define
		await round.save()
		
		if (!round) {
			return res.status(404).send('Error Saving round')
		}
		res.send(round)
	}
	catch(e) {
		res.status(400).send(e)	
	}
})

router.get('/leaderboard/round', async (req, res) => {

	const round = await Round.find({})
			.populate('course')
			.populate('groups.p1',{password:0,tokens:0})
			.populate('groups.p2',{password:0,tokens:0})
			.populate('groups.p3',{password:0,tokens:0})
			.populate('groups.p4',{password:0,tokens:0})
	res.render("round", {round: round})
})

router.get(`${URL}/rounds`, async (req, res) => {

	try {
		const round = await Round.find({})
			.populate('course')
			.populate('groups.p1',{password:0,tokens:0})
			.populate('groups.p2',{password:0,tokens:0})
			.populate('groups.p3',{password:0,tokens:0})
			.populate('groups.p4',{password:0,tokens:0})
	
		if (!round) {
			return res.status(404).send()
		}
		
		
		res.send(round)

	}
	catch(e) {
		res.status(500).send()	
	}
})

// r.get('/leaderboard/round/:id', async (req, res) => {

// 	const id = req.params.id
// 	try {
// 		const round = await round.findOne({id})
// 		if (!round) {
// 			return res.status(404).send()
// 		}

// 		res.send(round)

// 	}
// 	catch(e) {
// 		res.status(500).send()	
// 	}
// })

// r.delete('/leaderboard/round/:id', async (req, res) => {

// 	const id = req.params.id
// 	try {
// 		const round = await round.findOneAndDelete({_id: id})
// 		if (!round) {
// 			return res.status(404).send()
// 		}

// 		res.send(round)

// 	}
// 	catch(e) {
// 		res.status(500).send()	
// 	}
// })

module.exports = router