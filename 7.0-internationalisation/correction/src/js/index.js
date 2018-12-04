// Polyfill pour PhantomJS
import "core-js/es6/map";
import "core-js/es6/set";
import "whatwg-fetch";
import "promise-polyfill/src/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { addLocaleData } from "react-intl";
import frLocale from "react-intl/locale-data/fr";
import enLocale from "react-intl/locale-data/en";
import ConfigContext from './contexts/ConfigContext'
import config from 'config';
import { configureStore } from './store';
import App from './containers/App';

addLocaleData([...frLocale, ...enLocale]);
const browserHistory = createBrowserHistory({
    basename: config.basePath // racine du site concaténé aux URLs du Router
});

const store = configureStore( browserHistory );

ReactDOM.render(
    <Provider store={store}>
        <ConfigContext.Provider value={config}>
            <ConnectedRouter history={browserHistory}>
                <App />
            </ConnectedRouter>
        </ConfigContext.Provider>
    </Provider>
    , document.querySelector('#app-container')
);