import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';

const Hero = (props) => {
	return (
		<div className={styles.Hero}>
			<div className={styles.HeroItems}>
				<Logo />
				<Link to='/Barbells'>
					<Button type='action'>shop barbells now</Button>{' '}
				</Link>
			</div>
		</div>
	);
};

export default Hero;
