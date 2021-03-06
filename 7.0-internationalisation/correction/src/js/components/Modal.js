import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

type Props = {
    children: React.Node,
    onClick: Function,
    display: boolean
}

let wrapper;
let overlay;

export default function Modal( props: Props ) {
    return ReactDOM.createPortal(
        <CSSTransition in={props.display} classNames="modal-appear" unmountOnExit timeout={500}>
            <div className="overlay" ref={ elem => overlay = elem } onClick={( event ) => {
                if ( event.target == wrapper || event.target == overlay )
                {
                    props.onClick()
                }
            }}>
                <div className="modal-wrapper" ref={ elem => wrapper = elem}>
                    {props.children}
                </div>
            </div>
        </CSSTransition>,
        document.querySelector('#modal-container')
    )
}