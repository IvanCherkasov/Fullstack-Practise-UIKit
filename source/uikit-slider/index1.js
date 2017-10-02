import './index.styl'

$(document).ready(function (){
	var sliders= [];
	$('.ui-slider').each(function(i) {
		var slider = {
			element: $(this),
			isHover: false,
			isDrag: false,
			maximum: Number($(this).attr('maximum')),
			minimum: Number($(this).attr('minimum')),
			index: i,
			id: $(this).attr('id'),
			thumb: {
				element: $(this).find('.ui-slider-thumb'),
				width: $(this).find('.ui-slider-thumb').width(),
				isHover: false,
				_mouseDown: function(event, parent){
					if (this.isHover){
						parent._initDrag(event, parent);
					}
				}
			},
			track:{
				element: $(this).find('.ui-slider-track'),
				maximum: function(parent){
					return parent.element.find('.ui-slider-track').width() - parent.element.find('.ui-slider-thumb').width();
				},
			},
			_mouseDown: function(event, parent){
				var x = event.pageX - parent.track.element.offset().left;
				var cssleft = Math.round(Math.min(Math.max(0, x - parent.thumb.width/2), parent.track.maximum(parent)));
				if (x >= parent.thumb.width/2 && x <= parent.element.width()-(parent.thumb.width/2)){
					parent.thumb.element.css(
						'left',
						cssleft
					);
				} else {
					var left = parent.thumb.width/2;
					var right = parent.track.element.width() - parent.thumb.width/2;
					var percent = (((x) / (right - parent.thumb.width/2))) * 100;
					var inThumb = ((parent.thumb.width / 100) * percent);
					console.log(inThumb);
				}
			},
			_mouseMove: function(event, parent){

			},
			_initDrag: function(event, parent){
				parent.isDrag = true;
				parent.element.on('mousemove.drag', function(event){
					var x = event.pageX - parent.track.element.offset().left;
					var cssleft = Math.round(Math.min(Math.max(0, x - parent.thumb.width/2), parent.track.maximum(parent)));
					parent.thumb.element.css(
						'left',
						cssleft
					);
					var left = parent.thumb.width/2;
					var right = parent.track.element.width() - parent.thumb.width/2;
					var percent = (((cssleft) / (right - parent.thumb.width/2))) * 100;
					//console.log('left: ' + left + '; right: ' + right + ';');
					var inThumb = ((parent.thumb.width / 100) * percent);
					var inThumbElement = parent.thumb.element.find('.in-thumb');
					inThumbElement.css('left', inThumb);
					//console.log(inThumbElement.offset().left - 10); //10 - margin слева и справа у родителя
				});
				$(document).on('mouseup', function(event){
					parent.isDrag = false;
					parent.element.off('mousemove.drag');
					$(document).off('mouseup');
					if (!parent.thumb.isHover) parent.thumb.element.removeClass('hover');
				});
			},
			_getValue: {

			},
			init: function(){
				var that = this;
				this.thumb.element.on('mousedown', function(event){
					return that.thumb._mouseDown(event, that);
				});
				this.thumb.element.on('mouseenter', function(event){
					that.thumb.isHover = true;
					that.thumb.element.addClass('hover');
				});
				this.thumb.element.on('mouseleave', function(event){
					that.thumb.isHover = false;
					if (!that.isDrag){
						that.thumb.element.removeClass('hover');
					}
				});
				this.element.on('mousedown', function(event){
					return that._mouseDown(event, that);
				});
			}
		}
		slider.init();
		sliders.push(slider);
	});
});