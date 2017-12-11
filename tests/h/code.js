const div = $('<div>').html('hello');
const clickme = $('<div>').html('click me');
clickme .on('click', function(){
	div.html('world');
});
$('body').append(div);
$('body').append(clickme );