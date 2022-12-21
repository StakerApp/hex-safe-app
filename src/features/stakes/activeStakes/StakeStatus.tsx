import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Row } from '@tanstack/react-table';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { ActiveStakeData } from '../../../utils/customTypes';

type Props = {
    row: Row<ActiveStakeData>,
}

export const StakeStatus = ({ row }: Props) => {
    const ctx = useContext(AppContext);
    const hexDay = ctx.hexDay!;

    const startDay: number = row.getValue('start');
    const endDay: number = row.getValue('end');
    const unlockedDay: number = row.getValue('unlockedDay');
    const stakePending = (startDay >= hexDay);
    const stakeDue = (endDay <= hexDay);
    const stakeAccounted = (unlockedDay > 0);
    const stakeLate = ((endDay + 14 <= hexDay) && !stakeAccounted);

    let color = '';
    let statusText = '';
    if (stakePending) {
        color = 'rgba(150,150,0,0.8)';
        statusText = 'Pending';
    } else if (stakeDue) {
        color = 'rgba(0,90,0,0.8)';
        statusText = 'Due';
        if (stakeAccounted) {
            color = 'rgba(20,90,200,0.8)';
            statusText = 'Accounted';
        } else if (stakeLate) {
            color = 'rgba(200,20,20,0.8)';
            statusText = 'Late';
        }
    } else {
        color = 'rgba(0,0,190,0.8)';
        statusText = 'Upcoming';
    }

    return (
        <Typography variant="h6" color={color} >
            <Box sx={{ fontWeight: 'bold', m: 1 }}>{statusText}</Box>
        </Typography>
    );
};

export default StakeStatus;
