import './index.styl'

import UIKit from './uikit/uikit-core/index.js'
import './uikit/uikit-slider/index.js'

var sliderHor = UIKit.Core.UIKitSlider.Get($('#uikit-slider-id'));
var sliderHorhor = UIKit.Core.UIKitSlider.Get($('#uikit-slider-id-hor'));
var sliderVer = UIKit.Core.UIKitSlider.Get($('#uikit-slider-id-vertical'));
var sliderVerT = UIKit.Core.UIKitSlider.Get($('#uikit-slider-id-verticalt'));
var sliderVerTh = UIKit.Core.UIKitSlider.Get($('#uikit-slider-id-verticalth'));
/*slider.EventsList.addEvent('slider.valueChanged', function(val){
	console.log('custom callback; value changed: ' + val);
});
slider.value = 10;
slider.value = 18;

var slider2 = UIKit.Core.UIKitSlider.Get($('#uikit-slider-id'));
slider2.value = 5;*/