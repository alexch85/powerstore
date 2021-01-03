import React, { Fragment, Component } from 'react';
import styles from './Order.module.css';

import Button from '../../components/UI/Button/Button';

class Order extends Component {
  state = {
    details: false,
  };
  //Show orders details handler
  toggleDetailsHandler = () => {
    this.setState((prevState) => ({
      details: !prevState.details,
    }));
  };
  render() {
    const orderItems = this.props.orderedItems.map((item, index) => (
      <div className={styles.ItemInfo} key={index}>
        <div className={styles.ItemName}>{item.name}</div>
        <div>quantity: {item.qty} </div>
        <div className={styles.ItemPrice}>price: ${item.price.toFixed(2)}</div>
      </div>
    ));
    //Hidden section opens when details button is clicked
    let hiddenSection = '';
    if (this.state.details) {
      hiddenSection = (
        <Fragment>
          <div className={styles.OrderInfo}>
            <div className={styles.infoContainer}>
              <h4>name:</h4>
              <p> {this.props.orderData.name}</p>
            </div>
            <div className={styles.infoContainer}>
              <h4>lastname:</h4>
              <p> {this.props.orderData.lastname}</p>
            </div>
            <div className={styles.infoContainer}>
              <h4>email:</h4>
              <p> {this.props.orderData.email}</p>
            </div>
            <div className={styles.infoContainer}>
              <h4> phone Number:</h4>
              <p> {this.props.orderData.phoneNum}</p>
            </div>
            <div className={styles.infoContainer}>
              <h4>address:</h4>
              <p> {this.props.orderData.address}</p>
            </div>
            <div className={styles.infoContainer}>
              <h4>city:</h4>
              <p> {this.props.orderData.city}</p>
            </div>
            <div className={styles.infoContainer}>
              <h4>state:</h4>
              <p> {this.props.orderData.state}</p>
            </div>
            <div className={styles.infoContainer}>
              <h4>postcode: </h4>
              <p> {this.props.orderData.postcode}</p>
            </div>
            <div className={styles.infoContainer}>
              <h4>country:</h4>
              <p> {this.props.orderData.country}</p>
            </div>
          </div>
          <div className={styles.OrderItems}>
            <h4 style={{ margin: '0 0 10px 0' }}>Ordered Items:</h4>
            {orderItems}
          </div>
        </Fragment>
      );
    }
    return (
      <div className={styles.Order}>
        <div className={styles.VisibleOrder}>
          <div>
            <h3>Order Number: {this.props.orderNum}</h3>
          </div>
          <div className={styles.infoContainer}>
            <h4>Order date:</h4>
            <p> {this.props.date}</p>
          </div>
          <div className={styles.infoContainer}>
            <h4>Shipping method:</h4>
            <p>{this.props.shipping}</p>
          </div>
          <div className={styles.infoContainer}>
            <h4>Order total price:</h4>
            <p>${this.props.price.toFixed(2)}</p>{' '}
          </div>
          <Button clicked={this.toggleDetailsHandler}>Details</Button>
        </div>
        {hiddenSection}
      </div>
    );
  }
}

export default Order;
