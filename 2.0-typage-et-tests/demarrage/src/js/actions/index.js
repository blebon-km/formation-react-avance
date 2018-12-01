import config from 'config';

export const FETCH_POSTS_LOADING = 'FETCH_POSTS_LOADING';
export const FETCH_POSTS_COMPLETE = 'FETCH_POSTS_COMPLETE';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

export function fetchPosts( hashtag = null ) {
    return function( dispatch ) {
        dispatch( { type: FETCH_POSTS_LOADING } );
        fetch( config.apiUrl + 'posts' + ( hashtag ? ('?hashtag=' + hashtag) : '' ) )
            .then( res => res.json() )
            .then( posts => dispatch( { type: FETCH_POSTS_COMPLETE, posts } ) )
            .catch( error => dispatch( { type: FETCH_POSTS_ERROR, error } ) )
    }
}

export const FETCH_POST_LOADING = 'FETCH_POST_LOADING';
export const FETCH_POST_COMPLETE = 'FETCH_POST_COMPLETE';
export const FETCH_POST_ERROR = 'FETCH_POST_ERROR';

export function fetchPost( id ) {
    return function (dispatch) {
        dispatch({ type: FETCH_POST_LOADING });
        fetch(config.apiUrl + 'posts/' + id)
            .then(res => res.json())
            .then(post => dispatch({ type: FETCH_POST_COMPLETE, post }))
            .catch(error => dispatch({ type: FETCH_POST_ERROR, error }))
    }
}