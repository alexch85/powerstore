import React, { Component, Fragment } from 'react';
import styles from './ProductCategory.module.css';
import { withRouter } from 'react-router-dom';

import PageTitle from '../../components/UI/PageTitle/PageTitle';
import Product from '../Product/Product';

import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

export class ProductCategory extends Component {
  state = {
    sortProds: 'low to high',
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  //Open product with selected id
  productSelectedHandler = (id) => {
    this.props.history.push('/' + id);
  };
  sortHandler = (event) => {
    const sort = event.target.value;
    this.setState({ sortProds: sort });
  };

  render() {
    //Filter by category
    const prodCategory = [
      ...this.props.products.filter(
        (product) => product.category === this.props.categName,
      ),
    ];
    //Sort low to high or high to low by prices
    if (this.state.sortProds === 'low to high') {
      prodCategory.sort(function (a, b) {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    } else {
      prodCategory.sort(function (a, b) {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
    }
    let products = prodCategory.map((filteredProduct, index) => (
      <div className={styles.productHolder} key={index}>
        <Product
          name={filteredProduct.name}
          descript={filteredProduct.description}
          price={filteredProduct.price}
          img={filteredProduct.img}
          clicked={() =>
            this.productSelectedHandler(filteredProduct.name)
          }></Product>
      </div>
    ));
    let productCategory = <Spinner />;
    if (!this.props.loading && this.props.products) {
      productCategory = (
        <div className={styles.ProductCategory}>
          <PageTitle title={this.props.categName} />
          <div className={styles.PageContent}>
            <div className={styles.SortProds}>
              <p>Sort By </p>
              <select value={this.state.sortProds} onChange={this.sortHandler}>
                <option value='low to high'>Low to High Price</option>
                <option value='high to low'>High to Low Price</option>
              </select>
            </div>
            <div className={styles.Products}>{products}</div>
          </div>
        </div>
      );
    }
    return <Fragment>{productCategory}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.CartManage.products,
    loading: state.CartManage.loading,
  };
};

export default withRouter(connect(mapStateToProps)(ProductCategory));
