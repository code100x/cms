'use client';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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

export const RazorPayComponent = ({ courseId }: { courseId: number }) => {
  const router = useRouter();

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert('Razorpay SDK Failed to load');
      return;
    }

    const data = await fetch('/api/razorpay', {
      method: 'POST',
      body: JSON.stringify({
        courseId,
      }),
    }).then((res) => res.json());

    const options = {
      key_id: data.razorPayKey,
      name: '100xdevs',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Thank you for purchasing course',
      image: '/harkirat.png',
      handler: async () => {
        toast('Your purchases can be seen on the home page', {
          action: {
            label: 'Close',
            onClick: () => console.log('Closed Toast'),
          },
        });
        router.push('/');
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.on('payment.failed', () => {
      toast('Payment did not execute', {
        action: {
          label: 'Close',
          onClick: () => console.log('Closed Toast'),
        },
      });
    });
    paymentObject.open();
  };

  return (
    <main>
      <Button
        onClick={makePayment}
        className="dark:text-white"
        variant={'default'}
      >
        Pay Now
      </Button>
    </main>
  );
};
