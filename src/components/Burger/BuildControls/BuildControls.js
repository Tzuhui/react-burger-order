import React from 'react';

import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Tomato', type: 'tomato' }
];

const buildControls = (props) => (
  <div className={'BuildControls'}>
    <div className="content">
      <h2 className="title"> Choose Your Ingredients</h2>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl
          num={props.ingredients[ctrl.type]}
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]} />
      ))}
      <button
        className={'OrderButton'}
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ? 'Order Now' : 'Sigh Up To Order'}</button>
    </div>
  </div>
);

export default buildControls;