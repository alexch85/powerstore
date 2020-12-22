import React from 'react';
import styles from './Footer.module.css';

const footer = () => {
    return (
        <div className={styles.FooterContainer}>
        {/* <div className={styles.TopFooter}>
        Find us on social media
        <SocialM/>
        </div> */}
        <div className={styles.BottomFooter}>
        <p>&#169; Powerstore | Website Designed and Manged by AC design & development</p>
        </div>
        </div>
    )
}

export default footer
