import { BigNumber } from 'ethers';
import { StakeData } from '../utils/customTypes';

export const stakes: StakeData[] = [
    {
        stakeId: 125523,
        stakedHearts: BigNumber.from('40000000000000000'),
        stakeShares: BigNumber.from('120379527571070612'),
        lockedDay: 136,
        stakedDays: 3600,
        unlockedDay: 0,
        isAutoStake: false,
    },
    {
        stakeId: 125529,
        stakedHearts: BigNumber.from('30000000000000000'),
        stakeShares: BigNumber.from('90284645678302960'),
        lockedDay: 136,
        stakedDays: 3600,
        unlockedDay: 0,
        isAutoStake: false,
    },
    {
        stakeId: 219508,
        stakedHearts: BigNumber.from('3708087058056318'),
        stakeShares: BigNumber.from('10189165073875364'),
        lockedDay: 323,
        stakedDays: 5555,
        unlockedDay: 0,
        isAutoStake: false,
    },
];
