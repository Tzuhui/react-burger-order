import React from 'react';

import './Order.css';

const order = (props) => {
  function convertTime(time) {
    let datetime = new Date();
    datetime.setTime(time);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const date = datetime.getDate();
    const hour = datetime.getHours();
    const minute = datetime.getMinutes();
    const second = datetime.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  };
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      }
    );
  }

  const ingredientOutput = ingredients.map(ig => {
    return <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px',
        borderRadius: '2px'
      }}
      key={ig.name}>{ig.name} ({ig.amount})</span>;
  });
  return (
    <tr>
      <th>{props.orderId}</th>
      <td>{props.date? <p>{convertTime(props.date)} </p>: null} </td>
      <td>{ingredientOutput}</td>
      <td><strong> {Number.parseFloat(props.price).toFixed(2)}</strong></td>
    </tr>
  )
};

export default order;