import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default function Menu( props ) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Reactagram</Link>
                    </div>

                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-items">
                            <Link className="nav-link" to="/posts/new">
                                <FormattedMessage id="app.add_picture" />
                            </Link>
                        </li>
                        <li className="nav-items">
                            <a className="nav-link" href="#" onClick={( event ) => {
                                event.preventDefault();
                                props.onLocaleChange(props.locale == 'fr' ? 'en' : 'fr')
                            }}>
                                {props.locale == 'fr' ? 'en' : 'fr'}
                            </a>
                        </li>                        
                    </ul>
                </div>    
            </nav>
        </header>
    );
}