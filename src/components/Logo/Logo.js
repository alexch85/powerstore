import React, { Fragment } from 'react';
import styles from './Logo.module.css';

import { Link } from 'react-router-dom';

const logo = (props) => {
  //Hero component logo
  let logo = (
    <div className={styles.LogoBig}>
      <img src='/images/logo.png' alt='Powerstore Logo' />
      <h2>Strength equipment provider since 1998</h2>
    </div>
  );
  //Navigation logo
  if (props.type === 'nav') {
    logo = (
      <Link to='/'>
        <div className={styles.LogoSmall}>
          <img src='/images/logo-small-white.svg' alt='Powerstore Logo' />
        </div>
      </Link>
    );
  }
  return <Fragment>{logo}</Fragment>;
};

export default logo;
