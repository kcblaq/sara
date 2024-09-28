const moment = require('moment');

interface Props {
    inputDate: string | undefined
}
export function formatDate({ inputDate }: Props) {
    if (inputDate) {
        const parsedDate = moment(inputDate);
        const formattedDate = parsedDate.format('Do MMM, YYYY');

        return formattedDate;
    } else {
        return ''; 
    }
}

export function millisecondsToSeconds(milliseconds: number | undefined): number | undefined {
    const result = milliseconds && milliseconds / 1000;
    return result
}

export function calculatePercentage(value: number, total: number): number {
    if (total === 0) {
        return 0
    }

    return (value / total) * 100;
}


export function calculatePercentageDifference(oldValue: number, newValue: number): number {
    if (oldValue === 0) {
        return newValue * 100; // If the old value is 0, the difference is 100% of the new value
    }

    const difference = newValue - oldValue;
    return (difference / oldValue) * 100;
}
