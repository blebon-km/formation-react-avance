import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Menu from '../components/Menu';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import { CSSTransition } from 'react-transition-group';
import { IntlProvider } from 'react-intl';
import { changeLocale } from '../actions';

class App extends React.Component {
    render() {
        return (
            <IntlProvider locale={this.props.intl.locale} messages={this.props.intl.messages}>
                <div>
                    <Menu locale={this.props.intl.locale} onLocaleChange={this.handleLocaleChange} />
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
            </IntlProvider>
        )
    }

    handleLocaleChange = ( locale ) => {
        this.props.dispatch( changeLocale( locale ) );
    }
}

function mapStateToProps(state) {
    return {
        intl: state.intl
    }
}

App = connect(mapStateToProps)( App );
export default withRouter( App );
