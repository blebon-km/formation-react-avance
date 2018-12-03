// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { reduxForm, Field } from 'redux-form';
import {Map,List} from 'immutable';
import { fetchPost, addComment } from '../actions';
import type { State as PostState } from '../reducer/post';
import Modal from '../components/Modal';
import ConfigContext from "../contexts/ConfigContext";

type Props = {
    post: PostState,
    dispatch: Function,
    match: {
        params: {
            id: string
        }
    },
    handleSubmit: Function
}

export class PostDetail extends React.Component<Props> {
    static contextType = ConfigContext

    render() {
		const data:?Map<string,any> = this.props.post.get('data'),
			filter:?string = data ? data.get('filter') : null,
			picture:?string = data ? data.get('picture') : null,
			createdAt:?string = data ? data.get('createdAt') : null,
			description:?string = data ? data.get('description') : null,
			comments:?List<any> = data ? data.get('comments') : null,
			isLoading:?boolean = this.props.post.get('isLoading');
		return (
            <Modal onClick={() => { this.props.dispatch( push( '/' )) }}>
                <section className={`post-detail ${isLoading ? "is-loading" : ""}`}>
                    {
                        data && (
                            <div>
                                <div className="picture-container">
                                    <img className={ filter && `filter-${filter}` } src={this.context.picturesUrl + picture} alt="" />
                                </div>
                                <div className="infos-container">
                                    <time>{createdAt && new Date(createdAt).toLocaleString()}</time>
                                    <p className="description">
                                        {description}
                                    </p>
                                    <form onSubmit={this.props.handleSubmit}>
                                        <div className="form-group">
                                            <Field
                                                component="input"
                                                name="nickname"
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Votre pseudo"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <Field
                                                component="textarea"
                                                name="content"
                                                className="form-control form-control-sm"
                                                placeholder="Votre commentaire..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-sm">Ajouter</button>
                                        </div>
                                    </form>
                                    <ul className="comment-list">
                                        {comments && comments.map( comment => (
                                            <li key={comment.id}>
                                                <p>
                                                    <strong>{comment.get('nickname')}</strong>{' '}
                                                    {comment.get('content')}
                                                </p>
                                            </li>
                                        ) )}
                                    </ul>
								</div>
                            </div>
						)
                    }
                </section>
            </Modal>
        )

    }

    fetchPost() {
        this.props.dispatch( fetchPost( parseInt( this.props.match.params.id ) ) )
    }

    componentDidUpdate( prevProps: Props ) {
        if ( prevProps.match.params.id !== this.props.match.params.id )
        {
            this.fetchPost();
        }
    }

    componentDidMount() {
        this.fetchPost();
    }
}

function mapStateToProps( state ) {
    return {
        post: state.post
    };
}

PostDetail = connect( mapStateToProps )( PostDetail );
PostDetail = reduxForm({
    form: 'comment',
    onSubmit: (values, dispatch, props) => {
        const id: number = parseInt( props.match.params.id );
        return dispatch( addComment( id, values.content, values.nickname ) )
            .then( () => dispatch( fetchPost( id ) ) );
    },
})( PostDetail );

export default PostDetail;
