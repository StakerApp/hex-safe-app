import Box from '@mui/material/Box';
import { percentFormatter } from '../../../utils/hexHelpers';

type Props = {
    percent: number
}

export const Progress = ({ percent }: Props) => {
    return (
        <Box
            sx={{
                width: 1,
                backgroundColor: 'primary.light',
                borderRadius: 1,
            }}
        >
            <Box
                sx={{
                    width: `${percent}`,
                    height: 30,
                    backgroundColor: 'primary.dark',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                }}
                color='white'
            >{percentFormatter.format(percent)}

            </Box>
        </Box>


    );
};

export default Progress;
