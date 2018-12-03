import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from 'redux-form'; 
import postsReducer from './posts';
import postReducer from './post';

export default history => combineReducers({
    form: formReducer,
    router: connectRouter( history ),
    posts: postsReducer,
    post: postReducer
});