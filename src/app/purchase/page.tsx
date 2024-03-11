'use client';

import { Button } from '@/components/ui/button';

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

const TermsAndConditionsPage = () => {
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert('Razorpay SDK Failed to load');
      return;
    }

    // Make API call to the serverless API
    const data = await fetch('/api/razorpay', { method: 'POST' }).then((t) =>
      t.json(),
    );
    console.log(data);
    const options = {
      key: 'rzp_test_7i1GsXxyhGLsCG', // Enter the Key ID generated from the Dashboard
      name: '100xdevs',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Thank you for purchasing course',
      image: 'https://manuarora.in/logo.png',
      handler: (response: any) => {
        console.log(response);
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
      <Button onClick={makePayment} variant={'default'}>
        Pay Now
      </Button>
    </main>
  );
};

export default TermsAndConditionsPage;
