import React from 'react';
import styles from './LoginForm.module.css';
import { Form, Field, withFormik  } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../components/UI/Button/Button';


const loginForm = ({ touched, errors, isSubmitting, onClose, clicked }) => {
    return (
        <div className={styles.AuthModal}>
            <FontAwesomeIcon icon={faTimes} onClick={onClose} className={styles.CloseIcon}/>
        <h2>Login</h2>
        <Form>
        <div className={styles.FormsContainer}>
            <label>Email:</label>
            <Field  type="email" name="email" placeholder="Email"/>
            <div className={styles.ErrorMessage}>
                {touched.email && errors.email && <p>{errors.email}</p>}
            </div>
            <label>Password:</label>
            <Field type="password" name="password" placeholder="Password"/>
            <div className={styles.ErrorMessage}>
                {touched.password && errors.password && <p>{errors.password}</p>}
            </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>login</Button>
        </Form>
        <p className={styles.SwitchMode}>New User? <button onClick={clicked} >Register Here</button></p>
        </div>
    )

    }

    const FormikLogin = withFormik({
    mapPropsToValues(){
        return {
            email: '',
            password: '',
            // confirmPassword: ''
        }
    },

    validationSchema: yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
        // confirmPassword: yup.string().min(8).required()
        // .test("Passwords match", "Passwords must match", function(value) {
        //   return this.parent.password === value
        // })
    }),

    handleSubmit(values, {setSubmitting, resetForm, props}) { 
        props.onAuth(values.email, values.password, props.mode)
        setSubmitting(false)
        resetForm()
    },

})(loginForm)

const mapStateToProps = state => {
    return {
        mode: state.auth.mode,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, mode) => dispatch(action.auth(email, password, mode)),
        onClose: () => dispatch(action.closeLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormikLogin);


