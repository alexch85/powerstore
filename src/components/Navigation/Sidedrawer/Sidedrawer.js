import React, { Fragment } from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const sideDrawer = (props) => {
  //change attached styles depending on open props
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <FontAwesomeIcon
          className={styles.CloseIcon}
          icon={faTimes}
          onClick={props.closed}
        />
        <nav>
          <NavigationItems
            isAuthenticated={props.isAuth}
            onClick={props.closed}
            sideDrawer={true}
            closed={props.closed}
          />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
