import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitSlider_Rule extends UIKit.Core.UIKitElement {

    private segments;

    constructor(element, mediator, type) {
        // @ts-ignore
        super(element, mediator, type);
        this.segments = this.element.attr('segments');

        const getValues = () => {
            if (this.segments > 0) {
                const minimum = this.Mediator.getData('model.minimum');
                const maximum = this.Mediator.getData('model.maximum');
                const crat = ((Math.abs(minimum) + Math.abs(maximum)) / (this.segments - 1));
                let values: number[] = [];
                let buf = minimum;
                for (let i = 0; i < this.segments; i += 1) {
                    values.push(Math.round(buf));
                    buf += crat;
                }
                return values;
            }
            return undefined;
        };

        this.stylize(this.Type);

        if (this.segments !== 0) {
            const values = getValues();
            if (values) {
                if (this.Type === 'horizontal') {
                    this.build(values, true);
                } else if (this.Type === 'vertical') {
                    this.build(values, false);
                }
            }
        }
    }

    private build(values: number[], isHorizontal: boolean): void {

        const size = (100 / (values.length + 1));
        const minimum = this.Mediator.getData('model.minimum');
        const maximum = this.Mediator.getData('model.maximum');

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
                this.Mediator.setData('model.value', value);
            });
        };
    }
}

export default UIKitSlider_Rule;
