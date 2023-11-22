const request = require('request')


// const weather = (a, b, callbak) => {

//     const url = 'http://api.weatherstack.com/current?access_key=5d81839cce30bf212a212cb4f5dc84da&query='+ a + ','+ b + '&units=f'

//     request({ url : url, json : true}, (error, response) => {
    
//         if (error) {
//             callbak('Unable to connect with weather service', undefined)
//         } else if (response.body.error) {
//             callbak('Unable to find the location', undefined)
//         } else {
//             callbak(undefined, response.body.current.weather_descriptions + `. It's currently ` + response.body.current.temperature + ' Fahrenheit out. It feels like ' + response.body.current.feelslike + ' Fahrenheit out.')
    
//         }
//     })
// }


const weather = (latitude, longitude, callbak) => {

    const url = 'http://api.weatherstack.com/current?access_key=5d81839cce30bf212a212cb4f5dc84da&query='+ latitude + ','+ longitude + '&units=f'

    request({ url, json : true}, (error, {body}) => {
    
        if (error) {
            callbak('Unable to connect with weather service', undefined)
        } else if (body.error) {
            callbak('Unable to find the location', undefined)
        } else {
            callbak(undefined, body.current.weather_descriptions + `. It's currently ` + body.current.temperature + ' Fahrenheit out. It feels like ' + body.current.feelslike + ' Fahrenheit out.')
    
        }
    })
}

module.exports = weather