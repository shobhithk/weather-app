
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

   res.sendFile(__dirname+"/index.html");
    
})


app.post("/", function(req,res){
    
   
    const query = req.body.cityName;
    const apiKey = "24718d41180a9083ffc0eb7379f18343";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
    const weatherData=(JSON.parse(data));
    
    const temperature = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    
    res.write("<h1>The temperature in "+ query +" is currently" + temperature+" Degree celcius</h1>");
    res.write("<p>The wheather Description is "+weatherDescription+"</p>");
    res.write("<img src=" + imageURL + ">");
    res.send();
    })
})

});









app.listen(3000,function(){
    console.log("server started at port 3000 ");
});