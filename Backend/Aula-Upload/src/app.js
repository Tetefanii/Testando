import express from 'express'
import routes from './routes.js'
import path from 'path'
import {fileURLToPath} from 'url'
import { dirname } from 'path'

const app = express()
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// suas rotas montadas em /api
app.use('/api', routes)

export default app
