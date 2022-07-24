import express from 'express'
import { connectDB } from './config/mongoDB.js'
import { env } from './config/environtment.js'


connectDB()
    .then(() => console.log('Connected successfuly to database server!'))
    .then(() => bootServer())
    .catch( error => {
        console.error(error)
        process.exit(1)
    })

const bootServer = () => {
    
    const app = express()

    app.get('/', (req, res) => {
        res.end('<h1>Hello World Van Quoc</h1>')
    })
    
    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello run ${env.APP_HOST}:${env.APP_PORT}/`)
    })

}
