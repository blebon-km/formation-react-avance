import {
    FETCH_POST_ERROR,
    FETCH_POST_LOADING,
    FETCH_POST_COMPLETE
} from '../actions';

const defaultState = {
    isLoading: false,
    data: null,
    error: null
}

export default function( state = defaultState, action ) {
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
            data: action.post
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