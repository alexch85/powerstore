import React, { Fragment } from 'react';
import styles from './NavigationItem.module.css';

const navigationItem = (props) => {
  let item = <li className={styles.NavigationItem}>{props.children}</li>;
  return <Fragment>{item}</Fragment>;
};

export default navigationItem;
