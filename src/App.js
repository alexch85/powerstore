import React, {Component} from 'react';
import styles from './App.module.css';

import Layout from './hoc/Layout/Layout';

import { Route, Switch,  withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';


import Homepage from './containers/Pages/Hompage/Homepage';
import Accessories from './components/Categories/Accessories/Accessories';
import Barbells from './components/Categories/Barbells/Barbells';
import AboutContact from './containers/Pages/AboutContact/AboutContact';
import Appearel from './components/Categories/Appearel/Appearel';
import Plates from './components/Categories/Plates/Plates';
import ProductPage from './containers/Pages/ProductPage/ProductPage';
import CartPage from './containers/Pages/CartPage/CartPage';
import Checkout from './containers/Pages/Checkout/Checkout';
import OrdersPage from './containers/Pages/OrdersPage/OrdersPage';
import Logout from './containers/Auth/Logout';
import Spinner from './components/UI/Spinner/Spinner';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()  
    this.props.onInitProducts()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/AboutContact" component={AboutContact}/>
        <Route path="/Accessories" component={Accessories}/>
        <Route path="/Barbells" component={Barbells}/>
        <Route path="/Plates" component={Plates} />
        <Route path="/Appearel" component={Appearel}/>
        <Route path="/Cart" component={CartPage}/>
        <Route path="/:id" component={ProductPage} />
        <Route path="/" exact component={Homepage} />
        <Redirect to="/"/>
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/AboutContact" component={AboutContact}/>
          <Route path="/Accessories" component={Accessories}/>
          <Route path="/Barbells" component={Barbells}/>
          <Route path="/Plates" component={Plates} />
          <Route path="/Appearel" component={Appearel}/>
          <Route path="/Cart" component={CartPage}/>
          <Route path="/Checkout" component={Checkout} />
          <Route path="/Orders" component={OrdersPage}/>
          <Route path="/Logout" component={Logout} />
          <Route path="/:id" component={ProductPage} />
          <Route path="/" exact render={(props)=> props.loading ?<Spinner/> :<Homepage/>} />
          <Redirect to="/"/>
        </Switch>
      )
    }
    return (
      <div className={styles.App}>
      <Layout>
      {routes}
      </Layout>
      </div>
    );
  }
}
 
const mapStateToPorps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    products: state.CartManage.products,
    loading: state.CartManage.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onInitProducts: () => dispatch(actions.initProducts())
  }
}

export default withRouter(connect(mapStateToPorps, mapDispatchToProps)(App));
