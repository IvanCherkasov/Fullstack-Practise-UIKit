import UIKit from '../../index.js'

var progressBar1 = new UIKit.Core.UIKitRadialProgress($('#uikit-radial-progress-id-1'));
var progressBar2 = new UIKit.Core.UIKitRadialProgress($('#uikit-radial-progress-id-2'));
var progressBar3 = new UIKit.Core.UIKitRadialProgress($('#uikit-radial-progress-id-3'));
var select = $('#radial-progress-id-1');
var input = $('#radial-progress-input');

UIKit.styles.forEach(function(item){
	select.append($('<option>', { 
        value: item,
        text : item 
    }));
});

select.on('change', function(){
	UIKit.style = select.val();
});

input.on('change', function(){
	if (input.val()){
		var val = parseInt(input.val(), 10);
		if (val !== NaN){
			if (val !== progressBar1.value){
				progressBar1.value = val;
			}
		}
	}
});

progressBar2.style = 'uikit-style-lightred';