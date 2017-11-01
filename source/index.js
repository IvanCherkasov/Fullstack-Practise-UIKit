import './index.styl'
import UIKit from './uikit/uikit-core/index.js'

// Slider
import './uikit/uikit-slider/index.js'
import './uikit/uikit-button/index.js'
import './uikit/uikit-radial-progress/index.js'
import './uikit/uikit-arrow-button/index.js'
import './uikit/uikit-stages/index.js'

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


export default UIKit;