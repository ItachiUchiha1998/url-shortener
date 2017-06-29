var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CounterSchema = new Schema({ // Create counter collection 
	_id : String,
	seq : {type:Number,default:0}
});

var counter = mongoose.model('counter',CounterSchema);

var urlSchema = new Schema({ // collection for links
	_id : {type:Number,index:true},
	long_url : String,
	created : Date
});	

urlSchema.pre('save',function(next) {
	var doc = this;
	counter.findByIdAndUpdate({_id:'url_count'},{$inc:{seq:1}},function(err,counter){
		if (err) {
			return next(err);
		}
		doc._id = counter.seq;
		doc.created_at = new Date();
		next();
	});
});

var Url = mongoose.model('Url', urlSchema);
module.exports = Url;

