import React, { Component } from 'react';
import styles from './OrderPage.module.css';

import axios from 'axios';
import { connect } from 'react-redux';

import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import Order from '../../Order/Order';

class OrdersPage extends Component {
  state = {
    orders: [],
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.token) {
      const token = this.props.token;
      const userId = this.props.userId;
      const queryParams =
        '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
      axios
        .get(
          'https://react-powerstore-alex.firebaseio.com/orders.json' +
            queryParams,
        )
        .then((res) => {
          const fetchedOrders = [];
          for (let key in res.data) {
            fetchedOrders.push({
              ...res.data[key],
              id: key,
            });
          }
          //Sort orders by date
          fetchedOrders.sort(function compare(a, b) {
            let dateA = Date.parse(a.orderDate);
            console.log(dateA);
            let dateB = Date.parse(b.orderDate);
            console.log(dateB);
            return dateA - dateB;
          });
          this.setState({ orders: fetchedOrders });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
  //Open details handler
  toggleDetailsHandler = () => {
    this.setState((prevState) => ({
      details: !prevState.details,
    }));
  };

  render() {
    const userOrders = this.state.orders;
    let userOrd = (
      <div style={{ margin: '10px 0 0 10px' }}>
        There are no orders to display yet
      </div>
    );
    if (userOrders.length > 0) {
      userOrd = userOrders.map((order, index) => (
        <Order
          key={index}
          orderData={order.orderData}
          orderNum={index + 1}
          price={order.price}
          date={order.orderDate}
          shipping={order.delivery}
          toggleDetails={this.toggleDetailsHandler}
          orderedItems={order.orderedItems}
        />
      ));
    }
    return (
      <div className={styles.OrdersPage}>
        <PageTitle title='Orders' />
        {userOrd}
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapsStateToProps)(OrdersPage);
