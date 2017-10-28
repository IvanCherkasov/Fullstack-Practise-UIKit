import UIKit from '../../index.js'
var UIKitSlider = UIKit.Core.UIKitSlider;

var sliderHor 	 = 	new UIKitSlider($('#uikit-slider-id'));
var sliderHorhor = 	new UIKitSlider($('#uikit-slider-id-hor'));
var sliderVer 	 = 	new UIKitSlider($('#uikit-slider-id-vertical'));
var sliderVerT 	 = 	new UIKitSlider($('#uikit-slider-id-verticalt'));
var sliderVerTh  = 	new UIKitSlider($('#uikit-slider-id-verticalth'));

$('#slider-change-btn-id').on('click', function(){
	if (sliderVer.type === 'horizontal'){
		sliderVer.type = 'vertical';
	} else if (sliderVer.type === 'vertical'){
		sliderVer.type = 'horizontal';
	}
});