import './index.styl';
import * as UIKit from '../../uikit-core/index';

class Slider_Rule extends UIKit.Core.Component {

    private storageSegments: number = 0;

    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.storageSegments = Number(this.element.attr('segments'));

        this.initialize();

        if (this.storageSegments !== 0) {
            const values = this.getValues();
            if (values) {
                let isHorizontal = true;
                if (this.type === UIKit.Core.Types.VERTICAL) {
                    isHorizontal = false;
                }
                this.build(values, isHorizontal);
            }
        }
    }

    protected initialize() {
        super.initialize();
    }

    private getValues() {
        if (this.storageSegments > 0) {
            const minimum = this.mediator.getData('model.minimum');
            const maximum = this.mediator.getData('model.maximum');
            const crat = ((Math.abs(minimum) + Math.abs(maximum)) / (this.storageSegments - 1));
            const values = [];
            let buf = minimum;
            for (let i = 0; i < this.storageSegments; i += 1) {
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

        const divs = [];
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
        divs.map(divEach);
    }
}

export default Slider_Rule;
