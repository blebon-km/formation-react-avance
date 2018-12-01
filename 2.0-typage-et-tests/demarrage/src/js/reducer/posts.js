import {
    FETCH_POSTS_ERROR,
    FETCH_POSTS_LOADING,
    FETCH_POSTS_COMPLETE
} from '../actions';

const defaultState = {
    isLoading: false,
    data: [],
    error: null
}

export default function( state = defaultState, action ) {
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