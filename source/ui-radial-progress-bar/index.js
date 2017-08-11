import './index.styl'

$( document ).ready(function() {
    $('.ui-radial-progress-bar').each(function(){
        var value = $(this).attr('value');
        var item_right = $(this).find('.progress-right');
        var item_left = $(this).find('.progress-left');
        if (value <= 50 && value >= 0){
            value = ((180 / 50) * value);
            item_right.css('transform', 'rotate(' + value + 'deg)');
            item_left.css('transform', 'rotate(180deg)');
        }
        else if (value <= 100 && value > 50 ){
            value = ((180 / 50) * value);
            item_right.css('transform', 'rotate(180deg)');
            item_left.css('transform', 'rotate(' + value + 'deg)');
        }
    });
});