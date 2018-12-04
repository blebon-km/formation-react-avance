import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import Menu from '../components/Menu';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import { CSSTransition } from 'react-transition-group';

class App extends React.Component {
    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    <Route path="/" component={PostList} />
                    <Route exact path="/posts/new" children={({ match }) => (
                        <PostForm display={!!match} />
                    )} />
                    <Route exact path="/posts/:id" children={({ match }) => (
                        <PostDetail display={match && match.params.id !== 'new'} match={match} />
                    )} />
                </div>
            </div>
        )
    }
}

export default withRouter( App );