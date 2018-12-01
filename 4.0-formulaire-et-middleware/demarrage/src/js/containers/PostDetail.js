// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchPost } from '../actions';
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
    }
}

export class PostDetail extends React.Component<Props> {
    static contextType = ConfigContext

    render() {
        const { data, isLoading } = this.props.post;
        return (
            <Modal onClick={(event) => { this.props.dispatch( push( '/' )); console.log( event.target, event.currentTarget ); }}>
                <section className={`post-detail ${isLoading ? "is-loading" : ""}`}>
                    {
                        data && (
                            <div>
                                <div className="picture-container">
                                    <img src={this.context.picturesUrl + data.picture} alt="" />
                                </div>
                                <div className="infos-container">
                                    <time>{(new Date(data.createdAt)).toLocaleString()}</time>
                                    <p className="description">
                                        {data.description}
                                    </p>
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

export default connect( mapStateToProps )( PostDetail );