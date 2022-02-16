const mongoose = require('mongoose')
const roundSchema = require('./round')
const validator = require('validator')

const eventSchema = new mongoose.Schema({
    name: {
        type: String
    },
    rounds: [roundSchema],
    roster: [{
        gid: mongoose.Schema.Types.ObjectId,
        with: [ mongoose.Schema.Types.ObjectId ]
    }]
})