import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Row } from '@tanstack/react-table';
import { BigNumber } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { ActiveStakeData, EthAddress, StakeId, StakeIdentifier, StakeIndex } from '../../../utils/customTypes';
import CancellationWarning from './CancellationWarning';
import { EESWarning } from './EESWarning';
import SplitButton from './SplitButton';

type Props = {
    row: Row<ActiveStakeData>
}

export const StakeActions = ({ row }: Props) => {
    const ctx = useContext(AppContext);
    const hexContract = ctx.hexContract!;
    const hexDay = ctx.hexDay!;
    const address = ctx.address;

    const startDay: number = row.getValue('start');
    const endDay: number = row.getValue('end');
    const unlockedDay: number = row.getValue('unlockedDay');
    const stakePending = (startDay > hexDay);
    const stakeDue = (endDay <= hexDay);
    const stakeAccounted = (unlockedDay > 0);
    const stakeLate = ((endDay + 14 <= hexDay) && !stakeAccounted);
    const [eesWarningOpen, setEESWarningOpen] = useState(false);
    const [cancellationWarningOpen, setCancellationWarningOpen] = useState(false);
    const [currentStake, setCurrentStake] = useState<StakeIdentifier>({});
    const handleEESWarningClose = () => setEESWarningOpen(false);
    const handleCancellationWarningClose = () => setCancellationWarningOpen(false);

    const stakeEnd = (stake: StakeIdentifier) => {
        hexContract.stakeEnd(stake.index, stake.id);
    };

    const stakeGoodAccounting = (stakerAddr: EthAddress, stakeIndex: StakeIndex, stakeIdParam: StakeId) => {
        hexContract.stakeGoodAccounting(stakerAddr, stakeIndex, stakeIdParam);
    };

    const fallbackHexDayCheck = async () => {
        try {
            const newDay = await hexContract.currentDay();
            return (Number(newDay) + 1);
        } catch (e) {
            console.error(e);
        }
    };

    const asyncHandleEndStakeClick = async (currentStake: StakeIdentifier) => {
        const actualHexDay = await fallbackHexDayCheck();
        if (actualHexDay !== undefined) {
            const stakeActuallyPending = (startDay > actualHexDay);
            const stakeActuallyDue = (endDay <= actualHexDay);
            if (!stakeActuallyPending && !stakeActuallyDue) {
                setEESWarningOpen(true);
            } else if (stakeActuallyPending) {
                setCancellationWarningOpen(true);
            } else {
                stakeEnd(currentStake);
            }
        }
    };

    const handleEndStakeClick = () => {
        const index: BigNumber = row.getValue('index');
        const id: number = row.getValue('id');
        setCurrentStake({ index, id });
    };

    const handleGoodAccountingClick = () => {
        const index: BigNumber = row.getValue('index');
        const id: number = row.getValue('id');
        stakeGoodAccounting(address, index, id);
    };

    const earlyEndStake = (stake: StakeIdentifier) => {
        stakeEnd(stake);
    };

    const cancelPendingStake = (stake: StakeIdentifier) => {
        stakeEnd(stake);
    };

    useEffect(() => {
        // skip initial render
        if (currentStake.id !== undefined) {
            asyncHandleEndStakeClick(currentStake);
        }
    }, [currentStake]);

    return (
        <>
            <Modal open={eesWarningOpen} onClose={handleEESWarningClose}>
                <Box className='modalContainer'>
                    <EESWarning earlyEndStakeHandler={earlyEndStake} closeHandler={handleEESWarningClose} stake={currentStake} />
                </Box>
            </Modal>
            <Modal open={cancellationWarningOpen} onClose={handleCancellationWarningClose}>
                <Box className='modalContainer'>
                    <CancellationWarning cancelStakeHandler={cancelPendingStake} closeHandler={handleCancellationWarningClose} stake={currentStake} />
                </Box>
            </Modal>
            <SplitButton
                endStakeHandler={handleEndStakeClick}
                goodAccountingHandler={handleGoodAccountingClick}
                stakePending={stakePending}
                stakeDue={stakeDue}
                stakeAccounted={stakeAccounted}
                stakeLate={stakeLate}
            />
        </>
    );
};

export default StakeActions;
