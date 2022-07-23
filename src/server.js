import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 5000

app.get('/', (req, res) => {
    res.end('<h1>Hello World Van Quoc</h1>')
})

app.listen(port, hostname), () => [
    console.log(`Hello run ${hostname}:${port}/`)
]