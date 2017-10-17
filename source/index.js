import './index.styl'

import UIKit from './uikit/uikit-core/index.js'
import './uikit/uikit-slider/index.js'

var slider = UIKit.Core.UIKitSlider.Get($('#uikit-slider-id'));
/*slider.EventsList.addEvent('slider.valueChanged', function(val){
	console.log('custom callback; value changed: ' + val);
});
slider.value = 10;
slider.value = 18;

var slider2 = UIKit.Core.UIKitSlider.Get($('#uikit-slider-id'));
slider2.value = 5;*/
