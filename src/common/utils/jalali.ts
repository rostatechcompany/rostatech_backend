import moment from 'moment-jalaali';

export class JalaliDateUtil {
  private static persianMonths: string[] = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  private static replaceEnglishMonthWithPersian(formatted: string): string {
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

  static toJalali(
    date: Date | string,
    format: 'jYYYY/jMM/jDD' | 'jYYYY-jMM-jDD' | 'jDD jMMMM jYYYY' | 'jDD MMM jYYYY' | 'full' = 'jYYYY/jMM/jDD'
  ): string {
    const m = moment(typeof date === 'string' ? new Date(date) : date);
    if (!m.isValid()) return 'تاریخ نامعتبر';

    let formatted: string;
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

  static toJalaliDateTime(date: Date | string): string {
    const m = moment(typeof date === 'string' ? new Date(date) : date);
    return m.format('jYYYY/jMM/jDD HH:mm');
  }

  static toTime(date: Date | string): string {
    const m = moment(typeof date === 'string' ? new Date(date) : date);
    return m.format('HH:mm');
  }

  static getTodayGregorian(): Date {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }

  static getStartOfMonthGregorian(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  }

  static getEndOfMonthGregorian(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  }

  static getStartOfDayGregorian(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  static getEndOfDayGregorian(date: Date): Date {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  }
}