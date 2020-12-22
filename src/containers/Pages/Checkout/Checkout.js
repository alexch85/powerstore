import React, { Component, Fragment } from 'react';
import styles from './Checkout.module.css';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index';

import { Redirect } from 'react-router-dom' 

import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import CartItem from '../../../components/CartItem/CartItem';
import CheckoutForm  from '../../../shared/FormikForms/CheckoutForm/CheckoutForm';


class Checkout extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
      }
    render() {
        let cartItems = <div style={{fontSize: '1,25em', textTransform: 'uppercase'}}>Cart is Empty</div>
        if (this.props.cart.length > 0) {
            cartItems = this.props.cart.map((cartItem, index) => (
                <CartItem name={cartItem.name} 
                checkout={true} 
                price={cartItem.totalAddedPrice} 
                img={cartItem.img} 
                key={index} 
                quantity={cartItem.qty} clicked={() => this.props.onRemoveProduct(index)} 
                increment={() => this.props.onAddQuantity(cartItem.name)} 
                decrement={()=> this.props.onRemoveQuantity(cartItem.name)}
                />
            ))
        } 
            let checkout =  <div className={styles.Checkout}>
            <PageTitle title='Checkout'/>
                <div className={styles.PageContent}>
                <div className={styles.CheckoutItems}>
                <h3>ORDER SUMMERY</h3>
                {cartItems}
                <div className={styles.TotalCheck}>
                    <h5>Delivery: {this.props.delivery.method} - {this.props.delivery.price} $</h5> 
                    <h3>Total: ${this.props.totalWithDelivery}</h3> 
                </div>
                </div>
                <CheckoutForm/>
                </div>
            </div>
            if(this.props.cart.length === 0) {
                checkout = <Redirect to="/Cart"/>
            }
            
        
        return ( 
            <Fragment>
                {checkout}
            </Fragment>
            
        )
    }
    }

const mapStateToProps = state => {
    return {
        products: state.CartManage.products,
        cart: state.CartManage.cart,
        price: state.CartManage.total,
        deliveryMethods : state.CartManage.deliveryMethods,
        delivery: state.CartManage.delivery,
        totalWithDelivery: state.CartManage.totalWithDelivery
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onRemoveProduct: (index) => dispatch(actions.removeFromCartMethod(index)),
        onAddQuantity: (id) => dispatch(actions.addQtyMethod(id)),
        onRemoveQuantity: (id) => dispatch(actions.removeQtyMethod(id)),
        onUpdateTotalDelivery: (id) => dispatch(actions.updateTotalDelivery(id)),
        resetDeliveryMethod: () => dispatch(actions.resetDeliveryMethod())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Checkout);
