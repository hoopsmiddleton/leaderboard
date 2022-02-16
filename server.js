const express = require('express')

const app = express()
const golferRouter = require('./routes/golfer');
const courseRouter = require('./routes/course');
const roundRouter = require('./routes/round');
const groupRouter = require('./routes/group');
const bParser = require('body-parser')

const port = process.env.PORT || 3998

app.use(express.json())

app.use(golferRouter)
app.use(courseRouter)

app.use(groupRouter)
app.use(roundRouter)

app.use(bParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.use('/css', express.static(`${__dirname}/public/css`))
app.use('/js', express.static(`${__dirname}/public/js`))
app.set("view engine", "ejs")


app.listen(port, () => {
    console.log(`Server us up on port: ${port}`)
})

// console.log(new Date("2022-02-24T08:00:00"))
//Testing out bcrypt
// const bcrypt = require('bcryptjs')

// const myf = async() => {
// 	const pw = 'abc!123'
// 	const hashpw = await bcrypt.hash(pw, 8)

// 	console.log(`PW: ${pw} and Hash: ${hashpw}`)

// 	const isMatch = await bcrypt.compare('abc!123', hashpw)
// 	console.log(`Is Match: ${isMatch}`)
// }

// const jwt = require('jsonwebtoken')

// const myf = async () => {
//     const token = jwt.sign({_id: '2314234124124'}, 'This is a randomish sentence 234234', {expiresIn: '3 seconds'})

//     const data = jwt.verify(token, 'This is a randomish sentence 234234')
//     console.log(data)
// }

// myf()