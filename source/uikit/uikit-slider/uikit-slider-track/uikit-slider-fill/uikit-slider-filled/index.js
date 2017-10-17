import './index.styl'
import UIKit from '../../../../uikit-core/index.js'

class UIKitSlider_Filled extends UIKit.Core.UIKitElement{
	constructor(dom, model){
		super(dom, model);
		var that = this;
		this.Model.TrackFilled.element = this.element;

		var Clamp = UIKit.Core.UIKitMath.Clamp;

		var moveFilled = function(position){
			position = position - (that.Model.Thumb.width/3);
			var percent = (100/that.Model.Track.width) * position;
			that.Model.TrackFilled.element.css('width', Clamp(percent, 0, 100) + '%');
		}

		this.Model.subscribeTo('slider.track.position', function(position){
			moveFilled(position);
		});
	}
}

export default UIKitSlider_Filled;