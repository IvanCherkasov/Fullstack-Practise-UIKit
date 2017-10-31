import UIKit from '../../index.js'

$('#uikit-arrow-button-id-4').on('click', function(){
	if ($(this).hasClass('disabled') === false){
		alert('arrow-button');
	}
})
var arrowButton1 = new UIKit.Core.UIKitArrowButton($('#uikit-arrow-button-id-1'));
var arrowButton4 = new UIKit.Core.UIKitArrowButton($('#uikit-arrow-button-id-4'));
var checkbox = $('#arrow-button-checkbox-id-4');
var select = $('#style-select-id');

UIKit.styles.forEach(function(item){
	select.append($('<option>', { 
        value: item,
        text : item 
    }));
});

select.on('change', function(){
	UIKit.style = select.val();
});


checkbox.on('change', function(){
	arrowButton4.enabled = checkbox.is(':checked');
});