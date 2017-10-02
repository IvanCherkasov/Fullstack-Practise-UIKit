import './index.styl'

$(document).ready(function() {

	/*(function($){
		$.fn.uikit = {
			_slider: undefined,
			get slider(){
				console.log($.fn.uikit);
				return this._slider;
			},
			set slider(object){
				this._slider = object;
				Object.defineProperty(this, 'slider', {
					set: undefined
				});
			}
		}
	})(jQuery);
*/
	var sliders = [];
	$('.ui-slider').each(function(i) {
		var slider = {
			element: $(this),
			isHover: false,
			_value: $(this).attr('value'),
			_isDrag: false,
			_xMaximum: 0,
			_thumbWidth: 0,
			setTrigger: function(name, f){
				this.element.on(name, f);
			},
			get xMaximum(){
				return this._xMaximum;
			},
			get isDrag(){
				return this._isDrag;
			},
			set isDrag(val){
				this._isDrag = val;
				this.element.trigger('uikit.slider.isDrag', val);
			},
			get index(){
				return i;
			},
			get id(){
				return this.element.attr('id');
			},
			get maximum(){
				return Number(this.element.attr('maximum'));
			},
			get minimum(){
				return Number(this.element.attr('minimum'));
			},
			get value(){
				return this._value;
			},
			set value(val){
				val = Math.min(Math.max(this.minimum, val), this.maximum);
				this._value = val;
				this.element.attr('value', val);
				this.element.trigger('uikit.slider.valueChanged', val);
			},
			get width(){
				return this.element.width();
			},
			calculate:{
				_: 'proto',
				value: function(x){
					var percent = (x/this.Parent().xMaximum)*100;
					var val =((percent * (this.Parent().maximum-this.Parent().minimum))/100) + this.Parent().minimum;
					return Math.min(Math.max(this.Parent().minimum, Math.round(val)), this.Parent().maximum);
				},
				left: function(value){
					var percent = ((value - this.Parent().minimum) * 100) / (this.Parent().maximum - this.Parent().minimum);
					var left = (percent/100) * (this.Parent().xMaximum);
					return Math.min(Math.max(0, left), this.Parent().xMaximum);
				}
			},
			track: {
				_: 'proto',
				element: $(this).find('.ui-slider-track'),
				get width(){
					return (this.element.width());
				},
				get minimum(){
					return 0;
				},
				get maximum(){
					return this.width - (this.thumb.width);
				},
				thumb: {
					_: 'proto',
					element: $(this).find('.ui-slider-thumb'),
					_isHover: false,
					get isHover(){
						return this._isHover;
					},
					set isHover(val){
						this._isHover = val;
						if (val === true){
							this.element.addClass('hover');
						}else{
							if (!this.Parent().isDrag) this.element.removeClass('hover');
						}
					},
					get width(){
						return (this.element.width());
					},
					_moveTo: {
						_: 'proto',
						pageX: function(pageX){
							var x = pageX - this.Parent(1).element.offset().left;
							this._setLeft(x - this.Parent(0).width/2);
						},
						position: function(position){
							this._setLeft(position);
						},
						_setLeft: function(val){
							var clamped = Math.round(Math.min(Math.max(0, val), this.Parent(1).maximum));
							this.Parent(0).element.css('left', clamped);
						}
					},
					initDrag: function(){
						var that = this;
						this.Parent().isDrag = true;
						$(document).on('mousemove.uikit.slider', function(event){
							that._moveTo.pageX(event.pageX);
							that.Parent().element.trigger('uikit.slider.onDrag');
						});
						$(document).on('mouseup.uikit.slider', function(event){
							$(document).off('mousemove.uikit.slider');
							$(document).off('mouseup.uikit.slider');
							that.Parent().isDrag = false;
						});
					},
					upper:{
						_: 'proto',
						element: $(this).find('.ui-slider-thumb-upper'),
						textElement: $(this).find('.ui-slider-thumb-upper').find('div.no-select'),
						get width(){
							return this.element.width();
						},
						Init: function(){
							var that = this;
							that.Parent().setTrigger('uikit.slider.valueChanged', function(event, val){
								that.textElement.text(val);
							});
						}
					},
					Init: function(){
						var that = this;
						this.Parent()._xMaximum = this.Parent().width - this.width;
						that.element.on('mousedown', function(){
							if (that.isHover){
								that.initDrag();
							}
						});
						that.element.on('mouseenter', function(){
							that.isHover = true;
						});
						that.element.on('mouseleave', function(){
							that.isHover = false;
						});
						that.Parent().setTrigger('uikit.slider.isDrag', function(event, val){
							if (!val && !that.isHover){
								that.element.removeClass('hover');
							}
						});
						that.Parent().setTrigger('uikit.slider.onDrag', function(event){
							var val = that.Parent().calculate.value(parseInt(that.element.css('left')));
							that.Parent().value = val;
						});
						that.Parent().setTrigger('uikit.slider.valueChanged', function(event, val){
							if (!that.Parent().isDrag){
								var left = that.Parent().calculate.left(val);
								that._moveTo.position(left);
							}
						});
						that.Parent().setTrigger('uikit.slider.mousedown', function(event, md_event){
							if (md_event.target !== that.element.get(0)){
								var x = (md_event.pageX - that.Parent(0).element.offset().left) - that.width/2;
								var val = that.Parent().calculate.value(x);
								that.Parent().value = val;
								if (!that.Parent().isDrag){
									that.isHover = true;
									that.initDrag();
								}
							}
						});
					}
				},
				Init: function(){
					var that = this;
					this.element.on('mousedown', function(event){
						that.element.trigger('uikit.slider.mousedown', event);
					});
				}
			},
			rule:{
				_: 'proto',
				element: $(this).find('.ui-slider-rule'),
				get segments(){
					var seg = Number(this.element.attr('segments'));
					if (seg >= 2){
						return seg;
					}
					return 0;
				},
				get _values(){
					var values = [];
					if (this.segments !== 0){
						var crat =((Math.abs(this.Parent().minimum) + Math.abs(this.Parent().maximum)) / (this.segments - 1));
						var buf = this.Parent().minimum;
						for (var i = 0; i < this.segments; i++) {
							values.push(Math.round(buf));
							buf += crat;
						}
					}
					return values;
				},
				Init: function(){
					var that = this;
					if (this.segments !== 0){
						var values = this._values;
						that.element.append($('<span>').text(values[0]));
						that.element.append($('<span>').text(values[values.length - 1]));
						for (var i = 1; i < values.length - 1; i++){
							var span = $('<span>').text(values[i]).css('position', 'absolute').css('width', that.Parent().width - that.Parent().xMaximum);
							that.element.append(span);
							var left = (that.Parent().calculate.left(values[i]));
							span.css('left', Math.round(left) + 'px');
						}
					}
					this.element.find('span').each(function() {
						var item = $(this);
						item.addClass('no-select');
						item.on('click', function(event){
							that.Parent().value = Number(item.text());
						});
					});
				}
			},
			filler:{
				_: 'proto',
				element: $(this).find('.ui-slider-track-fill-left'),
				get width(){
					return this.element.width();
				},
				set width(val){
					this.element.css('width', val + 'px');
				},
				Init: function(){
					var that = this;
					this.Parent().setTrigger('uikit.slider.valueChanged', function(event, val){
						var left = that.Parent().calculate.left(val) + (that.Parent().width - that.Parent().xMaximum)/2;
						that.width = left;
					});
				}
			},
			Init: function(){
				var that = this;
				
				// функция добавляет в каждый прототип у которого есть поле "_" со значением "proto"
				// поле-функцию "Parent(index)" которая позволяет получить родителя по индексу вверх.
				// Так же производит запуск функции Init() если она имеется.
				// рекурсивная
				function AddParent_AndInit(source, array){
					var names = Object.getOwnPropertyNames(source);
					names.forEach(function(name, i){
						var item = source[name];
						if (typeof item !== 'undefined'){
							if (item['_'] === 'proto'){
								var newArray = array.slice();
								newArray.push(source);
								var retArray = newArray.slice().reverse();
								item.Parent = function(index){
									if (typeof index === 'number'){
										return retArray[index];
									} else if (typeof index === 'undefined'){
										return that;
									}
									return 'undefined'
								}
								if (typeof item.Init === 'function') item.Init();
								AddParent_AndInit(item, newArray);
							}
						}
					});
				}
				AddParent_AndInit(that, []);

				this.element.on('dragstart', function(){
					return false;
				});
				this.element.on('selectstart', function(){
					return false;
				});

				this.value = this._value;
				delete this.Init;
				return this;
			}
		}.Init();
		
		sliders.push(slider);	

		document.getElementById('slider-value').onchange = function(){
			var val = Number(this.value);
			if (val + '' !== 'NaN'){
				sliders[0].value = Number(val);
			}
		}
	});
});