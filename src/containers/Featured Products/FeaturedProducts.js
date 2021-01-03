import React from 'react';
import styles from './FeaturedProducts.module.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Product from '../Product/Product';
import Spinner from '../../components/UI/Spinner/Spinner';

const featuredProducts = (props) => {
  const productSelectedHandler = (id) => {
    props.history.push('/' + id);
  };
  let featProducts = <Spinner />;
  if (!props.loading && props.products) {
    featProducts = props.products
      .filter((product) => product.featured)
      .map((filteredProduct, index) => (
        <Product
          featured={true}
          key={index}
          name={filteredProduct.name}
          descript={filteredProduct.description}
          price={filteredProduct.price}
          img={filteredProduct.img}
          clicked={() => productSelectedHandler(filteredProduct.name)}
        />
      ));
  }
  return <div className={styles.FeaturedProds}>{featProducts}</div>;
};

const mapStateToProps = (state) => {
  return {
    products: state.CartManage.products,
    loading: state.CartManage.loading,
  };
};

export default withRouter(connect(mapStateToProps)(featuredProducts));
