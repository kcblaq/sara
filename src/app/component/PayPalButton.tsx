import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

interface Props {
    firstname: string;
    lastname: string;
    description: string;
    pricingId: number;
    currency: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
    amount: string;
}

const PayPalComponent = ({
firstname,
lastname,
description,
postal_code,
pricingId,
city,
address,
currency,
country,
amount

}: Props) => {


  const createOrder = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_BASE_URL}/api/create`, {
        firstname,
        lastname,
        postal_code,
        address,
        country,
        pricingId,
        description,
        city,
        amount,
        currency: 'USD',
      });
      return response.data.id;
    } catch (error) {
      console.error(error);
    }
  };

  const onApprove = async (data:any) => {
    try {
      const response = await axios.post(`${process.env.NEXT_BASE_URL}/api/confirm`, {
        orderID: data.orderID,
        pricingId,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PAYPAL_CLIENT_ID ?? "" }}>
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalComponent;