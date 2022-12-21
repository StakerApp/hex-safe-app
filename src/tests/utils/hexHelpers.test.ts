import { BigNumber } from 'ethers';
import { contractToActiveStakeData, heartsToHexNumber, heartsToHexString, hexNumberToHearts, hexStringToHearts } from '../../utils/hexHelpers';
import { stakes } from '../testData';

describe('heartsToHexString', () => {
    // (hearts: BigNumber) => string

    test('returns a string', () => {
        const hearts = BigNumber.from('100000000');
        const result = heartsToHexString(hearts);
        expect(typeof result).toBe('string');
    });

    test('converts hearts to hex', () => {
        const hearts = BigNumber.from('100000000');
        const result = heartsToHexString(hearts);
        expect(result).toBe('1.0');
    });
});

describe('hexStringToHearts', () => {
    // (hex: string) => BigNumber

    test('returns an ethers BigNumber', () => {
        const hexString = '1';
        const result = hexStringToHearts(hexString);
        expect(result).toBeInstanceOf(BigNumber);
    });

    test('converts hex to hearts', () => {
        const hexString = '1';
        const result = hexStringToHearts(hexString);
        expect(result).toEqual(
            BigNumber.from('100000000'),
        );
    });

    test('converts a number with a decimal point', () => {
        const hexString = '1.23456789';
        const result = hexStringToHearts(hexString);
        expect(result).toEqual(
            BigNumber.from('123456789'),
        );
    });
});

describe('heartsToHexNumber', () => {
    // (hearts?: BigNumber) => number

    test('returns 0 when argument is undefined', () => {
        const hearts = undefined;
        const result = heartsToHexNumber(hearts);
        expect(result).toBe(0);
    });

    test('returns a primitive number type', () => {
        const hearts = BigNumber.from('1');
        const result = heartsToHexNumber(hearts);
        expect(typeof result).toBe('number');
    });

    test('converts hearts to hex', () => {
        const hearts = BigNumber.from('123456789');
        const result = heartsToHexNumber(hearts);
        expect(result).toBe(1.23456789);
    });
});

describe('hexNumberToHearts', () => {
    // (hex: number) => BigNumber

    test('returns an ethers BigNumber', () => {
        const hex = 1;
        const result = hexNumberToHearts(hex);
        expect(result).toBeInstanceOf(BigNumber);
    });

    test('converts hex to hearts', () => {
        const hex = 1;
        const result = hexNumberToHearts(hex);
        expect(result).toEqual(
            BigNumber.from('100000000'),
        );
    });

    test('converts a number with a decimal point', () => {
        const hex = 1.23456789;
        const result = hexNumberToHearts(hex);
        expect(result).toEqual(
            BigNumber.from('123456789'),
        );
    });
});

describe('contractToActiveStakeData', () => {
    // (stakeData: StakeData, index: StakeIndex, hexDay: number) => ActiveStakeData

    test('converts contract returned stake data to the data for UI display', () => {
        const formattedStakeData = contractToActiveStakeData(stakes[0], BigNumber.from(123), 500);

        expect(formattedStakeData).toEqual(
            {
                id: stakes[0].stakeId,
                index: BigNumber.from(123),
                start: stakes[0].lockedDay + 1,
                end: stakes[0].lockedDay + stakes[0].stakedDays + 1,
                progress: (500 - 136 - 1) / 3600,
                unlockedDay: false,
                principal: heartsToHexNumber(stakes[0].stakedHearts),
                stakeShares: stakes[0].stakeShares,
            },
        );
    });
});
