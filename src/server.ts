import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import {env} from 'process'

import tasksRoutes from './routes/tasks.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/tasks', tasksRoutes)

const port = +env.PORT! || 3000
app.listen(port, () => {
    console.log("Server is running port: " + port)    
})