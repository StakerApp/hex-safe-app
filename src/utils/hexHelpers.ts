import { BigNumber, ethers } from 'ethers';
import { DateTime } from 'luxon';
import { ActiveStakeData, StakeData, StakeIndex } from './customTypes';

export const heartsToHexString = (hearts: BigNumber): string => {
    return ethers.utils.formatUnits(hearts, 8);
};

export const heartsToHexNumber = (hearts?: BigNumber): number => {
    // hearts: uint72 => (2^72 / 10^8) < 2^53 => hex: number
    if (hearts === undefined) {
        return 0;
    } else {
        return Number(heartsToHexString(hearts));
    }
};

export const hexStringToHearts = (hex: string): BigNumber => {
    return ethers.utils.parseUnits(hex, 8);
};

export const hexNumberToHearts = (hex: number): BigNumber => {
    return hexStringToHearts(String(hex));
};

export const contractToActiveStakeData = (stakeData: StakeData, index: StakeIndex, hexDay: number): ActiveStakeData => {
    const formattedData = {
        id: stakeData.stakeId,
        index: index,
        start: stakeData.lockedDay + 1,
        end: stakeData.lockedDay + stakeData.stakedDays + 1,
        progress: Math.max(0, Math.min(1, (hexDay - (stakeData.lockedDay + 1)) / stakeData.stakedDays)),
        unlockedDay: stakeData.unlockedDay,
        principal: heartsToHexNumber(stakeData.stakedHearts),
        stakeShares: stakeData.stakeShares,
    };

    return formattedData;
};

const userLocale =
    navigator.languages && navigator.languages.length ?
        navigator.languages[0] :
        navigator.language;

export const compactFormatter = new Intl.NumberFormat(userLocale, {
    notation: 'compact',
});

export const percentFormatter = new Intl.NumberFormat(userLocale, {
    style: 'percent', minimumFractionDigits: 2,
});

export const fullFormatter = new Intl.NumberFormat(userLocale, {
    minimumFractionDigits: 8,
});

export const basicNumberFormatter = new Intl.NumberFormat(userLocale);

export const hexDayToLocalDateTime = (hexDay: number) => {
    const dt = DateTime.utc(2019, 12, 2, 0, 0);
    const isoString = dt.plus({ days: hexDay }).toISO();
    const localTime = DateTime.fromISO(isoString);
    return localTime.toLocaleString(DateTime.DATETIME_SHORT);
};

const UTCLaunchDate = DateTime.utc(2019, 12, 2, 0, 0);

export const dateToHexDay = (dateTime: DateTime) => {
    const timeSinceLaunch = dateTime.diff(UTCLaunchDate);
    const hexDay = Math.floor(timeSinceLaunch.as('days'));
    return hexDay;
};
