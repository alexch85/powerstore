import React, { Component, Fragment } from 'react';
import styles from './AboutContact.module.css';
import axios from 'axios';

import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import ContactForm from '../../../shared/FormikForms/ContactForm/ContactForm';

class AboutContact extends Component {
    state={
        loading: false,
        formIsValid: false,
        submitted: false
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
      }
      
    closeModalHandler = () => {
        this.setState({submitted: false})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        this.setState({submitted: true});
        const submitFormData = {};
        for (let formElementIdentifier in this.state.submitForm){
            submitFormData[formElementIdentifier] = this.state.submitForm[formElementIdentifier].value;
        }

        axios.post('https://react-powerstore-alex.firebaseio.com/submits.json', submitFormData)
        .then(resp => {
            this.setState({loading: false});
        })
        .catch(error => {
            alert(`Something went wrong`)
        })
    }


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
                    <h2>LET'S GET IN TOUCH!</h2>
                    <ContactForm/>
                    {/* {form} */}
                    {/* {submitButton} */}
                </div>
            </div>
            </div>
            </Fragment>
        )
    }
}

export default AboutContact