//@flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
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
                <ul>
                    {this.props.posts.data.map( post => (
                        <li key={post.id}>
                            <Link to={`/posts/${post.id}`}>
                                <article className={post.filter && `filter-${post.filter}`} style={{ backgroundImage: `url(${this.context.picturesUrl + post.picture})`}}>
                                </article>
                            </Link>
                        </li>
                    ) )}
                </ul>
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