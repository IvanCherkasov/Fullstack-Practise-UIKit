import './index.styl'
import UIKit from '../uikit-core/index.js'
import UIKitStages_Track from './uikit-stages-track/index.js'

class UIKitStages extends UIKit.Core.UIKitElement{
	constructor(dom){
		super(dom);
		if (!this.element.hasClass('uikit-stages')){
			throw new ReferenceError('Элемент не является stages');
		}
		var that = this;

		this.Invert = false;
		if (this.element.attr('invert') !== undefined){
			if (this.element.attr('invert') !== ''){
				var isTrueSet = (this.element.attr('invert') === 'true');
				if (isTrueSet){
					this.Invert = true;
				}
			}
		}

		this.Type = 'horizontal';
		this.TypesList = ['horizontal', 'vertical'];
		var that = this;
		if (this.element.attr('type') !== undefined){
			if (this.element.attr('type') !== ''){
				if (this.TypesList.includes(this.element.attr('type'))){
					this.Type = this.element.attr('type');
				}
			}
		}

		this._init();
	}

	_init(){
		var that = this;
		this.Model = new UIKitStages_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model);
		var stages = Number(this.element.attr('stages'));
		this.Mediator.setData('model.stages', stages);
		var stage = Number(this.element.attr('stage'));
		
		if (stage < 1) {
			stage = 1;
		}

		if (stage >= stages){
			stage = stages;
		}

		this.Mediator.subscribe('model.stage', function(modelData){
			that.element.attr('stage', modelData.stage);
		});

		this.Mediator.subscribe('model.stages', function(modelData){
			that.element.attr('stages', modelData.stages);
		});

		this.Track = new UIKitStages_Track(
			this.element.find('.uikit-stages-track'),
			this.Mediator,
			this.Type,
			this.Invert
			);		

		setTimeout(function(){
			that.Mediator.setData('model.stage', stage);
		}, 0);

		this.element.on('dragstart', function(){
			return false;
		});
		
		this.element.on('selectstart', function(){
			return false;
		});

		that.acceptType(this.Type);
	}

	get stage(){
		return this.Mediator.getData('model.stage');
	}

	set stage(value){
		if (typeof value === 'number'){
			this.Mediator.setData('model.stage', value);
		}
	}

	get invert(){
		return this.Invert;
	}

	set invert(value){
		if (this.Type === 'vertical'){
			if (typeof value === 'boolean'){
				this.Invert = value;
				this.rebuild();
			}
		}
	}
}

class UIKitStages_Model extends UIKit.Core.UIKitModel{
	constructor(){
		super({
			_stages: 0,
			_stage: 0,
			get stages(){
				return this._stages;
			},
			get stage(){
				return this._stage;
			}
		});
		var that = this;
	}

	getData(property){
		switch(property){
			case 'stages':
				return this.Data.stages;
			case 'stage':
				return this.Data.stage;
			default:
				return undefined;
		}
	}

	setData(property, data){
		switch(property){
			case 'stages':
				if (data < 1) data = 1;
				this.Data._stages = data;
				return true;
			case 'stage':
				data = UIKit.Core.UIKitMath.Clamp(data, 0, this.Data.stages);
				this.Data._stage = data;
				return true;
			default:
				return false;
		}
	}
}

UIKit.Core.UIKitStages = UIKitStages;