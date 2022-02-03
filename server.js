const express = require('express')

const app = express()
const golferRouter = require('./routes/golfer');
const courseRouter = require('./routes/course');

const port = process.env.PORT || 3998

app.use(express.json())

app.use(golferRouter)
app.use(courseRouter)

app.set("view engine", "ejs")


app.listen(port, () => {
    console.log(`Server us up on port: ${port}`)
})

// Testing out bcrypt
// const bcrypt = require('bcryptjs')

// const myf = async() => {
// 	const pw = 'abc!123'
// 	const hashpw = await bcrypt.hash(pw, 8)

// 	console.log(`PW: ${pw} and Hash: ${hashpw}`)

// 	const isMatch = await bcrypt.compare('abc!123', hashpw)
// 	console.log(`Is Match: ${isMatch}`)
// }

// myf()