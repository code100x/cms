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
  user_id: string;
};

export const RazorPayComponent = ({ course_id, user_id }: RazorPayType) => {
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert('Razorpay SDK Failed to load');
      return;
    }

    const data = await fetch('/api/razorpay', {
      method: 'POST',
      body: JSON.stringify({
        course_id,
        user_id,
      }),
    }).then((res) => res.json());

    console.log(data);
    const options = {
      key: data.razorPayKey,
      name: '100xdevs',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Thank you for purchasing course',
      image: '/harkirat.png',
      handler: async (response: any) => {
        console.log(response);

        const data = await fetch('/api/razorpay/verify', {
          method: 'POST',
          body: JSON.stringify({ ...response, user_id, course_id }),
        }).then((res) => res.json());

        console.log(data);
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
