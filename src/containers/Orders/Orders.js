import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(state => state.order.orders);
  const loading = useSelector(state => state.order.loading);
  const token = useSelector(state => state.auth.token); 
  const userId = useSelector(state => state.auth.userId);

  const onFetchOrders = useCallback(
    (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    [dispatch]
  );
  
  useEffect(() => {
    console.log('fetch');
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let ordersComponent = <Spinner />;
  if (!loading) {
    ordersComponent = <div className="table-responsive">
      <h2 className="title">My Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Date</th>
            <th>Ingredients</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, key) => (
            <Order
              key={key}
              orderId={order.orderId}
              date={order.date}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </tbody>
      </table>
    </div>
  }
  return <div class="order-table">
    {ordersComponent}
  </div>;
};

export default withErrorHandler(Orders, axios);