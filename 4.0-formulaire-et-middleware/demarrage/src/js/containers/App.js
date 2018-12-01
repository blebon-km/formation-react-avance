import React from 'react';
import { Route, withRouter } from 'react-router';
import Menu from '../components/Menu';
import PostList from './PostList';
import PostDetail from './PostDetail';

class App extends React.Component {
    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    <Route path="/" component={PostList} />
                    <Route exact path="/posts/:id" component={PostDetail} />
                </div>
            </div>
        )
    }
}

export default withRouter( App );