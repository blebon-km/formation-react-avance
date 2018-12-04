// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { addPost, fetchPosts } from '../actions';
import Modal from '../components/Modal';
import ConfigContext from "../contexts/ConfigContext";

type Props = {
    dispatch: Function,
    handleSubmit: Function,
    submitting: boolean,
    display: boolean
}


const selector = formValueSelector( 'post' );

// Permet de gérer les file input avec redux form
const handleChange = (handler) => ({ target: { files } }) =>
    handler(files.length ? files[0] : null );

function FileInput({
    input: { onChange, onBlur, value: omitValue, ...inputProps },
    meta: omitMeta,
    ...props
})
{
    return (
        <input type="file"
            onChange={handleChange(onChange)} onBlur={handleChange(onBlur)}
            {...inputProps} {...props} />
    );
}

export class PostForm extends React.Component<Props> {
    static contextType = ConfigContext

    render() {
        return (
            <Modal display={this.props.display} onClick={() => { this.props.dispatch(push('/')) }}>
                <section className={`post-form`}>
                    <h3>Ajouter une photo</h3>
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="form-group">
                            <label>Photo</label>
                            <Field
                                component={FileInput}
                                className="form-control"
                                disabled={this.props.submitting}
                                name="pictureFile"
                            />
                        </div>
                        <div className="form-group">
                            <label>Photo</label>
                            <Field
                                component="select"
                                className="form-control"
                                name="filter"
                                disabled={this.props.submitting}
                            >
                                <option value="">Sans filtre</option>
                                <option value="1977">1977</option>
                                <option value="crema">Crema</option>
                                <option value="inkwell">Inkwell</option>
                                <option value="xpro-ii">X-Pro II</option>
                            </Field>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <Field
                                component="textarea"
                                className="form-control"
                                name="description"
                                disabled={this.props.submitting}
                                placeholder="Votre description..."
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                disabled={this.props.submitting}
                                className="btn btn-primary">
                                Ajouter
                            </button>
                        </div>
                    </form>
                </section>
            </Modal>
        )

    }
}

PostForm = connect()(PostForm);
PostForm = reduxForm({
    form: 'post',
    onSubmit: (values, dispatch, props) => {
        return dispatch( addPost( values ) )
            .then( 
                () => {
                    dispatch( fetchPosts() );
                    dispatch( push( '/' ) )
                }
            );
    },
})(PostForm);

export default PostForm;
