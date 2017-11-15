import UIKit from '../../uikit/bundle.ts';

$('#uikit-arrow-button-id-4').on('click', () => {
    if ($(this).hasClass('disabled') === false) {
        alert('arrow-button');
    }
})
let arrowButton1 = new UIKit.UIKitArrowButton($('#uikit-arrow-button-id-1'));
let arrowButton4 = new UIKit.UIKitArrowButton($('#uikit-arrow-button-id-4'));
let checkbox = $('#arrow-button-checkbox-id-4');
let select = $('#style-select-id');

/*UIKit.styles.forEach(function(item){
    select.append($('<option>', {
        value: item,
        text : item
    }));
});

select.on('change', function(){
    UIKit.style = select.val();
});*/


checkbox.on('change', function(){
    arrowButton4.enabled = checkbox.is(':checked');
});
