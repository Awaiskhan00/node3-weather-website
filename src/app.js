const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('./utils/weather')
const { error } = require('console')

const app = express()

// Define Paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup Static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Awais Khan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Awais Khan'
    })    
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        name : 'Awais Khan',
        helptext : 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error : 'You must provide an address term'
        })
    }
  
    weather(25.3548, 51.1839, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast : forecastData,
            location : req.query.address
        })
    })
})

app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Awais khan',
        errorMessage : 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Awais khan',
        errorMessage : 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})