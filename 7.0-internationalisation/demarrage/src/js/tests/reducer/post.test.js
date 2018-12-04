jest.mock('config', () => {
    return {
        basePath: '/',
        baseUrl: 'http://localhost/',
        apiUrl: 'http://localhost/api/',
        picturesUrl: 'http://localhost/uploads/pictures/',
    };
}, { virtual: true });

import postReducer from '../../reducer/post';
import {
    FETCH_POST_LOADING,
    FETCH_POST_COMPLETE,
    FETCH_POST_ERROR,
} from '../../actions';

describe( 'postReducer', function() {
    it( 'should return the right state when a FETCH_POST_LOADING action is dispatched', function() {
        const state = { isLoading: false, data: null, error: null };
        const newState = postReducer( state, {
            type: FETCH_POST_LOADING
        } );

        expect( newState ).toEqual( { isLoading: true, data: null, error: null } )
    } )

    it ( 'should return the right state when a FETCH_POST_COMPLETE action is dispatched', function() {
        const state = { isLoading: true, data: null, error: null };
        const post = { id: 42, description: 'new post', picture: 'newpost.jpg', comments: [], createdAt: '2018-11-28T16:21:01+00:00' };
        const newState = postReducer(state, {
            type: FETCH_POST_COMPLETE,
            post
        });

        expect(newState).toEqual({ isLoading: false, data: post, error: null })
    } )

    it( 'should return the right state when a FETCH_POST_ERROR action is dispatched', function () {
        const state = { isLoading: true, data: null, error: null };
        const error = { message: 'An error occured !' };
        const newState = postReducer( state, {
            type: FETCH_POST_ERROR,
            error
        } );

        expect( newState ).toEqual( { isLoading: false, data: null, error } )
    } )

    it( 'should return the initial state when any other action is dispatched', function() {
        const initialState = { isLoading: false, data: { id: 42, description: "new post", picture: "newpost.jpg", comments: [], createdAt: "2018-11-28T16:21:01+00:00" }, error: null };
        const newState = postReducer(initialState, {
            type: 'RANDOM_ACTION'
        });

        expect(newState).toEqual( initialState )
    } )

    it( 'should return the default state when no initial state is passed', function() {
        const state = postReducer( undefined, { type: '@@INIT' } );

        expect( state ).toEqual( { isLoading: false, data: null, error: null } );
    } )
} )