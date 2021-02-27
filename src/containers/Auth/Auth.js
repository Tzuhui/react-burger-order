import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
  const [isSignup, setIsSignup] = useState(true);
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      label: 'E-mail',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      label: 'Password',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  // const price = useSelector(state => state.burgerBuilder.totalPrice);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const buildingBurger = useSelector(state => state.burgerBuilder.building);
  const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

  const dispatch = useDispatch();
  // const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
  const dispatchOnAuth =  (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup));
  const dispatchOnSetAuthRedirectPath = dispatch => dispatch(actions.setAuthRedirectPath('/'));

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      dispatchOnSetAuthRedirectPath();
    }
  });

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true
      })
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    dispatchOnAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      label={formElement.config.label}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (error) {
    errorMessage = <p style={{
      background: '#f7d2c0',
      padding: '10px',
      borderRadius: '4px',
    }} className="error-message">Error: {error.message}</p>;
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }

  return (
    <div className={'Auth'}>
      <div className="wrapper">
        <h2 className="title"> {isSignup ? 'Sign Up' : 'Sign In'} </h2>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    </div>
  );
};

export default Auth
