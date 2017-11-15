import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitSlider_Rule extends UIKit.Core.UIKitElement {

    constructor(element, mediator, type) {
        super(element, mediator, type);
        this.storage['segments'] = this.element.attr('segments');

        this.init();

        if (this.storage.segments !== 0) {
            const values = this.getValues();
            if (values) {
                if (this.type === 'horizontal') {
                    this.build(values, true);
                } else if (this.type === 'vertical') {
                    this.build(values, false);
                }
            }
        }
    }

    protected init() {
        super.init();
    }

    private getValues() {
        if (this.storage.segments > 0) {
            const minimum = this.mediator.getData('model.minimum');
            const maximum = this.mediator.getData('model.maximum');
            const crat = ((Math.abs(minimum) + Math.abs(maximum)) / (this.storage.segments - 1));
            let values: number[] = [];
            let buf = minimum;
            for (let i = 0; i < this.storage.segments; i += 1) {
                values.push(Math.round(buf));
                buf += crat;
            }
            return values;
        }
        return undefined;
    }

    private build(values: number[], isHorizontal: boolean): void {

        const size = (100 / (values.length + 1));
        const minimum = this.mediator.getData('model.minimum');
        const maximum = this.mediator.getData('model.maximum');

        let divs = [];
        let shiftType = '';

        if (isHorizontal) {
            shiftType = 'left';
            this.element.css('width', '100%');
        } else {
            shiftType = 'top';
            this.element.css('height', '100%');
        }

        const elementRuleItemEach = (item) => {
            $(item).remove();
        };
        this.element.find('div.rule-item').toArray().map(elementRuleItemEach);

        for (let i = 0; i < values.length; i += 1) {
            const div = $('<div>')
                .addClass('rule-item')
                .html('<div>' + values[i] + '</div>')
                .attr('value', values[i]);
            divs.push(div);
        }

        if (!isHorizontal) {
            divs.reverse();
        }

        for (let i = 1; i < values.length - 1; i += 1) {
            const percent = Math.abs(values[i] - minimum) / (maximum - minimum) * 100;
            divs[i].css(shiftType, percent + '%');
            if (isHorizontal) {
                divs[i].css('transform', 'translateX(1px) translateX(-50%)');
            } else {
                divs[i].css('transform', 'translateY(-50%)');
            }
        }

        const divEach = (item) => {
            this.element.append(item);
            item.on('click', () => {
                const value = Number(item.attr('value'));
                this.mediator.setData('model.value', value);
            });
        };
    }
}

export default UIKitSlider_Rule;
