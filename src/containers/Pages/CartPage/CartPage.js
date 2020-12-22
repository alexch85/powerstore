import React, { Component } from 'react';
import styles from './CartPage.module.css';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import CartItem from '../../../components/CartItem/CartItem';
import OrderSummery from '../../../components/OrderSummery/OrderSummery';



export class CartPage extends Component {
    state ={
        redirect: false,
    }
    componentDidMount() {
        window.scrollTo(0, 0)
      }
    onCheckoutHandler = () => {
        if(this.props.cart.length > 0 && this.props.isAuth) {
            this.setState({redirect: true});
        } else if (this.props.cart.length > 0) {
            this.props.onShowLogin()
        }
    }


    render() {
        let cartItems = <div className={styles.CartEmpty}>Cart is Empty</div>
        if (this.props.cart.length > 0) {
            cartItems = this.props.cart.map((cartItem, index) => (
                <CartItem name={cartItem.name} 
                price={cartItem.totalAddedPrice} 
                img={cartItem.img} key={index} 
                quantity={cartItem.qty} 
                clicked={() => this.props.onRemoveProduct(index)} 
                increment={() => this.props.onAddQuantity(cartItem.name)} 
                decrement={()=> this.props.onRemoveQuantity(cartItem.name)}
                />
            ))
        }
        let checkoutRedirect = ''
     if (this.state.redirect) {
             checkoutRedirect = <Redirect to="/Checkout"/>
        } 
        return (
            <div className={styles.CartPage}>
            {checkoutRedirect}
             <PageTitle title={'Cart'}/>
                <div className={styles.CartPageContent}>
                    <div className={styles.CartItems}>
                    {cartItems}
                    </div>
                <OrderSummery 
                price={this.props.price} 
                clicked={this.onCheckoutHandler} 
                disable={this.props.cart.length > 0}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.CartManage.products,
        cart: state.CartManage.cart,
        price: state.CartManage.total,
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onRemoveProduct: (index) => dispatch(actions.removeFromCartMethod(index)),
        onAddQuantity: (id) => dispatch(actions.addQtyMethod(id)),
        onRemoveQuantity: (id) => dispatch(actions.removeQtyMethod(id)),
        onShowLogin: () => dispatch(actions.showLogin()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CartPage);
