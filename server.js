var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var Url = require('./model/db');
var host = "http://localhost:3000/";

var app = express();

mongoose.connect('mongodb://localhost/url-short');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var urlshortener = require('./urlshortener.js');

app.get('/',function(req,res) {
	res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.post('/api/urlshort',function(req,res) {
	//////////////////////////////
	var longUrl = req.body.url ;
	var shortUrl = "";
	Url.findOne({long_url : longUrl} ,function(err,data) {
		if(data) {
			shortUrl = host + urlshortener.shorten(data._id);
			res.send({'shortUrl' : shortUrl});
		} else {
			 var newUrl = Url({
        		long_url: longUrl
      		});
			 newUrl.save(function(err) {
			 	if (err) { console.log(err);}
			 	shortUrl = host + urlshortener.shorten(newUrl._id);
			 	//shortUrl = "check this shit"
			 	res.send({'shortUrl': shortUrl});
			 })
		}
	});


});

app.get('/:encoded_id',function(req,res) {
	var getId = req.params.encoded_id ;
	var id = urlshortener.lengthen(getId);

	Url.findOne({_id:id},function(err,data){
		if(data){
			res.redirect(data.long_url);
		} else {
			res.redirect(host); ///////
		}
	})
});

app.listen('3000',function() {
	console.log("Listening to 3000");
});