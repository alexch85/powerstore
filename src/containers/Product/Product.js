import React, { Component } from 'react';
import styles from './Product.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';

import { isMobile } from 'react-device-detect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class Product extends Component {
	state = {
		focusHover: false,
	};

	focusHoverOn = () => {
		this.setState({ focusHover: true });
	};

	focusHoverOff = () => {
		this.setState({ focusHover: false });
	};
	render() {
		let attachedClass = styles.ProdContainer;
		if (this.props.featured) {
			attachedClass = styles.FeaturedProdContainer;
		}
		let prodImage = (
			<img
				alt='product'
				src={this.props.img}
				onMouseEnter={isMobile ? null : this.focusHoverOn}
				onMouseLeave={isMobile ? null : this.focusHoverOff}
				onClick={isMobile ? this.props.clicked : null}
			/>
		);
		if (this.state.focusHover && !isMobile) {
			prodImage = (
				<div
					onMouseEnter={this.focusHoverOn}
					onClick={this.props.clicked}
					onMouseLeave={this.focusHoverOff}
					className={styles.HoverFocus}
				>
					<img alt='product hover' src={this.props.img} style={{ opacity: 0.6 }} />
					<button className={styles.HoverButton}>
						<FontAwesomeIcon icon={faPlusCircle} />
					</button>
				</div>
			);
		}
		return (
			<div className={attachedClass}>
				{prodImage}
				<div className={styles.TextContainer}>
					<p>{this.props.name}</p>
					<div className={styles.Price}>${this.props.price.toFixed(2)}</div>
				</div>
				<Button clicked={() => this.props.onItemAddToCart(this.props.name)}>Add to cart </Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.CartManage.products,
		cart: state.CartManage.cart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onItemAddToCart: (id) => dispatch(actions.addToCartMethod(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
