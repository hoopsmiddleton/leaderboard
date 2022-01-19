const mongoose = require('mongoose')

// connect to the Mongodb server and the glbdb Golf Leaderboard DB
mongoose.connect('mongodb://127.0.0.1:27017/glbdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
