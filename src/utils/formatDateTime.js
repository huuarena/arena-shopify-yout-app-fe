// @flow
import moment from 'moment';

const formatDateTime = (datetime: string, type?: string) => {
    const newDate = new Date(datetime);
    const yyyy = newDate.getFullYear();
    const yyyyStr = `${yyyy}`;
    const mm = newDate.getMonth() + 1;
    const mmStr = `${mm < 10 ? `0` : ``}${mm}`;
    const dd = newDate.getDate();
    const ddStr = `${dd < 10 ? `0` : ``}${dd}`;

    switch (type) {
        case 'YYYY-MM-DD':
            // 2020-02-26
            return `${yyyyStr}-${mmStr}-${ddStr}`;

        case 'MM/DD/YYYY':
            // 02/26/2020
            return `${mmStr}/${ddStr}/${yyyyStr}`;

        case 'Month DD, YYYY':
            // December 25, 2020
            return moment(datetime).format('LL');

        default:
            // 2020-02-26
            return `${yyyyStr}-${mmStr}-${ddStr}`;
    }
};

export default formatDateTime;
