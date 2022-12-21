import { BigNumber, ethers } from 'ethers';

// interfaces
export interface HexContract extends ethers.Contract { }

export interface StakeData {
    stakeId: number
    stakedHearts: BigNumber
    stakeShares: BigNumber
    lockedDay: number
    stakedDays: number
    unlockedDay: number
    isAutoStake: boolean
}

export interface ActiveStakeData {
    id: StakeId
    index: StakeIndex
    start: number
    end: number
    unlockedDay: number
    progress: number
    principal: number
    stakeShares: BigNumber
}

// types
export type StakeIdentifier = {
    index?: StakeIndex
    id?: StakeId
}

export type EthAddress = string
export type StakeCount = number
export type StakeIndex = BigNumber
export type StakeId = number
export type ProviderOrSigner = ethers.providers.Provider | ethers.Signer
