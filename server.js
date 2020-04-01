if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expresslayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const ejs = require('ejs')


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expresslayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL , 
    
     { 
        useUnifiedTopology: true,
        useNewUrlParser: true })
       const db = mongoose.connection
       db.on('error', error => Console.error(error))
        db.on('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)


app.listen(process.env.PORT || 3000)