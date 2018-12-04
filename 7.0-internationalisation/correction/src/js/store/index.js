import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from "connected-react-router";
import createRootReducer from '../reducer';
import fetchMiddleware from './fetchMiddleware';

export function configureStore(browserHistory) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        createRootReducer(browserHistory),
        composeEnhancers(
            applyMiddleware(
                fetchMiddleware,
                routerMiddleware(browserHistory)
            )
        )
    );
    return store;
}