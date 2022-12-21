import App from '../App';
import { render, screen } from './utils';

test('renders learn loading screen', () => {
    render(<App />);
    const waitingHeading = screen.getByText(/Waiting for Safe/i);
    expect(waitingHeading).toBeInTheDocument();
});
