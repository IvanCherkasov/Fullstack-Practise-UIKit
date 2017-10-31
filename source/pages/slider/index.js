import UIKit from '../../index.js'
var UIKitSlider = UIKit.Core.UIKitSlider;

var sliderHor 	 = 	new UIKitSlider($('#uikit-slider-id'));
var sliderHorhor = 	new UIKitSlider($('#uikit-slider-id-hor'));
var sliderVer 	 = 	new UIKitSlider($('#uikit-slider-id-vertical'));
var sliderVerT 	 = 	new UIKitSlider($('#uikit-slider-id-verticalt'));
var sliderVerTh  = 	new UIKitSlider($('#uikit-slider-id-verticalth'));
var select = $('#slider-styles-id');

$('#slider-change-btn-id').on('click', function(){
	if (sliderVer.type === 'horizontal'){
		sliderVer.type = 'vertical';
	} else if (sliderVer.type === 'vertical'){
		sliderVer.type = 'horizontal';
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

sliderHorhor.style = 'uikit-style-lightred';