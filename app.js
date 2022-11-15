const express = require("express");
const app =express();
const bodyParser = require("body-parser")
const weather = require("openweather-apis")
// const request = require("request")


const port = 3001;

const api_key = "8092bbb7628958debccc69d7a3e9689d";

//middleware
// app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render('index', {temp: null})
})

app.post('/',function(req,res){
    weather.setCity(req.body.city);
    weather.setAPPID(api_key);
    weather.getAllWeather(function(err,temp){
        console.log(temp);
        res.render('index',{temp:temp});
    });
});

// app.post('/',(req,res)=>{
//     let city = req.body.city
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`
    
//     request(url, function(err,res,body){
//         if(err){
//             res.render('main',{weather: null , error:"Error for fetching weather api"})
//         }else{
//             let weather = JSON.parse(body)
//             if(weather.main == undefined){
//                 //res.render('main',{weather: null , error:"Error.. try again"})
//                 console.log(weather)
//                 let weatherText = ` It's ${fTech(weather.main.temp)} degree Celcius Temperature in ${city}`;
//                 res.render('main', {weather : weatherText, error: null})
//             }
//         }
//     })
// })

// function fTech(fahrenheit){
//     var fTemp = fahrenheit;
//     var ftoCel =Math.round((fTemp -32) * 5/9);
//     var message = ftoCel * '\xB0c.';
//     return message;
// }


app.listen(port, () =>{console.log(`Starting server at ${port}`)});



