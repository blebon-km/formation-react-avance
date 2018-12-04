jest.mock('config', () => {
    return {
        basePath: '/',
        baseUrl: 'http://localhost/',
        apiUrl: 'http://localhost/api/',
        picturesUrl: 'http://localhost/uploads/pictures/',
    };
}, { virtual: true });

import {
    fetchPost,
    FETCH_POST_LOADING,
    FETCH_POST_COMPLETE,
    FETCH_POST_ERROR,
} from '../../actions';

/**
 * @see https://github.com/jefflau/jest-fetch-mock#installation-and-setup
 * @see https://jestjs.io/docs/en/mock-functions
 */
describe( 'fetchPost action creator', function() {
    beforeEach(function() {
        fetch.resetMocks()
    })

    it( 'should dispatch a FETCH_POST_LOADING action', function() {
        fetch.mockResponse( JSON.stringify( { post: {} } ) );
        const dispatch = jest.fn( () => {} );

        fetchPost( 42 )( dispatch );

        expect( dispatch.mock.calls.length ).toBeGreaterThanOrEqual( 1 );
        expect( dispatch.mock.calls[ 0 ][ 0 ] ).toEqual( { type: FETCH_POST_LOADING } );
    } )

    it( 'should dispatch a FETCH_POST_COMPLETE with the data returned by the webservice', function() {
        const post = { id: 42, description: 'new post', picture: 'newpost.jpg', comments: [], createdAt: '2018-11-28T16:21:01+00:00' };
        fetch.mockResponse( JSON.stringify( post ) );
        const dispatch = jest.fn( () => {} );
        
        return fetchPost( 42 )( dispatch ).then( () => {
            expect( dispatch.mock.calls.length ).toBe( 2 );
            expect( dispatch.mock.calls[ 1 ][ 0 ] ).toEqual( { type: FETCH_POST_COMPLETE, post } );
        } );
    } )

    it( 'should dispatch a FETCH_POST_ERROR when an error occurs', function () {
        const error = new Error( 'fake error message' );
        fetch.mockReject( error );
        const dispatch = jest.fn( () => {} );

        fetchPost( 42 )( dispatch ).then( () => {
            expect( dispatch.mock.calls.length ).toBe( 2 );
            expect( dispatch.mock.calls[ 1 ][ 0 ] ).toEqual( { type: FETCH_POST_ERROR, error } );
        } );
    } )
} )