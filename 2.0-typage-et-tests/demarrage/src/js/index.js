import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import config from 'config';

import { configureStore } from './store';
import App from './containers/App';

const browserHistory = createBrowserHistory({
    basename: config.basePath // racine du site concaténé aux URLs du Router
});

const store = configureStore( browserHistory );

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
            <App />
        </ConnectedRouter>
    </Provider>
    , document.querySelector('#app-container')
);