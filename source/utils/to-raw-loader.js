module.exports = function(source){
	return 'exports.raw = ' + JSON.stringify(source);
}