import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
    children: React.Node,
    onClick: Function
}

let wrapper;
let overlay;

export default function Modal( props: Props ) {
    return ReactDOM.createPortal(
        <div className="overlay" ref={ elem => overlay = elem } onClick={( event ) => {
            if ( event.target == wrapper || event.target == overlay )
            {
                props.onClick()
            }
        }}>
            <div className="modal-wrapper" ref={ elem => wrapper = elem}>
                {props.children}
            </div>
        </div>,
        document.querySelector('#modal-container')
    )
}