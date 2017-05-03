var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var PORT = 8090;
var tokens = require('./config')
var baseUrl = 'http://lolapi.games-cube.com';


// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// all champoions
app.get('/championList', function(req, res) {
	request({
		url: `${baseUrl}/champion`,
		headers: tokens.TOKEN
	}, function(err, response, body) {
		res.send(JSON.parse(body));
	})
});

// week free champions
app.get('/free', function(req, res) {
	request({
		url: `${baseUrl}/free`,
		headers: tokens.TOKEN
	}, function(err, response, body) {
		res.send(JSON.parse(body));
	})
});

// single champion detail
app.get('/champion/:id', function(req, res) {
	var championId = req.params.id;
	request({
		url: `${baseUrl}/GetChampionDetail?champion_id=${championId}`,
		headers: tokens.TOKEN
	}, function(err, response, body) {
		res.send(JSON.parse(body));
	})
});

// ----------------------  // 


// player search     /playerresult?key=
app.get('/playerresult', function(req, res) {
	var key = String(req.query.key);
	request({
		url: `${baseUrl}/UserArea?keyword=${key}`,
		headers: tokens.TOKEN
	}, function(err, response, body) {
		// res.send(JSON.parse(body));
		res.send(JSON.parse(body))
	})
});

// player detail
app.get('/playerDetail/:qquin/:vaid', function(req, res) {
	var qquin = req.params.qquin;
	var vaid = req.params.vaid;
	var result = {};
	request({
		url: `${baseUrl}/UserHotInfo?qquin=${qquin}&vaid=${vaid}`,
		headers: tokens.TOKEN
	}, function(err, response, body) {
		result = JSON.parse(body);
		request({
			url: `${baseUrl}/GetTierQueue?tier=${result.data[0].tier}&queue=${result.data[0].queue}`,
			headers: tokens.TOKEN
		}, function(err, response, body) {
			var data = JSON.parse(body);
			if(data.code == 0) {
				result.data[0].tier = data.data[0].return;
			}
			res.send(result);
		})
	})
});

app.listen(PORT);
console.log('server is running at port:' + PORT);