"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JalaliDateUtil = void 0;
const moment_jalaali_1 = __importDefault(require("moment-jalaali"));
class JalaliDateUtil {
    static persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    static toJalali(date, format = 'jYYYY/jMM/jDD') {
        const m = (0, moment_jalaali_1.default)(typeof date === 'string' ? new Date(date) : date);
        if (!m.isValid())
            return 'تاریخ نامعتبر';
        switch (format) {
            case 'jYYYY/jMM/jDD':
                return m.format('jYYYY/jMM/jDD');
            case 'jYYYY-jMM-jDD':
                return m.format('jYYYY-jMM-jDD');
            case 'jDD jMMMM jYYYY': {
                const day = m.jDate();
                const month = JalaliDateUtil.persianMonths[m.jMonth()];
                const year = m.jYear();
                return `${day} ${month} ${year}`;
            }
            case 'jDD MMM jYYYY': {
                const day = m.jDate();
                const month = JalaliDateUtil.persianMonths[m.jMonth()];
                const year = m.jYear();
                return `${day} ${month} ${year}`;
            }
            case 'full':
                return `${m.format('jYYYY/jMM/jDD')} ${m.format('HH:mm')}`;
            default:
                return m.format('jYYYY/jMM/jDD');
        }
    }
    static toJalaliDateTime(date) {
        const m = (0, moment_jalaali_1.default)(typeof date === 'string' ? new Date(date) : date);
        return m.format('jYYYY/jMM/jDD HH:mm');
    }
    static toTime(date) {
        const m = (0, moment_jalaali_1.default)(typeof date === 'string' ? new Date(date) : date);
        return m.format('HH:mm');
    }
    static getTodayGregorian() {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now;
    }
    static getStartOfMonthGregorian() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    }
    static getEndOfMonthGregorian() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    }
    static getStartOfDayGregorian(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    static getEndOfDayGregorian(date) {
        const d = new Date(date);
        d.setHours(23, 59, 59, 999);
        return d;
    }
}
exports.JalaliDateUtil = JalaliDateUtil;
//# sourceMappingURL=jalali.js.map