var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var PORT = 8090;
var tokens = require('./config')

app.get('/championList', function(req, res) {
	request({
		url: `${baseUrl}/champion`,
		headers: tokens.TOKEN
	}, function(err, response, body) {
		res.send(JSON.parse(body));
	})
});

app.listen(PORT);
console.log('server is running at port:' + PORT);