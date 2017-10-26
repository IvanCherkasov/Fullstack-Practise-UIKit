import './index.styl'

import UIKit from './uikit/uikit-core/index.js'
import './uikit/uikit-slider/index.js'

var sliderHor = new UIKit.Core.UIKitSlider($('#uikit-slider-id'));
var sliderHorhor = new UIKit.Core.UIKitSlider($('#uikit-slider-id-hor'));
var sliderVer = new UIKit.Core.UIKitSlider($('#uikit-slider-id-vertical'));
var sliderVerT = new UIKit.Core.UIKitSlider($('#uikit-slider-id-verticalt'));
var sliderVerTh = new UIKit.Core.UIKitSlider($('#uikit-slider-id-verticalth'));

$('#slider-change-btn-id').on('click', function(){
	if (sliderVer.type === 'horizontal'){
		sliderVer.type = 'vertical';
	} else if (sliderVer.type === 'vertical'){
		sliderVer.type = 'horizontal';
	}
});

//TODO: добавить собственный input для слайдера, который будет вкл/выкл (value сладйра отображается в инпуте и наоборот)
//		придумать куда его впихнуть

//DONE: restyle => rebuild (запоминание начального состояния элемента(this.element))

//TODO: по возможности: переделать систему координат на слайдер. Но учитывать трэк


//DONE: по возможности: EventSystem от модели и EventSystem от сладйре надо объединить в "медиатор". Чтобы он один
//			отвечал за все события внутри системы. Чтобы логирование велось одной строкой. Одна общая функция для обработки
//			событий.

	//DONE: + подписчики получают ссылку на новую модель, и сами берут из неё то что им надо
	//		+ заменить сеттеры в модели на функции setData, getData
	//		+ middleware
	//		+ подписываемые события лучше сделать так: propertyChanged.* (propertyChanged.value)

