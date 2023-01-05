import { CardContent } from '@material-ui/core';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DateTime, Duration } from 'luxon';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../css/main.css';
import { basicNumberFormatter, dateToHexDay } from '../utils/hexHelpers';
import { Loading } from '../utils/Loading';
import { errorMessage, Message, titleText } from '../utils/Message';

const nextMidnight = (dt: DateTime) => {
    return DateTime.utc(dt.year, dt.month, dt.day, 0, 0, 0, 0).plus({ days: 1 });
};

export const timeTillMidnightUTC = (dt: DateTime): Duration => {
    const midnight = nextMidnight(dt);
    return midnight.diff(dt);
};

export const HexClock = () => {
    const ctx = useContext(AppContext);
    const hexDay = ctx.hexDay!;
    const setHexDay = ctx.setHexDay;
    const provider = ctx.provider;
    const [blockTime, setBlockTime] = useState<DateTime>();
    const [timeLoadAttempted, setTimeLoadAttempted] = useState<boolean>(false);
    const [countDownTimerString, setCountDownTimerString] = useState<string>('');
    const countDownString = `Day ${basicNumberFormatter.format(hexDay + 1)} Starts in: ${countDownTimerString}`;

    const updateBlockTime = async () => {
        try {
            const block = await provider.getBlock('latest');
            const newBlockTime = DateTime.fromMillis(block.timestamp * 1000, { zone: 'utc' });
            setBlockTime(newBlockTime);
            setCountDownTimerString(timeTillMidnightUTC(newBlockTime).toFormat('hh\'h\':mm\'m\''));
            setHexDay(dateToHexDay(newBlockTime));
        } catch (e) {
            console.error(e);
        } finally {
            setTimeLoadAttempted(true);
        }
    };

    useEffect(() => {
        updateBlockTime();
        const pollingInterval = 15000;
        const blockTimeUpdater = setInterval(updateBlockTime, pollingInterval);

        return (() => {
            clearInterval(blockTimeUpdater);
        });
    }, [provider]);

    return (
        <>
            {!timeLoadAttempted && (
                <Card sx={{ display: 'flex', minWidth: 180, minHeight: 250, justifyContent: 'center', alignItems: 'center' }}>
                    <CardContent>
                        <Loading />
                    </CardContent>
                </Card>
            )}
            {timeLoadAttempted && !(hexDay && blockTime) && (
                <Message title={titleText.loading} message={errorMessage.authoritativeTimestamps} />
            )}
            {timeLoadAttempted && hexDay && blockTime && (
                <Card sx={{ display: 'flex', minWidth: 180, minHeight: 250, justifyContent: 'center', alignItems: 'center' }}>
                    <CardContent>
                        <Typography variant="h5" align='center'>
                            HEX Day: {basicNumberFormatter.format(hexDay)}
                        </Typography>
                        <Typography variant="body1" align='center'>
                            {countDownString}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default HexClock;
