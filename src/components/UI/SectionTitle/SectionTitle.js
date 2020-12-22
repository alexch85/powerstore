import React from 'react'
import styles from './SectionTitle.module.css'

const sectionTitle = (props) => {
    return (
        <div className={styles.SectionContainer}>
            <div className={styles.SectionTitle}>
            {props.children}
            </div>
        </div>
    )
}

export default sectionTitle;
