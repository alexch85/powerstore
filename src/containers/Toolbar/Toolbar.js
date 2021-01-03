import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Toolbar.module.css';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import Logo from '../../components/Logo/Logo';
import DrawerToggle from '../../components/Navigation/Sidedrawer/DrawerToggle/DrawerToggle';

import Cart from '../../components/Navigation/Cart/Cart';
import SocialMIcons from '../../components/UI/SocialMediaIcons/SocialMIcons';
import Modal from '../../components/UI/Modal/Modal';
import Login from '../Auth/Auth';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

class Toolbar extends Component {
  state = {
    dropdown: false,
  };
  //Show dropdown on user account
  showDropdown = () => {
    this.setState({ dropdown: true });
  };
  hideDropdown = () => {
    this.setState({ dropdown: false });
  };

  render() {
    let cart = <Cart empty={true} />;
    if (this.props.cart.length > 0) {
      cart = <Cart empty={false} itemNumber={this.props.totalItemQty} />;
    }
    let userPanel = (
      <div className={styles.loginReg}>
        <button onClick={this.props.onShowLogin}>Login</button>
        <i style={{ margin: '0 5px' }}>|</i>{' '}
        <button onClick={this.props.onShowRegister}>Register</button>
      </div>
    );
    if (this.props.isAuth) {
      userPanel = (
        <div className={styles.loginReg}>
          <div onMouseOver={this.showDropdown} onMouseLeave={this.hideDropdown}>
            <button>Account</button>
            {this.state.dropdown ? (
              <div className={styles.DropdownMenu}>
                <ul>
                  <li>
                    <Link onClick={this.hideDropdown} to='/Orders'>
                      Orders
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
          <i style={{ margin: '0 5px' }}>|</i>{' '}
          <Link to='/Logout'>
            <button>Logout</button>
          </Link>
        </div>
      );
    }

    return (
      <header>
        <Backdrop show={this.state.dropdown} type='menu' />
        <div className={styles.headerContainer}>
          <Logo type={'nav'} />
          <DrawerToggle clicked={this.props.drawerToggleClicked} />
          <nav className={styles.DesktopOnly}>
            <NavigationItems />
          </nav>
          <div className={styles.UserItems}>
            {userPanel}
            {cart}
          </div>
          <div className={styles.SocialM}>
            <SocialMIcons />
          </div>
          {this.props.loginMode ? (
            <Modal clicked={this.props.onCloseLogin} show={true}>
              <Login clicked={this.props.onSwitchMode} mode={this.props.mode} />
            </Modal>
          ) : null}
          {this.props.error ? (
            <Modal show={this.props.error} clicked={this.props.onRemoveError}>
              <p>{this.props.error.message}</p>
            </Modal>
          ) : null}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.CartManage.cart,
    totalItemQty: state.CartManage.totalItemQty,
    loginMode: state.auth.loginMode,
    mode: state.auth.mode,
    error: state.auth.error,
    isAuth: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchMode: () => dispatch(actions.switchMode()),
    onShowLogin: () => dispatch(actions.showLogin()),
    onShowRegister: () => dispatch(actions.showRegister()),
    onCloseLogin: () => dispatch(actions.closeLogin()),
    onRemoveError: () => dispatch(actions.removeError()),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
