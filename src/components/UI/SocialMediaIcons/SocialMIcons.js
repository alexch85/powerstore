import React from 'react'
import styles from './SocialMIcons.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const SocialMIcons = () => {
    return (
        <div className={styles.SocialMIcons}>
        <a href='http://www.facebook.com/' target="_blank" rel="noopener noreferrer">
         <FontAwesomeIcon  icon={faFacebook} size='2x'/>   
        </a>
        <a href='http://www.instagram.com/' target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon  icon={faInstagram} size='2x'/>
        </a>
        </div>
    )
}

export default SocialMIcons
