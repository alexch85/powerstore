import React, { Fragment } from 'react';
import styles from './PageTitle.module.css';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PageTitle = (props) => {
  let pageTitle = (
    <div className={styles.PageTitle}>
      <h2>{props.title}</h2>
    </div>
  );
  if (props.category) {
    pageTitle = (
      <div className={styles.PageTitle}>
        <h4>
          <NavLink to={'/' + props.category}>{props.category}</NavLink>
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ fontSize: '0.7em', margin: '0 5px' }}
          />
          {props.title}
        </h4>
      </div>
    );
  }
  return <Fragment>{pageTitle}</Fragment>;
};

export default PageTitle;
