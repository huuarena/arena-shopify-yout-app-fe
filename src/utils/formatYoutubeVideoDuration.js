// @flow
import moment from 'moment';

const formatYoutubeVideoDuration = (duration: string, type: string): string => {
    const timestamp = moment.duration(duration).asMilliseconds();

    const hh = Math.floor(timestamp / (60 * 60 * 1000));
    const mm = Math.floor((timestamp - hh * 60 * 60 * 1000) / (60 * 1000));
    const ss = Math.floor((timestamp - (hh * 60 * 60 * 1000 + mm * 60 * 1000)) / 1000);

    const hhStr = hh < 10 ? `0${hh}` : `${hh}`;
    const mmStr = mm < 10 ? `0${mm}` : `${mm}`;
    const ssStr = ss < 10 ? `0${ss}` : `${ss}`;

    if (hh > 0) {
        return `${hhStr}:${mmStr}:${ssStr}`;
    } else {
        return `${mmStr}:${ssStr}`;
    }
};

export default formatYoutubeVideoDuration;
