import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type Props = {
    title: string
    message: string
}

export const Message = ({ title, message }: Props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h2' align='center' justifyContent='center'>
                    {title}
                </Typography>
                <Typography variant='h5' align='center' justifyContent='center'>
                    {message}
                </Typography>
            </CardContent>
        </Card>
    );
};

export const titleText = {
    error: 'Error',
    loading: 'Please Wait',
};

export const errorMessage = {
    chain: 'could not connect to the chain',
    hexContract: 'could not construct the HEX contract',
    safeAddress: 'could not retrieve safe address',
    balances: 'Token balances not found. Try refreshing the page.',
    authoritativeTimestamps: 'Unable to load authoritative timestamps from the blockchain...',
    stakes: 'No Active Stakes Found.',
};

export const loadingMessage = {
    authoritativeTimestamps: 'Loading authoritative timestamps from the blockchain...',
    stakes: 'Loading stakes...',
};

export default Message;
