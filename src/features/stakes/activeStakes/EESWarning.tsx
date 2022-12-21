import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../../css/main.css';
import { StakeIdentifier } from '../../../utils/customTypes';
import { warningMessages } from '../../../utils/Warning';

type Props = {
    earlyEndStakeHandler: (stake: StakeIdentifier) => void
    closeHandler: () => void
    stake: StakeIdentifier
}

export const EESWarning = ({ earlyEndStakeHandler, closeHandler, stake }: Props) => {
    const eesHandler = () => {
        earlyEndStakeHandler(stake);
    };

    return (
        <div>
            <Typography variant="h2" component="h2">
                Warning!
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
                {warningMessages.ees}
            </Typography>
            <Typography sx={{ mt: 5 }} display='flex' justifyContent='space-between'>
                <Button color='primary' variant='contained' size="large" onClick={closeHandler}>Back</Button>
                <Button color='error' variant='contained' size="large" onClick={eesHandler}>End Stake Early</Button>
            </Typography>
        </div>
    );
};

export default EESWarning;
