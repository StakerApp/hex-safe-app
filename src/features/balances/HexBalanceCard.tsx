import { CardContent } from '@material-ui/core';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { BigNumber } from 'ethers';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { StakeDataContext } from '../../context/StakeDataContext';
import { basicNumberFormatter, compactFormatter, fullFormatter, heartsToHexNumber, hexNumberToHearts } from '../../utils/hexHelpers';
import hexLogo from '../../utils/hexLogo.png';
import TextWithTooltip from '../stakes/activeStakes/TextWithTooltip';

export const HexBalanceCard = () => {
    const appCtx = useContext(AppContext);

    const stakeDataCtx = useContext(StakeDataContext);
    const heartsBalance = appCtx.heartsBalance;
    const stakeData = stakeDataCtx.stakeData;

    const hexBalance = heartsToHexNumber(heartsBalance);
    const formattedHexBalance = compactFormatter.format(hexBalance);
    const fullFormattedHexBalance = fullFormatter.format(hexBalance);

    const heartsStaked = stakeData.reduce((a, b) => a.add(hexNumberToHearts(b.principal)), BigNumber.from('0'));
    const hexStaked = heartsToHexNumber(heartsStaked);
    const formattedStakedHexBalance = compactFormatter.format(hexStaked);
    const fullFormattedStakedHexBalance = fullFormatter.format(hexStaked);

    const hexTotalBalance = hexBalance + hexStaked;
    const formattedHexTotalBalance = compactFormatter.format(hexTotalBalance);
    const fullFormattedHexTotalBalance = fullFormatter.format(hexTotalBalance);

    const shareBalance = stakeData.reduce((a, b) => a.add(b.stakeShares), BigNumber.from('0'));
    const formattedShareBalance = compactFormatter.format(shareBalance.toBigInt());
    const fullFormattedShareBalance = basicNumberFormatter.format(shareBalance.toBigInt());

    const available = `Available: ${formattedHexBalance} HEX`;
    const staked = `Staked: ${formattedStakedHexBalance} HEX`;
    const total = `Total: ${formattedHexTotalBalance} HEX`;
    const shares = `Shares: ${formattedShareBalance}`;

    return (
        <Card sx={{ display: 'flex', minWidth: 180, minHeight: 250, justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
                <Typography variant="body1" align='center'>
                    <img src={hexLogo} height={22} />
                </Typography>
                <TextWithTooltip title={fullFormattedHexBalance} text={available} />
                <TextWithTooltip title={fullFormattedStakedHexBalance} text={staked} />
                <TextWithTooltip title={fullFormattedHexTotalBalance} text={total} />
                <TextWithTooltip title={fullFormattedShareBalance} text={shares} />
            </CardContent>
        </Card>
    );
};

export default HexBalanceCard;
