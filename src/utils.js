const request = require ('request')
const geocode = (address,callback) => {
    const geocodeURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURI(address)+".json?access_token=pk.eyJ1IjoibGlodWlndW8iLCJhIjoiY2tldGY0OWFuMW92MDJ4bmk1OWJoNGdmZyJ9.Z89ylt7D1ZIS7EhoSjQQTw"
    request({url:geocodeURL, json:true},(error,response)=>{
        if(error){
            callback('geocode unable to connect to location serivces',undefined)
        }else if(response.body.features.length == 0){
            callback('geocode Unable to find location',undefined)
        }else {
           callback(undefined, {
                    latitude: response.body.features[0].center[0],
                    longitude: response.body.features[0].center[1],
                    location: response.body.features[0].place_name
           })
        }
    })
}

const forcast = (latitude, longitude, callback) => {
    const geocodeURL='http://api.weatherstack.com/current?access_key=294878088dda981579a801e065b639bc&query='+latitude+','+longitude
    console.log(geocodeURL)
    request({url:geocodeURL,json: true},(error,response) =>{
        if(error){
            callback('forecast unable to connect to location serivces',undefined)
        }else if(response.body.error){
            callback('forecast Unable to find location',undefined)
        }else{
            const current = response.body.current
            const outString = current.weather_descriptions +". It is currently "+current.temperature+" degrees. There is a " + current.precip +"% chance of raining"   
            console.log(outString)
            callback(undefined,outString)
        }
    })
}

module.exports ={
    geocode: geocode,
    forcast:forcast
}