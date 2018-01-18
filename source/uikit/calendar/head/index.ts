import * as Core from '../../core/index';
import _ from 'lodash';
import Calendar from '../index';

class Calendar_Head extends Core.Element {

    private domDay: JQuery;
    private domMonthCaption: JQuery;
    private domMonthLeftBtn: JQuery;
    private domMonthRightBtn: JQuery;
    private domYear: JQuery;

    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
        private inDate: Core.TDate,
    ) {
        super(dom, mediator, orientation);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        this.domDay = this.dom.find('.uikit-calendar-day span');
        this.domMonthLeftBtn = this.dom.find('.uikit-calendar-month .btn-left');
        this.domMonthCaption = this.dom.find('.uikit-calendar-month .caption span');
        this.domMonthRightBtn = this.dom.find('.uikit-calendar-month .btn-right');
        this.domYear = this.dom.find('.uikit-calendar-year');

        this.domDay.text(this.inDate.day);
        this.domMonthCaption.text(
            this.capitalizeFirstLetter(Core.Utils.Dates.monthsNames[this.inDate.month].full));
    }

    private applyEvents() {
        const mediatorBtnLeft = () => {
            this.mediator.publish('month.decrease');
        };
        const mediatorBtnRight = () => {
            this.mediator.publish('month.increase');
        };
        this.domMonthLeftBtn.on('click', mediatorBtnLeft);
        this.domMonthRightBtn.on('click', mediatorBtnRight);

        const mediatorModelDate = (modelData) => {
            this.domDay.text(modelData.date.day);
            this.domMonthCaption.text(
                this.capitalizeFirstLetter(
                    Core.Utils.Dates.monthsNames[modelData.date.month].full));
            this.domYear.text(modelData.date.year);
        };
        this.mediator.subscribe('model.date', mediatorModelDate);
    }

    private capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
    }
}

export default Calendar_Head;
