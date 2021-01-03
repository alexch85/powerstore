import React, { Component, Fragment } from 'react';
import styles from './Layout.module.css';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Toolbar from '../../containers/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    let modal = null;
    if (this.props.placedOrder) {
      modal = (
        <Modal
          show={this.props.placedOrder}
          clicked={this.props.onPlacedOrderOff}>
          <div className={styles.ThanksModal}>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={this.props.onPlacedOrderOff}
              className={styles.CloseIcon}
            />
            <h5>Thanks for Your order!</h5>
            <Link to='/Orders'>
              <Button clicked={this.props.onPlacedOrderOff}>See Orders</Button>
            </Link>
          </div>
        </Modal>
      );
    }
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <Sidedrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerToggleHandler}
        />
        {modal}
        <main style={{ marginBottom: '100px' }}>{this.props.children}</main>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    placedOrder: state.orders.orderPlaced,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlacedOrderOff: () => dispatch(actions.placeOrderOff()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
