import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';

type Props = {
    title: string
    text: string
    align?: 'left' | 'center' | 'right'
}

export const TextWithTooltip: React.FC<Props> = ({ title, text, align }: Props) => {
    return (
        <>
            {!align && (
                <Tooltip title={title}>
                    <Typography variant="body1" align='center'>
                        {text}
                    </Typography>
                </Tooltip>
            )}
            {align && (<Tooltip title={title}>
                <Typography variant="body1" align={align}>
                    {text}
                </Typography>
            </Tooltip>
            )}
        </>
    );
};

export default TextWithTooltip;
