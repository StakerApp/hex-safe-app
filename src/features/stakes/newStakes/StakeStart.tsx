import { yupResolver } from '@hookform/resolvers/yup';
import { CardContent, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { BigNumber } from 'ethers';
import { useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AppContext } from '../../../context/AppContext';
import { heartsToHexNumber, hexNumberToHearts } from '../../../utils/hexHelpers';
import { SubmitButton } from './SubmitButton';

export const StakeStart = () => {
    const ctx = useContext(AppContext);
    const hexContract = ctx.hexContract!;
    const hearts = ctx.heartsBalance;
    const hexBalance = heartsToHexNumber(hearts);

    const startStakeSchema = yup.object().shape({
        amount: yup.number().typeError('Amount must be a number.')
            .required()
            .positive('Amount must be greater than zero.')
            .max(hexBalance, `Amount must be less than or equal to your current balance: ${hexBalance}`)
            .test('maxDigitsAfterDecimal', 'Number field must have 8 digits after decimal or fewer',
                (hex) => /^\d+(\.\d{1,8})?$/.test(String(hex)),
            ),
        days: yup.number().typeError('Days must be a number.')
            .required()
            .positive('Number of days must be greater than zero.')
            .integer('Number of days must be an integer')
            .max(5555),
    }).required();

    type Inputs = yup.InferType<typeof startStakeSchema>
    const { control, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(startStakeSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const stakeHearts: BigNumber = hexNumberToHearts(Number(data.amount));
        const stakeDays: number = Number(data.days);
        stakeStart(stakeHearts, stakeDays);
    };

    const stakeStart = (stakeHearts: BigNumber, stakeDays: number) => {
        hexContract.stakeStart(stakeHearts, stakeDays);
    };

    return (
        <Card sx={{ minWidth: 250, minHeight: 250, alignItems: 'center' }}>
            <CardContent>
                <Typography variant="h5" align='left'>
                    Stake
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="amount"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label='Amount of HEX to Stake'
                                            variant='outlined'
                                            fullWidth={true}
                                            error={!!errors.amount}
                                            helperText={errors.amount?.message || ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="days"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label='Number of Days to Stake'
                                            variant='outlined'
                                            fullWidth={true}
                                            error={!!errors.days}
                                            helperText={errors.days?.message || ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SubmitButton children={'Start Stake'} disabled={false} />
                            </Grid>
                        </Grid>
                    </form >
                </Typography>
            </CardContent>
        </Card >
    );
};

export default StakeStart;
