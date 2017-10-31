import UIKit from '../../index.js'

var btnKit = new UIKit.Core.UIKitButton($('#uikit-button-id'));
var btnKit2 = new UIKit.Core.UIKitButton($('#uikit-button-id-2'));
var btnKit3 = new UIKit.Core.UIKitButton($('#uikit-button-id-3'));
var select = $('#style-select-id');

UIKit.styles.forEach(function(item){
	select.append($('<option>', { 
        value: item,
        text : item 
    }));
});

select.on('change', function(){
	UIKit.style = select.val();
});

btnKit2.style = 'uikit-style-lightred';