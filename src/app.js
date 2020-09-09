const express = require('express')
const path = require('path')
const hbs = require('hbs')
const utils = require('./utils.js')
const app = express()

const publicDiretoryPath = path.join(__dirname,'../public')
//set handler bars path
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handler bar view and location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

////http://localhost:3000/
app.use(express.static(publicDiretoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'James Wang'
    })
})
app.get('/help',(req,res)=>{
    // res.send([
    //     {
    //         name:'James',
    //         age:6
    //     },
    //     {
    //         name:'Kevin',
    //         age:42
    //     }
    // ])
    res.render('help',{
        helpText:'How can I help you',
        title: 'Help',
        name:'James'
    })
})

app.get('/about',(req,res)=>{
    //res.send('<h1>About</h1>')
    res.render('about',{
        title:'James',
        name: 'James Wang'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    let address = req.query.address
    utils.geocode(address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        utils.forcast(latitude,longitude,(error,data)=>{
            return res.send({
                address: address,
                forecast: data,
                location,
                error: error
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:404,
    name:'James',
    errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    //res.send("404 page")
    res.render('error',{
        title: '404',
        name:'James',
        errorMessage: 'Page not found'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})

