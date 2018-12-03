// @flow
import {RecordFactory, Record, RecordOf, List, fromJS} from 'immutable';
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
// // Use RecordFactory<TProps> for defining new Record factory functions.
// type PersonProps = { name: ?string, favoriteColor: string };
// const makePerson: RecordFactory<PersonProps> = Record({ name: null, favoriteColor: 'unknown' });

// // Use RecordOf<T> for defining new instances of that Record.
// type Person = RecordOf<PersonProps>;
// const alan: Person = makePerson({ name: 'Alan' });


export type State = RecordOf<{
    isLoading: boolean,
    data: List<Post>,
    error: ?{}
}>

const defaultState = Record({
    isLoading: false,
    data: List([]),
    error: null
})();

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
            data: fromJS(
				action.data,
				(key, value, path)=> path.length == 1  ? value.toObject() : value.toList()
			)
        });
    }
    if ( action.type == FETCH_POSTS_ERROR )
    {
        return state.merge({
            isLoading: false,
            error: fromJS(action.error)
        });
    }
    return state;
}