import './index.styl'

$( document ).ready(function() {
    $('.ui-button').click(function(e){
        var offset = $(this).offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
        var effectDiv = $(this).find('#ui-effect');
        effectDiv.removeClass("animate");
        var size = Math.max($(this).parent().outerWidth(), $(this).parent().outerHeight());
        $(this).find(effectDiv).css("top", y - size/2).css("left", x  - size/2).css("width", size).css("height", size);
        effectDiv.addClass("animate");
    });
});