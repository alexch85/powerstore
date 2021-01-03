import React, { Fragment } from 'react';
import styles from './NavigationItems.module.css';

import NavigationItem from '../NavigationItem/NavigationItem';
import SocialMIcons from '../../UI/SocialMediaIcons/SocialMIcons';

import { NavLink } from 'react-router-dom';

const NavigationItems = (props) => {
  let NavigationItems = (
    <div className={styles.NavigationItems}>
      <ul className={styles.SitePages}>
        <NavigationItem>
          <NavLink to='/Barbells' exact activeClassName={styles.active}>
            Barbells
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to='/Plates' exact activeClassName={styles.active}>
            Plates
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to='/Accessories' exact activeClassName={styles.active}>
            Accessories
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to='/Appearel' exact activeClassName={styles.active}>
            Appearel
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          {' '}
          <NavLink to='/AboutContact' activeClassName={styles.active}>
            About us/Contact
          </NavLink>{' '}
        </NavigationItem>
      </ul>
    </div>
  );
  //If side drawer is present render navigation items with different styles
  if (props.sideDrawer) {
    NavigationItems = (
      <div className={styles.NavigationItemsSide}>
        <ul className={styles.SitePagesSide}>
          <img
            alt='logo'
            src='images/logo-small.png'
            width='50px'
            height='30px'></img>
          <NavigationItem>
            <NavLink
              to='/'
              exact
              activeClassName={styles.active}
              onClick={props.closed}>
              Home
            </NavLink>
          </NavigationItem>
          <NavigationItem>
            <NavLink
              to='/Barbells'
              exact
              activeClassName={styles.active}
              onClick={props.closed}>
              Barbells
            </NavLink>
          </NavigationItem>
          <NavigationItem>
            <NavLink
              to='/Plates'
              exact
              activeClassName={styles.active}
              onClick={props.closed}>
              Plates
            </NavLink>
          </NavigationItem>
          <NavigationItem>
            <NavLink
              to='/Accessories'
              exact
              activeClassName={styles.active}
              onClick={props.closed}>
              Accessories
            </NavLink>
          </NavigationItem>
          <NavigationItem>
            <NavLink
              to='/Appearel'
              exact
              activeClassName={styles.active}
              onClick={props.closed}>
              Appearel
            </NavLink>
          </NavigationItem>
          <NavigationItem>
            {' '}
            <NavLink
              to='/AboutContact'
              activeClassName={styles.active}
              onClick={props.closed}>
              About us/Contact
            </NavLink>{' '}
          </NavigationItem>
          <div className={styles.SocialMIcons}>
            <SocialMIcons />
          </div>
        </ul>
      </div>
    );
  }
  return <Fragment>{NavigationItems}</Fragment>;
};

export default NavigationItems;
