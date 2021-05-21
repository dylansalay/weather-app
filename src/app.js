const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.com
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Dylan Salay'
  })
})

// app.com/about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Dylan Salay'
  })
})

// app.com/help
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Dylan Salay'
  })
})

// app.com/weather
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error){
      return res.send({ error })
    }
    
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
  
      return res.send({  
        location,
        forecast: forecastData,
        address: req.query.address
      })
    })
  })
})

// app.com/weather
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    "products":[]
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Dylan Salay'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Dylan Salay'
  })
})

app.listen(port, () => {
  console.log('server is up on port ' + port)
})