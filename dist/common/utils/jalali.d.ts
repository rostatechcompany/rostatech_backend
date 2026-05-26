export declare class JalaliDateUtil {
    private static persianMonths;
    private static replaceEnglishMonthWithPersian;
    static toJalali(date: Date | string, format?: 'jYYYY/jMM/jDD' | 'jYYYY-jMM-jDD' | 'jDD jMMMM jYYYY' | 'jDD MMM jYYYY' | 'full'): string;
    static toJalaliDateTime(date: Date | string): string;
    static toTime(date: Date | string): string;
    static getTodayGregorian(): Date;
    static getStartOfMonthGregorian(): Date;
    static getEndOfMonthGregorian(): Date;
    static getStartOfDayGregorian(date: Date): Date;
    static getEndOfDayGregorian(date: Date): Date;
}
