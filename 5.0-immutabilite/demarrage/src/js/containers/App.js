import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import Menu from '../components/Menu';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostForm from './PostForm';

class App extends React.Component {
    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    <Route path="/" component={PostList} />
                    <Switch>
                        <Route exact path="/posts/new" component={PostForm} />
                        <Route exact path="/posts/:id" component={PostDetail} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter( App );