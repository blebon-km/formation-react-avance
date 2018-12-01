import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from "connected-react-router";
import createRootReducer from '../reducer';

export function configureStore(browserHistory) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        createRootReducer(browserHistory),
        composeEnhancers(
            applyMiddleware(
                thunk,
                routerMiddleware(browserHistory)
            )
        )
    );
    return store;
}