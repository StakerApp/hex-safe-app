import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Message, titleText } from './utils/Message';

ReactDOM.render(
    <React.StrictMode>
        <SafeProvider
            loader={
                <Message title={titleText.loading} message={'Waiting for Safe...'} />
            }
        >
            <App />
        </SafeProvider>,
    </React.StrictMode>,
    document.getElementById('root'),
);
