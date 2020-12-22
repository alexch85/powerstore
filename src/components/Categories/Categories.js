import React from 'react';
import styles from './Categories.module.css';

import Category from './Category/Category';

const Categories = () => {
    return (
        <div className={styles.Categories}>
        <Category categName="Barbells" imageLink="/images/Product-categories/barbells.png"/>
        <Category categName="Accessories" imageLink="/images/Product-categories/belts.png"/>
        <Category categName="Plates" imageLink="/images/Product-categories/plates.png"/>
        <Category categName="Appearel" imageLink="/images/Product-categories/shirts.png"/>
        </div>
    )
}

export default Categories
