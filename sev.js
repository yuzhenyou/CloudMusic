var https = require('https'); 
var express = require('express');
var request = require('request');
var querystring = require("querystring");
var url = require("url");
var app = express();  
 
//设置跨域访问  
app.get('/content', function(req, res) {
	var urlOption = url.parse(req.url);
	var urls='https://api.imjad.cn/cloudmusic/'+urlOption.search;
	req.pipe(request(urls,function(error,response,body) {})).pipe(res);
});
app.get('/song', function(req, res) {
	var urlOption = url.parse(req.url);
	var urls='https://api.imjad.cn/cloudmusic/'+urlOption.search;
	req.pipe(request(urls,function(error,response,body) {})).pipe(res);
});
app.get('/singer', function(req, res) {
	var urlOption = url.parse(req.url);
	var urls='https://api.imjad.cn/cloudmusic/'+urlOption.search;
	req.pipe(request(urls,function(error,response,body) {})).pipe(res);
});
app.get('/lyric', function(req, res) {
	var urlOption = url.parse(req.url);
	var urls='https://api.imjad.cn/cloudmusic/'+urlOption.search;
	req.pipe(request(urls,function(error,response,body) {})).pipe(res);
});


  
app.listen(8088);  
console.log('Listening on port 8088...'); 