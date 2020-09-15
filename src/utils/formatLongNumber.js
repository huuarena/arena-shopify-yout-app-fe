// @flow

const formatLongNumber = (value: number): string => {
    // billion
    if (value > 1000000000) {
        return `${(value / 1000000000).toFixed(1)}B`;
    }
    // million
    if (value > 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    }
    // thousand
    if (value > 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
};

export default formatLongNumber;
