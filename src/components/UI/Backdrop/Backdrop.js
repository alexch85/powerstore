import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = (props) => {
    let backDropClass = styles.Backdrop
    if (props.type === 'menu') {
        backDropClass = styles.MenuBackdrop
    }
    return (
    props.show ? <div className={backDropClass} onClick={props.clicked}></div> : null
    )
}

export default Backdrop;
