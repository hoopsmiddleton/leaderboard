const mongoose = require('mongoose')



const roundSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    tee: {
        type: String
    },
    date: {
        type: String
    },
    roster: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Golfer'
    }],
    groups: [{
        name: String,
        teeTime: String,
        p1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Golfer'
        },
        p2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Golfer'
        },
        p3: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Golfer'
        },
        p4: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Golfer'
        }
    }]
});

const Round = mongoose.model('Round', roundSchema);

module.exports = Round;