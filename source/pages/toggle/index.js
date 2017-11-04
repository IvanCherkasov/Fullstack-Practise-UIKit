import UIKit from '../../index.js'

var toggle1 = new UIKit.Core.UIKitToggle($('#uikit-toggle-id-1'));
var toggle2 = new UIKit.Core.UIKitToggle($('#uikit-toggle-id-2'));
var toggle3 = new UIKit.Core.UIKitToggle($('#uikit-toggle-id-3'));
var toggle4 = new UIKit.Core.UIKitToggle($('#uikit-toggle-id-4'));

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