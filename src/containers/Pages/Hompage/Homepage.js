import React, { Component } from 'react';
import styles from './Homepage.module.css'

import Hero from '../../../components/Hero/Hero';
import FeaturedProds from '../../Featured Products/FeaturedProducts';
import SectionTitle from '../../../components/UI/SectionTitle/SectionTitle';
import Categories from '../../../components/Categories/Categories';


class Homepage extends Component  {
    componentDidMount() {
        window.scrollTo(0, 0)
      }
    render() {
        return (
            <div className={styles.Homepage}>
            <Hero/>
            <SectionTitle>Featured Products</SectionTitle>
            <FeaturedProds/>
            <SectionTitle>Categories</SectionTitle>
            <Categories/>
            </div>
        )
    }
}

export default Homepage
