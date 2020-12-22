import React, { Component } from 'react'
import styles from './ContactForm.module.css'

import Modal from '../../../components/UI/Modal/Modal';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


// import { connect } from 'react-redux'
import axios from 'axios';
import { Form , Field, withFormik } from 'formik'
import * as yup from 'yup'

class ContactForm extends Component{
    state={
        submitted: true
    }
    closeModalHandler = () => {
        this.setState({submitted: false})
    }
    
    render() {
        const {  touched, errors, isSubmitting, status } = this.props;
        let modal = null
        if (status) {
            modal= 
            <Modal show={this.state.submitted} clicked={this.closeModalHandler}>
                <div className={styles.SentMessage}>
                <FontAwesomeIcon icon={faTimes} onClick={this.closeModalHandler} className={styles.CloseIcon}/>
                <h5>Your Message is sent. Thanks for getting in touch !</h5>
                </div>
            </Modal>
        }
          return (
              <div className={styles.ContactForm}>
              <Form>
                  <div className={styles.FieldContainer}>
                  <Field  type="text" name="name" placeholder="Your Name"/>
                  {touched.name && errors.name && <p>Name is too short</p>}
                  </div>
                  <div className={styles.FieldContainer}>
                  <Field  type="text" name="lastname" placeholder="Your Last Name" />
                  {touched.lastname && errors.name && <p>Name is too short</p>}
                  </div>
                  <div className={styles.FieldContainer}>
                  <Field  type="email" name="email" placeholder="Your Email" />
                  {touched.email && errors.email && <p>Email is required</p>}
                  </div>
                  <div className={styles.FieldContainer}>
                  <Field  name="messageText" component="textarea" rows="6" placeholder="Your Message"/>
                  {touched.messageText && errors.messageText && <p>Message is too short</p>}
                  </div>
                  <Button type="submit" disabled={isSubmitting}>Submit</Button>    
              </Form>
              {modal}
              </div>
          )
    }
}

const FormikForm = withFormik({
 mapPropsToValues() {
     return {
        name: '',
        lastname: '',
        email: '',
        messageText: '',
     }
 },
 validationSchema: yup.object().shape({
     name: yup.string().min(2).required(),
     lastname: yup.string().min(2).required(),
     email: yup.string().email().required(),
     messageText: yup.string().min(10).required()
 }),

 handleSubmit(values, {setSubmitting, resetForm, setStatus}) {
    setStatus({success: false})
    const submitFormData = {};
    for (let formElementIdentifier in values){
        submitFormData[formElementIdentifier] = values[formElementIdentifier]
    }

    axios.post('https://react-powerstore-alex.firebaseio.com/submits.json', submitFormData)
    .then(resp => {
        // alert(`Thanks for getting in touch`)
        setStatus({success: true})
    })
    .catch(error => {
        alert(`Something went wrong`)
    })
     resetForm()
     setSubmitting(false)
 }
})(ContactForm)




export default (FormikForm)
