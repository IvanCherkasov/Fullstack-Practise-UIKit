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

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        this.domDay = this.dom.find('.uikitCalendar__currentDay span');
        this.domMonthLeftBtn = this.dom.find('.uikitCalendar__previousMonthButton');
        this.domMonthCaption = this.dom.find('.uikitCalendar__monthFullName span');
        this.domMonthRightBtn = this.dom.find('.uikitCalendar__nextMonthButton');
        this.domYear = this.dom.find('.uikitCalendar__year');

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

        const domMouseEnter = () => {
            this.domYear.addClass('uikitCalendar__year-show');
        };

        const domMouseLeave = () => {
            this.domYear.removeClass('uikitCalendar__year-show');
        };

        this.dom.on('mouseenter', domMouseEnter);
        this.dom.on('mouseleave', domMouseLeave);
    }

    private capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
    }
}

export default Calendar_Head;
