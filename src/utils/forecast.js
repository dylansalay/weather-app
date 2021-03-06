const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b714abb8138d4378d4de5a5823ce2585&query=${long},${lat}&units=f`

  request({ url, json: true}, (error, { body }) => {
    console.log(body)
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } 
    else if (body.error) {
      callback('Unable to find location', undefined)
    } 
    else {
      let current = body.current
      let weather_desc = current.weather_descriptions.map(desc => `and ${desc.toLowerCase()}`)
      console.log(weather_desc.join())
      callback(undefined, `It is currently ${current.temperature} degrees out ${weather_desc.join()}. It feels like ${current.feelslike} degrees out. The humidity level is ${current.humidity}% and there is a ${current.precip}% chance of rain.`)
    }
  })
}

module.exports = forecast