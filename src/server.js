import express from 'express'
import { connectDB } from './config/mongoDB.js'
import { env } from './config/environtment.js'


const app = express()


connectDB().catch(console.log)

app.get('/', (req, res) => {
    res.end('<h1>Hello World Van Quoc</h1>')
})

app.listen(env.POST, env.HOST), () => [
    console.log(`Hello run ${env.HOST}:${env.POST}/`)
]