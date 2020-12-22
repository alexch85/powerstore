import React from 'react';
import styles from './SortOptions.module.css';

const SortOptions = (props) => {
    return (
        <div className={styles.SortOptions}>
        <div>
            <p>Sort By</p> 
            <select >
                <option value='all'>All {props.productName}</option>
                <option value='new'>New {props.productName}</option>
            </select>
        </div>
        <div>
            Price 
            <select>
                <option>Low to High</option>
                <option>High to Low</option>
            </select>
        </div>
            
        </div>
    )
}

export default SortOptions
