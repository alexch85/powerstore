import React, { Fragment } from 'react';

import LoginForm from '../../shared/FormikForms/LoginForm/LoginForm'
import RegisterForm from '../../shared/FormikForms/RegisterForm/RegisterForm'


const Login = ({mode, clicked}) => {
    let modal = null;
    if(mode === 'login') {
        modal = <LoginForm clicked={clicked}/>          
    }
    if (mode === 'register'){
        modal = <RegisterForm clicked={clicked}/>          
    }
    return (
        <Fragment>
            {modal}
        </Fragment>
    )
}

export default Login;
