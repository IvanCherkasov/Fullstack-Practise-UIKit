import UIKit from '../../index.js'

var stages1 = new UIKit.Core.UIKitStages($('#uikit-stages-id-1'));
var stages2 = new UIKit.Core.UIKitStages($('#uikit-stages-id-2'));
var stages3 = new UIKit.Core.UIKitStages($('#uikit-stages-id-3'));
var input1 = $('#uikit-stages-input-id-1');
var input2 = $('#uikit-stages-input-id-2');
var select = $('#style-select-id');
var submit1 = $('#uikit-stages-submit-id-1');
var invert1 = $('#uikit-stages-submit-id-2');

input1.on('change', function(){
	if (input1.val()){
		var value = parseInt(input1.val(), 10);
		if (value !== NaN){
			stages1.stage = value;
		}
	}
});

input2.on('change', function(){
	if (input2.val()){
		var value = parseInt(input2.val(), 10);
		if (value !== NaN){
			stages2.stage = value;
		}
	}
});

submit1.on('click', function(){
	if (stages2.type === 'horizontal'){
		stages2.type = 'vertical';
	} else if (stages2.type === 'vertical'){
		stages2.type = 'horizontal';
	}
});

invert1.on('click', function(){
	if (stages2.invert){
		stages2.invert = false;
	} else {
		stages2.invert = true;
	}
});

UIKit.styles.forEach(function(item){
	select.append($('<option>', { 
        value: item,
        text : item 
    }));
});

select.on('change', function(){
	UIKit.style = select.val();
});

stages3.style = 'uikit-style-lightred'