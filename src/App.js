import React, { Component, Suspense } from 'react';

import styles from './App.module.css';

import Layout from './hoc/Layout/Layout';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Spinner from './components/UI/Spinner/Spinner';
import Homepage from './containers/Pages/Hompage/Homepage';

//Lazy loading
const homePage = React.lazy(() =>
  import('./containers/Pages/Hompage/Homepage'),
);
const accessories = React.lazy(() =>
  import('./components/Categories/Accessories/Accessories'),
);
const barbells = React.lazy(() =>
  import('./components/Categories/Barbells/Barbells'),
);
const appearel = React.lazy(() =>
  import('./components/Categories/Appearel/Appearel'),
);
const plates = React.lazy(() =>
  import('./components/Categories/Plates/Plates'),
);
const aboutContact = React.lazy(() =>
  import('./containers/Pages/AboutContact/AboutContact'),
);
const productPage = React.lazy(() =>
  import('./containers/Pages/ProductPage/ProductPage'),
);
const cartPage = React.lazy(() =>
  import('./containers/Pages/CartPage/CartPage'),
);
const checkout = React.lazy(() =>
  import('./containers/Pages/Checkout/Checkout'),
);
const ordersPage = React.lazy(() =>
  import('./containers/Pages/OrdersPage/OrdersPage'),
);
const logout = React.lazy(() => import('./containers/Auth/Logout'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.onInitProducts();
  }

  render() {
    let routes = (
      <Suspense fallback='loading...'>
        <Switch>
          <Route path='/AboutContact' component={aboutContact} />
          <Route path='/Accessories' component={accessories} />
          <Route path='/Barbells' component={barbells} />
          <Route path='/Plates' component={plates} />
          <Route path='/Appearel' component={appearel} />
          <Route path='/Cart' component={cartPage} />
          <Route path='/:id' component={productPage} />
          <Route path='/' exact component={homePage} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback='loading...'>
          <Switch>
            <Route path='/AboutContact' component={aboutContact} />
            <Route path='/Accessories' component={accessories} />
            <Route path='/Barbells' component={barbells} />
            <Route path='/Plates' component={plates} />
            <Route path='/Appearel' component={appearel} />
            <Route path='/Cart' component={cartPage} />
            <Route path='/Checkout' component={checkout} />
            <Route path='/Orders' component={ordersPage} />
            <Route path='/Logout' component={logout} />
            <Route path='/:id' component={productPage} />
            <Route
              path='/'
              exact
              render={(props) => (props.loading ? <Spinner /> : <Homepage />)}
            />
            <Redirect to='/' />
          </Switch>
        </Suspense>
      );
    }
    return (
      <div className={styles.App}>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToPorps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    products: state.CartManage.products,
    loading: state.CartManage.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onInitProducts: () => dispatch(actions.initProducts()),
  };
};

export default withRouter(connect(mapStateToPorps, mapDispatchToProps)(App));
