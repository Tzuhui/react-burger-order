import React, { useEffect, useState } from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const CheckoutSummary = (props) => {
  const [routerMatch, setRouterMatch] = useState(false);
  useEffect(() => {
    if (window.location.pathname.includes('contact-data')) {
      setRouterMatch(true)
    }
  }, [setRouterMatch])
  return (
    <div className={'CheckoutSummary'}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType="Danger"
        clicked={props.checkoutCancelled}>CANCEL</Button>
      {routerMatch ? null
        : <Button
          btnType="Success"
          clicked={props.checkoutContinued}>CONTINUE</Button>}
    </div>
  );
}

export default CheckoutSummary;