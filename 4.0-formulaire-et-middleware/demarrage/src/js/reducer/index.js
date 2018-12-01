import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";
import postsReducer from './posts';
import postReducer from './post';

export default history => combineReducers({
    router: connectRouter( history ),
    posts: postsReducer,
    post: postReducer
});