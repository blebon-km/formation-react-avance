// @flow

import {
    FETCH_POSTS_ERROR,
    FETCH_POSTS_LOADING,
    FETCH_POSTS_COMPLETE
} from '../actions';

import type { Post } from '../flow/types';

type Action = {
    type: string,
    posts?: Array<Post>,
    error?: ?{}
}

export type State = {
    isLoading: boolean,
    data: Array<Post>,
    error: ?{}
}

const defaultState = {
    isLoading: false,
    data: [],
    error: null
}

export default function( state:State = defaultState, action:Action ) {
    if ( action.type == FETCH_POSTS_LOADING )
    {
        return {
            ...state,
            isLoading: true,
            error: null
        }
    }
    if ( action.type == FETCH_POSTS_COMPLETE )
    {
        return {
            isLoading: false,
            error: null,
            data: action.posts
        }
    }
    if ( action.type == FETCH_POSTS_ERROR )
    {
        return {
            ...state,
            isLoading: false,
            error: action.error
        }
    }
    return state;
}