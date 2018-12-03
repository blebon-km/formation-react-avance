jest.mock('config', () => {
    return {
        basePath: '/',
        baseUrl: 'http://localhost/',
        apiUrl: 'http://localhost/api/',
        picturesUrl: 'http://localhost/uploads/pictures/',
    };
}, { virtual: true });

import postsReducer from '../../reducer/posts';
import {
    FETCH_POSTS_LOADING,
    FETCH_POSTS_COMPLETE,
    FETCH_POSTS_ERROR,
} from '../../actions';

describe('postsReducer', function () {
    it('should return the right state when a FETCH_POSTS_LOADING action is dispatched', function () {
        const state = { isLoading: false, data: [], error: null };
        const newState = postsReducer(state, {
            type: FETCH_POSTS_LOADING
        });

        expect(newState).toEqual({ isLoading: true, data: [], error: null })
    })

    it('should return the right state when a FETCH_POSTS_COMPLETE action is dispatched', function () {
        const state = { isLoading: true, data: [], error: null };
        const posts = [
            { id: 42, description: 'new post', picture: 'newpost.jpg', comments: [], createdAt: '2018-11-28T16:21:01+00:00' }
        ]
        const newState = postsReducer(state, {
            type: FETCH_POSTS_COMPLETE,
            posts
        });

        expect(newState).toEqual({ isLoading: false, data: posts, error: null })
    })

    it('should return the right state when a FETCH_POSTS_ERROR action is dispatched', function () {
        const state = { isLoading: true, data: [], error: null };
        const error = { message: 'An error occured !' };
        const newState = postsReducer(state, {
            type: FETCH_POSTS_ERROR,
            error
        });

        expect(newState).toEqual({ isLoading: false, data: [], error })
    })

    it('should return the initial state when any other action is dispatched', function () {
        const initialState = { isLoading: false, data: [ { id: 42, description: "new post", picture: "newpost.jpg", comments: [], createdAt: "2018-11-28T16:21:01+00:00" } ], error: null };
        const newState = postsReducer(initialState, {
            type: 'RANDOM_ACTION'
        });

        expect(newState).toEqual(initialState)
    })

    it('should return the default state when no initial state is passed', function () {
        const state = postsReducer(undefined, { type: '@@INIT' });

        expect(state).toEqual({ isLoading: false, data: [], error: null });
    })
})