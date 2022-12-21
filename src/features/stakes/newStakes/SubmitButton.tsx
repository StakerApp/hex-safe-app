import Button from '@mui/material/Button';

type Props = {
    children: string
    disabled: boolean
}

export const SubmitButton = ({ children, disabled }: Props) => {
    return (
        <Button size='large' color='primary' type='submit' variant='contained' disabled={disabled} >
            {children}
        </Button>
    );
};

export default SubmitButton;
