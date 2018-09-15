var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var secret = require('./controllers/secret');
var approle = require('./controllers/approle');
var eaas = require('./controllers/eaas');
var cors = require('./services/cors');




//Middleware
app.use(bodyParser.json());
app.use(cors);



//Requests
 app.get('/api/secret',secret.get)
 app.get('/api/approle',approle.get)
 app.get('/api/eaas',eaas.get)

//Start the Server
var server = app.listen(5500, function(){
    console.log('listening on port ', server.address().port)
})
