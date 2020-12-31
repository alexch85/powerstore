import React, { Component, Fragment } from 'react';
import styles from './ProductPage.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import QuantityCounter from '../../../components/UI/QuantityCounter/QuantityCounter';

class ProductPage extends Component {
    componentWillUnmount(){
        this.props.onresetCounter()
    }

    render() {
        let product = this.props.products.filter(product => product.name === this.props.match.params.id).map((filteredProduct, index) => (
           <Fragment key={index}>
            <PageTitle title={filteredProduct.name} category={filteredProduct.category}/>
            <div className={styles.PageContent}>
            <img src={filteredProduct.img} alt='product_image'/>
            <div className={styles.infoQuantity}>
            <p>{filteredProduct.description}</p>
            <div className={styles.QuantCount}>
            Quantity:
            <br/>
            <QuantityCounter quant={this.props.productQty} increment={this.props.onIncrementQuantity} decrement={this.props.ondecrementQuantity}/>
            </div>
             </div>
            <div className={styles.PriceOrder}>
                <h2>${(filteredProduct.price).toFixed(2)}</h2>
                <Button clicked={() => this.props.onItemAddToCart(filteredProduct.name)}>Add to Cart</Button>
            </div>
            </div>
           </Fragment>
        ));
        return (
            <div className={styles.ProductPage}>
            {product}
    
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        products: state.CartManage.products,
        productQty: state.CartManage.productPageQty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onItemAddToCart : (id) => dispatch(actions.addToCartMethod(id)),
        onIncrementQuantity: () => dispatch(actions.IncrementQuantity()),
        ondecrementQuantity: () => dispatch(actions.decrementQuantity()),
        onresetCounter: () => dispatch(actions.resetCounter())
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductPage);
