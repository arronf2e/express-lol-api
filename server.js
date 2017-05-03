var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var axios = require('axios');
var PORT = 8090;
var tokens = require('./config')
var baseUrl = 'http://lolapi.games-cube.com';
var normalToken = {headers: tokens.TOKEN};

// cors
app.use(cors());

// all champoions
app.get('/championList', async (req, res) => {
	try {
		let url = `${baseUrl}/champion`;
		let response = await axios.get(url, normalToken);
		let data = response.data;
		res.send(data);
	}catch(e) {
		res.send(e);
	}
});

// week free champions
app.get('/free', async (req, res) => {
	try {
		let url = `${baseUrl}/free`;
		let response = await axios.get(url, normalToken);
		let data = response.data;
		res.send(data);
	}catch(e) {
		res.send(e);
	}
});

// single champion detail
app.get('/champion/:id', async (req, res) => {
	try {
		let championId = req.params.id;
		let url = `${baseUrl}/GetChampionDetail?champion_id=${championId}`;
		let response = await axios.get(url, normalToken);
		let data = response.data;
		res.send(data);
	}catch(e) {
		res.send(e);
	}
});

// ----------------------  // 


// player search     /playerresult?key=   这边有个中文乱码的问题
app.get('/playerresult', async (req, res) => {
	try {
		let key = String(req.query.key);
		let url = `${baseUrl}/UserArea?keyword=${key}`;
		let response = await axios.get(url, normalToken);
		let data = response.data;
		res.send(data);
	}catch(e) {
		res.send(e);
	}
});

// player detail
app.get('/playerDetail/:qquin/:vaid', async (req, res) => {
	try {
		// let qquin = req.params.qquin;
		// let vaid = req.params.vaid;
		var result = {};
		console.log('haha')
		res.send({name: 'arron'});
		console.log('bbb')

		// let url = `${baseUrl}/UserHotInfo?qquin=${qquin}&vaid=${vaid}`;
		// let response = await axios.get(url, normalToken);
		// let resdata = response.data;
		// result = resdata;
		
		// console.log(result.data[0].tier, 'hhhhh')
		// url = `${baseUrl}/GetTierQueue?tier=${result.data[0].tier}&queue=${result.data[0].queue}`;
		// response = await axios.get(url, normalToken);
		// data = response.data;
		// result.data[0].tier = data.data[0].return;
		// url = `${baseUrl}/UserExtInfo?qquin=${qquin}&vaid=${vaid}`;
		// response = await axios.get(url, normalToken);
		// data = response.data;
		// result.data[0].tripleKills = data[1].triple_kills;
		// result.data[0].quadraKills = data[1].quadra_kills;
		// result.data[0].pentaKills = data[1].penta_kills;
		// result.data[0].godlikeNum = data[1].god_like_num;
		// result.data[0].killsTotal = data[1].kills_total;
		// result.data[0].totalMvps = data[2].total_match_mvps + data[2].total_rank_mvps;
		// res.send(result);
	}catch(e) {
		console.log(e);
	}
});

// combat_list
app.get('/combatList/:qquin/:vaid/:p', function(req, res) {
	var qquin = req.params.qquin;
	var vaid = req.params.vaid;
	var p = req.params.p;
	request({
		url: `${baseUrl}/CombatList?qquin=${qquin}&vaid=${vaid}&p=${p}`,
		headers: tokens.TOKEN
	}, function(err, response, body) {
		res.send(JSON.parse(body));
	})
});

app.listen(PORT);
console.log('server is running at port:' + PORT);