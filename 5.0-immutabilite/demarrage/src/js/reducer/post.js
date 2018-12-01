//@flow

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

export type State = {
    isLoading: boolean,
    data: ?Post,
    error: ?{}
}

const defaultState:State = {
    isLoading: false,
    data: null,
    error: null
}

export default function( state: State = defaultState, action: Action ) {
    if ( action.type == FETCH_POST_LOADING )
    {
        return {
            data: null,
            isLoading: true,
            error: null
        }
    }
    if ( action.type == FETCH_POST_COMPLETE )
    {
        return {
            isLoading: false,
            error: null,
            data: action.data
        }
    }
    if ( action.type == FETCH_POST_ERROR )
    {
        return {
            data: null,
            isLoading: false,
            error: action.error
        }
    }
    return state;
}