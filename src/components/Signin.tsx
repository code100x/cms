'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/sonner';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

import { toast } from 'sonner';
const Signin = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: any) => !prevState);
  }
  const router = useRouter();
  const email = useRef('');
  const password = useRef('');
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      username: email.current,
      password: password.current,
      redirect: false,
    });

    if (!res?.error) {
      router.push('/');
    } else {
      toast('Error Signing in', {
        action: {
          label: 'Close',
          onClick: () => console.log('Closed Toast'),
        },
      });
    }
  };
  return (
      <Card className="w-[70%] mx-auto md:w-[70%] lg:w-[30%] ">
        <CardHeader>
          <CardTitle>Login to your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                placeholder="name@email.com"
                onChange={(e) => (email.current = e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Password</Label>
              <div className="flex border rounded-lg">
                <Input
                  className="border-0"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => (password.current = e.target.value)}
                />
                <button
                  className="inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeOffIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <Button className="my-3 w-full" onClick={handleSubmit}>
            Login
          </Button>
        </CardContent>
      </Card>
      <Toaster />
    </section>
  );
};

export default Signin;
