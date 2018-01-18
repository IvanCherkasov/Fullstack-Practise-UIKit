import * as Core from '../core/index';
import _ from 'lodash';
import './themes/index';
const templatePug = require('./body.pug');
const template = $(templatePug());
import Calendar_Head from './head/index';
import Calendar_Grid from './grid/index';

class Calendar extends Core.Component {

    private domHead: JQuery;
    private domGrid: JQuery;
    private domTodayBtn: JQuery;

    private calendarHead: Calendar_Head;
    private calendarGrid: Calendar_Grid;

    private oldDate: Core.TDate;

    private parametersObject: Core.TParameters = {
        'date': undefined,
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        const ddd: Core.TDate = {
            day: 1,
            month: 2,
            year: 3,
        };
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new Calendar_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    private initialize() {
        this.setDate(Core.Utils.Dates.combineDate(this.today));
        this.oldDate = this.getDate();
        this.parametersObject['date'] = this.getDate();
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        this.dom.attr('data-today', Core.Utils.Dates.combineDate(
            this.mediator.getData('model.today')));
        this.dom.addClass('uikit-calendar');
        this.dom.append(template.clone());
        this.domHead = this.dom.find('.uikit-calendar-day-month');
        this.domGrid = this.dom.find('.uikit-calendar-week-days .uikit-calendar-days-grid');
        this.domTodayBtn = this.dom.find('.uikit-calendat-today-btn');
        const weekDays = this.dom.find('.uikit-calendar-week');
        Object.keys(Core.Utils.Dates.daysNames).map((key) => {
            const day = $('<div>').addClass('day').text(Core.Utils.Dates.daysNames[key]['short']);
            weekDays.append(day);
        });

        this.calendarHead = new Calendar_Head(
            this.domHead,
            this.mediator,
            this.orientation,
            this.getDate(),
        );

        this.buildGrid(this.getDate());
    }

    private buildGrid(date: Core.TDate) {
        this.calendarGrid = new Calendar_Grid(
            this.domGrid,
            this.mediator,
            this.orientation,
            date,
            Core.Utils.Dates.daysNames,
        );
    }

    private applyEvents() {
        const mediatorModelDate = (modelData) => {
            this.dom.attr('data-date', modelData.date);
            if ((this.oldDate.month !== modelData.date.month) || 
                (this.oldDate.year !== modelData.date.year)) {
                    this.buildGrid(modelData.date);
            }
            this.oldDate = modelData.date;
        };
        this.mediator.subscribe('model.date', mediatorModelDate);

        this.domTodayBtn.on('click', () => {
            this.setDate(Core.Utils.Dates.combineDate(this.today));
        });

        this.mediator.subscribe('month.increase', () => {
            this.setDate(
                Core.Utils.Dates.combineDate(
                    Core.Utils.Dates.increaseMonth(this.getDate())));
        });

        this.mediator.subscribe('month.decrease', () => {
            this.setDate(
                Core.Utils.Dates.combineDate(
                    Core.Utils.Dates.decreaseMonth(this.getDate())));
        });
    }

    private getCurrentDate(): string {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        let sDD: string = `${dd}`;
        let sMM: string = `${mm}`;

        if (dd < 10) {
            sDD = '0' + dd;
        } 

        if (mm < 10) {
            sMM = '0' + mm;
        } 

        return `${sMM} ${sDD} ${yyyy}`;
    }

    public setDate(value: string | Date) {
        const date = Core.Utils.Dates.parseDate(value);
        this.mediator.setData('model.date', date);
    }

    public getDateNative (): Date {
        return Core.Utils.Dates.toNativeDate(this.mediator.getData('model.date'));
    }

    public getDateString (): string {
        return Core.Utils.Dates.combineDate(this.mediator.getData('model.date'));
    }

    public getDate (): Core.TDate {
        return this.mediator.getData('model.date');
    }

    public get today(): Core.TDate {
        return this.mediator.getData('model.today');
    }
}

class Calendar_Model extends Core.Model {
    constructor() {
        const today = new Date();
        super({
            today: Core.Utils.Dates.parseDate(today),
            date: Core.Utils.Dates.parseDate(today),
        });
    }

    public getData(property: string): any {
        switch (property) {
            case 'today':
                return this.data.today;
            case 'date':
                return this.data.date;
            default:
                return undefined;
        }
    }

    public setData(property: string, data: any): boolean {
        switch (property) {
            case 'today':
                this.data.today = data;
                return true;
            case 'date':
                this.data.date = data;
                return true;
            default:
                return false;
        }
    }
}

export default Calendar;
