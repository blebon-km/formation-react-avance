//@flow
import { Map, List, fromJS } from 'immutable';

import {
    FETCH_POST_ERROR,
    FETCH_POST_LOADING,
    FETCH_POST_COMPLETE
} from '../actions';

import type { Post } from '../flow/types';

type Action = {
    type: string,
    data?: Post,
    error?: ?{}
}

export type State = Map<string,any>;

const defaultState:State = Map({
    isLoading: false,
    data: null,
    error: null
});

export default function( state: State = defaultState, action: Action ):State {
    if ( action.type == FETCH_POST_LOADING )
    {
        return state.set('isLoading', true).set('data', null);
    }
    if ( action.type == FETCH_POST_COMPLETE )
    {
        return state.merge( {
            isLoading: false,
            error: null,
            data: fromJS(action.data)
        } );
    }
    if ( action.type == FETCH_POST_ERROR )
    {
		return state.merge( {
			data: null,
            isLoading: false,
            error: action.error
		} );
    }
    return state;
}