const express = require('express')

const app = express()
const golferRouter = require('./routes/golfer');
const courseRouter = require('./routes/course');

const port = process.env.PORT || 3998

//app.use(logger2)
//app.use(logger1)

app.use(express.json())
app.use(golferRouter)
app.use(courseRouter)
app.set("view engine", "ejs")

//app.get('/leaderboard', (req, res) => {
//	console.log('/leaderboard route')
//	res.render('pairings')
//})

//app.get('/leaderboard/v1/pairings', (req, res) => {
//	res.render('pairings')
//})


app.listen(port, () => {
    console.log(`Server us up on port: ${port}`)
})

function logger1(req, res, next) {
	console.log(req)
	next()
}

function logger2(req, res, next) {
	console.log('Logger2')
	next()
}
