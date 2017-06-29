var map = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-";
var base  = map.length; //64

function shorten(link) {
	var short_link = "";
	while(link) {
		var r = link % base;
		link = Math.floor(link/base);
		short_link = map[r].toString() + short_link;
	}
	return short_link;
}

function lengthen(link) {
	var long_link = 0;
	while(link) {
		var ind = map.indexOf(link[0]);
		var p = link.length - 1;
		long_link += ind * (Math.pow(base,p));
		link = link.substring(1);
	}
	return	long_link;
}

module.exports.shorten = shorten;
module.exports.lengthen = lengthen;