const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 5000;
const ip = process.env.IP;

//set up the view engine to render ejs
app.set("view engine", "ejs");


//create a route for the search page
app.get('/',function(req,res){
    res.render('search');
});

//create route for the results page
app.get('/results',function(req,res){
 var searchquery = req.query.search;
 const key = '&apikey=thewdb';
 var url = "http://www.omdbapi.com/?s="+searchquery+key;
 request(url,function(error,response,body){
    if(!error && response.statusCode ==200){
        var data = JSON.parse(body);
        res.render('results',{data:data});
    } 
 });
});

app.listen(port,ip,function(){
   console.log("The server is running on port :"+port);
});