import * as Core from '../../core/index';
import Calendar from '../index';
import _ from 'lodash';
import { start } from 'repl';

class CalendarGrid extends Core.Element {
    constructor (
        dom: JQuery, 
        mediator: Core.Mediator, 
        orientation: string, 
        private inDate: Core.TDate, 
        private days) {
            super(dom, mediator, orientation);
            this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
    }

    protected build() {
        this.dom.empty();
        const daysCount = Core.Utils.Dates.getDaysCount(this.inDate.month, this.inDate.year);
        const startDay = Core.Utils.Dates.getDayOfWeekIndex(
            this.inDate.month, 
            1, 
            this.inDate.year);
        const lastDay = Core.Utils.Dates.getDayOfWeekIndex(
            this.inDate.month, 
            daysCount, 
            this.inDate.year);

        let startDate = _.clone(this.inDate);
        startDate.day = 1;
        for (let i = startDay; i > 1; i -= 1) {
            startDate = Core.Utils.Dates.decreaseDay(startDate);
            const cell = this.getCell('prev-month', startDate);
            this.dom.prepend(cell);
        }

        startDate = _.clone(this.inDate);
        startDate.day = 1;
        for (let i = 1; i <= daysCount; i += 1) {
            const cell = this.getCell('', startDate);
            if (i === this.inDate.day) {
                cell.attr('data-selected', 'true');
            }
            this.applyCellEvent(cell);
            this.dom.append(cell);
            startDate = Core.Utils.Dates.increaseDay(startDate);
        }

        startDate = _.clone(this.inDate);
        startDate.day = daysCount;
        for (let i = lastDay + 1; i <= 7; i += 1) {
            startDate = Core.Utils.Dates.increaseDay(startDate);
            const cell = this.getCell('next-month', startDate);
            this.dom.append(cell);
        }
    }

    private applyCellEvent(cell: JQuery) {
        cell.on('click', (event) => {
            this.dom.find('.cell').map((index, item) => {
                $(item).attr('data-selected', '');
            });
            $(event.target).attr('data-selected', 'true');
            const dateString = $(event.target).attr('data-date');
            const date = Core.Utils.Dates.parseDate(dateString);
            this.mediator.setData('model.date', date);
        });
    }

    private getCell(classes: string, date: Core.TDate) {
        const span = $('<span>').text(date.day);
        const cell = $('<div>')
            .addClass(`cell ${classes} no-select`)
            .attr('data-date', Core.Utils.Dates.combineDate(date));
        cell.append(span);
        return cell;
    }
}

export default CalendarGrid;