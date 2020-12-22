import React from 'react';
import styles from './QuantityCounter.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';


const QuantityCounter = (props) => {
    return (
        <div className={styles.QuantityCounter}>
            <button onClick={props.decrement}><FontAwesomeIcon icon ={faMinus}/> </button> 
            <div className={styles.QuantityNum}>{props.quant}</div>
            <button onClick={props.increment}><FontAwesomeIcon icon={faPlus}/></button>
        </div>
    )
}

export default QuantityCounter;
