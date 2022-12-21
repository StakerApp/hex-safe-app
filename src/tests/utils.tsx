import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { Message } from '../utils/Message';

const AllTheProviders: FC = ({ children }) => {
    return (
        <SafeProvider
            loader={
                <Message title={'Please Wait'} message={'Waiting for Safe...'} />
            }
        >
            {children}
        </SafeProvider>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
