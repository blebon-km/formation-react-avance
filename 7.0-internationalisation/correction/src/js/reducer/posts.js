// @flow
import {Record, List, Map} from 'immutable';
import type {RecordFactory, RecordOf} from 'immutable';

import {
    FETCH_POSTS_ERROR,
    FETCH_POSTS_LOADING,
    FETCH_POSTS_COMPLETE
} from '../actions';

import type { Post } from '../flow/types';

type Action = {
    type: string,
    data?: Array<Post>,
    error?: ?{}
}

type StateProps = {
	isLoading: boolean,
    data: List<Post>,
    error: ?Map<string,any>
};
export type State = RecordOf<StateProps>

const stateFactory:RecordFactory<StateProps> = Record({
    isLoading: false,
    data: List([]),
    error: null
});
const defaultState = stateFactory();

export default function( state:State = defaultState, action:Action ):State {
    if ( action.type == FETCH_POSTS_LOADING )
    {
        return state.set('isLoading', true);
    }
    if ( action.type == FETCH_POSTS_COMPLETE )
    {
        return state.merge({
            isLoading: false,
            error: null,
            data: List( action.data || [])
        });
    }
    if ( action.type == FETCH_POSTS_ERROR )
    {
        return state.merge({
            isLoading: false,
            error: action.error && Map(action.error)
        });
    }
    return state;
}