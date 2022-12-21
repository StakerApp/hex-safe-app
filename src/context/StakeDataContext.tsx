import { BigNumber } from 'ethers';
import { createContext, useContext, useEffect, useState } from 'react';
import { ActiveStakeData, StakeCount, StakeData } from '../utils/customTypes';
import { contractToActiveStakeData } from '../utils/hexHelpers';
import { AppContext } from './AppContext';

type StakeDataContextValue = {
    stakeCount: number
    stakeData: ActiveStakeData[]
}

type Props = {
    children?: React.ReactNode;
}

export const StakeDataContext = createContext({} as StakeDataContextValue);

export const StakeDataContextProvider = ({ children }: Props) => {
    const ctx = useContext(AppContext);
    const hexContract = ctx.hexContract;
    const address = ctx.address;
    const hexDay = ctx.hexDay;
    const [stakeCount, setStakeCount] = useState<StakeCount>(0);
    const [stakeData, setStakeData] = useState<ActiveStakeData[]>([]);

    useEffect(() => {
        const getStakeCount = async () => {
            if (hexContract !== undefined) {
                try {
                    const result = await hexContract.stakeCount(address);
                    const count = Number(result._hex) as StakeCount;
                    setStakeCount(count);
                } catch (e) {
                    console.error(e);
                }
            }
        };

        getStakeCount();
        const stakeCountPoll = setInterval(getStakeCount, 30000);

        return (() => {
            clearInterval(stakeCountPoll);
        });
    }, [hexContract]);

    useEffect(() => {
        const getStakeData = async () => {
            if (hexContract !== undefined && hexDay !== undefined) {
                try {
                    const activeStakeData: ActiveStakeData[] = [];
                    for (let i = 0; i < stakeCount; i++) {
                        const stakeData: StakeData = await hexContract.stakeLists(address, i);
                        activeStakeData.push(contractToActiveStakeData(stakeData, BigNumber.from(i), hexDay));
                    }

                    setStakeData(activeStakeData);
                } catch (e) {
                    console.error(e);
                }
            }
        };

        getStakeData();
    }, [hexContract, stakeCount, hexDay]);

    return (
        <StakeDataContext.Provider
            value={{
                stakeCount,
                stakeData,
            }}>
            {children}
        </StakeDataContext.Provider>
    );
};
