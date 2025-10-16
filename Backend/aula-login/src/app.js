import express from 'express'
import routers from './routes.js'

const app = express()
app.use(express.json())
//app.use('/api', router)

export default app