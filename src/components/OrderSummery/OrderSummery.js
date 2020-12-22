import React from 'react'
import styles from './OrderSummery.module.css'

import Button from '../UI/Button/Button';

const orderSummery = (props) => {
    return (
        <div className={styles.OrderSummery}>
        <h3>ORDER SUMMERY</h3>
        <div className={styles.OrderTotals}>
            <div className={styles.OrderTotalsField}><h5>Order Total</h5>${(props.price).toFixed(2)}</div>
            <hr/>
            <div className={styles.OrderTotalsField}><h5><i>Shipping</i></h5> TBE </div>
            <hr/>
            <div className={styles.OrderTotalsField}><h4>Total</h4><b>${(props.price).toFixed(2)}</b></div>
        </div>
        <Button clicked={props.clicked} disabled={!props.disable}>CHECKOUT</Button>
        </div>
    )
}

export default orderSummery;
