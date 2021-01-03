import React, { Fragment } from 'react';
import styles from './Button.module.css';

const Button = (props) => {
  let button = (
    <button
      className={styles.RegularButton}
      disabled={props.disabled}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
  if (props.type === 'action') {
    button = <button className={styles.ActionButton}>{props.children}</button>;
  }
  if (props.type === 'submit') {
    button = (
      <button
        type='submit'
        className={styles.RegularButton}
        disabled={props.disabled}
        onClick={props.clicked}
        onSubmit={props.submitted}>
        {props.children}
      </button>
    );
  }

  return <Fragment>{button}</Fragment>;
};

export default Button;
