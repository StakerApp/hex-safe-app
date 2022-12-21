import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

type Props = {
    message: string
}

export const Warning = ({ message }: Props) => {
    return (
        <Alert variant="filled" severity="warning">
            <AlertTitle>Warning</AlertTitle>
            {message}
        </Alert>
    );
};

export const warningMessages = {
    ees: 'Funds may be lost! Ending a stake before the due date can incur significant penalties, up to 100% of principal and amount accrued! Be sure you know what you are doing!',
    cancellation: 'Please ensure the gas fee is set sufficiently high or funds may be lost! Cancelling a pending stake will return your principal. However, if the transaction is not confirmed before midnight UTC, the entire amount may be lost!',
};

export default Warning;
