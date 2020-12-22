import React, { Fragment } from 'react';
import styles from './Cart.module.css';

// import NavigationItem from '../NavigationItem/NavigationItem';

import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const cart = (props) => {  
        let cartIcon = <FontAwesomeIcon icon={faShoppingCart} size='2x'/>;
        if (!props.empty) {
            cartIcon =  <Fragment>
                <FontAwesomeIcon icon={faShoppingCart}  size='2x'/>
                <div className={styles.ItemNum} >{props.itemNumber}</div>  
            </Fragment>
                
        }
        return (
        <div className={styles.Cart}>
            <NavLink to="/Cart">
            {cartIcon}
            </NavLink>  
        </div>
        )
}

export default cart
