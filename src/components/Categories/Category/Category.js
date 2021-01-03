import React from 'react';
import styles from './Category.module.css';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const category = (props) => {
  return (
    <div className={styles.CategContainer}>
      <NavLink to={'/' + props.categName}>
        <img src={props.imageLink} alt='category' />
        <h2>{props.categName}</h2>
      </NavLink>
    </div>
  );
};

export default withRouter(category);
