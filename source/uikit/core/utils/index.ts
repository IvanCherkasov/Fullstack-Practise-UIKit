import * as Core from '../index';
import _ from 'lodash';

namespace Utils {
    export class Dates {
        public static increaseMonth(inDate: Core.TDate): Core.TDate {
            const date = _.clone(inDate);
            if (date.month === 12) {
                date.month = 1;
                date.year += 1;
            } else {
                date.month += 1;
            }
            return date;
        }
    
        public static decreaseMonth(inDate: Core.TDate): Core.TDate {
            const date = _.clone(inDate);
            if (date.month === 1) {
                date.month = 12;
                date.year -= 1;
            } else {
                date.month -= 1;
            }
            return date;
        }
    
        public static getDayOfWeekIndex(month: number, day: number, year: number): number {
            const a: number = parseInt(`${(14 - month) / 12}`, 10);
            const y = year - a;
            const m = month + 12 * a - 2;
            const d = (parseInt(`${day + y + parseInt(`${y / 4}`, 10) - 
                parseInt(`${y / 100}`, 10) + parseInt(`${y / 400}`, 10) + (31 * m) / 12}`, 10)) % 7;
            return d;
        }
    
        public static getDaysCount (x: number/*month*/, y: number) { 
            return 28 + ((x + Math.floor(x / 8)) % 2) + 2 % x + Math.floor(
                (1 + (1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % 
                (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1))) / x) + 
                Math.floor(1 / x) - Math.floor(((1 - (y % 4 + 2) % (y % 4 + 1)) * 
                ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1))) / x); 
        }
    
        public static decreaseDay(inDate: Core.TDate): Core.TDate {
            const date = _.clone(inDate);
            if (date.day === 1) {
                if (date.month === 1) {
                    // это декабрь
                    date.day = 31;
                    date.month = 12;
                    date.year -= 1;
                } else {
                    date.month -= 1;
                    const daysCount = this.getDaysCount(date.month, date.year);
                    date.day = daysCount;
                }
            } else {
                date.day -= 1;
            }
            return date;
        }
    
        public static increaseDay(inDate: Core.TDate): Core.TDate {
            const daysCount = this.getDaysCount(inDate.month, inDate.year);
            const date = _.clone(inDate);
            if (date.day === daysCount) {
                if (date.month === 12) {
                    date.month = 1;
                    date.year += 1;
                    date.day = 1;
                } else {
                    date.month += 1;
                    date.day = 1;
                }
            } else {
                date.day += 1;
            }
            return date;
        }
    
        public static parseDate(date: string | Date): Core.TDate {
            if (typeof date === 'string') {
                const dates: string[] = date.split(' ');
                const m: number = parseInt(dates[0], 10);
                const d: number = parseInt(dates[1], 10);
                const y: number = parseInt(dates[2], 10);
    
                if (d < 0 || d > 31) {
                    return undefined;
                }
    
                if (m < 0 || m > 12) {
                    return undefined;
                }
    
                if (y < 1583) {
                    return undefined;
                }
    
                return {
                    month: m,
                    day: d,
                    year: y,
                };
            }
            
            if (date instanceof Date) {
                return {
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                    year: date.getFullYear(),
                };
            }
    
            return undefined;
        }
    
        public static combineDate(date: Core.TDate): string {
            return `${date.month} ${date.day} ${date.year}`;
        }
    
        public static toNativeDate(date: Core.TDate): Date {
            const native = new Date();
            native.setDate(date.day);
            native.setMonth(date.month);
            native.setFullYear(date.year);
            return native;
        }
    
        public static readonly daysNames: object = {
            1: {
                'short': 'Mon',
                'full': 'Monday',
            },
            2: {
                'short': 'Tue',
                'full': 'Tuesday',
            },
            3: {
                'short': 'Wed',
                'full': 'Wednesday',
            },
            4: {
                'short': 'Thu',
                'full': 'Thursday',
            },
            5: {
                'short': 'Fri',
                'full': 'Friday',
            },
            6: {
                'short': 'Sat',
                'full': 'Saturday',
            },
            7: {
                'short': 'Sun',
                'full': 'Sunday',
            },
        };
    
        public static readonly monthsNames: object = {
            1: {
                'full': 'January',
                'short': 'Jan',
            },
            2: {
                'full': 'February',
                'short': 'Feb',
            },
            3: {
                'full': 'March',
                'short': 'Mar',
            },
            4: {
                'full': 'April',
                'short': 'Apr',
            },
            5: {
                'full': 'May',
                'short': 'May',
            },
            6: {
                'full': 'June',
                'short': 'June',
            },
            7: {
                'full': 'July',
                'short': 'July',
            },
            8: {
                'full': 'August',
                'short': 'Aug',
            },
            9: {
                'full': 'September',
                'short': 'Sept',
            },
            10: {
                'full': 'October',
                'short': 'Oct',
            },
            11: {
                'full': 'November',
                'short': 'Nov',
            },
            12: {
                'full': 'December',
                'short': 'Dec',
            },
        };
    }
}

export default Utils;
