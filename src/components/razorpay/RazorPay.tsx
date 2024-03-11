'use client';

import { Button } from '../ui/button';

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

type RazorPayType = {
  course_id: number;
};

export const RazorPayComponent = ({ course_id }: RazorPayType) => {
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert('Razorpay SDK Failed to load');
      return;
    }

    // Make API call to the serverless API
    const data = await fetch('/api/razorpay', {
      method: 'POST',
      body: JSON.stringify({
        course_id,
      }),
    }).then((res) => res.json());

    console.log(data);
    const options = {
      key: 'rzp_test_7i1GsXxyhGLsCG', // Enter the Key ID generated from the Dashboard
      name: '100xdevs',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Thank you for purchasing course',
      image: 'https://manuarora.in/logo.png',
      handler: async (response: any) => {
        console.log('-----------------');
        console.log(response);
        console.log('------------------');

        const data = await fetch('/api/razorpay/verify', {
          method: 'POST',
          body: JSON.stringify(response),
        }).then((res) => res.json());

        console.log(data);
      },
      prefill: {
        name: 'Manu Arora',
        email: 'manuarorawork@gmail.com',
        contact: '9999999999',
      },
    };

    // @ts-expect-error
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <main>
      {course_id}
      <Button onClick={makePayment} variant={'default'}>
        Pay Now
      </Button>
    </main>
  );
};
