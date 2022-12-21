import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { BigNumber, ethers } from 'ethers';
import { createContext, SetStateAction, useEffect, useMemo, useState } from 'react';
import hexContractFactory from '../features/contracts/hexContractFactory';
import { EthAddress, HexContract } from '../utils/customTypes';
import { Loading } from '../utils/Loading';
import { errorMessage, Message, titleText } from '../utils/Message';

type AppContextValue = {
    provider: ethers.providers.Web3Provider
    address: EthAddress
    hexContract?: HexContract
    heartsBalance?: BigNumber
    hexDay?: number
    setHexDay: React.Dispatch<SetStateAction<number | undefined>>
}

type Props = {
    children?: React.ReactNode;
}

export const AppContext = createContext({} as AppContextValue);

export const AppContextProvider = ({ children }: Props) => {
    const { sdk, safe } = useSafeAppsSDK();
    const provider = useMemo(() => new ethers.providers.Web3Provider(new SafeAppProvider(safe, sdk)), [sdk, safe]);
    const address = safe.safeAddress as EthAddress;
    const [hexContract, setHexContract] = useState<HexContract>();
    const [heartsBalance, setHeartsBalance] = useState<BigNumber>();
    const [balanceLoadAttempted, setBalanceLoadAttempted] = useState(false);
    const [hexDay, setHexDay] = useState<number>();
    const [hexDayLoadAttempted, setHexDayLoadAttempted] = useState(false);

    provider.on('network', (_, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
    });

    useEffect(() => {
        setHexContract(hexContractFactory(provider.getSigner()));
    }, [provider]);

    useEffect(() => {
        const initializeHexDay = async () => {
            if (hexContract !== undefined) {
                try {
                    const newDay = await hexContract.currentDay();
                    setHexDay(Number(newDay) + 1);
                } catch (e) {
                    console.error(e);
                } finally {
                    setHexDayLoadAttempted(true);
                }
            }
        };

        initializeHexDay();
    }, [hexContract]);

    useEffect(() => {
        const getOnChainBalances = async () => {
            if (hexContract !== undefined) {
                try {
                    const hearts: ethers.BigNumber = await hexContract.balanceOf(address);
                    setHeartsBalance(hearts);
                } catch (e) {
                    console.error(e);
                } finally {
                    setBalanceLoadAttempted(true);
                }
            }
        };

        getOnChainBalances();
    }, [hexContract, address]);

    return (
        <>
            {!(provider && hexContract) && (
                <Message title={titleText.error} message={errorMessage.chain} />
            )}
            {provider && hexContract && !balanceLoadAttempted && (
                <Loading />
            )}
            {provider && hexContract && balanceLoadAttempted && !heartsBalance && (
                <Message title={titleText.error} message={errorMessage.balances} />
            )}
            {provider && hexContract && heartsBalance && !hexDayLoadAttempted && (
                <Loading />
            )}
            {provider && hexContract && heartsBalance && hexDayLoadAttempted && !hexDay && (
                <Message title={titleText.loading} message={errorMessage.authoritativeTimestamps} />
            )}
            {provider && hexContract && heartsBalance && hexDay && (
                <AppContext.Provider
                    value={{
                        provider,
                        address,
                        hexContract,
                        heartsBalance,
                        hexDay,
                        setHexDay,
                    }}>
                    {children}
                </AppContext.Provider>
            )}
        </>
    );
};
