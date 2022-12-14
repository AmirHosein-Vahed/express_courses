// const debug = require('debug')('app:startup')
// const config = require('./config/config')
// const morgan = require('morgan')
// const helmet = require('helmet')
// const logger = require('./middleware/logger')
const coursesRouter  = require('./routes/courses')
const homeRouter = require('./routes/home')
const express = require("express");
const app = express();

// app.set('view engine', 'pug')
// app.set('views', './views') //default

// add json middleware to app
app.use(express.json());
// app.use(express.urlencoded({extended: true}))
// app.use(express.static('public'))
// app.use(helmet())
app.use('/api/courses', coursesRouter)
app.use('/', homeRouter)


// configuration
// console.log('Application Name: ' + config.get('name'))
// console.log('Mail Server: ' + config.get('mail.host'))
// console.log('Mail Password: ' + config.get('mail.password'))

// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'))
//     debug('Morgan enabled...')
// }

// app.use(logger)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
