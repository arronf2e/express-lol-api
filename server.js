var express = require('express');
var app = express();
var cors = require('cors');
var axios = require('axios');
var PORT = 9999;
var tokens = require('./config');
var baseUrl = 'http://lolapi.games-cube.com';
var videoBase = 'http://infoapi.games-cube.com'
var normalToken = { headers: tokens.TOKEN };
var videoToken = { headers: tokens.VIDEOTOKEN };

// cors
app.use(cors());

// all champoions
app.get('/championList', async (req, res) => {
	try {
		let url = `${baseUrl}/champion`;
		let response = await axios.get(url, normalToken);
		let data = response.data;
		res.send(data);
	} catch (e) {
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
	} catch (e) {
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
	} catch (e) {
		res.send(e);
	}
});

// ----------------------  // 


// player search     /playerresult?key=   这边有个中文乱码的问题
app.get('/playerresult', async (req, res) => {
	try {
		let key = encodeURI(req.query.key);
		let url = `${baseUrl}/UserArea?keyword=${key}`;
		let response = await axios.get(url, normalToken);
		let data = response.data;
		res.send(data);
	} catch (e) {
		res.send(e);
	}
});

// player detail
app.get('/playerDetail/:qquin/:vaid', async (req, res) => {
	try {
		let qquin = req.params.qquin;
		let vaid = req.params.vaid;
		var result = {};
		console.log('haha')
		let url = `${baseUrl}/UserHotInfo?qquin=${qquin}&vaid=${vaid}`;
		let response = await axios.get(url, normalToken);
		let resdata = response.data;
		result = resdata;
		url = `${baseUrl}/GetTierQueue?tier=${result.data[0].tier}&queue=${result.data[0].queue}`;
		response = await axios.get(url, normalToken);
		resdata = response.data;
		result.data[0].tier = resdata.data[0].return;
		url = `${baseUrl}/UserExtInfo?qquin=${qquin}&vaid=${vaid}`;
		response = await axios.get(url, normalToken);
		resdata = response.data;
		result.data[0].tripleKills = resdata.data[1].triple_kills;
		result.data[0].quadraKills = resdata.data[1].quadra_kills;
		result.data[0].pentaKills = resdata.data[1].penta_kills;
		result.data[0].godlikeNum = resdata.data[1].god_like_num;
		result.data[0].killsTotal = resdata.data[1].kills_total;
		result.data[0].totalMvps = resdata.data[2].total_match_mvps + resdata.data[2].total_rank_mvps;
		res.send(result);
	} catch (e) {
		console.log(e);
	}
});

// combat_list
app.get('/combatList/:qquin/:vaid/:p', async (req, res) => {
	try {
		let qquin = req.params.qquin;
		let vaid = req.params.vaid;
		let p = req.params.p;
		let url = `${baseUrl}/CombatList?qquin=${qquin}&vaid=${vaid}&p=${p}`;
		let response = await axios.get(url, normalToken);
		let data = response.data;
		res.send(data);
	} catch (e) {
		res.send(e);
	}
});

// single combat detail
app.get('/combatDetail/:qquin/:vaid/:gameid', async (req, res) => {
	try {
		let qquin = req.params.qquin;
		let vaid = req.params.vaid;
		let gameid = req.params.gameid;
		let url = `${baseUrl}/GameDetail?qquin=${qquin}&vaid=${vaid}&gameid=${gameid}`;
		let response = await axios.get(url, normalToken);
		let data = response.data;
		res.send(data);
	} catch (e) {
		res.send(e);
	}
});


// ----------------------  // 
// authors list
app.get('/videoauthors', async (req, res) => {
	try {
		let url = `${videoBase}/GetAuthors`;
		let response = await axios.get(url, videoToken);
		let data = response.data;
		res.send(data);
	} catch (e) {
		res.send(e);
	}
})

// single author videos list
app.get('/author/videos/:authorid/:p', async (req, res) => {
	try {
		let authorid = req.params.authorid;
		let p = req.params.p;
		let url = `${videoBase}/GetAuthorVideos?author=${authorid}&p=${p}`;
		let response = await axios.get(url, videoToken);
		let data = response.data;
		res.send(data);
	} catch (e) {
		res.send(e);
	}
})

// newst videos list
app.get('/getNewstVideos/:p', async (req, res) => {
	try {
		let p = req.params.p;
		let url = `${videoBase}/GetNewstVideos?p=${p}`;
		let response = await axios.get(url, videoToken);
		let data = response.data;
		res.send(data);
	} catch (e) {
		res.send(e);
	}
})

// single champion videos list
app.get('/champion/videos/:championid/:p', async (req, res) => {
	try {
		let championid = req.params.championid;
		let p = req.params.p;
		let url = `${videoBase}/GetHeroVideoshero=${championid}&p=${p}`;
		let response = await axios.get(url, videoToken);
		let data = response.data;
		res.send(data);
	} catch (e) {
		res.send(e);
	}
})

// find videos   搜索结果为空
app.get('/findVideos/:keyword/:p', async (req, res) => {
	try {
		let keyword = encodeURI(req.params.keyword);
		let p = req.params.p;
		let url = `${videoBase}/FindVideos?keyword=${keyword}&p=${p}`;
		let response = await axios.get(url, videoToken);
		let data = response.data;
		res.send(data);
	} catch (e) {
		res.send(e);
	}
})

app.listen(PORT);
console.log('server is running at port:' + PORT);