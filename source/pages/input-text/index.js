import UIKit from '../../index.js'

var inputs = [];
$('.uikit-input-text').each(function(){
	var uikitInputText = new UIKit.Core.UIKitInputText($(this));
	inputs.push(uikitInputText);
	
});

inputs[2].indicator.status = false;

$('#checkbox-id-1').on('change', function(){
	if ($(this).is(':checked')){
		inputs[inputs.length - 1].indicator.enabled = true;
	} else {
		inputs[inputs.length - 1].indicator.enabled = false;
	}
});