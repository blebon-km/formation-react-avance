// @flow

import config from 'config';
import messages from '../messages'

export const FETCH_POSTS_LOADING = 'FETCH_POSTS_LOADING';
export const FETCH_POSTS_COMPLETE = 'FETCH_POSTS_COMPLETE';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

export function fetchPosts( hashtag:?string = null ) {
    return {
        actions: [ FETCH_POSTS_LOADING, FETCH_POSTS_COMPLETE, FETCH_POSTS_ERROR ],
        request: {
            url: config.apiUrl + 'posts' + (hashtag ? ('?hashtag=' + hashtag) : '')
        }
    };
}

export const FETCH_POST_LOADING = 'FETCH_POST_LOADING';
export const FETCH_POST_COMPLETE = 'FETCH_POST_COMPLETE';
export const FETCH_POST_ERROR = 'FETCH_POST_ERROR';

export function fetchPost( id:number ) {
    return {
        actions: [ FETCH_POST_LOADING, FETCH_POST_COMPLETE, FETCH_POST_ERROR ],
        request: {
            url: config.apiUrl + 'posts/' + id
        }
    };
}

export const ADD_COMMENT_LOADING = 'ADD_COMMENT_LOADING';
export const ADD_COMMENT_COMPLETE = 'ADD_COMMENT_COMPLETE';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export function addComment( postId: number, content: string, nickname: string ) {
    return {
        actions: [ ADD_COMMENT_LOADING, ADD_COMMENT_COMPLETE, ADD_COMMENT_ERROR ],
        request: {
            method: 'POST',
            url: config.apiUrl + 'comments',
            data: { content, postId, nickname }
        }
    };
}

export const ADD_POST_LOADING = 'ADD_POST_LOADING';
export const ADD_POST_COMPLETE = 'ADD_POST_COMPLETE';
export const ADD_POST_ERROR = 'ADD_POST_ERROR';

export function addPost( values:{} ) {
    return {
        actions: [ ADD_POST_LOADING, ADD_POST_COMPLETE, ADD_POST_ERROR ],
        request: {
            isMultipart: true,
            method: 'POST',
            url: config.apiUrl + 'posts/upload',
            data: values
        }
    };
}

export const CHANGE_LOCALE = 'CHANGE_LOCALE';

export function changeLocale( locale: string ) {
    return {
        type: CHANGE_LOCALE,
        locale,
        messages: messages[ locale ]
    }
}