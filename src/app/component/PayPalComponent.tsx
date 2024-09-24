import React from 'react';
import {PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import ApiCall from '../utils/apicalls/axiosInterceptor';

interface Props {
    description: string;
    pricingId: number;
    currency: string;
    amount: number;
    price: string;
}

export function extractNumericValue(str: string) {
  return parseFloat(str.replace(/[^0-9.]/g, ''));
}

const PayPalComponent = ({
description,
pricingId,
amount,
price,
currency

}: Props) => {
  
  const createOrder = async () => {
    console.log("SUBMITTING", {
      pricingId, amount, description
    })
    try {
      const response = await ApiCall.post(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/paypal/create`, {
        pricingId,
        description,
        amount: amount,
        currency: 'USD',
      });
      console.log("ResponSe", response.data)
      if (response.data.id) {
        return response.data.id;
      } else {
        throw new Error('Order ID not found in response');
      }
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

  const onApprove = async (data:any, actions:any) => {
    try {
      const response = await axios.post(`${process.env.NEXT_BASE_URL}/payment/paypal/confirm`, {
        orderID: data.orderID,
        pricingId,
      });
      const captureResponse = await actions.order.capture();
      console.log(captureResponse)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};

export default PayPalComponent;