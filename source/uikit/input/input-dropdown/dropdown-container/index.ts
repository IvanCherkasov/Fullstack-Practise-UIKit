import * as Core from '../../../core/index';

class InputDropdown_Container extends Core.Element {

    private lisContainer: JQuery;
    private dropdownCaption: JQuery;
    private span: JQuery;
    private selectedItemValue: string | number | string[] = '';

    constructor (
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
        defaultParameters: Core.TParameters,
        private items: {value: string, caption: string}[],
    ) {
        super(dom, mediator, orientation, defaultParameters);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        this.dom.empty();
        this.dropdownCaption = $('<div>')
            .addClass('uikit-input-dropdown-caption');
        this.span = $('<span>');
        this.dropdownCaption.append(this.span);
        this.dom.append(this.dropdownCaption);
        this.applyItems();
    }

    private applyEvents() {
        const mediatorLiClick = (event, item) => {
            this.span.text(item.caption);
            this.selectedItemValue = item.value;
        };
        this.mediator.subscribe('li.click', mediatorLiClick);

        const mediatorInputChange = (event) => {
            const itemValue = $(event.target).val();
            const itemCaption = $(event.target).find('option:selected').text();
            if (itemValue !== this.selectedItemValue) {
                this.selectedItemValue = itemValue;
                this.span.text(itemCaption);
            }
            console.log('val', itemValue, 'caption' ,itemCaption);
        };
        this.mediator.subscribe('input.change', mediatorInputChange);
    }

    private applyItems() {
        this.lisContainer = $('<div>')
                .addClass('uikit-dropdown-lis-container');
        this.items.map((item) => {
            const li = $('<li>')
                .addClass('uikit-input-dropdown-li')
                .attr('data-value', item.value);
            const liCaption = $('<div>')
                .addClass('uikit-dropdown-li-caption')
                .text(item.caption);
            li.append(liCaption);
            li.on('click', (event) => {
                this.mediator.publish('li.click', event, item);
            });
            this.lisContainer.append(li);
        });
        this.dom.append(this.lisContainer);
    }
}

export default InputDropdown_Container;
