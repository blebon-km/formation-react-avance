//@flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import type { State as PostsState } from '../reducer/posts';
import ConfigContext from '../contexts/ConfigContext';

type Props = {
    posts: PostsState,
    dispatch: Function
}

export class PostList extends React.Component<Props> {
    static contextType = ConfigContext;
    searchInput: ?HTMLInputElement

    constructor(...args: any[]) {
        super(...args);
    }

    render() {
        return (
            <section className={`post-list ${this.props.posts.isLoading ? 'is-loading' : ''}`}>
                <div className="search-form">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <input className="form-control mr-sm-2" name="search" type="text" placeholder="hashtag" ref={ elem => this.searchInput = elem} />
                        <button className="btn btn-secondary" type="submit">Rechercher</button>
                    </form>
                </div>
                <TransitionGroup component="ul">
                    {this.props.posts.data.map(post => (
                        <CSSTransition key={post.id} classNames="post-appear" timeout={500}>
                            <li>
                                <Link to={`/posts/${post.id}`}>
                                    <article className={post.filter && `filter-${post.filter}`} style={{ backgroundImage: `url(${this.context.picturesUrl + post.picture})` }}>
                                    </article>
                                </Link>
                            </li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </section>
        );
    }

    componentDidMount() {
        this.props.dispatch( fetchPosts() )
    }

    handleSubmit = ( event: Event ) => {
        event.preventDefault();
        this.props.dispatch(fetchPosts( this.searchInput && this.searchInput.value ) );
    }
}

function mapStateToProps( state ) {
    return {
        posts: state.posts
    };
}

export default connect( mapStateToProps )( PostList );