import React, { Fragment, Component } from 'react';
import styles from './CartItem.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { isMobile } from 'react-device-detect';

import QuantityCounter from '../UI/QuantityCounter/QuantityCounter';

class CartItem extends Component {
	state = {
		deleteHover: false,
	};
	toggleDeleteHoverHandler = () => {
		this.setState((prevState) => ({
			deleteHover: !prevState.deleteHover,
		}));
	};
	render() {
		// in the cart page
		const cartActiveClass = this.state.deleteHover ? styles.CartItemRed : styles.CartItem;
		let cartItem = (
			<div className={cartActiveClass}>
				<FontAwesomeIcon
					icon={faTimes}
					onClick={this.props.clicked}
					className={styles.ClosedIcon}
					onMouseEnter={isMobile ? null : this.toggleDeleteHoverHandler}
					onMouseLeave={isMobile ? null : this.toggleDeleteHoverHandler}
				/>
				<img src={this.props.img} alt='product_image' />
				<p>{this.props.name}</p>
				<div className={styles.QuantPrice}>
					<QuantityCounter
						quant={this.props.quantity}
						increment={this.props.increment}
						decrement={this.props.decrement}
					/>
					<h3>${this.props.price.toFixed(2)}</h3>
				</div>
			</div>
		);

		//if we are in the checkout page
		if (this.props.checkout) {
			const checkoutActiveClass = this.state.deleteHover ? styles.CartItemCheckoutRed : styles.CartItemCheckout;
			cartItem = (
				<div className={checkoutActiveClass}>
					<FontAwesomeIcon
						icon={faTimes}
						onClick={this.props.clicked}
						className={styles.ClosedIcon}
						onMouseEnter={isMobile ? null : this.toggleDeleteHoverHandler}
						onMouseLeave={isMobile ? null : this.toggleDeleteHoverHandler}
					/>
					<img src={this.props.img} width='60px' height='60x' alt='product_image' />
					<h5>{this.props.name}</h5>
					<div className={styles.QuantPriceCheckout}>
						<QuantityCounter
							quant={this.props.quantity}
							increment={this.props.increment}
							decrement={this.props.decrement}
						/>
						<h5>${this.props.price.toFixed(2)}</h5>
					</div>
				</div>
			);
		}
		return <Fragment>{cartItem}</Fragment>;
	}
}

export default CartItem;
