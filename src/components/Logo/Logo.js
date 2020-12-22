import React, { Fragment } from 'react';
import styles from './Logo.module.css';

import { Link } from 'react-router-dom';

const logo = (props) => {
    let logo = (
      <div  className={styles.LogoBig}> 
      <img src="/images/logo.png" alt="Powerstore Logo"/> 
       </div> 
      ) 
              
    if (props.type === 'nav') {
        logo =  (
          <Link to="/">
          <div className={styles.LogoSmall}> 
          <img src="/images/logo.png" alt="Powerstore Logo"/>
          </div> 
          </Link>
        )
    }
    return (
      <Fragment>
        {logo}
      </Fragment>
    )
}

export default logo;
