// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config')

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// This function is getting exported from the sessions config folder. It runs express sessions
require('./config/session.config')(app);

// default value for title local
const capitalized = require('./utils/capitalized')
const projectName = 'ironhack-backend-project'

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`

// 👇 Start handling routes here
//  Handling home root
const index = require('./routes/index.routes')
app.use('/', index)

// Handling authentication routes
const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

// Handling general plants routes
const plantRoutes = require('./routes/plant.routes')
app.use('/plant', plantRoutes)

// Handling user plants routes
const userPlantRoutes = require('./routes/userPlant.routes')
app.use('/userPlant', userPlantRoutes)
// Handling user routes
const userRoutes = require('./routes/user.routes')
app.use('/user-profile', userRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
