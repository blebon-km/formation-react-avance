import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
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
                                Ajouter une photo
                            </Link>
                        </li>
                    </ul>
                </div>    
            </nav>
        </header>
    );
}