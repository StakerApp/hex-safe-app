import Grid from '@material-ui/core/Grid';
import { AppContextProvider } from './context/AppContext';
import { StakeDataContextProvider } from './context/StakeDataContext';
import './css/main.css';
import HexBalanceCard from './features/balances/HexBalanceCard';
import { HexClock } from './features/HexClock';
import { ActiveStakeTable } from './features/stakes/activeStakes/ActiveStakeTable';
import StakeStart from './features/stakes/newStakes/StakeStart';

const App = (): React.ReactElement => {
    return (
        <AppContextProvider>
            <Grid container justifyContent="space-between" direction="row-reverse" spacing={3}>
                <Grid item xs={12} sm={12} md={3} lg={2}>
                    <StakeDataContextProvider>
                        <HexBalanceCard />
                    </StakeDataContextProvider>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8}>
                    <HexClock />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={2}>
                    <StakeStart />
                </Grid>
                <Grid item xs={12}>
                    <StakeDataContextProvider>
                        <ActiveStakeTable />
                    </StakeDataContextProvider>
                </Grid>
            </Grid>
        </AppContextProvider>
    );
};

export default App;
