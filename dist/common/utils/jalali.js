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
    static replaceEnglishMonthWithPersian(formatted) {
        const englishMonths = [
            'Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
            'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'
        ];
        let result = formatted;
        for (let i = 0; i < englishMonths.length; i++) {
            const regex = new RegExp(englishMonths[i], 'gi');
            result = result.replace(regex, this.persianMonths[i]);
        }
        return result;
    }
    static toJalali(date, format = 'jYYYY/jMM/jDD') {
        const m = (0, moment_jalaali_1.default)(typeof date === 'string' ? new Date(date) : date);
        if (!m.isValid())
            return 'تاریخ نامعتبر';
        let formatted;
        switch (format) {
            case 'jYYYY/jMM/jDD':
                formatted = m.format('jYYYY/jMM/jDD');
                break;
            case 'jYYYY-jMM-jDD':
                formatted = m.format('jYYYY-jMM-jDD');
                break;
            case 'jDD jMMMM jYYYY':
                formatted = m.format('jDD jMMMM jYYYY');
                formatted = this.replaceEnglishMonthWithPersian(formatted);
                break;
            case 'jDD MMM jYYYY':
                formatted = m.format('jDD MMM jYYYY');
                formatted = this.replaceEnglishMonthWithPersian(formatted);
                break;
            case 'full':
                formatted = m.format('jYYYY/jMM/jDD HH:mm');
                break;
            default:
                formatted = m.format('jYYYY/jMM/jDD');
        }
        return formatted;
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