import moment from 'moment';

export const  getYearMonth= (day)=> moment(day).format('YYYY.MM');

export const getDateFormat = (day) => moment(day).format('YYYY-MM-DD');

export const getRegstrationDayFormat = (day) => moment(day).format('YYYY.MM.DD');

export const  getFormattedRegDate = (day) => {
    let daysDiff = moment().diff(moment(day, 'YYYYMMDD'), 'days');
    console.log(daysDiff);
    if (daysDiff > 1) {
        return moment(day).format('YY.MM.DD HH:mm');
    } else if (daysDiff === 1) {
        return '어제 ' + moment(day).format('HH:mm');
    } else {
        return '오늘 ' + moment(day).format('HH:mm');
    }
}