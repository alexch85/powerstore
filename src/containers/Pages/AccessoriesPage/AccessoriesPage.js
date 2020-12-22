import React from 'react'
import styles from './AccessoriesPage.module.css'

import SortOptions from '../../../components/SortOptions/SortOptions';
import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import Product from '../../components/Product/Product';

import { connect } from 'react-redux'


const productCategory = ({access}) => {
    let products = access.map(product => (
        <Product name={product.name} descript={product.description} price={product.price} img={product.img}/>
    ))
    return (
        <div className={styles.ProductCategory}>
        <PageTitle title={'Accessories'}/>
        <div className={styles.PageContent}>
            <SortOptions/>
            <div className={styles.Products}>
            {products}
            </div>   
        </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        access: state.accessories
    };
};

export default connect(mapStateToProps)(productCategory)
