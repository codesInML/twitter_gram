// configure the environment variables
require('dotenv').config()

// set the port
const PORT = process.env.PORT

// for async errors
import 'express-async-errors'

// bring in the database connection
import db from './models'

// initialize the express app
import express, {Application} from 'express'
const app : Application = express()

// logger
import log from './utils/logger'

// security packages
import helmet from 'helmet'
import cors from 'cors'
const xss = require('xss-clean')
import rateLimit from 'express-rate-limit'

// import middlewares
import Routes from './routes'
import {errorHandlerMiddleware} from './middleware/error-handler'
import {notFound} from './middleware/not-found'
import deserializeUser from './middleware/deserialize-user'

// security middlewares
app.set("trust proxy", 1)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }))

// deserialize user
app.use(deserializeUser)

// app routes
app.use('/api/v1', Routes)

// not found middleware
app.use(notFound)
// error handler middleware
app.use(errorHandlerMiddleware)

// start the express app
const start = async () => {
    try {
        await db.sequelize.authenticate()
        log.info("connected to the database")
        app.listen(PORT, () => log.info(`Server started on port ${process.env.PORT}`))
    } catch (err) {
        log.error("could not connect to the database", err)
        process.exit(1)
    }
}

start()