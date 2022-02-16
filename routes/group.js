require('../db/mongoose')

const { Round, Group } = require('../models/round')

const express = require('express')
const r = new express.Router()
const URL = '/leaderboard/api/v1'


r.post(`${URL}/group`, async (req, res) => {

 	try {
		const group = new Group(req.body)
		if (!group) {
			throw new Error("Unable to create a new Group")
		}

	
		await group.save()
		
		res.send(group)
	}
	catch(e) {
		res.status(400).send({errMsg: "Something went wrong", error: e})	
	}
})

module.exports = r
