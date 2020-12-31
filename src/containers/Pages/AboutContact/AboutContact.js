import React, { Component, Fragment } from 'react';
import styles from './AboutContact.module.css';

import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import ContactForm from '../../../shared/FormikForms/ContactForm/ContactForm';

class AboutContact extends Component {
    render() {
        return (
            <Fragment>
            <div className={styles.AboutContact}>
            <PageTitle title='About Us/Contact'/>
            <div className={styles.PageContent}>
                <div className={styles.About}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae felis lectus. Integer fringilla condimentum finibus. Duis sed pharetra odio, ac pulvinar erat. In accumsan efficitur lacus, eu mollis quam aliquet arc. 
                <br/>
                <br/>
                Nunc efficitur justo non dui auctor suscipit. Mauris nunc dolor, fermentum nec porta a, rhoncus nec dolor. Vestibulum rhoncus tellus eu tincidunt bibendum. Maecenas vulputate bibendum convallis. Nulla vel quam quis ex volutpat cursus non a felis. Fusce tincidunt purus vel nulla mollis.</p>
                <img alt='contact' src='/images/contact.png'/>
                <p>Powerstore Huston Texas | Business Hours : 9:00-18:00 M-F CST
                <br/>
                POWERSTORE18@GMAIL.COM 1800-655-554
                </p>
                </div>
                <div className={styles.Contact}>
                    <h2>Get in touch!</h2>
                    <ContactForm/>
                </div>
            </div>
            </div>
            </Fragment>
        )
    }
}

export default AboutContact
