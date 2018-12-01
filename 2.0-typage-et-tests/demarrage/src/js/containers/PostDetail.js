import React from 'react';
import { connect } from 'react-redux';
import config from 'config';
import { fetchPost } from '../actions';

class PostDetail extends React.Component {
    render() {
        const { data, isLoading } = this.props.post;
        return <section className={`post-detail ${isLoading ? "is-loading" : ""}`}>
            {
                data && (
					<div>
						<div className="picture-container">
							<img src={config.picturesUrl + data.picture} alt="" />
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
        </section>;
    }

    componentDidMount() {
        this.props.dispatch( fetchPost( this.props.match.params.id ) )
    }
}

function mapStateToProps( state ) {
    return {
        post: state.post
    };
}

export default connect( mapStateToProps )( PostDetail );