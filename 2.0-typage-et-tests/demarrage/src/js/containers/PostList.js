import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import config from 'config';
import { fetchPosts } from '../actions';

class PostList extends React.Component {
    constructor(...args) {
        super(...args);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <section className={`post-list ${this.props.posts.isLoading ? 'is-loading' : ''}`}>
                <div className="search-form">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <input className="form-control mr-sm-2" type="text" placeholder="hashtag" />
                        <button className="btn btn-secondary" type="submit">Rechercher</button>
                    </form>
                </div>
                <ul>
                    {this.props.posts.data.map( post => (
                        <li key={post.id}>
                            <Link to={`/posts/${post.id}`}>
                                <article style={{ backgroundImage: `url(${config.picturesUrl + post.picture})`}}>
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

    handleSubmit( event ) {
        event.preventDefault();
        this.props.dispatch( fetchPosts( event.currentTarget[0].value ) );
    }
}

function mapStateToProps( state ) {
    return {
        posts: state.posts
    };
}

export default connect( mapStateToProps )( PostList );